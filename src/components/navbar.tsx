import type { Metadata } from "next";
import '../css/navbar.css';
import Image from "next/image";
import { Button } from "./ui/button";



export default function navbar() {
  return (
    <div className="Navbar">
        <div className="nav-left">
        <Image
        src="logo.svg" // Path to your image
        alt="Description of image"
        width={150} // Desired width
        height={80} // Desired height
        />
        </div>
        <div className="nav-right">
            <a href="*">Home</a>
            <a href="*">Get Started</a>
            <Button variant="outline" className="px-10 py-2">Login</Button>
        </div>
        
    </div>

    
  )
}
