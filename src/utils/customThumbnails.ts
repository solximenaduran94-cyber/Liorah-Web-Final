const STORAGE_KEY = 'liorah_custom_thumbnails_v1';

export function getCustomThumbnails(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.warn('Error reading custom thumbnails from localStorage:', err);
    return {};
  }
}

export function getCustomThumbnail(sampleId: string): string | null {
  const all = getCustomThumbnails();
  return all[sampleId] || null;
}

export function saveCustomThumbnail(sampleId: string, imageData: string): void {
  try {
    const all = getCustomThumbnails();
    all[sampleId] = imageData;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent('liorah-thumbnails-updated', { detail: { sampleId, imageData } }));
  } catch (err) {
    console.error('Error saving custom thumbnail to localStorage:', err);
    throw err;
  }
}

export function removeCustomThumbnail(sampleId: string): void {
  try {
    const all = getCustomThumbnails();
    if (all[sampleId]) {
      delete all[sampleId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
      window.dispatchEvent(new CustomEvent('liorah-thumbnails-updated', { detail: { sampleId } }));
    }
  } catch (err) {
    console.error('Error removing custom thumbnail:', err);
  }
}

export function resetAllCustomThumbnails(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('liorah-thumbnails-updated', { detail: { resetAll: true } }));
  } catch (err) {
    console.error('Error resetting custom thumbnails:', err);
  }
}

/**
 * Resizes an uploaded image file to optimal dimensions (max 1080x1920) and outputs a web-optimized JPEG data URL
 * to avoid exceeding localStorage limits while maintaining crystal-clear quality for phone mockups.
 */
export function optimizeImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('No se pudo leer el archivo de imagen.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('El archivo seleccionado no es una imagen válida.'));
      img.onload = () => {
        const maxWidth = 900;
        const maxHeight = 1600;
        let { width, height } = img;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }

        // Draw image smoothly
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
        resolve(dataUrl);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
