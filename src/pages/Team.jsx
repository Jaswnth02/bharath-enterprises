import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSite } from '../context/SiteContext';

const XIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Add your real team members here
const teamMembers = [
  {
    name: 'Bharath Moorthi',
    role: 'Chairman',
    photo: '/team/Bharath Moorthi.webp',
    twitter: '',
    linkedin: '',
  },
  {
    name: 'Moorthi Subbaian',
    role: 'Managing Director (MD)',
    photo: '/team/Murthi.webp',
    twitter: '',
    linkedin: '',
  },
  {
    name: 'Subramanian',
    role: 'Malaysia Country Head',
    photo: '/team/Subramanian.webp',
    twitter: '',
    linkedin: '',
  },
  {
    name: 'Govindharaj R',
    role: 'Business Head',
    photo: '/team/Govindharaj.webp',
    twitter: '',
    linkedin: '',
  },
  {
    name: 'Sivakumar Natarajan',
    role: 'Business Development Officer',
    photo: '/team/Sivakumar Natarajan.webp',
    twitter: '',
    linkedin: '',
  },
  {
    name: 'Hemalatha',
    role: 'Business Promoter',
    photo: '/team/Hemalatha.webp',
    twitter: '',
    linkedin: '',
  },
  {
    name: 'Bharani Kumaresan',
    role: 'Project Manager',
    photo: '/team/bharani kumaresan.webp',
    twitter: '',
    linkedin: '',
  },
  {
    name: 'Mahalaxmi',
    role: 'Director Public Relations',
    photo: '/team/Mahalaxmi.webp',
    twitter: '',
    linkedin: '',
  },
  {
    name: 'Jaswanth MG',
    role: 'Chief Information Officer',
    photo: '/team/Jaswanth.webp',
    twitter: '',
    linkedin: '',
    profileUrl: 'https://jaswanthmg.vercel.app',
  },
];

const TeamCard = ({ member }) => (
  <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200 group">
    {/* Photo */}
    <div className="bg-slate-100 aspect-[3/3.2] overflow-hidden rounded-t-2xl">
      {member.photo ? (
        <img
          src={member.photo}
          alt={member.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-slate-100">
          <svg className="w-16 h-16 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        </div>
      )}
    </div>

    {/* Footer */}
    <div className="px-3 py-2.5 flex items-center justify-between gap-2">
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-[#111827] leading-snug truncate tracking-tight">{member.name}</h3>
        <p className="text-xs text-[#6B7280] mt-0.5 truncate font-normal">{member.role}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {member.twitter && (
          <a
            href={member.twitter}
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-[#0A192F] transition-colors"
            aria-label="Twitter / X"
          >
            <XIcon className="w-4 h-4" />
          </a>
        )}
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-[#0A192F] transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
    {member.profileUrl && (
      <div className="px-3 pb-3">
        <a
          href={member.profileUrl}
          target="_blank"
          rel="noreferrer"
          className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[10px] font-semibold text-[#0A192F] border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all"
        >
          View Profile
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    )}
  </div>
);

export const Team = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen py-6 sm:py-10">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-8 sm:mb-12">
        <div className="glass-white-elevated p-5 sm:p-8 md:p-12 rounded-3xl border border-white/95 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-accent/10 to-transparent pointer-events-none" />
          <span className="text-[10px] sm:text-[11px] font-bold text-accent uppercase tracking-widest block mb-2 bg-accent/10 w-fit px-2.5 py-0.5 rounded-md">
            Our People
          </span>
          <h1 className="text-xl sm:text-3xl md:text-4xl font-black tracking-widest font-sans text-primary uppercase">
            Meet the Team
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-2 leading-relaxed font-light">
            The dedicated professionals behind Bharath Enterprises — driving trade, consulting, and business development with expertise and integrity.
          </p>
        </div>
      </div>

      {/* Team Grid or Empty State */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {teamMembers.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {teamMembers.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-5">
              <svg className="w-8 h-8 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
            <h2 className="text-base font-bold text-primary mb-2">Coming Soon</h2>
            <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
              Our team profiles will be available here shortly. Stay tuned!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;
