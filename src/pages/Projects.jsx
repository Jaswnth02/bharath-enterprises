import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Tag, MessageSquare, ArrowRight } from 'lucide-react';
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
    <div className="bg-white min-h-screen">
      {/* Banner */}
      <div className="bg-primary py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-2">
            Execution Track Record
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans">
            {t('projects.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-2 leading-relaxed">
            {t('projects.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition-colors ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-surface text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-72 bg-slate-100 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((proj) => (
              <div
                key={proj.projectId || proj.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div className="relative h-60 overflow-hidden bg-slate-100">
                  <img
                    src={proj.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'}
                    alt={proj.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-primary text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-xs">
                    {proj.category}
                  </span>
                  {proj.completionDate && (
                    <span className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-xs text-slate-200 text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-accent" />
                      <span>{proj.completionDate}</span>
                    </span>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-primary mb-2">
                      {proj.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() =>
                        openEnquiryModal({
                          serviceTitle: proj.title,
                          enquiryType: 'General Business',
                        })
                      }
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-accent transition-colors"
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
