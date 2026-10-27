import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Upload,
  Link as LinkIcon,
  RotateCcw,
  Check,
  Smartphone,
  Sparkles,
  Image as ImageIcon,
  AlertCircle,
  ChevronDown
} from 'lucide-react';
import { REAL_SAMPLES, RealSampleItem } from '../data/realSamples';
import {
  getCustomThumbnail,
  saveCustomThumbnail,
  removeCustomThumbnail,
  optimizeImageFile
} from '../utils/customThumbnails';
import { playInvitationOpenChime } from '../utils/audioSynth';

interface ThumbnailUploadModalProps {
  sample: RealSampleItem;
  isOpen: boolean;
  onClose: () => void;
  onSaved?: (sampleId: string, newImage: string) => void;
}

export const ThumbnailUploadModal: React.FC<ThumbnailUploadModalProps> = ({
  sample: initialSample,
  isOpen,
  onClose,
  onSaved,
}) => {
  const [selectedSample, setSelectedSample] = useState<RealSampleItem>(initialSample);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [urlInput, setUrlInput] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync with prop when opened or changed
  useEffect(() => {
    setSelectedSample(initialSample);
  }, [initialSample]);

  // Load custom thumbnail or default sample image
  useEffect(() => {
    const existingCustom = getCustomThumbnail(selectedSample.id);
    setPreviewImage(existingCustom || selectedSample.image);
    setUrlInput('');
    setErrorMessage(null);
    setSuccessNotice(null);
  }, [selectedSample]);

  if (!isOpen) return null;

  const hasCustomThumbnail = Boolean(getCustomThumbnail(selectedSample.id));

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processFile(file);
  };

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Por favor seleccioná un archivo de imagen válido (PNG, JPG, JPEG, WEBP).');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    try {
      const optimizedDataUrl = await optimizeImageFile(file);
      setPreviewImage(optimizedDataUrl);
      setSuccessNotice('¡Foto cargada en la vista previa! Hacé clic en "Guardar esta miniatura" para aplicarla.');
    } catch (err: any) {
      setErrorMessage(err.message || 'No se pudo procesar la imagen seleccionada.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) {
      setErrorMessage('Ingresá una URL de imagen válida.');
      return;
    }
    const testImg = new Image();
    testImg.onload = () => {
      setPreviewImage(urlInput.trim());
      setSuccessNotice('¡Imagen cargada desde enlace! Hacé clic en "Guardar esta miniatura" para aplicarla.');
      setErrorMessage(null);
    };
    testImg.onerror = () => {
      setErrorMessage('No se pudo cargar la imagen desde ese enlace. Verificá que sea una URL directa de imagen.');
    };
    testImg.src = urlInput.trim();
  };

  const handleSave = () => {
    if (!previewImage) return;
    try {
      saveCustomThumbnail(selectedSample.id, previewImage);
      playInvitationOpenChime();
      setSuccessNotice('¡Miniatura guardada con éxito! Ya se ve reflejada en todas partes.');
      if (onSaved) {
        onSaved(selectedSample.id, previewImage);
      }
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err: any) {
      setErrorMessage('Error al guardar en el navegador. La imagen puede ser demasiado grande.');
    }
  };

  const handleResetToDefault = () => {
    removeCustomThumbnail(selectedSample.id);
    setPreviewImage(selectedSample.image);
    setSuccessNotice('Se restableció la imagen original de la invitación.');
    setErrorMessage(null);
    if (onSaved) {
      onSaved(selectedSample.id, selectedSample.image);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl bg-[#FFFDF9] text-stone-800 shadow-2xl border border-[#E5D7C5] overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E5D7C5] bg-[#FAF6F0] px-5 sm:px-7 py-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-[#1A1A1A] text-amber-300 flex items-center justify-center shadow-xs">
              <Upload className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-prestige text-lg sm:text-xl font-bold text-[#1A1A1A] tracking-wide">
                Cambiar Foto de Miniatura
              </h3>
              <p className="font-ui text-xs text-[#6B5E54]">
                Subí tu propia captura o foto para la invitación seleccionada
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-stone-400 hover:bg-stone-200 hover:text-stone-800 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body: Left Control Panel + Right Smartphone Preview */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form & Upload Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Invitation Selector */}
            <div>
              <label className="block font-ui text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                Invitación a personalizar:
              </label>
              <div className="relative">
                <select
                  value={selectedSample.id}
                  onChange={(e) => {
                    const found = REAL_SAMPLES.find((s) => s.id === e.target.value);
                    if (found) setSelectedSample(found);
                  }}
                  className="w-full appearance-none rounded-2xl border border-[#E5D7C5] bg-white px-4 py-3 pr-10 text-sm font-semibold text-stone-800 shadow-2xs focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                >
                  {REAL_SAMPLES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.celebrant} — {s.title} ({s.category})
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-stone-500">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-1 font-ui text-[11px] text-[#A39589]">
                Podés elegir cualquier invitación de la lista para cambiarle la foto.
              </p>
            </div>

            {/* Mode Tabs */}
            <div className="flex items-center gap-2 border-b border-[#E5D7C5] pb-2 font-ui">
              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'upload'
                    ? 'bg-[#1A1A1A] text-[#FAF6F0]'
                    : 'text-[#6B5E54] hover:bg-[#F5EFE6]'
                }`}
              >
                <Upload className="h-3.5 w-3.5" />
                <span>Subir archivo desde mi dispositivo</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('url')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'url'
                    ? 'bg-[#1A1A1A] text-[#FAF6F0]'
                    : 'text-[#6B5E54] hover:bg-[#F5EFE6]'
                }`}
              >
                <LinkIcon className="h-3.5 w-3.5" />
                <span>Pegar enlace web (URL)</span>
              </button>
            </div>

            {/* TAB 1: File Upload / Drag & Drop */}
            {activeTab === 'upload' && (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
                  isDragging
                    ? 'border-amber-500 bg-amber-500/10'
                    : 'border-[#D9C8B5] bg-[#FAF6F0]/60 hover:border-[#C5A059] hover:bg-[#FAF6F0]'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="h-14 w-14 rounded-2xl bg-[#FFFDF9] border border-[#E5D7C5] shadow-xs flex items-center justify-center text-[#C5A059] mb-3">
                  <ImageIcon className="h-7 w-7" />
                </div>

                <p className="font-prestige font-bold text-sm sm:text-base text-[#1A1A1A]">
                  Hacé clic para seleccionar una foto o arrastrala aquí
                </p>
                <p className="font-ui text-xs text-[#6B5E54] mt-1">
                  Formatos soportados: JPG, PNG o WebP. Se optimiza automáticamente para cargar al instante.
                </p>

                <button
                  type="button"
                  className="mt-4 rounded-xl bg-[#1A1A1A] px-4 py-2 text-xs font-semibold text-white tracking-wide uppercase font-ui shadow-xs pointer-events-none"
                >
                  Elegir foto de mi equipo
                </button>
              </div>
            )}

            {/* TAB 2: Image URL */}
            {activeTab === 'url' && (
              <div className="space-y-3 bg-[#FAF6F0]/60 rounded-3xl p-5 border border-[#E5D7C5]">
                <label className="block font-ui text-xs font-semibold text-[#1A1A1A]">
                  Enlace directo a la imagen (https://...):
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://ejemplo.com/foto-invitacion.jpg"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="flex-1 rounded-xl border border-[#E5D7C5] bg-white px-3.5 py-2.5 text-xs text-stone-800 focus:border-[#C5A059] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyUrl}
                    className="rounded-xl bg-[#1A1A1A] px-4 py-2.5 text-xs font-bold text-amber-300 font-ui hover:bg-stone-900 transition-colors cursor-pointer shrink-0"
                  >
                    Cargar
                  </button>
                </div>
                <p className="font-ui text-[11px] text-[#A39589]">
                  Asegurate de que sea un enlace que termine en .jpg, .png o .webp.
                </p>
              </div>
            )}

            {/* Error & Success Feedback */}
            {errorMessage && (
              <div className="rounded-2xl bg-rose-50 border border-rose-200 p-3.5 flex items-center gap-2 text-rose-700 text-xs font-ui">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successNotice && (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-3.5 flex items-center gap-2 text-emerald-800 text-xs font-ui">
                <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>{successNotice}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={handleSave}
                disabled={isLoading}
                className="flex-1 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold py-3.5 px-5 text-xs tracking-wider uppercase shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer font-ui active:scale-95 disabled:opacity-50"
              >
                <Check className="h-4 w-4 text-stone-950" />
                <span>Guardar esta foto como miniatura</span>
              </button>

              {hasCustomThumbnail && (
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="rounded-2xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 font-semibold py-3.5 px-4 text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer font-ui"
                >
                  <RotateCcw className="h-3.5 w-3.5 text-stone-500" />
                  <span>Restablecer original</span>
                </button>
              )}
            </div>

            <div className="rounded-2xl bg-[#F5EAEB]/40 border border-[#E5D7C5] p-3 text-[11px] text-[#6B5E54] font-ui leading-relaxed">
              💡 <strong>Tip para el mejor resultado:</strong> La miniatura se muestra en formato vertical 9:16 (como una pantalla de teléfono). Si subís una captura de pantalla directa de tu invitación, se verá idéntica a la real.
            </div>
          </div>

          {/* Right Column: Smartphone Live Mockup Preview (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <span className="font-ui text-xs font-bold text-[#A39589] uppercase tracking-wider mb-2">
              Vista previa en pantalla
            </span>

            {/* Smartphone frame */}
            <div className="relative aspect-[9/16] w-full max-w-[270px] overflow-hidden rounded-[38px] bg-[#1A1A1A] p-2.5 border-4 border-[#2D2A28] shadow-2xl">
              {/* Dynamic Island Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 h-3 w-16 rounded-full bg-black flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-slate-900 ring-1 ring-slate-800" />
              </div>

              {/* Screen Content */}
              <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-stone-900">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Vista previa miniatura"
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 text-stone-400 text-center font-ui text-xs">
                    <ImageIcon className="h-8 w-8 mb-2 opacity-50" />
                    <span>Sin imagen seleccionada</span>
                  </div>
                )}

                {/* Subtle custom indicator badge */}
                {hasCustomThumbnail && (
                  <div className="absolute top-7 left-3 z-20 rounded-full bg-amber-400 text-stone-950 font-bold px-2 py-0.5 text-[9px] uppercase tracking-wider font-ui shadow-md">
                    Foto personalizada
                  </div>
                )}
              </div>
            </div>

            <p className="mt-3 text-center font-prestige text-xs font-semibold text-[#1A1A1A]">
              {selectedSample.celebrant} · {selectedSample.title}
            </p>
            <p className="text-center font-ui text-[11px] text-[#A39589]">
              Así se verá en la galería y en el simulador
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#E5D7C5] bg-[#FAF6F0] px-6 py-3 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 font-semibold px-5 py-2 text-xs font-ui transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
