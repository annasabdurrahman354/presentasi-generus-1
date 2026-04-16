import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize, Minimize } from 'lucide-react';
import { slides } from './data';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slideCount = slides.length;

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = slideCount - 1;
      if (next >= slideCount) next = 0;
      return next;
    });
  }, [slideCount]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        paginate(1);
      } else if (e.key === 'ArrowLeft') {
        paginate(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.95,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.95,
      };
    }
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f2a24] to-[#061714] relative overflow-hidden flex items-center justify-center font-['Helvetica_Neue',Arial,sans-serif] text-[#e0f2f1]">
      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[980px] h-[100dvh] md:h-[720px] flex flex-col p-4 md:p-0">
        
        {/* Header / Top Bar */}
        <div className="flex justify-between items-center mb-4 px-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/[0.08] flex items-center justify-center backdrop-blur-md border border-white/10">
              <span className="text-xs font-bold text-[#ffd700]">{currentSlide + 1}</span>
            </div>
            <span className="text-sm font-bold text-[#ffd700] tracking-[1px] uppercase">
              GENERUS APP
            </span>
            <span className="text-[11px] text-[#b2dfdb] hidden md:inline">
              Panduan Sistem Ponpes Jagat
            </span>
          </div>
          <button 
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] transition-colors backdrop-blur-md border border-white/10 text-[#b2dfdb]"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
        </div>

        {/* Glass Panel for Slide Content */}
        <div className="flex-1 bg-white/[0.08] backdrop-blur-[12px] border border-white/10 shadow-[0_25px_50px_rgba(0,0,0,0.5)] rounded-[24px] p-6 md:p-12 flex flex-col relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 }
              }}
              className="flex-1 flex flex-col h-full w-full absolute inset-0 p-6 md:p-12 overflow-y-auto custom-scrollbar"
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="p-4 bg-white/[0.08] rounded-2xl border border-white/10">
                  <Icon size={40} className="text-[#ffd700]" />
                </div>
                <div>
                  <span className="inline-block px-3 py-1 border border-[#ffd700] rounded-full text-[#ffd700] text-[10px] uppercase font-bold mb-2">
                    Modul {String(currentSlide + 1).padStart(2, '0')}
                  </span>
                  <h1 className="text-[32px] font-light text-white leading-tight">
                    {slide.title.replace(/^\d+\.\s*/, '')}
                  </h1>
                  {slide.subtitle && (
                    <h2 className="text-lg text-[#b2dfdb] mt-1">
                      {slide.subtitle}
                    </h2>
                  )}
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-6 text-[13px] text-[#b2dfdb] leading-[1.6]">
                {slide.content.map((section, idx) => (
                  <div key={idx}>
                    {section.subtitle && (
                      <h3 className="text-[15px] font-medium text-white mb-3 flex items-center gap-2">
                        {section.subtitle}
                      </h3>
                    )}
                    {section.text && (
                      <p className="mb-4 last:mb-0 opacity-80">{section.text}</p>
                    )}
                    {section.list && (
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        {section.list.map((item, i) => {
                          const parts = item.split(':');
                          const hasTitle = parts.length > 1 && parts[0].length < 40;
                          return (
                            <li key={i} className="bg-white/[0.08] border border-white/10 p-5 rounded-[16px] flex flex-col">
                              {hasTitle ? (
                                <>
                                  <h3 className="text-white text-[15px] mb-2">{parts[0]}</h3>
                                  <span className="text-[13px] opacity-80">{parts.slice(1).join(':').trim()}</span>
                                </>
                              ) : (
                                <span className="text-[13px] opacity-80">{item}</span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="mt-6 flex items-center justify-between bg-white/[0.08] backdrop-blur-[12px] border border-white/10 shadow-[0_25px_50px_rgba(0,0,0,0.5)] rounded-[24px] px-8 py-5">
          <button
            onClick={() => paginate(-1)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 transition-all active:scale-95 text-[13px] text-white"
          >
            <ChevronLeft size={16} />
            <span className="hidden md:inline font-medium">Sebelumnya</span>
          </button>

          {/* Dots Indicator */}
          <div className="hidden md:flex items-center gap-2 overflow-x-auto max-w-[50%] px-2 py-1 custom-scrollbar">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentSlide ? 1 : -1);
                  setCurrentSlide(idx);
                }}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide 
                    ? 'bg-[#ffd700] shadow-[0_0_10px_#ffd700]' 
                    : 'bg-white/10 hover:bg-white/30'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          
          <div className="md:hidden text-sm font-medium text-[#b2dfdb]">
            {currentSlide + 1} / {slideCount}
          </div>

          <button
            onClick={() => paginate(1)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#ffd700] hover:bg-[#ffed4a] transition-all active:scale-95 text-black text-[13px] font-bold border-none"
          >
            <span className="hidden md:inline">Selanjutnya</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
