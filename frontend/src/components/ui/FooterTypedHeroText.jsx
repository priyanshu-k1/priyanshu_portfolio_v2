import { useEffect, useRef } from 'react';
import Typed from 'typed.js';


const FooterTypedHeroText = () => {
    const el = useRef(null);
    const typed = useRef(null);

    useEffect(() => {
        const options = {
        strings: [
            'Android App Developer',
            'MERN-Stack Developer.',
            'AI/Ml Enthusiast .'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1500,
        loop: true,
        cursorChar: '|',
        };

        typed.current = new Typed(el.current, options);

        return () => {
            if (typed.current) {
                typed.current.destroy();
            }
        };
    }, []);
    
  return (
        <span ref={el} className="font-mono text-[11px]
            transition-all ease-in-out duration-300 
            uppercase tracking-[0.2em] text-purple-100 hover:text-purple-400 group-hover:hover:text-purple-400">            
        </span>
  )
}

export default FooterTypedHeroText