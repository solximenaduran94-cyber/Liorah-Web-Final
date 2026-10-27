import React, { useState } from 'react';
import { Sparkles, DollarSign, Leaf, Clock, Check, X, ShieldAlert, ArrowRight, Heart } from 'lucide-react';
import { LIORAH_PACKAGES } from '../types';

export const SavingsCalculatorSection: React.FC = () => {
  const [guestsCount, setGuestsCount] = useState<number>(150);

  // Traditional stationery estimated costs in ARS
  // 1 invitation per ~1.8 guests (families/couples)
  const invitationsNeeded = Math.ceil(guestsCount / 1.8);
  const costPerPrintUnit = 1600; // Tarjetón papel texturado de algodón + foil dorado
  const costPerEnvelope = 1100; // Sobre artesanal forrado + lacre con sello de cera
  const costPerRsvpCard = 600; // Tarjeta personal de confirmación y CBU
  const costPerDelivery = 45000; // Envíos por correo o viáticos para entregar en mano
  const costPerReprint = 25000; // Errores de tipeo o cambio de fecha/horario

  const totalTraditionalCost =
    invitationsNeeded * (costPerPrintUnit + costPerEnvelope + costPerRsvpCard) +
    costPerDelivery +
    costPerReprint;

  // Liorah Web Invitation Flat Cost
  const liorahWebCost = LIORAH_PACKAGES.interactive.price; // $60.000 ARS
  const savingsArs = Math.max(0, totalTraditionalCost - liorahWebCost);
  const savingsPercent = Math.round((savingsArs / totalTraditionalCost) * 100);

  // Environmental metric
  const sheetsOfPaperSaved = invitationsNeeded * 3;
  const litersOfWaterSaved = Math.round(sheetsOfPaperSaved * 10);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="calculadora-ahorro" className="py-20 md:py-28 bg-[#FFFDF9] relative overflow-hidden border-t border-b border-[#E5D7C5]">
      {/* Warm Luxury ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-[#FAF6F0] rounded-full blur-3xl pointer-events-none opacity-80" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="gold-divider mb-3">
            <span className="text-xs text-[#C5A059]">♥</span>
          </div>
          <p className="font-ui text-xs uppercase tracking-[0.22em] text-[#C5A059] font-medium mb-2">
            Inteligencia & Rendimiento
          </p>
          <h2 className="font-prestige text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] tracking-wide">
            Digital vs. Impresa Tradicional
          </h2>
          <p className="font-romantic text-lg sm:text-xl text-[#6B5E54] italic mt-2">
            "Ahorrá miles de pesos y semanas de estrés sin resignar un ápice de elegancia"
          </p>
          <p className="font-ui text-sm text-[#6B5E54] mt-3 leading-relaxed">
            Descubrí cuánto ahorrás en tu presupuesto al elegir la Invitación Web de LIORAH STUDIO. Invitados ilimitados con una única tarifa fija de <strong className="text-[#1A1A1A] font-semibold">$60.000 ARS</strong> (≈ $50 USD · $990 MXN).
          </p>
        </div>

        {/* Interactive Slider Card */}
        <div className="max-w-4xl mx-auto bg-[#FAF6F0] p-6 sm:p-10 rounded-3xl border-2 border-[#E5D7C5] shadow-lg shadow-stone-200/40 relative mb-12">
          {/* Inner luxury line */}
          <div className="absolute inset-2 sm:inset-3 border border-[#E5D7C5]/60 rounded-[20px] pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <label
                  htmlFor="guests-slider"
                  className="font-ui text-xs uppercase tracking-widest text-[#6B5E54] font-bold block"
                >
                  ¿Cuántos invitados tenés contemplados?
                </label>
                <p className="font-romantic text-base text-[#1A1A1A] italic mt-0.5">
                  Deslizá para calcular el presupuesto en tiempo real
                </p>
              </div>

              <div className="flex items-center gap-2 bg-[#FFFDF9] border-2 border-[#C5A059] px-5 py-2.5 rounded-2xl shadow-sm">
                <span className="font-prestige text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                  {guestsCount}
                </span>
                <span className="font-ui text-xs font-semibold text-[#6B5E54] uppercase tracking-wider">
                  Invitados
                </span>
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-2">
              <input
                id="guests-slider"
                type="range"
                min="40"
                max="450"
                step="10"
                value={guestsCount}
                onChange={(e) => setGuestsCount(Number(e.target.value))}
                className="w-full h-2.5 bg-[#E5D7C5] rounded-lg appearance-none cursor-pointer accent-[#C5A059]"
              />
              <div className="flex justify-between text-[11px] font-ui text-[#A39589]">
                <span>40 personas (Íntimo)</span>
                <span>150 personas (Promedio)</span>
                <span>300 personas (Grande)</span>
                <span>450 personas (Mega fiesta)</span>
              </div>
            </div>

            {/* Live Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {/* Traditional Paper Card */}
              <div className="bg-[#FFFDF9]/80 rounded-2xl p-6 border border-stone-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-ui text-xs uppercase tracking-widest text-stone-500 font-bold">
                    Papelería Tradicional Impresa
                  </h3>
                  <span className="text-[11px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-mono">
                    ~{invitationsNeeded} juegos impresos
                  </span>
                </div>

                <div className="space-y-2 text-xs font-ui text-[#6B5E54] border-t border-b border-stone-200 py-3">
                  <div className="flex justify-between">
                    <span>Papel texturado & grabado ({invitationsNeeded}u)</span>
                    <span className="font-mono">{formatCurrency(invitationsNeeded * costPerPrintUnit)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sobres artesanales + sellos de lacre</span>
                    <span className="font-mono">{formatCurrency(invitationsNeeded * costPerEnvelope)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tarjetas de confirmación & CBU</span>
                    <span className="font-mono">{formatCurrency(invitationsNeeded * costPerRsvpCard)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envíos por correo o entregas en mano</span>
                    <span className="font-mono">{formatCurrency(costPerDelivery)}</span>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>Imprevistos / correcciones posteriores</span>
                    <span className="font-mono">{formatCurrency(costPerReprint)}</span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <span className="font-ui text-xs font-semibold text-stone-700">Costo Estimado Imprenta:</span>
                  <span className="font-prestige text-xl font-bold text-stone-800 line-through decoration-red-400">
                    {formatCurrency(totalTraditionalCost)}
                  </span>
                </div>

                <div className="space-y-1.5 text-[11px] font-ui text-stone-500">
                  <p className="flex items-center gap-1.5 text-stone-600">
                    <X className="w-3.5 h-3.5 text-red-500 shrink-0" /> Demora de producción de 3 a 6 semanas
                  </p>
                  <p className="flex items-center gap-1.5 text-stone-600">
                    <X className="w-3.5 h-3.5 text-red-500 shrink-0" /> Imposible corregir un error una vez impreso
                  </p>
                  <p className="flex items-center gap-1.5 text-stone-600">
                    <X className="w-3.5 h-3.5 text-red-500 shrink-0" /> Cada invitado extra tiene costo adicional
                  </p>
                </div>
              </div>

              {/* LIORAH Digital Studio Card */}
              <div className="bg-[#FFFDF9] rounded-2xl p-6 border-2 border-[#C5A059] shadow-md shadow-[#C5A059]/10 space-y-4 relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                    <h3 className="font-ui text-xs uppercase tracking-widest text-[#1A1A1A] font-bold">
                      LIORAH • Invitación Web
                    </h3>
                  </div>
                  <span className="text-[11px] bg-[#FAF6F0] text-[#C5A059] border border-[#C5A059] px-2.5 py-0.5 rounded-full font-bold">
                    Tarifa Fija Única
                  </span>
                </div>

                <div className="space-y-2 text-xs font-ui text-[#6B5E54] border-t border-b border-[#E5D7C5] py-3">
                  <div className="flex justify-between">
                    <span>Diseño interactivo personalizado</span>
                    <span className="text-emerald-700 font-medium">Incluido</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GPS, Música, RSVP y Muro de Deseos</span>
                    <span className="text-emerald-700 font-medium">Incluido</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Invitados ILIMITADOS (sin costo por persona)</span>
                    <span className="text-emerald-700 font-medium">Ilimitado</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío instantáneo por WhatsApp con 1 clic</span>
                    <span className="text-emerald-700 font-medium">Inmediato</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Modificaciones y soporte personalizado</span>
                    <span className="text-emerald-700 font-medium">Incluido</span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <span className="font-ui text-xs font-semibold text-[#1A1A1A] block">Tarifa Final LIORAH:</span>
                    <span className="font-ui text-[11px] text-[#A39589]">≈ $50 USD · $990 MXN</span>
                  </div>
                  <span className="font-prestige text-2xl font-bold text-[#1A1A1A]">
                    {formatCurrency(liorahWebCost)}
                  </span>
                </div>

                <div className="space-y-1.5 text-[11px] font-ui text-[#6B5E54]">
                  <p className="flex items-center gap-1.5 text-emerald-800 font-medium">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Entrega lista en 48 hs con amor
                  </p>
                  <p className="flex items-center gap-1.5 text-emerald-800 font-medium">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Modificaciones de fecha u horario en segundos
                  </p>
                  <p className="flex items-center gap-1.5 text-emerald-800 font-medium">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Pases VIP personalizados por familia
                  </p>
                </div>
              </div>
            </div>

            {/* Savings Result Banner */}
            <div className="p-5 rounded-2xl bg-[#1A1A1A] text-[#FFFDF9] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="text-center sm:text-left">
                <span className="font-ui text-[11px] uppercase tracking-[0.2em] text-[#C5A059] font-bold block">
                  Tu Ahorro Neto con LIORAH STUDIO
                </span>
                <p className="font-prestige text-2xl sm:text-3xl font-normal text-white mt-0.5">
                  Ahorrás <strong className="text-[#C5A059] font-bold">{formatCurrency(savingsArs)}</strong> ({savingsPercent}% menos)
                </p>
                <p className="font-romantic text-xs sm:text-sm text-stone-300 italic mt-0.5">
                  Presupuesto que podés destinar a la barra de tragos, show en vivo o tu luna de miel.
                </p>
              </div>

              <a
                href="#personalizador"
                className="shrink-0 px-6 py-3 rounded-full bg-[#C5A059] hover:bg-[#b08d47] text-[#1A1A1A] font-ui text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <span>Empezar mi diseño</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Ecological Impact Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-[#FFFDF9] p-4 rounded-xl border border-[#E5D7C5] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-prestige text-base font-bold text-[#1A1A1A] block">
                    {sheetsOfPaperSaved} Hojas
                  </span>
                  <span className="font-ui text-[11px] text-[#6B5E54]">de papel de algodón evitadas</span>
                </div>
              </div>

              <div className="bg-[#FFFDF9] p-4 rounded-xl border border-[#E5D7C5] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                  <span className="text-lg">💧</span>
                </div>
                <div>
                  <span className="font-prestige text-base font-bold text-[#1A1A1A] block">
                    ~{litersOfWaterSaved} Litros
                  </span>
                  <span className="font-ui text-[11px] text-[#6B5E54]">de agua preservados</span>
                </div>
              </div>

              <div className="bg-[#FFFDF9] p-4 rounded-xl border border-[#E5D7C5] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-50 text-[#C5A059] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-prestige text-base font-bold text-[#1A1A1A] block">
                    48 Horas
                  </span>
                  <span className="font-ui text-[11px] text-[#6B5E54]">entrega express vs 4 semanas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
