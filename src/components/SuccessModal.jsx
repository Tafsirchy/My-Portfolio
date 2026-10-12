import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Check, X } from 'lucide-react';

const SuccessModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-modal-title"
        className="relative w-full max-w-md bg-[#FFFFFF] rounded-2xl border border-zinc-300 shadow-2xl p-6 sm:p-8 flex flex-col items-center text-center space-y-4 z-10 animate-slide-up"
      >
        
        {/* Success Icon */}
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-sm">
          <Check className="w-7 h-7 stroke-[2.5]" />
        </div>

        <div className="space-y-1.5">
          <h3 id="success-modal-title" className="text-xl font-bold text-zinc-950 tracking-tight">
            Message Sent Successfully
          </h3>
          <p className="text-sm text-zinc-600 leading-relaxed max-w-xs">
            Thank you for reaching out. Your message has been sent directly to Tafsir. You will receive a response shortly.
          </p>
        </div>

        <button
          onClick={onClose}
          aria-label="Close confirmation dialog"
          className="w-full min-h-[44px] py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
        >
          Done
        </button>

      </div>
    </div>,
    document.body
  );
};

export default SuccessModal;
