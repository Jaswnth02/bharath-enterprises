import React, { useState } from 'react';
import { 
  Calculator, 
  Package, 
  Truck, 
  Clock, 
  MessageSquare, 
  MessageCircle, 
  Check, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const sectors = [
  {
    id: 'fmcg',
    label: 'Wholesale Tea & Varkey',
    moq: '50 kg / 20 Cartons',
    packaging: 'Aroma-Barrier Master Cartons',
    sla: '24–36 Hours (TN)',
    category: 'wholesale-snacks-fmcg'
  },
  {
    id: 'rubber',
    label: 'Recycled Nitrile Rubber (NBR)',
    moq: '250 kg Granules / Powder',
    packaging: '25kg / 50kg Heavy HDPE Bags',
    sla: '24–48 Hours',
    category: 'rubber-waste-recycling'
  },
  {
    id: 'plywood',
    label: 'Plywood Sheets (BWR/BWP)',
    moq: '50 Sheets (8x4 / 7x4)',
    packaging: 'Steel-Strapped Wooden Pallets',
    sla: '48 Hours Transit',
    category: 'plywood-interior-trade'
  },
  {
    id: 'vanilla',
    label: 'Nilgiris Vanilla & SHG Produce',
    moq: '5 kg Cured Pods / Bulk Oil',
    packaging: 'Vacuum Foil Sealed Food Grade',
    sla: '24–48 Hours',
    category: 'agri-shg-initiatives'
  },
  {
    id: 'tourism',
    label: 'Nilgiris Tour & Resort Package',
    moq: '2–20+ Travelers / Groups',
    packaging: 'Custom Cab + Verified Resort',
    sla: 'Instant Booking Desk',
    category: 'nilgiris-tour-travel'
  }
];

const tiers = [
  { id: 'standard', name: 'Commercial Wholesale', desc: 'Standard distributor & retail batch' },
  { id: 'bulk', name: 'Bulk Enterprise', desc: 'Full truckload / regular scheduled supply' },
  { id: 'sample', name: 'Trial / Sample Lot', desc: 'Initial verification & quality testing' }
];

const regions = [
  'Coimbatore, Tiruppur & Erode',
  'Chennai & Central Tamil Nadu',
  'Pan-South India (Kerala, Karnataka)',
  'Direct Nilgiris Collection (Coonoor Desk)'
];

export const ProcurementEstimator = () => {
  const { openEnquiryModal, settings } = useSite();
  const [selectedSector, setSelectedSector] = useState(sectors[0]);
  const [selectedTier, setSelectedTier] = useState(tiers[0]);
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);

  const rawNumber = settings.whatsappNumber || import.meta.env.VITE_COMPANY_WHATSAPP || '919600949927';
  const cleanNumber = String(rawNumber).replace(/[^0-9]/g, '');

  const waMessage = `Hello Bharath Enterprises, I am inquiring from your website estimator for ${selectedSector.label} (${selectedTier.name}) destined for ${selectedRegion}. Please provide quotation and supply details.`;
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <section className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="glass-white-elevated rounded-3xl p-6 sm:p-10 md:p-12 border border-white/95 shadow-xl relative overflow-hidden">
          {/* Subtle Ambient glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/8 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Section Heading */}
          <div className="max-w-2xl mb-8 sm:mb-10">
            <span className="text-[10px] sm:text-[11px] font-bold text-accent uppercase tracking-widest block mb-1.5 bg-accent/10 w-fit px-2.5 py-0.5 rounded-md">
              INTERACTIVE TOOL
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-primary font-sans tracking-tight">
              Trade & Procurement Estimator
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light mt-1.5">
              Select your domain and requirements to instantly review standard packaging, minimum order quantities (MOQs), and delivery dispatch SLA.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Controls (7 Columns) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Step 1: Select Commodity / Sector */}
              <div>
                <label className="text-xs font-bold text-primary block mb-2.5 uppercase tracking-wider">
                  1. Select Commercial Domain
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {sectors.map((sec) => (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => setSelectedSector(sec)}
                      className={`text-left p-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between ${
                        selectedSector.id === sec.id
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'glass-white hover:bg-white text-slate-700 border-white/90'
                      }`}
                    >
                      <span>{sec.label}</span>
                      {selectedSector.id === sec.id && <Check className="w-3.5 h-3.5 text-accent shrink-0 ml-2" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Select Volume Tier */}
              <div>
                <label className="text-xs font-bold text-primary block mb-2.5 uppercase tracking-wider">
                  2. Supply Volume Tier
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {tiers.map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedTier(tier)}
                      className={`text-left p-3 rounded-xl border text-xs transition-all ${
                        selectedTier.id === tier.id
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'glass-white hover:bg-white text-slate-700 border-white/90'
                      }`}
                    >
                      <p className="font-bold">{tier.name}</p>
                      <p className={`text-[10px] mt-0.5 line-clamp-1 ${
                        selectedTier.id === tier.id ? 'text-slate-300' : 'text-slate-500'
                      }`}>
                        {tier.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Destination Region */}
              <div>
                <label className="text-xs font-bold text-primary block mb-2.5 uppercase tracking-wider">
                  3. Delivery Destination
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {regions.map((reg) => (
                    <button
                      key={reg}
                      type="button"
                      onClick={() => setSelectedRegion(reg)}
                      className={`text-left p-2.5 rounded-xl border text-xs font-medium transition-all ${
                        selectedRegion === reg
                          ? 'bg-primary text-white border-primary shadow-xs font-bold'
                          : 'glass-white hover:bg-white text-slate-700 border-white/90'
                      }`}
                    >
                      {reg}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Output Summary (5 Columns) */}
            <div className="lg:col-span-5">
              <div className="glass-white p-6 sm:p-7 rounded-3xl border border-white/90 shadow-md space-y-5">
                <div className="border-b border-slate-200/60 pb-4">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-wider block">
                    Estimated Logistics Profile
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold text-primary font-sans mt-0.5">
                    {selectedSector.label}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {selectedTier.name} • {selectedRegion}
                  </p>
                </div>

                {/* Metrics Breakdown */}
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/70 border border-white/80">
                    <span className="flex items-center gap-2 text-slate-600 font-medium">
                      <Package className="w-4 h-4 text-accent" />
                      <span>Standard MOQ:</span>
                    </span>
                    <span className="font-bold text-primary">{selectedSector.moq}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/70 border border-white/80">
                    <span className="flex items-center gap-2 text-slate-600 font-medium">
                      <Truck className="w-4 h-4 text-accent" />
                      <span>Packaging Spec:</span>
                    </span>
                    <span className="font-bold text-primary text-right">{selectedSector.packaging}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/70 border border-white/80">
                    <span className="flex items-center gap-2 text-slate-600 font-medium">
                      <Clock className="w-4 h-4 text-emerald-600" />
                      <span>Estimated Transit SLA:</span>
                    </span>
                    <span className="font-bold text-emerald-700">{selectedSector.sla}</span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-slate-500 leading-relaxed font-light">
                  * Exact commercial discounts and customized pallet configurations are calculated upon formal inquiry submission.
                </div>

                {/* Dual Action Buttons */}
                <div className="pt-2 space-y-2">
                  <button
                    type="button"
                    onClick={() =>
                      openEnquiryModal({
                        enquiryType: `${selectedTier.name} Inquiry`,
                        productOrService: `${selectedSector.label} (${selectedRegion})`,
                      })
                    }
                    className="w-full inline-flex items-center justify-center gap-2 py-3 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-98"
                  >
                    <MessageSquare className="w-4 h-4 text-accent" />
                    <span>Request Formal Quotation</span>
                  </button>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-98"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Instant WhatsApp Desk</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

