import React, { useState } from 'react';
import {
  Palette,
  Calendar,
  Sliders,
  FileText,
  ArrowRight,
  Eye,
  CheckCircle2,
  Heart,
  Sparkles,
} from 'lucide-react';
import { InvitationDesign, DesignPreferences } from '../types';
import { INVITATION_CATALOG } from '../data/invitations';
import { PhoneMockupPreview } from './PhoneMockupPreview';

interface CustomizerSectionProps {
  selectedDesign: InvitationDesign;
  onSelectDesign: (design: InvitationDesign) => void;
  onProceedToCheckout: (preferences: DesignPreferences, design: InvitationDesign) => void;
}

const COLOR_PALETTES = [
  { id: 'gold-eucalyptus', name: 'Eucalipto & Oro Imperial', colors: ['#3A4A3F', '#C5A059', '#FAF6F0'] },
  { id: 'rose-gold', name: 'Rose Gold & Blush Chic', colors: ['#C98F86', '#F5EAEB', '#9C6E66'] },
  { id: 'boho-sage', name: 'Salvia & Avena Cálida', colors: ['#7A8A7A', '#F5EFE6', '#FAF6F0'] },
  { id: 'midnight-gold', name: 'Midnight Black & Champagne', colors: ['#1A1A1A', '#C5A059', '#E5D7C5'] },
  { id: 'pearl-white', name: 'Blanco Roto & Marfil Puro', colors: ['#FFFDF9', '#C5A059', '#FAF6F0'] },
  { id: 'burgundy-wine', name: 'Borgoña Intenso & Oro', colors: ['#5E1914', '#C5A059', '#F5EAEB'] },
];

const TYPOGRAPHY_STYLES = [
  { id: 'prestige-cinzel', name: 'Cinzel Romana & Prestigio', preview: 'Sobriedad clásica, mayúsculas y distinción' },
  { id: 'romantic-cormorant', name: 'Cormorant Garamond Romántica', preview: 'Sensible, literaria y delicadamente cursiva' },
  { id: 'modern-montserrat', name: 'Montserrat Geométrica Limpia', preview: 'Vanguardia, nitidez y elegancia minimal' },
  { id: 'script-alex-brush', name: 'Alex Brush Caligráfica de Autor', preview: 'Trazos manuscritos de caligrafía inglesa' },
];

const MUSIC_OPTIONS = [
  'Canon in D (Cuerdas Acústicas)',
  'A Thousand Years (Piano & Cello)',
  'Vals de Ensueño (Orquestal)',
  'Bossa Nova Romántica Suave',
  'Lofi Acoustic Beats Relajante',
  'Sin música de fondo (Silencioso)',
];

const DRESS_CODES = [
  'Rigurosa Etiqueta / Black Tie',
  'Formal / Traje Oscuro y Vestido Largo',
  'Cocktail Elegante',
  'Guayabera / Vestimenta de Playa',
  'Casual Chic / Colores Pastel',
  'Temático Personalizado',
];

export const CustomizerSection: React.FC<CustomizerSectionProps> = ({
  selectedDesign,
  onSelectDesign,
  onProceedToCheckout,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'style' | 'features' | 'notes'>('info');

  const [preferences, setPreferences] = useState<DesignPreferences>({
    designId: selectedDesign.id,
    designTitle: selectedDesign.title,
    eventType: selectedDesign.category,
    hostsNames: selectedDesign.demoData.hostsNames,
    eventDate: selectedDesign.demoData.dateFormatted,
    eventTime: selectedDesign.demoData.ceremonyTime,
    ceremonyVenue: selectedDesign.demoData.ceremonyVenue,
    ceremonyAddress: selectedDesign.demoData.ceremonyAddress,
    receptionVenue: selectedDesign.demoData.receptionVenue,
    receptionAddress: selectedDesign.demoData.receptionAddress,
    mapsUrl: 'https://maps.google.com',
    dressCode: selectedDesign.demoData.dressCode,
    colorScheme: 'Eucalipto & Oro Imperial',
    typographyStyle: 'Cinzel Romana & Prestigio',
    musicChoice: selectedDesign.demoData.musicTitle,
    specialNotes: '',
    enabledFeatures: {
      rsvpWhatsApp: true,
      googleMaps: true,
      countdown: true,
      backgroundMusic: true,
      giftRegistryClabe: Boolean(selectedDesign.demoData.clabeNumber),
      photoGallery: true,
      itineraryTimeline: true,
      dressCodeGuide: true,
    },
    passMode: 'single_link',
  });

  const handleDesignChange = (designId: string) => {
    const found = INVITATION_CATALOG.find((d) => d.id === designId);
    if (found) {
      onSelectDesign(found);
      setPreferences((prev) => ({
        ...prev,
        designId: found.id,
        designTitle: found.title,
        eventType: found.category,
        hostsNames: found.demoData.hostsNames,
        eventDate: found.demoData.dateFormatted,
        eventTime: found.demoData.ceremonyTime,
        ceremonyVenue: found.demoData.ceremonyVenue,
        ceremonyAddress: found.demoData.ceremonyAddress,
        receptionVenue: found.demoData.receptionVenue,
        receptionAddress: found.demoData.receptionAddress,
        dressCode: found.demoData.dressCode,
        musicChoice: found.demoData.musicTitle,
      }));
    }
  };

  const handleToggleFeature = (key: keyof typeof preferences.enabledFeatures) => {
    setPreferences((prev) => ({
      ...prev,
      enabledFeatures: {
        ...prev.enabledFeatures,
        [key]: !prev.enabledFeatures[key],
      },
    }));
  };

  return (
    <section id="personalizador" className="py-20 md:py-28 bg-[#FAF6F0] border-t border-b border-[#E5D7C5]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="gold-divider mb-3">
            <span className="text-xs text-[#C5A059]">♥</span>
          </div>
          <p className="font-ui text-xs uppercase tracking-[0.22em] text-[#C5A059] font-medium mb-2">
            A Tu Medida
          </p>
          <h2 className="font-prestige text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] tracking-wide">
            Personalizá tu Invitación
          </h2>
          <p className="font-romantic text-lg sm:text-xl text-[#6B5E54] italic mt-2">
            "Cada historia merece ser contada con delicadeza"
          </p>
          <p className="font-ui text-xs sm:text-sm text-[#6B5E54] mt-3 leading-relaxed">
            Ingresá los datos de tu evento y mirá cómo cobra vida en el smartphone en tiempo real. Cuidamos cada detalle tipográfico y estético con dedicación artesanal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 rounded-3xl bg-[#FFFDF9] p-6 md:p-8 shadow-xs border border-[#E5D7C5]">
            {/* Step navigation tabs */}
            <div className="flex border-b border-[#E5D7C5] pb-3 gap-2 overflow-x-auto text-xs font-medium scrollbar-none mb-6">
              <button
                type="button"
                onClick={() => setActiveTab('info')}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl transition-all whitespace-nowrap cursor-pointer font-ui text-xs ${
                  activeTab === 'info'
                    ? 'bg-[#1A1A1A] text-[#FAF6F0] font-semibold shadow-xs'
                    : 'text-[#6B5E54] hover:text-[#1A1A1A] hover:bg-[#F5EFE6]'
                }`}
              >
                <Calendar className="h-3.5 w-3.5 text-[#C5A059]" />
                <span>1. Datos del Evento</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('style')}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl transition-all whitespace-nowrap cursor-pointer font-ui text-xs ${
                  activeTab === 'style'
                    ? 'bg-[#1A1A1A] text-[#FAF6F0] font-semibold shadow-xs'
                    : 'text-[#6B5E54] hover:text-[#1A1A1A] hover:bg-[#F5EFE6]'
                }`}
              >
                <Palette className="h-3.5 w-3.5 text-[#C5A059]" />
                <span>2. Estilo & Tonos</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('features')}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl transition-all whitespace-nowrap cursor-pointer font-ui text-xs ${
                  activeTab === 'features'
                    ? 'bg-[#1A1A1A] text-[#FAF6F0] font-semibold shadow-xs'
                    : 'text-[#6B5E54] hover:text-[#1A1A1A] hover:bg-[#F5EFE6]'
                }`}
              >
                <Sliders className="h-3.5 w-3.5 text-[#C5A059]" />
                <span>3. Funciones Interactivas</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('notes')}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl transition-all whitespace-nowrap cursor-pointer font-ui text-xs ${
                  activeTab === 'notes'
                    ? 'bg-[#1A1A1A] text-[#FAF6F0] font-semibold shadow-xs'
                    : 'text-[#6B5E54] hover:text-[#1A1A1A] hover:bg-[#F5EFE6]'
                }`}
              >
                <FileText className="h-3.5 w-3.5 text-[#C5A059]" />
                <span>4. Notas Especiales</span>
              </button>
            </div>

            {/* TAB 1: EVENT INFO */}
            {activeTab === 'info' && (
              <div className="space-y-4 font-ui">
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#6B5E54] block mb-1.5">
                    Plantilla Base Seleccionada
                  </label>
                  <select
                    value={preferences.designId}
                    onChange={(e) => handleDesignChange(e.target.value)}
                    className="w-full rounded-2xl border border-[#E5D7C5] bg-[#FAF6F0] px-4 py-2.5 text-xs text-[#1A1A1A] focus:border-[#C5A059] focus:bg-white focus:outline-hidden"
                  >
                    {INVITATION_CATALOG.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.title} — ({item.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#6B5E54] block mb-1">
                    Nombres de Festejados o Anfitriones
                  </label>
                  <input
                    type="text"
                    value={preferences.hostsNames}
                    onChange={(e) => setPreferences({ ...preferences, hostsNames: e.target.value })}
                    placeholder="Ej. Sofía & Alejandro / Valeria Montserrat"
                    className="w-full rounded-2xl border border-[#E5D7C5] bg-[#FAF6F0] px-4 py-2.5 text-xs text-[#1A1A1A] focus:border-[#C5A059] focus:bg-white focus:outline-hidden"
                  />
                  <p className="mt-1 text-[11px] text-[#A39589]">
                    Aparecerá en el encabezado principal con tipografía de prestigio.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#6B5E54] block mb-1">
                      Fecha de la Celebración
                    </label>
                    <input
                      type="text"
                      value={preferences.eventDate}
                      onChange={(e) => setPreferences({ ...preferences, eventDate: e.target.value })}
                      placeholder="Ej. Sábado, 14 de Noviembre de 2026"
                      className="w-full rounded-2xl border border-[#E5D7C5] bg-[#FAF6F0] px-4 py-2.5 text-xs text-[#1A1A1A] focus:border-[#C5A059] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#6B5E54] block mb-1">
                      Horario
                    </label>
                    <input
                      type="text"
                      value={preferences.eventTime}
                      onChange={(e) => setPreferences({ ...preferences, eventTime: e.target.value })}
                      placeholder="Ej. 17:00 HRS"
                      className="w-full rounded-2xl border border-[#E5D7C5] bg-[#FAF6F0] px-4 py-2.5 text-xs text-[#1A1A1A] focus:border-[#C5A059] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#6B5E54] block mb-1">
                      Lugar de Ceremonia o Iglesia
                    </label>
                    <input
                      type="text"
                      value={preferences.ceremonyVenue}
                      onChange={(e) => setPreferences({ ...preferences, ceremonyVenue: e.target.value })}
                      placeholder="Parroquia o Templo"
                      className="w-full rounded-2xl border border-[#E5D7C5] bg-[#FAF6F0] px-4 py-2.5 text-xs text-[#1A1A1A] focus:border-[#C5A059] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#6B5E54] block mb-1">
                      Dirección de Ceremonia
                    </label>
                    <input
                      type="text"
                      value={preferences.ceremonyAddress}
                      onChange={(e) => setPreferences({ ...preferences, ceremonyAddress: e.target.value })}
                      placeholder="Calle, número, ciudad"
                      className="w-full rounded-2xl border border-[#E5D7C5] bg-[#FAF6F0] px-4 py-2.5 text-xs text-[#1A1A1A] focus:border-[#C5A059] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#6B5E54] block mb-1">
                      Lugar de Fiesta o Salón
                    </label>
                    <input
                      type="text"
                      value={preferences.receptionVenue}
                      onChange={(e) => setPreferences({ ...preferences, receptionVenue: e.target.value })}
                      placeholder="Hacienda, Salón o Quinta"
                      className="w-full rounded-2xl border border-[#E5D7C5] bg-[#FAF6F0] px-4 py-2.5 text-xs text-[#1A1A1A] focus:border-[#C5A059] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#6B5E54] block mb-1">
                      Dirección del Salón
                    </label>
                    <input
                      type="text"
                      value={preferences.receptionAddress}
                      onChange={(e) => setPreferences({ ...preferences, receptionAddress: e.target.value })}
                      placeholder="Ubicación de la recepción"
                      className="w-full rounded-2xl border border-[#E5D7C5] bg-[#FAF6F0] px-4 py-2.5 text-xs text-[#1A1A1A] focus:border-[#C5A059] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#6B5E54] block mb-1.5">
                    Código de Vestimenta (Dress Code)
                  </label>
                  <select
                    value={preferences.dressCode}
                    onChange={(e) => setPreferences({ ...preferences, dressCode: e.target.value })}
                    className="w-full rounded-2xl border border-[#E5D7C5] bg-[#FAF6F0] px-4 py-2.5 text-xs text-[#1A1A1A] focus:border-[#C5A059]"
                  >
                    {DRESS_CODES.map((code) => (
                      <option key={code} value={code}>
                        {code}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* TAB 2: AESTHETICS & STYLE */}
            {activeTab === 'style' && (
              <div className="space-y-6 font-ui">
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#6B5E54] block mb-2.5">
                    Paleta Cromática Warm Luxury
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {COLOR_PALETTES.map((pal) => (
                      <button
                        key={pal.id}
                        type="button"
                        onClick={() => setPreferences({ ...preferences, colorScheme: pal.name })}
                        className={`flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                          preferences.colorScheme === pal.name
                            ? 'border-[#C5A059] bg-[#FAF6F0] ring-1 ring-[#C5A059]'
                            : 'border-[#E5D7C5] hover:border-[#C5A059] bg-[#FFFDF9]'
                        }`}
                      >
                        <p className="text-xs font-semibold text-[#1A1A1A]">{pal.name}</p>
                        <div className="flex items-center gap-1.5">
                          {pal.colors.map((c, idx) => (
                            <span
                              key={idx}
                              className="h-3.5 w-3.5 rounded-full border border-black/10 shadow-2xs"
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#6B5E54] block mb-2.5">
                    Tratamiento Tipográfico de Autor
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {TYPOGRAPHY_STYLES.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setPreferences({ ...preferences, typographyStyle: t.name })}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                          preferences.typographyStyle === t.name
                            ? 'border-[#C5A059] bg-[#FAF6F0] ring-1 ring-[#C5A059]'
                            : 'border-[#E5D7C5] hover:border-[#C5A059] bg-[#FFFDF9]'
                        }`}
                      >
                        <p className="text-xs font-bold text-[#1A1A1A]">{t.name}</p>
                        <p className="text-[11px] text-[#6B5E54] mt-0.5">{t.preview}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#6B5E54] block mb-2">
                    Música de Fondo Ambient
                  </label>
                  <select
                    value={preferences.musicChoice}
                    onChange={(e) => setPreferences({ ...preferences, musicChoice: e.target.value })}
                    className="w-full rounded-2xl border border-[#E5D7C5] bg-[#FAF6F0] px-4 py-2.5 text-xs text-[#1A1A1A]"
                  >
                    {MUSIC_OPTIONS.map((track) => (
                      <option key={track} value={track}>
                        🎵 {track}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* TAB 3: FEATURES */}
            {activeTab === 'features' && (
              <div className="space-y-4 font-ui">
                <p className="text-xs text-[#6B5E54]">
                  Elegí las funciones interactivas que querés activar en tu invitación digital:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => handleToggleFeature('rsvpWhatsApp')}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      preferences.enabledFeatures.rsvpWhatsApp
                        ? 'bg-[#F5EFE6] border-[#C5A059]'
                        : 'bg-[#FFFDF9] border-[#E5D7C5] opacity-60'
                    }`}
                  >
                    <CheckCircle2
                      className={`h-5 w-5 shrink-0 mt-0.5 ${
                        preferences.enabledFeatures.rsvpWhatsApp ? 'text-[#C5A059]' : 'text-stone-300'
                      }`}
                    />
                    <div>
                      <p className="text-xs font-bold text-[#1A1A1A]">Confirmación WhatsApp (RSVP)</p>
                      <p className="text-[11px] text-[#6B5E54] mt-0.5">
                        Tus invitados confirman directo a tu WhatsApp con nombres y pases.
                      </p>
                    </div>
                  </div>

                  <div
                    onClick={() => handleToggleFeature('countdown')}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      preferences.enabledFeatures.countdown
                        ? 'bg-[#F5EFE6] border-[#C5A059]'
                        : 'bg-[#FFFDF9] border-[#E5D7C5] opacity-60'
                    }`}
                  >
                    <CheckCircle2
                      className={`h-5 w-5 shrink-0 mt-0.5 ${
                        preferences.enabledFeatures.countdown ? 'text-[#C5A059]' : 'text-stone-300'
                      }`}
                    />
                    <div>
                      <p className="text-xs font-bold text-[#1A1A1A]">Cuenta Regresiva en Vivo</p>
                      <p className="text-[11px] text-[#6B5E54] mt-0.5">
                        Reloj animado con días, horas y minutos para el gran evento.
                      </p>
                    </div>
                  </div>

                  <div
                    onClick={() => handleToggleFeature('googleMaps')}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      preferences.enabledFeatures.googleMaps
                        ? 'bg-[#F5EFE6] border-[#C5A059]'
                        : 'bg-[#FFFDF9] border-[#E5D7C5] opacity-60'
                    }`}
                  >
                    <CheckCircle2
                      className={`h-5 w-5 shrink-0 mt-0.5 ${
                        preferences.enabledFeatures.googleMaps ? 'text-[#C5A059]' : 'text-stone-300'
                      }`}
                    />
                    <div>
                      <p className="text-xs font-bold text-[#1A1A1A]">Botón GPS (Google Maps & Waze)</p>
                      <p className="text-[11px] text-[#6B5E54] mt-0.5">
                        Llega al salón o parroquia con un solo toque desde el teléfono.
                      </p>
                    </div>
                  </div>

                  <div
                    onClick={() => handleToggleFeature('giftRegistryClabe')}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      preferences.enabledFeatures.giftRegistryClabe
                        ? 'bg-[#F5EFE6] border-[#C5A059]'
                        : 'bg-[#FFFDF9] border-[#E5D7C5] opacity-60'
                    }`}
                  >
                    <CheckCircle2
                      className={`h-5 w-5 shrink-0 mt-0.5 ${
                        preferences.enabledFeatures.giftRegistryClabe ? 'text-[#C5A059]' : 'text-stone-300'
                      }`}
                    />
                    <div>
                      <p className="text-xs font-bold text-[#1A1A1A]">Mesa de Regalos & Alias / CBU</p>
                      <p className="text-[11px] text-[#6B5E54] mt-0.5">
                        Datos bancarios con botón de copiado en un clic para tus invitados.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: SPECIAL NOTES */}
            {activeTab === 'notes' && (
              <div className="space-y-4 font-ui">
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#6B5E54] block mb-1">
                    Dedicatorias, Frases o Peticiones para la Diseñadora
                  </label>
                  <textarea
                    rows={5}
                    value={preferences.specialNotes}
                    onChange={(e) => setPreferences({ ...preferences, specialNotes: e.target.value })}
                    placeholder="Contanos cualquier detalle que sueñes para tu invitación:
- Frase emotiva, cita literaria o versículo
- Canción específica que querés que usemos
- Indicación sobre 'Solo adultos / No niños'
- Ajustes de colores o monograma familiar"
                    className="w-full rounded-2xl border border-[#E5D7C5] bg-[#FAF6F0] p-4 text-xs text-[#1A1A1A] focus:border-[#C5A059] focus:outline-hidden"
                  />
                  <p className="mt-1 text-[11px] text-[#A39589]">
                    Jimena y el equipo de LIORAH STUDIO revisarán cada una de tus notas para crear tu pieza soñada.
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F5EAEB] p-4 border border-[#E5D7C5] text-xs text-[#6B5E54]">
                  <p className="font-semibold text-[#1A1A1A] mb-1 flex items-center gap-1.5">
                    <Heart className="h-3.5 w-3.5 text-[#C5A059] fill-[#C5A059]" />
                    <span>Compromiso de Amor & Dedicación LIORAH</span>
                  </p>
                  <p className="leading-relaxed">
                    Incluye rondas de ajustes ilimitadas en textos, horarios y canciones hasta que quedes 100% enamorada de tu invitación.
                  </p>
                </div>
              </div>
            )}

            {/* Bottom Actions Bar */}
            <div className="mt-8 pt-6 border-t border-[#E5D7C5] flex flex-col sm:flex-row items-center justify-between gap-4 font-ui">
              <div className="text-left w-full sm:w-auto">
                <span className="text-[11px] text-[#A39589] block">Invitación Web Personalizada:</span>
                <div className="flex flex-wrap items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-bold text-[#1A1A1A]">
                    $60.000 ARS
                  </span>
                  <span className="font-ui text-xs font-semibold text-[#C5A059] bg-[#F5EAEB] px-2.5 py-0.5 rounded-full border border-[#E5D7C5]">
                    ≈ $50 USD · $990 MXN
                  </span>
                  <span className="font-romantic italic text-xs text-[#6B5E54]">
                    100% personalizada
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onProceedToCheckout(preferences, selectedDesign)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1A1A1A] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#FAF6F0] shadow-md hover:bg-[#C5A059] hover:text-[#1A1A1A] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Continuar al Pedido</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Live Smartphone Interactive Preview Column */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6B5E54] font-ui">
              <Eye className="h-4 w-4 text-[#C5A059]" />
              <span>Vista Previa en Smartphone</span>
            </div>
            <p className="font-romantic italic text-xs text-[#6B5E54] text-center mb-4 max-w-xs">
              "Tus invitados sentirán la emoción desde el momento en que abran el enlace"
            </p>

            <PhoneMockupPreview design={selectedDesign} customPreferences={preferences} />
          </div>
        </div>
      </div>
    </section>
  );
};
