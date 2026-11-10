import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Calendar, 
  MessageSquare, 
  ZoomIn, 
  Eye, 
  Download, 
  X, 
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Layers
} from 'lucide-react';
import { useSEO } from '../utils/seo';
import { getProjects } from '../firebase/firestore';
import { useSite } from '../context/SiteContext';

export const Projects = () => {
  const { t } = useTranslation();
  const { openEnquiryModal } = useSite();
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Ongoing Projects');
  const [loading, setLoading] = useState(true);
  const [previewProject, setPreviewProject] = useState(null);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [viewMode, setViewMode] = useState('single'); // 'single' | 'all'

  useSEO({
    title: 'Our Projects & Deployments | Bharath Enterprises',
    description: 'Explore commercial distribution, foundry supply integrations, and export lashing projects executed by Bharath Enterprises, Coimbatore.',
    keywords: 'Bharath Enterprises projects, Coimbatore industrial projects, Tamil Nadu commercial supplies portfolio',
  });

  useEffect(() => {
    getProjects()
      .then((data) => {
        // Exclude dummy placeholder projects
        const valid = (data || []).filter(
          (p) => !['proj-synthetic-rubber-coimbatore', 'proj-statewide-snacks-tea-network', 'proj-coonoor-shg-livelihood-program', 'proj-plywood-logistics-hub', 'proj-eco-tourism-retreat-cluster'].includes(p.projectId || p.id)
        );
        // Guarantee card pictures and brochure images in exact order for all projects
        const paired = valid.map((p) => {
          if (p.projectId === 'proj-usana-india-opportunity') {
            return {
              ...p,
              image: '/projects/usana-card-cover.jpg',
              aspectRatio: 'aspect-[3/2]',
              brochureImages: [
                '/projects/usana/1.jpeg',
                '/projects/usana/2.jpeg',
                '/projects/usana/3.jpeg',
                '/projects/usana/4.jpeg',
              ],
            };
          }
          if (p.projectId === 'proj-herbal-tea-sugar-control') {
            return {
              ...p,
              image: '/projects/herbal-tea/card-cover.png',
              aspectRatio: 'aspect-[3/2]',
              brochureImages: [
                '/projects/herbal-tea/b1.jpeg',
                '/projects/herbal-tea/b2.png',
              ],
            };
          }
          if (p.projectId === 'proj-lord-jewellers-coonoor') {
            return {
              ...p,
              image: '/projects/lord-jewellery/card-cover.png',
              aspectRatio: 'aspect-[3/2]',
              brochureImages: [
                '/projects/lord-jewellery/card-cover.png',
              ],
            };
          }
          if (p.projectId === 'proj-aloe-vera-gel-dpr') {
            return {
              ...p,
              image: '/projects/aloe-vera-gel/card-cover.png',
              aspectRatio: 'aspect-[3/2]',
              brochureImages: [
                '/projects/aloe-vera-gel/b1.png',
              ],
            };
          }
          if (p.projectId === 'proj-nilgiris-tour-travel') {
            return {
              ...p,
              image: '/projects/nilgiris-travel/card-cover.png',
              aspectRatio: 'aspect-video',
              brochureImages: [
                '/projects/nilgiris-travel/b1.png',
                '/projects/nilgiris-travel/b2.png',
              ],
            };
          }
          if (p.projectId === 'proj-snacks-statewide-network') {
            return {
              ...p,
              image: '/projects/snacks/card-cover.png',
              aspectRatio: 'aspect-video',
              brochureImages: [
                '/projects/snacks/b1.png',
              ],
            };
          }
          if (p.projectId === 'proj-home-needs-supply-chain') {
            return {
              ...p,
              image: '/projects/home-needs/card-cover.png',
              aspectRatio: 'aspect-video',
              brochureImages: [
                '/projects/home-needs/b1.png',
              ],
            };
          }
          if (p.projectId === 'proj-plywood-marketing-dpr') {
            return {
              ...p,
              image: '/projects/plywood/card-cover.png',
              aspectRatio: 'aspect-video',
              brochureImages: [
                '/projects/plywood/b1.png',
              ],
            };
          }
          if (p.projectId === 'proj-synthetic-rubber-recycling-unit') {
            return {
              ...p,
              image: '/projects/rubber/card-cover.png',
              aspectRatio: 'aspect-video',
              brochureImages: [
                '/projects/rubber/b1.png',
              ],
            };
          }
          if (p.projectId === 'proj-vanilla-cultivation-nilgiris') {
            return {
              ...p,
              image: '/projects/vanilla/card-cover.png',
              aspectRatio: 'aspect-video',
              brochureImages: [
                '/projects/vanilla/b1.png',
              ],
            };
          }
          if (p.projectId === 'proj-coonoor-waste-management-dpr') {
            return {
              ...p,
              image: '/projects/waste-management/card-cover.png',
              aspectRatio: 'aspect-video',
              brochureImages: [
                '/projects/waste-management/b1.png',
              ],
            };
          }
          if (p.projectId === 'proj-dermalux-wellness-facial-body-soap') {
            return {
              ...p,
              image: '/projects/dermalux-wellness/card-cover.png',
              aspectRatio: 'aspect-[3/2]',
              brochureImages: [
                '/projects/dermalux-wellness/card-cover.png',
              ],
            };
          }
          if (p.projectId === 'proj-sea-resort-buildup-hospitality') {
            return {
              ...p,
              image: '/projects/sea-resort/card-cover.png',
              aspectRatio: 'aspect-video',
              brochureImages: [
                '/projects/sea-resort/card-cover.png',
              ],
            };
          }
          return p;
        });
        setProjects(paired);
      })
      .finally(() => setLoading(false));
  }, []);

  // Keyboard navigation for brochure viewer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!previewProject) return;
      const list = previewProject.brochureImages || [previewProject.image];
      if (e.key === 'Escape') {
        setPreviewProject(null);
      } else if (e.key === 'ArrowRight') {
        setActivePageIndex((prev) => (prev + 1) % list.length);
      } else if (e.key === 'ArrowLeft') {
        setActivePageIndex((prev) => (prev - 1 + list.length) % list.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewProject]);

  const normalizeCategory = (cat) => {
    if (!cat) return 'Ongoing Projects';
    const lower = String(cat).toLowerCase();
    if (lower.includes('future') || lower.includes('upcoming') || lower.includes('planned')) {
      return 'Future Projects';
    }
    return 'Ongoing Projects';
  };

  const categories = ['Ongoing Projects', 'Future Projects'];

  const normalizedProjects = projects.map((p) => ({
    ...p,
    category: normalizeCategory(p.category),
  }));

  const filtered = normalizedProjects.filter((p) => p.category === activeCategory);

  const openBrochure = (proj) => {
    setPreviewProject(proj);
    setActivePageIndex(0);
    setViewMode('single');
  };

  return (
    <div className="min-h-screen py-6 sm:py-10">
      {/* Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-6 sm:mb-8">
        <div className="glass-white-elevated p-5 sm:p-8 md:p-12 rounded-3xl border border-white/95 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-accent/10 to-transparent pointer-events-none" />
          <span className="text-[10px] sm:text-[11px] font-bold text-accent uppercase tracking-widest block mb-2 bg-accent/10 w-fit px-2.5 py-0.5 rounded-md">
            Execution Track Record
          </span>
          <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-sans text-primary">
            {t('projects.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-2 leading-relaxed font-light">
            {t('projects.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-12 sm:pb-16">
        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 sm:mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl shrink-0 transition-all ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-sm font-bold'
                  : 'glass-pill text-slate-700 hover:bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 animate-pulse">
            {[1, 2].map((n) => (
              <div key={n} className="h-72 glass-white rounded-3xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 px-6 glass-white rounded-3xl border border-white/90 max-w-lg mx-auto shadow-sm my-6">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3 text-accent">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-primary mb-1">
              {activeCategory} Updating
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              Commercial projects and portfolio details are currently being updated by the administration desk.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filtered.map((proj) => (
              <div
                key={proj.projectId || proj.id}
                className="group glass-white glass-white-hover rounded-2xl p-3 sm:p-4 border border-white/90 shadow-sm flex flex-col justify-between max-w-md w-full"
              >
                <div>
                  {/* Card Top Category & Status Header (Leaves entire image clear) */}
                  <div className="flex items-center justify-between gap-2 mb-2 px-0.5">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-wider bg-accent/10 px-2 py-0.5 rounded-md border border-accent/20">
                      {proj.category}
                    </span>
                    {proj.completionDate && (
                      <span className="text-[10px] font-medium text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-accent" />
                        <span>{proj.completionDate}</span>
                      </span>
                    )}
                  </div>

                  {/* Natural Aspect Ratio Matching Image (Fills Edge-to-Edge with Zero White Sidebars & Zero Cropping) */}
                  <div
                    onClick={() => openBrochure(proj)}
                    className={`relative w-full ${proj.aspectRatio || 'aspect-[3/2]'} overflow-hidden rounded-xl bg-slate-100 cursor-pointer shadow-2xs group/img border border-slate-200/70`}
                  >
                    <img
                      src={proj.image || '/projects/usana-card-cover.jpg'}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover/img:scale-102 transition-transform duration-300"
                    />
                    
                    {/* Hover Zoom Pill */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 text-primary text-[11px] font-bold rounded-full shadow-md backdrop-blur-xs">
                        <Eye className="w-3.5 h-3.5 text-accent" />
                        <span>View Brochure ({proj.brochureImages?.length || 1} {proj.brochureImages?.length === 1 ? 'Page' : 'Pages'})</span>
                      </span>
                    </div>
                  </div>

                  <div className="pt-3.5 space-y-2">
                    <h3 className="text-sm sm:text-base font-bold text-primary font-sans group-hover:text-secondary transition-colors line-clamp-2">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-light line-clamp-3">
                      {proj.description}
                    </p>

                    {/* Compact Project Highlights */}
                    {proj.highlights && (
                      <ul className="space-y-1 pt-2 border-t border-slate-200/60">
                        {proj.highlights.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-1 leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="pt-3.5 mt-3 border-t border-slate-200/60 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => openBrochure(proj)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-primary hover:text-accent bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-all cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-accent" />
                    <span>View Brochure ({proj.brochureImages?.length || 1} {proj.brochureImages?.length === 1 ? 'Page' : 'Pages'})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      openEnquiryModal({
                        enquiryType: 'Project & Distribution Enquiry',
                        productOrService: proj.title,
                      })
                    }
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-primary hover:bg-[#142D4E] text-white text-xs font-bold rounded-lg shadow-2xs transition-all active:scale-95 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-accent" />
                    <span>Inquire</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4-Page Multi-Image Brochure Modal */}
      {previewProject && (() => {
        const brochureList = previewProject.brochureImages && previewProject.brochureImages.length > 0
          ? previewProject.brochureImages
          : [previewProject.brochureImage || previewProject.image];

        return (
          <div 
            onClick={() => setPreviewProject(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh]"
            >
              {/* Modal Header */}
              <div className="p-3.5 sm:px-6 bg-slate-950/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-accent font-bold block">
                    {previewProject.category}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                    {previewProject.title}
                  </h3>
                </div>

                {/* Center Controls: Page Switcher / Mode Switcher */}
                <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setActivePageIndex((p) => (p - 1 + brochureList.length) % brochureList.length)}
                    className="p-1 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Previous Page (Left Arrow)"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <span className="text-xs font-bold text-accent px-1.5 select-none">
                    Page {activePageIndex + 1} of {brochureList.length}
                  </span>

                  <button
                    type="button"
                    onClick={() => setActivePageIndex((p) => (p + 1) % brochureList.length)}
                    className="p-1 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Next Page (Right Arrow)"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <div className="h-4 w-px bg-slate-700 mx-1" />

                  <button
                    type="button"
                    onClick={() => setViewMode(viewMode === 'single' ? 'all' : 'single')}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                      viewMode === 'all' 
                        ? 'bg-accent text-primary font-bold' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                    title="Toggle All Pages / Single Page"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>{viewMode === 'all' ? 'All Pages' : 'Stack View'}</span>
                  </button>
                </div>

                {/* Right: Download & Close */}
                <div className="flex items-center gap-2">
                  <a
                    href={brochureList[activePageIndex]}
                    download={`${(previewProject.title || 'Brochure').slice(0, 24).replace(/[^a-zA-Z0-9]/g, '-')}-Page-${activePageIndex + 1}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors flex items-center gap-1 text-xs"
                    title="Download Current Page"
                  >
                    <Download className="w-4 h-4 text-accent" />
                    <span className="hidden sm:inline">Download</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setPreviewProject(null)}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto flex-1 p-3 sm:p-6 bg-black/60 flex flex-col items-center justify-start min-h-[400px]">
                {viewMode === 'single' ? (
                  <div className="relative w-full max-w-2xl flex items-center justify-center my-auto">
                    {/* Floating Left/Right Arrows for Easy Flipping */}
                    {brochureList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setActivePageIndex((p) => (p - 1 + brochureList.length) % brochureList.length)}
                        className="absolute left-2 sm:-left-12 z-20 p-2.5 bg-black/70 hover:bg-black text-white rounded-full backdrop-blur-md transition-all shadow-lg border border-white/10 cursor-pointer"
                        aria-label="Previous Page"
                      >
                        <ChevronLeft className="w-5 h-5 text-accent" />
                      </button>
                    )}

                    <img
                      src={brochureList[activePageIndex]}
                      alt={`${previewProject.title || 'Project'} Brochure Page ${activePageIndex + 1}`}
                      className="max-w-full max-h-[70vh] h-auto object-contain rounded-2xl shadow-2xl border border-slate-800 animate-in fade-in duration-200"
                    />

                    {brochureList.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setActivePageIndex((p) => (p + 1) % brochureList.length)}
                        className="absolute right-2 sm:-right-12 z-20 p-2.5 bg-black/70 hover:bg-black text-white rounded-full backdrop-blur-md transition-all shadow-lg border border-white/10 cursor-pointer"
                        aria-label="Next Page"
                      >
                        <ChevronRight className="w-5 h-5 text-accent" />
                      </button>
                    )}
                  </div>
                ) : (
                  /* Continuous View: All 4 Pages in sequence */
                  <div className="space-y-6 w-full max-w-2xl py-2">
                    {brochureList.map((imgUrl, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className="w-full flex items-center justify-between pb-2 px-1">
                          <span className="text-[11px] font-bold text-accent uppercase tracking-wider bg-slate-800 px-3 py-0.5 rounded-full border border-slate-700">
                            Brochure Page {i + 1} of {brochureList.length}
                          </span>
                          <a
                            href={imgUrl}
                            download={`USANA-Brochure-Page-${i + 1}.jpeg`}
                            className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
                          >
                            <Download className="w-3 h-3 text-accent" />
                            <span>Save Page {i + 1}</span>
                          </a>
                        </div>
                        <img
                          src={imgUrl}
                          alt={`USANA Brochure Page ${i + 1}`}
                          className="w-full h-auto object-contain rounded-2xl shadow-2xl border border-slate-800"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Bottom: Thumbnail Navigation Strip & Inquiry Button */}
              <div className="p-3 sm:px-6 bg-slate-950/95 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
                {/* Thumbnails of 1, 2, 3, 4 */}
                <div className="flex items-center gap-2 overflow-x-auto py-1">
                  {brochureList.map((thumbUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setActivePageIndex(idx);
                        setViewMode('single');
                      }}
                      className={`relative h-14 w-10 sm:h-16 sm:w-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        activePageIndex === idx && viewMode === 'single'
                          ? 'border-accent shadow-md ring-2 ring-accent/30 scale-105'
                          : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600'
                      }`}
                      title={`Go to Page ${idx + 1}`}
                    >
                      <img src={thumbUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                      <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[9px] text-white font-bold text-center py-0.5">
                        {idx + 1}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const currentTitle = previewProject.title;
                      setPreviewProject(null);
                      openEnquiryModal({
                        enquiryType: 'Project & Distribution Enquiry',
                        productOrService: currentTitle,
                      });
                    }}
                    className="px-4 py-2 bg-accent hover:bg-accent-hover text-primary font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Inquire About Opportunity</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
