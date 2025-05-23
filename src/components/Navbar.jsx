import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';

const Navbar = () => {
  const location = useLocation();
  const iconRefs = useRef([]);

  const links = [
    { to: "/", icon: "/Assests/Icons/home.png" },
    { to: "/about", icon: "/Assests/Icons/user.png" },
    { to: "/resume", icon: "/Assests/Icons/briefcase.png" },
    { to: "/portfolio", icon: "/Assests/Icons/megaphone.png" },
    { to: "/contact", icon: "/Assests/Icons/paper-plane.png" },
  ];

  useEffect(() => {
    iconRefs.current.forEach((icon, i) => {
      if (links[i].to === location.pathname) {
        gsap.to(icon, {
          scale: 1.3,
          filter: 'brightness(0) invert(1)',
          duration: 0.4,
          ease: 'power2.out'
        });
      } else {
        gsap.to(icon, {
          scale: 1,
          filter: 'grayscale(100%)',
          duration: 0.4,
          ease: 'power2.out'
        });
      }
    });
  }, [location.pathname]);

  return (
    <div className='sm:absolute fixed bottom-2 right-0
     sm:right-4 sm:top-1/4 z-40 cursor-none '>
      <ul className='sm:h-80 sm:w-12 w-screen flex sm:flex-col bg-myyellow justify-around rounded-3xl items-center relative'>
        {links.map((link, index) => (
          <React.Fragment key={index}>
            <li className={(index === 0 ? 'sm:pt-4 ' : '') + (index === links.length - 1 ? 'sm:pb-4 ' : '') + 'group'}>
              <Link to={link.to} className={"cursor-none transition-transform duration-300 sm:group-hover:scale-125"}>
                <img
                  ref={el => iconRefs.current[index] = el}
                  src={link.icon}
                  alt=""
                  className='w-6'
                />
              </Link>
            </li>
            {index < links.length - 1 && (
              <img
                src="/Assests/Icons/line.png"
                alt="line"
                className="sm:w-1 sm:h-4 sm:my-1 w-3 h-12
                 "
              />
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
