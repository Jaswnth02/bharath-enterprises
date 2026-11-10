import React, { useRef, useEffect } from 'react';
import { 
  Globe2, 
  Handshake, 
  Briefcase, 
  Settings2, 
  ShieldCheck, 
  TrendingUp
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const strengths = [
  {
    title: 'Connecting Opportunities Globally',
    topBadge: '14+ STRATEGIC MARKETS',
    footerBadge: 'STRATEGIC TRADE',
    desc: 'Established bilateral trade channels and commercial desks connecting Indian industrial capabilities with Southeast Asia (ASEAN), the UK, and Australia.',
    icon: Globe2,
  },
  {
    title: 'End-to-End Trade Support',
    topBadge: 'TURNKEY EXECUTION',
    footerBadge: 'TRADE FACILITATION',
    desc: 'Comprehensive lifecycle management from foreign supplier identification and buyer-seller matching to export customs clearance, documentation, and port logistics.',
    icon: Handshake,
  },
  {
    title: 'Multi-Sector Engineering Expertise',
    topBadge: 'INDUSTRIAL EXPERIENCE',
    footerBadge: 'ENGINEERING & SPARES',
    desc: 'Deep multi-disciplinary domain knowledge covering industrial boilers, steam piping, PLC automated controls, chemical processing, and heavy mechanical spares.',
    icon: Briefcase,
  },
  {
    title: 'Bankable DPR & Project Solutions',
    topBadge: 'BESPOKE ADVISORY',
    footerBadge: 'PROJECT CONSULTING',
    desc: 'Detailed Project Reports (DPR), financial sensitivity modeling, and institutional guidance for government subsidy frameworks including PMEGP and MUDRA.',
    icon: Settings2,
  },
  {
    title: 'Trusted Sourcing & Ethical Integrity',
    topBadge: 'VERIFIED GOVERNANCE',
    footerBadge: 'TRADE COMPLIANCE',
    desc: 'Uncompromising commitment to trade statutory compliance, transparent pricing, verified international partner networks, and rigorous ethical standards.',
    icon: ShieldCheck,
  },
  {
    title: 'Sustained Commercial Growth',
    topBadge: 'MEASURABLE RETURNS',
    footerBadge: 'MARKET EXPANSION',
    desc: 'Long-term business development advisory empowering enterprises to scale production, enter high-margin global markets, and build resilient profitability.',
    icon: TrendingUp,
  }
];

// Duplicated for seamless infinite continuous slow drifting from right to left
const loopedStrengths = [...strengths, ...strengths];

export const WhyChooseUs = () => {
  const { openEnquiryModal } = useSite();
  const trackRef = useRef(null);
  const progressBarRef = useRef(null);

  const posRef = useRef(0);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(0);
  const resumeTimeoutRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animId;
    let lastTime = performance.now();
    // 0.65px per frame = smooth, clearly visible, relaxed slow motion drift
    const speed = 0.65;

    const loop = (time) => {
      const dt = Math.min(time - lastTime, 40);
      lastTime = time;

      if (!isHoveredRef.current && !isDraggingRef.current) {
        const halfWidth = track.scrollWidth / 2;
        if (halfWidth > 0) {
          posRef.current += speed * (dt / 16.67);
          if (posRef.current >= halfWidth) {
            // Seamless infinite wrap with zero visual jump
            posRef.current -= halfWidth;
          }
          track.style.transform = `translate3d(-${posRef.current}px, 0, 0)`;

          // Update progress bar
          if (progressBarRef.current) {
            const progress = (posRef.current / halfWidth) * 100;
            progressBarRef.current.style.width = `${Math.max(16, progress)}%`;
          }
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartPosRef.current = posRef.current;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current || !trackRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    const track = trackRef.current;
    const halfWidth = track.scrollWidth / 2;
    if (halfWidth <= 0) return;

    let newPos = dragStartPosRef.current - dx;
    while (newPos < 0) newPos += halfWidth;
    while (newPos >= halfWidth) newPos -= halfWidth;

    posRef.current = newPos;
    track.style.transform = `translate3d(-${newPos}px, 0, 0)`;

    if (progressBarRef.current) {
      const progress = (newPos / halfWidth) * 100;
      progressBarRef.current.style.width = `${Math.max(16, progress)}%`;
    }
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isDraggingRef.current = false;
    }, 2500);
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] flex flex-col justify-center py-6 sm:py-8 lg:py-10 relative bg-slate-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Heading only */}
          <div className="lg:col-span-3 flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#0A192F] tracking-tight leading-[1.12] flex items-center gap-2">
              <span>What We Do</span>
              <span className="text-2xl sm:text-3xl text-slate-400 font-normal select-none">↴</span>
            </h2>
          </div>

          {/* Right Column: Sliding Horizontal Cards Stream with Hardware GPU Translation */}
          <div 
            className="lg:col-span-9 flex flex-col justify-between overflow-hidden cursor-grab active:cursor-grabbing select-none"
            onMouseEnter={() => { isHoveredRef.current = true; }}
            onMouseLeave={() => { 
              isHoveredRef.current = false; 
              handlePointerUp();
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            <div
              ref={trackRef}
              className="flex items-stretch gap-4 sm:gap-5 py-2 px-1 will-change-transform"
              style={{ transform: 'translate3d(0, 0, 0)' }}
            >
              {loopedStrengths.map((item, idx) => {
                const Icon = item.icon;
                const cardNum = (idx % strengths.length) + 1;
                return (
                  <div
                    key={idx}
                    className="shrink-0 w-[270px] sm:w-[305px] md:w-[320px] min-h-[400px] sm:min-h-[420px] bg-white rounded-3xl sm:rounded-[30px] p-5 sm:p-6 border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col justify-between group hover:-translate-y-1 hover:shadow-lg transition-all duration-300 pointer-events-auto"
                  >
                    <div>
                      {/* Signature Visual Top Block */}
                      <div className="w-full h-40 sm:h-44 rounded-2xl bg-gradient-to-br from-[#0F284E] via-[#1B3F73] to-[#0A192F] p-4 sm:p-5 text-white flex flex-col justify-between relative overflow-hidden shadow-inner mb-4">
                        {/* Decorative ambient geometric light */}
                        <div className="absolute -right-6 -top-6 w-28 h-28 bg-accent/30 rounded-full blur-2xl pointer-events-none" />
                        <div className="absolute -left-6 -bottom-6 w-28 h-28 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />
                        
                        <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                          <Icon className="w-4 h-4 text-accent" />
                        </div>

                        <div className="relative z-10">
                          <span className="text-[10px] font-mono font-bold text-accent uppercase tracking-wider block mb-1">
                            {item.topBadge}
                          </span>
                          <h4 className="text-base sm:text-lg font-bold font-sans text-white leading-tight">
                            {item.title}
                          </h4>
                        </div>
                      </div>

                      <div className="w-6 h-[2px] bg-slate-200 mb-3" />

                      <p className="text-xs sm:text-[13px] text-slate-500 font-light leading-relaxed line-clamp-3">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-3 sm:pt-3.5 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-slate-400">
                        0{cardNum} / 06
                      </span>
                      <span className="text-[10px] font-bold text-accent uppercase tracking-wider bg-accent/10 px-2.5 py-0.5 rounded-md">
                        {item.footerBadge}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Scroll Progress Bar Indicator tracking live right-to-left drift */}
            <div className="flex items-center justify-end mt-3 pt-1 pr-2">
              <div className="w-24 sm:w-36 h-[3px] bg-slate-200 rounded-full overflow-hidden">
                <div 
                  ref={progressBarRef}
                  className="h-full bg-[#0A192F] rounded-full transition-all duration-100"
                  style={{ width: '16%' }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
