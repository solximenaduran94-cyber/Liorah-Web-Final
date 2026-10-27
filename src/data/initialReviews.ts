import { Review } from '../types';

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Mariana & Carlos',
    city: 'Monterrey, NL',
    rating: 5,
    eventType: 'Boda en Jardín',
    eventDate: 'Octubre 2026',
    comment: '¡Fue la mejor decisión para nuestra boda! Todos los invitados quedaron fascinados con la música de fondo y lo fácil que fue confirmar por WhatsApp. Nos ahorró semanas de llamadas y el diseño se veía 100 veces más elegante que en papel.',
    verified: true,
    createdAt: '2026-10-18',
  },
  {
    id: 'rev-2',
    author: 'Sra. Patricia Luján (Mamá de Renata)',
    city: 'Guadalajara, Jal.',
    rating: 5,
    eventType: 'XV Años',
    eventDate: 'Septiembre 2026',
    comment: 'Compramos el diseño Rose Gold y la diseñadora fue súper atenta. Nos entregaron en menos de 24 horas y le agregaron la canción preferida de mi hija. A los jóvenes les encantó abrirla en el celular y el mapa directo a la hacienda evitó que nadie se perdiera.',
    verified: true,
    createdAt: '2026-09-24',
  },
  {
    id: 'rev-3',
    author: 'Daniela Salcedo',
    city: 'Ciudad de México',
    rating: 5,
    eventType: 'Baby Shower',
    eventDate: 'Octubre 2026',
    comment: 'La mesa de regalos con CLABE copiable fue un éxito total. La página carga súper rápido en cualquier teléfono y los tonos salvia quedaron idénticos a la decoración del evento. 10/10 en atención y calidad.',
    verified: true,
    createdAt: '2026-10-05',
  },
  {
    id: 'rev-4',
    author: 'Arq. Roberto Garza',
    city: 'Puebla, Pue.',
    rating: 5,
    eventType: '50 Aniversario / Cumpleaños',
    eventDate: 'Agosto 2026',
    comment: 'Elegancia pura. Buscaba algo sobrio y formal sin caer en los típicos PDFs aburridos. Esta invitación interactiva con la cuenta regresiva y el código de vestimenta fue un detalle muy aplaudido por nuestros colegas.',
    verified: true,
    createdAt: '2026-08-30',
  },
];

const REVIEWS_STORAGE_KEY = 'aura_client_reviews_v1';

export function loadSavedReviews(): Review[] {
  try {
    const raw = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading reviews from storage', err);
  }
  return INITIAL_REVIEWS;
}

export function saveReview(newReview: Review): Review[] {
  const current = loadSavedReviews();
  const updated = [newReview, ...current];
  try {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving review to storage', err);
  }
  return updated;
}
