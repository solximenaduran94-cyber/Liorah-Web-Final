import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { GallerySection } from './components/GallerySection';
import { CustomizerSection } from './components/CustomizerSection';
import { HowItWorks } from './components/HowItWorks';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { PhoneMockupPreview } from './components/PhoneMockupPreview';
import { CheckoutModal } from './components/CheckoutModal';
import { RealSamplesSection } from './components/RealSamplesSection';
import { RealSampleViewerModal } from './components/RealSampleViewerModal';
import { PricingProposalsSection } from './components/PricingProposalsSection';
import { FeaturesShowcaseSection } from './components/FeaturesShowcaseSection';
import { SavingsCalculatorSection } from './components/SavingsCalculatorSection';
import { INVITATION_CATALOG } from './data/invitations';
import { RealSampleItem } from './data/realSamples';
import { InvitationDesign, DesignPreferences, LiorahPackageTier } from './types';
import { getCustomThumbnail } from './utils/customThumbnails';
import { X, Sparkles, MessageCircle, Heart } from 'lucide-react';

export default function App() {
  const [selectedDesign, setSelectedDesign] = useState<InvitationDesign>(INVITATION_CATALOG[0]);
  const [demoModalDesign, setDemoModalDesign] = useState<InvitationDesign | null>(null);
  const [realSampleViewerItem, setRealSampleViewerItem] = useState<RealSampleItem | null>(null);
  const [selectedTier, setSelectedTier] = useState<LiorahPackageTier>('interactive');
  const [checkoutData, setCheckoutData] = useState<{
    isOpen: boolean;
    design: InvitationDesign;
    preferences: DesignPreferences;
    initialTier?: LiorahPackageTier;
  } | null>(null);

  const handleSelectAndCustomize = (design: InvitationDesign) => {
    setSelectedDesign(design);
    const element = document.getElementById('personalizador');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSampleToCustomize = (sample: RealSampleItem) => {
    // Map the real sample to a matching catalog design base or set it as active
    let matching = INVITATION_CATALOG.find((d) => d.category === sample.category);
    if (!matching) {
      matching = INVITATION_CATALOG[0];
    }
    const sampleImage = getCustomThumbnail(sample.id) || sample.image;
    // Create an enhanced design entry reflecting the sample
    const customizedBase: InvitationDesign = {
      ...matching,
      id: `custom-from-${sample.id}`,
      title: `Inspirado en ${sample.title}`,
      tagline: sample.tagline,
      paletteColors: sample.paletteColors,
      image: sampleImage,
      demoData: {
        ...matching.demoData,
        hostsNames: sample.celebrant,
        subtitle: sample.tagline,
      },
    };
    setSelectedDesign(customizedBase);
    setRealSampleViewerItem(null);
    const element = document.getElementById('personalizador');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartCustomizing = () => {
    const element = document.getElementById('personalizador');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTier = (tier: LiorahPackageTier) => {
    setSelectedTier(tier);
    const element = document.getElementById('personalizador');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreGallery = () => {
    const element = document.getElementById('muestras-reales');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProceedToCheckout = (preferences: DesignPreferences, design: InvitationDesign) => {
    setCheckoutData({
      isOpen: true,
      design,
      preferences,
      initialTier: selectedTier,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-800">
      {/* Promotional Top Trust Bar */}
      <div className="bg-[#1C1A19] text-[#E8D8C3] py-2 px-4 text-center text-xs font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-amber-400" />
        <span>Apertura Temporada 2026: Usa el cupón <strong>LIORAH10</strong> para 10% de descuento en tu invitación web interactiva</span>
      </div>

      {/* Main Top Header */}
      <Header onStartCustomizing={handleStartCustomizing} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreGallery={handleExploreGallery}
          onOpenHeroDemo={() => setDemoModalDesign(selectedDesign)}
        />

        {/* Real Live Samples Showcase (Customer Portfolio with Live Links) */}
        <RealSamplesSection
          onSelectSampleToCustomize={handleSelectSampleToCustomize}
          onOpenSampleViewer={(sample) => setRealSampleViewerItem(sample)}
        />

        {/* All Web Invitation Features Showcase & Interactive Simulator */}
        <FeaturesShowcaseSection />

        {/* Digital vs. Traditional Print Savings Calculator */}
        <SavingsCalculatorSection />

        {/* Pricing Proposals Grid ($60.000 ARS / $50 USD / $990 MXN) */}
        <PricingProposalsSection onSelectTier={handleSelectTier} />

        {/* Catalog Designs Gallery */}
        <GallerySection
          onSelectAndCustomize={handleSelectAndCustomize}
          onOpenLiveDemo={(design) => setDemoModalDesign(design)}
        />

        {/* Customizer Section */}
        <CustomizerSection
          selectedDesign={selectedDesign}
          onSelectDesign={setSelectedDesign}
          onProceedToCheckout={handleProceedToCheckout}
        />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Customer Reviews & Comments Section */}
        <ReviewsSection />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* FLOATING WHATSAPP ASSISTANT BUTTON */}
      <aside aria-label="Contacto directo por WhatsApp" className="fixed bottom-6 right-6 z-30">
        <a
          href="https://wa.me/5491123456789?text=Hola%20LIORAH%20STUDIO!%20Quisiera%20asesoramiento%20sobre%20las%20invitaciones%20digitales%20personalizadas"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-3 text-xs font-bold text-white shadow-xl hover:bg-emerald-700 transition-all hover:scale-105"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="hidden sm:inline">¿Dudas? Escribinos por WhatsApp</span>
        </a>
      </aside>

      {/* LIVE DEMO MODAL IN SMARTPHONE */}
      {demoModalDesign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative my-auto flex flex-col items-center">
            {/* Close button at top right */}
            <button
              type="button"
              onClick={() => setDemoModalDesign(null)}
              className="absolute -top-10 right-0 sm:-right-10 rounded-full bg-white/20 p-2 text-white hover:bg-white/40 transition-colors cursor-pointer"
              aria-label="Cerrar demo"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="mb-3 text-center text-white">
              <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-300">
                Demostración Interactiva en Vivo
              </span>
              <h3 className="font-display text-xl font-bold">{demoModalDesign.title}</h3>
            </div>

            <PhoneMockupPreview
              design={demoModalDesign}
              showInModal={true}
              onClose={() => setDemoModalDesign(null)}
            />
          </div>
        </div>
      )}

      {/* REAL SAMPLE LIVE VIEWER MODAL */}
      {realSampleViewerItem && (
        <RealSampleViewerModal
          sample={realSampleViewerItem}
          onClose={() => setRealSampleViewerItem(null)}
          onSelectToCustomize={handleSelectSampleToCustomize}
        />
      )}

      {/* CHECKOUT & PAYMENT MODAL */}
      {checkoutData?.isOpen && (
        <CheckoutModal
          design={checkoutData.design}
          preferences={checkoutData.preferences}
          initialTier={checkoutData.initialTier}
          onClose={() => setCheckoutData(null)}
        />
      )}
    </div>
  );
}
