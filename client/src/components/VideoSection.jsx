import { useState, useEffect, useRef } from 'react';

export default function VideoSection() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [muted, setMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const popupVideoRef = useRef(null);

  useEffect(() => {
    fetch('/api/videos')
      .then(res => res.json())
      .then(setVideos)
      .catch(() => {});
  }, []);

  function toggleMute() {
    if (popupVideoRef.current) {
      popupVideoRef.current.muted = !popupVideoRef.current.muted;
      setMuted(popupVideoRef.current.muted);
    }
  }

  function closePopup() {
    setSelectedVideo(null);
    setMuted(false);
    setIsPaused(false);
  }

  if (videos.length === 0) return null;

  return (
    <>
      <section className="py-10 md:py-14 bg-[#FFF8F0]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-heading font-bold text-melado-maroon text-3xl md:text-4xl">
              Melado Moments
            </h2>
            <p className="font-body text-melado-maroon/60 text-sm mt-2">Watch and taste the experience</p>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
            {videos.map(video => (
              <div
                key={video._id}
                onClick={() => setSelectedVideo(video)}
                className="relative flex-shrink-0 w-[220px] md:w-[260px] aspect-[9/14] rounded-2xl overflow-hidden cursor-pointer group"
              >
                <video
                  src={video.url}
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                  onMouseEnter={e => e.target.play()}
                  onMouseLeave={e => { e.target.pause(); e.target.currentTime = 0; }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute top-3 left-3">
                  <div className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-3.5 h-3.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="font-heading font-bold text-white text-sm leading-tight">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
          onClick={closePopup}
        >
          <button
            onClick={closePopup}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-50 px-5 py-2 rounded-full border border-white/40 text-white font-body text-sm hover:bg-white/10 transition"
          >
            Close
          </button>

          <div className="relative w-[300px] md:w-[340px]" onClick={e => e.stopPropagation()}>
            <div className="relative aspect-[9/13] bg-black rounded-2xl overflow-hidden shadow-2xl">
              <video
                ref={popupVideoRef}
                src={selectedVideo.url}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                muted={muted}
                onClick={e => {
                  if (e.target.paused) { e.target.play(); setIsPaused(false); } else { e.target.pause(); setIsPaused(true); }
                }}
              />

              <button
                onClick={toggleMute}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center backdrop-blur-sm transition"
              >
                {muted ? (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l2-2m-2 2l-2-2" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                )}
              </button>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {isPaused && (
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-7 h-7 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 pb-6">
                <h3 className="font-heading font-bold text-white text-lg">{selectedVideo.title}</h3>
                <p className="font-body text-white/60 text-xs mt-1">Melado by Guluna</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
