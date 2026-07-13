import { useState, useEffect, useRef } from 'react';

const CHARS = '!<>-_\\\\/[]{}—=+*^?#________';

const ScrambleText = ({ text, forceHover }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDecoded, setIsDecoded] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (forceHover) {
      setIsDecoded(false);
      scramble();
    }
  }, [forceHover]);

  const scramble = () => {
    let pos = 0;
    clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setDisplayText(text.split('').map((char, index) => {
        if (pos >= index) return char;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join(''));
      
      // Advance proportionally to text length so it always finishes in ~8 ticks (80ms)
      pos += Math.max(text.length / 8, 1);
      
      if (pos >= text.length) {
        clearInterval(intervalRef.current);
        setIsDecoded(true);
      }
    }, 10);
  };

  useEffect(() => {
    // Start completely scrambled
    setDisplayText(text.split('').map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join(''));
  }, [text]);

  return (
    <span 
      className="font-mono cursor-crosshair inline-block"
      onMouseEnter={() => {
        setIsDecoded(false);
        scramble();
      }}
    >
      {displayText}
    </span>
  );
};

export default ScrambleText;
