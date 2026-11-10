import React, { useRef, useEffect } from 'react';
import { Check } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const services = [
  {
    id: 'industrial-equipment-spares',
    title: 'Industrial Equipment & Spares',
    category: 'Engineering & Spares',
    desc: 'High-performance industrial machinery, boilers, spares, and automation equipment.',
    bullets: [
      'Boilers & Spares',
      'Steam Accessories',
      'Instrumentation & PLC',
      'Refractory Works',
      'Process Equipment',
    ],
  },
  {
    id: 'import-export-services',
    title: 'Import & Export Services',
    category: 'Cross-Border Logistics',
    desc: 'End-to-end foreign trade management, international sourcing, and customs clearance.',
    bullets: [
      'Global Sourcing',
      'Buyer-Seller Connect',
      'Export Documentation',
      'Customs Support',
      'Logistics Coordination',
    ],
  },
  {
    id: 'project-consulting-dpr',
    title: 'Project Consulting & DPR',
    category: 'Financial & Advisory',
    desc: 'Bankable Detailed Project Reports, financial modeling, and government subsidy advisory.',
    bullets: [
      'Detailed Project Reports (DPR)',
      'Feasibility Studies',
      'Industry Analysis',
      'Financial Projections',
      'Government Scheme Guidance (PMEGP, MUDRA)',
    ],
  },
  {
    id: 'business-setup-registration',
    title: 'Business Setup & Registration',
    category: 'Corporate Legal & Licensing',
    desc: 'Fast-track corporate structuring, trade licensing, IEC, and regulatory compliance.',
    bullets: [
      'Company Registration (India & Overseas)',
      'Import Export License (IEC)',
      'GST Registration',
      'Business Advisory',
      'Market Entry Support',
    ],
  },
  {
    id: 'special-projects-sectors',
    title: 'Special Projects & Sectors',
    category: 'Turnkey Incubations',
    desc: 'Turnkey commercial incubation across food processing, renewable energy, and hospitality.',
    bullets: [
      'Food Processing',
      'Agro & Herbal Products',
      'Renewable Energy',
      'Real Estate & Hospitality',
      'Education & Franchise',
    ],
  },
  {
    id: 'custom-enterprise-solutions',
    title: 'Custom Enterprise & Sourcing Mandates',
    category: 'Bespoke Trade Solutions',
    desc: 'Tailored cross-border trade structures, contract manufacturing, and bilateral strategic execution.',
    bullets: [
      'Custom Global Sourcing & Vetting',
      'Bilateral Joint Ventures',
      'Private Label Packaging',
      'ASEAN & GCC Trade Corridors',
      'Dedicated Director Advisory',
    ],
  },
];

export const PosterServicesSection = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const sliderRef = useRef(null);
  const progressFillRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const slider = sliderRef.current;
    const progressFill = progressFillRef.current;

    if (!section || !track || !slider) return;

    let targetProgress = 0;
    let currentProgress = 0;
    let maxTranslate = 0;
    let isDesktop = window.innerWidth >= 1024;
    let animationFrameId;

    const measure = () => {
      isDesktop = window.innerWidth >= 1024;
      if (isDesktop) {
        maxTranslate = Math.max(slider.scrollWidth - track.clientWidth, 0);
      } else {
        maxTranslate = 0;
        slider.style.transform = 'none';
      }
    };

    measure();

    const onScroll = () => {
      if (!isDesktop) return;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      targetProgress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);
    };

    // 120fps hardware-accelerated RAF render loop (Lerp without React re-renders)
    const tick = () => {
      if (isDesktop && maxTranslate > 0) {
        const diff = targetProgress - currentProgress;
        currentProgress += diff * 0.15;

        if (Math.abs(diff) < 0.0002) {
          currentProgress = targetProgress;
        }

        const translateX = currentProgress * maxTranslate;
        slider.style.transform = `translate3d(-${translateX.toFixed(2)}px, 0, 0)`;

        if (progressFill) {
          const widthPercent = Math.max(currentProgress * 100, 15);
          progressFill.style.width = `${widthPercent}%`;
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      measure();
      onScroll();
    }, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white relative h-auto lg:h-[230vh]"
    >
      <div className="relative lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center py-16 sm:py-20 lg:py-0 overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Centered Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 
            style={{ fontFamily: "'Playfair Display', 'Bodoni Moda', 'Cormorant Garamond', Georgia, serif" }}
            className="font-luxury-headline text-2xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#0A192F] tracking-tight leading-[1.14]"
          >
            Comprehensive Trade & Business Solutions
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-500 mt-2.5 font-light leading-relaxed">
            From heavy industrial equipment to global licensing, DPR advisory, and turnkey sectors. Scroll down to slide through all 6 capabilities.
          </p>
        </div>

        {/* Viewport: Exactly 3 Cards in View */}
        <div
          ref={trackRef}
          className="overflow-x-auto lg:overflow-hidden snap-x snap-mandatory lg:snap-none pb-6 lg:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none' }}
        >
          <div
            ref={sliderRef}
            className="flex gap-6 sm:gap-7 will-change-transform"
            style={{ transform: 'translate3d(0, 0, 0)' }}
          >
            {services.map((srv) => (
              <div
                key={srv.id}
                className="shrink-0 w-full sm:w-[calc(50%-0.875rem)] lg:w-[calc((100%-2*1.75rem)/3)] snap-start bg-[#F4F5F8] rounded-[32px] p-3 sm:p-3.5 border border-slate-200/70 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 select-none"
              >
                <div>
                  {/* Floating Elevated Top White Box */}
                  <div className="bg-white rounded-[24px] p-6 sm:p-7 shadow-xs border border-slate-100/90 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#0A192F] font-sans tracking-tight">
                        {srv.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-2 font-normal leading-relaxed min-h-[38px]">
                        {srv.desc}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-extrabold text-[#CCA038] tracking-wider uppercase">
                        {srv.category}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase px-2 py-0.5 rounded-full bg-slate-100">
                        Core Vertical
                      </span>
                    </div>
                  </div>

                  {/* Bottom Checklist Section */}
                  <div className="p-4 sm:p-5 pt-6 pb-2">
                    <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-4">
                      CORE DELIVERABLES & SCOPE
                    </span>

                    <div className="space-y-3.5">
                      {srv.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#0A192F] text-white flex items-center justify-center shrink-0 shadow-2xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <span className="text-xs sm:text-[13px] text-slate-700 font-medium">
                            {bullet}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Progress Indicator Bar at Bottom */}
        <div className="mt-8 flex flex-col items-center justify-center gap-2">
          <div className="w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              ref={progressFillRef}
              className="h-full bg-[#0E1F38] rounded-full"
              style={{ width: '15%' }}
            />
          </div>
          <span className="text-[10px] text-slate-400 font-medium">
            Scroll down with mouse to slide cards smoothly
          </span>
        </div>
      </div>
    </section>
  );
};
