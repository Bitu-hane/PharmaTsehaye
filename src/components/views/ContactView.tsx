import React, { useState } from 'react';
import { PHARMACY_INFO } from '../../data/pharmacyData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  AlertTriangle,
  Building,
  Navigation
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="space-y-8 pb-20 animate-fadeIn">
      
      {/* Header */}
      <section className="space-y-3 pt-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0d7377]/10 text-[#0d7377] text-xs font-bold uppercase tracking-wider">
          <Building className="w-3.5 h-3.5" />
          <span>Visit &amp; Connect</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1a2f3a] tracking-tight">
          We're Here for You
        </h1>
        <p className="text-sm sm:text-base text-[#5a6f7a] leading-relaxed max-w-2xl">
          Visit our bright, welcoming pharmacy in Addis Ababa, call our team, or send us a message for product availability and advice.
        </p>
      </section>

      {/* 3 Main Contact Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-[#0d7377]/10 shadow-sm text-center space-y-3 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-[#f7f3eb] text-[#0d7377] flex items-center justify-center mx-auto text-2xl">
            📍
          </div>
          <h3 className="font-bold text-lg text-[#1a2f3a]">Location</h3>
          <p className="text-xs text-[#5a6f7a] leading-relaxed">
            Come visit our bright, welcoming pharmacy. Look for the clean displays and friendly team.
          </p>
          <div className="text-xs font-bold text-[#0d7377] pt-2">
            {PHARMACY_INFO.address}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#0d7377]/10 shadow-sm text-center space-y-3 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-[#f7f3eb] text-[#0d7377] flex items-center justify-center mx-auto text-2xl">
            🕐
          </div>
          <h3 className="font-bold text-lg text-[#1a2f3a]">Hours</h3>
          <div className="text-xs text-[#5a6f7a] space-y-1">
            <p>Mon – Sat: 8:00 AM – 8:00 PM</p>
            <p>Sunday: 9:00 AM – 5:00 PM</p>
          </div>
          <div className="text-xs font-bold text-[#0d7377] pt-2">
            Open daily for your convenience
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#0d7377]/10 shadow-sm text-center space-y-3 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-[#f7f3eb] text-[#0d7377] flex items-center justify-center mx-auto text-2xl">
            📞
          </div>
          <h3 className="font-bold text-lg text-[#1a2f3a]">Contact</h3>
          <p className="text-xs text-[#5a6f7a] leading-relaxed">
            Call or message us for product availability, dosing advice, and orders.
          </p>
          <div className="text-xs font-bold text-[#0d7377] pt-2">
            <a href={`tel:${PHARMACY_INFO.phone.replace(/[^0-9+]/g, '')}`} className="hover:underline">
              {PHARMACY_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Grid: Form & Directions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Inquiry Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#0d7377]/15 shadow-sm space-y-5">
          <h3 className="font-display text-2xl font-bold text-[#1a2f3a]">
            Send Us a Message
          </h3>

          {submitted ? (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
              <h4 className="font-bold text-lg text-[#1a2f3a]">Message Sent!</h4>
              <p className="text-xs text-[#5a6f7a]">
                Thank you, <strong>{name}</strong>. Our pharmacy team will respond to <strong>{email}</strong> shortly.
              </p>
              <button
                onClick={() => { setSubmitted(false); setMessage(''); }}
                className="px-5 py-2.5 rounded-full bg-[#0d7377] text-white text-xs font-bold hover:bg-[#095456] transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#1a2f3a] block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#f7f3eb] border border-[#ebe4d6] text-xs text-[#1a2f3a] outline-none focus:border-[#0d7377]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#1a2f3a] block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#f7f3eb] border border-[#ebe4d6] text-xs text-[#1a2f3a] outline-none focus:border-[#0d7377]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#1a2f3a] block mb-1">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g., Product availability, Prescription request"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f7f3eb] border border-[#ebe4d6] text-xs text-[#1a2f3a] outline-none focus:border-[#0d7377]"
                />
              </div>

              <div>
                <label className="font-bold text-[#1a2f3a] block mb-1">Message *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you today?"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f7f3eb] border border-[#ebe4d6] text-xs text-[#1a2f3a] outline-none focus:border-[#0d7377]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#0d7377] to-[#14919b] hover:brightness-110 text-white font-bold text-xs shadow-md shadow-[#0d7377]/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Send className="w-4 h-4 text-[#e8d48b]" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

        {/* Map / Address Banner */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-[#1a2f3a] to-[#095456] rounded-3xl overflow-hidden text-white p-6 sm:p-8 space-y-6 shadow-xl border border-[#0d7377]/20">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#e8d48b] font-mono-spec">
                Visit Us In Person
              </span>
              <h4 className="font-display text-2xl font-bold">Bole Road Pharmacy</h4>
              <p className="text-xs text-white/80 leading-relaxed">
                In front of Hosea Real Estate, Addis Ababa, Ethiopia. Look for our bright blue displays and welcoming team!
              </p>
            </div>

            <div className="pt-4 border-t border-white/15 flex items-center justify-between">
              <a
                href="https://maps.app.goo.gl/Uz1rbTVqTvsoFxgk7"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#c9a227] hover:bg-white text-[#1a2f3a] text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
