import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  CheckCircle, 
  ArrowRight, 
  Coffee, 
  Recycle, 
  Layers, 
  Compass, 
  Building2,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const resources = [
  {
    id: 'corp-profile',
    title: 'Bharath Enterprises Global Corporate Profile (2025)',
    category: 'Corporate Overview',
    type: 'PDF Dossier',
    pages: '16 Pages',
    icon: Building2,
    description: 'Comprehensive global business development overview, Coimbatore headquarters, 14 international trade corridors, and strategic partnership credentials.',
    highlights: ['Connecting Opportunities Globally', '14 Active International Markets', 'End-to-End Enterprise Solutions']
  },
  {
    id: 'boiler-spares-spec',
    title: 'Industrial Boilers, Spares & Process Equipment Guide',
    category: 'Industrial Equipment',
    type: 'Equipment Catalogue',
    pages: '12 Pages',
    icon: Layers,
    description: 'Boilers and spares, steam accessories, instrumentation and PLC automation, refractory works, and process equipment specifications.',
    highlights: ['Boilers & Steam Piping Specs', 'PLC Automation Controls', 'Refractory Insulation Grades']
  },
  {
    id: 'import-export-manual',
    title: 'Cross-Border Import & Export Facilitation Manual',
    category: 'Trade & Logistics',
    type: 'Trade Handbook',
    pages: '10 Pages',
    icon: Compass,
    description: 'Global sourcing protocols, buyer-seller verification frameworks, export documentation, customs support, and international shipping coordination.',
    highlights: ['Global Sourcing Checklists', 'Customs Clearance Workflows', 'ASEAN & European Trade Lanes']
  },
  {
    id: 'dpr-consulting-guide',
    title: 'Bankable DPR & Government Scheme Handbook (PMEGP/MUDRA)',
    category: 'Project Consulting',
    type: 'Consulting Guide',
    pages: '14 Pages',
    icon: FileText,
    description: 'Detailed Project Report (DPR) formats, financial modeling, market viability analysis, and institutional government subsidy frameworks.',
    highlights: ['Bankable DPR Templates', 'PMEGP & MUDRA Guidance', 'Financial ROI Modeling']
  },
  {
    id: 'business-setup-toolkit',
    title: 'Company Setup & International Licensing Toolkit (IEC/GST)',
    category: 'Business Registration',
    type: 'Statutory Toolkit',
    pages: '8 Pages',
    icon: Building2,
    description: 'Step-by-step statutory incorporation in India and overseas, Import-Export Code (IEC) application, GST compliance, and market entry advisory.',
    highlights: ['India & Overseas Incorporation', 'IEC & GST Compliance Steps', 'FDI & Regulatory Advisory']
  },
  {
    id: 'special-projects-dossier',
    title: 'Special Projects & Agro-Food Processing Dossier',
    category: 'Turnkey Projects',
    type: 'Project Dossier',
    pages: '10 Pages',
    icon: Coffee,
    description: 'Turnkey development roadmaps for food processing plants, agro and herbal products, solar renewable energy, and education franchises.',
    highlights: ['Food Processing Plant Models', 'Agro-Herbal Export Potential', 'Renewable Energy Turnkey Setup']
  }
];

export const CorporateResourcesKit = () => {
  const [activeTab, setActiveTab] = useState(resources[0]);
  const { openEnquiryModal, settings } = useSite();

  const handleDownloadRequest = (resource) => {
    openEnquiryModal({
      enquiryType: 'Resource Download / Spec Sheet',
      productOrService: `Document: ${resource.title} (${resource.type})`,
    });
  };

  return (
    <section className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-white border border-white/90 text-slate-700 text-[10px] sm:text-[11px] font-bold tracking-wide uppercase mb-2">
              <FileText className="w-3.5 h-3.5 text-accent" />
              <span>PROCUREMENT RESOURCE HUB</span>
            </div>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-primary tracking-tight font-sans">
              Technical Spec Sheets & Catalogues
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-light max-w-xl">
              Download product specifications, grade comparison charts, and corporate dossiers for your evaluation.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openEnquiryModal({ enquiryType: 'Full Catalogue Kit' })}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-accent transition-colors self-start sm:self-auto glass-button px-4 py-2.5 rounded-xl shrink-0"
          >
            <span>Request Complete Dossier Kit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {resources.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="glass-white-elevated rounded-3xl p-5 sm:p-6 border border-white/95 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-wider bg-accent/10 px-2.5 py-0.5 rounded-md">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {item.type}
                    </span>
                  </div>

                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-accent flex items-center justify-center shrink-0 transition-colors duration-300 border border-white/80">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-extrabold text-primary font-sans group-hover:text-secondary transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-[11px] text-slate-600 font-light leading-relaxed mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1.5 mb-5 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                    {item.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/50 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-medium">
                    Verified 2025 Edition
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDownloadRequest(item)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:text-accent transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-accent" />
                    <span>Download / Request Spec</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

