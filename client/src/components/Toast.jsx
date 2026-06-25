import { useEffect, useState } from 'react';

export default function Toast({ message, type = 'success', onClose }) {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setClosing(true), 2700);
    const remove = setTimeout(onClose, 3000);
    return () => { clearTimeout(timer); clearTimeout(remove); };
  }, [onClose]);

  const isError = type === 'error';

  return (
    <div
      className="fixed top-5 left-1/2 -translate-x-1/2 z-[100]"
      style={{
        animation: closing ? 'toastSlideUp 0.3s ease-in forwards' : 'slideDown 0.35s ease-out',
      }}
    >
      <div
        className={`relative flex items-center gap-3 pl-4 pr-3 py-3 rounded-2xl min-w-[300px] max-w-md overflow-hidden ${
          isError
            ? 'bg-gradient-to-br from-rose-600 to-red-600 shadow-lg shadow-rose-500/30'
            : 'bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/30'
        }`}
        style={{ border: '1px solid rgba(255,255,255,0.15)' }}
      >
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
            isError ? 'bg-white/15' : 'bg-white/15'
          }`}
        >
          {isError ? (
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-heading font-bold text-white text-sm leading-tight">
            {isError ? 'Deleted' : 'Congratulation'}
          </p>
          <p className="font-body text-white/75 text-xs mt-0.5 truncate">{message}</p>
        </div>

        <button
          onClick={onClose}
          className={`p-1.5 rounded-lg shrink-0 transition-all duration-200 ${
            isError
              ? 'text-rose-200 hover:text-white hover:bg-white/15'
              : 'text-emerald-200 hover:text-white hover:bg-white/15'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div
          className={`absolute bottom-0 left-0 h-[3px] rounded-full ${
            isError ? 'bg-white/70' : 'bg-white/60'
          }`}
          style={{ animation: 'toastProgress 3s linear forwards' }}
        />
      </div>
    </div>
  );
}
