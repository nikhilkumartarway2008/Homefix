export type ServiceCategory =
  | 'Plumbing'
  | 'Electrical'
  | 'Carpentry'
  | 'Painting'
  | 'AC Repair'
  | 'Appliance Repair'
  | 'Cleaning'
  | 'Pest Control'
  | 'More';

export interface ServiceItem {
  id: string;
  name: ServiceCategory;
  tagline: string;
  iconName: string;
  badge?: string;
  startingPrice: number;
  popularSubServices: string[];
}

export interface Professional {
  id: string;
  name: string;
  photoUrl: string;
  isVerified: boolean;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  mainSkill: string;
  category: ServiceCategory;
  startingPrice: number;
  availability: string;
  about: string;
  completedJobs: number;
  badges: string[];
}

export type BookingStatus =
  | 'PENDING'
  | 'SEARCHING'
  | 'ASSIGNED'
  | 'ACCEPTED'
  | 'ON_THE_WAY'
  | 'ARRIVED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'Confirmed'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled';

export interface Booking {
  id: string;
  serviceName: string;
  professionalName: string;
  professionalPhoto: string;
  professionalSkill: string;
  date: string;
  timeSlot: string;
  address: string;
  totalAmount: number;
  discountApplied: number;
  status: BookingStatus;
  etaMinutes?: number;
  otp?: string;
  isEmergency?: boolean;
  problemDescription?: string;
  uploadedPhotos?: string[];
  platformFee?: number;
}

export interface UserProfile {
  name: string;
  greeting: string;
  phone: string;
  email: string;
  location: string;
  savedAddresses: { label: string; address: string; isDefault: boolean }[];
  walletBalance: number;
  membershipStatus: string;
}
