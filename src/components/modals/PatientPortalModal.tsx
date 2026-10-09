import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  User, 
  KeyRound, 
  ShieldCheck, 
  FileText, 
  MessageSquare, 
  Activity, 
  LogOut,
  ArrowRight
} from 'lucide-react';

interface PatientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToRefill: () => void;
}

export const PatientPortalModal: React.FC<PatientPortalModalProps> = ({
  isOpen,
  onClose,
  onNavigateToRefill,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('patient@tsehaye.com');
  const [password, setPassword] = useState('••••••••••••');
  const [portalTab, setPortalTab] = useState<'rx' | 'labs' | 'messages'>('rx');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1B2430]/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#E9EEF2] rounded-2xl shadow-2xl border border-[#1B2430]/20 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#182F35] text-[#E9EEF2] p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Lock className="w-5 h-5 text-[#E9D6AE]" />
            <h2 className="font-serif-heading text-xl font-medium">Encrypted Patient Portal</h2>
            <span className="text-[10px] font-mono-spec font-semibold px-2 py-0.5 rounded bg-emerald-900 text-emerald-300">
              HIPAA &amp; MOH 256-Bit SSL
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1B2430] text-[#E9EEF2] hover:bg-[#2C4A52]"
            aria-label="Close Portal Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-[#1B2430]">
          
          {!isLoggedIn ? (
            <form onSubmit={handleLogin} className="paper-card p-6 max-w-md mx-auto space-y-4 my-4">
              <div className="text-center space-y-1">
                <h3 className="font-serif-heading text-xl font-medium text-[#1B2430]">
                  Patient Authentication
                </h3>
                <p className="text-xs text-[#5B6779]">
                  Access your confidential compounding formulations and lab records.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="font-semibold text-[#1B2430] block mb-1">Registered Email *</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5B6779]" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#E9EEF2]/60 border border-[#1B2430]/15 text-xs text-[#1B2430] focus:outline-none focus:border-[#2C4A52]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#1B2430] block mb-1">Encrypted Security Passkey *</label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5B6779]" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#E9EEF2]/60 border border-[#1B2430]/15 text-xs text-[#1B2430] focus:outline-none focus:border-[#2C4A52]"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#182F35] hover:bg-[#2C4A52] text-[#E9EEF2] font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Authenticate &amp; Enter Portal</span>
                <ArrowRight className="w-4 h-4 text-[#E9D6AE]" />
              </button>

              <div className="flex justify-between text-[11px] text-[#5B6779] pt-2 border-t border-[#1B2430]/10">
                <a href="#" onClick={(e) => { e.preventDefault(); setIsLoggedIn(true); }} className="hover:underline text-[#2C4A52]">
                  Demo Quick Login
                </a>
                <span>Emergency Support 24/7</span>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              
              {/* Logged in User Bar */}
              <div className="paper-card p-4 flex justify-between items-center bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#182F35] text-[#E9EEF2] font-serif-heading font-bold flex items-center justify-center text-sm">
                    BK
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#1B2430]">Bethzatha K. (Patient #48291)</h4>
                    <span className="text-[11px] text-[#5B6779]">Addis Ababa Dispensary Member</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="px-3 py-1.5 rounded-lg bg-[#E9EEF2] hover:bg-[#CFDAE0] text-[#1B2430] text-xs font-semibold flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>

              {/* Portal Tabs */}
              <div className="flex gap-3 border-b border-[#1B2430]/15 pb-2">
                <button
                  onClick={() => setPortalTab('rx')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                    portalTab === 'rx'
                      ? 'bg-[#182F35] text-[#E9EEF2]'
                      : 'bg-white text-[#5B6779] hover:text-[#1B2430]'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Active Prescriptions</span>
                </button>

                <button
                  onClick={() => setPortalTab('labs')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                    portalTab === 'labs'
                      ? 'bg-[#182F35] text-[#E9EEF2]'
                      : 'bg-white text-[#5B6779] hover:text-[#1B2430]'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Cleanroom Lab Reports</span>
                </button>

                <button
                  onClick={() => setPortalTab('messages')}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                    portalTab === 'messages'
                      ? 'bg-[#182F35] text-[#E9EEF2]'
                      : 'bg-white text-[#5B6779] hover:text-[#1B2430]'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Pharmacist Direct Chat</span>
                </button>
              </div>

              {/* Tab 1: Active Prescriptions */}
              {portalTab === 'rx' && (
                <div className="space-y-3">
                  <div className="paper-card p-4 flex justify-between items-center">
                    <div>
                      <h5 className="font-serif-heading text-base font-medium text-[#1B2430]">
                        Transdermal Hormone Solution (Custom BHRT)
                      </h5>
                      <p className="text-[11px] text-[#5B6779]">Compounded on Aug 18, 2026 · Batch #78102</p>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded mt-1 inline-block">
                        Refills Remaining: 2
                      </span>
                    </div>
                    <button
                      onClick={onNavigateToRefill}
                      className="px-3.5 py-2 rounded-lg bg-[#2C4A52] text-[#E9EEF2] font-semibold text-xs hover:bg-[#182F35]"
                    >
                      Request Refill
                    </button>
                  </div>

                  <div className="paper-card p-4 flex justify-between items-center">
                    <div>
                      <h5 className="font-serif-heading text-base font-medium text-[#1B2430]">
                        Lumera Dermal Recovery Serum
                      </h5>
                      <p className="text-[11px] text-[#5B6779]">Compounded on Jul 30, 2026 · Batch #66412</p>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded mt-1 inline-block">
                        Refills Remaining: 1
                      </span>
                    </div>
                    <button
                      onClick={onNavigateToRefill}
                      className="px-3.5 py-2 rounded-lg bg-[#2C4A52] text-[#E9EEF2] font-semibold text-xs hover:bg-[#182F35]"
                    >
                      Request Refill
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 2: Lab Reports */}
              {portalTab === 'labs' && (
                <div className="space-y-3">
                  <div className="paper-card p-4 flex justify-between items-center">
                    <div>
                      <h5 className="font-semibold text-xs text-[#1B2430]">
                        Certificate of Analysis (USP 797 Purity Testing)
                      </h5>
                      <p className="text-[11px] text-[#5B6779]">Verified 99.8% Active Isomer Purity · PDF (1.2MB)</p>
                    </div>
                    <span className="text-[11px] text-[#2C4A52] font-mono-spec font-bold">
                      VERIFIED PASS
                    </span>
                  </div>
                </div>
              )}

              {/* Tab 3: Messages */}
              {portalTab === 'messages' && (
                <div className="paper-card p-4 space-y-3">
                  <div className="bg-[#E9EEF2] p-3 rounded-xl">
                    <p className="font-semibold text-xs text-[#1B2430]">Dr. Henok G. (Senior Pharmacist)</p>
                    <p className="text-xs text-[#5B6779] mt-1">
                      &quot;Your transdermal formula batch #78102 has passed cleanroom sterility tests. Let me know if you need dosage adjustments.&quot;
                    </p>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
