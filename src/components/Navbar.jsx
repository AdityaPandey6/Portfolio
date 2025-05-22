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
    <div className='absolute right-4 top-1/4 z-40 cursor-none'>
      <ul className='h-80 w-12 flex flex-col bg-myyellow justify-evenly rounded-3xl items-center relative'>
        {links.map((link, index) => (
          <React.Fragment key={index}>
            <li className={(index === 0 ? 'pt-4 ' : '') + (index === links.length - 1 ? 'pb-4 ' : '') + 'group'}>
              <Link to={link.to} className={"cursor-none transition-transform duration-300 group-hover:scale-125"}>
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
                className="w-1 h-4 my-1"
                style={{ marginLeft: 'auto', marginRight: 'auto' }}
              />
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
