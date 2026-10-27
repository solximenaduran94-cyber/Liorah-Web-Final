import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Heart } from 'lucide-react';

interface HeaderProps {
  onStartCustomizing: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onStartCustomizing }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#E5D7C5]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract */}
        <div className="flex h-20 items-center justify-between gap-6">
          {/* Brand Zone: Monogram "L" in Alex Brush + Cinzel Wordmark */}
          <a
            href="/"
            className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFFDF9] border border-[#E5D7C5] shadow-xs group-hover:border-[#C5A059] transition-colors">
              <span className="font-script text-2xl text-[#C5A059] leading-none pt-1">
                L
              </span>
              <span className="absolute -top-1 -right-1 text-[8px] text-[#C5A059]">♥</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-prestige text-lg sm:text-xl font-bold tracking-[0.18em] text-[#1A1A1A]">
                  LIORAH
                </span>
                <span className="font-ui text-xs font-light tracking-[0.22em] text-[#C5A059]">
                  STUDIO
                </span>
              </div>
              <p className="font-ui text-[9px] uppercase tracking-[0.25em] text-[#6B5E54] -mt-0.5">
                Invitaciones Digitales
              </p>
            </div>
          </a>

          {/* Nav Links: single line links */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-xs font-medium tracking-[0.12em] uppercase text-[#6B5E54]">
            <a
              href="#muestras-reales"
              className="text-[#C5A059] hover:text-[#1A1A1A] transition-colors whitespace-nowrap shrink-0 font-semibold flex items-center gap-1"
            >
              <span>Muestras</span>
              <span className="text-[10px] text-[#C5A059]">♥</span>
            </a>
            <a
              href="#funcionalidades"
              className="hover:text-[#1A1A1A] transition-colors whitespace-nowrap shrink-0"
            >
              Funciones Web
            </a>
            <a
              href="#calculadora-ahorro"
              className="hover:text-[#1A1A1A] transition-colors whitespace-nowrap shrink-0"
            >
              Calculadora
            </a>
            <a
              href="#propuestas"
              className="hover:text-[#1A1A1A] transition-colors whitespace-nowrap shrink-0"
            >
              Precios
            </a>
            <a
              href="#galeria"
              className="hover:text-[#1A1A1A] transition-colors whitespace-nowrap shrink-0"
            >
              Catálogo
            </a>
            <a
              href="#personalizador"
              className="hover:text-[#1A1A1A] transition-colors whitespace-nowrap shrink-0"
            >
              Personalizá
            </a>
            <a
              href="#opiniones"
              className="hover:text-[#1A1A1A] transition-colors whitespace-nowrap shrink-0"
            >
              Opiniones
            </a>
          </nav>

          {/* Primary Action Button */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Multi-currency indicator pill */}
            <div className="hidden lg:flex items-center gap-1.5 rounded-xl bg-[#FFFDF9] px-2.5 py-1.5 border border-[#E5D7C5] text-[10px] text-[#6B5E54] font-ui font-medium" title="Precios disponibles en Pesos Argentinos, Dólares y Pesos Mexicanos">
              <span className="font-semibold text-[#1A1A1A]">$60k ARS</span>
              <span className="text-[#A39589]">·</span>
              <span className="text-[#C5A059] font-semibold">$50 USD</span>
              <span className="text-[#A39589]">·</span>
              <span className="text-[#6B5E54]">$990 MXN</span>
            </div>

            <button
              type="button"
              onClick={onStartCustomizing}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#1A1A1A] px-4 sm:px-5 py-2.5 text-xs font-medium tracking-wider text-[#FAF6F0] shadow-xs hover:bg-[#6B5E54] border border-[#1A1A1A] transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Heart className="h-3 w-3 text-[#C5A059] fill-[#C5A059]" />
              <span>Personalizá con Amor</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-xl p-2 text-[#6B5E54] hover:text-[#1A1A1A] cursor-pointer"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E5D7C5] py-4 px-2 space-y-2 bg-[#FAF6F0]">
            <a
              href="#muestras-reales"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#C5A059] hover:bg-[#F5EFE6] rounded-xl"
            >
              ♥ Muestras Reales en Vivo
            </a>
            <a
              href="#funcionalidades"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-xs font-medium uppercase tracking-wider text-[#6B5E54] hover:bg-[#F5EFE6] rounded-xl"
            >
              Funcionalidades Web Incluidas
            </a>
            <a
              href="#calculadora-ahorro"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-xs font-medium uppercase tracking-wider text-[#6B5E54] hover:bg-[#F5EFE6] rounded-xl"
            >
              Calculadora de Ahorro
            </a>
            <a
              href="#propuestas"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-xs font-medium uppercase tracking-wider text-[#6B5E54] hover:bg-[#F5EFE6] rounded-xl"
            >
              Propuestas & Precios
            </a>
            <a
              href="#galeria"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-xs font-medium uppercase tracking-wider text-[#6B5E54] hover:bg-[#F5EFE6] rounded-xl"
            >
              Catálogo de Diseños
            </a>
            <a
              href="#personalizador"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-xs font-medium uppercase tracking-wider text-[#6B5E54] hover:bg-[#F5EFE6] rounded-xl"
            >
              Personalizá a Tu Medida
            </a>
            <a
              href="#opiniones"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-xs font-medium uppercase tracking-wider text-[#6B5E54] hover:bg-[#F5EFE6] rounded-xl"
            >
              Opiniones de Quinceañeras & Parejas
            </a>
          </div>
        )}
      </div>
    </header>
  );
};
