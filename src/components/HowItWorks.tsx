import React from 'react';
import { Sparkles, Sliders, Send, Heart } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Elegí tu Propuesta o Estilo',
      desc: 'Explorá nuestras 4 modalidades (Express, Básica, Interactiva o Animada) y descubrí las muestras reales en vivo desde tu celular.',
      icon: Sparkles,
    },
    {
      step: '02',
      title: 'Personalizá tus Datos y Notas',
      desc: 'Ingresá nombres, fecha, lugares de ceremonia y fiesta, música preferida, código de vestimenta y cualquier dedicatoria que desees incluir.',
      icon: Sliders,
    },
    {
      step: '03',
      title: 'Recibí con Amor y Compartí',
      desc: 'En 24 a 48 hs te enviamos el borrador por WhatsApp. Ajustamos cada detalle a tu gusto y te entregamos tu invitación lista para emocionar a todos.',
      icon: Send,
    },
  ];

  return (
    <section id="como-funciona" className="py-20 md:py-28 bg-[#FAF6F0] border-b border-[#E5D7C5]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="gold-divider mb-3">
            <span className="text-xs text-[#C5A059]">♥</span>
          </div>
          <p className="font-ui text-xs uppercase tracking-[0.2em] font-medium text-[#C5A059] mb-2">
            Paso a Paso
          </p>
          <h2 className="font-prestige text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] tracking-wide">
            ¿Cómo Creamos Juntos?
          </h2>
          <p className="font-romantic italic text-base sm:text-lg text-[#6B5E54] mt-2">
            "Diseños 100% personalizados • Rápido y con amor"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="rounded-3xl bg-[#FFFDF9] p-7 sm:p-8 border border-[#E5D7C5] shadow-xs flex flex-col justify-between transition-all hover:border-[#C5A059]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-ui text-xs font-bold text-[#C5A059] bg-[#F5EAEB] px-3 py-1 rounded-full border border-[#E5D7C5]/60">
                      Paso {item.step}
                    </span>
                    <Icon className="h-5 w-5 text-[#C5A059]" />
                  </div>

                  <h3 className="font-prestige text-xl font-bold text-[#1A1A1A] mb-2">
                    {item.title}
                  </h3>

                  <p className="font-ui text-xs sm:text-sm text-[#6B5E54] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
