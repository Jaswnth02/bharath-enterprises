import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, MessageSquare } from 'lucide-react';
import { useSEO } from '../utils/seo';
import { getProjects } from '../firebase/firestore';
import { useSite } from '../context/SiteContext';

export const Projects = () => {
  const { t } = useTranslation();
  const { openEnquiryModal } = useSite();
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useSEO({
    title: 'Our Projects & Deployments | Bharath Enterprises',
    description: 'Explore commercial distribution, foundry supply integrations, and export lashing projects executed by Bharath Enterprises, Coimbatore.',
    keywords: 'Bharath Enterprises projects, Coimbatore industrial projects, Tamil Nadu commercial supplies portfolio',
  });

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...new Set(projects.map((p) => p.category).filter(Boolean))];

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

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
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-72 glass-white rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {filtered.map((proj) => (
              <div
                key={proj.projectId || proj.id}
                className="group glass-white glass-white-hover rounded-3xl p-3 sm:p-4 border border-white/90 shadow-md flex flex-col justify-between"
              >
                <div className="relative h-48 sm:h-60 overflow-hidden rounded-2xl bg-slate-100">
                  <img
                    src={proj.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-primary text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-white/80 shadow-2xs">
                    {proj.category}
                  </span>
                  {proj.completionDate && (
                    <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-slate-700 text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-white/80 shadow-2xs">
                      <Calendar className="w-3.5 h-3.5 text-accent" />
                      <span>{proj.completionDate}</span>
                    </span>
                  )}
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-primary mb-2 font-sans group-hover:text-secondary transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                      {proj.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/50 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[11px] text-slate-500 font-medium">
                      Coimbatore Commercial Deployment
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        openEnquiryModal({
                          enquiryType: 'Project Inquiry',
                          productOrService: proj.title,
                        })
                      }
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-accent transition-colors active:scale-95"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-accent" />
                      <span>Inquire About Similar Supply</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
