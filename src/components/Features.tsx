import React from 'react'
import Card from './Card'
import '../css/feature.css'


interface CardData {
  title: string;
  content: string[];
}
const cardData: CardData[] = [
  {
    title: 'Non-Intrusive Protection',
    content: [
      'Invisible marking subtly embeds within image data, preserving the image’s visual integrity without visible marks.',
    ]
  },
  {
    title: 'Enhanced Copyright Security',
    content: [
      'Difficult to tamper with, the watermark is hidden within image data, making unauthorized removal challenging.',
    ]
  },
  {
    title: 'Resilient to Compression and Resizing',
    content: [
      'Invisible watermarks stay intact through resizing, compression, or other slight modifications.',
    ]
  },
  {
    title: 'High Image Quality',
    content: [
      'Invisible watermarks retain the image’s original appearance, ideal for high-quality media.',
    ]
  },
  {
    title: 'Authenticity Verification',
    content: [
      'Acts as a unique identifier, useful for verifying original content in digital forensics and media.',
    ]
  },
  {
    title: 'Flexible Embedding and Extraction',
    content: [
      'Uses SVD to embed watermarks in specific regions, allowing recovery even with partial image tampering.',
    ]
  },
  {
    title: 'Visible vs Invisible Watermarking',
    content: [
      'Invisible watermarks preserve visual appeal, unlike traditional visible watermarks.',
    ]
  }
];



const Features: React.FC = () => {
  return (
    <div className="feature">
      <div className="feet">
        {cardData.map((data, index) => (
          <Card key={index} title={data.title} content={data.content} />
        ))}
      </div>
    </div>
  );
};
export default Features;
