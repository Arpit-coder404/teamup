import React from 'react';
import { Tape } from './Tape';

interface StickyNoteProps {
  children: React.ReactNode;
  color?: 'yellow' | 'mint' | 'coral' | 'blue';
  rotate?: string;
  className?: string;
  tape?: boolean;
  pin?: boolean;
}

export const StickyNote: React.FC<StickyNoteProps> = ({
  children,
  color = 'yellow',
  rotate = 'rotate-1',
  className = '',
  tape = true,
  pin = false,
}) => {
  const bgColors = {
    yellow: 'bg-[#F4D65E] text-[#1D1D1B]',
    mint: 'bg-[#CDE5D0] text-[#1D1D1B]',
    coral: 'bg-[#EF806D] text-[#FFFEFA]',
    blue: 'bg-[#E7EBFF] text-[#1D1D1B]',
  };

  return (
    <div
      className={`relative p-5 shadow-sticky transition-transform duration-200 hover:rotate-0 ${bgColors[color]} ${rotate} ${className}`}
      style={{
        boxShadow: '2px 5px 14px rgba(29, 29, 27, 0.09), 0 1px 3px rgba(29, 29, 27, 0.05)',
      }}
    >
      {tape && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Tape variant={color === 'yellow' ? 'neutral' : 'yellow'} width="w-20" rotate="rotate-1" />
        </div>
      )}

      {pin && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#EF806D] border-2 border-[#FFFEFA] shadow-sm flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#B84030]" />
        </div>
      )}

      <div className="font-handwritten text-lg leading-relaxed">{children}</div>
    </div>
  );
};

