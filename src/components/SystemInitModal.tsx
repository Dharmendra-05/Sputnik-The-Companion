import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface SystemInitModalProps {
  isOpen: boolean;
  onClose: () => void;
  autoClose?: boolean;
}

export const SystemInitModal: React.FC<SystemInitModalProps> = ({
  isOpen,
  onClose,
  autoClose = false,
}) => {
  const [progress, setProgress] = useState(78);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    if (autoClose) {
      // Simulate real boot sequence from 78% to 100%
      const timer1 = setTimeout(() => {
        setProgress(92);
      }, 400);

      const timer2 = setTimeout(() => {
        setProgress(100);
        setIsReady(true);
      }, 900);

      const timer3 = setTimeout(() => {
        onClose();
      }, 1400);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    } else {
      setProgress(100);
      setIsReady(true);
    }
  }, [isOpen, autoClose, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#171717]/40 backdrop-blur-xs flex items-center justify-center p-4">
      {/* Centered System Initialization Card (Width: 420px) matching screen.png */}
      <div className="relative w-full max-w-[420px] bg-white rounded-[12px] border border-[#ebebeb] shadow-xl p-8 transition-all animate-in fade-in zoom-in-95 duration-200">
        {/* Optional close button if user manually opened it */}
        {!autoClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#888888] hover:text-[#171717] p-1 rounded-md transition-colors"
            aria-label="Close telemetry modal"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Top Emblem: 56x56px rounded square */}
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 rounded-[10px] bg-[#fafafa] border border-[#ebebeb] flex items-center justify-center shadow-2xs">
            {/* Sputnik geometric satellite logo */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="28"
              height="28"
              fill="none"
              className="text-[#171717]"
            >
              <circle
                cx="12"
                cy="12"
                r="9.5"
                stroke="#171717"
                strokeWidth="2"
                strokeDasharray="8 6.92"
                strokeLinecap="round"
              />
              <line x1="17.1" y1="6.9" x2="15.4" y2="8.6" stroke="#171717" strokeWidth="1.75" strokeLinecap="round" />
              <line x1="17.1" y1="17.1" x2="15.4" y2="15.4" stroke="#171717" strokeWidth="1.75" strokeLinecap="round" />
              <line x1="6.9" y1="17.1" x2="8.6" y2="15.4" stroke="#171717" strokeWidth="1.75" strokeLinecap="round" />
              <line x1="6.9" y1="6.9" x2="8.6" y2="8.6" stroke="#171717" strokeWidth="1.75" strokeLinecap="round" />
              <circle cx="12" cy="12" r="3.75" stroke="#171717" strokeWidth="1.5" fill="#FFFFFF" />
              <circle cx="12" cy="12" r="1.5" fill="#171717" />
            </svg>
          </div>
        </div>

        {/* Identity Header & Monospace Institute Badge */}
        <div className="text-center mb-1">
          <div className="inline-flex items-center justify-center gap-2">
            <h1 className="text-[20px] font-semibold tracking-[-0.03em] text-[#171717] leading-tight">
              Sputnik
            </h1>
            <span className="font-mono text-[11px] font-medium tracking-tight text-[#4D4D4D] bg-[#F5F5F5] border border-[#ebebeb] px-2 py-0.5 rounded-[4px] uppercase">
              ABV-IIITM GWALIOR
            </span>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-[13px] text-[#888888] text-center tracking-[-0.01em] mb-6">
          Classical ML Intent Router &amp; Campus Navigation Engine
        </p>

        {/* Minimalist Progress Bar (4px height, 100px pill radius) */}
        <div className="mb-5">
          <div className="w-full h-1 bg-[#ebebeb] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#171717] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Telemetry Boot Checklist Box */}
        <div className="bg-[#fafafa] border border-[#ebebeb] rounded-[8px] p-3.5 mb-5 font-mono text-[12px] space-y-2.5">
          {/* Row 1: Verified Passages Indexed */}
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-[3px] bg-[#d1fae5] text-[#047857] shrink-0">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
            <span className="text-[#171717] tracking-tight truncate">
              Indexed 1,780 verified iiitm.ac.in passages
            </span>
          </div>

          {/* Row 2: Loaded Intent Router */}
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-[3px] bg-[#d1fae5] text-[#047857] shrink-0">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
            <span className="text-[#171717] tracking-tight truncate">
              Loaded 5-class Intent Router (LogReg · 8ms)
            </span>
          </div>

          {/* Row 3: Mounting Graph */}
          <div className="flex items-center gap-2.5">
            {isReady ? (
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-[3px] bg-[#d1fae5] text-[#047857] shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
            ) : (
              <span className="inline-flex items-center justify-center w-4 h-4 shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#171717] animate-pulse" />
              </span>
            )}
            <span className="text-[#171717] tracking-tight truncate">
              {isReady
                ? 'Mounted 14-vertex Dijkstra campus graph'
                : 'Mounting 14-vertex Dijkstra campus graph...'}
            </span>
          </div>
        </div>

        {/* Bottom Telemetry Footer Row */}
        <div className="flex items-center justify-between font-mono text-[11px] uppercase text-[#888888] tracking-wider pt-1 border-t border-[#ebebeb]">
          <span className="tracking-[0.05em]">ZERO-GPU · DETERMINISTIC ENGINE</span>
          <span className="font-medium text-[#171717]">{progress}%</span>
        </div>

        {/* Action Button if manually inspected */}
        {!autoClose && (
          <button
            onClick={onClose}
            className="w-full mt-5 py-2 px-3 text-xs font-semibold bg-[#171717] text-white rounded-md hover:bg-[#2E2E2E] transition-colors"
          >
            Continue to Application →
          </button>
        )}
      </div>
    </div>
  );
};
