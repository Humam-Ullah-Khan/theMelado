export default function LoadingScreen({ ready }) {
  return (
    <div className={`fixed inset-0 z-[9999] bg-[#FFF8F0] flex flex-col items-center justify-center transition-opacity duration-500 ${ready ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <img
        src="/images/Logo.jpg"
        alt="Melado"
        className="h-20 w-auto rounded-2xl mb-8 animate-bounce"
      />

      <div className="flex items-center gap-3 mb-8">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#F8789C] to-[#45AFC6] animate-ping opacity-30" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#F8789C] to-[#45AFC6] flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l7-7 3 3-7 7-3-3z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 13l-1.5-7.5A2 2 0 0014.5 4h-5a2 2 0 00-2 1.5L6 13" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 bg-[#F8789C] rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>

      <p className="font-heading font-bold text-melado-maroon text-sm tracking-wide">
        Loading Melado...
      </p>

      <div className="absolute bottom-8 left-0 right-0">
        <p className="font-body text-melado-maroon/30 text-xs text-center">
          Premium Dairy Ice Cream by Guluna
        </p>
      </div>
    </div>
  );
}
