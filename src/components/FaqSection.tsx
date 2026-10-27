import React, { useState } from 'react';
import { ChevronDown, Heart } from 'lucide-react';

const FAQS = [
  {
    q: '¿Cuál es el valor de la Invitación Web y qué incluye?',
    a: 'Nuestra Invitación Web Interactiva tiene un valor oficial de $60.000 ARS (o su equivalente de aprox. $50 USD / $990 MXN para familias y clientes en México o el exterior). Incluye tu propia página web móvil personalizada desde cero, botones directos de GPS para Google Maps y Waze, confirmación de asistencia RSVP directa a tu WhatsApp, música ambiental de bienvenida, cuenta regresiva en vivo, cronograma de la fiesta y mesa de regalos con Alias / CLABE / CBU copiable en un toque.',
  },
  {
    q: '¿Los invitados necesitan instalar alguna aplicación para ver la invitación interactiva?',
    a: 'En absoluto. Tu invitación se abre inmediatamente en cualquier smartphone (iPhone o Android) al pulsar el enlace que les compartas por WhatsApp, sin descargar ninguna app ni registrarse.',
  },
  {
    q: '¿Cómo funciona la confirmación de asistencia (RSVP) por WhatsApp?',
    a: 'Tu invitado toca el botón "Confirmar Asistencia", indica su nombre y cuántos pases utilizará. Al enviar, se abre automáticamente WhatsApp con un mensaje pre-redactado directo a tu número para que lleves el control de tu lista con total comodidad.',
  },
  {
    q: '¿Puedo pedir ajustes si deseo cambiar algún horario o detalle?',
    a: '¡Por supuesto! En LIORAH STUDIO cuidamos cada detalle con amor. Todas nuestras propuestas personalizadas incluyen rondas de ajustes en textos, fotos, horarios y canciones para que quedes 100% satisfecha.',
  },
  {
    q: '¿Cuánto tiempo tarda la entrega?',
    a: 'El tiempo promedio es de 24 a 48 horas. Si tenés una urgencia especial, podés elegir el servicio de Entrega Express para recibir tu borrador en menos de 24 horas.',
  },
  {
    q: '¿Qué medios de pago aceptan para Argentina, México y el exterior?',
    a: 'Para Argentina aceptamos transferencias por Alias / CBU a Mercado Pago o bancos tradicionales, así como saldo de Mercado Pago ($60.000 ARS). Para México e internacional aceptamos tarjetas de crédito o débito internacionales (aprox. $50 USD / $990 MXN) y PayPal.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="preguntas" className="py-20 md:py-28 bg-[#FAF6F0]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="gold-divider mb-3">
            <span className="text-xs text-[#C5A059]">♥</span>
          </div>
          <p className="font-ui text-xs uppercase tracking-[0.2em] font-medium text-[#C5A059] mb-2">
            Preguntas Frecuentes
          </p>
          <h2 className="font-prestige text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] tracking-wide">
            Dudas & Consultas
          </h2>
          <p className="font-romantic italic text-base sm:text-lg text-[#6B5E54] mt-2">
            Todo lo que necesitás saber para celebrar tu momento único
          </p>
        </div>

        <div className="space-y-3.5 font-ui">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-3xl bg-[#FFFDF9] border border-[#E5D7C5] overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left text-sm font-semibold text-[#1A1A1A] hover:text-[#C5A059] transition-colors cursor-pointer"
                >
                  <span className="pr-4 font-prestige">{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-[#C5A059] transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-[#6B5E54] leading-relaxed border-t border-[#E5D7C5]/50 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
