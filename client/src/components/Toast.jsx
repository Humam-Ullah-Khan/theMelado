import { useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isError = type === 'error';

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] animate-slideDown">
      <div className={`flex items-center gap-3 pl-4 pr-3 py-3 rounded-2xl shadow-2xl min-w-[300px] max-w-md ${
        isError
          ? 'bg-gradient-to-r from-red-600 to-red-500'
          : 'bg-gradient-to-r from-green-600 to-green-500'
      }`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          isError ? 'bg-white/20' : 'bg-white/20'
        }`}>
          {isError ? (
            <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-heading font-bold text-white text-sm leading-tight">
            {isError ? 'Error' : 'Congratulation'}
          </p>
          <p className="font-body text-white/80 text-xs mt-0.5 truncate">{message}</p>
        </div>

        <button onClick={onClose} className="text-white/60 hover:text-white transition p-1 shrink-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
