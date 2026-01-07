import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const ImageWithLoader = ({ 
  src, 
  alt, 
  className = '', 
  loaderClassName = '',
  onError,
  style,
  ...props 
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = (e) => {
    setLoading(false);
    setError(true);
    if (onError) {
      onError(e);
    }
  };

  return (
    <div className="relative w-full h-full inline-block">
      {/* Loader - Positioned absolutely over the image */}
      <AnimatePresence>
        {loading && !error && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/10 z-10 ${loaderClassName}`}
          >
            {/* Glassmorphic Loader Container */}
            <div className="relative">
              {/* Spinning Gradient Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 rounded-full border-4 border-transparent border-t-cyan-500 border-r-indigo-500"
              />
              
              {/* Pulsing Center Icon */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Loader2 className="w-6 h-6 text-cyan-400" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actual Image - Always rendered but starts hidden if loading */}
      <motion.img
        src={src}
        alt={alt}
        className={className}
        style={style}
        onLoad={handleLoad}
        onError={handleError}
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        {...props}
      />
    </div>
  );
};

export default ImageWithLoader;

