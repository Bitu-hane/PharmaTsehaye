export type NavigationTab = 'home' | 'directory' | 'contact' | 'consultations' | 'refill';

export type CategoryFilter = 
  | 'all' 
  | 'medicine'
  | 'personal'
  | 'vitamins'
  | 'baby'
  | 'firstaid'
  | 'dermatological' 
  | 'nutraceutical' 
  | 'neurological' 
  | 'cardiovascular'
  | 'compounding'
  | 'immunity';

export interface Medication {
  id: string;
  name: string;
  category: CategoryFilter;
  categoryLabel: string;
  tagline: string;
  description: string;
  price: number;
  isPriceVariable?: boolean;
  isOTC: boolean;
  requiresConsultation: boolean;
  rating: number;
  reviewCount: number;
  image: string;
  emoji?: string;
  details?: string;
  dosage: string;
  deliveryFormat: string;
  activeIngredients: string[];
  clinicalIndications: string[];
  contraindications: string[];
  storageNotes: string;
  purityGrade: string;
  stockStatus: 'In Stock' | 'Custom Formulated (24h)' | 'Low Stock';
}

export interface CartItem {
  medication: Medication;
  quantity: number;
  notes?: string;
}

export interface ConsultationBooking {
  id: string;
  patientName: string;
  email: string;
  phone: string;
  specialist: string;
  serviceType: 'Precision Compounding' | 'General Clinical Advice' | 'Hormone Optimization' | 'Cardio-Metabolic' | 'Skin Longevity';
  consultationFormat: 'In-Clinic (Bole Road)' | 'Encrypted Video Telehealth' | 'Direct Phone Call';
  preferredDate: string;
  preferredTime: string;
  healthConcerns: string;
  status: 'confirmed' | 'pending';
}

export interface PrescriptionUpload {
  rxNumber?: string;
  patientName: string;
  phone: string;
  doctorName?: string;
  deliveryMethod: 'Express Courier' | 'Discreet Boutique Pick-Up';
  urgency: 'Standard (24h)' | 'Same-Day Priority' | 'Immediate Emergency';
  notes: string;
  fileName?: string;
}

export interface PharmacistStaff {
  id: string;
  name: string;
  title: string;
  qualifications: string;
  specialization: string;
  avatar: string;
  availableDays: string;
  rating: number;
}

export interface UXRatingCategory {
  category: string;
  originalScore: number;
  redesignScore: number;
  critique: string;
  improvements: string[];
}
