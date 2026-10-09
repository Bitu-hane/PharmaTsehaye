import React from 'react';
import { NavigationTab } from '../types';
import { PHARMACY_INFO } from '../data/pharmacyData';
import { 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Lock,
  ArrowRight,
  MessageSquare,
  Heart
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: NavigationTab) => void;
  openPatientPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, openPatientPortal }) => {
  return (
    <footer className="bg-[#1a2f3a] text-white/80 pt-16 pb-8 border-t border-[#095456]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Col 1: Brand & Details */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0d7377] to-[#14919b] text-white flex items-center justify-center font-bold text-lg shadow-md shadow-[#0d7377]/20">
                ✦
              </div>
              <div>
                <div className="font-bold text-lg text-white leading-none">
                  Tsehaye
                </div>
                <div className="text-[10px] text-[#e8d48b] font-bold tracking-wider uppercase mt-1">
                  Unique Pharmacy
                </div>
              </div>
            </div>

            <p className="text-xs text-white/75 leading-relaxed max-w-sm">
              Your health deserves unique care. Quality products, trusted clinical advice, and a welcoming space designed for your well-being.
            </p>

            <div className="space-y-1.5 text-xs text-white/75 pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#e8d48b] shrink-0 mt-0.5" />
                <span>📍 Bole Road, Next to Medhanealem Tower, Addis Ababa</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#e8d48b] shrink-0 mt-0.5" />
                <span>🕐 Mon–Sat 8:00 AM – 8:00 PM · Sun 9:00 AM – 5:00 PM</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#e8d48b] font-mono-spec">
              Explore
            </h4>
            <div className="flex flex-col space-y-2 text-xs">
              <button onClick={() => setActiveTab('home')} className="text-left text-white/75 hover:text-[#e8d48b] transition-colors cursor-pointer">
                Home
              </button>
              <button onClick={() => setActiveTab('directory')} className="text-left text-white/75 hover:text-[#e8d48b] transition-colors cursor-pointer">
                Product Catalog
              </button>
              <button onClick={() => setActiveTab('refill')} className="text-left text-white/75 hover:text-[#e8d48b] transition-colors cursor-pointer">
                Rx Refill &amp; Transfer
              </button>
              <button onClick={() => setActiveTab('consultations')} className="text-left text-white/75 hover:text-[#e8d48b] transition-colors cursor-pointer">
                Clinical Consultations
              </button>
              <button onClick={() => setActiveTab('contact')} className="text-left text-white/75 hover:text-[#e8d48b] transition-colors cursor-pointer">
                Contact &amp; Visit Us
              </button>
            </div>
          </div>

          {/* Col 3: Categories & Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#e8d48b] font-mono-spec">
              Connect With Us
            </h4>

            <div className="space-y-2.5 text-xs">
              <div>
                <strong className="block text-xs text-white">{PHARMACY_INFO.phone}</strong>
                <span className="text-[11px] text-teal-300 font-medium">Customer Support &amp; Product Availability</span>
              </div>

              <div>
                <strong className="block text-xs text-white">{PHARMACY_INFO.email}</strong>
                <span className="text-[11px] text-white/60">General Care &amp; Consultations</span>
              </div>

              <div className="pt-1">
                <a
                  href={`tel:${PHARMACY_INFO.emergencyPhone.replace(/[^0-9+]/g, '')}`}
                  className="inline-block text-[11px] font-bold text-[#e8d48b] border border-[#e8d48b]/35 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Emergency Line · {PHARMACY_INFO.emergencyPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Patient Portal Card */}
          <div className="lg:col-span-3">
            <div className="bg-white/10 border border-white/15 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Lock className="w-4 h-4 text-[#e8d48b]" />
                <span>Patient Portal</span>
              </div>
              <p className="text-[11px] text-white/70 leading-relaxed">
                Schedule delivery, manage active refills, and consult directly with our pharmacists.
              </p>
              <button
                onClick={openPatientPortal}
                className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#0d7377] to-[#14919b] hover:brightness-110 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Access Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Legal & License Bar */}
        <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/60">
          <span>© 2026 Tsehaye Unique Pharmacy. Licensed community pharmacy practice (<strong className="font-mono-spec text-white">MoH: FDRE-MOH-PH-9842-ET</strong>).</span>
          
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[#e8d48b] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#e8d48b] transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
