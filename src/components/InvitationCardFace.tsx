import React, { useState, useEffect } from 'react';
import { RealSampleItem } from '../data/realSamples';
import { getCustomThumbnail } from '../utils/customThumbnails';

interface InvitationCardFaceProps {
  sample: RealSampleItem;
  className?: string;
  isCompact?: boolean;
}

export const InvitationCardFace: React.FC<InvitationCardFaceProps> = ({
  sample,
  className = '',
  isCompact = false,
}) => {
  const [currentImage, setCurrentImage] = useState<string>(
    () => getCustomThumbnail(sample.id) || sample.image
  );
  const [isLoaded, setIsLoaded] = useState(false);

  // Sync image when sample changes
  useEffect(() => {
    setCurrentImage(getCustomThumbnail(sample.id) || sample.image);
    setIsLoaded(false);
  }, [sample.id, sample.image]);

  // Listen for real-time thumbnail updates from the upload modal
  useEffect(() => {
    const handleUpdate = (e: any) => {
      const detail = e.detail;
      if (detail?.resetAll || detail?.sampleId === sample.id) {
        setCurrentImage(getCustomThumbnail(sample.id) || sample.image);
      }
    };
    window.addEventListener('liorah-thumbnails-updated', handleUpdate);
    return () => window.removeEventListener('liorah-thumbnails-updated', handleUpdate);
  }, [sample.id, sample.image]);

  return (
    <div
      className={`relative w-full h-full select-none overflow-hidden bg-[#1A1A1A] font-ui ${className}`}
    >
      {/* High-Resolution Direct Mobile UI Screenshot / Custom Photo of the Web Invitation */}
      <img
        src={currentImage}
        alt={sample.title}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-80 blur-xs'
        }`}
      />

      {/* Subtle Bottom Glow Overlay for Readability */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
    </div>
  );
};

