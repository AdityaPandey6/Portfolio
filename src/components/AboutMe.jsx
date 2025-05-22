import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const AboutMe = () => {
  const containerRef = useRef(null);

  const fullQuote = `Code is like humor.\nWhen you have to explain it,\nit’s bad.`;
  const [displayText, setDisplayText] = useState('');
  const [showQuote, setShowQuote] = useState(false);

  useEffect(() => {
    const elements = containerRef.current.querySelectorAll('.animate-me');

    gsap.fromTo(elements, {
      opacity: 0,
      y: 50,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
      onComplete: () => setShowQuote(true),
    });
  }, []);

  useEffect(() => {
    if (!showQuote) return;

    let index = 0;
    let deleting = false;
    const speed = 70;

    const typeLoop = () => {
      if (!deleting) {
        setDisplayText(fullQuote.slice(0, index + 1));
        index++;
        if (index === fullQuote.length) {
          deleting = true;
          setTimeout(typeLoop, 1000);
          return;
        }
      } else {
        setDisplayText(fullQuote.slice(0, index - 1));
        index--;
        if (index === 0) {
          deleting = false;
          setTimeout(typeLoop, 500);
          return;
        }
      }
      setTimeout(typeLoop, speed);
    };

    typeLoop();
  }, [showQuote, fullQuote]);

  return (
    <div ref={containerRef} className='w-full h-screen flex justify-between overflow-hidden'>
      {/* Sidebar */}
      <div className='w-1/4 bg-myyellow animate-me'>
        <div className='h-screen flex flex-col justify-between p-4'>
          <div className='group'>
            <img src="/Assests/Images/man.jpg" alt="" className='w-full h-64 object-cover object-top rounded-md group-hover:scale-105 transition-transform duration-300' />
          </div>
          <pre className='text-lg italic text-center text-gray-900 leading-relaxed mb-40 whitespace-pre-wrap'>
            {displayText}
            <span className="blink-cursor">|</span>
          </pre>
        </div>
      </div>

      {/* Main Content */}
      <div className='w-3/4 bg-mygray flex flex-col justify-start items-center'>
        <div className='mt-12 h-32 w-4/5 border-dashed border-2 border-gray-500 flex justify-center items-center animate-me'>
          <h1 className='font-title text-8xl font-bold text-center'>ABOUT ME</h1>
        </div>

        <div className='mt-8 w-4/5 animate-me'>
          <span className='text-3xl font-title'>
            I'm <span className='font-bold text-3xl'>Aditya Pandey, </span>
            Software Engineer / Developer
          </span>
          <div className='mt-5 text-gray-600'>
            A dedicated and forward-thinking individual with a strong focus on building impactful solutions through technology. Known for combining creativity with precision, consistently delivering work that reflects both technical skill and a commitment to excellence. Passionate about continuous growth, with a mindset geared toward solving real-world problems and driving innovation beyond the expected.
          </div>
        </div>

        <div className='mt-8 flex justify-between items-center w-4/5 h-4/5 mb-8 animate-me'>
          <div className='flex w-full'>
            <img src="/Assests/Images/info.png" alt="" className='w-full' />
            <div className='ml-4 w-full font-title'>
              <h1 className='font-title text-2xl font-bold'>What I do?</h1>
              <h1 className='mt-3 font-bold'>Graduation - <span className='text-black font-light'>Pursuing B.Tech in Computer Science from Graphic Era University.</span></h1>
              <h1 className='mt-3 font-bold'>Specialization - <span className='text-black font-light'>Specialization in Artificial Intelligence and Software Development</span></h1>
              <h1 className='mt-3 font-bold'>Good At - <span className='text-black font-light'>Problem Solving, Communication</span></h1>
            </div>
          </div>
        </div>
      </div>

      {/* Cursor style */}
      <style jsx>{`
        .blink-cursor {
          font-weight: 100;
          font-size: 24px;
          color: black;
          animation: blink 1s step-start 0s infinite;
        }

        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutMe;
