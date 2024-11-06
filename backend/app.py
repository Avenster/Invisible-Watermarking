from flask import Flask, request, send_file, jsonify
import cv2
import numpy as np
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configure upload folder
UPLOAD_FOLDER = 'uploads'
OUTPUT_FOLDER = 'outputs'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# Create directories if they don't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def embed_watermark(main_image_path, watermark_image_path, output_path, alpha=1):
    # Read images
    main_image = cv2.imread(main_image_path)
    if main_image is None:
        raise ValueError(f"Could not read main image: {main_image_path}")
    
    watermark = cv2.imread(watermark_image_path, cv2.IMREAD_GRAYSCALE)
    if watermark is None:
        raise ValueError(f"Could not read watermark image: {watermark_image_path}")

    # Get dimensions of main image
    height, width = main_image.shape[:2]

    # Calculate number of complete blocks
    blocks_height = height // 32
    blocks_width = width // 32

    # Resize watermark to match the number of blocks
    watermark = cv2.resize(watermark, (blocks_width, blocks_height))

    # Convert to YCrCb
    ycrcb = cv2.cvtColor(main_image, cv2.COLOR_BGR2YCrCb)
    y, cr, cb = cv2.split(ycrcb)

    # Process only complete blocks
    block_size = 32
    for i in range(blocks_height):
        for j in range(blocks_width):
            # Get current block coordinates
            y_start = i * block_size
            y_end = (i + 1) * block_size
            x_start = j * block_size
            x_end = (j + 1) * block_size
            
            block = y[y_start:y_end, x_start:x_end]

            # Apply SVD to each block
            U, S, Vt = np.linalg.svd(block, full_matrices=True)

            # Modify singular values with watermark
            S_modified = S.copy()
            S_modified[0] += alpha * watermark[i, j]

            # Reconstruct block
            block_watermarked = np.dot(U, np.dot(np.diag(S_modified), Vt))
            y[y_start:y_end, x_start:x_end] = block_watermarked

    # Ensure pixel values are within valid range
    y = np.clip(y, 0, 255)

    # Merge channels and convert back to BGR
    ycrcb_watermarked = cv2.merge([y.astype(np.uint8), cr, cb])
    watermarked_image = cv2.cvtColor(ycrcb_watermarked, cv2.COLOR_YCrCb2BGR)
    
    cv2.imwrite(output_path, watermarked_image)
    return True

@app.route('/embed_watermark', methods=['POST'])
def watermark_endpoint():
    if 'main_image' not in request.files or 'watermark_image' not in request.files:
        return jsonify({'error': 'Both main image and watermark image are required'}), 400

    main_image = request.files['main_image']
    watermark_image = request.files['watermark_image']

    if main_image.filename == '' or watermark_image.filename == '':
        return jsonify({'error': 'No selected files'}), 400

    if not (allowed_file(main_image.filename) and allowed_file(watermark_image.filename)):
        return jsonify({'error': 'Invalid file type'}), 400

    try:
        # Save uploaded files
        main_image_path = os.path.join(UPLOAD_FOLDER, secure_filename(main_image.filename))
        watermark_image_path = os.path.join(UPLOAD_FOLDER, secure_filename(watermark_image.filename))
        
        main_image.save(main_image_path)
        watermark_image.save(watermark_image_path)

        # Generate output filename
        output_filename = f"watermarked_{secure_filename(main_image.filename)}"
        output_path = os.path.join(OUTPUT_FOLDER, output_filename)

        # Process the watermark
        alpha = float(request.form.get('alpha', 1.0))
        embed_watermark(main_image_path, watermark_image_path, output_path, alpha)

        # Clean up uploaded files
        os.remove(main_image_path)
        os.remove(watermark_image_path)

        # Return the processed image
        return send_file(output_path, mimetype='image/jpeg')

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

