export interface Worker {
  id: string;
  fullName: string;
  phone: string;
  location: string;
  bio: string;
  yearsExperience: number;
  ratePerDay?: number;
  ratePerProject?: number;
  averageRating: number;
  totalReviews: number;
  totalJobsCompleted: number;
  skills: SkillCategory[];
  portfolioItems: PortfolioItem[];
  profilePhoto?: string;
  isVerified: boolean;
  isAvailable: boolean;
  createdAt: string;
}

export interface Employer {
  id: string;
  companyName: string;
  email: string;
  phone: string;
  industry: Industry;
  location: string;
  averageRating: number;
  isPremium: boolean;
  premiumUntil?: string;
  createdAt: string;
}

export interface PortfolioItem {
  id: string;
  mediaUrl: string;
  thumbnailUrl: string;
  caption: string;
  displayOrder: number;
  type: 'image' | 'video';
}

export interface JobPosting {
  id: string;
  employerId: string;
  employerName: string;
  employerLogo?: string;
  title: string;
  description: string;
  skillCategory: SkillCategory;
  location: string;
  budgetMin: number;
  budgetMax: number;
  durationType: 'daily' | 'weekly' | 'monthly' | 'project';
  requirements: string[];
  status: 'open' | 'closed' | 'filled';
  applicationsCount: number;
  createdAt: string;
}

export interface Review {
  id: string;
  reviewerId: string;
  reviewerName: string;
  reviewerType: 'worker' | 'employer';
  revieweeId: string;
  rating: number;
  ratingDetails: {
    quality?: number;
    punctuality?: number;
    communication?: number;
    professionalism?: number;
  };
  reviewText?: string;
  isVerified: boolean;
  createdAt: string;
}

export type SkillCategory =
  | 'welder'
  | 'plumber'
  | 'electrician'
  | 'carpenter'
  | 'mason'
  | 'painter'
  | 'tiler'
  | 'roofer'
  | 'driver-car'
  | 'driver-motorcycle'
  | 'driver-truck'
  | 'forklift-operator'
  | 'courier'
  | 'warehouse-staff'
  | 'sewing-machine-operator'
  | 'cnc-operator'
  | 'production-operator'
  | 'heavy-equipment-operator'
  | 'ac-technician'
  | 'motorcycle-mechanic'
  | 'car-mechanic'
  | 'cleaning-service'
  | 'gardener'
  | 'handyman'
  | 'security'
  | 'office-boy'
  | 'kitchen-staff'
  | 'general-labor';

export type Industry =
  | 'konstruksi'
  | 'manufaktur'
  | 'logistik'
  | 'retail'
  | 'hospitality'
  | 'lainnya';

export type Location =
  | 'jabodetabek'
  | 'bandung'
  | 'semarang'
  | 'surabaya';

export const SKILL_LABELS: Record<SkillCategory, string> = {
  'welder': 'Welder (Las)',
  'plumber': 'Tukang Ledeng',
  'electrician': 'Tukang Listrik',
  'carpenter': 'Tukang Kayu',
  'mason': 'Tukang Batu',
  'painter': 'Tukang Cat',
  'tiler': 'Tukang Keramik',
  'roofer': 'Tukang Atap',
  'driver-car': 'Driver Mobil',
  'driver-motorcycle': 'Driver Motor',
  'driver-truck': 'Driver Truck',
  'forklift-operator': 'Operator Forklift',
  'courier': 'Kurir',
  'warehouse-staff': 'Staff Gudang',
  'sewing-machine-operator': 'Operator Mesin Jahit',
  'cnc-operator': 'Operator CNC',
  'production-operator': 'Operator Produksi',
  'heavy-equipment-operator': 'Operator Alat Berat',
  'ac-technician': 'Teknisi AC',
  'motorcycle-mechanic': 'Montir Motor',
  'car-mechanic': 'Montir Mobil',
  'cleaning-service': 'Cleaning Service',
  'gardener': 'Tukang Kebun',
  'handyman': 'Handyman',
  'security': 'Security',
  'office-boy': 'Office Boy/Girl',
  'kitchen-staff': 'Kitchen Staff',
  'general-labor': 'General Labor',
};

export const LOCATION_LABELS: Record<Location, string> = {
  'jabodetabek': 'Jabodetabek',
  'bandung': 'Bandung',
  'semarang': 'Semarang',
  'surabaya': 'Surabaya',
};

export const INDUSTRY_LABELS: Record<Industry, string> = {
  'konstruksi': 'Konstruksi',
  'manufaktur': 'Manufaktur',
  'logistik': 'Logistik',
  'retail': 'Retail',
  'hospitality': 'Hospitality',
  'lainnya': 'Lainnya',
};
