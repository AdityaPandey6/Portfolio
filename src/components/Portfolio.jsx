import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const tabData = [
  { label: 'Projects', content: <ProjectsSlider /> },
  { label: 'Tasks', content: <div>Available Soon</div> },
  { label: 'Other', content: (
    <SliderCards />
  ) },
];

const Portfolio = () => {
  const containerRef = useRef(null);

  const fullQuote = `Programming today is a race between software engineers striving to build bigger and better idiot-proof programs,\nand the Universe trying to produce bigger and better idiots.\nSo far, the Universe is winning.`;

  const [displayText, setDisplayText] = useState('');
  const [showQuote, setShowQuote] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

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
    <div ref={containerRef} className="w-full h-screen flex justify-between overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-myyellow animate-me">
        <div className="h-screen flex flex-col justify-between p-4">
          <div className="group">
            <img
              src="/Assests/Images/man.jpg"
              alt=""
              className="w-full h-64 object-cover object-top rounded-md group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <pre className="text-lg italic text-center text-gray-900 leading-relaxed mb-40 whitespace-pre-wrap">
            {displayText}
            <span className="blink-cursor">|</span>
          </pre>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 bg-mygray flex flex-col justify-start items-center">
        <div className="mt-12 h-32 w-4/5 border-dashed border-2 border-gray-500 flex justify-center items-center animate-me">
          <h1 className="font-title text-8xl font-bold text-center">PORTFOLIO</h1>
        </div>

        {/* Tabs Container */}
        <div className="mt-8 w-4/5 animate-me">
          <div className="flex justify-center gap-8 mb-6">
            {tabData.map((tab, idx) => (
              <span
                key={tab.label}
                onClick={() => setActiveTab(idx)}
                className={`font-title text-2xl cursor-none px-4 py-1 transition-all duration-200 border-b-4 ${activeTab === idx ? 'border-myyellow text-black font-extrabold' : 'border-transparent text-gray-700 font-semibold hover:text-black hover:border-myyellow'}`}
                style={{ letterSpacing: '1px' }}
              >
                {tab.label}
              </span>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow-md p-8 min-h-[150px] transition-all duration-300">
            {tabData[activeTab].content}
          </div>
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

function SliderCards() {
  const trackRef = React.useRef(null);
  const intervalRef = React.useRef();
  const [paused, setPaused] = React.useState(false);
  const [direction, setDirection] = React.useState(-1); // -1 for left, 1 for right
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    function animate() {
      if (!paused && trackRef.current) {
        let next = current + direction;
        const track = trackRef.current;
        const maxScroll = track.scrollWidth - track.clientWidth;
        // Reverse direction at ends
        if (next <= -maxScroll) {
          next = -maxScroll;
          setDirection(1);
        } else if (next >= 0) {
          next = 0;
          setDirection(-1);
        }
        track.style.transform = `translateX(${next}px)`;
        setCurrent(next);
      }
      intervalRef.current = requestAnimationFrame(animate);
    }
    intervalRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(intervalRef.current);
  }, [paused, direction, current]);

  return (
    <div className="w-full">
      <div className="relative w-full h-74 max-w-3xl mx-auto overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-8 pb-4"
        >
          {/* YouTube Card */}
          <div
            className="bg-white rounded-xl shadow-lg p-6 flex-shrink-0 flex flex-col items-center w-72 min-w-72 slider-card"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="group">
              <img
                src="/Assests/Images/yt_img.jpg"
                alt="YouTube Channel Poster"
                className="w-24 h-24 rounded-full object-cover mb-4 shadow group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="font-title text-base mb-2 text-center">Check out my YouTube channel:</span>
            <a
              href="https://www.youtube.com/@AdityaPandey-b5p"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-base font-semibold rounded-full shadow hover:bg-red-700 transition-colors duration-200 cursor-none"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.12C19.228 3.5 12 3.5 12 3.5s-7.228 0-9.386.566a2.994 2.994 0 0 0-2.112 2.12C0 8.355 0 12 0 12s0 3.645.502 5.814a2.994 2.994 0 0 0 2.112 2.12C4.772 20.5 12 20.5 12 20.5s7.228 0 9.386-.566a2.994 2.994 0 0 0 2.112-2.12C24 15.645 24 12 24 12s0-3.645-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              Visit Channel
            </a>
          </div>
          {/* LinkedIn Card */}
          <div
            className="bg-white rounded-xl shadow-lg p-6 flex-shrink-0 flex flex-col items-center w-72 min-w-72 slider-card"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="group">
              <img
                src="/Assests/Images/linkdin.jpg"
                alt="LinkedIn Profile"
                className="w-24 h-24 rounded-full object-cover mb-4 shadow group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="font-title text-base mb-2 text-center">Connect with me on LinkedIn:</span>
            <a
              href="https://www.linkedin.com/in/aditya-pandey-67a263350/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-700 text-white text-base font-semibold rounded-full shadow hover:bg-blue-800 transition-colors duration-200 cursor-none"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
              Visit LinkedIn
            </a>
          </div>
          {/* LeetCode Card */}
          <div
            className="bg-white rounded-xl shadow-lg p-6 flex-shrink-0 flex flex-col items-center w-72 min-w-72 slider-card"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="group">
              <img
                src="/Assests/Images/leetcodeImg.jpg"
                alt="LeetCode Profile"
                className="w-24 h-24 rounded-full object-cover mb-4 shadow group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="font-title text-base mb-2 text-center">Check out my LeetCode profile:</span>
            <a
              href="https://leetcode.com/u/AdPandey/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-yellow-500 text-black text-base font-semibold rounded-full shadow hover:bg-yellow-600 transition-colors duration-200 cursor-none"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M20.207 17.207l-2.414 2.414c-1.562 1.562-4.095 1.562-5.657 0l-7.071-7.071c-1.562-1.562-1.562-4.095 0-5.657l2.414-2.414c.391-.391 1.023-.391 1.414 0s.391 1.023 0 1.414l-2.414 2.414c-.781.781-.781 2.047 0 2.828l7.071 7.071c.781.781 2.047.781 2.828 0l2.414-2.414c.391-.391 1.023-.391 1.414 0s.391 1.023 0 1.414z"/></svg>
              Visit LeetCode
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

function ProjectsSlider() {
  const trackRef = React.useRef(null);
  const intervalRef = React.useRef();
  const [paused, setPaused] = React.useState(false);
  const [direction, setDirection] = React.useState(-1); // -1 for left, 1 for right
  const [current, setCurrent] = React.useState(0);

  // Example project data (replace with your real projects)
  const projects = [
    {
      title: 'Portfolio Website',
      description: 'A Simplistic portfolio built with React and Tailwind CSS.',
      image: '/Assests/Images/portfolio.png',
      link: 'https://your-portfolio-link.com',
    },
    {
      title: 'Intermediate Compiler',
      description: 'This project is a C-to-Intermediate-Code compiler with a modern, interactive web frontend.',
      image: '/Assests/Images/compiler.png',
      link: 'https://github.com/AdityaPandey6/Intermediate_Compiler',
    },
    {
      title: 'Sim Os',
      description: 'A simple, fun, and safe command-line operating system simulation for learning with JavaScript!',
      image: '/Assests/Images/image.png',
      link: 'https://github.com/AdityaPandey6/SimOS-JS',
    },
    {
      title: 'Droply Clone',
      description: 'Droply is a modern, secure cloud storage web application built with Next.js, Clerk authentication.',
      image: '/Assests/Images/droply.png',
      link: 'https://github.com/AdityaPandey6/Droply_Clone',
    },
  ];

  React.useEffect(() => {
    function animate() {
      if (!paused && trackRef.current) {
        let next = current + direction;
        const track = trackRef.current;
        const maxScroll = track.scrollWidth - track.clientWidth;
        if (next <= -maxScroll) {
          next = -maxScroll;
          setDirection(1);
        } else if (next >= 0) {
          next = 0;
          setDirection(-1);
        }
        track.style.transform = `translateX(${next}px)`;
        setCurrent(next);
      }
      intervalRef.current = requestAnimationFrame(animate);
    }
    intervalRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(intervalRef.current);
  }, [paused, direction, current]);

  return (
    <div className="w-full">
      <div className="relative w-full h-72 max-w-3xl mx-auto overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-8 pb-4"
        >
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-6 flex-shrink-0 flex flex-col items-center w-72 min-w-72 slider-card hover:scale-105 transition-transform duration-300"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div className="group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-24 h-24 rounded-lg object-cover mb-4 shadow group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="font-title text-lg mb-2 text-center font-bold">{project.title}</span>
              <span className="text-gray-700 text-sm mb-4 text-center">{project.description}</span>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-myyellow text-black text-base font-semibold rounded-full shadow hover:bg-yellow-400 transition-colors duration-200 cursor-none"
              >
                View Project
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
