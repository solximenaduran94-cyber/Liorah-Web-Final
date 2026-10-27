export interface InvitationDesign {
  id: string;
  title: string;
  category: 'Bodas' | 'XV Años' | 'Baby Shower' | 'Bautizo' | 'Cumpleaños' | 'Graduación';
  price: number;
  originalPrice: number;
  image: string;
  badge?: string;
  tagline: string;
  styleDescription: string;
  paletteColors: string[];
  features: string[];
  demoData: {
    eventTitle: string;
    hostsNames: string;
    subtitle: string;
    dateFormatted: string;
    countdownTarget: string; // ISO string
    ceremonyVenue: string;
    ceremonyAddress: string;
    ceremonyTime: string;
    receptionVenue: string;
    receptionAddress: string;
    receptionTime: string;
    dressCode: string;
    dressCodeDetails: string;
    itinerary: { time: string; activity: string; description: string }[];
    giftNote: string;
    clabeNumber: string;
    bankName: string;
    accountHolder: string;
    whatsappNumber: string;
    musicTitle: string;
  };
}

export interface DesignPreferences {
  designId: string;
  designTitle: string;
  eventType: string;
  hostsNames: string;
  eventDate: string;
  eventTime: string;
  ceremonyVenue: string;
  ceremonyAddress: string;
  receptionVenue: string;
  receptionAddress: string;
  mapsUrl: string;
  dressCode: string;
  colorScheme: string;
  typographyStyle: string;
  musicChoice: string;
  specialNotes: string; // Comentarios y especificaciones para la diseñadora
  enabledFeatures: {
    rsvpWhatsApp: boolean;
    googleMaps: boolean;
    countdown: boolean;
    backgroundMusic: boolean;
    giftRegistryClabe: boolean;
    photoGallery: boolean;
    itineraryTimeline: boolean;
    dressCodeGuide: boolean;
  };
  passMode: 'single_link' | 'personalized_names';
}

export interface Review {
  id: string;
  author: string;
  city?: string;
  rating: number;
  eventType: string;
  eventDate: string;
  comment: string;
  verified: boolean;
  createdAt: string;
}

export type LiorahPackageTier = 'express' | 'basic' | 'interactive' | 'animated_video';

export interface LiorahPackageInfo {
  id: LiorahPackageTier;
  title: string;
  price: number;
  priceUSD: number;
  priceMXN: number;
  badge?: string;
  summary: string;
  deliverable: string;
  features: string[];
}

export function formatPriceEquivalents(arsAmount: number): {
  ars: string;
  usd: string;
  mxn: string;
  combined: string;
} {
  // Conversión aproximada oficial para LIORAH STUDIO:
  // Base invitacion web: $60.000 ARS ≈ $50 USD · $990 MXN
  const usdAmount = Math.max(1, Math.round(arsAmount / 1200));
  const mxnAmount = Math.round(usdAmount * 19.8);

  return {
    ars: `$${arsAmount.toLocaleString('es-AR')} ARS`,
    usd: `$${usdAmount} USD`,
    mxn: `$${mxnAmount.toLocaleString('es-MX')} MXN`,
    combined: `≈ $${usdAmount} USD · $${mxnAmount.toLocaleString('es-MX')} MXN`,
  };
}

export const LIORAH_PACKAGES: Record<LiorahPackageTier, LiorahPackageInfo> = {
  express: {
    id: 'express',
    title: 'Diseñador Express',
    price: 35000,
    priceUSD: 29,
    priceMXN: 575,
    summary: 'Tarjeta digital JPG descargable con más de 200 fondos de catálogo o tu foto personal subida para envíos inmediatos.',
    deliverable: 'Archivo JPG HD en alta resolución listo para enviar',
    features: [
      'Descarga directa de alta definición',
      '+200 Fondos de catálogo curados',
      'Opción de subir tu propia foto',
      'Ideal para envíos rápidos por WhatsApp',
    ],
  },
  basic: {
    id: 'basic',
    title: 'Propuesta Básica HD',
    price: 45000,
    priceUSD: 38,
    priceMXN: 750,
    summary: 'Diseño fijo HD 100% personalizado desde cero por nuestra diseñadora.',
    deliverable: 'Diseño exclusivo en imagen digital HD + versión PDF',
    features: [
      'Diseño 100% personalizado desde cero',
      'Tipografías finas y composición artesanal',
      'Correcciones y ajustes incluidos',
      'Entrega en alta definición para WhatsApp e historias',
    ],
  },
  interactive: {
    id: 'interactive',
    title: 'Propuesta Interactiva (Invitación Digital)',
    price: 60000,
    priceUSD: 50,
    priceMXN: 990,
    badge: 'MÁS ELEGIDA · $60.000 ARS',
    summary: 'Nuestra invitación digital web más elegida: 100% personalizada con botones directos para GPS (Google Maps), confirmación de asistencia (WhatsApp), música, cuenta regresiva y mesa de regalos.',
    deliverable: 'Enlace web móvil interactivo propio + botones de acción directa',
    features: [
      'Invitación Digital Web interactiva completa',
      'Botón directo de confirmación WhatsApp (RSVP)',
      'Botón GPS a Google Maps y Waze',
      'Cuenta regresiva en vivo y música ambiental',
      'Mesa de regalos con CBU / Alias copiable',
      'Itinerario, dress code y galería de fotos',
    ],
  },
  animated_video: {
    id: 'animated_video',
    title: 'Propuesta Animada',
    price: 85000,
    priceUSD: 70,
    priceMXN: 1390,
    badge: 'ALTA GAMA',
    summary: 'Video MP4 con música, transiciones suaves y tipografías en movimiento para una experiencia cinematográfica inolvidable.',
    deliverable: 'Video MP4 vertical HD con audio + Invitación Web interactiva de cortesía',
    features: [
      'Animación cinematográfica delicada',
      'Banda sonora y efectos de brillo suaves',
      'Ideal para reels, historias y mensajes privados',
      'Acompañado de versión digital interactiva web de cortesía',
    ],
  },
};

export interface OrderItem {
  design: InvitationDesign;
  preferences: DesignPreferences;
  packageTier: LiorahPackageTier;
  addons: {
    rushDelivery24h: boolean;
    individualPasses: boolean;
  };
  totalAmount: number;
}
