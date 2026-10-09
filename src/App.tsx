/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavigationTab, Medication, CartItem } from './types';
import { MEDICATIONS_DATA } from './data/pharmacyData';

// Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { UXAuditModal } from './components/UXAuditModal';
import { MedicationModal } from './components/modals/MedicationModal';
import { CartDrawer } from './components/modals/CartDrawer';
import { PatientPortalModal } from './components/modals/PatientPortalModal';

// Views
import { HomeView } from './components/views/HomeView';
import { DirectoryView } from './components/views/DirectoryView';
import { ContactView } from './components/views/ContactView';
import { ConsultationView } from './components/views/ConsultationView';
import { RefillView } from './components/views/RefillView';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);
  const [consultationTargetMed, setConsultationTargetMed] = useState<Medication | null>(null);

  // Cart State (Initialized with 1 sample item so user sees immediate interactivity)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      medication: MEDICATIONS_DATA[0], // Lumera Complex
      quantity: 1,
    }
  ]);

  // Modal States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPatientPortalOpen, setIsPatientPortalOpen] = useState(false);
  const [isUXAuditOpen, setIsUXAuditOpen] = useState(false);

  // Scroll to top when activeTab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Cart Operations
  const handleAddToCart = (medication: Medication) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.medication.id === medication.id);
      if (existing) {
        return prev.map((item) =>
          item.medication.id === medication.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { medication, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.medication.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.medication.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Consultation booking transition from medication card
  const handleBookConsultationFromMed = (medication: Medication) => {
    setConsultationTargetMed(medication);
    setActiveTab('consultations');
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900 selection:bg-sky-600 selection:text-white">
      
      {/* Top Main Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
        openPatientPortal={() => setIsPatientPortalOpen(true)}
        openUXAudit={() => setIsUXAuditOpen(true)}
      />

      {/* Main App Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {activeTab === 'home' && (
          <HomeView
            setActiveTab={setActiveTab}
            onSelectMedication={(med) => setSelectedMedication(med)}
          />
        )}

        {activeTab === 'directory' && (
          <DirectoryView
            onSelectMedication={(med) => setSelectedMedication(med)}
            onAddToCart={handleAddToCart}
            onBookConsultation={handleBookConsultationFromMed}
          />
        )}

        {activeTab === 'consultations' && (
          <ConsultationView initialMedication={consultationTargetMed} />
        )}

        {activeTab === 'refill' && (
          <RefillView />
        )}

        {activeTab === 'contact' && (
          <ContactView />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        openPatientPortal={() => setIsPatientPortalOpen(true)}
      />

      {/* Global Modals & Drawers */}
      <MedicationModal
        medication={selectedMedication}
        onClose={() => setSelectedMedication(null)}
        onAddToCart={handleAddToCart}
        onBookConsultation={handleBookConsultationFromMed}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <PatientPortalModal
        isOpen={isPatientPortalOpen}
        onClose={() => setIsPatientPortalOpen(false)}
        onNavigateToRefill={() => {
          setIsPatientPortalOpen(false);
          setActiveTab('refill');
        }}
      />

      <UXAuditModal
        isOpen={isUXAuditOpen}
        onClose={() => setIsUXAuditOpen(false)}
      />

    </div>
  );
}
