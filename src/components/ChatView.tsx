import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ExternalLink, MapPin, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { ChatResponse, MLIntentCategoryName } from '../types/sputnik';
import { sendChatQuery } from '../services/sputnikApi';
import { CATEGORY_THEMES, CAMPUS_HOTSPOTS } from '../data/groundedCorpusMirror';

interface ChatViewProps {
  onNavigateToLandmark?: (landmarkId: string) => void;
}

const STARTER_PROMPTS = [
  'What are the rules and facilities for girls hostel?',
  'Where is the Central Library and what are its resources?',
  'What are the B.Tech and M.Sc. admission criteria?',
  "What is today's dinner menu in the mess?",
];

export const ChatView: React.FC<ChatViewProps> = ({ onNavigateToLandmark }) => {
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
    <div className="w-full max-w-[768px] mx-auto px-4 pt-8 pb-20">
      {/* Command Input Bar */}
      <form onSubmit={handleSubmit} className="relative w-full mb-3">
        <div className="flex items-center w-full h-12 bg-white rounded-lg border border-[#A1A1A1] focus-within:border-[#171717] focus-within:ring-1 focus-within:ring-[#171717] px-3 shadow-xs transition-all">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything about ABV-IIITM Gwalior... (Press Ctrl+K)"
            className="flex-1 bg-transparent text-[15px] text-[#171717] placeholder-[#888888] outline-hidden pr-2"
          />

          {/* Model Switcher Pill */}
          <button
            type="button"
            onClick={toggleModel}
            title="Click to toggle between Logistic Regression and Calibrated Linear SVM"
            className="shrink-0 px-2.5 py-1 mr-2 text-[11px] font-mono rounded-md bg-[#F5F5F5] hover:bg-[#EBEBEB] text-[#4D4D4D] border border-[#EBEBEB] transition-colors"
          >
            {useSvm ? 'Model: Linear SVM (14ms)' : 'Model: LogReg (8ms)'}
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="w-8 h-8 rounded-md bg-[#171717] text-white flex items-center justify-center shrink-0 hover:bg-[#2E2E2E] active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all"
            aria-label="Submit query"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Starter Prompt Chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        {STARTER_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleRunQuery(prompt)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all text-left whitespace-nowrap ${
              query === prompt
                ? 'bg-[#171717] text-white border-[#171717]'
                : 'bg-white text-[#4D4D4D] border-[#EBEBEB] hover:border-[#A1A1A1] hover:text-[#171717]'
            }`}
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="bg-white border border-[#EBEBEB] rounded-lg p-6 mb-8 animate-pulse space-y-4 shadow-xs">
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

      {/* Grounded Answer Card */}
      {!isLoading && response && (
        <div className="space-y-8">
          <div className="bg-white border border-[#EBEBEB] rounded-lg p-6 shadow-xs">
            {/* Top Badges Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              {/* Category Badge */}
              <div
                style={{
                  backgroundColor: categoryTheme.bg,
                  color: categoryTheme.text,
                  borderColor: categoryTheme.border,
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
              >
                <span className="flex items-center gap-1" aria-hidden="true">
                  <span
                    style={{ backgroundColor: categoryTheme.dot }}
                    className="w-1.5 h-1.5 rounded-full"
                  />
                  <span
                    style={{ backgroundColor: categoryTheme.dot }}
                    className="w-1.5 h-1.5 rounded-full"
                  />
                </span>
                <span>{response.category}</span>
              </div>

              {/* Telemetry Pills */}
              <div className="flex items-center flex-wrap gap-2 text-xs font-mono text-[#555555]">
                <span className="px-2.5 py-1 bg-[#F5F5F5] rounded-full border border-[#EBEBEB]">
                  Confidence: {(response.confidence * 100).toFixed(1)}%
                </span>
                <span className="px-2.5 py-1 bg-[#F5F5F5] rounded-full border border-[#EBEBEB]">
                  Domain Boost: +25% (1.25x)
                </span>

                {/* Probability Distribution Toggle */}
                <button
                  onClick={() => setShowProbabilities(!showProbabilities)}
                  className="flex items-center gap-1 px-2.5 py-1 bg-[#F5F5F5] hover:bg-[#EBEBEB] text-[#171717] rounded-full border border-[#EBEBEB] transition-colors"
                  title="View softmax probability distribution across 5 classes"
                >
                  <span>5 Classes</span>
                  {showProbabilities ? (
                    <ChevronUp className="w-3 h-3" />
                  ) : (
                    <ChevronDown className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>

            {/* Probability Breakdown Drawer */}
            {showProbabilities && response.probabilities && (
              <div className="mb-5 p-3.5 bg-[#FAFAFA] rounded-md border border-[#EBEBEB] text-xs font-mono">
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

            {/* Answer Text with Interactive Citations */}
            <div className="text-[15px] leading-[24px] text-[#171717] space-y-4">
              {response.answer.split('\n\n').map((paragraph, pIdx) => {
                // Parse inline [doc_xxx] citations into interactive elements
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
                            className="inline-flex items-center font-mono text-[12px] text-[#0070F3] hover:text-[#0761D1] bg-[#EBF5FF] hover:bg-[#D3E5FF] px-1.5 py-0.5 rounded mx-1 align-baseline border border-[#BAE6FD] transition-colors"
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
              })}
            </div>

            {/* Low-Confidence Hotspot Fallback Banner (if confidence < 50%) */}
            {response.is_low_confidence_fallback && (
              <div className="mt-6 p-4 bg-[#FFFBEB] border border-[#FDE68A] rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold text-[#92400E]">
                        Under-Specified Dynamic Query Detected (Confidence &lt; 50%)
                      </h4>
                      <p className="text-xs text-[#78350F] mt-1 leading-relaxed">
                        Colloquial inquiries (like daily mess specials or unannounced student club activities) vary daily and are not indexed in university static gazettes. Reach out to campus desks directly:
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                      {CAMPUS_HOTSPOTS.slice(0, 4).map((hotspot) => (
                        <div
                          key={hotspot.id}
                          className="bg-white/90 p-2.5 rounded border border-[#FDE68A] text-xs text-[#171717]"
                        >
                          <div className="font-semibold text-[#92400E]">{hotspot.title}</div>
                          <div className="text-[11px] text-[#78350F] font-mono mt-0.5">{hotspot.contact}</div>
                          <div className="text-[11px] text-[#4D4D4D] mt-1">{hotspot.timing}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Optional Campus Walk Shortcut */}
            {associatedLandmark && onNavigateToLandmark && (
              <div className="mt-6 pt-4 border-t border-[#EBEBEB] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#4D4D4D]">
                  <MapPin className="w-4 h-4 text-[#0070F3]" />
                  <span>Referenced Campus Landmark: <strong>{associatedLandmark.name}</strong></span>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigateToLandmark(associatedLandmark.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0070F3] hover:text-[#0761D1] transition-colors"
                >
                  <span>Route on Campus Map</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Retrieved Excerpts & Verified Sources List */}
          {response.retrieved_excerpts && response.retrieved_excerpts.length > 0 && (
            <div className="space-y-3">
              <div className="text-[11px] font-mono tracking-wider uppercase text-[#888888] font-semibold">
                RETRIEVED PASSAGES & VERIFIED IIITM.AC.IN SOURCES
              </div>

              <div className="space-y-3">
                {response.retrieved_excerpts.map((excerpt) => {
                  const isHighlighted = highlightedDocId === excerpt.doc_id;
                  return (
                    <div
                      key={excerpt.doc_id}
                      id={excerpt.doc_id}
                      className={`p-4 rounded-lg bg-white border transition-all ${
                        isHighlighted
                          ? 'border-[#0070F3] ring-1 ring-[#0070F3] bg-[#F0F7FF]'
                          : 'border-[#EBEBEB] hover:border-[#A1A1A1]'
                      }`}
                    >
                      {/* Excerpt Meta Header */}
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#F5F5F5] border border-[#EBEBEB] text-[#171717]">
                            {excerpt.doc_id}
                          </span>
                          <a
                            href={excerpt.url}
                            target="_blank"
                            rel="noreferrer"
                            className="font-mono text-xs text-[#0070F3] hover:underline flex items-center gap-1"
                          >
                            <span>{new URL(excerpt.url).hostname + new URL(excerpt.url).pathname}</span>
                            <ExternalLink className="w-3 h-3 inline" />
                          </a>
                        </div>

                        <span className="font-mono text-xs text-[#888888]">
                          sim: {excerpt.similarity_score.toFixed(3)} → adj: {excerpt.adjusted_score.toFixed(3)}
                        </span>
                      </div>

                      {/* Excerpt Text */}
                      <p className="text-xs text-[#4D4D4D] leading-relaxed">
                        {excerpt.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
