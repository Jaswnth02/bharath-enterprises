import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Calendar } from 'lucide-react';
import { getProjects } from '../../firebase/firestore';

export const ProjectsPreview = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then((data) => setProjects(data.slice(0, 3)));
  }, []);

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[11px] font-bold text-accent uppercase tracking-widest block mb-1">
              {t('home.projectsTitle')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight font-sans">
              Recent Supply & Distribution Deployments
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-light">
              {t('home.projectsSubtitle')}
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-accent transition-colors self-start md:self-auto glass-button px-4 py-2 rounded-xl"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.projectId || proj.id}
              className="group glass-white glass-white-hover rounded-2xl p-2.5 flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden rounded-xl bg-slate-100">
                <img
                  src={proj.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80'}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-primary text-[10px] font-semibold px-2.5 py-1 rounded-lg border border-white/80 shadow-2xs">
                  {proj.category}
                </span>
                {proj.completionDate && (
                  <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded-lg flex items-center gap-1 border border-white/80 shadow-2xs">
                    <Calendar className="w-3 h-3 text-accent" />
                    <span>{proj.completionDate}</span>
                  </span>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-primary mb-1.5 leading-snug font-sans group-hover:text-secondary transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-light">
                    {proj.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-200/50">
                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:text-accent transition-colors"
                  >
                    <span>Read Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
