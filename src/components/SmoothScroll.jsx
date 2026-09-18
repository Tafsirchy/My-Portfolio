import { ReactLenis } from 'lenis/react';

const SmoothScroll = ({ children }) => {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.12,              // Snappy, natural and responsive velocity
        duration: 0.9,           // Natural duration without lag
        smoothWheel: true,       // Crisp wheel scrolling
        smoothTouch: false,      // Disabled on mobile for 60fps native feel
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
