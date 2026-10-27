import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  MessageSquare,
  Music,
  Clock,
  Gift,
  Palette,
  Image,
  Calendar,
  Users,
  Heart,
  Sparkles,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Send,
  ExternalLink,
  ShieldCheck,
  Play,
  Pause,
  Compass,
  BedDouble,
  ChevronRight,
  Sparkle
} from 'lucide-react';

interface FeatureItem {
  id: string;
  category: 'esenciales' | 'interactivos' | 'organizacion';
  title: string;
  shortDesc: string;
  badge: string;
  icon: React.ElementType;
}

const ALL_FEATURES: FeatureItem[] = [
  {
    id: 'rsvp',
    category: 'esenciales',
    title: 'Confirmación RSVP Inteligente',
    shortDesc: 'Recepción directa en tu WhatsApp con número de asistentes, restricciones alimentarias (celíacos, veganos) y dedicatorias.',
    badge: '100% Automático',
    icon: MessageSquare,
  },
  {
    id: 'gps',
    category: 'esenciales',
    title: 'GPS en Vivo & Cómo Llegar',
    shortDesc: 'Botones con 1 clic para abrir Google Maps, Waze o Apple Maps. Sin extravíos ni llamadas de última hora.',
    badge: 'Sin Extravíos',
    icon: MapPin,
  },
  {
    id: 'countdown',
    category: 'esenciales',
    title: 'Cuenta Regresiva en Tiempo Real',
    shortDesc: 'Reloj sincronizado con animación de latido. Genera anticipación y emoción desde el primer segundo.',
    badge: 'En Vivo',
    icon: Clock,
  },
  {
    id: 'music',
    category: 'interactivos',
    title: 'Música de Fondo & Reproductor',
    shortDesc: 'Tu canción favorita o vals sonando suavemente con botón sutil de pausa/play para una experiencia cinematográfica.',
    badge: 'Emotivo',
    icon: Music,
  },
  {
    id: 'gift',
    category: 'esenciales',
    title: 'Mesa de Regalos & CBU / Alias',
    shortDesc: 'Datos bancarios con botón interactivo de "Copiar CBU/Alias" al portapapeles y sugerencias de regalos con humor y cariño.',
    badge: 'Botón Copiar 1 Clic',
    icon: Gift,
  },
  {
    id: 'dresscode',
    category: 'interactivos',
    title: 'Dress Code & Paleta Sugerida',
    shortDesc: 'Guía de vestimenta (Elegante, Cocktail, Total Black) con muestras de color visuales para orientar a tus invitados.',
    badge: 'Estilo Impecable',
    icon: Palette,
  },
  {
    id: 'timeline',
    category: 'interactivos',
    title: 'Cronograma & Itinerario del Evento',
    shortDesc: 'Línea de tiempo paso a paso: Ceremonia, Recepción, Vals, Cena, Show sorpresa y Fin de fiesta.',
    badge: 'Paso a Paso',
    icon: Calendar,
  },
  {
    id: 'passes',
    category: 'organizacion',
    title: 'Pases VIP & Control de Invitados',
    shortDesc: 'Personalización por familia o invitado ("Válido para 2 pases"). Evita invitados no contemplados con total delicadeza.',
    badge: 'Exclusividad',
    icon: Users,
  },
  {
    id: 'guestbook',
    category: 'interactivos',
    title: 'Muro de Deseos & Mensajes en Vivo',
    shortDesc: 'Un libro de firmas digital donde tus invitados dejan sus mejores deseos y fotos antes y durante la fiesta.',
    badge: 'Recuerdo Eterno',
    icon: Sparkles,
  },
  {
    id: 'calendar',
    category: 'organizacion',
    title: 'Agendar en Google & Apple Calendar',
    shortDesc: 'Botón para que el invitado guarde el evento en su calendario del teléfono con alarma recordatoria automática.',
    badge: 'Recordatorio',
    icon: Calendar,
  },
  {
    id: 'gallery',
    category: 'interactivos',
    title: 'Galería de Fotos & Book Previo',
    shortDesc: 'Fotos de la sesión pre-boda o sesión de 15 en alta resolución con visor táctil y modo pantalla completa.',
    badge: 'Alta Definición',
    icon: Image,
  },
  {
    id: 'lodging',
    category: 'organizacion',
    title: 'Hospedajes & Tips para Invitados',
    shortDesc: 'Hoteles recomendados, peluquerías cercanas y remises de confianza para invitados que viajan desde lejos.',
    badge: 'Atención Cálida',
    icon: BedDouble,
  },
];

export const FeaturesShowcaseSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('rsvp');
  const [copiedBankField, setCopiedBankField] = useState<string | null>(null);

  // Audio preview synth using Web Audio API so it works 100% reliably
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<string>('Vals de ensueño');
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Interactive Guestbook state for testing
  const [guestMessages, setGuestMessages] = useState<Array<{ name: string; message: string; time: string }>>([
    {
      name: 'Madrina Marcela & Tío Roberto',
      message: '¡No podemos estar más felices por ustedes! Ya preparando los pañuelos y los zapatos cómodos para bailar hasta el amanecer.',
      time: 'Hace 2 horas',
    },
    {
      name: 'Sofi & Lucas',
      message: '¡La mejor fiesta del año sin dudas! Felicitaciones, va a ser inolvidable.',
      time: 'Ayer',
    },
  ]);
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestText, setNewGuestText] = useState('');
  const [justPosted, setJustPosted] = useState(false);

  // VIP Pass Generator interactive demo
  const [vipGuestName, setVipGuestName] = useState('Familia Martínez');
  const [vipPassCount, setVipPassCount] = useState('3');
  const [vipTable, setVipTable] = useState('Mesa 7');
  const [copiedVipLink, setCopiedVipLink] = useState(false);

  // Countdown timer state
  const [countdown, setCountdown] = useState({
    days: 42,
    hours: 14,
    minutes: 38,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { ...prev, days: Math.max(0, prev.days - 1), hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBankField(field);
    setTimeout(() => setCopiedBankField(null), 2500);
  };

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName.trim() || !newGuestText.trim()) return;
    setGuestMessages([
      {
        name: newGuestName.trim(),
        message: newGuestText.trim(),
        time: 'Recién publicado',
      },
      ...guestMessages,
    ]);
    setNewGuestName('');
    setNewGuestText('');
    setJustPosted(true);
    setTimeout(() => setJustPosted(false), 3000);
  };

  // Web Audio soothing chime sequence
  const togglePlayMusic = () => {
    if (isPlayingMusic) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setIsPlayingMusic(false);
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        // Notes for soothing romantic arpeggio (C major 7th / F maj 9)
        const notes = [261.63, 329.63, 392.0, 493.88, 523.25, 392.0, 329.63, 261.63];
        let noteIndex = 0;

        const playChime = () => {
          if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(notes[noteIndex % notes.length], ctx.currentTime);

          gain.gain.setValueAtTime(0.001, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.08);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 1.25);
          noteIndex++;
        };

        playChime();
        intervalRef.current = window.setInterval(playChime, 650);
        setIsPlayingMusic(true);
      } catch {
        setIsPlayingMusic(true);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  const generatedVipLink = `https://liorah.pro/invitacion/ceci-y-ariel?invitado=${encodeURIComponent(
    vipGuestName
  )}&pases=${vipPassCount}&mesa=${encodeURIComponent(vipTable)}`;

  const handleCopyVipLink = () => {
    navigator.clipboard.writeText(generatedVipLink);
    setCopiedVipLink(true);
    setTimeout(() => setCopiedVipLink(false), 2500);
  };

  return (
    <section id="funcionalidades" className="py-20 md:py-28 bg-[#FAF6F0] relative overflow-hidden">
      {/* Decorative Warm Luxury background glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#F5EAEB] rounded-full blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#F5EFE6] rounded-full blur-3xl opacity-80 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="gold-divider mb-3">
            <span className="text-xs text-[#C5A059]">♥</span>
          </div>
          <p className="font-ui text-xs uppercase tracking-[0.24em] text-[#C5A059] font-medium mb-2">
            La Experiencia Digital Completa
          </p>
          <h2 className="font-prestige text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] tracking-wide">
            Todo lo que Incluye tu Invitación Web
          </h2>
          <p className="font-romantic text-lg sm:text-xl text-[#6B5E54] italic mt-2">
            "Tecnología pensada con calidez para que tus invitados vivan la magia desde el primer clic"
          </p>
          <p className="font-ui text-sm text-[#6B5E54] mt-3 leading-relaxed">
            Nuestra propuesta interactiva de <strong className="text-[#1A1A1A] font-semibold">$60.000 ARS</strong> (≈ $50 USD · $990 MXN) reúne más de 12 funciones interactivas integradas en una sola página web elegante, rápida y responsive.
          </p>
        </div>

        {/* Feature Navigation Tabs & Live Interactive Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Feature Selector Grid */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E5D7C5]">
              <span className="font-ui text-xs uppercase tracking-widest text-[#6B5E54] font-semibold">
                Selecciona una funcionalidad para probarla:
              </span>
              <span className="text-[11px] bg-[#FFFDF9] border border-[#E5D7C5] px-2.5 py-0.5 rounded-full text-[#C5A059] font-medium">
                12 Módulos
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 max-h-[580px] overflow-y-auto pr-1">
              {ALL_FEATURES.map((feat) => {
                const Icon = feat.icon;
                const isActive = activeTab === feat.id;
                return (
                  <button
                    key={feat.id}
                    type="button"
                    onClick={() => setActiveTab(feat.id)}
                    className={`group text-left p-3.5 rounded-2xl transition-all duration-200 border cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'bg-[#FFFDF9] border-[#C5A059] shadow-md shadow-[#C5A059]/10 translate-x-1'
                        : 'bg-[#FFFDF9]/60 border-[#E5D7C5]/70 hover:bg-[#FFFDF9] hover:border-[#C5A059]/50'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                          isActive
                            ? 'bg-[#1A1A1A] text-[#C5A059]'
                            : 'bg-[#FAF6F0] text-[#6B5E54] group-hover:text-[#1A1A1A]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4
                            className={`font-ui text-xs font-semibold ${
                              isActive ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/80'
                            }`}
                          >
                            {feat.title}
                          </h4>
                        </div>
                        <p className="font-ui text-[11px] text-[#6B5E54] line-clamp-1 mt-0.5">
                          {feat.shortDesc}
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isActive ? 'text-[#C5A059] translate-x-0.5' : 'text-[#A39589] opacity-40'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="mt-4 p-4 rounded-2xl bg-[#FFFDF9] border border-[#E5D7C5] flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#C5A059] shrink-0" />
              <p className="font-ui text-xs text-[#6B5E54] leading-relaxed">
                <strong className="text-[#1A1A1A] font-semibold">Todo incluido:</strong> Sin costos ocultos. Podes activar, desactivar o reordenar los módulos según el estilo de tu evento.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Live Sandbox Card */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFDF9] rounded-3xl border-2 border-[#E5D7C5] p-6 sm:p-8 shadow-xl shadow-stone-200/50 relative">
              {/* Inner Double luxury border */}
              <div className="absolute inset-2 sm:inset-3 border border-[#E5D7C5]/50 rounded-[22px] pointer-events-none" />

              {/* Sandbox Top Status Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#E5D7C5] relative z-10">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-ui text-xs uppercase tracking-wider text-[#6B5E54] font-semibold">
                    Simulador en Vivo • Modo Interactivo
                  </span>
                </div>
                <span className="font-ui text-xs bg-[#FAF6F0] text-[#C5A059] border border-[#E5D7C5] px-3 py-1 rounded-full font-medium">
                  {ALL_FEATURES.find((f) => f.id === activeTab)?.badge}
                </span>
              </div>

              {/* Dynamic Content based on Active Feature */}
              <div className="py-6 min-h-[360px] flex flex-col justify-center relative z-10">
                {/* 1. RSVP INTERACTIVE */}
                {activeTab === 'rsvp' && (
                  <div className="space-y-4">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF6F0] border border-[#E5D7C5] flex items-center justify-center text-[#C5A059] mb-2">
                        <MessageSquare className="w-6 h-6" />
                      </div>
                      <h3 className="font-prestige text-xl text-[#1A1A1A] font-medium">
                        Confirmación de Asistencia (RSVP)
                      </h3>
                      <p className="font-romantic text-sm text-[#6B5E54] italic">
                        "¡Nos encantaría que nos acompañes a celebrar!"
                      </p>
                    </div>

                    <div className="bg-[#FAF6F0] p-5 rounded-2xl border border-[#E5D7C5] space-y-3">
                      <div>
                        <label className="block font-ui text-xs font-semibold text-[#1A1A1A] mb-1">
                          ¿Quién confirma?
                        </label>
                        <input
                          type="text"
                          readOnly
                          value="Camila & Tomás (2 personas)"
                          className="w-full bg-[#FFFDF9] border border-[#E5D7C5] rounded-xl px-3.5 py-2 text-xs font-ui text-[#1A1A1A]"
                        />
                      </div>
                      <div>
                        <label className="block font-ui text-xs font-semibold text-[#1A1A1A] mb-1">
                          Menú o dieta especial
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          <span className="text-center py-1.5 px-2 bg-[#FFFDF9] border border-[#C5A059] text-[#C5A059] text-[11px] font-ui font-medium rounded-lg">
                            ✓ Estándar
                          </span>
                          <span className="text-center py-1.5 px-2 bg-[#FFFDF9] border border-[#E5D7C5] text-[#6B5E54] text-[11px] font-ui rounded-lg">
                            Vegetariano
                          </span>
                          <span className="text-center py-1.5 px-2 bg-[#FFFDF9] border border-[#E5D7C5] text-[#6B5E54] text-[11px] font-ui rounded-lg">
                            Celíaco
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="block font-ui text-xs font-semibold text-[#1A1A1A] mb-1">
                          Canción que no puede faltar en la fiesta
                        </label>
                        <input
                          type="text"
                          readOnly
                          value="Coldplay - Viva La Vida 🎶"
                          className="w-full bg-[#FFFDF9] border border-[#E5D7C5] rounded-xl px-3.5 py-2 text-xs font-ui text-[#1A1A1A]"
                        />
                      </div>
                    </div>

                    <a
                      href="https://wa.me/5491123456789?text=Hola!%20Confirmo%20mi%20asistencia%20al%20evento%20con%20menú%20estándar"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-ui text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Enviar Confirmación por WhatsApp (Demo)
                    </a>
                  </div>
                )}

                {/* 2. GPS & MAPAS */}
                {activeTab === 'gps' && (
                  <div className="space-y-4">
                    <div className="text-center mb-3">
                      <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF6F0] border border-[#E5D7C5] flex items-center justify-center text-[#C5A059] mb-2">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <h3 className="font-prestige text-xl text-[#1A1A1A] font-medium">
                        Ubicación & GPS Interactivo
                      </h3>
                      <p className="font-romantic text-sm text-[#6B5E54] italic">
                        "Estancia Las Acacias • Salón de Cristal"
                      </p>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden border border-[#E5D7C5] bg-stone-100 h-44 flex items-center justify-center group">
                      <img
                        src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=80"
                        alt="Estancia Las Acacias"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
                        <p className="font-ui text-xs font-bold">Ruta 8 Km 54.5, Pilar, Buenos Aires</p>
                        <p className="font-ui text-[11px] text-stone-200">Estacionamiento privado con valet parking</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <a
                        href="https://maps.google.com"
                        target="_blank"
                        rel="noreferrer"
                        className="py-2.5 px-3 rounded-xl bg-[#1A1A1A] hover:bg-[#333] text-[#FFFDF9] font-ui text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <Compass className="w-4 h-4 text-[#C5A059]" />
                        Abrir Google Maps
                      </a>
                      <a
                        href="https://waze.com"
                        target="_blank"
                        rel="noreferrer"
                        className="py-2.5 px-3 rounded-xl bg-[#FFFDF9] hover:bg-[#FAF6F0] text-[#1A1A1A] border border-[#E5D7C5] font-ui text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <ExternalLink className="w-4 h-4 text-[#C5A059]" />
                        Abrir en Waze
                      </a>
                    </div>
                  </div>
                )}

                {/* 3. COUNTDOWN TIMER */}
                {activeTab === 'countdown' && (
                  <div className="space-y-6 text-center">
                    <div>
                      <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF6F0] border border-[#E5D7C5] flex items-center justify-center text-[#C5A059] mb-2">
                        <Clock className="w-6 h-6" />
                      </div>
                      <h3 className="font-prestige text-2xl text-[#1A1A1A] font-medium">
                        Cuenta Regresiva en Vivo
                      </h3>
                      <p className="font-romantic text-sm text-[#6B5E54] italic">
                        "Cada segundo nos acerca a nuestro gran día"
                      </p>
                    </div>

                    {/* Clock numbers */}
                    <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
                      <div className="bg-[#FAF6F0] border border-[#E5D7C5] p-3 sm:p-4 rounded-2xl shadow-sm">
                        <span className="font-prestige text-3xl sm:text-4xl font-semibold text-[#1A1A1A] block">
                          {countdown.days}
                        </span>
                        <span className="font-ui text-[10px] uppercase tracking-widest text-[#6B5E54]">
                          Días
                        </span>
                      </div>
                      <div className="bg-[#FAF6F0] border border-[#E5D7C5] p-3 sm:p-4 rounded-2xl shadow-sm">
                        <span className="font-prestige text-3xl sm:text-4xl font-semibold text-[#1A1A1A] block">
                          {String(countdown.hours).padStart(2, '0')}
                        </span>
                        <span className="font-ui text-[10px] uppercase tracking-widest text-[#6B5E54]">
                          Horas
                        </span>
                      </div>
                      <div className="bg-[#FAF6F0] border border-[#E5D7C5] p-3 sm:p-4 rounded-2xl shadow-sm">
                        <span className="font-prestige text-3xl sm:text-4xl font-semibold text-[#1A1A1A] block">
                          {String(countdown.minutes).padStart(2, '0')}
                        </span>
                        <span className="font-ui text-[10px] uppercase tracking-widest text-[#6B5E54]">
                          Minutos
                        </span>
                      </div>
                      <div className="bg-[#FAF6F0] border border-[#E5D7C5] p-3 sm:p-4 rounded-2xl shadow-sm">
                        <span className="font-prestige text-3xl sm:text-4xl font-semibold text-[#C5A059] block animate-pulse">
                          {String(countdown.seconds).padStart(2, '0')}
                        </span>
                        <span className="font-ui text-[10px] uppercase tracking-widest text-[#6B5E54]">
                          Segundos
                        </span>
                      </div>
                    </div>

                    <div className="p-3 bg-[#FAF6F0]/80 rounded-xl border border-[#E5D7C5] text-xs font-ui text-[#6B5E54] max-w-sm mx-auto">
                      ♥ Se adapta a la zona horaria del invitado automáticamente
                    </div>
                  </div>
                )}

                {/* 4. MUSIC PLAYER */}
                {activeTab === 'music' && (
                  <div className="space-y-5 text-center">
                    <div>
                      <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF6F0] border border-[#E5D7C5] flex items-center justify-center text-[#C5A059] mb-2">
                        <Music className="w-6 h-6" />
                      </div>
                      <h3 className="font-prestige text-xl text-[#1A1A1A] font-medium">
                        Música de Fondo & Reproductor
                      </h3>
                      <p className="font-romantic text-sm text-[#6B5E54] italic">
                        "Elegí tu canción especial para que comience al ingresar"
                      </p>
                    </div>

                    <div className="bg-[#FAF6F0] p-5 rounded-2xl border border-[#E5D7C5] max-w-md mx-auto space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <p className="font-ui text-xs font-semibold text-[#1A1A1A]">{currentTrack}</p>
                          <p className="font-ui text-[11px] text-[#6B5E54]">Versión Instrumental Acústica</p>
                        </div>
                        <span className="text-xs text-[#C5A059] font-mono">03:45</span>
                      </div>

                      {/* Soundwave animation */}
                      <div className="flex items-center justify-center gap-1.5 h-10">
                        {[40, 75, 55, 90, 60, 30, 85, 45, 95, 65, 35, 80, 50, 70, 40].map((h, i) => (
                          <span
                            key={i}
                            style={{ height: isPlayingMusic ? `${h}%` : '20%' }}
                            className="w-1 bg-[#C5A059] rounded-full transition-all duration-300"
                          />
                        ))}
                      </div>

                      <div className="flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={togglePlayMusic}
                          className="px-6 py-2.5 rounded-full bg-[#1A1A1A] text-[#FFFDF9] font-ui text-xs font-semibold flex items-center gap-2 hover:bg-[#333] transition-all cursor-pointer shadow-md"
                        >
                          {isPlayingMusic ? (
                            <>
                              <Pause className="w-4 h-4 text-[#C5A059]" />
                              Pausar Música
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 text-[#C5A059]" />
                              Reproducir Demo
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-ui text-[#6B5E54]">
                      <span>Canciones de muestra:</span>
                      {['Vals de ensueño', 'Can\'t Help Falling in Love', 'Perfect (Ed Sheeran)'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => {
                            setCurrentTrack(t);
                            if (!isPlayingMusic) togglePlayMusic();
                          }}
                          className={`px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                            currentTrack === t
                              ? 'bg-[#C5A059] text-white border-[#C5A059]'
                              : 'bg-white border-[#E5D7C5] text-[#6B5E54] hover:border-[#C5A059]'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. GIFT & CBU */}
                {activeTab === 'gift' && (
                  <div className="space-y-4">
                    <div className="text-center mb-3">
                      <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF6F0] border border-[#E5D7C5] flex items-center justify-center text-[#C5A059] mb-2">
                        <Gift className="w-6 h-6" />
                      </div>
                      <h3 className="font-prestige text-xl text-[#1A1A1A] font-medium">
                        Mesa de Regalos & CBU / Alias
                      </h3>
                      <p className="font-romantic text-sm text-[#6B5E54] italic">
                        "El mejor regalo es tu presencia, pero si deseás hacernos un presente..."
                      </p>
                    </div>

                    <div className="space-y-3 max-w-md mx-auto">
                      {/* Alias Box */}
                      <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#E5D7C5] flex items-center justify-between">
                        <div>
                          <span className="font-ui text-[10px] uppercase tracking-widest text-[#6B5E54] font-semibold block">
                            Alias Mercado Pago / Bancario
                          </span>
                          <span className="font-mono text-sm font-bold text-[#1A1A1A]">
                            BODA.CECI.Y.ARIEL
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy('BODA.CECI.Y.ARIEL', 'alias')}
                          className="px-3 py-1.5 rounded-lg bg-[#FFFDF9] border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-white transition-all text-xs font-ui font-medium flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          {copiedBankField === 'alias' ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700 font-bold">¡Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              Copiar
                            </>
                          )}
                        </button>
                      </div>

                      {/* CBU Box */}
                      <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#E5D7C5] flex items-center justify-between">
                        <div>
                          <span className="font-ui text-[10px] uppercase tracking-widest text-[#6B5E54] font-semibold block">
                            CBU Banco Santander
                          </span>
                          <span className="font-mono text-xs font-medium text-[#1A1A1A]">
                            0720123988000037894562
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy('0720123988000037894562', 'cbu')}
                          className="px-3 py-1.5 rounded-lg bg-[#FFFDF9] border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-white transition-all text-xs font-ui font-medium flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          {copiedBankField === 'cbu' ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700 font-bold">¡Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              Copiar
                            </>
                          )}
                        </button>
                      </div>

                      {/* Buzón físico */}
                      <div className="p-3 bg-[#FFFDF9] rounded-xl border border-dashed border-[#E5D7C5] text-center">
                        <p className="font-ui text-xs text-[#6B5E54]">
                          También contaremos con un <strong className="text-[#1A1A1A]">buzón de sobres en la entrada del salón</strong> para cartas de felicitación y obsequios.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. DRESS CODE */}
                {activeTab === 'dresscode' && (
                  <div className="space-y-4 text-center">
                    <div>
                      <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF6F0] border border-[#E5D7C5] flex items-center justify-center text-[#C5A059] mb-2">
                        <Palette className="w-6 h-6" />
                      </div>
                      <h3 className="font-prestige text-xl text-[#1A1A1A] font-medium">
                        Dress Code & Paleta Cromática
                      </h3>
                      <p className="font-romantic text-sm text-[#6B5E54] italic">
                        "Elegante Sport con toque dorado"
                      </p>
                    </div>

                    <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#E5D7C5] max-w-md mx-auto space-y-4">
                      <p className="font-ui text-xs text-[#6B5E54] leading-relaxed">
                        Les sugerimos tonos cálidos y neutros para combinar con el entorno campestre y la luz de la puesta de sol.
                      </p>

                      <div className="flex items-center justify-center gap-3">
                        {[
                          { color: '#2B2B2B', name: 'Carbón' },
                          { color: '#C5A059', name: 'Oro' },
                          { color: '#D4AF37', name: 'Champagne' },
                          { color: '#C8A2C8', name: 'Lavanda' },
                          { color: '#5B7065', name: 'Salvia' },
                        ].map((c) => (
                          <div key={c.name} className="flex flex-col items-center gap-1">
                            <span
                              style={{ backgroundColor: c.color }}
                              className="w-10 h-10 rounded-full shadow-md border-2 border-white ring-1 ring-stone-300"
                            />
                            <span className="font-ui text-[10px] text-[#6B5E54]">{c.name}</span>
                          </div>
                        ))}
                      </div>

                      <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-center">
                        <span className="font-ui text-xs text-amber-900 font-medium">
                          Nota: Reservamos el color blanco exclusivamente para la novia.
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 7. TIMELINE */}
                {activeTab === 'timeline' && (
                  <div className="space-y-4">
                    <div className="text-center mb-3">
                      <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF6F0] border border-[#E5D7C5] flex items-center justify-center text-[#C5A059] mb-2">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <h3 className="font-prestige text-xl text-[#1A1A1A] font-medium">
                        Cronograma / Itinerario del Evento
                      </h3>
                      <p className="font-romantic text-sm text-[#6B5E54] italic">
                        "Para no perderte ningún momento mágico"
                      </p>
                    </div>

                    <div className="max-w-md mx-auto space-y-2.5">
                      {[
                        { time: '18:00 hs', title: 'Ceremonia en el Jardín', icon: '💍' },
                        { time: '19:30 hs', title: 'Recepción & Cóctel de Bienvenida', icon: '🥂' },
                        { time: '21:00 hs', title: 'Entrada de los Novios & Vals', icon: '✨' },
                        { time: '21:30 hs', title: 'Cena Principal', icon: '🍽️' },
                        { time: '23:30 hs', title: 'Apertura de Pista & Barra de Tragos', icon: '🪩' },
                        { time: '02:30 hs', title: 'Mesa Dulce & Cotillón Fluo', icon: '🎉' },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3.5 p-2.5 bg-[#FAF6F0] border border-[#E5D7C5] rounded-xl"
                        >
                          <span className="text-lg">{item.icon}</span>
                          <span className="font-mono text-xs font-bold text-[#C5A059] w-20">
                            {item.time}
                          </span>
                          <span className="font-ui text-xs font-medium text-[#1A1A1A]">
                            {item.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 8. VIP PASSES */}
                {activeTab === 'passes' && (
                  <div className="space-y-4">
                    <div className="text-center mb-3">
                      <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF6F0] border border-[#E5D7C5] flex items-center justify-center text-[#C5A059] mb-2">
                        <Users className="w-6 h-6" />
                      </div>
                      <h3 className="font-prestige text-xl text-[#1A1A1A] font-medium">
                        Generador de Pases VIP Personalizados
                      </h3>
                      <p className="font-romantic text-sm text-[#6B5E54] italic">
                        "Cada invitado recibe su tarjeta con su nombre y cantidad exacta de pases"
                      </p>
                    </div>

                    <div className="bg-[#FAF6F0] p-4 sm:p-5 rounded-2xl border border-[#E5D7C5] max-w-md mx-auto space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block font-ui text-[11px] font-semibold text-[#1A1A1A] mb-1">
                            Nombre del Invitado
                          </label>
                          <input
                            type="text"
                            value={vipGuestName}
                            onChange={(e) => setVipGuestName(e.target.value)}
                            className="w-full bg-[#FFFDF9] border border-[#E5D7C5] rounded-xl px-2.5 py-1.5 text-xs font-ui text-[#1A1A1A]"
                          />
                        </div>
                        <div>
                          <label className="block font-ui text-[11px] font-semibold text-[#1A1A1A] mb-1">
                            Cantidad de pases
                          </label>
                          <select
                            value={vipPassCount}
                            onChange={(e) => setVipPassCount(e.target.value)}
                            className="w-full bg-[#FFFDF9] border border-[#E5D7C5] rounded-xl px-2.5 py-1.5 text-xs font-ui text-[#1A1A1A]"
                          >
                            <option value="1">1 Pase individual</option>
                            <option value="2">2 Pases (Pareja)</option>
                            <option value="3">3 Pases (Familia)</option>
                            <option value="4">4 Pases (Familia)</option>
                          </select>
                        </div>
                      </div>

                      <div className="p-3 bg-[#FFFDF9] rounded-xl border border-[#C5A059]/40 text-center shadow-sm">
                        <span className="font-ui text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block">
                          Vista previa de la tarjeta que ve el invitado:
                        </span>
                        <p className="font-prestige text-sm font-semibold text-[#1A1A1A] mt-1">
                          ¡Hola {vipGuestName || 'Invitado'}!
                        </p>
                        <p className="font-ui text-xs text-[#6B5E54] mt-0.5">
                          Hemos reservado <strong className="text-[#1A1A1A] font-bold">{vipPassCount} {Number(vipPassCount) === 1 ? 'pase' : 'pases'}</strong> a tu nombre • {vipTable}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleCopyVipLink}
                        className="w-full py-2.5 px-3 rounded-xl bg-[#1A1A1A] hover:bg-[#333] text-[#FFFDF9] font-ui text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer shadow"
                      >
                        {copiedVipLink ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-400" />
                            <span className="text-emerald-300 font-bold">¡Link personalizado copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 text-[#C5A059]" />
                            Copiar Link para enviar por WhatsApp
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* 9. GUESTBOOK / MURO DE DESEOS */}
                {activeTab === 'guestbook' && (
                  <div className="space-y-4">
                    <div className="text-center mb-2">
                      <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF6F0] border border-[#E5D7C5] flex items-center justify-center text-[#C5A059] mb-2">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <h3 className="font-prestige text-xl text-[#1A1A1A] font-medium">
                        Muro de Deseos & Firmas Digitales
                      </h3>
                      <p className="font-romantic text-sm text-[#6B5E54] italic">
                        "Tus invitados pueden dejar dedicatorias que guardarás para siempre"
                      </p>
                    </div>

                    <form onSubmit={handleAddWish} className="bg-[#FAF6F0] p-3.5 rounded-2xl border border-[#E5D7C5] space-y-2 max-w-md mx-auto">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Tu nombre o familia..."
                          value={newGuestName}
                          onChange={(e) => setNewGuestName(e.target.value)}
                          className="bg-[#FFFDF9] border border-[#E5D7C5] rounded-xl px-3 py-1.5 text-xs font-ui text-[#1A1A1A] focus:outline-none focus:border-[#C5A059]"
                        />
                        <button
                          type="submit"
                          className="py-1.5 px-3 rounded-xl bg-[#C5A059] hover:bg-[#b08d47] text-white font-ui text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                        >
                          <Send className="w-3.5 h-3.5" />
                          Dejar Mensaje de Prueba
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Escribe un mensaje de felicitación..."
                        value={newGuestText}
                        onChange={(e) => setNewGuestText(e.target.value)}
                        className="w-full bg-[#FFFDF9] border border-[#E5D7C5] rounded-xl px-3 py-1.5 text-xs font-ui text-[#1A1A1A] focus:outline-none focus:border-[#C5A059]"
                      />
                    </form>

                    {justPosted && (
                      <p className="text-center text-xs font-ui text-emerald-700 font-bold animate-bounce">
                        ♥ ¡Mensaje publicado exitosamente en el muro!
                      </p>
                    )}

                    <div className="space-y-2 max-w-md mx-auto max-h-40 overflow-y-auto pr-1">
                      {guestMessages.map((msg, i) => (
                        <div key={i} className="p-3 bg-[#FFFDF9] border border-[#E5D7C5] rounded-xl shadow-xs">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-ui text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5">
                              <Heart className="w-3 h-3 text-[#C5A059] fill-[#C5A059]" />
                              {msg.name}
                            </span>
                            <span className="text-[10px] text-[#A39589] font-ui">{msg.time}</span>
                          </div>
                          <p className="font-ui text-xs text-[#6B5E54] italic">"{msg.message}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 10. CALENDAR AGENDAR */}
                {activeTab === 'calendar' && (
                  <div className="space-y-4 text-center">
                    <div>
                      <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF6F0] border border-[#E5D7C5] flex items-center justify-center text-[#C5A059] mb-2">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <h3 className="font-prestige text-xl text-[#1A1A1A] font-medium">
                        Agendar en Google & Apple Calendar
                      </h3>
                      <p className="font-romantic text-sm text-[#6B5E54] italic">
                        "Un toque y la fecha queda guardada en el móvil del invitado con recordatorio"
                      </p>
                    </div>

                    <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#E5D7C5] max-w-md mx-auto space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-[#FFFDF9] rounded-xl border border-[#E5D7C5] text-left">
                        <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm">
                          14
                        </div>
                        <div>
                          <p className="font-ui text-xs font-bold text-[#1A1A1A]">Casamiento Ceci & Ariel</p>
                          <p className="font-ui text-[11px] text-[#6B5E54]">Sábado 14 de Noviembre • 18:00 hs</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => alert('Evento listo para sincronizar con Google Calendar')}
                          className="py-2.5 px-3 rounded-xl bg-[#1A1A1A] hover:bg-[#333] text-white font-ui text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          Google Calendar
                        </button>
                        <button
                          type="button"
                          onClick={() => alert('Archivo .ics descargado para Apple / Outlook')}
                          className="py-2.5 px-3 rounded-xl bg-[#FFFDF9] hover:bg-[#FAF6F0] border border-[#E5D7C5] text-[#1A1A1A] font-ui text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          Apple / iCal (.ics)
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 11. GALLERY */}
                {activeTab === 'gallery' && (
                  <div className="space-y-4 text-center">
                    <div>
                      <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF6F0] border border-[#E5D7C5] flex items-center justify-center text-[#C5A059] mb-2">
                        <Image className="w-6 h-6" />
                      </div>
                      <h3 className="font-prestige text-xl text-[#1A1A1A] font-medium">
                        Galería Fotográfica & Book Previo
                      </h3>
                      <p className="font-romantic text-sm text-[#6B5E54] italic">
                        "Mostrá los mejores recuerdos de la sesión previa en alta calidad"
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5 max-w-md mx-auto">
                      {[
                        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80',
                        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80',
                        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&q=80',
                      ].map((img, i) => (
                        <div key={i} className="aspect-square rounded-xl overflow-hidden border border-[#E5D7C5] shadow-xs group relative">
                          <img
                            src={img}
                            alt="Book de fotos"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      ))}
                    </div>

                    <p className="font-ui text-xs text-[#6B5E54]">
                      Compatible con visor táctil en smartphones y zoom en alta definición.
                    </p>
                  </div>
                )}

                {/* 12. LODGING */}
                {activeTab === 'lodging' && (
                  <div className="space-y-4">
                    <div className="text-center mb-3">
                      <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF6F0] border border-[#E5D7C5] flex items-center justify-center text-[#C5A059] mb-2">
                        <BedDouble className="w-6 h-6" />
                      </div>
                      <h3 className="font-prestige text-xl text-[#1A1A1A] font-medium">
                        Hospedaje & Guía para Invitados Foráneos
                      </h3>
                      <p className="font-romantic text-sm text-[#6B5E54] italic">
                        "La mejor atención para quienes viajan a acompañarte"
                      </p>
                    </div>

                    <div className="max-w-md mx-auto space-y-2.5">
                      <div className="p-3 bg-[#FAF6F0] border border-[#E5D7C5] rounded-xl flex items-center justify-between">
                        <div>
                          <p className="font-ui text-xs font-bold text-[#1A1A1A]">Hotel Sheraton Pilar & Spa</p>
                          <p className="font-ui text-[11px] text-[#6B5E54]">A 10 min del salón • 15% desc. con código CECIYARIEL</p>
                        </div>
                        <span className="text-[10px] bg-[#FFFDF9] border border-[#C5A059] text-[#C5A059] px-2 py-0.5 rounded-full font-medium">
                          Descuento
                        </span>
                      </div>

                      <div className="p-3 bg-[#FAF6F0] border border-[#E5D7C5] rounded-xl flex items-center justify-between">
                        <div>
                          <p className="font-ui text-xs font-bold text-[#1A1A1A]">Peluquería & Makeup Studio</p>
                          <p className="font-ui text-[11px] text-[#6B5E54]">Servicio en habitación o en salón para invitadas</p>
                        </div>
                        <span className="text-[10px] bg-[#FFFDF9] border border-[#E5D7C5] text-[#6B5E54] px-2 py-0.5 rounded-full">
                          Servicio
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sandbox Footer Action */}
              <div className="pt-4 border-t border-[#E5D7C5] flex flex-wrap items-center justify-between gap-3 relative z-10">
                <span className="font-ui text-xs text-[#6B5E54]">
                  Precio de la invitación completa: <strong className="text-[#1A1A1A] font-semibold">$60.000 ARS</strong> (≈ $50 USD · $990 MXN)
                </span>
                <a
                  href="#personalizador"
                  className="font-ui text-xs uppercase tracking-wider text-[#C5A059] hover:text-[#1A1A1A] font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  Personalizar la mía ahora
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
