import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import ResumeSection from './Details';

const Resume = () => {
  const containerRef = useRef(null);

 const fullQuote = `Programs must be written for people to read,\nand only incidentally for machines to execute.`;

  const [displayText, setDisplayText] = useState('');
  const [showQuote, setShowQuote] = useState(false);

  useEffect(() => {
    const items = containerRef.current.querySelectorAll('.animate-me');

    gsap.fromTo(
      items,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        onComplete: () => setShowQuote(true),
      }
    );
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
    <div ref={containerRef} className="w-full h-screen flex sm:flex-row flex-col justify-between sm:overflow-hidden">
      {/* left yellow sidebar */}
      <div className="sm:w-1/4 sm:h-full h-96 bg-myyellow animate-me">
        <div className="sm:h-screen flex flex-col justify-normal p-4">
          <div className="group">
            <img
              src="/Assests/Images/man.jpg"
              alt=""
              className="w-full h-64 object-cover object-top rounded-md group-hover:scale-105 transition-transform duration-300"
            />
          </div>
              <pre className='text-lg italic text-center text-gray-900 leading-relaxed mb-40 whitespace-pre-wrap sm:mt-32 sm:pt-6 pt-3'>
            <span className="sm:hidden p-3 ">Programs must be written for people to read,and only incidentally for machines to execute..</span>
            <span className="hidden sm:inline">{displayText}<span className="blink-cursor">|</span></span>
          </pre>
        </div>
      </div>

      {/* right content */}
      <div className="sm:w-3/4 bg-mygray flex flex-col justify-start items-center">
        <div className="sm:mt-12 mt-6 sm:h-32 w-4/5 border-dashed border-2 border-gray-500 flex justify-center items-center animate-me">
          <h1 className="font-title sm:text-8xl text-5xl font-bold text-center">RESUME</h1>
        </div>

        <div className="sm:w-4/5 w-full h-3/4 flex flex-col animate-me">
          <ResumeSection />
          <div className='sm:hidden h-12'></div>
        </div>
      </div>

      {/* Cursor blink styling */}
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

export default Resume;
