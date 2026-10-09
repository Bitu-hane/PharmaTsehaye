import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  Clock, 
  Truck, 
  ShieldCheck, 
  ArrowRight,
  FileUp,
  X,
  RefreshCw,
  PhoneCall
} from 'lucide-react';

export const RefillView: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'transfer' | 'upload' | 'rx-number'>('transfer');
  
  // Transfer Form
  const [oldPharmacyName, setOldPharmacyName] = useState('');
  const [oldMedName, setOldMedName] = useState('');

  // Rx Number Form
  const [rxNumber, setRxNumber] = useState('');
  const [patientDob, setPatientDob] = useState('');
  
  // Upload Form
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  // Delivery Time Slot & Address
  const [deliveryWindow, setDeliveryWindow] = useState<'morning' | 'afternoon' | 'evening'>('afternoon');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('Bole Sub City, Addis Ababa');
  
  // Submission State
  const [submitted, setSubmitted] = useState(false);
  const [refillCode, setRefillCode] = useState('');

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientPhone) return;

    const code = 'CAP-' + Math.floor(100000 + Math.random() * 900000);
    setRefillCode(code);
    setSubmitted(true);
  };

  return (
    <div className="space-y-8 pb-20 animate-fadeIn">
      
      {/* Header */}
      <section className="space-y-3 pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF5F3] text-[#008674] text-xs font-semibold uppercase tracking-wider border border-[#008674]/30">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>60-Second Transfer &amp; Refill</span>
        </div>
        <h1 className="font-serif-heading text-3xl sm:text-4xl font-medium text-[#0F3C6C] tracking-tight">
          Transfer or Refill Your Prescription
        </h1>
        <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-2xl">
          Switching to TsehayeRx is completely effortless. Tell us your medication or upload a photo, and we coordinate with your doctor or previous pharmacy.
        </p>
      </section>

      {submitted ? (
        <div className="capsule-card max-w-2xl mx-auto p-8 sm:p-12 text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-2xl bg-[#EAF5F3] text-[#008674] flex items-center justify-center mx-auto border border-[#008674]/30">
            <CheckCircle2 className="w-8 h-8 text-[#008674]" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#EF4931] font-mono-spec">
              Prescription Transfer Initiated
            </span>
            <h2 className="font-serif-heading text-2xl sm:text-3xl font-medium text-[#0F3C6C]">
              We&apos;re Handling the Rest!
            </h2>
            <div className="inline-block px-4 py-1.5 rounded-lg bg-[#0F3C6C] text-[#FFD300] font-mono-spec font-medium text-xs sm:text-sm">
              Transfer ID: #{refillCode}
            </div>
          </div>

          {/* Timeline Status */}
          <div className="bg-[#EAF5F3] p-6 rounded-xl border border-[#008674]/30 space-y-4 text-left">
            <h4 className="text-xs font-semibold text-[#0F3C6C] uppercase tracking-wider font-mono-spec">
              Live Transfer &amp; Delivery Progress
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3 text-[#008674] font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#008674]"></span>
                <span>1. Prescription Transfer Request Received</span>
              </div>
              <div className="flex items-center gap-3 text-[#0F3C6C] font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4931] animate-pulse"></span>
                <span>2. Coordinating with Physician / Previous Pharmacy (In Progress)</span>
              </div>
              <div className="flex items-center gap-3 text-[#475569]">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                <span>3. Cleanroom Compounding &amp; Final Quality Check</span>
              </div>
              <div className="flex items-center gap-3 text-[#475569]">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                <span>4. Free Same-Day Courier Dispatch ({deliveryWindow} Window)</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2.5 rounded-xl bg-[#0F3C6C] text-white text-xs font-semibold hover:bg-[#092647]"
          >
            Submit Another Transfer Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Form Column */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 3 Mode Switcher Tabs */}
            <div className="flex rounded-xl bg-[#EAF5F3] p-1 border border-[#008674]/20">
              <button
                type="button"
                onClick={() => setActiveMode('transfer')}
                className={`flex-1 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  activeMode === 'transfer'
                    ? 'bg-[#0F3C6C] text-white shadow-xs'
                    : 'text-[#475569] hover:text-[#0F3C6C]'
                }`}
              >
                <RefreshCw className="w-4 h-4 text-[#FFD300]" />
                <span>Transfer Pharmacy</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMode('upload')}
                className={`flex-1 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  activeMode === 'upload'
                    ? 'bg-[#0F3C6C] text-white shadow-xs'
                    : 'text-[#475569] hover:text-[#0F3C6C]'
                }`}
              >
                <Upload className="w-4 h-4 text-[#FFD300]" />
                <span>Upload Photo / Document</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMode('rx-number')}
                className={`flex-1 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  activeMode === 'rx-number'
                    ? 'bg-[#0F3C6C] text-white shadow-xs'
                    : 'text-[#475569] hover:text-[#0F3C6C]'
                }`}
              >
                <FileText className="w-4 h-4 text-[#FFD300]" />
                <span>Existing Rx Number</span>
              </button>
            </div>

            {/* Mode 1: Transfer */}
            {activeMode === 'transfer' && (
              <div className="capsule-card p-6 space-y-4">
                <h3 className="font-serif-heading text-lg font-medium text-[#0F3C6C]">
                  Transfer Prescriptions from Another Pharmacy
                </h3>
                <p className="text-xs text-[#475569]">
                  Provide the name of your old pharmacy or medication name. We call them and handle 100% of the paperwork.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-semibold text-[#0F3C6C] block mb-1">Medication Name(s) *</label>
                    <input
                      type="text"
                      required
                      value={oldMedName}
                      onChange={(e) => setOldMedName(e.target.value)}
                      placeholder="e.g., Lumera Serum, Vita-C, Lisinopril..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F8F8] border border-[#0F3C6C]/15 text-xs text-[#0F3C6C] focus:outline-none focus:border-[#008674]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#0F3C6C] block mb-1">Previous Pharmacy or Doctor Name</label>
                    <input
                      type="text"
                      value={oldPharmacyName}
                      onChange={(e) => setOldPharmacyName(e.target.value)}
                      placeholder="e.g., Bole Pharmacy / Dr. Henok"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F8F8] border border-[#0F3C6C]/15 text-xs text-[#0F3C6C] focus:outline-none focus:border-[#008674]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Mode 2: Upload */}
            {activeMode === 'upload' && (
              <div className="capsule-card p-6 space-y-4">
                <h3 className="font-serif-heading text-lg font-medium text-[#0F3C6C]">
                  Upload Prescription Document / Photo
                </h3>

                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleFileDrop}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                    dragOver 
                      ? 'border-[#008674] bg-[#EAF5F3]' 
                      : 'border-[#0F3C6C]/20 bg-[#F5F8F8] hover:border-[#008674]'
                  }`}
                >
                  {uploadedFile ? (
                    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#0F3C6C]/15 max-w-md mx-auto">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <FileUp className="w-5 h-5 text-[#008674] shrink-0" />
                        <div className="text-left truncate">
                          <p className="text-xs font-semibold text-[#0F3C6C] truncate">{uploadedFile.name}</p>
                          <p className="text-[10px] text-[#475569]">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setUploadedFile(null)}
                        className="text-[#475569] hover:text-[#EF4931] p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-[#EAF5F3] text-[#008674] flex items-center justify-center mx-auto">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#0F3C6C]">
                          Drag &amp; drop your prescription paper photo or PDF here
                        </p>
                        <p className="text-[11px] text-[#475569] mt-0.5">
                          Supports PNG, JPG, JPEG, or PDF up to 15MB
                        </p>
                      </div>
                      <label className="inline-block px-4 py-2 rounded-xl bg-[#0F3C6C] text-white text-xs font-semibold cursor-pointer hover:bg-[#092647]">
                        Browse File
                        <input type="file" onChange={handleFileInput} className="hidden" accept="image/*,.pdf" />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mode 3: Rx Number */}
            {activeMode === 'rx-number' && (
              <div className="capsule-card p-6 space-y-4">
                <h3 className="font-serif-heading text-lg font-medium text-[#0F3C6C]">
                  Existing Rx Number Lookup
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-semibold text-[#0F3C6C] block mb-1">Rx Refill Number *</label>
                    <input
                      type="text"
                      required
                      value={rxNumber}
                      onChange={(e) => setRxNumber(e.target.value)}
                      placeholder="e.g., RX-9842-771"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F8F8] border border-[#0F3C6C]/15 text-xs text-[#0F3C6C] focus:outline-none focus:border-[#008674] font-mono-spec"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#0F3C6C] block mb-1">Patient Date of Birth *</label>
                    <input
                      type="date"
                      required
                      value={patientDob}
                      onChange={(e) => setPatientDob(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F8F8] border border-[#0F3C6C]/15 text-xs text-[#0F3C6C] focus:outline-none focus:border-[#008674]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Delivery Time Window Selector */}
            <div className="capsule-card p-6 space-y-4">
              <h3 className="font-serif-heading text-lg font-medium text-[#0F3C6C]">
                Select Free Delivery Time Window (Addis Ababa)
              </h3>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setDeliveryWindow('morning')}
                  className={`p-3 rounded-xl border font-semibold text-center transition-all ${
                    deliveryWindow === 'morning'
                      ? 'border-[#008674] bg-[#008674] text-white shadow-xs'
                      : 'border-[#0F3C6C]/15 bg-white text-[#475569] hover:text-[#0F3C6C]'
                  }`}
                >
                  <span className="block text-[11px] opacity-80">Morning Window</span>
                  <strong className="block text-xs mt-0.5">10:00 AM – 1:00 PM</strong>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryWindow('afternoon')}
                  className={`p-3 rounded-xl border font-semibold text-center transition-all ${
                    deliveryWindow === 'afternoon'
                      ? 'border-[#008674] bg-[#008674] text-white shadow-xs'
                      : 'border-[#0F3C6C]/15 bg-white text-[#475569] hover:text-[#0F3C6C]'
                  }`}
                >
                  <span className="block text-[11px] opacity-80">Afternoon Window</span>
                  <strong className="block text-xs mt-0.5">2:00 PM – 5:00 PM</strong>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryWindow('evening')}
                  className={`p-3 rounded-xl border font-semibold text-center transition-all ${
                    deliveryWindow === 'evening'
                      ? 'border-[#008674] bg-[#008674] text-white shadow-xs'
                      : 'border-[#0F3C6C]/15 bg-white text-[#475569] hover:text-[#0F3C6C]'
                  }`}
                >
                  <span className="block text-[11px] opacity-80">Evening Window</span>
                  <strong className="block text-xs mt-0.5">6:00 PM – 8:30 PM</strong>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Patient Contact Details */}
          <div className="lg:col-span-4 space-y-6">
            <div className="capsule-card p-6 space-y-4">
              <h3 className="font-serif-heading text-lg font-medium text-[#0F3C6C]">
                Patient &amp; Delivery Contact
              </h3>

              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="font-semibold text-[#0F3C6C] block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Patient name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F8F8] border border-[#0F3C6C]/15 text-xs text-[#0F3C6C] focus:outline-none focus:border-[#008674]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#0F3C6C] block mb-1">Contact Phone (Addis Ababa) *</label>
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="+251 91 123 4567"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F8F8] border border-[#0F3C6C]/15 text-xs text-[#0F3C6C] focus:outline-none focus:border-[#008674]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#0F3C6C] block mb-1">Delivery Address / Neighborhood</label>
                  <textarea
                    rows={3}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F8F8] border border-[#0F3C6C]/15 text-xs text-[#0F3C6C] focus:outline-none focus:border-[#008674]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#EF4931] hover:bg-[#d83c25] text-white font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Truck className="w-4 h-4 text-white" />
                  <span>Start Free Same-Day Transfer</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#475569] pt-2 border-t border-[#0F3C6C]/10">
                <ShieldCheck className="w-4 h-4 text-[#008674] shrink-0" />
                <span>100% Free delivery · Insurance accepted.</span>
              </div>
            </div>
          </div>

        </form>
      )}

    </div>
  );
};
