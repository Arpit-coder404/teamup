import React from 'react';

interface TapeProps {
  className?: string;
  variant?: 'yellow' | 'neutral' | 'mint' | 'coral' | 'blue';
  rotate?: string;
  width?: string;
}

export const Tape: React.FC<TapeProps> = ({
  className = '',
  variant = 'neutral',
  rotate = '-rotate-2',
  width = 'w-24',
}) => {
  const variantStyles = {
    yellow: 'bg-[#F4D65E]/60 border-[#D8BC45]/30',
    neutral: 'bg-[#EAE4D7]/75 border-[#D0C8B8]/40',
    mint: 'bg-[#CDE5D0]/70 border-[#B0D2B4]/40',
    coral: 'bg-[#EF806D]/45 border-[#D86855]/30',
    blue: 'bg-[#3457D5]/25 border-[#3457D5]/30',
  };

  return (
    <div
      className={`h-5 ${width} ${rotate} ${variantStyles[variant]} backdrop-blur-[0.5px] border-l border-r border-dashed shadow-sm pointer-events-none select-none z-20 ${className}`}
      style={{
        clipPath: 'polygon(0% 4%, 4% 0%, 96% 0%, 100% 4%, 98% 50%, 100% 96%, 96% 100%, 4% 100%, 0% 96%, 2% 50%)',
      }}
    />
  );
};

