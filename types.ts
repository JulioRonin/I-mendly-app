// ============================================================
// I mendly — Type Definitions
// Noche Teal Design System · 3 Portals Architecture
// ============================================================

// ===== VIEWS / ROUTING =====
export enum AppView {
  SPLASH = 'SPLASH',
  LOGIN = 'LOGIN',
  PORTAL_SELECT = 'PORTAL_SELECT',

  // Client Portal
  CLIENT_HOME = 'CLIENT_HOME',
  PROVIDER_LIST = 'PROVIDER_LIST',
  PROVIDER_PROFILE = 'PROVIDER_PROFILE',
  SERVICE_CONFIG = 'SERVICE_CONFIG',
  BOOKING_CALENDAR = 'BOOKING_CALENDAR',
  PAYMENT = 'PAYMENT',
  ORDER_TRACKING = 'ORDER_TRACKING',
  ORDERS = 'ORDERS',
  CLIENT_PROFILE = 'CLIENT_PROFILE',
  CLIENT_REPORTS = 'CLIENT_REPORTS',
  OFFERS = 'OFFERS',
  PROFILE = 'PROFILE',

  // Provider Portal
  PROVIDER_ONBOARDING = 'PROVIDER_ONBOARDING',
  PROVIDER_DASHBOARD = 'PROVIDER_DASHBOARD',
  PROVIDER_EARNINGS = 'PROVIDER_EARNINGS',
  PROVIDER_REVIEWS = 'PROVIDER_REVIEWS',
  SCHEDULE = 'SCHEDULE',
  EARNINGS = 'EARNINGS',
  REVIEWS = 'REVIEWS',

  // Admin Portal
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD',
}

export type UserRole = 'client' | 'provider' | 'admin';

// ===== SERVICE CATEGORIES =====
export type ServiceCategoryId =
  | 'electricity' | 'plumbing' | 'painting' | 'waterproofing'
  | 'ac' | 'cleaning' | 'construction' | 'carpentry'
  | 'fumigation' | 'pets' | 'carwash' | 'tailoring';

export type PricingModel = 'per_sqm' | 'per_unit' | 'per_hour' | 'fixed' | 'per_event' | 'per_day' | 'per_linear_meter';

export interface ServiceCategory {
  id: ServiceCategoryId;
  name: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  description: string;
  pricingModel: PricingModel;
  minPrice: number;
  maxPrice: number;
  unit: string;
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  categoryId: ServiceCategoryId;
  name: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  unit: string;
  estimatedMinutes: number;
  includesMaterials: boolean;
  popular?: boolean;
}

// ===== PROVIDERS =====
export type CertificationStatus = 'pending' | 'in_review' | 'approved' | 'rejected';

export interface Provider {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  avatarImage?: string;
  location: string;
  zone: string;
  rating: number;
  reviewCount: number;
  completedJobs: number;
  completionRate: number;
  yearsExperience: number;
  categories: ServiceCategoryId[];
  description: string;
  certificationStatus: CertificationStatus;
  responseTimeMinutes: number;
  portfolio: string[];
  startingPrice: number;
  badges: ProviderBadge[];
  imendlyCertified: boolean;
  services: ServiceItem[];
}

export type ProviderBadge = 'top_rated' | 'fast_response' | 'pro_certified' | 'background_checked' | 'new';

// ===== ORDERS / ESCROW =====
export type EscrowStatus = 'initiated' | 'payment_held' | 'in_progress' | 'pending_validation' | 'completed' | 'disputed' | 'cancelled' | 'refunded' | 'released';

export interface EscrowTransaction {
  amount: number;
  commissionRate: number;
  commissionAmount: number;
  netProviderAmount: number;
  status: EscrowStatus;
  paymentMethod: 'card' | 'spei' | 'oxxo';
}

export interface OrderEvent {
  type: string;
  label: string;
  timestamp: string;
  done: boolean;
  active: boolean;
}

export interface ServiceRequest {
  id: string;
  status: EscrowStatus;
  address: string;
  zone: string;
  scheduledAt: string;
  description: string;
  quotedAmount: number;
  finalAmount?: number;
  createdAt: string;
  escrow?: EscrowTransaction;
  providerName: string;
  providerInitials: string;
  providerAvatarColor: string;
  serviceName: string;
  categoryId: ServiceCategoryId;
  categoryName: string;
  timeline: OrderEvent[];
}

// ===== REVIEWS =====
export interface Review {
  id: string;
  reviewerName: string;
  reviewerInitials: string;
  rating: number;
  comment: string;
  serviceName: string;
  amount: number;
  createdAt: string;
}

// ===== USERS =====
export interface ClientUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  initials: string;
  zone: string;
  city: string;
  memberSince: string;
}

export interface ProviderUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  initials: string;
  zone: string;
  city: string;
  certificationStatus: CertificationStatus;
  ratingAvg: number;
  totalServices: number;
  completionRate: number;
  earnedThisMonth: number;
  earnedLastMonth: number;
  categories: ServiceCategoryId[];
  imendlyCertified: boolean;
  onboardingStep: number;
}

// ===== APP STATE =====
export interface BookingDetails {
  service?: ServiceItem;
  category?: ServiceCategory;
  provider?: Provider;
  scheduledDate?: string;
  scheduledTime?: string;
  address?: string;
  zone?: string;
  description?: string;
  quotedAmount?: number;
  paymentMethod?: 'card' | 'spei' | 'oxxo';
}

export interface AppState {
  currentView: AppView;
  history: AppView[];
  userRole: UserRole | null;
  clientUser: ClientUser | null;
  providerUser: ProviderUser | null;
  selectedCategory: ServiceCategory | null;
  selectedProvider: Provider | null;
  selectedService: ServiceItem | null;
  bookingDetails: BookingDetails;
  orders: ServiceRequest[];
  onboardingStep: number;
  notifCount: number;
}

// ===== ONBOARDING =====
export interface OnboardingData {
  fullName: string;
  phone: string;
  phoneVerified: boolean;
  birthDate: string;
  colonia: string;
  email: string;
  password: string;
  curp: string;
  rfc: string;
  ineFrontUploaded: boolean;
  ineBackUploaded: boolean;
  selfieUploaded: boolean;
  criminalRecordUploaded: boolean;
  domicileProofUploaded: boolean;
  portfolioCount: number;
  selectedServices: ServiceCategoryId[];
  selectedZones: string[];
  hourlyRate: number;
  yearsExperience: number;
  specialtyDescription: string;
  interviewDate: string;
  interviewTime: string;
  step: number;
}

// ===== COMMISSION =====
export interface CommissionTier {
  maxAmount: number;
  rate: number;
  label: string;
}

export const COMMISSION_TIERS: CommissionTier[] = [
  { maxAmount: 800,      rate: 0.17, label: '17%' },
  { maxAmount: 1500,     rate: 0.14, label: '14%' },
  { maxAmount: 3000,     rate: 0.11, label: '11%' },
  { maxAmount: Infinity, rate: 0.07, label: '7%'  },
];

export function calculateCommission(amount: number): { rate: number; commission: number; net: number } {
  const tier = COMMISSION_TIERS.find(t => amount <= t.maxAmount) || COMMISSION_TIERS[COMMISSION_TIERS.length - 1];
  const commission = Math.round(amount * tier.rate);
  return { rate: tier.rate, commission, net: amount - commission };
}

export function formatMXN(amount: number): string {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(amount);
}
