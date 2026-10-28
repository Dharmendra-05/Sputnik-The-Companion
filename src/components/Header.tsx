import React from 'react';

export type ActiveTab = 'chat' | 'navigation';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  isBackendConnected?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  isBackendConnected = false,
}) => {
  return (
    <header className="sticky top-0 z-40 h-[56px] w-full bg-white border-b border-[#EBEBEB] px-4 md:px-8 flex items-center justify-between">
      {/* Left: Brand lockup */}
      <div className="flex items-center gap-2.5 shrink-0">
        <div className="w-7 h-7 rounded-md bg-[#171717] flex items-center justify-center text-white shrink-0">
          {/* Minimal geometric satellite icon */}
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M4.93 4.93 7.76 7.76" />
            <path d="m16.24 16.24 2.83 2.83" />
            <path d="M4.93 19.07 7.76 16.24" />
            <path d="m16.24 7.76 2.83-2.83" />
            <path d="M2 12h3" />
            <path d="M19 12h3" />
            <path d="M12 2v3" />
            <path d="M12 19v3" />
          </svg>
        </div>

        <span className="font-semibold text-[17px] tracking-[-0.03em] text-[#171717]">
          Sputnik
        </span>

        <span className="text-[11px] font-mono tracking-tight uppercase px-2 py-0.5 rounded bg-[#F5F5F5] text-[#555555] border border-[#EBEBEB]">
          ABV-IIITM GWALIOR
        </span>
      </div>

      {/* Right: Segmented View Switcher & Engine Badge */}
      <div className="flex items-center gap-3">
        <div className="flex items-center p-0.5 bg-[#F5F5F5] rounded-md border border-[#EBEBEB]">
          <button
            onClick={() => onTabChange('chat')}
            className={`px-3 py-1 text-xs font-medium rounded transition-all whitespace-nowrap ${
              activeTab === 'chat'
                ? 'bg-[#171717] text-white shadow-xs'
                : 'text-[#4D4D4D] hover:text-[#171717]'
            }`}
          >
            Ask Sputnik
          </button>
          <button
            onClick={() => onTabChange('navigation')}
            className={`px-3 py-1 text-xs font-medium rounded transition-all whitespace-nowrap ${
              activeTab === 'navigation'
                ? 'bg-[#171717] text-white shadow-xs'
                : 'text-[#4D4D4D] hover:text-[#171717]'
            }`}
          >
            Campus Walk Guide
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-[#888888] px-2 py-0.5 bg-[#FAFAFA] rounded border border-[#EBEBEB]">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isBackendConnected ? 'bg-emerald-500' : 'bg-[#171717]'
            }`}
          />
          <span>{isBackendConnected ? 'FastAPI Connected' : 'Local ML · 0 GPU'}</span>
        </div>
      </div>
    </header>
  );
};
