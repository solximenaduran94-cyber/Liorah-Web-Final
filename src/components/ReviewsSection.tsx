import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, Heart, Sparkles, Send } from 'lucide-react';
import { Review } from '../types';
import { loadSavedReviews, saveReview } from '../data/initialReviews';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(loadSavedReviews());
  const [showForm, setShowForm] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form State
  const [author, setAuthor] = useState('');
  const [city, setCity] = useState('');
  const [eventType, setEventType] = useState('15 Años');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: author.trim(),
      city: city.trim() || 'Buenos Aires',
      rating,
      eventType,
      eventDate: 'Reciente',
      comment: comment.trim(),
      verified: true,
      createdAt: new Date().toISOString().split('T')[0],
    };

    const updated = saveReview(newRev);
    setReviews(updated);
    setSubmittedSuccess(true);
    setAuthor('');
    setCity('');
    setComment('');
    setTimeout(() => {
      setSubmittedSuccess(false);
      setShowForm(false);
    }, 3000);
  };

  return (
    <section id="opiniones" className="py-20 md:py-28 bg-[#FAF6F0]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-[#C5A059]">♥</span>
              <p className="font-ui text-xs uppercase tracking-[0.2em] font-medium text-[#C5A059]">
                Historias que Dejan Huella
              </p>
            </div>
            <h2 className="font-prestige text-3xl sm:text-4xl font-normal text-[#1A1A1A] tracking-wide">
              Opiniones de Nuestras Familias
            </h2>
            <div className="mt-3 flex items-center gap-3 text-sm font-ui">
              <div className="flex text-[#C5A059]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#C5A059] text-[#C5A059]" />
                ))}
              </div>
              <span className="font-bold text-[#1A1A1A]">5.0 / 5.0</span>
              <span className="text-[#E5D7C5]" aria-hidden="true">·</span>
              <span className="text-[#6B5E54] text-xs">+380 celebraciones realizadas con amor</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#1A1A1A] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#FAF6F0] shadow-sm hover:bg-[#C5A059] hover:text-[#1A1A1A] transition-all cursor-pointer self-start md:self-auto font-ui"
          >
            <MessageSquarePlus className="h-4 w-4 text-[#D4AF37]" />
            <span>{showForm ? 'Cerrar Formulario' : 'Dejá tu Comentario'}</span>
          </button>
        </div>

        {/* Interactive Add Review Form Drawer */}
        {showForm && (
          <div className="mb-14 rounded-3xl bg-[#FFFDF9] p-6 md:p-8 shadow-sm border border-[#E5D7C5] font-ui">
            {submittedSuccess ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#F5EAEB] text-[#C5A059]">
                  <Heart className="h-6 w-6 fill-[#C5A059]" />
                </div>
                <h3 className="font-prestige text-xl font-bold text-[#1A1A1A]">
                  ¡Muchísimas gracias por tus sentidas palabras!
                </h3>
                <p className="font-romantic italic text-sm text-[#6B5E54] mt-1">
                  Tu testimonio ya forma parte de los recuerdos compartidos de LIORAH STUDIO.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="border-b border-[#E5D7C5] pb-3">
                  <h3 className="font-prestige text-lg font-bold text-[#1A1A1A]">
                    Contanos tu experiencia con LIORAH STUDIO
                  </h3>
                  <p className="text-xs text-[#6B5E54] mt-0.5">
                    Compartí cómo reaccionaron tus invitados al recibir su invitación en el celular.
                  </p>
                </div>

                {/* Rating Stars Picker */}
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#6B5E54] block mb-1.5">
                    Tu Calificación
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 cursor-pointer transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            (hoverRating || rating) >= star
                              ? 'fill-[#C5A059] text-[#C5A059]'
                              : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-xs font-semibold text-[#1A1A1A]">
                      {rating === 5 ? '¡Excelente servicio y amor en cada detalle! ♥' : `${rating} de 5 estrellas`}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#6B5E54] block mb-1">
                      Tu Nombre / Pareja
                    </label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Ej. Mamá de Valentina / Sofía & Mateo"
                      className="w-full rounded-xl border border-[#E5D7C5] bg-[#FAF6F0] px-3.5 py-2 text-xs text-[#1A1A1A] focus:border-[#C5A059] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#6B5E54] block mb-1">
                      Ciudad o Provincia
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ej. Córdoba, Santa Fe, CABA"
                      className="w-full rounded-xl border border-[#E5D7C5] bg-[#FAF6F0] px-3.5 py-2 text-xs text-[#1A1A1A] focus:border-[#C5A059] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-[#6B5E54] block mb-1">
                      Tipo de Celebración
                    </label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full rounded-xl border border-[#E5D7C5] bg-[#FAF6F0] px-3.5 py-2 text-xs text-[#1A1A1A]"
                    >
                      <option value="15 Años">15 Años</option>
                      <option value="Boda">Boda / Casamiento</option>
                      <option value="Bautismo">Bautismo</option>
                      <option value="Comunión">Comunión</option>
                      <option value="Baby Shower">Baby Shower</option>
                      <option value="Cumpleaños">Cumpleaños</option>
                      <option value="Evento Corporativo">Evento Corporativo</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#6B5E54] block mb-1">
                    Tu Testimonio
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Contanos qué fue lo que más te conmovió del diseño, la rapidez de entrega y los comentarios de tus invitados..."
                    className="w-full rounded-xl border border-[#E5D7C5] bg-[#FAF6F0] p-3 text-xs text-[#1A1A1A] focus:border-[#C5A059] focus:outline-hidden"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 text-xs font-medium text-[#6B5E54] hover:text-[#1A1A1A] cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-2xl bg-[#1A1A1A] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FAF6F0] hover:bg-[#C5A059] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Publicar con Amor</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="rounded-3xl bg-[#FFFDF9] p-6 shadow-xs border border-[#E5D7C5] flex flex-col justify-between transition-all hover:border-[#C5A059]"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-[#C5A059]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#C5A059]" />
                    ))}
                  </div>
                  <span className="font-ui text-[11px] text-[#A39589]">{rev.eventDate}</span>
                </div>

                <p className="font-romantic italic text-base text-[#1A1A1A] leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E5D7C5]/60 flex items-center justify-between text-xs font-ui">
                <div>
                  <p className="font-prestige font-bold text-[#1A1A1A] text-sm">{rev.author}</p>
                  <p className="text-[11px] text-[#6B5E54]">
                    {rev.eventType} {rev.city ? `· ${rev.city}` : ''}
                  </p>
                </div>

                {rev.verified && (
                  <div className="flex items-center gap-1 text-[11px] text-[#C5A059] bg-[#F5EAEB] px-3 py-1 rounded-full font-semibold border border-[#E5D7C5]">
                    <Heart className="h-3 w-3 fill-[#C5A059]" />
                    <span>Experiencia LIORAH</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
