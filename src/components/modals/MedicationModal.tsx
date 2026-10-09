import React, { useState } from 'react';
import { Medication } from '../../types';
import { formatPriceETB } from '../../data/pharmacyData';
import { 
  X, 
  CheckCircle, 
  ShieldCheck, 
  AlertCircle, 
  Beaker, 
  ShoppingBag, 
  Calendar, 
  Sparkles,
  Check
} from 'lucide-react';

interface MedicationModalProps {
  medication: Medication | null;
  onClose: () => void;
  onAddToCart: (medication: Medication) => void;
  onBookConsultation: (medication: Medication) => void;
}

export const MedicationModal: React.FC<MedicationModalProps> = ({
  medication,
  onClose,
  onAddToCart,
  onBookConsultation,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'ingredients' | 'dosage' | 'safety'>('overview');
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!medication) return null;

  const handleAdd = () => {
    onAddToCart(medication);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1a2f3a]/65 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#f7f3eb] rounded-3xl shadow-2xl border border-[#0d7377]/20 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Top Visual Banner */}
        <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-gradient-to-br from-[#1a2f3a] via-[#2a4554] to-[#095456] flex items-center justify-center">
          {medication.emoji ? (
            <span className="text-7xl drop-shadow-lg animate-pulse">{medication.emoji}</span>
          ) : (
            <img 
              src={medication.image} 
              alt={medication.name}
              className="w-full h-full object-cover opacity-60 mix-blend-luminosity scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a2f3a] via-[#1a2f3a]/60 to-transparent"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-colors z-20 flex items-center justify-center cursor-pointer"
            aria-label="Close Medication Details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category & Rx Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
            <span className="px-3 py-1 rounded-full bg-white/90 text-[#0d7377] text-xs font-bold shadow-xs uppercase tracking-wider">
              {medication.categoryLabel}
            </span>
            {medication.isOTC ? (
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> OTC Available
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-[#c9a227] text-white text-xs font-bold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Prescription / Consultation Required
              </span>
            )}
          </div>

          {/* Title & Grade */}
          <div className="absolute bottom-4 left-6 right-6 text-white z-10">
            <div className="flex items-center gap-1.5 text-xs text-[#e8d48b] font-mono-spec mb-1 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{medication.purityGrade}</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
              {medication.name}
            </h2>
            <p className="text-xs sm:text-sm text-white/80 font-normal line-clamp-1 mt-0.5">
              {medication.tagline}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-[#0d7377]/10 px-6 flex gap-6 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview & Pricing' },
            { id: 'ingredients', label: 'Active Ingredients' },
            { id: 'dosage', label: 'Dosage & Directions' },
            { id: 'safety', label: 'Safety & Storage' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#0d7377] text-[#0d7377]'
                  : 'border-transparent text-[#5a6f7a] hover:text-[#1a2f3a]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 bg-white text-xs text-[#1a2f3a]">
          
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-xs text-[#0d7377] uppercase tracking-wider font-mono-spec mb-1">
                  Product Profile
                </h4>
                <p className="text-sm text-[#1a2f3a] leading-relaxed">
                  {medication.description}
                </p>
                {medication.details && (
                  <p className="text-xs text-[#5a6f7a] leading-relaxed mt-2 p-3 bg-[#f7f3eb] rounded-xl border border-[#ebe4d6]">
                    <strong>Usage Guidance:</strong> {medication.details}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-[#f7f3eb] border border-[#0d7377]/10">
                <div>
                  <span className="text-[11px] text-[#5a6f7a] block font-medium">Price</span>
                  <span className="font-bold text-xl text-[#0d7377]">
                    {formatPriceETB(medication.price)}
                  </span>
                  {medication.isPriceVariable && (
                    <span className="text-[10px] text-[#c9a227] block font-semibold">*Subject to custom ratio</span>
                  )}
                </div>
                <div>
                  <span className="text-[11px] text-[#5a6f7a] block font-medium">Dispensary Stock</span>
                  <span className="font-bold text-emerald-800 flex items-center gap-1 mt-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    {medication.stockStatus}
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="space-y-3">
              <h4 className="font-bold text-xs text-[#0d7377] uppercase tracking-wider font-mono-spec">
                Active Ingredients
              </h4>
              <ul className="space-y-2">
                {medication.activeIngredients.map((ing, i) => (
                  <li key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#f7f3eb] border border-[#ebe4d6] text-xs font-semibold text-[#1a2f3a]">
                    <Beaker className="w-4 h-4 text-[#0d7377] shrink-0" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'dosage' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-xs text-[#0d7377] uppercase tracking-wider font-mono-spec mb-1">
                  Recommended Dosage
                </h4>
                <p className="text-xs text-[#1a2f3a] p-3 rounded-xl bg-[#f7f3eb] border border-[#ebe4d6] font-medium">
                  {medication.dosage}
                </p>
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#0d7377] uppercase tracking-wider font-mono-spec mb-1">
                  Format &amp; Packaging
                </h4>
                <p className="text-xs text-[#1a2f3a] p-3 rounded-xl bg-[#f7f3eb] border border-[#ebe4d6] font-medium">
                  {medication.deliveryFormat}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'safety' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-xs text-[#0d7377] uppercase tracking-wider font-mono-spec mb-1">
                  Clinical Indications
                </h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-[#1a2f3a]">
                  {medication.clinicalIndications.map((ind, i) => (
                    <li key={i}>{ind}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#0d7377] uppercase tracking-wider font-mono-spec mb-1">
                  Storage Protocol
                </h4>
                <p className="text-xs text-[#1a2f3a] p-3 rounded-xl bg-[#f7f3eb] border border-[#ebe4d6] font-medium">
                  {medication.storageNotes}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="bg-[#f7f3eb] border-t border-[#0d7377]/10 p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-[#5a6f7a]">
            <ShieldCheck className="w-4 h-4 text-[#0d7377]" />
            <span>100% Quality Assured &amp; Certified</span>
          </div>

          <div className="flex gap-2.5 w-full sm:w-auto">
            {medication.requiresConsultation && (
              <button
                onClick={() => {
                  onClose();
                  onBookConsultation(medication);
                }}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-full bg-white hover:bg-[#ebe4d6] text-[#1a2f3a] border border-[#ebe4d6] font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#c9a227]" />
                <span>Book Consult</span>
              </button>
            )}

            <button
              onClick={handleAdd}
              className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer ${
                addedAnimation
                  ? 'bg-emerald-700 text-white'
                  : 'bg-gradient-to-r from-[#0d7377] to-[#14919b] hover:brightness-110 text-white'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-[#e8d48b]" />
                  <span>Add to Cart ({formatPriceETB(medication.price)})</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
