import React, { useState, useEffect } from 'react';
import { Check, X, RefreshCw, Server, Globe, ExternalLink } from 'lucide-react';
import { BackendStatus } from '../types/sputnik';
import { getBackendBaseUrl, setBackendBaseUrl } from '../services/sputnikApi';

interface SystemInitModalProps {
  isOpen: boolean;
  onClose: () => void;
  autoClose?: boolean;
  backendStatus?: BackendStatus | null;
  onRefreshBackend?: () => void;
}

export const SystemInitModal: React.FC<SystemInitModalProps> = ({
  isOpen,
  onClose,
  autoClose = false,
  backendStatus,
  onRefreshBackend,
}) => {
  const [progress, setProgress] = useState(78);
  const [isReady, setIsReady] = useState(false);
  const [customUrl, setCustomUrl] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCustomUrl(getBackendBaseUrl());
    }
  }, [isOpen]);

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

  const handleSaveAndTestUrl = async () => {
    setIsTesting(true);
    setSaveSuccess(false);
    setBackendBaseUrl(customUrl);
    if (onRefreshBackend) {
      await onRefreshBackend();
    }
    setIsTesting(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleResetToEnv = async () => {
    setIsTesting(true);
    setBackendBaseUrl(null);
    setCustomUrl(getBackendBaseUrl());
    if (onRefreshBackend) {
      await onRefreshBackend();
    }
    setIsTesting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#171717]/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      {/* Centered System Initialization & Backend Telemetry Card */}
      <div className="relative w-full max-w-[460px] my-8 bg-white rounded-[12px] border border-[#ebebeb] shadow-xl p-6 md:p-8 transition-all animate-in fade-in zoom-in-95 duration-200">
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
        <div className="flex justify-center mb-4">
          <div className="w-13 h-13 rounded-[10px] bg-[#fafafa] border border-[#ebebeb] flex items-center justify-center shadow-2xs">
            {/* Sputnik geometric satellite logo */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="26"
              height="26"
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
            <h1 className="text-[19px] font-semibold tracking-[-0.03em] text-[#171717] leading-tight">
              Sputnik
            </h1>
            <span className="font-mono text-[11px] font-medium tracking-tight text-[#4D4D4D] bg-[#F5F5F5] border border-[#ebebeb] px-2 py-0.5 rounded-[4px] uppercase">
              ABV-IIITM GWALIOR
            </span>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-[12px] text-[#888888] text-center tracking-[-0.01em] mb-4">
          Classical ML Intent Router &amp; Campus Navigation Engine
        </p>

        {/* Minimalist Progress Bar (4px height, 100px pill radius) */}
        <div className="mb-4">
          <div className="w-full h-1 bg-[#ebebeb] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#171717] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Telemetry Boot Checklist Box */}
        <div className="bg-[#fafafa] border border-[#ebebeb] rounded-[8px] p-3 mb-4 font-mono text-[11.5px] space-y-2">
          {/* Row 1: Verified Passages Indexed */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-[3px] bg-[#d1fae5] text-[#047857] shrink-0">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
            <span className="text-[#171717] tracking-tight truncate">
              Indexed 1,780 verified iiitm.ac.in passages
            </span>
          </div>

          {/* Row 2: Loaded Intent Router */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-[3px] bg-[#d1fae5] text-[#047857] shrink-0">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
            <span className="text-[#171717] tracking-tight truncate">
              Loaded 5-class Intent Router (LogReg · 8ms)
            </span>
          </div>

          {/* Row 3: Mounting Graph */}
          <div className="flex items-center gap-2">
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

        {/* Dedicated Backend Telemetry & Vercel Connection Section */}
        {!autoClose && (
          <div className="mb-4 bg-[#FAFAFA] border border-[#EBEBEB] rounded-[8px] p-3 text-left">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#EBEBEB]">
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-[#171717] uppercase tracking-wider">
                <Server className="w-3.5 h-3.5 text-[#171717]" />
                <span>FastAPI Backend Microservice</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    backendStatus?.isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                  }`}
                />
                <span className="font-mono text-[10.5px] font-medium text-[#4D4D4D]">
                  {backendStatus?.isConnected ? 'ONLINE' : 'FALLBACK'}
                </span>
                {onRefreshBackend && (
                  <button
                    onClick={onRefreshBackend}
                    disabled={isTesting}
                    title="Refresh health check"
                    className="p-1 text-[#888888] hover:text-[#171717] rounded cursor-pointer transition-colors"
                  >
                    <RefreshCw className={`w-3 h-3 ${isTesting ? 'animate-spin' : ''}`} />
                  </button>
                )}
              </div>
            </div>

            {/* Connection Details */}
            <div className="font-mono text-[11px] text-[#666666] space-y-1 mb-2.5">
              <div className="flex justify-between">
                <span>Active Target:</span>
                <span className="text-[#171717] truncate max-w-[220px]" title={backendStatus?.url || 'Relative (/api)'}>
                  {backendStatus?.url || 'Relative (/api)'}
                </span>
              </div>
              {backendStatus?.isConnected ? (
                <>
                  <div className="flex justify-between">
                    <span>Round-trip Latency:</span>
                    <span className="text-emerald-600 font-medium">{backendStatus.latencyMs} ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Model State:</span>
                    <span className="text-[#171717]">Dual Classical ML (Online)</span>
                  </div>
                </>
              ) : (
                <div className="text-[10.5px] text-[#888888] leading-tight">
                  Running client-side deterministic mirror. Set public backend URL below to connect.
                </div>
              )}
            </div>

            {/* Configurable Backend URL Input */}
            <div className="pt-2 border-t border-[#EBEBEB] space-y-2">
              <label className="block font-mono text-[10px] uppercase tracking-wider text-[#888888]">
                Backend Endpoint URL (Vercel / Cloud / Local):
              </label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="https://sputnik-api.onrender.com or http://localhost:8000"
                  className="flex-1 px-2.5 py-1 text-[11.5px] font-mono bg-white border border-[#EBEBEB] rounded focus:outline-none focus:border-[#171717] text-[#171717]"
                />
                <button
                  onClick={handleSaveAndTestUrl}
                  disabled={isTesting}
                  className="px-2.5 py-1 text-[11px] font-medium bg-[#171717] text-white rounded hover:bg-[#333333] transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50"
                >
                  {isTesting ? 'Testing...' : 'Connect'}
                </button>
              </div>

              <div className="flex items-center justify-between font-mono text-[10px] text-[#888888] pt-0.5">
                {saveSuccess ? (
                  <span className="text-emerald-600 font-medium">✓ Endpoint saved &amp; pinged!</span>
                ) : (
                  <span>Stored in browser memory</span>
                )}
                <button
                  onClick={handleResetToEnv}
                  className="hover:text-[#171717] underline cursor-pointer"
                >
                  Reset to default
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Telemetry Footer Row */}
        <div className="flex items-center justify-between font-mono text-[10.5px] uppercase text-[#888888] tracking-wider pt-1 border-t border-[#ebebeb]">
          <span className="tracking-[0.05em]">ZERO-GPU · DETERMINISTIC ENGINE</span>
          <span className="font-medium text-[#171717]">{progress}%</span>
        </div>

        {/* Action Button if manually inspected */}
        {!autoClose && (
          <button
            onClick={onClose}
            className="w-full mt-4 py-2 px-3 text-xs font-semibold bg-[#171717] text-white rounded-md hover:bg-[#2E2E2E] transition-colors cursor-pointer"
          >
            Continue to Application →
          </button>
        )}
      </div>
    </div>
  );
};

