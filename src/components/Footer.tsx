import React from 'react';
import { MessageCircle, Heart, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A1A1A] text-[#FAF6F0] py-14 border-t border-[#C5A059]/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-stone-800">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5 mb-2">
              <span className="font-script text-2xl text-[#C5A059]">L</span>
              <span className="font-prestige text-xl font-bold tracking-[0.2em] text-[#FAF6F0]">
                LIORAH STUDIO
              </span>
              <span className="text-xs text-[#C5A059]">♥</span>
            </div>
            <p className="font-romantic italic text-sm text-[#C5A059] max-w-md">
              "Diseño que celebra momentos únicos"
            </p>
            <p className="font-ui text-xs text-[#A39589] mt-1 max-w-md">
              Estudio boutique de invitaciones digitales exclusivas, interactivas y videos animados para Bodas, 15 Años, Bautismos y Celebraciones de alta gama.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs font-ui">
            <a
              href="https://wa.me/5491123456789?text=Hola%20LIORAH%20STUDIO!%20Deseo%20consultar%20por%20una%20invitación%20personalizada"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#C5A059] hover:bg-[#D4AF37] px-5 py-3 font-semibold text-[#1A1A1A] transition-colors shadow-md"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Contactar por WhatsApp</span>
            </a>

            <div className="flex items-center gap-2 text-[#A39589] text-xs">
              <ShieldCheck className="h-4 w-4 text-[#C5A059]" />
              <span>Diseños 100% Personalizados</span>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#A39589] font-ui">
          <p>© {new Date().getFullYear()} LIORAH STUDIO · Invitaciones Digitales. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1.5">
            <span>Hecho con amor y dedicación</span>
            <Heart className="h-3 w-3 text-[#C5A059] fill-[#C5A059]" />
            <span>para momentos inolvidables</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
