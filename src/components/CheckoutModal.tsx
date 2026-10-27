import React, { useState } from 'react';
import {
  CreditCard,
  Building2,
  Lock,
  CheckCircle2,
  Copy,
  Check,
  Clock,
  Sparkles,
  MessageCircle,
  ShieldCheck,
  X,
  Heart,
  Video,
  Smartphone,
  Image,
  Zap,
} from 'lucide-react';
import { InvitationDesign, DesignPreferences, LiorahPackageTier, LIORAH_PACKAGES, formatPriceEquivalents } from '../types';

interface CheckoutModalProps {
  design: InvitationDesign;
  preferences: DesignPreferences;
  initialTier?: LiorahPackageTier;
  onClose: () => void;
  onOrderCompleted?: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  design,
  preferences,
  initialTier = 'interactive',
  onClose,
  onOrderCompleted,
}) => {
  const [packageTier, setPackageTier] = useState<LiorahPackageTier>(initialTier);
  const [rushDelivery, setRushDelivery] = useState(false);
  const [individualPasses, setIndividualPasses] = useState(false);

  // Payment tab
  const [paymentMethod, setPaymentMethod] = useState<'mercadopago' | 'transfer' | 'card'>('transfer');

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent?: number; fixed?: number } | null>(null);
  const [couponError, setCouponError] = useState('');

  // Card details state
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState(preferences.hostsNames || '');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Processing & Success state
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [copiedAlias, setCopiedAlias] = useState(false);

  // Price calculations based on official LIORAH STUDIO tiers
  const basePrice = LIORAH_PACKAGES[packageTier].price;
  const rushPrice = rushDelivery ? 6000 : 0;
  const passesPrice = individualPasses ? 5000 : 0;
  const subtotal = basePrice + rushPrice + passesPrice;

  let discountAmount = 0;
  if (appliedDiscount?.percent) {
    discountAmount = Math.round((subtotal * appliedDiscount.percent) / 100);
  } else if (appliedDiscount?.fixed) {
    discountAmount = appliedDiscount.fixed;
  }
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'LIORAH10') {
      setAppliedDiscount({ code: 'LIORAH10', percent: 10 });
    } else if (clean === 'CONAMOR' || clean === 'MOMENTOS') {
      setAppliedDiscount({ code: clean, fixed: 5000 });
    } else {
      setCouponError('Cupón no válido. Probá con LIORAH10');
    }
  };

  const handleCardNumberChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  const handleExpiryChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      setCardExpiry(`${raw.slice(0, 2)}/${raw.slice(2, 4)}`);
    } else {
      setCardExpiry(raw);
    }
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedId = `LIO-${Math.floor(10000 + Math.random() * 90000)}`;
      setOrderId(generatedId);
      setIsProcessing(false);
      setOrderCompleted(true);
      if (onOrderCompleted) {
        onOrderCompleted(generatedId);
      }
    }, 1800);
  };

  const transferAlias = 'LIORAH.STUDIO.MP';
  const transferCbu = '0000003100094821568912';

  const handleCopyAlias = () => {
    navigator.clipboard?.writeText(transferAlias);
    setCopiedAlias(true);
    setTimeout(() => setCopiedAlias(false), 2000);
  };

  const equivalents = formatPriceEquivalents(total);
  const whatsappMessage = encodeURIComponent(
    `¡Hola LIORAH STUDIO! ♥ Acabo de confirmar mi pedido ${orderId} para "${design.title}". ` +
    `Propuesta elegida: ${LIORAH_PACKAGES[packageTier].title}. ` +
    `Festejados: ${preferences.hostsNames}, Fecha: ${preferences.eventDate}. ` +
    `Total: $${total.toLocaleString('es-AR')} ARS (${equivalents.combined}). ¡Ya les envío el comprobante para empezar a crear juntos!`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#FFFDF9] shadow-2xl border border-[#E5D7C5] overflow-hidden my-8">
        {/* Brand Header Bar */}
        <div className="flex items-center justify-between border-b border-[#E5D7C5] bg-[#FAF6F0] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <span className="font-script text-xl text-[#C5A059] leading-none pt-0.5">L</span>
            <span className="font-prestige text-base font-bold tracking-widest text-[#1A1A1A]">
              LIORAH STUDIO
            </span>
            <span className="text-[#E5D7C5]">/</span>
            <span className="font-ui text-xs text-[#6B5E54]">Confirmación de Pedido</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-[#6B5E54] hover:bg-[#F5EFE6] hover:text-[#1A1A1A] transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {orderCompleted ? (
          /* SUCCESS RECEIPT VIEW */
          <div className="p-6 md:p-10 text-center bg-[#FAF6F0]">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F5EAEB] text-[#C5A059] border border-[#E5D7C5] shadow-xs">
              <Heart className="h-8 w-8 fill-[#C5A059] text-[#C5A059]" />
            </div>

            <span className="font-ui text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059] block mb-1">
              ¡Pedido Recibido con Amor!
            </span>
            <h2 className="font-prestige text-2xl md:text-3xl font-bold text-[#1A1A1A]">
              Orden #{orderId}
            </h2>
            <p className="font-romantic italic text-base text-[#6B5E54] max-w-md mx-auto mt-2">
              "Diseño que celebra momentos únicos"
            </p>
            <p className="font-ui text-xs text-[#6B5E54] max-w-md mx-auto mt-1">
              Hemos recibido los detalles para la celebración de <strong className="text-[#1A1A1A]">{preferences.hostsNames}</strong>.
            </p>

            {/* Receipt Summary Card */}
            <div className="mt-6 rounded-2xl bg-[#FFFDF9] p-5 text-left border border-[#E5D7C5] text-xs space-y-2.5 max-w-md mx-auto shadow-xs font-ui">
              <div className="flex justify-between border-b border-[#E5D7C5]/60 pb-2">
                <span className="text-[#6B5E54]">Propuesta Elegida:</span>
                <span className="font-semibold text-[#1A1A1A]">{LIORAH_PACKAGES[packageTier].title}</span>
              </div>
              <div className="flex justify-between border-b border-[#E5D7C5]/60 pb-2">
                <span className="text-[#6B5E54]">Diseño Base:</span>
                <span className="font-semibold text-[#1A1A1A]">{design.title}</span>
              </div>
              <div className="flex justify-between border-b border-[#E5D7C5]/60 pb-2">
                <span className="text-[#6B5E54]">Fecha del Evento:</span>
                <span className="font-semibold text-[#1A1A1A]">{preferences.eventDate}</span>
              </div>
              <div className="flex justify-between border-b border-[#E5D7C5]/60 pb-2">
                <span className="text-[#6B5E54]">Medio de Pago:</span>
                <span className="font-semibold text-[#1A1A1A] uppercase">
                  {paymentMethod === 'transfer' ? 'Transferencia Bancaria / Alias' : paymentMethod === 'mercadopago' ? 'Mercado Pago' : 'Tarjeta'}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-1 text-sm font-bold text-[#1A1A1A]">
                <span>Total Final:</span>
                <div className="text-right">
                  <span className="text-[#C5A059] font-ui block">${total.toLocaleString('es-AR')} ARS</span>
                  <span className="text-[10px] text-[#6B5E54] font-medium block">
                    {equivalents.combined}
                  </span>
                </div>
              </div>
            </div>

            {/* Next Steps in Warm Luxury */}
            <div className="mt-6 max-w-md mx-auto text-left rounded-2xl bg-[#FFFDF9] p-4 border border-[#E5D7C5] text-xs text-[#6B5E54] space-y-2">
              <p className="font-bold text-[#1A1A1A] flex items-center gap-1.5 font-ui">
                <Clock className="h-4 w-4 text-[#C5A059]" />
                <span>¿Cómo seguimos ahora?</span>
              </p>
              <ol className="list-decimal list-inside space-y-1.5 font-ui text-[11px] text-[#6B5E54]">
                <li>Nuestra diseñadora toma tus datos y prepara el borrador con dedicación.</li>
                <li>Te enviamos la prueba por WhatsApp para que la mires y nos des tu visto bueno.</li>
                <li>¡Listo! Recibís tu enlace o archivo final para empezar a compartirlo con todos.</li>
              </ol>
            </div>

            {/* Direct WhatsApp Contact CTA */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/5215512345678?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1A1A1A] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#FAF6F0] shadow-md hover:bg-[#C5A059] hover:text-[#1A1A1A] transition-all"
              >
                <MessageCircle className="h-4 w-4 text-[#D4AF37]" />
                <span>Enviar Pedido a WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto rounded-2xl border border-[#E5D7C5] bg-[#FFFDF9] px-5 py-3 text-xs font-medium text-[#6B5E54] hover:bg-[#F5EFE6] transition-colors cursor-pointer"
              >
                Cerrar y Volver al Estudio
              </button>
            </div>
          </div>
        ) : (
          /* CHECKOUT FORM VIEW */
          <div className="p-6 md:p-8 bg-[#FAF6F0]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Left Column: Tiers & Payment (7 Cols) */}
              <div className="md:col-span-7 space-y-6">
                {/* 4 Official LIORAH STUDIO Product Tiers */}
                <div>
                  <label className="font-ui text-xs font-semibold uppercase tracking-[0.15em] text-[#1A1A1A] block mb-2">
                    Elegí tu Propuesta
                  </label>
                  <div className="space-y-2">
                    {(Object.keys(LIORAH_PACKAGES) as LiorahPackageTier[]).map((tierKey) => {
                      const pkg = LIORAH_PACKAGES[tierKey];
                      const isSelected = packageTier === tierKey;

                      return (
                        <button
                          key={tierKey}
                          type="button"
                          onClick={() => setPackageTier(tierKey)}
                          className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#C5A059] bg-[#FFFDF9] shadow-sm ring-1 ring-[#C5A059]'
                              : 'border-[#E5D7C5] bg-[#FFFDF9]/60 hover:bg-[#FFFDF9]'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-prestige text-xs font-bold text-[#1A1A1A]">
                                {pkg.title}
                              </span>
                              {pkg.badge && (
                                <span className="rounded-full bg-[#1A1A1A] text-[#D4AF37] text-[9px] font-semibold px-2 py-0.2 tracking-widest uppercase">
                                  {pkg.badge}
                                </span>
                              )}
                            </div>
                            <span className="font-ui text-[11px] text-[#6B5E54] block mt-0.5">
                              {pkg.summary}
                            </span>
                          </div>
                          <div className="shrink-0 ml-3 text-right">
                            <span className="font-ui text-sm font-bold text-[#1A1A1A] block">
                              ${pkg.price.toLocaleString('es-AR')}
                            </span>
                            <span className="font-ui text-[10px] text-[#C5A059] block font-medium">
                              ≈ ${pkg.priceUSD} USD · ${pkg.priceMXN} MXN
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Optional Add-ons */}
                <div>
                  <label className="font-ui text-xs font-semibold uppercase tracking-[0.15em] text-[#1A1A1A] block mb-2">
                    Opciones Adicionales
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between p-3 rounded-2xl border border-[#E5D7C5] bg-[#FFFDF9] hover:bg-[#F5EFE6] cursor-pointer">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={rushDelivery}
                          onChange={(e) => setRushDelivery(e.target.checked)}
                          className="rounded text-[#1A1A1A] focus:ring-[#C5A059]"
                        />
                        <div>
                          <span className="font-ui text-xs font-medium text-[#1A1A1A] block">
                            Entrega Express Prioritaria (menos de 24 hs)
                          </span>
                          <span className="font-ui text-[10px] text-[#6B5E54]">
                            Prioridad máxima en el tablero de diseño
                          </span>
                        </div>
                      </div>
                      <span className="font-ui text-xs font-semibold text-[#1A1A1A]">+$6.000 ARS</span>
                    </label>

                    {packageTier === 'interactive' && (
                      <label className="flex items-center justify-between p-3 rounded-2xl border border-[#E5D7C5] bg-[#FFFDF9] hover:bg-[#F5EFE6] cursor-pointer">
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={individualPasses}
                            onChange={(e) => setIndividualPasses(e.target.checked)}
                            className="rounded text-[#1A1A1A] focus:ring-[#C5A059]"
                          />
                          <div>
                            <span className="font-ui text-xs font-medium text-[#1A1A1A] block">
                              Pases Digitales Personalizados por Familia
                            </span>
                            <span className="font-ui text-[10px] text-[#6B5E54]">
                              Links individuales con el nombre de cada invitado
                            </span>
                          </div>
                        </div>
                        <span className="font-ui text-xs font-semibold text-[#1A1A1A]">+$5.000 ARS</span>
                      </label>
                    )}
                  </div>
                </div>

                {/* Payment Selector */}
                <div>
                  <label className="font-ui text-xs font-semibold uppercase tracking-[0.15em] text-[#1A1A1A] block mb-2">
                    Forma de Pago
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('transfer')}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        paymentMethod === 'transfer'
                          ? 'border-[#C5A059] bg-[#FFFDF9] font-bold text-[#1A1A1A] ring-1 ring-[#C5A059]'
                          : 'border-[#E5D7C5] bg-[#FFFDF9]/60 text-[#6B5E54] hover:bg-[#FFFDF9]'
                      }`}
                    >
                      <Building2 className="h-4 w-4 mb-1 text-[#C5A059]" />
                      <span className="font-ui text-[11px]">Transferencia / Alias</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('mercadopago')}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        paymentMethod === 'mercadopago'
                          ? 'border-[#C5A059] bg-[#FFFDF9] font-bold text-[#1A1A1A] ring-1 ring-[#C5A059]'
                          : 'border-[#E5D7C5] bg-[#FFFDF9]/60 text-[#6B5E54] hover:bg-[#FFFDF9]'
                      }`}
                    >
                      <Sparkles className="h-4 w-4 mb-1 text-[#009EE3]" />
                      <span className="font-ui text-[11px]">Mercado Pago</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-[#C5A059] bg-[#FFFDF9] font-bold text-[#1A1A1A] ring-1 ring-[#C5A059]'
                          : 'border-[#E5D7C5] bg-[#FFFDF9]/60 text-[#6B5E54] hover:bg-[#FFFDF9]'
                      }`}
                    >
                      <CreditCard className="h-4 w-4 mb-1 text-[#6B5E54]" />
                      <span className="font-ui text-[11px]">Tarjeta Déb/Créd</span>
                    </button>
                  </div>
                </div>

                {/* TRANSFER / ALIAS VIEW */}
                {paymentMethod === 'transfer' && (
                  <div className="rounded-2xl bg-[#FFFDF9] p-4 border border-[#E5D7C5] space-y-3 font-ui">
                    <p className="text-xs text-[#6B5E54] leading-relaxed">
                      Transferí desde la app de tu banco o Mercado Pago a nuestro alias oficial:
                    </p>
                    <div className="rounded-xl bg-[#FAF6F0] p-3 border border-[#E5D7C5] space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-[#6B5E54]">Titular:</span>
                        <span className="font-semibold text-[#1A1A1A]">LIORAH STUDIO</span>
                      </div>
                      <div className="flex justify-between items-center pt-1 border-t border-[#E5D7C5]/50">
                        <div>
                          <span className="text-[#6B5E54] block text-[10px]">Alias Mercado Pago:</span>
                          <span className="font-mono font-bold text-[#1A1A1A] text-sm">{transferAlias}</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyAlias}
                          className="flex items-center gap-1 rounded-xl bg-[#1A1A1A] px-3 py-1 text-[11px] font-semibold text-[#FAF6F0] hover:bg-[#C5A059] hover:text-[#1A1A1A] transition-colors"
                        >
                          {copiedAlias ? <Check className="h-3 w-3 text-[#D4AF37]" /> : <Copy className="h-3 w-3" />}
                          <span>{copiedAlias ? '¡Copiado!' : 'Copiar Alias'}</span>
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleSubmitPayment}
                      disabled={isProcessing}
                      className="w-full rounded-2xl bg-[#1A1A1A] py-3.5 text-xs font-semibold uppercase tracking-wider text-[#FAF6F0] shadow-md hover:bg-[#C5A059] hover:text-[#1A1A1A] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isProcessing ? 'Verificando...' : 'Confirmar Pedido y Enviar Comprobante'}
                    </button>
                  </div>
                )}

                {/* MERCADO PAGO VIEW */}
                {paymentMethod === 'mercadopago' && (
                  <div className="rounded-2xl bg-[#FFFDF9] p-4 border border-[#E5D7C5] text-center space-y-3 font-ui">
                    <p className="text-xs text-[#6B5E54]">
                      Aboná con dinero en cuenta de Mercado Pago o tarjetas en cuotas sin interés.
                    </p>
                    <button
                      type="button"
                      onClick={handleSubmitPayment}
                      disabled={isProcessing}
                      className="w-full rounded-2xl bg-[#009EE3] py-3.5 text-xs font-bold text-white shadow-md hover:bg-[#0089C7] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isProcessing ? 'Conectando...' : `Pagar $${total.toLocaleString('es-AR')} con Mercado Pago`}
                    </button>
                  </div>
                )}

                {/* CARD FORM */}
                {paymentMethod === 'card' && (
                  <form onSubmit={handleSubmitPayment} className="space-y-3 pt-1 font-ui">
                    <div>
                      <label className="text-[11px] font-semibold text-[#6B5E54] block mb-0.5">
                        Número de Tarjeta
                      </label>
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => handleCardNumberChange(e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className="w-full rounded-xl border border-[#E5D7C5] bg-[#FFFDF9] px-3 py-2 text-xs text-[#1A1A1A] focus:border-[#C5A059] focus:outline-hidden font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-[#6B5E54] block mb-0.5">
                          Vencimiento (MM/AA)
                        </label>
                        <input
                          type="text"
                          required
                          value={cardExpiry}
                          onChange={(e) => handleExpiryChange(e.target.value)}
                          placeholder="MM/AA"
                          className="w-full rounded-xl border border-[#E5D7C5] bg-[#FFFDF9] px-3 py-2 text-xs text-[#1A1A1A] focus:border-[#C5A059] focus:outline-hidden font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-[#6B5E54] block mb-0.5">
                          CVV
                        </label>
                        <input
                          type="password"
                          required
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                          placeholder="123"
                          className="w-full rounded-xl border border-[#E5D7C5] bg-[#FFFDF9] px-3 py-2 text-xs text-[#1A1A1A] focus:border-[#C5A059] focus:outline-hidden font-mono"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full rounded-2xl bg-[#1A1A1A] py-3.5 text-xs font-semibold uppercase tracking-wider text-[#FAF6F0] shadow-md hover:bg-[#C5A059] hover:text-[#1A1A1A] transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
                    >
                      {isProcessing ? 'Procesando...' : `Abonar $${total.toLocaleString('es-AR')} ARS`}
                    </button>
                  </form>
                )}
              </div>

              {/* Right Column: Order Summary (5 Cols) */}
              <div className="md:col-span-5 rounded-3xl bg-[#FFFDF9] p-5 border border-[#E5D7C5] text-[#1A1A1A] shadow-xs font-ui">
                <div className="flex items-center justify-between mb-3 border-b border-[#E5D7C5] pb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A39589]">
                    Resumen de Pedido
                  </span>
                  <span className="text-xs text-[#C5A059]">♥</span>
                </div>

                {/* Product preview */}
                <div className="flex gap-3 items-center border-b border-[#E5D7C5]/60 pb-3 mb-3">
                  <img
                    src={design.image}
                    alt={design.title}
                    referrerPolicy="no-referrer"
                    className="h-16 w-16 rounded-xl object-cover border border-[#E5D7C5]"
                  />
                  <div className="min-w-0">
                    <h4 className="font-prestige text-xs font-bold text-[#1A1A1A] truncate">{design.title}</h4>
                    <p className="text-[10px] text-[#6B5E54]">{preferences.hostsNames}</p>
                    <p className="font-romantic italic text-[11px] text-[#C5A059] font-medium">{preferences.eventDate}</p>
                  </div>
                </div>

                {/* Cost lines */}
                <div className="space-y-1.5 text-xs border-b border-[#E5D7C5]/60 pb-3 mb-3 text-[#6B5E54]">
                  <div className="flex justify-between">
                    <span>{LIORAH_PACKAGES[packageTier].title}:</span>
                    <span className="font-semibold text-[#1A1A1A]">${basePrice.toLocaleString('es-AR')}</span>
                  </div>

                  {rushDelivery && (
                    <div className="flex justify-between">
                      <span>Entrega Express 24h:</span>
                      <span className="font-semibold text-[#1A1A1A]">+$6.000</span>
                    </div>
                  )}

                  {individualPasses && (
                    <div className="flex justify-between">
                      <span>Pases individuales con nombres:</span>
                      <span className="font-semibold text-[#1A1A1A]">+$5.000</span>
                    </div>
                  )}

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#C5A059] font-semibold">
                      <span>Descuento ({appliedDiscount?.code}):</span>
                      <span>-${discountAmount.toLocaleString('es-AR')}</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">Total Final:</span>
                  <div className="text-right">
                    <span className="text-xl font-bold text-[#1A1A1A] tabular-nums block">
                      ${total.toLocaleString('es-AR')} ARS
                    </span>
                    <span className="font-ui text-[11px] font-semibold text-[#C5A059] block">
                      {equivalents.combined}
                    </span>
                    <span className="text-[10px] text-[#A39589]">Diseño personalizado incluido</span>
                  </div>
                </div>

                {/* Coupon Input Form */}
                <form onSubmit={handleApplyCoupon} className="mb-4">
                  <label className="text-[10px] font-semibold text-[#6B5E54] block mb-1">
                    ¿Tenés un cupón de descuento?
                  </label>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Ej. LIORAH10"
                      className="w-full rounded-xl border border-[#E5D7C5] bg-[#FAF6F0] px-2.5 py-1.5 text-xs text-[#1A1A1A] focus:border-[#C5A059] focus:outline-hidden uppercase"
                    />
                    <button
                      type="submit"
                      className="rounded-xl bg-[#1A1A1A] px-3 py-1.5 text-xs font-semibold text-[#FAF6F0] hover:bg-[#C5A059] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                    >
                      Aplicar
                    </button>
                  </div>
                  {couponError && <p className="text-[10px] text-rose-600 mt-1">{couponError}</p>}
                  {appliedDiscount && (
                    <p className="text-[10px] text-[#C5A059] mt-1 font-medium">
                      ✓ ¡Cupón {appliedDiscount.code} aplicado con éxito!
                    </p>
                  )}
                </form>

                {/* Trust Seal */}
                <div className="rounded-2xl bg-[#FAF6F0] p-3 border border-[#E5D7C5] text-[11px] text-[#6B5E54] space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-[#1A1A1A]">
                    <ShieldCheck className="h-4 w-4 text-[#C5A059]" />
                    <span>Estudio Boutique Certificado</span>
                  </div>
                  <p className="text-[10px] leading-relaxed">
                    Atención personalizada directa con Jimena y el equipo de LIORAH STUDIO.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
