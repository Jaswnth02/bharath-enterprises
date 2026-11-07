import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Navigation, 
  Layers, 
  ShieldCheck, 
  PhoneCall,
  Sparkles
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const corridors = [
  {
    id: 'coimbatore-metro',
    name: 'Coimbatore Industrial Belt',
    badge: 'CENTRAL HUB • 0–12 HR DISPATCH',
    status: 'High Frequency Active',
    transitSLA: 'Same-Day / Under 12 Hours',
    coverage: 'Peelamedu, Kurichi, Ganapathy, Pollachi, Mettupalayam',
    fleet: 'Dedicated Heavy Trucks & Express Light Vans',
    keyCargo: 'Plywood sheets, recycled rubber granules, packaged tea cartons',
    desc: 'Our primary distribution center. Buffer warehouse reserves guarantee same-day dispatch across Coimbatore manufacturing and furniture clusters.'
  },
  {
    id: 'nilgiris-highland',
    name: 'The Nilgiris Highland Sector',
    badge: 'SOURCING DEPOT • DAILY INTAKE',
    status: 'Estate Direct Active',
    transitSLA: 'Daily Scheduled Runs',
    coverage: 'Coonoor, Ooty, Kotagiri, Gudalur, Pykara',
    fleet: 'Mountain-Certified Heavy & 4WD Cargo Fleet',
    keyCargo: 'Harvested green leaf, bulk Ooty Varkey, SHG forest oils & honey',
    desc: 'Connecting mountain tea factories, heritage bakeries, and resort partners with direct daily transfers down to the plains.'
  },
  {
    id: 'tiruppur-erode',
    name: 'Tiruppur & Erode Commercial Line',
    badge: 'EXPRESS CORRIDOR • 12–18 HR',
    status: 'Daily Dedicated Cargo',
    transitSLA: '12 to 18 Hours',
    coverage: 'Tiruppur, Avinashi, Perundurai, Erode, Bhavani',
    fleet: 'Scheduled Container Freight',
    keyCargo: 'Wholesale tea pouches, bakery snacks, modular plywood sheets',
    desc: 'High-volume scheduled line supplying commercial distributors, supermarket chains, and modular interior contractors.'
  },
  {
    id: 'salem-central',
    name: 'Salem & Central Tamil Nadu',
    badge: 'REGIONAL FREIGHT • 18–24 HR',
    status: 'Scheduled Transit',
    transitSLA: '18 to 24 Hours',
    coverage: 'Salem, Namakkal, Karur, Dindigul, Trichy',
    fleet: 'Palletized Multi-Axle Trucks',
    keyCargo: 'Recycled rubber powder sacks, bulk plywood crates, consumer tea',
    desc: 'Strategic transport artery delivering industrial raw materials and consumer goods to central Tamil Nadu distribution hubs.'
  },
  {
    id: 'chennai-metro',
    name: 'Chennai Metropolitan & Port Gateway',
    badge: 'STATE CAPITAL ARTERY • 24–36 HR',
    status: 'Full Truckload & LTL',
    transitSLA: '24 to 36 Hours',
    coverage: 'Chennai Metro, Kanchipuram, Sriperumbudur, Ennore corridor',
    fleet: 'Heavy Cargo Consignments',
    keyCargo: 'Export-grade cured vanilla, bulk tea containers, industrial NBR powder',
    desc: 'Statewide flagship line connecting regional production in Western Tamil Nadu to Chennai wholesale markets and export clearing agents.'
  },
  {
    id: 'interstate-south',
    name: 'Kerala & Karnataka Corridors',
    badge: 'INTERSTATE CORRIDOR • 24–48 HR',
    status: 'Interstate Desk Active',
    transitSLA: '24 to 48 Hours',
    coverage: 'Palakkad, Kochi, Kozhikode, Mysuru, Bengaluru',
    fleet: 'Interstate Permit Freight Transport',
    keyCargo: 'Hill tourism fleets, specialized timber, bulk FMCG consignments',
    desc: 'Cross-border transport logistics with full GST E-Way Bill compliance for streamlined transit into neighboring states.'
  }
];

export const RegionalCorridorCoverage = () => {
  const [activeId, setActiveId] = useState(corridors[0].id);
  const { openEnquiryModal, settings } = useSite();

  const selected = corridors.find((c) => c.id === activeId) || corridors[0];

  const rawNumber = settings.whatsappNumber || import.meta.env.VITE_COMPANY_WHATSAPP || '919600949927';
  const cleanNumber = String(rawNumber).replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(`Hello Bharath Enterprises, I am checking delivery schedules and freight availability for the ${selected.name} corridor.`)}`;

  return (
    <section className="py-12 sm:py-20 relative bg-slate-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-white border border-white/90 text-slate-700 text-[10px] sm:text-[11px] font-bold tracking-wide uppercase mb-2">
            <Truck className="w-3.5 h-3.5 text-accent" />
            <span>REGIONAL LOGISTICS NETWORK</span>
          </div>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-primary tracking-tight font-sans">
            Tamil Nadu & South India Freight Corridors
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-light leading-relaxed">
            Reliable scheduled dispatches connecting our Coonoor sourcing base and Coimbatore processing depot to commercial buyers across South India.
          </p>
        </div>

        {/* Interactive Corridor Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Corridor Selection List (5 Cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
              Select Regional Corridor:
            </p>
            {corridors.map((c) => {
              const isActive = c.id === activeId;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveId(c.id)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between group ${
                    isActive
                      ? 'bg-primary text-white border-primary shadow-md scale-101'
                      : 'glass-white hover:bg-white text-slate-700 border-white/90 hover:border-accent/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <Navigation className={`w-3.5 h-3.5 ${isActive ? 'text-accent' : 'text-slate-400'}`} />
                      <h4 className="text-xs sm:text-sm font-bold font-sans">
                        {c.name}
                      </h4>
                    </div>
                    <span className={`text-[10px] block mt-0.5 font-mono ${
                      isActive ? 'text-slate-300' : 'text-slate-500'
                    }`}>
                      {c.transitSLA}
                    </span>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    isActive ? 'bg-white/20 text-accent' : 'bg-slate-100 text-slate-600'
                  }`}>
                    Active
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Corridor Specification Sheet (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="glass-white-elevated rounded-3xl p-6 sm:p-8 md:p-10 border border-white/95 shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-60 h-60 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

              <div className="border-b border-slate-200/60 pb-4">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest px-2.5 py-0.5 rounded bg-accent/10">
                    {selected.badge}
                  </span>
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{selected.status}</span>
                  </span>
                </div>
                <h3 className="text-lg sm:text-2xl font-extrabold text-primary font-sans mt-1">
                  {selected.name}
                </h3>
                <p className="text-xs text-slate-600 font-light mt-1.5 leading-relaxed">
                  {selected.desc}
                </p>
              </div>

              {/* Corridor Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <div className="glass-white p-3.5 rounded-2xl border border-white/80">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <Clock className="w-4 h-4 text-accent" />
                    <span className="font-bold uppercase tracking-wider text-[10px]">Transit Lead Time</span>
                  </div>
                  <p className="font-extrabold text-primary font-sans text-sm">
                    {selected.transitSLA}
                  </p>
                </div>

                <div className="glass-white p-3.5 rounded-2xl border border-white/80">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <Truck className="w-4 h-4 text-accent" />
                    <span className="font-bold uppercase tracking-wider text-[10px]">Fleet Configuration</span>
                  </div>
                  <p className="font-semibold text-primary text-xs">
                    {selected.fleet}
                  </p>
                </div>

                <div className="glass-white p-3.5 rounded-2xl border border-white/80">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span className="font-bold uppercase tracking-wider text-[10px]">Key Coverage Nodes</span>
                  </div>
                  <p className="font-medium text-slate-700 text-xs">
                    {selected.coverage}
                  </p>
                </div>

                <div className="glass-white p-3.5 rounded-2xl border border-white/80">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <Layers className="w-4 h-4 text-accent" />
                    <span className="font-bold uppercase tracking-wider text-[10px]">Primary Cargo Types</span>
                  </div>
                  <p className="font-medium text-slate-700 text-xs">
                    {selected.keyCargo}
                  </p>
                </div>
              </div>

              {/* Guarantees */}
              <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>GST & E-Way Bill Verification</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Real-Time Driver Tracking</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Moisture-Barrier Cargo Tarps</span>
                </span>
              </div>

              {/* Direct Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    openEnquiryModal({
                      enquiryType: 'Logistics Route Booking',
                      productOrService: `Freight Route: ${selected.name}`,
                    })
                  }
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
                >
                  <span>Book Consignment Slot</span>
                  <ArrowRight className="w-3.5 h-3.5 text-accent" />
                </button>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 glass-white hover:bg-white text-slate-800 text-xs font-semibold rounded-xl border border-white/90 shadow-2xs transition-all active:scale-95"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-accent" />
                  <span>WhatsApp Route Desk</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

