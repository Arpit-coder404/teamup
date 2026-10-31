import React from 'react';

export const CurvedArrow: React.FC<{ className?: string; color?: string; flip?: boolean }> = ({
  className = '',
  color = '#1D1D1B',
  flip = false,
}) => (
  <svg
    viewBox="0 0 120 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${flip ? '-scale-x-100' : ''} ${className}`}
  >
    <path
      d="M10 55 C 40 68, 80 50, 105 18"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeDasharray="0"
    />
    <path
      d="M90 14 L 108 17 L 103 35"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ScribbleUnderline: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#F4D65E',
}) => (
  <svg
    viewBox="0 0 200 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full overflow-visible ${className}`}
  >
    <path
      d="M2 9 C 45 4, 110 13, 198 6 C 140 12, 70 14, 25 11"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const StarDoodle: React.FC<{ className?: string; color?: string; size?: number }> = ({
  className = '',
  color = '#1D1D1B',
  size = 24,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
  >
    <path
      d="M12 2 L 14 9 L 21 11 L 15 15 L 17 22 L 12 17 L 7 22 L 9 15 L 3 11 L 10 9 Z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SparkleDoodle: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#3457D5',
}) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block w-6 h-6 ${className}`}
  >
    <path
      d="M20 3 C 20 12, 28 20, 37 20 C 28 20, 20 28, 20 37 C 20 28, 12 20, 3 20 C 12 20, 20 12, 20 3 Z"
      fill={color}
    />
  </svg>
);

export const CircledScribble: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#EF806D',
}) => (
  <svg
    viewBox="0 0 160 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`absolute pointer-events-none ${className}`}
  >
    <path
      d="M20 32 C 12 15, 60 5, 120 10 C 155 14, 155 42, 115 50 C 60 58, 8 45, 15 28 C 22 10, 85 8, 140 18"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export const PaperClip: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="22"
    height="48"
    viewBox="0 0 24 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block select-none pointer-events-none drop-shadow-sm ${className}`}
  >
    <path
      d="M8 12 V 38 C 8 43, 16 43, 16 38 V 8 C 16 3, 4 3, 4 12 V 42 C 4 48, 20 48, 20 40 V 15"
      stroke="#7A7870"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

