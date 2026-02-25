export type Role = 'user' | 'model' | 'system';

export interface Message {
  id: string;
  role: Role;
  text: string;
  timestamp: Date;
  isTyping?: boolean;
  metadata?: any;
  attachments?: string[];
  action?: 'PAY_HELD' | 'PAY_RELEASED' | 'DISPUTE_OPEN' | 'RENDER_GENERATED';
  payload?: MendlyJSONOutput; // structured data for the UI to consume
}

export interface MendlyJSONOutput {
  id_cliente?: string;
  categoria_servicio?: string;
  urgencia_nivel?: number;
  descripcion_problema?: string;
  render_trigger?: boolean;
  replicate_model?: string;
  cotizacion_estimada?: number;
  stripe_status?: string;
  metadata?: {
    latency_goal?: string;
    raw_prompt?: string;
  };
}

export interface OrderPhase {
  label: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
  date?: string;
}

export interface OrderMessage {
  id: string;
  sender: 'user' | 'provider' | 'system';
  text: string;
  timestamp: string;
  photoUrl?: string;
}

export interface Order {
  id: string;
  serviceName: string;
  serviceDescription: string;
  providerName: string;
  providerAvatar: string;
  price: number;
  status: string;
  currentPhase: number;
  date: string;
  location: string;
  phases: OrderPhase[];
  messages: OrderMessage[];
  photos: string[];
}

export interface ServiceVariable {
  id: string;
  name: string;
  options: string[];
  priceImpact: Record<string, number>; // Record of optionName -> priceDelta
}

export interface SubService {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  color: string; // 'pink' | 'orange' | 'purple' | 'blue'
  priceLabel?: string; // e.g., 'desde'
  priceNote?: string; // e.g., 'Final cost depends on requirements'
  variables?: ServiceVariable[]; // New: Dynamic pricing variables
}

export interface Provider {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  mendlyReady: boolean;
  reviews: number;
  pricePerHour?: number;
  distance: string;
  avatarUrl: string;
  coordinates: { lat: number; lng: number };
  zone?: string; // New: Service Area
  categoryId: string; // Link to ServiceCategory
  services?: SubService[]; // List of specific services offered
  portfolio?: string[]; // New: List of portfolio images
  zones?: string[]; // New: List of zones where the provider operates
}

export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  count: number;
  image?: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  type: 'MAINTENANCE' | 'DESIGN' | 'REPAIR';
  description: string;
  theme: 'pink' | 'green' | 'blue' | 'yellow' | 'purple' | 'orange' | 'gray' | 'red';
  image: string;
  promo?: string;
  items?: ServiceItem[];
}

export enum AppView {
  LOGIN = 'LOGIN',
  SERVICES = 'SERVICES',
  CHAT = 'CHAT',
  CALENDAR = 'CALENDAR', // Main Agenda View
  BOOKING_CALENDAR = 'BOOKING_CALENDAR', // Step in the flow to pick a date
  MAP = 'MAP', // Provider Detail
  SERVICE_CONFIG = 'SERVICE_CONFIG',
  PAYMENT = 'PAYMENT',
  PROVIDER_LIST = 'PROVIDER_LIST',
  PROVIDER_SERVICES = 'PROVIDER_SERVICES',
  OFFERS = 'OFFERS',
  ORDERS = 'ORDERS',
  PROFILE = 'PROFILE',
  ADMIN = 'ADMIN',
  PROVIDER_DASHBOARD = 'PROVIDER_DASHBOARD'
}

export interface MendlyJSONOutput {
  id_cliente?: string;
  categoria_servicio?: string;
  urgencia_nivel?: number;
  descripcion_problema?: string;
  render_trigger?: boolean;
  replicate_model?: string;
  cotizacion_estimada?: number;
  stripe_status?: string;
  metadata?: {
    latency_goal?: string;
    raw_prompt?: string;
  };
}