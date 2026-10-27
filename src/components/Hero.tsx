import React from 'react';
import { Sparkles, Heart, Smartphone, ArrowDown, Play, Check } from 'lucide-react';
import { HERO_IMAGE } from '../data/invitations';

interface HeroProps {
  onExploreGallery: () => void;
  onOpenHeroDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreGallery, onOpenHeroDemo }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:py-28 bg-[#FAF6F0]">
      {/* Background radial warm luxury glow */}
      <div className="absolute -top-32 right-10 h-96 w-96 rounded-full blush-glow pointer-events-none" />
      <div className="absolute top-1/2 left-0 h-96 w-96 rounded-full gold-glow pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Brand Story & Emotional Value (7 cols) */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* Lema secundario y precio oficial */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#FFFDF9] px-4 py-1.5 border border-[#E5D7C5] shadow-xs">
                <span className="text-xs text-[#C5A059]">♥</span>
                <span className="font-ui text-[11px] uppercase tracking-[0.2em] font-medium text-[#6B5E54]">
                  Diseños 100% personalizados • Rápido y con amor
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FFFDF9] px-3.5 py-1.5 border border-[#D4AF37]/50 shadow-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059]" />
                <span className="font-ui text-[11px] font-semibold tracking-wide text-[#1A1A1A]">
                  Invitación Web · $60.000 ARS <span className="text-[#C5A059] font-normal">(≈ $50 USD · $990 MXN)</span>
                </span>
              </div>
            </div>

            {/* Tagline Principal */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="h-[1px] w-8 bg-[#C5A059]" />
                <span className="font-romantic italic text-base sm:text-lg text-[#C5A059]">
                  Papelería digital de alta gama
                </span>
              </div>
              <h1 className="font-prestige text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1A1A1A] tracking-wide leading-[1.14] text-balance">
                Diseño que celebra momentos únicos
              </h1>
            </div>

            {/* Sensitive, warm luxury description */}
            <p className="font-ui text-sm sm:text-base text-[#6B5E54] max-w-xl leading-relaxed">
              En <strong className="text-[#1A1A1A] font-semibold">LIORAH STUDIO</strong> creamos piezas digitales sensibles, románticas y de altísima distinción para que la emoción de tu <strong className="text-[#1A1A1A] font-medium">Boda, 15 Años, Bautismo o Cumpleaños</strong> comience en el primer clic.
            </p>

            {/* Checklist of refined deliverables */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-[#6B5E54] font-ui">
              <div className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#F5EAEB] text-[#C5A059]">
                  <Check className="h-3 w-3" />
                </div>
                <span>Confirmación RSVP directa a WhatsApp</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#F5EAEB] text-[#C5A059]">
                  <Check className="h-3 w-3" />
                </div>
                <span>Botones GPS para Google Maps y Waze</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#F5EAEB] text-[#C5A059]">
                  <Check className="h-3 w-3" />
                </div>
                <span>Música ambiental y videos animados</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#F5EAEB] text-[#C5A059]">
                  <Check className="h-3 w-3" />
                </div>
                <span>Mesa de regalos con CBU / Alias copiable</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4">
              <a
                href="#muestras-reales"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1A1A1A] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#FAF6F0] shadow-md hover:bg-[#C5A059] hover:text-[#1A1A1A] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Ver Muestras en Vivo</span>
                <Sparkles className="h-4 w-4 text-[#D4AF37]" />
              </a>

              <button
                type="button"
                onClick={onOpenHeroDemo}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#E5D7C5] bg-[#FFFDF9] px-5 py-3.5 text-xs font-semibold tracking-wider text-[#1A1A1A] hover:border-[#C5A059] hover:bg-[#F5EFE6] transition-colors shadow-xs cursor-pointer whitespace-nowrap"
              >
                <Smartphone className="h-4 w-4 text-[#C5A059]" />
                <span>Probar Invitación en Smartphone</span>
              </button>
            </div>

            {/* Proof metrics in Warm Luxury style */}
            <div className="pt-8 border-t border-[#E5D7C5] flex items-center gap-6 sm:gap-10 text-xs text-[#A39589]">
              <div>
                <span className="font-prestige text-xl font-bold text-[#1A1A1A] block tabular-nums">
                  +1.200
                </span>
                <span className="font-ui text-[11px] text-[#6B5E54]">Historias celebradas</span>
              </div>
              <div className="h-7 w-[1px] bg-[#E5D7C5]" />
              <div>
                <span className="font-prestige text-xl font-bold text-[#1A1A1A] block tabular-nums">
                  24 a 48 hs
                </span>
                <span className="font-ui text-[11px] text-[#6B5E54]">Entrega personalizada</span>
              </div>
              <div className="h-7 w-[1px] bg-[#E5D7C5]" />
              <div>
                <div className="flex items-center gap-1 font-prestige text-xl font-bold text-[#1A1A1A]">
                  <span>5.0</span>
                  <span className="text-[#C5A059] text-base">★</span>
                </div>
                <span className="font-ui text-[11px] text-[#6B5E54]">Opiniones verificadas</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            {/* Double border fine perimeter artisanal card */}
            <div className="relative mx-auto max-w-md rounded-3xl bg-[#FFFDF9] p-3 shadow-xl border border-[#E5D7C5] group">
              <div className="rounded-2xl border border-[#E5D7C5]/60 p-2.5 bg-[#FAF6F0]">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-stone-100">
                  <img
                    src={HERO_IMAGE}
                    alt="Invitación Digital LIORAH STUDIO"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-stone-950/25 flex items-center justify-center group-hover:bg-stone-950/35 transition-colors">
                    <button
                      type="button"
                      onClick={onOpenHeroDemo}
                      className="flex items-center gap-2 rounded-full bg-[#FFFDF9]/95 px-5 py-2.5 text-xs font-semibold text-[#1A1A1A] shadow-xl backdrop-blur-md transition-all hover:scale-105 cursor-pointer border border-[#E5D7C5]"
                    >
                      <Play className="h-3.5 w-3.5 fill-[#C5A059] text-[#C5A059]" />
                      <span className="font-ui tracking-wide">Tocar para Probar Demo</span>
                    </button>
                  </div>
                </div>

                <div className="pt-3 pb-1 text-center">
                  <p className="font-prestige text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                    LIORAH STUDIO · Colección Signature
                  </p>
                  <p className="font-romantic italic text-xs text-[#6B5E54] mt-0.5">
                    "Delicadeza y calidez en cada detalle artesanal"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
