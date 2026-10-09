import React, { useState } from 'react';
import { NavigationTab } from '../types';
import { 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Award, 
  MessageSquare,
  Sparkles,
  ShieldCheck,
  PhoneCall
} from 'lucide-react';

interface HeaderProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  cartCount: number;
  openCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavigationTab | 'gallery'; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'directory', label: 'Products' },
    { id: 'consultations', label: 'Consultations' },
    { id: 'refill', label: 'Rx Refill' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#f7f3eb]/90 backdrop-blur-md border-b border-[#0d7377]/10 transition-all duration-300">
      
      {/* Top Announcement Ribbon */}
      <div className="bg-[#1a2f3a] text-[#f7f3eb] py-1.5 px-4 text-center text-xs font-medium flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#c9a227] animate-pulse"></span>
        <span><strong>Free Same-Day Delivery</strong> to all neighborhoods across Addis Ababa</span>
        <span className="hidden sm:inline text-teal-200">· 100% Quality Assured · Expert Pharmacist Support</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name (Tsehaye Unique Pharmacy) */}
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
            aria-label="Tsehaye Unique Pharmacy Home"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0d7377] to-[#14919b] text-white flex items-center justify-center font-bold text-lg shadow-md shadow-[#0d7377]/20 group-hover:scale-105 transition-transform">
              ✦
            </div>
            <div>
              <div className="font-bold text-lg tracking-tight text-[#1a2f3a] leading-none">
                Tsehaye
              </div>
              <div className="text-[10px] text-[#0d7377] font-bold tracking-wider uppercase mt-1">
                Unique Pharmacy
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'gallery') {
                      setActiveTab('home');
                      setTimeout(() => {
                        document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    } else {
                      setActiveTab(item.id as NavigationTab);
                    }
                  }}
                  className={`text-sm font-semibold transition-all relative py-1.5 cursor-pointer ${
                    isActive 
                      ? 'text-[#0d7377]' 
                      : 'text-[#5a6f7a] hover:text-[#0d7377]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0d7377] rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls & Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* License Chip */}
            <div className="hidden xl:flex items-center gap-1.5 text-xs text-[#5a6f7a] border border-[#0d7377]/20 rounded-full px-3 py-1.5 bg-[#ffffff]/80 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0d7377]" />
              <span>MoH Lic: <strong className="text-[#1a2f3a]">PH-9842-ET</strong></span>
            </div>

            {/* Cart Drawer Button */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-full bg-[#ffffff] hover:bg-[#0d7377]/10 text-[#1a2f3a] border border-[#0d7377]/20 shadow-xs transition-all cursor-pointer active:scale-95"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#0d7377]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#0d7377] text-white text-xs font-bold flex items-center justify-center shadow-xs font-mono-spec">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Navigation Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#EAF5F3] text-[#0F3C6C] border border-[#0F3C6C]/15"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#0F3C6C]/10 space-y-1 animate-fadeIn">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-left font-medium text-sm transition-all ${
                    isActive 
                      ? 'bg-[#EAF5F3] text-[#0F3C6C] font-semibold' 
                      : 'text-[#475569] hover:bg-[#EAF5F3]/50'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#008674]"></span>}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
