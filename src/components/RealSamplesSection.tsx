import React, { useState, useEffect } from 'react';
import {
  ExternalLink,
  Sparkles,
  Heart,
  Check,
  Eye,
  ArrowUpRight,
  Smartphone,
  Globe,
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  Compass,
  Camera,
} from 'lucide-react';
import { REAL_SAMPLES, RealSampleItem } from '../data/realSamples';
import { InvitationCardFace } from './InvitationCardFace';
import { ThumbnailUploadModal } from './ThumbnailUploadModal';
import { getCustomThumbnail } from '../utils/customThumbnails';
import { playInvitationOpenChime } from '../utils/audioSynth';

interface RealSamplesSectionProps {
  onSelectSampleToCustomize: (sample: RealSampleItem) => void;
  onOpenSampleViewer: (sample: RealSampleItem) => void;
}

export const RealSamplesSection: React.FC<RealSamplesSectionProps> = ({
  onSelectSampleToCustomize,
  onOpenSampleViewer,
}) => {
  const [selectedSampleId, setSelectedSampleId] = useState<string>(REAL_SAMPLES[0].id);
  const [filterCategory, setFilterCategory] = useState<string>('Todas');
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [stageMode, setStageMode] = useState<'replica' | 'recorrido' | 'web'>('web');
  const [isRecorridoPlaying, setIsRecorridoPlaying] = useState<boolean>(true);
  const [recorridoStep, setRecorridoStep] = useState<number>(0);
  const [customizingThumbnailSample, setCustomizingThumbnailSample] = useState<RealSampleItem | null>(null);
  const [thumbnailUpdateTick, setThumbnailUpdateTick] = useState<number>(0);

  // Re-render when a thumbnail is updated or reset
  useEffect(() => {
    const handleUpdate = () => {
      setThumbnailUpdateTick((prev) => prev + 1);
    };
    window.addEventListener('liorah-thumbnails-updated', handleUpdate);
    return () => window.removeEventListener('liorah-thumbnails-updated', handleUpdate);
  }, []);

  const activeSample = REAL_SAMPLES.find((s) => s.id === selectedSampleId) || REAL_SAMPLES[0];

  const filteredSamples = REAL_SAMPLES.filter((item) => {
    if (filterCategory === 'Todas') return true;
    if (filterCategory === 'XV Años') return item.category === 'XV Años';
    if (filterCategory === 'Bodas') return item.category === 'Bodas';
    if (filterCategory === 'Temáticas') return item.category === 'Temáticas';
    return true;
  });

  const handleSelectActive = (id: string, initialMode: 'replica' | 'recorrido' | 'web' = 'web') => {
    setSelectedSampleId(id);
    setIframeKey((prev) => prev + 1);
    setStageMode(initialMode);
    const element = document.getElementById('smartphone-stage');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleEnterWeb = () => {
    playInvitationOpenChime();
    setStageMode('web');
  };



  return (
    <section id="muestras-reales" className="py-20 md:py-28 bg-[#F5EFE6]/70 border-t border-b border-[#E5D7C5]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="gold-divider mb-3">
            <span className="text-xs text-[#C5A059]">♥</span>
          </div>
          <p className="font-ui text-xs uppercase tracking-[0.22em] text-[#C5A059] font-medium mb-2">
            Portfolio en Vivo · LIORAH STUDIO
          </p>
          <h2 className="font-prestige text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] tracking-wide">
            Galería de Muestras Reales
          </h2>
          <p className="font-romantic text-lg sm:text-xl text-[#6B5E54] italic mt-2">
            "Diseño que celebra momentos únicos"
          </p>
          <p className="font-ui text-xs sm:text-sm text-[#6B5E54] mt-3 leading-relaxed">
            Cada ejemplo muestra la invitación auténtica y personalizada con los nombres, colores y funciones interactivas creadas por LIORAH STUDIO (<strong className="text-[#1A1A1A]">$60.000 ARS</strong> · aprox. <strong className="text-[#C5A059]">$50 USD / $990 MXN</strong>). Podés probarla directamente en el smartphone o abrir el enlace oficial.
          </p>
        </div>

        {/* 1. INTERACTIVE LIVE SMARTPHONE STAGE */}
        <div className="mb-20 rounded-3xl bg-[#FFFDF9] border border-[#E5D7C5] p-6 sm:p-8 lg:p-10 shadow-lg shadow-[#C5A059]/5">
          {/* Top Quick-Selector Pills */}
          <div className="flex items-center justify-between border-b border-[#E5D7C5] pb-4 mb-8 gap-4 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-2">
              <span className="font-ui text-[11px] uppercase tracking-wider text-[#A39589] font-semibold whitespace-nowrap">
                Elegí una invitación:
              </span>
              <div className="flex items-center gap-2 overflow-x-auto">
                {REAL_SAMPLES.map((sample) => {
                  const isCurrent = sample.id === activeSample.id;
                  return (
                    <button
                      key={sample.id}
                      type="button"
                      onClick={() => handleSelectActive(sample.id)}
                      className={`rounded-2xl px-3.5 py-1.5 text-xs font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                        isCurrent
                          ? 'bg-[#1A1A1A] text-[#FAF6F0] font-semibold shadow-xs'
                          : 'bg-[#FAF6F0] text-[#6B5E54] hover:bg-[#F5EFE6] border border-[#E5D7C5]'
                      }`}
                    >
                      {isCurrent && <span className="text-[#C5A059] text-[10px]">♥</span>}
                      <span>{sample.celebrant}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setCustomizingThumbnailSample(activeSample)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 px-3 py-1.5 text-xs font-bold text-amber-900 transition-colors cursor-pointer font-ui"
                title="Subir o cambiar la foto de miniatura de esta invitación"
              >
                <Camera className="h-3.5 w-3.5 text-amber-700" />
                <span>Cambiar Foto</span>
              </button>

              <button
                type="button"
                onClick={() => setIframeKey((prev) => prev + 1)}
                className="hidden sm:flex items-center gap-1 text-[11px] text-[#6B5E54] hover:text-[#1A1A1A] font-ui transition-colors cursor-pointer shrink-0"
                title="Recargar vista previa"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reiniciar</span>
              </button>
            </div>
          </div>

          {/* Stage Grid: Left Active Details vs Right Live Smartphone */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Active Sample Story & Details (6 cols) */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="rounded-full bg-[#1A1A1A] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#FAF6F0]">
                    {activeSample.category}
                  </span>
                  <span className="rounded-full bg-[#F5EAEB] px-3 py-1 text-[10px] font-semibold text-[#C5A059] border border-[#E5D7C5] flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059]" />
                    <span>Invitación Oficial en Vivo</span>
                  </span>
                  <span className="rounded-full bg-[#FFFDF9] px-2.5 py-1 text-[10px] font-bold text-[#1A1A1A] border border-[#E5D7C5]">
                    $60.000 ARS <span className="text-[#C5A059] font-normal">(≈ $50 USD · $990 MXN)</span>
                  </span>
                </div>

                <h3 className="font-prestige text-2xl sm:text-3xl font-bold text-[#1A1A1A] tracking-wide">
                  {activeSample.title}
                </h3>

                <p className="font-romantic italic text-base text-[#6B5E54] mt-1 leading-relaxed">
                  "{activeSample.tagline}"
                </p>
              </div>

              <p className="font-ui text-xs sm:text-sm text-[#6B5E54] leading-relaxed">
                {activeSample.description}
              </p>

              {/* URL address box */}
              <div className="rounded-2xl bg-[#FAF6F0] p-3.5 border border-[#E5D7C5] font-mono text-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <Globe className="h-4 w-4 text-[#C5A059] shrink-0" />
                  <span className="truncate text-[#1A1A1A] text-[11px]">{activeSample.liveUrl}</span>
                </div>
                <a
                  href={activeSample.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-xl bg-[#1A1A1A] text-[#FAF6F0] px-3 py-1 text-[10px] font-ui font-semibold hover:bg-[#C5A059] hover:text-[#1A1A1A] transition-colors shrink-0"
                >
                  <span>Abrir Web</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              {/* Features list */}
              <div className="space-y-2 font-ui text-xs text-[#6B5E54]">
                <span className="font-semibold text-[#1A1A1A] text-[11px] uppercase tracking-wider block">
                  Funciones interactivas incluidas:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeSample.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-[#C5A059] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Palette */}
              <div className="pt-2 flex items-center gap-2 font-ui">
                <span className="text-[11px] text-[#A39589] uppercase tracking-wider">Paleta:</span>
                <div className="flex items-center gap-1.5">
                  {activeSample.paletteColors.map((color, idx) => (
                    <span
                      key={idx}
                      className="h-4 w-4 rounded-full border border-black/10 shadow-2xs"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => onSelectSampleToCustomize(activeSample)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1A1A1A] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#FAF6F0] shadow-md hover:bg-[#C5A059] hover:text-[#1A1A1A] transition-all cursor-pointer whitespace-nowrap font-ui"
                >
                  <Heart className="h-3.5 w-3.5 text-[#C5A059] fill-[#C5A059]" />
                  <span>Quiero Este Diseño para Mi Evento</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenSampleViewer(activeSample)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#E5D7C5] bg-[#FFFDF9] px-4 py-3.5 text-xs font-semibold tracking-wider text-[#1A1A1A] hover:bg-[#F5EFE6] transition-colors cursor-pointer whitespace-nowrap font-ui"
                >
                  <Smartphone className="h-4 w-4 text-[#C5A059]" />
                  <span>Ver en Pantalla Completa</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCustomizingThumbnailSample(activeSample)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-2xl border border-amber-300 bg-amber-50/80 hover:bg-amber-100 px-3.5 py-3.5 text-xs font-bold text-amber-900 transition-colors cursor-pointer whitespace-nowrap font-ui"
                  title="Subir foto propia para esta invitación"
                >
                  <Camera className="h-4 w-4 text-amber-600" />
                  <span>Subir Foto Propia</span>
                </button>
              </div>
            </div>

            {/* Right: Real Interactive Smartphone with 3 Modes: Réplica Web Fiel, Recorrido Animado, and Web Interactiva (6 cols) */}
            <div id="smartphone-stage" className="lg:col-span-6 flex flex-col items-center">
              {/* Mode Selector Tabs */}
              <div className="mb-4 flex items-center gap-1.5 p-1 rounded-2xl bg-[#FAF6F0] border border-[#E5D7C5] shadow-xs font-ui">
                <button
                  type="button"
                  onClick={() => setStageMode('replica')}
                  className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                    stageMode === 'replica'
                      ? 'bg-[#1A1A1A] text-[#FAF6F0] shadow-xs'
                      : 'text-[#6B5E54] hover:text-[#1A1A1A] hover:bg-[#F5EFE6]'
                  }`}
                >
                  <span>📱</span>
                  <span>Réplica Digital</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStageMode('recorrido');
                    setIsRecorridoPlaying(true);
                  }}
                  className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                    stageMode === 'recorrido'
                      ? 'bg-[#1A1A1A] text-[#FAF6F0] shadow-xs'
                      : 'text-[#6B5E54] hover:text-[#1A1A1A] hover:bg-[#F5EFE6]'
                  }`}
                >
                  <span>🎬</span>
                  <span>Recorrido Animado</span>
                </button>

                <button
                  type="button"
                  onClick={handleEnterWeb}
                  className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                    stageMode === 'web'
                      ? 'bg-[#C5A059] text-[#1A1A1A] shadow-xs font-bold'
                      : 'text-[#6B5E54] hover:text-[#1A1A1A] hover:bg-[#F5EFE6]'
                  }`}
                >
                  <span>🌐</span>
                  <span>Web en Vivo</span>
                </button>
              </div>

              {/* Smartphone Frame */}
              <div className="relative w-full max-w-[360px] rounded-[44px] bg-[#1A1A1A] p-3 shadow-2xl shadow-stone-900/30 ring-1 ring-[#C5A059]/40">
                {/* Dynamic Island Notch */}
                <div className="absolute top-5 left-1/2 z-30 h-5 w-24 -translate-x-1/2 rounded-full bg-black flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-slate-900 ring-1 ring-slate-800" />
                </div>

                {/* Viewport Screen */}
                <div className="relative h-[600px] w-full overflow-hidden rounded-[34px] bg-[#FAF6F0] text-stone-900">
                  {/* MODE 1: RÉPLICA EXACTA DE LA INVITACIÓN WEB */}
                  {stageMode === 'replica' && (
                    <div className="relative h-full w-full flex flex-col justify-between overflow-hidden bg-white select-none">
                      {/* Floating button to change photo directly on the phone */}
                      <div className="absolute top-8 right-3 z-20">
                        <button
                          type="button"
                          onClick={() => setCustomizingThumbnailSample(activeSample)}
                          className="rounded-full bg-black/75 backdrop-blur-md px-2.5 py-1 text-[10px] font-semibold text-amber-300 hover:bg-black hover:text-white border border-amber-400/40 shadow-md flex items-center gap-1 transition-all cursor-pointer font-ui"
                          title="Cambiar la imagen de esta invitación"
                        >
                          <Camera className="h-3 w-3" />
                          <span>Cambiar foto</span>
                        </button>
                      </div>

                      {/* Interactive scrollable container displaying the genuine digital web invitation */}
                      <div className="h-full w-full overflow-y-auto overflow-x-hidden">
                        <InvitationCardFace sample={activeSample} />
                      </div>

                      {/* Floating bottom action bar */}
                      <div className="absolute bottom-0 inset-x-0 z-20 p-4 bg-gradient-to-t from-black/90 via-black/70 to-transparent space-y-2">
                        <button
                          type="button"
                          onClick={handleEnterWeb}
                          className="w-full rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold py-3 px-4 text-xs tracking-wider uppercase shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer font-ui active:scale-95"
                        >
                          <Sparkles className="h-4 w-4 text-stone-950" />
                          <span>Interactuar con Web en Vivo</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>

                        <div className="flex items-center justify-between text-[11px] font-ui px-1">
                          <button
                            type="button"
                            onClick={() => {
                              setStageMode('recorrido');
                              setIsRecorridoPlaying(true);
                            }}
                            className="text-stone-300 hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Play className="h-3 w-3 fill-amber-300 text-amber-300" />
                            <span>Ver Recorrido Guiado</span>
                          </button>

                          <a
                            href={activeSample.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-amber-400 hover:underline flex items-center gap-1"
                          >
                            <span>Abrir en navegador</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* MODE 2: RECORRIDO ANIMADO DE LA INVITACIÓN WEB */}
                  {stageMode === 'recorrido' && (
                    <div className="relative h-full w-full flex flex-col justify-between overflow-hidden bg-stone-900 text-white select-none">
                      {/* Panning animated digital invitation preview */}
                      <div className="absolute inset-0 overflow-hidden">
                        <div
                          className={`w-full ${
                            isRecorridoPlaying ? 'animate-web-invite-scroll' : ''
                          }`}
                        >
                          <InvitationCardFace sample={activeSample} />
                        </div>
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/85 via-transparent to-black/40" />
                      </div>

                      {/* Top Header Tag & Controls */}
                      <div className="relative z-10 pt-8 px-4 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/75 backdrop-blur-md px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-amber-300 border border-amber-400/30">
                          <Compass className="h-3.5 w-3.5 animate-spin text-amber-400" />
                          <span>Recorrido de la Invitación Web</span>
                        </span>

                        <button
                          type="button"
                          onClick={() => setIsRecorridoPlaying(!isRecorridoPlaying)}
                          className="rounded-full bg-black/75 backdrop-blur-md p-1.5 text-white hover:text-amber-300 border border-white/20 cursor-pointer shadow-md"
                          title={isRecorridoPlaying ? 'Pausar recorrido' : 'Continuar recorrido'}
                        >
                          {isRecorridoPlaying ? (
                            <Pause className="h-3.5 w-3.5" />
                          ) : (
                            <Play className="h-3.5 w-3.5 fill-white" />
                          )}
                        </button>
                      </div>

                      {/* Recorrido Waypoint Highlights */}
                      <div className="relative z-10 px-4 my-auto text-left">
                        <div className="rounded-2xl bg-black/75 backdrop-blur-md p-3.5 border border-amber-400/30 shadow-xl space-y-1">
                          <span className="text-[9px] uppercase tracking-wider font-bold text-amber-400 block font-ui">
                            Punto Clave de la Invitación Web
                          </span>
                          <h4 className="font-prestige text-base font-bold text-white leading-tight">
                            {recorridoStep === 0 && '1. Portada Digital, Caligrafía & Monograma'}
                            {recorridoStep === 1 && '2. Cuenta Regresiva & Reproductor Musical'}
                            {recorridoStep === 2 && '3. Ubicación, Mapa GPS & Dress Code'}
                            {recorridoStep === 3 && '4. Mesa de Regalos & Confirmación WhatsApp'}
                          </h4>
                          <p className="font-ui text-[11px] text-stone-300 leading-snug">
                            {recorridoStep === 0 && `Diseño de autor exclusivo para ${activeSample.celebrant}.`}
                            {recorridoStep === 1 && 'Reloj que descuenta los segundos hasta el inicio de la fiesta.'}
                            {recorridoStep === 2 && 'Botones con apertura directa a Google Maps y Waze.'}
                            {recorridoStep === 3 && 'Confirmación RSVP directa al chat de WhatsApp de los anfitriones.'}
                          </p>

                          {/* Waypoint dots */}
                          <div className="flex items-center gap-1.5 pt-2">
                            {[0, 1, 2, 3].map((step) => (
                              <button
                                key={step}
                                type="button"
                                onClick={() => setRecorridoStep(step)}
                                className={`h-1.5 flex-1 rounded-full transition-all cursor-pointer ${
                                  recorridoStep === step
                                    ? 'bg-amber-400'
                                    : 'bg-white/30 hover:bg-white/60'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Action Area */}
                      <div className="relative z-10 p-4 space-y-2 bg-gradient-to-t from-black via-black/80 to-transparent">
                        <button
                          type="button"
                          onClick={handleEnterWeb}
                          className="w-full rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold py-3.5 px-4 text-xs tracking-wider uppercase shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer font-ui active:scale-95"
                        >
                          <Sparkles className="h-4 w-4 text-stone-950" />
                          <span>Ingresar a la Invitación Web en Vivo</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setStageMode('replica')}
                          className="w-full text-center text-[11px] text-stone-300 hover:text-white transition-colors cursor-pointer py-1 font-ui"
                        >
                          ← Ver Réplica Interactiva Estática
                        </button>
                      </div>
                    </div>
                  )}

                  {/* MODE 3: INVITACIÓN WEB INTERACTIVA (IFRAME) */}
                  {stageMode === 'web' && (
                    <div className="relative h-full w-full">
                      {/* Floating pill inside the screen to return to Réplica / Recorrido */}
                      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setStageMode('replica')}
                          className="rounded-full bg-black/75 backdrop-blur-md px-3 py-1 text-[10px] font-semibold text-[#FAF6F0] hover:bg-black hover:text-amber-300 border border-white/20 shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <span>← Ver Réplica Digital</span>
                        </button>
                      </div>

                      <iframe
                        key={iframeKey}
                        src={activeSample.liveUrl}
                        title={activeSample.title}
                        className="h-full w-full border-0"
                        allow="autoplay; clipboard-write"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-center text-[11px] font-ui">
                <div className="flex items-center gap-1.5 text-[#A39589]">
                  <Smartphone className="h-3.5 w-3.5 text-[#C5A059]" />
                  <span>
                    {stageMode === 'replica' && 'Réplica digital fiel de la invitación web'}
                    {stageMode === 'recorrido' && 'Recorrido animado de la invitación web'}
                    {stageMode === 'web' && 'Interactuá directamente con la pantalla web'}
                  </span>
                </div>
                <span className="text-[#E5D7C5]">·</span>
                <a
                  href={activeSample.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[#C5A059] hover:text-[#1A1A1A] font-semibold underline underline-offset-2 transition-colors cursor-pointer"
                >
                  <span>Abrir enlace oficial</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 2. COMPLETE CATALOG OF ALL SAMPLES WHERE EACH CARD SHOWS THE EXACT INVITATION */}
        <div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="font-prestige text-xl font-bold text-[#1A1A1A] tracking-wide">
                Réplicas de Invitaciones Web Interactivas ({REAL_SAMPLES.length})
              </h3>
              <p className="font-romantic italic text-xs text-[#6B5E54]">
                "Cada miniatura es una réplica exacta de la web interactiva con música, cuenta regresiva, mapas y confirmación RSVP"
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Button to open custom photo upload modal for any invitation */}
              <button
                type="button"
                onClick={() => setCustomizingThumbnailSample(activeSample)}
                className="inline-flex items-center gap-1.5 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 px-3.5 py-1.5 text-xs font-bold text-amber-900 transition-colors cursor-pointer font-ui shadow-2xs"
                title="Personalizar o subir las fotos de las miniaturas"
              >
                <Camera className="h-3.5 w-3.5 text-amber-700" />
                <span>Personalizar Miniaturas</span>
              </button>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {['Todas', 'XV Años', 'Bodas', 'Temáticas'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFilterCategory(cat)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wider transition-all cursor-pointer font-ui ${
                      filterCategory === cat
                        ? 'bg-[#1A1A1A] text-[#FAF6F0] shadow-xs'
                        : 'bg-[#FFFDF9] text-[#6B5E54] border border-[#E5D7C5] hover:border-[#C5A059]'
                    }`}
                  >
                    {cat === 'Todas' ? `Todas (${REAL_SAMPLES.length})` : cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cards Grid: Each card features an EXACT mobile web invitation replica */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSamples.map((sample) => (
              <div
                key={sample.id}
                className={`group flex flex-col justify-between rounded-3xl bg-[#FFFDF9] p-5 shadow-xs border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#C5A059]/10 ${
                  sample.id === activeSample.id
                    ? 'border-[#C5A059] ring-1 ring-[#C5A059]'
                    : 'border-[#E5D7C5] hover:border-[#C5A059]'
                }`}
              >
                <div>
                  {/* Miniature Smartphone Mockup containing the EXACT customized web invitation replica */}
                  <div className="relative aspect-[9/16] w-full max-w-[255px] mx-auto overflow-hidden rounded-[36px] bg-[#1A1A1A] p-2 mb-4 border border-[#E5D7C5] shadow-lg group-hover:border-[#C5A059] group-hover:shadow-xl transition-all">
                    {/* Dynamic Island Notch */}
                    <div className="absolute top-3.5 left-1/2 -translate-x-1/2 z-30 h-3 w-16 rounded-full bg-black flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-slate-900 ring-1 ring-slate-800" />
                    </div>

                    {/* Phone Screen Displaying the Specific Web Invitation Replica */}
                    <div className="relative h-full w-full overflow-hidden rounded-[26px] bg-white">
                      <InvitationCardFace sample={sample} />

                      {/* Hover action buttons with direct access to Web, Recorrido and Frame */}
                      <div className="absolute inset-0 bg-[#1A1A1A]/85 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3 text-center z-30">
                        <div className="mb-0.5">
                          <span className="text-[9px] uppercase tracking-wider font-bold text-amber-300 block font-ui">
                            Réplica Web Oficial
                          </span>
                          <span className="text-xs font-semibold text-white font-prestige">
                            {sample.celebrant}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            playInvitationOpenChime();
                            handleSelectActive(sample.id, 'web');
                          }}
                          className="w-full rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 py-2 px-3 text-xs font-bold text-stone-950 shadow-xl hover:from-amber-400 hover:to-amber-300 flex items-center justify-center gap-1.5 transition-all cursor-pointer font-ui active:scale-95"
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                          <span>Abrir en Smartphone</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onOpenSampleViewer(sample)}
                          className="w-full rounded-2xl bg-[#FFFDF9] py-1.5 px-3 text-xs font-semibold text-[#1A1A1A] hover:bg-[#F5EFE6] flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-[#E5D7C5] font-ui"
                        >
                          <Smartphone className="h-3.5 w-3.5 text-[#C5A059]" />
                          <span>Pantalla Completa</span>
                        </button>

                        {/* Button to upload/change thumbnail for this invitation */}
                        <button
                          type="button"
                          onClick={() => setCustomizingThumbnailSample(sample)}
                          className="w-full rounded-2xl bg-amber-400/90 hover:bg-amber-400 py-1.5 px-3 text-xs font-bold text-stone-950 flex items-center justify-center gap-1.5 transition-all cursor-pointer font-ui shadow-md"
                        >
                          <Camera className="h-3.5 w-3.5" />
                          <span>Cambiar Miniatura</span>
                        </button>

                        <a
                          href={sample.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full rounded-2xl bg-white/10 hover:bg-white/20 text-stone-200 py-1 px-3 text-[11px] font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-white/20 font-ui"
                        >
                          <ExternalLink className="h-3 w-3 text-amber-300" />
                          <span>Enlace Oficial</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="px-1 text-left">
                    <div className="flex items-center justify-between gap-2 mb-1 font-ui">
                      <span className="rounded-full bg-[#1A1A1A] px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-[#FAF6F0]">
                        {sample.category}
                      </span>
                      <span className="font-romantic italic text-[11px] text-[#C5A059] font-semibold">
                        {sample.celebrant}
                      </span>
                    </div>

                    <h4 className="font-prestige text-lg font-bold text-[#1A1A1A] group-hover:text-[#C5A059] transition-colors tracking-wide">
                      {sample.title}
                    </h4>

                    <p className="font-romantic italic text-xs text-[#6B5E54] mt-1 line-clamp-2 leading-relaxed">
                      "{sample.tagline}"
                    </p>

                    {/* Features checklist */}
                    <div className="mt-3.5 space-y-1 text-xs text-[#6B5E54] font-ui">
                      {sample.features.slice(0, 3).map((feat, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 text-[#C5A059] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Palette dots */}
                    <div className="mt-4 pt-3 border-t border-[#E5D7C5]/50 flex items-center gap-2 font-ui">
                      <span className="text-[10px] uppercase tracking-wider text-[#A39589]">Paleta:</span>
                      <div className="flex items-center gap-1.5">
                        {sample.paletteColors.map((color, idx) => (
                          <span
                            key={idx}
                            className="h-3.5 w-3.5 rounded-full border border-black/10 shadow-2xs"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-4 border-t border-[#E5D7C5] flex items-center justify-between gap-2 px-1 font-ui">
                  <div className="flex items-center gap-2">
                    <a
                      href={sample.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#6B5E54] hover:text-[#1A1A1A] transition-colors cursor-pointer py-1"
                    >
                      <ExternalLink className="h-3.5 w-3.5 text-[#C5A059]" />
                      <span>Abrir Web</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setCustomizingThumbnailSample(sample)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 hover:text-amber-950 transition-colors cursor-pointer py-0.5 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 rounded-lg px-2"
                      title="Subir foto propia para esta miniatura"
                    >
                      <Camera className="h-3 w-3 text-amber-600" />
                      <span>Cambiar Foto</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectSampleToCustomize(sample)}
                    className="inline-flex items-center gap-1.5 rounded-2xl bg-[#1A1A1A] px-3 py-2 text-xs font-semibold tracking-wider uppercase text-[#FAF6F0] hover:bg-[#C5A059] hover:text-[#1A1A1A] transition-all cursor-pointer shadow-xs whitespace-nowrap"
                  >
                    <span>Pedir como este</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload/Change Thumbnail Modal */}
      {customizingThumbnailSample && (
        <ThumbnailUploadModal
          sample={customizingThumbnailSample}
          isOpen={Boolean(customizingThumbnailSample)}
          onClose={() => setCustomizingThumbnailSample(null)}
        />
      )}
    </section>
  );
};

