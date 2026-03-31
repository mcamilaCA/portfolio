'use client';

import { useState, useEffect } from "react";

export default function Greeting() {
  const greetings = [
    "Hello There, I am Camila",
    "Hola, Soy Camila",
    "你好，我是嘉迷",
    "Coucou, je suis Camila",
  ];

  const [currentGreeting, setCurrentGreeting] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreeting((prev) => (prev + 1) % greetings.length);
    }, 4500); 

    return () => clearInterval(interval);
  }, [greetings.length]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "10vh",
        backgroundColor: "--parchment", 
        overflow: "hidden",
      }}
    >
      <h1
        key={currentGreeting}
        style={{
          fontFamily: "'Dancing Script', cursive", 
          fontSize: "clamp(2rem, 5vw, 6rem)", 
          fontWeight: 500,
          color: "#000", 
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", 
          animation: "handwriting 4s steps(30, end), fadeInSlide 4s ease-in-out", // Handwriting + fade-in animation
          textAlign: "center",
          position: "absolute",
          whiteSpace: "nowrap", 
          overflow: "hidden", 
          width: "100%", 
        }}
      >
        {greetings[currentGreeting]}
      </h1>

      <style jsx>{`
        @keyframes fadeInSlide {
          0% {
            opacity: 0;
            transform: translateY(20px); 
          }
          50% {
            opacity: 0.5;
            transform: translateY(10px); 
          }
          100% {
            opacity: 1;
            transform: translateY(0); 
          }
        }

        @keyframes handwriting {
          from {
            width: 0; 
          }
          to {
            width: 100%; 
          }
        }
      `}</style>
    </div>
  );
}