import React from 'react';
import { Tape } from './Tape';

interface PolaroidProps {
  image: string;
  alt: string;
  caption?: string;
  rotate?: string;
  className?: string;
  tape?: boolean;
  tapeVariant?: 'yellow' | 'neutral' | 'mint' | 'coral' | 'blue';
  tapePosition?: 'top' | 'top-left' | 'top-right';
}

export const Polaroid: React.FC<PolaroidProps> = ({
  image,
  alt,
  caption,
  rotate = 'rotate-1',
  className = '',
  tape = true,
  tapeVariant = 'neutral',
  tapePosition = 'top',
}) => {
  return (
    <div
      className={`relative inline-block bg-[#FFFEFA] p-3 pb-8 shadow-polaroid border border-[#ECE7DC] transition-all duration-300 hover:rotate-0 hover:scale-[1.02] hover:shadow-lifted ${rotate} ${className}`}
    >
      {tape && (
        <div
          className={`absolute z-30 ${
            tapePosition === 'top'
              ? '-top-3 left-1/2 -translate-x-1/2'
              : tapePosition === 'top-left'
              ? '-top-3 -left-3 -rotate-12'
              : '-top-3 -right-3 rotate-12'
          }`}
        >
          <Tape variant={tapeVariant} width="w-20" rotate={tapePosition === 'top' ? '-rotate-1' : ''} />
        </div>
      )}

      <div className="overflow-hidden bg-[#ECE7DC] aspect-[4/3] sm:aspect-square w-full">
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>

      {caption && (
        <div className="pt-3 text-center">
          <span className="font-handwritten text-lg text-ink-primary block leading-tight">
            {caption}
          </span>
        </div>
      )}
    </div>
  );
};

