import React, { useState } from 'react';
import { STAFF_SPECIALISTS, PHARMACY_INFO } from '../../data/pharmacyData';
import { Medication, PharmacistStaff } from '../../types';
import { 
  Calendar, 
  Clock, 
  Video, 
  Building, 
  CheckCircle2, 
  ShieldCheck, 
  Star, 
  ArrowRight,
  Phone,
  FileCheck2
} from 'lucide-react';

interface ConsultationViewProps {
  initialMedication?: Medication | null;
}

export const ConsultationView: React.FC<ConsultationViewProps> = ({ initialMedication }) => {
  const [selectedPharmacist, setSelectedPharmacist] = useState<PharmacistStaff>(STAFF_SPECIALISTS[0]);
  const [format, setFormat] = useState<'video' | 'in-person'>('in-person');
  const [selectedDate, setSelectedDate] = useState('2026-09-02');
  const [selectedTime, setSelectedTime] = useState('10:30 AM');
  
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [clinicalNotes, setClinicalNotes] = useState(
    initialMedication ? `Interested in consultation regarding ${initialMedication.name} (${initialMedication.categoryLabel}).` : ''
  );

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  const timeSlots = [
    '09:00 AM', '10:30 AM', '11:45 AM', '02:00 PM', '03:30 PM', '05:00 PM'
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientEmail || !patientPhone) return;

    const code = 'CNS-' + Math.floor(100000 + Math.random() * 900000);
    setConfirmationCode(code);
    setBookingConfirmed(true);
  };

  return (
    <div className="space-y-8 pb-20 animate-fadeIn">
      
      {/* Header */}
      <section className="space-y-3 pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CFDAE0] text-[#2C4A52] text-xs font-semibold uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5" />
          <span>Clinical Telehealth &amp; In-Clinic</span>
        </div>
        <h1 className="font-serif-heading text-3xl sm:text-4xl font-medium text-[#1B2430] tracking-tight">
          Book Pharmacist Consultation
        </h1>
        <p className="text-sm sm:text-base text-[#5B6779] leading-relaxed max-w-2xl">
          One-on-one clinical review of your prescriptions, compounding formulations, and bio-identical therapies with board-certified pharmacists.
        </p>
      </section>

      {bookingConfirmed ? (
        <div className="paper-card max-w-2xl mx-auto p-8 sm:p-12 text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto border border-emerald-200">
            <CheckCircle2 className="w-8 h-8 text-emerald-700" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8E652A]">
              Appointment Confirmed
            </span>
            <h2 className="font-serif-heading text-2xl sm:text-3xl font-medium text-[#1B2430]">
              Consultation Scheduled
            </h2>
            <div className="inline-block px-4 py-1.5 rounded-lg bg-[#1B2430] text-[#E9D6AE] font-mono-spec font-medium text-xs sm:text-sm">
              Pass ID: #{confirmationCode}
            </div>
          </div>

          {/* Pass Card Details */}
          <div className="bg-[#E9EEF2] p-6 rounded-xl border border-[#1B2430]/15 text-left space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[#5B6779] block text-xs">Assigned Pharmacist</span>
                <strong className="text-[#1B2430] text-sm font-semibold">{selectedPharmacist.name}</strong>
              </div>
              <div>
                <span className="text-[#5B6779] block text-xs">Format</span>
                <strong className="text-[#1B2430] text-sm font-semibold capitalize flex items-center gap-1.5 mt-0.5">
                  {format === 'video' ? <Video className="w-3.5 h-3.5 text-[#2C4A52]" /> : <Building className="w-3.5 h-3.5 text-[#2C4A52]" />}
                  {format === 'video' ? 'Encrypted Video Link' : 'In-Person Bole Dispensary'}
                </strong>
              </div>
              <div>
                <span className="text-[#5B6779] block text-xs">Date &amp; Time</span>
                <strong className="text-[#1B2430] text-sm font-semibold">{selectedDate} at {selectedTime}</strong>
              </div>
              <div>
                <span className="text-[#5B6779] block text-xs">Patient</span>
                <strong className="text-[#1B2430] text-sm font-semibold">{patientName}</strong>
              </div>
            </div>

            {clinicalNotes && (
              <div className="pt-3 border-t border-[#1B2430]/10">
                <span className="text-[#5B6779] block text-xs">Clinical Focus / Notes</span>
                <p className="text-xs text-[#1B2430] mt-1 italic">&quot;{clinicalNotes}&quot;</p>
              </div>
            )}
          </div>

          <p className="text-xs text-[#5B6779]">
            A calendar confirmation and secure intake link have been dispatched to <strong>{patientEmail}</strong>.
          </p>

          <button
            onClick={() => setBookingConfirmed(false)}
            className="px-6 py-2.5 rounded-lg bg-[#182F35] text-[#E9EEF2] text-xs font-semibold hover:bg-[#2C4A52]"
          >
            Schedule Another Consultation
          </button>
        </div>
      ) : (
        <form onSubmit={handleBooking} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Pharmacist Selector & Details */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Select Pharmacist */}
            <div className="paper-card p-6 space-y-4">
              <h3 className="font-serif-heading text-lg font-medium text-[#1B2430] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#182F35] text-[#E9EEF2] text-xs flex items-center justify-center font-sans">1</span>
                <span>Select Board-Certified Pharmacist</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {STAFF_SPECIALISTS.map((staff) => {
                  const isSelected = selectedPharmacist.id === staff.id;
                  return (
                    <div
                      key={staff.id}
                      onClick={() => setSelectedPharmacist(staff)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-[#2C4A52] bg-[#CFDAE0]/40 ring-1 ring-[#2C4A52]' 
                          : 'border-[#1B2430]/15 hover:border-[#2C4A52]/50 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={staff.avatar} 
                          alt={staff.name}
                          className="w-12 h-12 rounded-xl object-cover border border-[#1B2430]/15"
                        />
                        <div>
                          <h4 className="font-semibold text-sm text-[#1B2430]">{staff.name}</h4>
                          <p className="text-[11px] text-[#5B6779]">{staff.title}</p>
                          <span className="text-[10px] text-[#8E652A] font-semibold block mt-0.5">
                            {staff.specialization}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Format & Schedule */}
            <div className="paper-card p-6 space-y-4">
              <h3 className="font-serif-heading text-lg font-medium text-[#1B2430] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#182F35] text-[#E9EEF2] text-xs flex items-center justify-center font-sans">2</span>
                <span>Format &amp; Schedule</span>
              </h3>

              {/* Format Toggle */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormat('in-person')}
                  className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    format === 'in-person'
                      ? 'border-[#2C4A52] bg-[#182F35] text-[#E9EEF2]'
                      : 'border-[#1B2430]/15 bg-white text-[#5B6779] hover:text-[#1B2430]'
                  }`}
                >
                  <Building className="w-4 h-4" />
                  <span>In-Person (Bole Road)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormat('video')}
                  className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    format === 'video'
                      ? 'border-[#2C4A52] bg-[#182F35] text-[#E9EEF2]'
                      : 'border-[#1B2430]/15 bg-white text-[#5B6779] hover:text-[#1B2430]'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>Encrypted Video Call</span>
                </button>
              </div>

              {/* Date & Time Picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-xs font-semibold text-[#1B2430] block mb-1">Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#E9EEF2]/60 border border-[#1B2430]/15 text-xs text-[#1B2430] focus:outline-none focus:border-[#2C4A52]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#1B2430] block mb-1">Preferred Time Slot</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#E9EEF2]/60 border border-[#1B2430]/15 text-xs text-[#1B2430] focus:outline-none focus:border-[#2C4A52]"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Patient Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="paper-card p-6 space-y-5">
              <h3 className="font-serif-heading text-lg font-medium text-[#1B2430] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#182F35] text-[#E9EEF2] text-xs flex items-center justify-center font-sans">3</span>
                <span>Patient Contact Details</span>
              </h3>

              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="font-semibold text-[#1B2430] block mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g., Abebe Bikila"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#E9EEF2]/60 border border-[#1B2430]/15 text-xs text-[#1B2430] focus:outline-none focus:border-[#2C4A52]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#1B2430] block mb-1">Phone Number (Addis Ababa) *</label>
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="+251 91 123 4567"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#E9EEF2]/60 border border-[#1B2430]/15 text-xs text-[#1B2430] focus:outline-none focus:border-[#2C4A52]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#1B2430] block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    placeholder="patient@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#E9EEF2]/60 border border-[#1B2430]/15 text-xs text-[#1B2430] focus:outline-none focus:border-[#2C4A52]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#1B2430] block mb-1">Clinical Notes &amp; Symptoms</label>
                  <textarea
                    rows={3}
                    value={clinicalNotes}
                    onChange={(e) => setClinicalNotes(e.target.value)}
                    placeholder="Describe symptoms, requested custom formulations, or current prescriptions..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#E9EEF2]/60 border border-[#1B2430]/15 text-xs text-[#1B2430] focus:outline-none focus:border-[#2C4A52]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#182F35] hover:bg-[#2C4A52] text-[#E9EEF2] font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <FileCheck2 className="w-4 h-4 text-[#E9D6AE]" />
                  <span>Confirm Consultation Appointment</span>
                </button>
              </div>

              <p className="text-[11px] text-[#5B6779] text-center">
                🔒 Protected under Ethiopian Medical Ethics Board &amp; HIPAA Confidentiality Protocol.
              </p>
            </div>
          </div>

        </form>
      )}

    </div>
  );
};
