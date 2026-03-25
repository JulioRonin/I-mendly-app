import {
  ServiceCategory, ServiceItem, Provider, ServiceRequest,
  ClientUser, ProviderUser, Review
} from './types';

// ===== SERVICE CATEGORIES =====
export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { id: 'electricity', name: 'Electricidad', icon: '⚡', iconBg: 'rgba(245,158,11,0.15)', iconColor: '#F59E0B', description: 'Instalaciones, reparaciones y diagnósticos eléctricos', pricingModel: 'per_unit', minPrice: 180, maxPrice: 8000, unit: 'por pieza / proyecto', featured: true },
  { id: 'plumbing', name: 'Plomería', icon: '🔧', iconBg: 'rgba(59,130,246,0.15)', iconColor: '#3B82F6', description: 'Fugas, instalaciones y reparaciones de tuberías', pricingModel: 'per_event', minPrice: 350, maxPrice: 4000, unit: 'por evento', featured: true },
  { id: 'painting', name: 'Pintura', icon: '🎨', iconBg: 'rgba(168,85,247,0.15)', iconColor: '#A855F7', description: 'Interior, exterior y acabados decorativos', pricingModel: 'per_sqm', minPrice: 50, maxPrice: 36000, unit: 'por m²', featured: true },
  { id: 'waterproofing', name: 'Impermeabilización', icon: '🌊', iconBg: 'rgba(8,145,178,0.15)', iconColor: '#0891B2', description: 'Protección de azoteas, fachadas y sótanos', pricingModel: 'per_sqm', minPrice: 85, maxPrice: 25000, unit: 'por m²' },
  { id: 'ac', name: 'Climas / AC', icon: '❄️', iconBg: 'rgba(6,182,212,0.15)', iconColor: '#06B6D4', description: 'Instalación, mantenimiento y reparación de AC', pricingModel: 'per_unit', minPrice: 350, maxPrice: 25000, unit: 'por equipo', featured: true },
  { id: 'cleaning', name: 'Limpieza', icon: '🧹', iconBg: 'rgba(16,185,129,0.15)', iconColor: '#10B981', description: 'Limpieza básica y profunda del hogar', pricingModel: 'per_event', minPrice: 400, maxPrice: 4000, unit: 'por evento', featured: true },
  { id: 'construction', name: 'Albañilería', icon: '🏗️', iconBg: 'rgba(156,163,175,0.15)', iconColor: '#9CA3AF', description: 'Colados, muros, pisos y remodelaciones', pricingModel: 'per_sqm', minPrice: 80, maxPrice: 12000, unit: 'por m²' },
  { id: 'carpentry', name: 'Carpintería', icon: '🪵', iconBg: 'rgba(217,119,6,0.15)', iconColor: '#D97706', description: 'Closets, muebles a medida y pisos de madera', pricingModel: 'per_unit', minPrice: 250, maxPrice: 40000, unit: 'por pieza / proyecto' },
  { id: 'fumigation', name: 'Fumigación', icon: '💉', iconBg: 'rgba(239,68,68,0.15)', iconColor: '#EF4444', description: 'Control de plagas, cucarachas y roedores', pricingModel: 'per_event', minPrice: 350, maxPrice: 1500, unit: 'por evento' },
  { id: 'pets', name: 'Baño Mascotas', icon: '🐾', iconBg: 'rgba(236,72,153,0.15)', iconColor: '#EC4899', description: 'Baño, corte y estética para tu mascota', pricingModel: 'per_event', minPrice: 200, maxPrice: 1200, unit: 'por servicio' },
  { id: 'carwash', name: 'Lavado de Auto', icon: '🚗', iconBg: 'rgba(79,70,229,0.15)', iconColor: '#4F46E5', description: 'Lavado básico, completo y detailing a domicilio', pricingModel: 'per_event', minPrice: 100, maxPrice: 4000, unit: 'por vehículo' },
  { id: 'tailoring', name: 'Costura', icon: '✂️', iconBg: 'rgba(124,58,237,0.15)', iconColor: '#7C3AED', description: 'Arreglos, prendas a medida y tapicería', pricingModel: 'per_unit', minPrice: 60, maxPrice: 8000, unit: 'por pieza' },
];

// ===== SERVICE ITEMS =====
export const SERVICE_ITEMS: ServiceItem[] = [
  // Electricidad
  { id: 'elec-1', categoryId: 'electricity', name: 'Instalación contacto/apagador', description: 'Instalación de contacto eléctrico o apagador nuevo', minPrice: 180, maxPrice: 350, unit: 'por pieza', estimatedMinutes: 45, includesMaterials: false, popular: true },
  { id: 'elec-2', categoryId: 'electricity', name: 'Instalación de luminaria', description: 'Colocación de lámparas o plafones', minPrice: 500, maxPrice: 800, unit: 'por luminaria', estimatedMinutes: 60, includesMaterials: false },
  { id: 'elec-3', categoryId: 'electricity', name: 'Cableado por habitación', description: 'Cableado eléctrico completo de una habitación', minPrice: 800, maxPrice: 2500, unit: 'por cuarto', estimatedMinutes: 180, includesMaterials: false },
  { id: 'elec-4', categoryId: 'electricity', name: 'Cambio de centro de carga', description: 'Sustitución completa del tablero eléctrico', minPrice: 1000, maxPrice: 1800, unit: 'por evento', estimatedMinutes: 120, includesMaterials: false },
  { id: 'elec-5', categoryId: 'electricity', name: 'Revisión / diagnóstico', description: 'Diagnóstico completo del sistema eléctrico', minPrice: 350, maxPrice: 600, unit: 'por visita', estimatedMinutes: 60, includesMaterials: false, popular: true },
  { id: 'elec-6', categoryId: 'electricity', name: 'Instalación de AC (eléctrico)', description: 'Acometida eléctrica para minisplit', minPrice: 800, maxPrice: 1500, unit: 'por equipo', estimatedMinutes: 90, includesMaterials: false },
  // Plomería
  { id: 'plum-1', categoryId: 'plumbing', name: 'Reparación de fuga simple', description: 'Localización y reparación de fuga visible', minPrice: 350, maxPrice: 700, unit: 'por evento', estimatedMinutes: 60, includesMaterials: false, popular: true },
  { id: 'plum-2', categoryId: 'plumbing', name: 'Destapado de drenaje', description: 'Destapado de lavabo, regadera o drenaje', minPrice: 500, maxPrice: 1200, unit: 'por evento', estimatedMinutes: 60, includesMaterials: false, popular: true },
  { id: 'plum-3', categoryId: 'plumbing', name: 'Instalación de llave/grifo', description: 'Cambio o instalación de llaves de agua', minPrice: 400, maxPrice: 800, unit: 'por pieza', estimatedMinutes: 60, includesMaterials: false },
  { id: 'plum-4', categoryId: 'plumbing', name: 'Instalación de boiler', description: 'Instalación de calentador de agua', minPrice: 600, maxPrice: 1200, unit: 'por equipo', estimatedMinutes: 120, includesMaterials: false },
  { id: 'plum-5', categoryId: 'plumbing', name: 'Instalación de tinaco', description: 'Colocación e instalación de tinaco en azotea', minPrice: 800, maxPrice: 2000, unit: 'por equipo', estimatedMinutes: 180, includesMaterials: false },
  // Pintura
  { id: 'paint-1', categoryId: 'painting', name: 'Pintura interior (solo MO)', description: 'Mano de obra, el cliente pone la pintura', minPrice: 50, maxPrice: 70, unit: 'por m²', estimatedMinutes: 60, includesMaterials: false, popular: true },
  { id: 'paint-2', categoryId: 'painting', name: 'Pintura interior (mat + MO)', description: 'Incluye materiales y mano de obra', minPrice: 120, maxPrice: 180, unit: 'por m²', estimatedMinutes: 60, includesMaterials: true, popular: true },
  { id: 'paint-3', categoryId: 'painting', name: 'Pintura exterior (mat + MO)', description: 'Pintura de exteriores con materiales', minPrice: 140, maxPrice: 220, unit: 'por m²', estimatedMinutes: 60, includesMaterials: true },
  { id: 'paint-4', categoryId: 'painting', name: 'Pintura texturizada', description: 'Acabados texturizados con materiales', minPrice: 180, maxPrice: 350, unit: 'por m²', estimatedMinutes: 90, includesMaterials: true },
  { id: 'paint-5', categoryId: 'painting', name: 'Casa 1 piso completa', description: 'Pintura completa ~120m² de muros', minPrice: 6000, maxPrice: 18000, unit: 'por proyecto', estimatedMinutes: 2880, includesMaterials: true },
  // Impermeabilización
  { id: 'water-1', categoryId: 'waterproofing', name: 'Impermeabilización acrílica', description: 'Sistema acrílico básico para azoteas', minPrice: 85, maxPrice: 140, unit: 'por m²', estimatedMinutes: 60, includesMaterials: true, popular: true },
  { id: 'water-2', categoryId: 'waterproofing', name: 'Con malla de refuerzo', description: 'Sistema con malla para mayor durabilidad', minPrice: 110, maxPrice: 180, unit: 'por m²', estimatedMinutes: 75, includesMaterials: true },
  { id: 'water-3', categoryId: 'waterproofing', name: 'Sistema poliuretano', description: 'Alta durabilidad, resistente a intemperie', minPrice: 200, maxPrice: 350, unit: 'por m²', estimatedMinutes: 90, includesMaterials: true },
  { id: 'water-4', categoryId: 'waterproofing', name: 'Casa mediana (~100m²)', description: 'Paquete completo azotea mediana', minPrice: 5000, maxPrice: 12000, unit: 'por obra', estimatedMinutes: 1440, includesMaterials: true },
  // Climas AC
  { id: 'ac-1', categoryId: 'ac', name: 'Instalación mini-split', description: 'Instalación completa de minisplit nuevo', minPrice: 1500, maxPrice: 3500, unit: 'por equipo', estimatedMinutes: 180, includesMaterials: false, popular: true },
  { id: 'ac-2', categoryId: 'ac', name: 'Mantenimiento preventivo', description: 'Limpieza y revisión completa del AC', minPrice: 400, maxPrice: 800, unit: 'por equipo', estimatedMinutes: 90, includesMaterials: false, popular: true },
  { id: 'ac-3', categoryId: 'ac', name: 'Recarga de gas refrigerante', description: 'Recarga de refrigerante R-410A', minPrice: 600, maxPrice: 1200, unit: 'por equipo', estimatedMinutes: 60, includesMaterials: true },
  { id: 'ac-4', categoryId: 'ac', name: 'Diagnóstico / revisión', description: 'Revisión completa y diagnóstico de fallas', minPrice: 400, maxPrice: 700, unit: 'por visita', estimatedMinutes: 60, includesMaterials: false },
  // Limpieza
  { id: 'clean-1', categoryId: 'cleaning', name: 'Limpieza básica casa 1 piso', description: 'Barrer, trapear, baños y cocina superficial', minPrice: 600, maxPrice: 1000, unit: 'por evento', estimatedMinutes: 180, includesMaterials: false, popular: true },
  { id: 'clean-2', categoryId: 'cleaning', name: 'Limpieza básica departamento', description: 'Limpieza básica de departamento', minPrice: 400, maxPrice: 700, unit: 'por evento', estimatedMinutes: 120, includesMaterials: false, popular: true },
  { id: 'clean-3', categoryId: 'cleaning', name: 'Limpieza profunda casa 1 piso', description: 'Básica + refri, horno, azulejos, vidrios', minPrice: 1200, maxPrice: 2000, unit: 'por evento', estimatedMinutes: 300, includesMaterials: false },
  { id: 'clean-4', categoryId: 'cleaning', name: 'Limpieza de mudanza', description: 'Limpieza profunda para entrada o salida', minPrice: 1500, maxPrice: 3500, unit: 'por evento', estimatedMinutes: 360, includesMaterials: false },
  { id: 'clean-5', categoryId: 'cleaning', name: 'Limpieza de fin de obra', description: 'Limpieza post-construcción o remodelación', minPrice: 1500, maxPrice: 4000, unit: 'por evento', estimatedMinutes: 480, includesMaterials: false },
  // Albañilería
  { id: 'cons-1', categoryId: 'construction', name: 'Levantamiento de muro tabique', description: 'Construcción de pared nueva', minPrice: 180, maxPrice: 350, unit: 'por m²', estimatedMinutes: 120, includesMaterials: false },
  { id: 'cons-2', categoryId: 'construction', name: 'Aplanado de muro', description: 'Aplanado con yeso o mezcla', minPrice: 80, maxPrice: 150, unit: 'por m²', estimatedMinutes: 60, includesMaterials: false, popular: true },
  { id: 'cons-3', categoryId: 'construction', name: 'Instalación de piso cerámico', description: 'Instalación de piso o azulejo', minPrice: 150, maxPrice: 300, unit: 'por m²', estimatedMinutes: 90, includesMaterials: false, popular: true },
  { id: 'cons-4', categoryId: 'construction', name: 'Maestro albañil (jornada)', description: 'Día completo de trabajo', minPrice: 700, maxPrice: 1200, unit: 'por día', estimatedMinutes: 480, includesMaterials: false },
  // Carpintería
  { id: 'carp-1', categoryId: 'carpentry', name: 'Reparación de puerta', description: 'Reparación o ajuste de puerta', minPrice: 300, maxPrice: 700, unit: 'por pieza', estimatedMinutes: 90, includesMaterials: false, popular: true },
  { id: 'carp-2', categoryId: 'carpentry', name: 'Instalación de cerradura', description: 'Cambio o instalación de chapa', minPrice: 250, maxPrice: 500, unit: 'por pieza', estimatedMinutes: 60, includesMaterials: false, popular: true },
  { id: 'carp-3', categoryId: 'carpentry', name: 'Closet a medida (básico)', description: 'Fabricación e instalación de closet', minPrice: 1500, maxPrice: 3500, unit: 'por m lineal', estimatedMinutes: 480, includesMaterials: true },
  { id: 'carp-4', categoryId: 'carpentry', name: 'Piso laminado', description: 'Instalación de piso de madera laminada', minPrice: 250, maxPrice: 600, unit: 'por m²', estimatedMinutes: 60, includesMaterials: false },
  // Fumigación
  { id: 'fum-1', categoryId: 'fumigation', name: 'Fumigación residencial <100m²', description: 'Casa o departamento pequeño', minPrice: 400, maxPrice: 700, unit: 'por evento', estimatedMinutes: 60, includesMaterials: true, popular: true },
  { id: 'fum-2', categoryId: 'fumigation', name: 'Control de cucarachas (gel)', description: 'Aplicación específica para cucarachas', minPrice: 350, maxPrice: 600, unit: 'por evento', estimatedMinutes: 45, includesMaterials: true, popular: true },
  { id: 'fum-3', categoryId: 'fumigation', name: 'Control de ratas/ratones', description: 'Control y eliminación de roedores', minPrice: 500, maxPrice: 1000, unit: 'por evento', estimatedMinutes: 60, includesMaterials: true },
  { id: 'fum-4', categoryId: 'fumigation', name: 'Control de termitas', description: 'Tratamiento especializado', minPrice: 50, maxPrice: 120, unit: 'por m²', estimatedMinutes: 90, includesMaterials: true },
  // Mascotas
  { id: 'pet-1', categoryId: 'pets', name: 'Baño + secado perro pequeño', description: 'Shampoo, secado y perfumado', minPrice: 200, maxPrice: 350, unit: 'por servicio', estimatedMinutes: 60, includesMaterials: true, popular: true },
  { id: 'pet-2', categoryId: 'pets', name: 'Baño + secado perro mediano', description: 'Shampoo, secado y perfumado', minPrice: 300, maxPrice: 450, unit: 'por servicio', estimatedMinutes: 75, includesMaterials: true, popular: true },
  { id: 'pet-3', categoryId: 'pets', name: 'Baño + corte estilizado', description: 'Baño completo con corte de pelo', minPrice: 600, maxPrice: 1200, unit: 'por servicio', estimatedMinutes: 120, includesMaterials: true },
  // Lavado Auto
  { id: 'car-1', categoryId: 'carwash', name: 'Lavado básico exterior', description: 'Lavado exterior completo a domicilio', minPrice: 100, maxPrice: 180, unit: 'auto', estimatedMinutes: 30, includesMaterials: true, popular: true },
  { id: 'car-2', categoryId: 'carwash', name: 'Lavado completo (ext + int)', description: 'Exterior e interior a detalle', minPrice: 200, maxPrice: 350, unit: 'auto', estimatedMinutes: 60, includesMaterials: true, popular: true },
  { id: 'car-3', categoryId: 'carwash', name: 'Lavado premium (encerado)', description: 'Lavado completo + encerado', minPrice: 400, maxPrice: 700, unit: 'auto', estimatedMinutes: 90, includesMaterials: true },
  { id: 'car-4', categoryId: 'carwash', name: 'Detailing completo', description: 'Detailing profesional interior y exterior', minPrice: 1500, maxPrice: 3000, unit: 'auto', estimatedMinutes: 240, includesMaterials: true },
  // Costura
  { id: 'tail-1', categoryId: 'tailoring', name: 'Arreglo de pantalón', description: 'Ajuste de tiro, piernas o cintura', minPrice: 80, maxPrice: 200, unit: 'por pieza', estimatedMinutes: 60, includesMaterials: false, popular: true },
  { id: 'tail-2', categoryId: 'tailoring', name: 'Ruedo de pantalón', description: 'Subir o bajar el ruedo', minPrice: 60, maxPrice: 120, unit: 'por pieza', estimatedMinutes: 30, includesMaterials: false, popular: true },
  { id: 'tail-3', categoryId: 'tailoring', name: 'Prenda a medida (camisa)', description: 'Confección de camisa personalizada', minPrice: 500, maxPrice: 1500, unit: 'por pieza', estimatedMinutes: 480, includesMaterials: true },
  { id: 'tail-4', categoryId: 'tailoring', name: 'Tapicería de sofá 3 plazas', description: 'Retapizado completo de sofá', minPrice: 3000, maxPrice: 8000, unit: 'por pieza', estimatedMinutes: 1440, includesMaterials: true },
];

// ===== PROVIDERS =====
export const MOCK_PROVIDERS: Provider[] = [
  {
    id: 'prov-1', name: 'Carlos Mendoza', initials: 'CM', avatarColor: '#0891B2',
    location: 'Cd. Juárez, Chih.', zone: 'Zona Norte', rating: 4.9, reviewCount: 134,
    completedJobs: 312, completionRate: 98, yearsExperience: 8,
    categories: ['electricity', 'ac'],
    description: 'Electricista certificado con 8 años de experiencia. Especialista en instalaciones residenciales y comerciales, minisplits y centros de carga.',
    certificationStatus: 'approved', responseTimeMinutes: 12, portfolio: [],
    startingPrice: 180, badges: ['top_rated', 'background_checked', 'pro_certified'], imendlyCertified: true,
    services: SERVICE_ITEMS.filter(s => s.categoryId === 'electricity' || s.categoryId === 'ac'),
  },
  {
    id: 'prov-2', name: 'Rosa Gutiérrez', initials: 'RG', avatarColor: '#10B981',
    location: 'Cd. Juárez, Chih.', zone: 'Las Misiones', rating: 5.0, reviewCount: 89,
    completedJobs: 203, completionRate: 100, yearsExperience: 5,
    categories: ['cleaning'],
    description: 'Especialista en limpieza profunda del hogar. Productos eco-friendly y técnicas avanzadas. Limpieza de mudanza y fin de obra.',
    certificationStatus: 'approved', responseTimeMinutes: 8, portfolio: [],
    startingPrice: 600, badges: ['top_rated', 'fast_response', 'background_checked'], imendlyCertified: true,
    services: SERVICE_ITEMS.filter(s => s.categoryId === 'cleaning'),
  },
  {
    id: 'prov-3', name: 'Jorge Reyes', initials: 'JR', avatarColor: '#A855F7',
    location: 'Cd. Juárez, Chih.', zone: 'Zona Sur', rating: 4.8, reviewCount: 67,
    completedJobs: 156, completionRate: 96, yearsExperience: 12,
    categories: ['painting', 'waterproofing'],
    description: 'Pintor profesional con 12 años de experiencia. Especializado en pintura interior, fachadas, texturas decorativas e impermeabilización.',
    certificationStatus: 'approved', responseTimeMinutes: 20, portfolio: [],
    startingPrice: 50, badges: ['pro_certified', 'background_checked'], imendlyCertified: true,
    services: SERVICE_ITEMS.filter(s => s.categoryId === 'painting' || s.categoryId === 'waterproofing'),
  },
  {
    id: 'prov-4', name: 'Sergio Domínguez', initials: 'SD', avatarColor: '#3B82F6',
    location: 'Cd. Juárez, Chih.', zone: 'Zona Centro', rating: 4.9, reviewCount: 112,
    completedJobs: 287, completionRate: 97, yearsExperience: 10,
    categories: ['plumbing'],
    description: 'Plomero experto en sistemas hidráulicos residenciales y comerciales. CPVC, PVC, cobre y sistemas de presión.',
    certificationStatus: 'approved', responseTimeMinutes: 15, portfolio: [],
    startingPrice: 350, badges: ['top_rated', 'background_checked'], imendlyCertified: true,
    services: SERVICE_ITEMS.filter(s => s.categoryId === 'plumbing'),
  },
  {
    id: 'prov-5', name: 'Ana Patricia Flores', initials: 'AF', avatarColor: '#EC4899',
    location: 'Cd. Juárez, Chih.', zone: 'Las Torres', rating: 5.0, reviewCount: 44,
    completedJobs: 98, completionRate: 100, yearsExperience: 3,
    categories: ['pets'],
    description: 'Groomer certificada con amor por los animales. Especialista en todas las razas, servicio a domicilio. Productos premium hipoalergénicos.',
    certificationStatus: 'approved', responseTimeMinutes: 10, portfolio: [],
    startingPrice: 200, badges: ['fast_response', 'background_checked'], imendlyCertified: true,
    services: SERVICE_ITEMS.filter(s => s.categoryId === 'pets'),
  },
  {
    id: 'prov-6', name: 'Héctor Vázquez', initials: 'HV', avatarColor: '#D97706',
    location: 'Cd. Juárez, Chih.', zone: 'Cd. Universitaria', rating: 4.7, reviewCount: 53,
    completedJobs: 124, completionRate: 95, yearsExperience: 15,
    categories: ['carpentry', 'construction'],
    description: 'Maestro carpintero y albañil. Closets, muebles a medida, pisos laminados y trabajos de albañilería.',
    certificationStatus: 'approved', responseTimeMinutes: 25, portfolio: [],
    startingPrice: 250, badges: ['pro_certified'], imendlyCertified: true,
    services: SERVICE_ITEMS.filter(s => s.categoryId === 'carpentry' || s.categoryId === 'construction'),
  },
];

export const ZONES = ['Todas las zonas', 'Zona Norte', 'Zona Centro', 'Zona Sur', 'Zona Oriente', 'Zona Poniente', 'Cd. Universitaria', 'Las Misiones', 'Las Torres', 'Sendero', 'Valle de Juárez'];

export const DEMO_CLIENT: ClientUser = {
  id: 'client-1', name: 'Jaxon Rivera', email: 'jaxon@email.com', phone: '6561234567',
  initials: 'JR', zone: 'Zona Norte', city: 'Ciudad Juárez', memberSince: '2024-06-01',
};

export const DEMO_PROVIDER_USER: ProviderUser = {
  id: 'prov-demo', name: 'Carlos Mendoza', email: 'carlos@email.com', phone: '6569876543',
  initials: 'CM', zone: 'Zona Norte', city: 'Ciudad Juárez', certificationStatus: 'approved',
  ratingAvg: 4.9, totalServices: 312, completionRate: 98, earnedThisMonth: 18400, earnedLastMonth: 15200,
  categories: ['electricity', 'ac'], imendlyCertified: true, onboardingStep: 6,
};

export const DEMO_ORDERS: ServiceRequest[] = [
  {
    id: 'ord-1', status: 'in_progress',
    address: 'Blvd. Independencia 1422, Zona Norte', zone: 'Zona Norte',
    scheduledAt: new Date().toISOString(),
    description: 'Instalación de 2 contactos nuevos en sala y revisión del tablero',
    quotedAmount: 650, createdAt: new Date(Date.now() - 3600000).toISOString(),
    escrow: { amount: 650, commissionRate: 0.14, commissionAmount: 91, netProviderAmount: 559, status: 'payment_held', paymentMethod: 'card' },
    providerName: 'Carlos Mendoza', providerInitials: 'CM', providerAvatarColor: '#0891B2',
    serviceName: 'Instalación contacto/apagador', categoryId: 'electricity', categoryName: 'Electricidad',
    timeline: [
      { type: 'created', label: 'Solicitud creada', timestamp: new Date(Date.now() - 3600000).toISOString(), done: true, active: false },
      { type: 'accepted', label: 'Proveedor aceptó', timestamp: new Date(Date.now() - 3000000).toISOString(), done: true, active: false },
      { type: 'payment_held', label: 'Pago en escrow', timestamp: new Date(Date.now() - 2400000).toISOString(), done: true, active: false },
      { type: 'started', label: 'Servicio iniciado', timestamp: new Date(Date.now() - 1800000).toISOString(), done: true, active: true },
      { type: 'completed', label: 'Servicio completado', timestamp: '', done: false, active: false },
      { type: 'paid', label: 'Pago liberado', timestamp: '', done: false, active: false },
    ],
  },
  {
    id: 'ord-2', status: 'completed',
    address: 'Calle Tecnológico 834, Cd. Universitaria', zone: 'Cd. Universitaria',
    scheduledAt: new Date(Date.now() - 86400000).toISOString(),
    description: 'Limpieza profunda de casa de 2 plantas post-mudanza',
    quotedAmount: 1800, finalAmount: 1800, createdAt: new Date(Date.now() - 172800000).toISOString(),
    escrow: { amount: 1800, commissionRate: 0.11, commissionAmount: 198, netProviderAmount: 1602, status: 'released', paymentMethod: 'spei' },
    providerName: 'Rosa Gutiérrez', providerInitials: 'RG', providerAvatarColor: '#10B981',
    serviceName: 'Limpieza profunda casa 2 pisos', categoryId: 'cleaning', categoryName: 'Limpieza',
    timeline: [
      { type: 'created', label: 'Solicitud creada', timestamp: new Date(Date.now() - 172800000).toISOString(), done: true, active: false },
      { type: 'accepted', label: 'Proveedor aceptó', timestamp: new Date(Date.now() - 169200000).toISOString(), done: true, active: false },
      { type: 'payment_held', label: 'Pago en escrow', timestamp: new Date(Date.now() - 165600000).toISOString(), done: true, active: false },
      { type: 'started', label: 'Servicio iniciado', timestamp: new Date(Date.now() - 108000000).toISOString(), done: true, active: false },
      { type: 'completed', label: 'Servicio completado', timestamp: new Date(Date.now() - 90000000).toISOString(), done: true, active: false },
      { type: 'paid', label: 'Pago liberado', timestamp: new Date(Date.now() - 86400000).toISOString(), done: true, active: true },
    ],
  },
];

export const DEMO_REVIEWS: Review[] = [
  { id: 'rev-1', reviewerName: 'María López', reviewerInitials: 'ML', rating: 5, comment: 'Excelente trabajo, puntual y muy profesional. Dejó todo limpio y funcionando perfecto.', serviceName: 'Instalación contacto/apagador', amount: 350, createdAt: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: 'rev-2', reviewerName: 'Roberto Sánchez', reviewerInitials: 'RS', rating: 5, comment: 'Muy buena atención, llegó a tiempo y el trabajo quedó perfecto. Lo recomiendo ampliamente.', serviceName: 'Mantenimiento preventivo AC', amount: 600, createdAt: new Date(Date.now() - 86400000 * 5).toISOString() },
  { id: 'rev-3', reviewerName: 'Claudia Torres', reviewerInitials: 'CT', rating: 5, comment: 'Super profesional y rápido. El precio fue justo y la calidad inmejorable.', serviceName: 'Revisión / diagnóstico', amount: 500, createdAt: new Date(Date.now() - 86400000 * 8).toISOString() },
];

export const DEMO_WEEKLY_EARNINGS = [
  { day: 'L', amount: 2400 }, { day: 'M', amount: 1800 }, { day: 'X', amount: 3200 },
  { day: 'J', amount: 2800 }, { day: 'V', amount: 4100 }, { day: 'S', amount: 3600 }, { day: 'D', amount: 500 },
];

export const INTERVIEW_SLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00'];

export const ONBOARDING_STEPS = [
  { step: 1, title: 'Datos personales', description: 'Foto, nombre, teléfono y datos básicos', progress: 16 },
  { step: 2, title: 'Verificación de identidad', description: 'CURP, INE y selfie', progress: 32 },
  { step: 3, title: 'Documentos', description: 'Antecedentes, domicilio y portafolio', progress: 48 },
  { step: 4, title: 'Servicios y tarifas', description: 'Qué ofreces, zonas y precios', progress: 64 },
  { step: 5, title: 'Entrevista de calidad', description: 'Videollamada con el equipo I mendly', progress: 82 },
  { step: 6, title: '¡Registro completo!', description: 'En revisión · 48-72 horas hábiles', progress: 100 },
];
