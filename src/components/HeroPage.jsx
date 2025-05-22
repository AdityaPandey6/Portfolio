import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

const HeroPage = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const elements = containerRef.current.querySelectorAll('h1, div, button');

    const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 1 } });

    // Animate container elements from opacity 0 and y=50 to opacity 1 and y=0
    tl.fromTo(
      elements,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.3, clearProps: 'all' }
    );

    // Animate image from opacity 0 and scale 1.1 to opacity 1 and scale 1
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 1.2, delay: 0.5, ease: 'power3.out', clearProps: 'all' }
    );
  }, []);

  return (
    <div className="w-full h-screen flex flex-row justify-between overflow-hidden">
      <div ref={containerRef} className="w-96 m-auto">
        <h1 className="font-title text-5xl font-bold">HI THERE!</h1>
        <h1 className="font-title text-7xl font-bold mt-4">
          I'M <span className="text-stroke text-6xl text-white">ADITYA</span>
        </h1>
        <div className="bg-myyellow w-72 text-sm font-bold text-center mt-2 p-1">
          SOFTWARE ENGINEER/WEB DEVELOPER
        </div>
        <div className="font-thin mt-5">
          I’m more than just a student — I’m someone who turns ideas into action and challenges
          into growth. Every day, I push myself not just to improve, but to transform.
        </div>
        <button className="cursor-none text-xl font-bold bg-amber-400 p-3 rounded-3xl text-white mt-5 group transition-all duration-300 hover:bg-yellow-400 hover:scale-105 hover:shadow-lg hover:-translate-y-1">
          <Link to="/about" className="cursor-none">
          MORE ABOUT ME
          </Link>
        </button>
      </div>
      <div className="w-1/2">
        <img
          ref={imageRef}
          className="h-screen w-full object-cover "
          src="/Assests/Images/backImg.jpg"
          alt="Hero2"
        />
      </div>
    </div>
  );
};

export default HeroPage;
