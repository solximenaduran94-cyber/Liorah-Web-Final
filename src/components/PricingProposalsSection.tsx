import React from 'react';
import { Heart, Sparkles, Check, ArrowRight, Smartphone, Video, Image, Zap } from 'lucide-react';
import { LIORAH_PACKAGES, LiorahPackageTier } from '../types';

interface PricingProposalsSectionProps {
  onSelectTier: (tier: LiorahPackageTier) => void;
}

export const PricingProposalsSection: React.FC<PricingProposalsSectionProps> = ({ onSelectTier }) => {
  const getIcon = (id: LiorahPackageTier) => {
    switch (id) {
      case 'express':
        return Zap;
      case 'basic':
        return Image;
      case 'interactive':
        return Smartphone;
      case 'animated_video':
        return Video;
    }
  };

  const packageList = Object.values(LIORAH_PACKAGES);

  return (
    <section id="propuestas" className="py-20 md:py-28 bg-[#FAF6F0] relative overflow-hidden">
      {/* Subtle Warm Luxury Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] gold-glow pointer-events-none rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="gold-divider mb-3">
            <span className="text-xs text-[#C5A059]">♥</span>
          </div>
          <p className="font-ui text-xs uppercase tracking-[0.22em] text-[#C5A059] font-medium mb-2">
            Nuestras 4 Modalidades
          </p>
          <h2 className="font-prestige text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] tracking-wide">
            Elegí la Propuesta Perfecta
          </h2>
          <p className="font-romantic text-lg sm:text-xl text-[#6B5E54] italic mt-2">
            "Diseños 100% personalizados • Rápido y con amor"
          </p>
          <p className="font-ui text-xs sm:text-sm text-[#6B5E54] mt-3 leading-relaxed">
            Invitación Web interactiva completa por <strong className="text-[#1A1A1A] font-semibold">$60.000 ARS</strong> (aprox. <strong className="text-[#C5A059] font-semibold">$50 USD</strong> · <strong className="text-[#C5A059] font-semibold">$990 MXN</strong>). También ofrecemos opciones en tarjeta express JPG y videos cinematográficos para celebrar tus momentos únicos.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packageList.map((pkg) => {
            const Icon = getIcon(pkg.id);
            const isFeatured = pkg.id === 'interactive';

            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col justify-between rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                  isFeatured
                    ? 'bg-[#FFFDF9] border-2 border-[#D4AF37] shadow-xl shadow-[#C5A059]/10'
                    : 'bg-[#FFFDF9] border border-[#E5D7C5] shadow-sm hover:border-[#C5A059]'
                }`}
              >
                {/* Badge if featured */}
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#1A1A1A] px-3.5 py-1 text-[10px] font-semibold tracking-widest uppercase text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm">
                      <Sparkles className="h-2.5 w-2.5 text-[#D4AF37]" />
                      <span>{pkg.badge}</span>
                    </span>
                  </div>
                )}

                <div>
                  {/* Icon & Category */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                        isFeatured
                          ? 'bg-[#F5EAEB] text-[#C5A059]'
                          : 'bg-[#F5EFE6] text-[#6B5E54]'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs text-[#C5A059]">♥</span>
                  </div>

                  {/* Title & Price */}
                  <h3 className="font-prestige text-lg font-bold text-[#1A1A1A] tracking-wider mb-1">
                    {pkg.title}
                  </h3>
                  <div className="my-3">
                    <div className="flex items-baseline gap-1">
                      <span className="font-ui text-3xl font-bold text-[#1A1A1A]">
                        ${pkg.price.toLocaleString('es-AR')}
                      </span>
                      <span className="font-ui text-[11px] text-[#A39589] uppercase tracking-wider">
                        ARS
                      </span>
                    </div>
                    {/* Equivalents in USD and MXN */}
                    <div className="mt-1 flex items-center gap-1.5 font-ui text-[11px] text-[#C5A059] font-medium">
                      <span>≈ ${pkg.priceUSD} USD</span>
                      <span className="text-[#E5D7C5]">·</span>
                      <span>${pkg.priceMXN.toLocaleString('es-MX')} MXN</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-ui text-xs text-[#6B5E54] leading-relaxed mb-6">
                    {pkg.summary}
                  </p>

                  {/* Deliverable highlight */}
                  <div className="rounded-xl bg-[#F5EFE6]/70 p-2.5 mb-5 border border-[#E5D7C5]/50">
                    <span className="font-ui text-[10px] uppercase tracking-widest text-[#A39589] block">
                      Entrega:
                    </span>
                    <span className="font-romantic italic text-xs font-semibold text-[#1A1A1A] block">
                      {pkg.deliverable}
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 mb-6 text-xs text-[#6B5E54]">
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <button
                  type="button"
                  onClick={() => onSelectTier(pkg.id)}
                  className={`w-full rounded-2xl py-3 px-4 text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isFeatured
                      ? 'bg-[#1A1A1A] text-[#FAF6F0] hover:bg-[#C5A059] hover:text-[#1A1A1A] shadow-md'
                      : 'bg-[#F5EFE6] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FAF6F0] border border-[#E5D7C5]'
                  }`}
                >
                  <span>Elegir Esta Propuesta</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
