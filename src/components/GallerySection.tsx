import React, { useState } from 'react';
import { Search, Eye, Sparkles, SlidersHorizontal, ArrowUpRight, Heart } from 'lucide-react';
import { InvitationDesign, formatPriceEquivalents } from '../types';
import { INVITATION_CATALOG } from '../data/invitations';

interface GallerySectionProps {
  onSelectAndCustomize: (design: InvitationDesign) => void;
  onOpenLiveDemo: (design: InvitationDesign) => void;
}

const CATEGORIES = ['Todos', 'Bodas', 'XV Años', 'Baby Shower', 'Bautizo', 'Cumpleaños', 'Graduación'] as const;

export const GallerySection: React.FC<GallerySectionProps> = ({
  onSelectAndCustomize,
  onOpenLiveDemo,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredDesigns = INVITATION_CATALOG.filter((design) => {
    const matchesCategory = activeCategory === 'Todos' || design.category === activeCategory;
    const matchesSearch =
      design.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      design.styleDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      design.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="galeria" className="py-20 md:py-28 bg-[#FAF6F0]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header & Description */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-[#C5A059]">♥</span>
              <p className="font-ui text-xs uppercase tracking-[0.2em] font-medium text-[#C5A059]">
                Catálogo de Estilos de Autor
              </p>
            </div>
            <h2 className="font-prestige text-3xl sm:text-4xl font-normal text-[#1A1A1A] tracking-wide">
              Colección de Diseños
            </h2>
            <p className="font-romantic italic text-base sm:text-lg text-[#6B5E54] mt-1">
              "Piezas pensadas para tocar el corazón de quienes más querés"
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72 font-ui">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A39589]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por estilo o motivo..."
              className="w-full rounded-2xl border border-[#E5D7C5] bg-[#FFFDF9] pl-10 pr-4 py-2.5 text-xs text-[#1A1A1A] placeholder:text-[#A39589] focus:border-[#C5A059] focus:outline-hidden shadow-2xs"
            />
          </div>
        </div>

        {/* Category Filter Controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-10 font-ui">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-xs font-medium tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#1A1A1A] text-[#FAF6F0] shadow-xs'
                  : 'bg-[#FFFDF9] text-[#6B5E54] border border-[#E5D7C5] hover:border-[#C5A059]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Designs Grid */}
        {filteredDesigns.length === 0 ? (
          <div className="py-16 text-center rounded-3xl bg-[#FFFDF9] border border-dashed border-[#E5D7C5] p-8 font-ui">
            <SlidersHorizontal className="mx-auto h-8 w-8 text-[#A39589] mb-2" />
            <p className="text-[#1A1A1A] font-semibold text-sm">No encontramos diseños para tu búsqueda</p>
            <p className="text-[#6B5E54] text-xs mt-1">Probá con otra palabra o categoría.</p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('Todos');
                setSearchQuery('');
              }}
              className="mt-4 text-xs font-semibold text-[#C5A059] underline cursor-pointer"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDesigns.map((design) => (
              <div
                key={design.id}
                className="group flex flex-col justify-between rounded-3xl bg-[#FFFDF9] p-5 shadow-xs border border-[#E5D7C5] transition-all duration-300 hover:-translate-y-1 hover:border-[#C5A059] hover:shadow-lg hover:shadow-[#C5A059]/10"
              >
                <div>
                  {/* Image Card Container with Digital Web Invitation Cues */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#FAF6F0] mb-4 border border-[#E5D7C5]/60">
                    <img
                      src={design.image}
                      alt={design.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Digital Web Invitation Top Overlays */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                      <div className="flex items-center gap-1.5">
                        <span className="rounded-full bg-[#1A1A1A]/90 backdrop-blur-md px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-[#FAF6F0] border border-white/10">
                          {design.category}
                        </span>
                        <span className="rounded-full bg-amber-500/90 backdrop-blur-md px-2 py-0.5 text-[9px] font-bold text-stone-950 flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-stone-950 animate-pulse" />
                          <span>Web Digital</span>
                        </span>
                      </div>

                      {/* Music Pill */}
                      <div className="rounded-full bg-black/70 backdrop-blur-md px-2 py-0.5 text-[8px] font-medium text-amber-300 border border-amber-400/30 flex items-center gap-1">
                        <span>♫ Música</span>
                      </div>
                    </div>

                    {/* Bottom Countdown & Features pill */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                      <span className="rounded-full bg-black/75 backdrop-blur-md px-2.5 py-0.5 text-[9px] font-mono font-medium text-stone-200 border border-white/10">
                        ⏱ Cuenta Regresiva & GPS
                      </span>
                      <span className="rounded-full bg-black/75 backdrop-blur-md px-2 py-0.5 text-[9px] font-medium text-emerald-400 border border-emerald-500/30">
                        ● WhatsApp
                      </span>
                    </div>

                    {/* Subtle Overlay Gradient & Live Action */}
                    <div className="absolute inset-0 bg-[#1A1A1A]/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <button
                        type="button"
                        onClick={() => onOpenLiveDemo(design)}
                        className="w-full rounded-2xl bg-[#FFFDF9] py-2.5 px-3 text-xs font-bold text-[#1A1A1A] shadow-xl hover:bg-[#C5A059] hover:text-[#1A1A1A] flex items-center justify-center gap-2 transition-all cursor-pointer font-ui active:scale-95 border border-[#E5D7C5]"
                      >
                        <Eye className="h-4 w-4 text-[#C5A059]" />
                        <span>Abrir Invitación Web en Smartphone</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="px-1">
                    <div className="flex items-center gap-2 text-xs text-[#A39589] mb-1.5 font-ui">
                      <span>Interactivo</span>
                      <span aria-hidden="true">·</span>
                      <span>Música & GPS</span>
                      <span aria-hidden="true">·</span>
                      <span>WhatsApp</span>
                    </div>

                    <h3 className="font-prestige text-lg font-bold text-[#1A1A1A] group-hover:text-[#C5A059] transition-colors tracking-wide">
                      {design.title}
                    </h3>

                    <p className="font-romantic italic text-xs text-[#6B5E54] line-clamp-2 leading-relaxed mt-1">
                      "{design.tagline}"
                    </p>

                    {/* Palette Dots */}
                    <div className="mt-3.5 flex items-center gap-1.5 font-ui">
                      <span className="text-[10px] text-[#A39589] mr-1">Tonos:</span>
                      {design.paletteColors.map((color, idx) => (
                        <span
                          key={idx}
                          className="h-3 w-3 rounded-full border border-black/10 shadow-2xs"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Price & Direct Actions */}
                <div className="mt-6 pt-4 border-t border-[#E5D7C5] flex items-center justify-between gap-2 px-1 font-ui">
                  <div>
                    <span className="text-[10px] text-[#A39589] block">Invitación Web:</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-bold text-[#1A1A1A]">
                        ${design.price.toLocaleString('es-AR')}
                      </span>
                      <span className="text-[10px] text-[#6B5E54]">ARS</span>
                    </div>
                    <span className="font-ui text-[10px] text-[#C5A059] block font-medium">
                      {formatPriceEquivalents(design.price).combined}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onOpenLiveDemo(design)}
                      className="rounded-2xl border border-[#E5D7C5] bg-[#FFFDF9] p-2.5 text-[#6B5E54] hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                      title="Probar demo interactivo"
                    >
                      <Eye className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectAndCustomize(design)}
                      className="inline-flex items-center gap-1.5 rounded-2xl bg-[#1A1A1A] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FAF6F0] hover:bg-[#C5A059] hover:text-[#1A1A1A] transition-all cursor-pointer whitespace-nowrap shadow-xs"
                    >
                      <span>Personalizá</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
