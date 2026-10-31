import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start space-x-3 p-4 bg-[#FFFEFA] border border-[#E6E0D5] rounded-none shadow-lifted transition-all transform animate-in fade-in slide-in-from-bottom-2 duration-200"
          style={{
            borderLeft: `4px solid ${
              toast.type === 'success'
                ? '#3457D5'
                : toast.type === 'error'
                ? '#EF806D'
                : toast.type === 'warning'
                ? '#F4D65E'
                : '#74716A'
            }`,
          }}
        >
          <div className="flex-shrink-0 mt-0.5">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-cobalt" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-scrapbook-coral" />}
            {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-[#C9A208]" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-ink-secondary" />}
          </div>
          <div className="flex-1 text-sm text-ink-primary font-medium leading-snug">
            {toast.text}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 text-ink-secondary hover:text-ink-primary transition-colors p-0.5"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

