import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Check, X } from 'lucide-react';

const SuccessModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white rounded-2xl border border-zinc-200 shadow-2xl p-6 sm:p-8 flex flex-col items-center text-center space-y-4 z-10 animate-in zoom-in-95 duration-200">
        
        {/* Success Icon */}
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs">
          <Check className="w-7 h-7 stroke-[2.5]" />
        </div>

        <div className="space-y-1.5">
          <h3 className="text-xl font-bold text-zinc-950 tracking-tight">
            Message Sent Successfully
          </h3>
          <p className="text-sm text-zinc-600 leading-relaxed max-w-xs">
            Thank you for reaching out. Your message has been sent directly to Tafsir. You will receive a response shortly.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium rounded-xl transition-colors shadow-xs"
        >
          Done
        </button>

      </div>
    </div>,
    document.body
  );
};

export default SuccessModal;
