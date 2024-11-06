import Image from "next/image";
import '../css/app.css'
// import { Button } from "@/components/ui/button"
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import Navbar from "../components/navbar";
import Upload from "../components/Upload";
import Footer from "../components/footer";


export default function Home() {
  return (
    <div className="App">
      <Navbar/>
      <HeroSection/>
      <Features/>
      {/* <AnimatedCircuitBackground /> */}
      <Upload />
      
      <Footer/>
      


    </div>
  );
}
