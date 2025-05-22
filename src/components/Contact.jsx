import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const Contact = () => {
  const containerRef = useRef(null);

  const fullQuote = `There are two hard things in\ncomputer science: cache\ninvalidation, naming things,\nand off-by-one errors.`;

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
    const speed = 70; // typing/deleting speed in ms

    const typeLoop = () => {
      if (!deleting) {
        // Typing forward
        setDisplayText(fullQuote.slice(0, index + 1));
        index++;
        if (index === fullQuote.length) {
          // Pause at full text, then start deleting
          deleting = true;
          setTimeout(typeLoop, 1000); // wait 1 second before deleting
          return;
        }
      } else {
        // Deleting backward
        setDisplayText(fullQuote.slice(0, index - 1));
        index--;
        if (index === 0) {
          // Pause at empty, then start typing again
          deleting = false;
          setTimeout(typeLoop, 500); // wait half second before typing again
          return;
        }
      }
      setTimeout(typeLoop, speed);
    };

    typeLoop();

    // Cleanup is not necessary here since no intervals, just chained timeouts

  }, [showQuote, fullQuote]);

  return (
    <div ref={containerRef} className='w-full h-screen flex justify-between overflow-hidden'>
      {/* Sidebar */}
      <div className='w-1/4 bg-myyellow animate-me'>
        <div className='h-screen flex flex-col justify-between p-4'>
          <div className='group'>
            <img
              src="/Assests/Images/man.jpg"
              alt=""
              className='w-full h-64 object-cover object-top rounded-md group-hover:scale-105 transition-transform duration-300'
            />
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
          <h1 className='font-title text-8xl font-bold text-center'>CONTACT</h1>
        </div>
        <div className='w-4/5 h-full'>
          <h1 className='font-title text-3xl font-light mt-12 animate-me'>
            Feel <span className='font-bold'>free</span> to contact me!
          </h1>
          <p className='font-title animate-me mt-3 text-lg font-thin'>
            Feel free to reach out! Whether you have a project idea, collaboration opportunity, or just want to say hi, I’m all ears. Let's connect and create something amazing.
          </p>
          <div className='flex mt-12 justify-evenly'>
            <div className='flex items-center mt-10 animate-me'>
              <img src="/Assests/Icons/monitor.png" alt="" className='w-32' />
              <h1 className='font-title text-sm ml-4'>8800461596d@gmail.com</h1>
            </div>
            <div className='flex items-center mt-10 animate-me'>
              <img src="/Assests/Icons/telephone.png" alt="" className='w-32' />
              <h1 className='font-title text-2xl ml-4'>+91 7818957929</h1>
            </div>
          </div>
          <p className='text-5xl font-title text-center mt-14 animate-me font-medium'>THANKS FOR PATIENCE!</p>
        </div>
      </div>

      {/* Add blink-cursor style here or in your CSS */}
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

export default Contact;
