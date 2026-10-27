import React, { useState } from 'react';
import { ExternalLink, X, Smartphone, Globe, ArrowUpRight, Sparkles, Play, Pause, Compass, ArrowRight, Heart, Camera } from 'lucide-react';
import { RealSampleItem } from '../data/realSamples';
import { playInvitationOpenChime } from '../utils/audioSynth';
import { InvitationCardFace } from './InvitationCardFace';
import { ThumbnailUploadModal } from './ThumbnailUploadModal';

interface RealSampleViewerModalProps {
  sample: RealSampleItem;
  onClose: () => void;
  onSelectToCustomize: (sample: RealSampleItem) => void;
}

export const RealSampleViewerModal: React.FC<RealSampleViewerModalProps> = ({
  sample,
  onClose,
  onSelectToCustomize,
}) => {
  const [iframeError, setIframeError] = useState(false);
  const [viewMode, setViewMode] = useState<'replica' | 'recorrido' | 'web'>('replica');
  const [isRecorridoPlaying, setIsRecorridoPlaying] = useState<boolean>(true);
  const [isThumbnailModalOpen, setIsThumbnailModalOpen] = useState<boolean>(false);

  const handleEnterWeb = () => {
    playInvitationOpenChime();
    setViewMode('web');
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 overflow-y-auto">
        <div className="relative w-full max-w-4xl rounded-3xl bg-[#1C1A19] text-stone-100 shadow-2xl border border-stone-700/80 overflow-hidden my-auto flex flex-col max-h-[92vh]">
          {/* Top Browser Bar */}
          <div className="flex items-center justify-between border-b border-stone-800 bg-[#161413] px-4 sm:px-6 py-3.5">
            <div className="flex items-center gap-3 min-w-0">
              <span className="font-prestige font-bold text-[#FAF6F0] text-sm sm:text-base tracking-widest shrink-0">
                LIORAH STUDIO
              </span>
              <span className="text-[#C5A059] text-xs">♥</span>
              {/* View Mode Switcher in Modal Header */}
              <div className="hidden sm:flex items-center gap-1 rounded-xl bg-stone-900 p-1 border border-stone-700/60 font-ui text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('replica')}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                    viewMode === 'replica' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-300 hover:text-white'
                  }`}
                >
                  📱 Réplica Digital
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('recorrido');
                    setIsRecorridoPlaying(true);
                  }}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                    viewMode === 'recorrido' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-300 hover:text-white'
                  }`}
                >
                  🎬 Recorrido Animado
                </button>
                <button
                  type="button"
                  onClick={handleEnterWeb}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                    viewMode === 'web' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-300 hover:text-white'
                  }`}
                >
                  🌐 Web en Vivo
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsThumbnailModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-600 px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer"
                title="Subir o cambiar la foto de miniatura de esta invitación"
              >
                <Camera className="h-3.5 w-3.5 text-amber-400" />
                <span className="hidden sm:inline">Cambiar Foto</span>
              </button>

              <a
                href={sample.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap"
              >
                <span>Abrir Web</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-1.5 text-stone-400 hover:bg-stone-800 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>


        {/* Main Viewer Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#252220] flex flex-col items-center">
          {/* Mobile Tab Switcher */}
          <div className="sm:hidden mb-3 flex items-center gap-1 rounded-xl bg-stone-900 p-1 border border-stone-700/60 font-ui text-xs">
            <button
              type="button"
              onClick={() => setViewMode('replica')}
              className={`rounded-lg px-2.5 py-1 font-semibold transition-colors ${
                viewMode === 'replica' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-300'
              }`}
            >
              Réplica
            </button>
            <button
              type="button"
              onClick={() => {
                setViewMode('recorrido');
                setIsRecorridoPlaying(true);
              }}
              className={`rounded-lg px-2.5 py-1 font-semibold transition-colors ${
                viewMode === 'recorrido' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-300'
              }`}
            >
              Recorrido
            </button>
            <button
              type="button"
              onClick={handleEnterWeb}
              className={`rounded-lg px-2.5 py-1 font-semibold transition-colors ${
                viewMode === 'web' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-300'
              }`}
            >
              Web
            </button>
          </div>

          {/* Smartphone Frame */}
          <div className="relative w-full max-w-[390px] rounded-[44px] bg-[#0E0D0D] p-3 shadow-2xl ring-1 ring-white/10 my-auto">
            {/* Dynamic Island Notch */}
            <div className="absolute top-4 left-1/2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-slate-900" />
            </div>

            {/* Viewport Screen */}
            <div className="relative h-[560px] sm:h-[620px] w-full overflow-hidden rounded-[34px] bg-white text-stone-900">
              {/* VIEW 1: RÉPLICA EXACTA DE LA INVITACIÓN WEB */}
              {viewMode === 'replica' && (
                <div className="relative h-full w-full flex flex-col justify-between overflow-hidden bg-white select-none">
                  {/* Interactive scrollable container displaying the genuine digital web invitation */}
                  <div className="h-full w-full overflow-y-auto overflow-x-hidden">
                    <InvitationCardFace sample={sample} />
                  </div>

                  {/* Floating bottom action bar */}
                  <div className="absolute bottom-0 inset-x-0 z-20 p-4 bg-gradient-to-t from-black/90 via-black/70 to-transparent space-y-2">
                    <button
                      type="button"
                      onClick={handleEnterWeb}
                      className="w-full rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold py-3.5 px-4 text-xs tracking-wider uppercase shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer font-ui active:scale-95"
                    >
                      <Sparkles className="h-4 w-4 text-stone-950" />
                      <span>Interactuar con Web en Vivo</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setViewMode('recorrido');
                        setIsRecorridoPlaying(true);
                      }}
                      className="w-full text-center text-[11px] text-stone-300 hover:text-amber-300 transition-colors cursor-pointer py-1 font-ui flex items-center justify-center gap-1.5"
                    >
                      <Play className="h-3 w-3 fill-amber-300 text-amber-300" />
                      <span>Ver Recorrido Animado de la Invitación</span>
                    </button>
                  </div>
                </div>
              )}

              {/* VIEW 2: RECORRIDO ANIMADO DE LA INVITACIÓN WEB */}
              {viewMode === 'recorrido' && (
                <div className="relative h-full w-full flex flex-col justify-between overflow-hidden bg-stone-900 text-white select-none">
                  <div className="absolute inset-0 overflow-hidden">
                    <div
                      className={`w-full ${
                        isRecorridoPlaying ? 'animate-web-invite-scroll' : ''
                      }`}
                    >
                      <InvitationCardFace sample={sample} />
                    </div>
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/85 via-transparent to-black/40" />
                  </div>

                  <div className="relative z-10 pt-8 px-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/75 backdrop-blur-md px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-amber-300 border border-amber-400/30">
                      <Compass className="h-3.5 w-3.5 animate-spin text-amber-400" />
                      <span>Recorrido de la Invitación Web</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => setIsRecorridoPlaying(!isRecorridoPlaying)}
                      className="rounded-full bg-black/75 backdrop-blur-md p-1.5 text-white hover:text-amber-300 border border-white/20 cursor-pointer shadow-md"
                    >
                      {isRecorridoPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-white" />}
                    </button>
                  </div>

                  <div className="relative z-10 px-4 my-auto text-left">
                    <div className="rounded-2xl bg-black/75 backdrop-blur-md p-3.5 border border-amber-400/30 shadow-xl space-y-1">
                      <span className="text-[9px] uppercase tracking-wider font-bold text-amber-400 block font-ui">
                        Experiencia Digital LIORAH
                      </span>
                      <h4 className="font-prestige text-base font-bold text-white leading-tight">
                        {sample.title}
                      </h4>
                      <p className="font-ui text-[11px] text-stone-300 leading-snug">
                        {sample.description}
                      </p>
                    </div>
                  </div>

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
                      onClick={() => setViewMode('replica')}
                      className="w-full text-center text-[11px] text-stone-300 hover:text-white transition-colors cursor-pointer py-1 font-ui"
                    >
                      ← Ver Réplica Digital Estática
                    </button>
                  </div>
                </div>
              )}

              {/* VIEW 3: WEB EN VIVO (IFRAME) */}
              {viewMode === 'web' && (
                <div className="relative h-full w-full">
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setViewMode('replica')}
                      className="rounded-full bg-black/75 backdrop-blur-md px-3 py-1 text-[10px] font-semibold text-[#FAF6F0] hover:bg-black hover:text-amber-300 border border-white/20 shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>← Ver Réplica Digital</span>
                    </button>
                  </div>

                  {!iframeError ? (
                    <iframe
                      src={sample.liveUrl}
                      title={sample.title}
                      className="h-full w-full border-0"
                      onError={() => setIframeError(true)}
                      allow="autoplay"
                    />
                  ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center bg-[#FAF8F5]">
                      <div className="mb-4 h-24 w-24 overflow-hidden rounded-2xl shadow-md border border-stone-200">
                        <InvitationCardFace sample={sample} isCompact />
                      </div>
                      <h4 className="font-prestige text-lg font-bold text-stone-900">{sample.title}</h4>
                      <p className="text-xs text-stone-600 mt-2 mb-4 leading-relaxed font-ui">
                        Esta invitación está optimizada para verse a pantalla completa en dispositivos móviles.
                      </p>
                      <a
                        href={sample.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-stone-800 font-ui"
                      >
                        <span>Abrir Invitación Oficial</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Quick Notice under phone */}
          <div className="mt-4 flex items-center gap-2 text-[11px] text-stone-400">
            <Smartphone className="h-3.5 w-3.5 text-amber-500" />
            <span>Vista optimizada para pantalla de smartphone interactiva</span>
          </div>
        </div>

        {/* Bottom Conversion Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-stone-800 bg-[#161413] px-6 py-4">
          <div className="text-left w-full sm:w-auto">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 block">
              ¿Te gusta este estilo para tu evento?
            </span>
            <span className="text-xs font-semibold text-white">
              Personalizamos este modelo con tus datos, fotos y música favorita.
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <a
              href={sample.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-stone-700 px-4 py-2 text-xs font-medium text-stone-300 hover:bg-stone-800 hover:text-white transition-colors cursor-pointer"
            >
              Ver en Pantalla Completa
            </a>

            <button
              type="button"
              onClick={() => onSelectToCustomize(sample)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 px-4 py-2 text-xs font-bold text-stone-950 shadow-md transition-colors cursor-pointer"
            >
              <span>Quiero un Diseño Similar</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>

      {/* Upload/Change Thumbnail Modal */}
      <ThumbnailUploadModal
        sample={sample}
        isOpen={isThumbnailModalOpen}
        onClose={() => setIsThumbnailModalOpen(false)}
      />
    </>
  );
};

