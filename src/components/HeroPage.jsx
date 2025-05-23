import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

const HeroPage = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Only animate on sm and up
    if (window.innerWidth < 640) return;
    const elements = containerRef.current.querySelectorAll('.hero-animate');
    const button = containerRef.current.querySelector('button');

    const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 1 } });

    tl.fromTo(
      elements,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, stagger: 0.3, clearProps: 'all' }
    );

    gsap.fromTo(
      button,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.9, clearProps: 'all' }
    );

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 1.2, delay: 0.5, ease: 'power3.out', clearProps: 'all' }
    );
  }, []);

  return (
    <div className="w-full h-full flex flex-col-reverse sm:flex-row sm:justify-between sm:overflow-hidden ">
      <div ref={containerRef} className="sm:w-96 sm:m-auto sm:p-0 p-2">
        <h1 className="hero-animate font-title sm:text-5xl text-5xl font-bold mt-3">HI THERE!</h1>
        <h1 className="hero-animate font-title sm:text-7xl text-6xl font-bold sm:mt-4 mt-2">
          I'M <span className="text-stroke sm:text-6xl text-6xl text-white">ADITYA</span>
        </h1>
        <div className="hero-animate bg-myyellow sm:w-72 w-full sm:text-xs text-base font-bold text-center sm:mt-2 mt-5 p-1">
          SOFTWARE ENGINEER/WEB DEVELOPER
        </div>
        <div className="hero-animate font-thin mt-5 text-base
        ">
          I’m more than just a student — I’m someone who turns ideas into action and challenges
          into growth. Every day, I push myself not just to improve, but to transform.
        </div>
        <button className="text-xl font-bold bg-amber-400 p-3 rounded-3xl text-white mt-5 group transition-all duration-300 hover:bg-yellow-400 hover:scale-105 hover:shadow-lg hover:-translate-y-1 cursor-none sm:cursor-none">
          <Link to="/about" className="cursor-none sm:cursor-none">
            MORE ABOUT ME
          </Link>
        </button>
      </div>
      <div className="h-1/2 sm:w-1/2 w-full bg-black
      ">
        <img
          ref={imageRef}
          className="sm:h-screen sm:w-full sm:object-cover w-full h-96 object-cover object-top
           "
          src="/Assests/Images/backImg.jpg"
          alt="Hero2"
        />
      </div>
    </div>
  );
};

export default HeroPage;
