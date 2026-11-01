import React from 'react';

export type ActiveTab = 'chat' | 'navigation' | 'feedback';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  isBackendConnected?: boolean;
  onOpenSystemInit?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  isBackendConnected = false,
  onOpenSystemInit,
}) => {
  return (
    <header className="sticky top-0 z-40 h-[56px] w-full bg-white border-b border-[#EBEBEB] px-4 md:px-6 flex items-center justify-between">
      {/* Left: Brand lockup */}
      <div
        className="flex items-center gap-2.5 shrink-0 cursor-pointer select-none"
        onClick={onOpenSystemInit}
        title="Click to view System Initialization Telemetry"
      >
        <div className="w-[22px] h-[22px] flex items-center justify-center text-[#171717] shrink-0" aria-hidden="true">
          {/* Sputnik geometric satellite icon from master design specification */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            className="shrink-0"
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

        <span className="font-semibold text-[17px] tracking-[-0.4px] text-[#171717]">
          Sputnik
        </span>

        <span className="text-[11px] font-mono tracking-[0.2px] uppercase px-2 py-0.5 rounded bg-[#F5F5F5] text-[#4D4D4D] border border-[#EBEBEB] font-medium">
          ABV-IIITM GWALIOR
        </span>
      </div>

      {/* Center/Right: Segmented 3-tab view switcher pill */}
      <div className="flex items-center gap-3">
        <nav
          className="inline-flex items-center bg-[#F5F5F5] p-[3px] rounded-[6px] border border-[#EBEBEB] gap-[2px]"
          aria-label="Application View"
        >
          <button
            onClick={() => onTabChange('chat')}
            className={`px-3 py-1 text-[13px] font-medium rounded transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'chat'
                ? 'bg-[#171717] text-white shadow-xs'
                : 'text-[#4D4D4D] hover:text-[#171717]'
            }`}
          >
            Ask Sputnik
          </button>
          <button
            onClick={() => onTabChange('navigation')}
            className={`px-3 py-1 text-[13px] font-medium rounded transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'navigation'
                ? 'bg-[#171717] text-white shadow-xs'
                : 'text-[#4D4D4D] hover:text-[#171717]'
            }`}
          >
            Campus Walk Guide
          </button>
          <button
            onClick={() => onTabChange('feedback')}
            className={`px-3 py-1 text-[13px] font-medium rounded transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'feedback'
                ? 'bg-[#171717] text-white shadow-xs'
                : 'text-[#4D4D4D] hover:text-[#171717]'
            }`}
          >
            Feedback &amp; Corpus
          </button>
        </nav>

        {/* Engine status indicator */}
        <div
          onClick={onOpenSystemInit}
          className="flex items-center gap-1.5 text-[11px] font-mono text-[#888888] px-2 py-0.5 bg-[#FAFAFA] hover:bg-[#F5F5F5] rounded border border-[#EBEBEB] cursor-pointer transition-colors"
          title={
            isBackendConnected
              ? 'FastAPI Microservice Online · Click to view backend telemetry & endpoints'
              : 'Deterministic Local ML Engine · Click to connect to FastAPI microservice'
          }
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isBackendConnected ? 'bg-emerald-500 animate-pulse shadow-xs shadow-emerald-500/50' : 'bg-[#171717]'
            }`}
          />
          <span className="hidden sm:inline">
            {isBackendConnected ? 'FastAPI Connected' : 'Local ML · 0 GPU'}
          </span>
          <span className="sm:hidden">
            {isBackendConnected ? 'Online' : 'Local'}
          </span>
        </div>
      </div>
    </header>
  );
};
