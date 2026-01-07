import { ReactLenis } from 'lenis/react';

const SmoothScroll = ({ children }) => {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.05,              // Smoother interpolation (lower = smoother but slower response)
        duration: 1.2,           // Animation duration in seconds
        smoothWheel: true,       // Smooth wheel scrolling
        smoothTouch: false,      // Disable on touch for better mobile performance
        orientation: 'vertical', // Vertical scrolling only
        gestureOrientation: 'vertical',
        wheelMultiplier: 1,      // Scroll speed multiplier for mouse wheel
        touchMultiplier: 2,      // Scroll speed multiplier for touch
        infinite: false,         // No infinite scroll
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
