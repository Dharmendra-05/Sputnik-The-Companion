import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, MapPin, AlertCircle, ChevronDown, ChevronUp, MessageSquarePlus } from 'lucide-react';
import { ChatResponse, MLIntentCategoryName } from '../types/sputnik';
import { sendChatQuery } from '../services/sputnikApi';
import { CATEGORY_THEMES } from '../data/groundedCorpusMirror';

interface ChatViewProps {
  onNavigateToLandmark?: (landmarkId: string) => void;
  onOpenFeedback?: (prefilledQuery?: string) => void;
  onNavigateWalk?: (originId: string, destId: string) => void;
}

const STARTER_PROMPTS = [
  'Where is the Central Library?',
  'What are the B.Tech admission criteria?',
  'Walk from Main Gate to Sports Complex',
  'Hostel mess rules and timings',
  "What is today's dinner menu in the mess?",
];

export const ChatView: React.FC<ChatViewProps> = ({
  onNavigateToLandmark,
  onOpenFeedback,
  onNavigateWalk,
}) => {
  const [query, setQuery] = useState('');
  const [useSvm, setUseSvm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ChatResponse | null>(null);
  const [showProbabilities, setShowProbabilities] = useState(false);
  const [highlightedDocId, setHighlightedDocId] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Preload initial prompt on mount
  useEffect(() => {
    handleRunQuery('What are the rules and facilities for girls hostel?', false);
  }, []);

  const handleRunQuery = async (queryText: string, svmMode: boolean = useSvm) => {
    if (!queryText.trim()) return;

    // If query is specifically walk guide prompt, handle navigation routing
    if (queryText.toLowerCase().includes('walk from main gate to sports complex')) {
      if (onNavigateWalk) {
        onNavigateWalk('main_gate', 'sports_complex');
        return;
      }
    }

    setIsLoading(true);
    setQuery(queryText);
    try {
      const res = await sendChatQuery({ query: queryText, use_svm: svmMode });
      setResponse(res);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRunQuery(query);
  };

  const toggleModel = () => {
    const nextSvm = !useSvm;
    setUseSvm(nextSvm);
    if (query) {
      handleRunQuery(query, nextSvm);
    }
  };

  // Determine if query or response references a map landmark
  const getAssociatedLandmarkId = (): { id: string; name: string } | null => {
    const textToCheck = `${query} ${response?.answer || ''}`.toLowerCase();
    if (textToCheck.includes('library') || textToCheck.includes('lrc')) {
      return { id: 'library', name: 'Learning Resource Centre (Central Library)' };
    }
    if (textToCheck.includes('girls hostel') || textToCheck.includes('gangotri') || textToCheck.includes('gh')) {
      return { id: 'gh', name: 'Gangotri Girls Hostel (GH)' };
    }
    if (textToCheck.includes('sports') || textToCheck.includes('gym')) {
      return { id: 'sports_complex', name: 'Sports Complex & Gymnasium' };
    }
    if (textToCheck.includes('computer center') || textToCheck.includes('server lab')) {
      return { id: 'computer_center', name: 'Computer Centre & Server Labs' };
    }
    if (textToCheck.includes('admin') || textToCheck.includes('director')) {
      return { id: 'admin_block', name: 'Administrative Block & Directorate' };
    }
    return null;
  };

  const associatedLandmark = getAssociatedLandmarkId();
  const activeCategory = (response?.category as MLIntentCategoryName) || 'Campus Facilities & Hostels';
  const categoryTheme = CATEGORY_THEMES[activeCategory] || CATEGORY_THEMES['Campus Facilities & Hostels'];

  return (
    <div className="w-full max-w-[768px] mx-auto px-4 pt-7 pb-20 flex flex-col gap-6">
      {/* 2. Query Command Box */}
      <section className="flex flex-col gap-3" aria-label="Query Command Section">
        <form onSubmit={handleSubmit} className="relative w-full">
          <div className="flex items-center w-full h-12 bg-white rounded-lg border border-[#A1A1A1] focus-within:border-[#171717] focus-within:ring-1 focus-within:ring-[#171717] pl-4 pr-2 shadow-2xs gap-3 transition-all">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything about ABV-IIITM Gwalior... (Press Ctrl+K)"
              className="flex-1 bg-transparent text-[15px] text-[#171717] placeholder-[#888888] outline-hidden pr-1"
            />

            <div className="flex items-center gap-2 shrink-0">
              {/* Model Switcher Pill */}
              <button
                type="button"
                onClick={toggleModel}
                title="Click to toggle between Logistic Regression (8ms) and Calibrated Linear SVM (14ms)"
                className="px-2 py-1 text-[11.5px] font-mono rounded bg-[#F5F5F5] hover:bg-[#EBEBEB] text-[#4D4D4D] border border-[#EBEBEB] transition-colors whitespace-nowrap cursor-pointer"
              >
                {useSvm ? 'Model: Linear SVM (14ms)' : 'Model: LogReg (8ms)'}
              </button>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="w-8 h-8 rounded-[6px] bg-[#171717] hover:bg-black text-white flex items-center justify-center shrink-0 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
                aria-label="Submit Query"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
        </form>

        {/* 4 Subtle Pill Chips Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1" role="region" aria-label="Sample Prompts">
          {STARTER_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleRunQuery(prompt)}
              className={`text-[13px] px-3 py-1.5 rounded-full border transition-all text-left whitespace-nowrap cursor-pointer ${
                query === prompt
                  ? 'bg-[#171717] text-white border-[#171717]'
                  : 'bg-white text-[#4D4D4D] border-[#EBEBEB] hover:border-[#A1A1A1] hover:text-[#171717]'
              }`}
            >
              {prompt}
            </button>
          ))}
        </div>
      </section>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="bg-white border border-[#EBEBEB] rounded-lg p-6 animate-pulse space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="w-44 h-6 bg-[#F5F5F5] rounded-full" />
            <div className="flex gap-2">
              <div className="w-24 h-5 bg-[#F5F5F5] rounded-full" />
              <div className="w-24 h-5 bg-[#F5F5F5] rounded-full" />
            </div>
          </div>
          <div className="space-y-2.5 pt-2">
            <div className="w-full h-4 bg-[#F5F5F5] rounded" />
            <div className="w-5/6 h-4 bg-[#F5F5F5] rounded" />
            <div className="w-4/6 h-4 bg-[#F5F5F5] rounded" />
          </div>
        </div>
      )}

      {/* 3. Grounded Answer Card */}
      {!isLoading && response && (
        <article className="bg-white border border-[#EBEBEB] rounded-lg p-6 shadow-xs flex flex-col gap-4" aria-label="Grounded Answer">
          {/* Header row: Category Badge & Telemetry */}
          <header className="flex items-center justify-between gap-3 flex-wrap">
            {/* Category badge */}
            <div
              style={{
                backgroundColor: categoryTheme.bg,
                color: categoryTheme.text,
                borderColor: categoryTheme.border,
              }}
              className="text-[12.5px] font-medium px-2.5 py-1 rounded-full border tracking-[-0.1px] inline-flex items-center gap-1.5"
            >
              <span
                style={{ backgroundColor: categoryTheme.dot }}
                className="w-1.5 h-1.5 rounded-full inline-block"
              />
              <span>{response.category}</span>
            </div>

            {/* Telemetry Group */}
            <div className="flex items-center gap-1.5 flex-wrap font-mono text-[11.5px]">
              {response.is_low_confidence_fallback ? (
                <>
                  <span className="bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A] px-2 py-0.5 rounded-full">
                    Confidence: {(response.confidence * 100).toFixed(1)}% · Low Certainty Fallback
                  </span>
                  <span className="bg-[#F5F5F5] text-[#4D4D4D] border border-[#EBEBEB] px-2 py-0.5 rounded-full">
                    Domain Boost: +10% (1.10x)
                  </span>
                </>
              ) : (
                <>
                  <span className="bg-[#F5F5F5] text-[#4D4D4D] border border-[#EBEBEB] px-2 py-0.5 rounded-full">
                    Confidence: {(response.confidence * 100).toFixed(1)}%
                  </span>
                  <span className="bg-[#F5F5F5] text-[#4D4D4D] border border-[#EBEBEB] px-2 py-0.5 rounded-full">
                    Domain Boost: +25% (1.25x)
                  </span>
                </>
              )}

              {/* Class Probability Distribution Toggle */}
              <button
                type="button"
                onClick={() => setShowProbabilities(!showProbabilities)}
                className="bg-[#F5F5F5] hover:bg-[#EBEBEB] text-[#171717] border border-[#EBEBEB] px-2 py-0.5 rounded-full flex items-center gap-1 transition-colors cursor-pointer"
                title="View softmax probability distribution across 5 classes"
              >
                <span>5 Classes</span>
                {showProbabilities ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>
          </header>

          {/* Probability Breakdown Drawer */}
          {showProbabilities && response.probabilities && (
            <div className="p-3.5 bg-[#FAFAFA] rounded-md border border-[#EBEBEB] text-xs font-mono">
              <div className="text-[11px] uppercase tracking-wider text-[#888888] mb-2 font-semibold">
                Calibrated Class Probabilities ({response.model_type} · {response.latency_ms}ms)
              </div>
              <div className="space-y-1.5">
                {Object.entries(response.probabilities).map(([cat, prob]) => {
                  const isWinner = cat === response.category;
                  const pct = Math.round(prob * 100);
                  return (
                    <div key={cat} className="flex items-center justify-between gap-3">
                      <span className={`truncate ${isWinner ? 'font-semibold text-[#171717]' : 'text-[#666666]'}`}>
                        {cat}
                      </span>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="w-24 h-1.5 bg-[#EBEBEB] rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${isWinner ? 'bg-[#171717]' : 'bg-[#A1A1A1]'}`}
                            style={{ width: `${Math.max(4, pct)}%` }}
                          />
                        </div>
                        <span className="w-10 text-right">{pct}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Answer Content */}
          <div className="text-[15px] leading-[24px] text-[#171717] flex flex-col gap-3">
            {response.is_low_confidence_fallback ? (
              <>
                {/* Yellow Amber Notice Box matching updated HTML */}
                <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-[6px] p-3 text-[13.5px] leading-[20px] text-[#92400E] flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
                  <span>
                    Notice: Daily rotating meal menus and dynamic student schedules are managed by student mess committees and are not codified within static ABV-IIITM academic ordinances or static institutional portals.
                  </span>
                </div>

                {/* Campus Hotspot Fallback Directory matching updated design */}
                <div className="flex flex-col gap-2.5 mt-1">
                  <div className="font-mono text-[11px] font-semibold tracking-[0.5px] uppercase text-[#888888]">
                    CAMPUS HOTSPOT FALLBACK DIRECTORY
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {/* Card 1 */}
                    <div className="bg-[#FAFAFA] border border-[#EBEBEB] rounded-[6px] p-3 flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[13.5px] font-semibold text-[#171717]">
                          Central Mess Committee &amp; Dining Hall
                        </span>
                        <span className="font-mono text-[11px] bg-white border border-[#EBEBEB] px-1.5 py-0.5 rounded text-[#4D4D4D]">
                          Active
                        </span>
                      </div>
                      <p className="text-[12.5px] text-[#4D4D4D] leading-[18px]">
                        Catering Desk Intercom: <span className="font-mono text-[#171717] font-medium">ext #4120</span>
                        <br />
                        Daily whiteboard display at BH / GH dining porch entrance.
                        <br />
                        WhatsApp broadcast: <span className="font-mono text-[#0070F3]">@iiitm_mess_council</span>
                      </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-[#FAFAFA] border border-[#EBEBEB] rounded-[6px] p-3 flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[13.5px] font-semibold text-[#171717]">
                          Hostel Administration &amp; Chief Warden
                        </span>
                        <span className="font-mono text-[11px] bg-white border border-[#EBEBEB] px-1.5 py-0.5 rounded text-[#4D4D4D]">
                          09:30–17:30
                        </span>
                      </div>
                      <p className="text-[12.5px] text-[#4D4D4D] leading-[18px]">
                        Location: Administrative Complex Ground Floor
                        <br />
                        Office Hours: Mon–Fri, 09:30–17:30 IST
                        <br />
                        Email:{' '}
                        <a href="mailto:mess.council@iiitm.ac.in" className="font-mono text-[#0070F3] hover:underline">
                          mess.council@iiitm.ac.in
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Feedback CTA */}
                  {onOpenFeedback && (
                    <div className="mt-2 pt-2 border-t border-[#EBEBEB] flex items-center justify-between text-xs">
                      <span className="text-[#888888]">Have an updated menu or circular?</span>
                      <button
                        type="button"
                        onClick={() => onOpenFeedback(query)}
                        className="text-[#0070F3] hover:text-[#0761D1] font-medium inline-flex items-center gap-1 cursor-pointer"
                      >
                        <MessageSquarePlus className="w-3.5 h-3.5" />
                        <span>Contribute in Feedback &amp; Corpus →</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              // Standard grounded answer with interactive citations
              response.answer.split('\n\n').map((paragraph, pIdx) => {
                const parts = paragraph.split(/(\[doc_\d+\])/g);
                return (
                  <p key={pIdx}>
                    {parts.map((part, partIdx) => {
                      const match = part.match(/\[(doc_\d+)\]/);
                      if (match) {
                        const docId = match[1];
                        return (
                          <button
                            key={partIdx}
                            type="button"
                            onClick={() => {
                              setHighlightedDocId(docId);
                              const el = document.getElementById(docId);
                              el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }}
                            className="text-[11.5px] text-[#0070F3] bg-[#D3E5FF] hover:bg-[#0070F3] hover:text-white rounded px-1.5 py-0.5 mx-0.5 font-mono font-medium cursor-pointer transition-colors"
                            title={`Jump to source record ${docId}`}
                          >
                            [{docId}]
                          </button>
                        );
                      }
                      return part;
                    })}
                  </p>
                );
              })
            )}

            {/* Optional Campus Walk Shortcut */}
            {!response.is_low_confidence_fallback && associatedLandmark && onNavigateToLandmark && (
              <div className="mt-4 pt-4 border-t border-[#EBEBEB] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#4D4D4D]">
                  <MapPin className="w-4 h-4 text-[#0070F3]" />
                  <span>
                    Referenced Campus Landmark: <strong>{associatedLandmark.name}</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigateToLandmark(associatedLandmark.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0070F3] hover:text-[#0761D1] transition-colors cursor-pointer"
                >
                  <span>Route on Campus Map →</span>
                </button>
              </div>
            )}
          </div>
        </article>
      )}

      {/* 4. Retrieved Passages Section */}
      {!isLoading && response && response.retrieved_excerpts && response.retrieved_excerpts.length > 0 && (
        <section className="flex flex-col gap-2.5" aria-label="Retrieved Excerpts and Sources">
          <div className="text-[11.5px] font-semibold text-[#888888] font-mono tracking-[0.6px] uppercase">
            RETRIEVED PASSAGES &amp; VERIFIED IIITM.AC.IN SOURCES
          </div>

          <div className="flex flex-col gap-2.5">
            {response.retrieved_excerpts.map((excerpt) => {
              const isHighlighted = highlightedDocId === excerpt.doc_id;
              return (
                <div
                  key={excerpt.doc_id}
                  id={excerpt.doc_id}
                  className={`bg-[#FAFAFA] border rounded-[6px] p-3 flex flex-col gap-2 transition-all ${
                    isHighlighted
                      ? 'border-[#0070F3] ring-1 ring-[#0070F3] bg-[#F0F7FF]'
                      : 'border-[#EBEBEB] hover:border-[#A1A1A1]'
                  }`}
                >
                  {/* Top row */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11.5px] font-semibold text-[#171717] bg-white border border-[#EBEBEB] px-1.5 py-0.5 rounded font-mono">
                        {excerpt.doc_id}
                      </span>
                      <a
                        href={excerpt.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[12px] text-[#0070F3] hover:underline font-mono font-medium flex items-center gap-1"
                      >
                        <span>{excerpt.url.replace(/^https?:\/\//, '')}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <span className="text-[11.5px] text-[#666666] font-mono">
                      sim: {excerpt.similarity_score.toFixed(3)} → adj: {excerpt.adjusted_score.toFixed(3)}
                    </span>
                  </div>

                  {/* Snippet */}
                  <p className="text-[13.5px] leading-[20px] text-[#4D4D4D] line-clamp-2">
                    {excerpt.text}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
