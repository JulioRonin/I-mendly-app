
import { ServiceCategory, Provider, SubService } from './types';

// ==========================================
// SUB-SERVICES (From CSV)
// ==========================================

export const SERVICES_WOODWORK: SubService[] = [
  { id: 'wood-1', name: 'Carpintería General', description: 'Fabricación o reparación de muebles generales o servicio de pintura.', price: 450, image: 'https://images.unsplash.com/photo-1611244419377-b0a760c19719?q=80&w=300', color: 'orange' }
];

export const SERVICES_ELECTRICAL: SubService[] = [
  { id: 'elec-1', name: 'Instalación Centro de Carga', description: 'Instalar y conectar centro de carga en residencial.', price: 1500, image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=300', color: 'yellow' },
  { id: 'elec-2', name: 'Instalación MiniSplit', description: 'Instalación y conexión de minisplit 110V.', price: 950, image: 'https://images.unsplash.com/photo-1621905252507-b35506b0750f?q=80&w=300', color: 'yellow' },
  { id: 'elec-3', name: 'Instalación Unidad Paquete', description: 'Instalación y conexión de Unidad Paquete.', price: 3500, image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=300', color: 'yellow' },
  { id: 'elec-4', name: 'Análisis Falla Eléctrica', description: 'Diagnóstico de problemas eléctricos.', price: 300, image: 'https://images.unsplash.com/photo-1555708816-43615f38d81b?q=80&w=300', color: 'yellow' },
  { id: 'elec-5', name: 'Cambio Apagador/Tomacorriente', description: 'Sustitución de componentes eléctricos.', price: 280, image: 'https://images.unsplash.com/photo-1556609894-3253b50c3748?q=80&w=300', color: 'yellow' },
  { id: 'elec-6', name: 'Instalación Eléctrica', description: 'Instalación eléctrica 110v (Metro Lineal).', price: 920, image: 'https://images.unsplash.com/photo-1497752531616-c3afd9760a11?q=80&w=300', color: 'yellow' }
];

export const SERVICES_CONSTRUCTION: SubService[] = [
  { id: 'const-1', name: 'Muro Tablaroca (2 caras)', description: 'Levantamiento de muros, perfilería, juntas y pasta (sin pintura).', price: 580, image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=300', color: 'gray' },
  { id: 'const-2', name: 'Trabajo de Cielo', description: 'Recubrimiento de tablaroca en cielo interno.', price: 450, image: 'https://images.unsplash.com/photo-1594904351111-a072f80b1a71?q=80&w=300', color: 'gray' },
  { id: 'const-3', name: 'Plancha de Concreto', description: 'Firme de concreto.', price: 400, image: 'https://images.unsplash.com/photo-1518640165980-d3e0e2aa6c1e?q=80&w=300', color: 'gray' },
  { id: 'const-4', name: 'Detallado de Muros', description: 'Reparación y acabado de muros.', price: 350, image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=300', color: 'gray' },
  { id: 'const-5', name: 'Levantamiento de Estructuras', description: 'Muros y estructuras básicas.', price: 350, image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=300', color: 'gray' }
];

export const SERVICES_FASHION: SubService[] = [
  { id: 'fash-1', name: 'Botones / Bastilla', description: 'Ajuste de botones o bastillas.', price: 99, image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=300', color: 'purple' },
  {
    id: 'fash-2',
    name: 'Prenda a Medida',
    description: 'Confección de prenda personalizada.',
    price: 400,
    image: 'https://images.unsplash.com/photo-1509631179647-0177f4547d4c?q=80&w=300',
    color: 'purple',
    priceLabel: 'desde',
    priceNote: 'Dentro preguntaremos detalles para definir el costo final.'
  },
  {
    id: 'fash-3',
    name: 'Vestido a Medida',
    description: 'Confección de vestido (No corsett).',
    price: 950,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=300',
    color: 'purple',
    priceLabel: 'desde',
    priceNote: 'Dentro preguntaremos detalles para definir el costo final.'
  },
  {
    id: 'fash-4',
    name: 'Vestido de Novia',
    description: 'Diseño y confección de vestido de novia.',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1596483553187-8d8a7c1e5509?q=80&w=300',
    color: 'purple',
    priceLabel: 'desde',
    priceNote: 'Dentro preguntaremos detalles para definir el costo final.'
  },
  { id: 'fash-5', name: 'Ajuste y Pinzas', description: 'Ajuste de talla y pinzas.', price: 95, image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=300', color: 'purple' },
  { id: 'fash-6', name: 'Cambio de Zipper', description: 'Reemplazo de cierre.', price: 105, image: 'https://images.unsplash.com/photo-1550921026-6a9dd9a79727?q=80&w=300', color: 'purple' }
];

export const SERVICES_INTERIOR: SubService[] = [
  { id: 'int-1', name: 'Pintura Básica', description: 'Pintura de muros (por m2).', price: 235, image: 'https://images.unsplash.com/photo-1562663474-d7753eff9d2e?q=80&w=300', color: 'pink' },
  { id: 'int-2', name: 'Diseño de Interiores', description: 'Diseño de cocinas, baños y closets.', price: 1200, image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=300', color: 'pink' }
];

export const SERVICES_INDUSTRIAL: SubService[] = [
  { id: 'ind-1', name: 'Mueble de Madera', description: 'Diseño y fabricación (libreros, escritorios).', price: 2500, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=300', color: 'blue' },
  { id: 'ind-2', name: 'Comedor Completo', description: 'Comedor 6 personas (cuarzo/granito).', price: 26000, image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=300', color: 'blue' },
  { id: 'ind-3', name: 'Sillas Estándar', description: 'Sillas modelos estándar.', price: 2100, image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=300', color: 'blue' },
  { id: 'ind-4', name: 'Cocina Minimalista', description: 'Cocina (metro lineal).', price: 2850, image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=300', color: 'blue' },
  { id: 'ind-5', name: 'Closet a Medida', description: 'Closet (metro lineal).', price: 2000, image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=300', color: 'blue' },
  { id: 'ind-6', name: 'Mueble de Baño', description: 'Mueble de baño sencillo.', price: 3490, image: 'https://images.unsplash.com/photo-1620626011915-f65453c316a9?q=80&w=300', color: 'blue' }
];

export const SERVICES_PLUMBING: SubService[] = [
  { id: 'plumb-1', name: 'Instalación Baño', description: 'Instalación de sanitarios y accesorios.', price: 550, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=300', color: 'blue' },
  { id: 'plumb-2', name: 'Instalación Lavabo/Tarja', description: 'Colocación de lavabo o tarja.', price: 450, image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?q=80&w=300', color: 'blue' },
  { id: 'plumb-3', name: 'Reparación de Fugas', description: 'Reparación de fugas de agua.', price: 350, image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=300', color: 'blue' }
];

export const SERVICES_CLEANING: SubService[] = [
  {
    id: 'clean-1',
    name: 'Limpieza Básica (1 Planta)',
    description: 'Limpieza general hogar 1 planta.',
    price: 800,
    image: 'https://images.unsplash.com/photo-1581578731117-104529d3d3bd?q=80&w=300',
    color: 'green',
    variables: [
      {
        id: 'var-plantas',
        name: 'Número de Plantas',
        options: ['1 Planta', '2 Plantas', '3+ Plantas'],
        priceImpact: { '1 Planta': 0, '2 Plantas': 400, '3+ Plantas': 800 }
      }
    ]
  },
  { id: 'clean-2', name: 'Limpieza Detallada (1 Planta)', description: 'Limpieza profunda hogar 1 planta.', price: 1000, image: '/home clean.png', color: 'green' },
  { id: 'clean-3', name: 'Limpieza Básica (2 Plantas)', description: 'Limpieza general hogar 2 plantas.', price: 1350, image: 'https://images.unsplash.com/photo-1527515673516-75c55286e7a5?q=80&w=300', color: 'green' },
  { id: 'clean-4', name: 'Limpieza Detallada (2 Plantas)', description: 'Limpieza profunda hogar 2 plantas.', price: 1500, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=300', color: 'green' },
  { id: 'clean-5', name: 'Lavado de Auto', description: 'Lavado de auto chico o grande.', price: 100, image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=300', color: 'green' },
  { id: 'clean-6', name: 'Retiro de Escombro', description: 'Retiro de escombro (1 Troca).', price: 500, image: 'https://images.unsplash.com/photo-1596468138838-291325c78b20?q=80&w=300', color: 'green' }
];

export const SERVICES_ARCHITECTURE: SubService[] = [
  { id: 'arch-1', name: 'Remodelación', description: 'Diseño y remodelación personalizada.', price: 0, image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=300', color: 'blue' },
  { id: 'arch-2', name: 'Ampliación', description: 'Construcción y ampliación de espacios.', price: 0, image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=300', color: 'blue' }
];

export const SERVICES_ROOFING: SubService[] = [
  { id: 'roof-1', name: 'Impermeabilizar', description: 'Aislamiento para techo (material incluido).', price: 500, image: '/roofing.png', color: 'orange' },
  { id: 'roof-2', name: 'Mantenimiento Techos', description: 'Mantenimiento anual de impermeabilizado.', price: 600, image: 'https://images.unsplash.com/photo-1621251399778-0056637b587a?q=80&w=300', color: 'orange' }
];

export const SERVICES_FLOORING: SubService[] = [
  { id: 'floor-1', name: 'Instalación Cerámica', description: 'Pisos cerámicos (hasta 60x120cm).', price: 350, image: 'https://images.unsplash.com/photo-1581858726768-758c2301d576?q=80&w=300', color: 'gray' },
  { id: 'floor-2', name: 'Instalación Porcelanato', description: 'Pisos porcelánicos (hasta 60x120cm).', price: 500, image: 'https://images.unsplash.com/photo-1620626011915-f65453c316a9?q=80&w=300', color: 'gray' },
  { id: 'floor-3', name: 'Pulido de Pisos', description: 'Pulido de mármol o granito.', price: 300, image: 'https://images.unsplash.com/photo-1527515673516-75c55286e7a5?q=80&w=300', color: 'gray' }
];

export const SERVICES_STONEWORKS: SubService[] = [
  { id: 'stone-1', name: 'Cubierta de Cocina', description: 'Metro lineal de Cuarzo estándar.', price: 3500, image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=300', color: 'gray' }
];

export const SERVICES_ELECTRONIC: SubService[] = [
  { id: 'elec-dev-1', name: 'Análisis Falla Electrónica', description: 'Diagnóstico de equipos electrónicos.', price: 250, image: 'https://images.unsplash.com/photo-1599863836187-573514a60424?q=80&w=300', color: 'purple' },
  { id: 'elec-dev-2', name: 'Reparación Electrodomésticos', description: 'Refrigerador, Lavadora, etc.', price: 850, image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd90f9?q=80&w=300', color: 'purple' },
  { id: 'elec-dev-3', name: 'Reparación TV', description: 'Reparación de televisiones.', price: 900, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=300', color: 'purple' }
];

export const SERVICES_GARDEN: SubService[] = [
  { id: 'garden-1', name: 'Podar Árbol', description: 'Poda de árboles (chico/grande).', price: 200, image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=300', color: 'green' },
  { id: 'garden-2', name: 'Arreglar Jardín', description: 'Mantenimiento general de jardín.', price: 180, image: 'https://images.unsplash.com/photo-1616853242098-b8ce7b77ab4b?q=80&w=300', color: 'green' }
];

export const SERVICES_PET: SubService[] = [
  { id: 'pet-1', name: 'Baño de Mascota', description: 'Baño para mascota chica o grande.', price: 350, image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=300', color: 'orange' }
];

export const SERVICES_PEST: SubService[] = [
  { id: 'pest-1', name: 'Fumigación', description: 'Fumigación casa estándar (2 plantas).', price: 650, image: 'https://images.unsplash.com/photo-1633519391444-482a4d33a758?q=80&w=300', color: 'red' }
];

export const SERVICES_LOCKSMITH: SubService[] = [
  { id: 'lock-1', name: 'Abrir Auto', description: 'Apertura de autos.', price: 300, image: 'https://images.unsplash.com/photo-1588611910609-08de7d72c1c6?q=80&w=300', color: 'gray' },
  { id: 'lock-2', name: 'Copias de Llave', description: 'Duplicado de llaves.', price: 50, image: 'https://images.unsplash.com/photo-1583344605936-47b2dfa45525?q=80&w=300', color: 'gray' }
];

export const SERVICES_PRINTING: SubService[] = [
  { id: 'print-1', name: 'Lona Full Color', description: 'Impresión de lonas.', price: 200, image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=300', color: 'pink' },
  { id: 'print-2', name: 'Etiquetas y Letreros', description: 'Stickers, letreros y señalamientos.', price: 100, image: 'https://images.unsplash.com/photo-1626785774573-4b799314346d?q=80&w=300', color: 'pink' }
];

export const SERVICES_ANCELES: SubService[] = [
  { id: 'cancel-1', name: 'Vidrios y Espejos', description: 'Instalación de vidrios y espejos.', price: 400, image: 'https://images.unsplash.com/photo-1505322896-f9d657597148?q=80&w=300', color: 'blue' },
  { id: 'cancel-2', name: 'Cancelería', description: 'Puertas de cancel y fijos.', price: 800, image: 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?q=80&w=300', color: 'blue' }
];

export const ZONES = [
  "4 Siglos",
  "Las Misiones",
  "Sendero",
  "Las Torres",
  "Centro",
  "Tecnologico",
  "Zaragoza"
];

// ==========================================
// PROVIDERS (Mapped from CSV Suppliers)
// ==========================================
export const MOCK_PROVIDERS: Provider[] = [
  // Carpintería (Category 11)
  { id: "PROV-WOOD-1", name: "Carpintería Diaz", specialty: "Carpintería General", rating: 4.8, reviews: 24, mendlyReady: true, pricePerHour: 450, distance: "3 km", avatarUrl: "https://ui-avatars.com/api/?name=Carpintería+Diaz&background=random", coordinates: { lat: 0, lng: 0 }, zone: "Centro", categoryId: '11', services: SERVICES_WOODWORK },
  { id: "PROV-WOOD-2", name: "Mono Atelier", specialty: "Carpintería y Diseño", rating: 5.0, reviews: 156, mendlyReady: true, pricePerHour: 500, distance: "1.2 km", avatarUrl: "/mono_logo.jpg", coordinates: { lat: 0, lng: 0 }, zone: "Las Torres", categoryId: '11', services: SERVICES_WOODWORK, portfolio: ['/portfolio/mono_atelier/cocina.jpeg', '/portfolio/mono_atelier/bar.jpeg', '/portfolio/mono_atelier/interiorismo1.jpeg', '/portfolio/mono_atelier/cocina1.jpeg', '/portfolio/mono_atelier/recepcion.jpeg'] },
  { id: "PROV-WOOD-3", name: "Zamora", specialty: "Muebles y Acabados", rating: 4.7, reviews: 15, mendlyReady: true, pricePerHour: 420, distance: "5 km", avatarUrl: "https://ui-avatars.com/api/?name=Zamora&background=random", coordinates: { lat: 0, lng: 0 }, zone: "Zaragoza", categoryId: '11', services: SERVICES_WOODWORK },

  // Electrical (Category 5)
  { id: "PROV-ELEC-1", name: "EMDICO", specialty: "Instalaciones Eléctricas", rating: 4.9, reviews: 42, mendlyReady: true, pricePerHour: 300, distance: "2.5 km", avatarUrl: "https://ui-avatars.com/api/?name=EMDICO&background=random", coordinates: { lat: 0, lng: 0 }, zone: "Tecnologico", categoryId: '5', services: SERVICES_ELECTRICAL },

  // Construction (Category 4)
  { id: "PROV-CONST-1", name: "Mono Atelier", specialty: "Construcción y Muros", rating: 5.0, reviews: 156, mendlyReady: true, pricePerHour: 350, distance: "1.2 km", avatarUrl: "/mono_logo.jpg", coordinates: { lat: 0, lng: 0 }, zone: "Las Torres", categoryId: '4', services: SERVICES_CONSTRUCTION },

  // Fashion (Category 13)
  { id: "PROV-FASH-1", name: "Indigo", specialty: "Diseño de Modas", rating: 4.9, reviews: 30, mendlyReady: true, pricePerHour: 200, distance: "4 km", avatarUrl: "/indigo.png", coordinates: { lat: 0, lng: 0 }, zone: "Las Misiones", categoryId: '13', services: SERVICES_FASHION },

  // Interior Design (Category 14)
  { id: "PROV-INT-1", name: "Mono Atelier", specialty: "Diseño de Interiores", rating: 5.0, reviews: 156, mendlyReady: true, pricePerHour: 1200, distance: "1.2 km", avatarUrl: "/mono_logo.jpg", coordinates: { lat: 0, lng: 0 }, zone: "Las Torres", categoryId: '14', services: SERVICES_INTERIOR },

  // Industrial Design (Category 15)
  { id: "PROV-IND-1", name: "Mono Atelier", specialty: "Diseño Industrial", rating: 5.0, reviews: 156, mendlyReady: true, pricePerHour: 2500, distance: "1.2 km", avatarUrl: "/mono_logo.jpg", coordinates: { lat: 0, lng: 0 }, zone: "Las Torres", categoryId: '15', services: SERVICES_INDUSTRIAL },
  { id: "PROV-IND-2", name: "Zamora", specialty: "Muebles a Medida", rating: 4.7, reviews: 15, mendlyReady: true, pricePerHour: 2000, distance: "5 km", avatarUrl: "https://ui-avatars.com/api/?name=Zamora&background=random", coordinates: { lat: 0, lng: 0 }, zone: "Zaragoza", categoryId: '15', services: SERVICES_INDUSTRIAL },
  { id: "PROV-IND-3", name: "Carpintería Diaz", specialty: "Cocinas y Closets", rating: 4.8, reviews: 24, mendlyReady: true, pricePerHour: 2200, distance: "3 km", avatarUrl: "https://ui-avatars.com/api/?name=Carpinteria+Diaz&background=random", coordinates: { lat: 0, lng: 0 }, zone: "Centro", categoryId: '15', services: SERVICES_INDUSTRIAL },
  { id: "PROV-IND-4", name: "La Hacienda", specialty: "Muebles Rústicos", rating: 4.6, reviews: 12, mendlyReady: true, pricePerHour: 1800, distance: "8 km", avatarUrl: "https://ui-avatars.com/api/?name=La+Hacienda&background=random", coordinates: { lat: 0, lng: 0 }, zone: "4 Siglos", categoryId: '15', services: SERVICES_INDUSTRIAL },

  // Plumbing (Category 16)
  { id: "PROV-PLUMB-1", name: "Mono Atelier", specialty: "Instalaciones Hidráulicas", rating: 5.0, reviews: 156, mendlyReady: true, pricePerHour: 350, distance: "1.2 km", avatarUrl: "/mono_logo.jpg", coordinates: { lat: 0, lng: 0 }, zone: "Las Torres", categoryId: '16', services: SERVICES_PLUMBING },

  // Cleaning (Category 10)
  { id: "PROV-CLEAN-1", name: "Karla's House Cleaning", specialty: "Limpieza Residencial", rating: 4.9, reviews: 88, mendlyReady: true, pricePerHour: 800, distance: "2 km", avatarUrl: "/home clean.png", coordinates: { lat: 0, lng: 0 }, zone: "Sendero", categoryId: '10', services: SERVICES_CLEANING.slice(0, 4) },
  { id: "PROV-CLEAN-2", name: "Junior Detail", specialty: "Lavado de Autos", rating: 4.8, reviews: 45, mendlyReady: true, pricePerHour: 100, distance: "3 km", avatarUrl: "https://ui-avatars.com/api/?name=Junior+Detail&background=random", coordinates: { lat: 0, lng: 0 }, zone: "4 Siglos", categoryId: '10', services: SERVICES_CLEANING.slice(4) },

  // Architecture (Category 1)
  { id: "PROV-ARCH-1", name: "Mono Atelier", specialty: "Arquitectura y Remodelación", rating: 5.0, reviews: 156, mendlyReady: true, pricePerHour: 1000, distance: "1.2 km", avatarUrl: "/mono_logo.jpg", coordinates: { lat: 0, lng: 0 }, zone: "Las Torres", categoryId: '1', services: SERVICES_ARCHITECTURE },

  // Roofing (Category 2)
  { id: "PROV-ROOF-1", name: "Mono Atelier", specialty: "Impermeabilización", rating: 5.0, reviews: 156, mendlyReady: true, pricePerHour: 500, distance: "1.2 km", avatarUrl: "/roofing.png", coordinates: { lat: 0, lng: 0 }, zone: "Las Torres", categoryId: '2', services: SERVICES_ROOFING },

  // Flooring (Category 3)
  { id: "PROV-FLOOR-1", name: "Mono Atelier", specialty: "Pisos y Recubrimientos", rating: 5.0, reviews: 156, mendlyReady: true, pricePerHour: 350, distance: "1.2 km", avatarUrl: "/mono_logo.jpg", coordinates: { lat: 0, lng: 0 }, zone: "Las Torres", categoryId: '3', services: SERVICES_FLOORING },
  { id: "PROV-FLOOR-2", name: "Master Stone", specialty: "Piedra y Pulidos", rating: 4.9, reviews: 33, mendlyReady: true, pricePerHour: 300, distance: "4 km", avatarUrl: "/masterstone_final.jpg", coordinates: { lat: 0, lng: 0 }, zone: "Centro", categoryId: '3', services: SERVICES_FLOORING },

  // StoneWorks/Albañilería (Category 4)
  { id: "PROV-STONE-1", name: "Cianitus", specialty: "Cubiertas de Cuarzo", rating: 4.8, reviews: 10, mendlyReady: true, pricePerHour: 3500, distance: "5 km", avatarUrl: "https://ui-avatars.com/api/?name=Cianitus&background=random", coordinates: { lat: 0, lng: 0 }, zone: "Zaragoza", categoryId: '4', services: SERVICES_STONEWORKS },
  { id: "PROV-STONE-2", name: "Master Stone", specialty: "Cubiertas de Granito", rating: 4.9, reviews: 33, mendlyReady: true, pricePerHour: 3500, distance: "4 km", avatarUrl: "https://ui-avatars.com/api/?name=Master+Stone&background=random", coordinates: { lat: 0, lng: 0 }, zone: "Centro", categoryId: '4', services: SERVICES_STONEWORKS },

  // Electronic (Category 12) - Mapped from CSV 'Electronic' (Appliances)
  { id: "PROV-ELEC-DEV-1", name: "Servicio Técnico Express", specialty: "Reparación electrodomésticos", rating: 4.5, reviews: 10, mendlyReady: true, pricePerHour: 850, distance: "2 km", avatarUrl: "https://ui-avatars.com/api/?name=Servicio+Tecnico&background=random", coordinates: { lat: 0, lng: 0 }, zone: "Centro", categoryId: '12', services: SERVICES_ELECTRONIC },

  // Garden (Category 6) - No suppliers in CSV
  { id: "PROV-GARDEN-1", name: "Jardinería Green", specialty: "Poda y Mantenimiento", rating: 4.7, reviews: 12, mendlyReady: true, pricePerHour: 200, distance: "3 km", avatarUrl: "https://ui-avatars.com/api/?name=Jardineria+Green&background=random", coordinates: { lat: 0, lng: 0 }, zone: "Sendero", categoryId: '6', services: SERVICES_GARDEN },

  // Pet Care (Category 7) - No suppliers in CSV
  { id: "PROV-PET-1", name: "PetLove", specialty: "Baño y Cuidado", rating: 4.9, reviews: 50, mendlyReady: true, pricePerHour: 350, distance: "1 km", avatarUrl: "https://ui-avatars.com/api/?name=PetLove&background=random", coordinates: { lat: 0, lng: 0 }, zone: "4 Siglos", categoryId: '7', services: SERVICES_PET },

  // Pest Control (Category 8) - No suppliers in CSV
  { id: "PROV-PEST-1", name: "Control de Plagas", specialty: "Fumigación", rating: 4.8, reviews: 20, mendlyReady: true, pricePerHour: 650, distance: "5 km", avatarUrl: "https://ui-avatars.com/api/?name=Control+Plagas&background=random", coordinates: { lat: 0, lng: 0 }, zone: "Zaragoza", categoryId: '8', services: SERVICES_PEST },

  // Locksmith (Category 9) - No suppliers in CSV
  { id: "PROV-LOCK-1", name: "Cerrajero Express", specialty: "Aperturas de emergencia", rating: 4.6, reviews: 30, mendlyReady: true, pricePerHour: 300, distance: "2 km", avatarUrl: "https://ui-avatars.com/api/?name=Cerrajero&background=random", coordinates: { lat: 0, lng: 0 }, zone: "Centro", categoryId: '9', services: SERVICES_LOCKSMITH },

  // Printing (Category 17)
  { id: "PROV-PRINT-1", name: "J2M Publicidad", specialty: "Imprenta y Anuncios", rating: 4.8, reviews: 15, mendlyReady: true, pricePerHour: 200, distance: "2 km", avatarUrl: "https://ui-avatars.com/api/?name=J2M+Publicidad&background=random", coordinates: { lat: 0, lng: 0 }, zone: "Las Misiones", categoryId: '17', services: SERVICES_PRINTING },

  // Canceles (Category 18)
  { id: "PROV-CANCEL-1", name: "Vidrios y Canceles", specialty: "Vidrios y Aluminio", rating: 4.7, reviews: 22, mendlyReady: true, pricePerHour: 400, distance: "3 km", avatarUrl: "https://ui-avatars.com/api/?name=Vidrios+y+Canceles&background=random", coordinates: { lat: 0, lng: 0 }, zone: "Las Torres", categoryId: '18', services: SERVICES_ANCELES }
];

export const SERVICES: ServiceCategory[] = [
  { id: '10', name: 'Limpieza', icon: 'clean', type: 'MAINTENANCE', description: 'Limpieza profunda y organización.', theme: 'green', image: '/home clean.png', items: [] },
  { id: '1', name: 'Arquitectura', icon: 'architecture', type: 'DESIGN', description: 'Planificación arquitectónica.', theme: 'blue', image: 'https://ui-avatars.com/api/?name=A&background=0D8ABC&color=fff', items: [] },
  { id: '2', name: 'Techos', icon: 'roofing', type: 'REPAIR', description: 'Reparación e instalación.', theme: 'orange', image: '/roofing.png', items: [] },
  { id: '3', name: 'Pisos', icon: 'flooring', type: 'REPAIR', description: 'Madera, azulejo y alfombra.', theme: 'gray', image: 'https://ui-avatars.com/api/?name=P&background=gray&color=fff', items: [] },
  { id: '4', name: 'Albañilería', icon: 'stone', type: 'REPAIR', description: 'Piedra y construcción.', theme: 'gray', image: 'https://ui-avatars.com/api/?name=Al&background=gray&color=fff', items: [] },
  { id: '5', name: 'Electricidad', icon: 'electronic', type: 'REPAIR', description: 'Cableado e instalaciones.', theme: 'yellow', image: 'https://ui-avatars.com/api/?name=E&background=yellow&color=000', items: [] },
  { id: '12', name: 'Electrónica', icon: 'electronic', type: 'REPAIR', description: 'Reparación de electrodomésticos.', theme: 'purple', image: 'https://ui-avatars.com/api/?name=El&background=purple&color=fff', items: [] },
  { id: '11', name: 'Carpintería', icon: 'hammer', type: 'REPAIR', description: 'Muebles y acabados.', theme: 'orange', image: 'https://ui-avatars.com/api/?name=C&background=orange&color=fff', items: [] },
  { id: '16', name: 'Plomería', icon: 'plumbing', type: 'REPAIR', description: 'Instalaciones y fugas.', theme: 'blue', image: 'https://ui-avatars.com/api/?name=Pl&background=blue&color=fff', items: [] },
  { id: '13', name: 'Moda', icon: 'scissors', type: 'DESIGN', description: 'Diseño y costura.', theme: 'purple', image: 'https://ui-avatars.com/api/?name=M&background=purple&color=fff', items: [] },
  { id: '14', name: 'Interiores', icon: 'palette', type: 'DESIGN', description: 'Diseño de interiores.', theme: 'pink', image: 'https://ui-avatars.com/api/?name=I&background=pink&color=fff', items: [] },
  { id: '15', name: 'Diseño Ind.', icon: 'monitor', type: 'DESIGN', description: 'Muebles y diseño industrial.', theme: 'blue', image: 'https://ui-avatars.com/api/?name=DI&background=blue&color=fff', items: [] },
  { id: '17', name: 'Imprenta', icon: 'printer', type: 'DESIGN', description: 'Publicidad e impresión.', theme: 'pink', image: 'https://ui-avatars.com/api/?name=Im&background=pink&color=fff', items: [] },
  { id: '18', name: 'Cancelería', icon: 'window', type: 'REPAIR', description: 'Vidrios y aluminios.', theme: 'blue', image: 'https://ui-avatars.com/api/?name=Ca&background=blue&color=fff', items: [] },
  { id: '6', name: 'Jardinería', icon: 'garden', type: 'MAINTENANCE', description: 'Paisajismo y cuidado.', theme: 'green', image: 'https://ui-avatars.com/api/?name=J&background=green&color=fff', items: [] },
  { id: '7', name: 'Mascotas', icon: 'pet', type: 'MAINTENANCE', description: 'Cuidado y paseo.', theme: 'orange', image: 'https://ui-avatars.com/api/?name=Ma&background=orange&color=fff', items: [] },
  { id: '8', name: 'Fumigación', icon: 'pest', type: 'MAINTENANCE', description: 'Control seguro de plagas.', theme: 'red', image: 'https://ui-avatars.com/api/?name=F&background=red&color=fff', items: [] },
  { id: '9', name: 'Cerrajería', icon: 'lock', type: 'REPAIR', description: 'Aperturas de emergencia.', theme: 'gray', image: 'https://ui-avatars.com/api/?name=Ce&background=gray&color=fff', items: [] },
];
