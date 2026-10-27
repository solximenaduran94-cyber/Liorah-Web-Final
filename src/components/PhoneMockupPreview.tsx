import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  MapPin,
  Clock,
  Calendar,
  Gift,
  Copy,
  Check,
  Heart,
  MessageCircle,
  Sparkles,
  ExternalLink,
  Play,
  Pause,
  Compass,
  ArrowRight,
  Eye,
} from 'lucide-react';
import { InvitationDesign, DesignPreferences } from '../types';
import { toggleAmbientMusic, stopAmbientMusic, playInvitationOpenChime } from '../utils/audioSynth';

interface PhoneMockupPreviewProps {
  design: InvitationDesign;
  customPreferences?: Partial<DesignPreferences>;
  onClose?: () => void;
  showInModal?: boolean;
}

export const PhoneMockupPreview: React.FC<PhoneMockupPreviewProps> = ({
  design,
  customPreferences,
  onClose,
  showInModal = false,
}) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [copiedClabe, setCopiedClabe] = useState(false);
  const [rsvpSent, setRsvpSent] = useState(false);
  const [guestCount, setGuestCount] = useState(2);
  const [guestAttendance, setGuestAttendance] = useState<'yes' | 'no' | null>(null);
  const [guestName, setGuestName] = useState('');
  const [showRsvpModal, setShowRsvpModal] = useState(false);
  const [viewMode, setViewMode] = useState<'cover' | 'recorrido' | 'interactive'>('interactive');
  const [isRecorridoPlaying, setIsRecorridoPlaying] = useState<boolean>(true);

  const hostsNames = customPreferences?.hostsNames || design.demoData.hostsNames;
  const eventDate = customPreferences?.eventDate || design.demoData.dateFormatted;
  const eventTime = customPreferences?.eventTime || design.demoData.ceremonyTime;
  const ceremonyVenue = customPreferences?.ceremonyVenue || design.demoData.ceremonyVenue;
  const ceremonyAddress = customPreferences?.ceremonyAddress || design.demoData.ceremonyAddress;
  const receptionVenue = customPreferences?.receptionVenue || design.demoData.receptionVenue;
  const receptionAddress = customPreferences?.receptionAddress || design.demoData.receptionAddress;
  const dressCode = customPreferences?.dressCode || design.demoData.dressCode;
  const musicTitle = customPreferences?.musicChoice || design.demoData.musicTitle;


  const features = customPreferences?.enabledFeatures || {
    rsvpWhatsApp: true,
    googleMaps: true,
    countdown: true,
    backgroundMusic: true,
    giftRegistryClabe: Boolean(design.demoData.clabeNumber),
    photoGallery: true,
    itineraryTimeline: true,
    dressCodeGuide: true,
  };

  const [timeLeft, setTimeLeft] = useState({ days: 18, hours: 6, minutes: 24, seconds: 40 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleMusic = () => {
    const active = toggleAmbientMusic();
    setIsPlayingMusic(active);
  };

  useEffect(() => {
    return () => {
      stopAmbientMusic();
    };
  }, []);

  const handleCopyClabe = (clabe: string) => {
    navigator.clipboard?.writeText(clabe);
    setCopiedClabe(true);
    setTimeout(() => setCopiedClabe(false), 2500);
  };

  const handleSendRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSent(true);
    setTimeout(() => {
      setShowRsvpModal(false);
      setRsvpSent(false);
    }, 2000);
  };

  const handleEnterInvitation = () => {
    playInvitationOpenChime();
    if (features.backgroundMusic && !isPlayingMusic) {
      const active = toggleAmbientMusic();
      setIsPlayingMusic(active);
    }
    setViewMode('interactive');
  };

  return (
    <div className="relative mx-auto w-full max-w-[340px] select-none font-ui">
      {/* Smartphone Outer Casing with fine luxury bezel */}
      <div className="relative rounded-[48px] bg-[#1A1A1A] p-3 shadow-2xl shadow-stone-900/30 ring-1 ring-[#C5A059]/40">
        {/* Dynamic Island */}
        <div className="absolute top-5 left-1/2 z-30 h-5 w-24 -translate-x-1/2 rounded-full bg-black flex items-center justify-between px-2">
          <div className="h-2.5 w-2.5 rounded-full bg-slate-900 ring-1 ring-slate-800" />
          <div className="h-2 w-2 rounded-full bg-[#1A3B22]/70" />
        </div>

        {/* Smartphone Screen Viewport */}
        <div className="relative h-[640px] overflow-y-auto rounded-[38px] bg-[#FAF6F0] text-[#1A1A1A] scroll-smooth">
          {/* Top Status Bar with View Mode Toggle */}
          <div className="sticky top-0 z-20 flex items-center justify-between bg-[#FAF6F0]/90 px-5 pt-3 pb-2 backdrop-blur-md text-[11px] font-medium text-[#6B5E54]">
            {/* Quick View Mode Toggle */}
            <div className="flex items-center gap-1 font-ui">
              <button
                type="button"
                onClick={() => setViewMode(viewMode === 'interactive' ? 'cover' : 'interactive')}
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold transition-colors cursor-pointer border ${
                  viewMode !== 'interactive'
                    ? 'bg-[#1A1A1A] text-[#FAF6F0] border-[#1A1A1A]'
                    : 'bg-[#F5EFE6] text-[#6B5E54] border-[#E5D7C5] hover:border-[#C5A059]'
                }`}
              >
                {viewMode !== 'interactive' ? '📱 Modo Interactivo' : '🖼️ Portada / Sobre'}
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              {features.backgroundMusic && (
                <button
                  type="button"
                  onClick={handleToggleMusic}
                  className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] transition-all cursor-pointer ${
                    isPlayingMusic
                      ? 'bg-[#F5EAEB] text-[#C5A059] font-semibold border border-[#C5A059]/40'
                      : 'bg-[#F5EFE6] text-[#6B5E54] hover:bg-[#E5D7C5]'
                  }`}
                  title="Reproducir música de la invitación"
                >
                  {isPlayingMusic ? (
                    <>
                      <Volume2 className="h-3 w-3 animate-pulse text-[#C5A059]" />
                      <span>Música ON</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="h-3 w-3" />
                      <span>Música OFF</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* VIEW A: PANTALLA PREVIA A INGRESAR (PORTADA DIGITAL & SOBRE VIRTUAL) */}
          {viewMode !== 'interactive' ? (
            <div className="relative h-[585px] w-full flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#1C1A19] via-[#2A2421] to-[#141211] text-white select-none">
              {/* Luxury Digital Background Grid with subtle gold glow */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                  className="absolute -top-20 -left-20 h-64 w-64 rounded-full blur-3xl opacity-30"
                  style={{ backgroundColor: design.paletteColors[0] || '#C5A059' }}
                />
                <div
                  className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full blur-3xl opacity-20"
                  style={{ backgroundColor: design.paletteColors[1] || '#D4AF37' }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:20px_20px] opacity-15" />
              </div>

              {/* Top Tag */}
              <div className="relative z-10 pt-4 px-5 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-amber-300 border border-amber-400/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>Sobre Digital · LIORAH</span>
                </span>
                <span className="rounded-full bg-black/50 px-2 py-0.5 text-[9px] text-stone-300 font-mono">
                  2026
                </span>
              </div>

              {/* Center Wax Seal and Inlay */}
              <div className="relative z-10 px-6 py-4 text-center my-auto">
                {/* Royal Monogram Ring */}
                <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 p-[2px] shadow-lg shadow-amber-500/20">
                  <div className="h-full w-full rounded-full bg-[#1A1A1A] flex items-center justify-center border border-amber-300/30">
                    <span className="font-prestige text-xl font-bold tracking-widest text-[#E8D8C3]">
                      {hostsNames.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="mx-auto mb-2 flex items-center justify-center gap-2 text-[#D4AF37]">
                  <span className="h-[1px] w-8 bg-[#D4AF37]/70" />
                  <Heart className="h-4 w-4 fill-[#D4AF37]" />
                  <span className="h-[1px] w-8 bg-[#D4AF37]/70" />
                </div>

                <span className="text-[11px] font-ui uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block">
                  {design.category}
                </span>
                <h3 className="font-prestige text-2xl font-bold tracking-wide text-white drop-shadow-md mt-1 leading-snug">
                  {hostsNames}
                </h3>
                <p className="font-romantic italic text-xs text-stone-200 mt-1 max-w-xs mx-auto drop-shadow-sm">
                  "{design.demoData.subtitle}"
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-black/50 backdrop-blur-md px-3 py-1 text-[11px] text-amber-200 border border-amber-400/30 font-ui">
                  <Calendar className="h-3.5 w-3.5 text-amber-400" />
                  <span>{eventDate}</span>
                </div>
              </div>

              {/* Bottom CTAs: Ingresar a la Invitación */}
              <div className="relative z-10 p-5 space-y-2.5 bg-gradient-to-t from-black via-black/80 to-transparent">
                <button
                  type="button"
                  onClick={handleEnterInvitation}
                  className="w-full rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold py-3.5 px-4 text-xs tracking-wider uppercase shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer font-ui active:scale-95"
                >
                  <Sparkles className="h-4 w-4 text-stone-950" />
                  <span>Ingresar a la Invitación Web</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <div className="flex items-center justify-between text-[11px] font-ui text-stone-300">
                  <button
                    type="button"
                    onClick={() => {
                      if (viewMode === 'recorrido') {
                        setViewMode('cover');
                      } else {
                        setViewMode('recorrido');
                        setIsRecorridoPlaying(true);
                      }
                    }}
                    className="hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Compass className="h-3.5 w-3.5 text-amber-400" />
                    <span>{viewMode === 'recorrido' ? 'Ver Frame Estático' : 'Ver Recorrido Animado'}</span>
                  </button>

                  <span className="text-stone-500">LIORAH STUDIO</span>
                </div>
              </div>
            </div>
          ) : (
            /* VIEW B: MODO INTERACTIVO COMPLETO */
            <>
              {/* Back to Cover banner */}
              <div className="bg-[#FAF6F0] px-5 pt-2 pb-0 flex items-center justify-between font-ui text-[11px]">
                <button
                  type="button"
                  onClick={() => setViewMode('cover')}
                  className="inline-flex items-center gap-1 text-[#6B5E54] hover:text-[#1A1A1A] font-medium transition-colors cursor-pointer"
                >
                  <span>← Volver al Frame / Recorrido</span>
                </button>
                <span className="text-[10px] text-[#A39589] uppercase tracking-wider">Invitación Abierta</span>
              </div>

              {/* Invitation Cover Section */}
              <div className="relative px-5 pt-3 pb-6 text-center">
                {/* Visual Header / Cover Image */}
                <div className="relative mb-5 overflow-hidden rounded-2xl border border-[#E5D7C5] shadow-xs aspect-[4/3] bg-[#FAF6F0]">
                  <img
                    src={design.image}
                    alt={design.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/70 via-transparent to-transparent flex flex-col justify-end p-4 text-white text-left">
                    <span className="text-[10px] tracking-widest uppercase text-[#D4AF37] font-semibold font-ui">
                      {design.category}
                    </span>
                    <span className="font-romantic text-xl italic tracking-wide text-white drop-shadow-sm">
                      {design.demoData.eventTitle}
                    </span>
                  </div>
                </div>

                {/* Names & Editorial Subtitle */}
            <p className="font-romantic italic text-xs text-[#6B5E54] mb-1">
              "{design.demoData.subtitle}"
            </p>
            <h2 className="font-prestige text-2xl font-bold text-[#1A1A1A] leading-tight mb-2 tracking-wide">
              {hostsNames}
            </h2>

            {/* Gold Divider with Heart */}
            <div className="my-3 flex items-center justify-center gap-2 text-[#C5A059]">
              <span className="h-[1px] w-10 bg-[#C5A059]/50" />
              <Heart className="h-3.5 w-3.5 text-[#C5A059] fill-[#C5A059]" />
              <span className="h-[1px] w-10 bg-[#C5A059]/50" />
            </div>

            {/* Date Tag */}
            <div className="inline-flex items-center gap-2 rounded-2xl bg-[#FFFDF9] px-3.5 py-1.5 shadow-2xs border border-[#E5D7C5] text-xs font-medium text-[#1A1A1A] mb-5 font-ui">
              <Calendar className="h-3.5 w-3.5 text-[#C5A059]" />
              <span>{eventDate}</span>
            </div>

            {/* Live Countdown Clock */}
            {features.countdown && (
              <div className="mb-6 rounded-2xl bg-[#F5EFE6] p-3 text-[#1A1A1A] border border-[#E5D7C5]">
                <p className="text-[10px] uppercase tracking-widest font-semibold text-[#6B5E54] mb-2 font-ui">
                  Tiempo para celebrar juntos
                </p>
                <div className="grid grid-cols-4 gap-1.5 font-mono">
                  <div className="rounded-xl bg-[#FFFDF9] p-1.5 shadow-2xs border border-[#E5D7C5]/40">
                    <span className="block text-lg font-bold text-[#1A1A1A] tabular-nums">{timeLeft.days}</span>
                    <span className="text-[9px] uppercase tracking-wider text-[#A39589]">Días</span>
                  </div>
                  <div className="rounded-xl bg-[#FFFDF9] p-1.5 shadow-2xs border border-[#E5D7C5]/40">
                    <span className="block text-lg font-bold text-[#1A1A1A] tabular-nums">{timeLeft.hours}</span>
                    <span className="text-[9px] uppercase tracking-wider text-[#A39589]">Hrs</span>
                  </div>
                  <div className="rounded-xl bg-[#FFFDF9] p-1.5 shadow-2xs border border-[#E5D7C5]/40">
                    <span className="block text-lg font-bold text-[#1A1A1A] tabular-nums">{timeLeft.minutes}</span>
                    <span className="text-[9px] uppercase tracking-wider text-[#A39589]">Min</span>
                  </div>
                  <div className="rounded-xl bg-[#FFFDF9] p-1.5 shadow-2xs border border-[#E5D7C5]/40">
                    <span className="block text-lg font-bold text-[#1A1A1A] tabular-nums">{timeLeft.seconds}</span>
                    <span className="text-[9px] uppercase tracking-wider text-[#A39589]">Seg</span>
                  </div>
                </div>
              </div>
            )}

            {/* Location Cards */}
            <div className="mb-5 space-y-3 text-left font-ui">
              <div className="rounded-2xl bg-[#FFFDF9] p-3.5 shadow-xs border border-[#E5D7C5]">
                <div className="flex items-start gap-2.5">
                  <div className="rounded-full bg-[#F5EAEB] p-2 text-[#C5A059] shrink-0 mt-0.5">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059]">Ceremonia</span>
                      <span className="text-[11px] font-medium text-[#A39589]">{eventTime}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-[#1A1A1A] mt-0.5 font-prestige">{ceremonyVenue}</h4>
                    <p className="text-[11px] text-[#6B5E54] mt-0.5 leading-snug">{ceremonyAddress}</p>
                    {features.googleMaps && (
                      <a
                        href="https://maps.google.com"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-semibold text-[#C5A059] hover:text-[#1A1A1A]"
                      >
                        <span>Cómo llegar (Google Maps)</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {receptionVenue && (
                <div className="rounded-2xl bg-[#FFFDF9] p-3.5 shadow-xs border border-[#E5D7C5]">
                  <div className="flex items-start gap-2.5">
                    <div className="rounded-full bg-[#F5EFE6] p-2 text-[#C5A059] shrink-0 mt-0.5">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B5E54]">Recepción</span>
                        <span className="text-[11px] font-medium text-[#A39589]">{design.demoData.receptionTime}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-[#1A1A1A] mt-0.5 font-prestige">{receptionVenue}</h4>
                      <p className="text-[11px] text-[#6B5E54] mt-0.5 leading-snug">{receptionAddress}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Dress Code Section */}
            {features.dressCodeGuide && (
              <div className="mb-5 rounded-2xl bg-[#FFFDF9] p-3.5 text-left shadow-xs border border-[#E5D7C5] font-ui">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A39589] block">
                  Código de Vestimenta
                </span>
                <p className="text-sm font-semibold text-[#1A1A1A] mt-0.5 font-prestige">{dressCode}</p>
                <p className="text-[11px] text-[#6B5E54] mt-1 leading-snug">
                  {design.demoData.dressCodeDetails}
                </p>
              </div>
            )}

            {/* Itinerary Timeline */}
            {features.itineraryTimeline && design.demoData.itinerary?.length > 0 && (
              <div className="mb-5 rounded-2xl bg-[#FFFDF9] p-3.5 text-left shadow-xs border border-[#E5D7C5] font-ui">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A39589] block mb-2">
                  Itinerario del Día
                </span>
                <div className="space-y-2.5">
                  {design.demoData.itinerary.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      <span className="font-mono text-[11px] font-bold text-[#C5A059] bg-[#F5EAEB] px-1.5 py-0.5 rounded shrink-0">
                        {item.time}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-[#1A1A1A]">{item.activity}</p>
                        <p className="text-[10px] text-[#6B5E54]">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gift Registry / CLABE Card */}
            {features.giftRegistryClabe && design.demoData.clabeNumber && (
              <div className="mb-5 rounded-2xl bg-[#F5EFE6] p-3.5 text-left border border-[#E5D7C5] font-ui">
                <div className="flex items-center gap-1.5 text-[#C5A059] mb-1">
                  <Gift className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">Mesa de Regalos & Alias</span>
                </div>
                <p className="text-[11px] text-[#6B5E54] mb-2 leading-relaxed">
                  {design.demoData.giftNote}
                </p>
                <div className="flex items-center justify-between rounded-xl bg-[#FFFDF9] p-2 border border-[#E5D7C5]">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[#A39589] block">
                      {design.demoData.bankName} · {design.demoData.accountHolder}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#1A1A1A]">
                      {design.demoData.clabeNumber}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyClabe(design.demoData.clabeNumber)}
                    className="flex items-center gap-1 rounded-xl bg-[#1A1A1A] px-2 py-1 text-[10px] font-medium text-[#FAF6F0] hover:bg-[#C5A059] hover:text-[#1A1A1A] transition-colors"
                  >
                    {copiedClabe ? <Check className="h-3 w-3 text-[#D4AF37]" /> : <Copy className="h-3 w-3" />}
                    <span>{copiedClabe ? '¡Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* RSVP Button CTA */}
            {features.rsvpWhatsApp && (
              <div className="sticky bottom-2 z-10 pt-2 font-ui">
                <button
                  type="button"
                  onClick={() => setShowRsvpModal(true)}
                  className="w-full rounded-2xl bg-[#1A1A1A] py-3.5 px-4 text-xs font-semibold tracking-wider uppercase text-[#FAF6F0] shadow-lg shadow-black/20 hover:bg-[#C5A059] hover:text-[#1A1A1A] transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#C5A059]/40"
                >
                  <MessageCircle className="h-4 w-4 text-[#D4AF37]" />
                  <span>Confirmar Asistencia (WhatsApp)</span>
                </button>
              </div>
            )}

            {/* Ambient Soundtrack Attribution */}
            {features.backgroundMusic && (
              <p className="mt-4 text-[10px] text-[#A39589] font-ui">
                Música: {musicTitle}
              </p>
            )}
          </div>
        </>
      )}

      {/* Interactive RSVP Simulation Drawer */}
          {showRsvpModal && (
            <div className="absolute inset-0 z-40 flex items-end bg-black/60 backdrop-blur-xs p-3 transition-opacity font-ui">
              <div className="w-full rounded-3xl bg-[#FFFDF9] p-4 text-left shadow-2xl border border-[#E5D7C5]">
                <div className="flex items-center justify-between border-b border-[#E5D7C5] pb-2 mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] font-prestige">
                    Confirmar mi Asistencia
                  </h4>
                  <button
                    type="button"
                    onClick={() => setShowRsvpModal(false)}
                    className="text-[#A39589] hover:text-[#1A1A1A] text-sm font-bold px-1"
                  >
                    ✕
                  </button>
                </div>

                {rsvpSent ? (
                  <div className="py-4 text-center">
                    <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#F5EAEB] text-[#C5A059]">
                      <Heart className="h-5 w-5 fill-[#C5A059]" />
                    </div>
                    <p className="text-xs font-bold text-[#1A1A1A]">¡Confirmación Enviada!</p>
                    <p className="text-[11px] text-[#6B5E54] mt-0.5">
                      Los anfitriones recibieron tus datos por WhatsApp.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSendRsvp} className="space-y-2.5">
                    <div>
                      <label className="text-[10px] font-semibold text-[#6B5E54] block mb-0.5">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="Ej. Familia Gómez Navarro"
                        className="w-full rounded-xl border border-[#E5D7C5] bg-[#FAF6F0] px-2.5 py-1.5 text-xs text-[#1A1A1A] focus:border-[#C5A059] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-semibold text-[#6B5E54] block mb-1">
                        ¿Asistirás a la celebración?
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setGuestAttendance('yes')}
                          className={`rounded-xl py-1.5 text-xs font-medium border text-center transition-colors ${
                            guestAttendance === 'yes'
                              ? 'bg-[#F5EAEB] border-[#C5A059] text-[#1A1A1A] font-bold'
                              : 'border-[#E5D7C5] bg-[#FAF6F0] text-[#6B5E54]'
                          }`}
                        >
                          ¡Sí, asistiré! ♥
                        </button>
                        <button
                          type="button"
                          onClick={() => setGuestAttendance('no')}
                          className={`rounded-xl py-1.5 text-xs font-medium border text-center transition-colors ${
                            guestAttendance === 'no'
                              ? 'bg-rose-50 border-rose-300 text-rose-800 font-bold'
                              : 'border-[#E5D7C5] bg-[#FAF6F0] text-[#6B5E54]'
                          }`}
                        >
                          No podré ir
                        </button>
                      </div>
                    </div>

                    {guestAttendance === 'yes' && (
                      <div>
                        <label className="text-[10px] font-semibold text-[#6B5E54] block mb-0.5">
                          Cantidad de personas
                        </label>
                        <select
                          value={guestCount}
                          onChange={(e) => setGuestCount(Number(e.target.value))}
                          className="w-full rounded-xl border border-[#E5D7C5] bg-[#FAF6F0] px-2 py-1.5 text-xs text-[#1A1A1A]"
                        >
                          <option value={1}>1 Pase (Solo yo)</option>
                          <option value={2}>2 Pases (En pareja)</option>
                          <option value={3}>3 Pases</option>
                          <option value={4}>4 Pases (Familiar)</option>
                        </select>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={!guestAttendance || !guestName}
                      className="w-full rounded-xl bg-[#1A1A1A] py-2 text-xs font-semibold uppercase tracking-wider text-[#FAF6F0] hover:bg-[#C5A059] hover:text-[#1A1A1A] disabled:opacity-50 transition-colors cursor-pointer"
                    >
                      Enviar Confirmación a WhatsApp
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {showInModal && onClose && (
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-[#1A1A1A]/80 px-5 py-2 text-xs font-medium text-[#FAF6F0] backdrop-blur-md hover:bg-[#1A1A1A] transition-colors cursor-pointer border border-[#C5A059]/40"
          >
            Cerrar Demo Interactivo
          </button>
        </div>
      )}
    </div>
  );
};
