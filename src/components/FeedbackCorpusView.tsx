import React, { useState } from 'react';
import { ExternalLink, Check, Copy } from 'lucide-react';
import { FeedbackType, MLIntentCategoryName, FeedbackSubmission } from '../types/sputnik';

const INITIAL_QUEUE: FeedbackSubmission[] = [
  {
    id: 'sub_001',
    feedbackType: 'grassroot_update',
    domain: 'Campus Facilities & Hostels',
    query: "What is today's dinner menu in the mess?",
    explanation: 'Mess dining menu rotates daily by student committee; added reference to BH/GH porch whiteboard and WhatsApp council contact.',
    referenceUrl: 'https://www.iiitm.ac.in/campus-life/mess-dining',
    timestamp: '2026-10-31 18:40',
  },
  {
    id: 'sub_002',
    feedbackType: 'route_correction',
    domain: 'Campus Facilities & Hostels',
    query: 'Walking route from Library to Computer Center',
    explanation: 'Paved walkway between LRC and Computer Centre is 220m with shade factor 55%.',
    referenceUrl: 'https://www.iiitm.ac.in/facilities/campus-map',
    timestamp: '2026-10-30 11:15',
  },
];

export const FeedbackCorpusView: React.FC = () => {
  const [selectedType, setSelectedType] = useState<FeedbackType>('wrong_badge');
  const [selectedDomain, setSelectedDomain] = useState<MLIntentCategoryName>('Campus Facilities & Hostels');
  const [queryText, setQueryText] = useState('');
  const [explanationText, setExplanationText] = useState('');
  const [referenceUrl, setReferenceUrl] = useState('');

  const [copied, setCopied] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);
  const [queue, setQueue] = useState<FeedbackSubmission[]>(INITIAL_QUEUE);

  const handleCopyFormattedEntry = () => {
    const formatted = [
      '[SPUTNIK CORPUS CONTRIBUTION]',
      `Issue Type: ${selectedType}`,
      `Campus ML Domain: ${selectedDomain}`,
      `Query Tested: ${queryText || 'N/A'}`,
      `Detailed Explanation / Grounded Update:\n${explanationText || 'N/A'}`,
      `Reference Link: ${referenceUrl || 'N/A'}`,
      `Timestamp: ${new Date().toISOString()}`,
    ].join('\n');

    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!explanationText.trim() && !queryText.trim()) return;

    setSubmittedStatus('Submitting...');
    setTimeout(() => {
      const newEntry: FeedbackSubmission = {
        id: `sub_${String(queue.length + 1).padStart(3, '0')}`,
        feedbackType: selectedType,
        domain: selectedDomain,
        query: queryText || 'General Campus Inquiry',
        explanation: explanationText,
        referenceUrl: referenceUrl || 'https://www.iiitm.ac.in',
        timestamp: new Date().toLocaleDateString('en-GB', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setQueue([newEntry, ...queue]);
      setSubmittedStatus('✓ Queued for Ingestion');
      setQueryText('');
      setExplanationText('');
      setReferenceUrl('');

      setTimeout(() => {
        setSubmittedStatus(null);
      }, 2500);
    }, 400);
  };

  return (
    <div className="w-full max-w-[768px] mx-auto px-4 pt-8 pb-20 flex flex-col gap-5">
      {/* Section 2: External Google Docs Sync Banner */}
      <section className="bg-white border border-[#EBEBEB] rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex flex-col min-w-0">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#888888] font-medium block mb-1">
            CORPUS EXPANSION &amp; FEEDBACK LOG
          </span>
          <p className="text-[14px] text-[#4D4D4D] leading-normal">
            Help improve Sputnik&apos;s 1,780-passage dataset and campus grassroot coverage (mess menus, hostel rules, walking routes).
          </p>
        </div>
        <div className="shrink-0">
          <a
            href="https://docs.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-[#FAFAFA] hover:bg-[#F5F5F5] border border-[#A1A1A1] text-[#171717] text-[13px] font-medium px-3.5 py-2 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-xs"
          >
            <span>Open Shared Google Doc</span>
            <span className="text-[11px] font-mono">↗</span>
          </a>
        </div>
      </section>

      {/* Section 3: Main Structured Feedback Card */}
      <section className="bg-white border border-[#EBEBEB] rounded-lg p-6 shadow-xs flex flex-col gap-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* PART 1: Select Feedback / Issue Type */}
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#888888] font-semibold block mb-3">
              1. SELECT FEEDBACK / ISSUE TYPE
            </span>
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
              role="radiogroup"
              aria-label="Feedback Type"
            >
              {/* Option A */}
              <label
                onClick={() => setSelectedType('wrong_badge')}
                className={`rounded-md p-3.5 flex items-start gap-3 cursor-pointer transition-all select-none ${
                  selectedType === 'wrong_badge'
                    ? 'border-[1.5px] border-[#171717] bg-[#FAFAFA]'
                    : 'border border-[#EBEBEB] hover:border-[#CCCCCC] bg-white'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center mt-0.5 shrink-0 bg-white ${
                    selectedType === 'wrong_badge'
                      ? 'border-2 border-[#171717]'
                      : 'border border-[#CCCCCC]'
                  }`}
                >
                  {selectedType === 'wrong_badge' && (
                    <span className="w-2 h-2 rounded-full bg-[#171717]" />
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span
                    className={`text-[13px] ${
                      selectedType === 'wrong_badge'
                        ? 'font-semibold text-[#171717]'
                        : 'font-medium text-[#171717]'
                    }`}
                  >
                    Wrong Intent Category Badge
                  </span>
                  <span className="text-[12px] text-[#666666] leading-snug mt-0.5">
                    Query was routed to the wrong campus domain
                  </span>
                </div>
              </label>

              {/* Option B */}
              <label
                onClick={() => setSelectedType('missing_link')}
                className={`rounded-md p-3.5 flex items-start gap-3 cursor-pointer transition-all select-none ${
                  selectedType === 'missing_link'
                    ? 'border-[1.5px] border-[#171717] bg-[#FAFAFA]'
                    : 'border border-[#EBEBEB] hover:border-[#CCCCCC] bg-white'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center mt-0.5 shrink-0 bg-white ${
                    selectedType === 'missing_link'
                      ? 'border-2 border-[#171717]'
                      : 'border border-[#CCCCCC]'
                  }`}
                >
                  {selectedType === 'missing_link' && (
                    <span className="w-2 h-2 rounded-full bg-[#171717]" />
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span
                    className={`text-[13px] ${
                      selectedType === 'missing_link'
                        ? 'font-semibold text-[#171717]'
                        : 'font-medium text-[#171717]'
                    }`}
                  >
                    Missing / Outdated iiitm.ac.in Link
                  </span>
                  <span className="text-[12px] text-[#666666] leading-snug mt-0.5">
                    Official circular, PDF, or webpage missing
                  </span>
                </div>
              </label>

              {/* Option C */}
              <label
                onClick={() => setSelectedType('grassroot_update')}
                className={`rounded-md p-3.5 flex items-start gap-3 cursor-pointer transition-all select-none ${
                  selectedType === 'grassroot_update'
                    ? 'border-[1.5px] border-[#171717] bg-[#FAFAFA]'
                    : 'border border-[#EBEBEB] hover:border-[#CCCCCC] bg-white'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center mt-0.5 shrink-0 bg-white ${
                    selectedType === 'grassroot_update'
                      ? 'border-2 border-[#171717]'
                      : 'border border-[#CCCCCC]'
                  }`}
                >
                  {selectedType === 'grassroot_update' && (
                    <span className="w-2 h-2 rounded-full bg-[#171717]" />
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span
                    className={`text-[13px] ${
                      selectedType === 'grassroot_update'
                        ? 'font-semibold text-[#171717]'
                        : 'font-medium text-[#171717]'
                    }`}
                  >
                    Campus Grassroot Update (Mess / Hostels / Clubs)
                  </span>
                  <span className="text-[12px] text-[#666666] leading-snug mt-0.5">
                    Daily timings or student info not in static ordinances
                  </span>
                </div>
              </label>

              {/* Option D */}
              <label
                onClick={() => setSelectedType('route_correction')}
                className={`rounded-md p-3.5 flex items-start gap-3 cursor-pointer transition-all select-none ${
                  selectedType === 'route_correction'
                    ? 'border-[1.5px] border-[#171717] bg-[#FAFAFA]'
                    : 'border border-[#EBEBEB] hover:border-[#CCCCCC] bg-white'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center mt-0.5 shrink-0 bg-white ${
                    selectedType === 'route_correction'
                      ? 'border-2 border-[#171717]'
                      : 'border border-[#CCCCCC]'
                  }`}
                >
                  {selectedType === 'route_correction' && (
                    <span className="w-2 h-2 rounded-full bg-[#171717]" />
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span
                    className={`text-[13px] ${
                      selectedType === 'route_correction'
                        ? 'font-semibold text-[#171717]'
                        : 'font-medium text-[#171717]'
                    }`}
                  >
                    Campus Map / Walking Route Correction
                  </span>
                  <span className="text-[12px] text-[#666666] leading-snug mt-0.5">
                    14-landmark Dijkstra path or distance issue
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* PART 2: Tag Relevant Campus ML Domain (Optional) */}
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#888888] font-semibold block mb-3">
              2. TAG RELEVANT CAMPUS ML DOMAIN (OPTIONAL)
            </span>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Campus ML Domains">
              {/* Academics */}
              <button
                type="button"
                onClick={() => setSelectedDomain('Academics & Curriculum')}
                className={`text-xs px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  selectedDomain === 'Academics & Curriculum'
                    ? 'bg-[#E0F2FE] text-[#0369A1] font-semibold border-2 border-[#0369A1] shadow-xs flex items-center gap-1.5'
                    : 'bg-[#E0F2FE] text-[#0369A1] font-medium border border-[#BAE6FD] hover:opacity-80'
                }`}
              >
                {selectedDomain === 'Academics & Curriculum' && <Check className="w-3 h-3 stroke-[2.5]" />}
                <span>Academics &amp; Curriculum</span>
              </button>

              {/* Administration */}
              <button
                type="button"
                onClick={() => setSelectedDomain('Administration & Governance')}
                className={`text-xs px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  selectedDomain === 'Administration & Governance'
                    ? 'bg-[#E0E7FF] text-[#4338CA] font-semibold border-2 border-[#4338CA] shadow-xs flex items-center gap-1.5'
                    : 'bg-[#E0E7FF] text-[#4338CA] font-medium border border-[#C7D2FE] hover:opacity-80'
                }`}
              >
                {selectedDomain === 'Administration & Governance' && <Check className="w-3 h-3 stroke-[2.5]" />}
                <span>Administration &amp; Governance</span>
              </button>

              {/* Admissions */}
              <button
                type="button"
                onClick={() => setSelectedDomain('Admissions & Careers')}
                className={`text-xs px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  selectedDomain === 'Admissions & Careers'
                    ? 'bg-[#FEF3C7] text-[#B45309] font-semibold border-2 border-[#B45309] shadow-xs flex items-center gap-1.5'
                    : 'bg-[#FEF3C7] text-[#B45309] font-medium border border-[#FDE68A] hover:opacity-80'
                }`}
              >
                {selectedDomain === 'Admissions & Careers' && <Check className="w-3 h-3 stroke-[2.5]" />}
                <span>Admissions &amp; Careers</span>
              </button>

              {/* Facilities (Active default) */}
              <button
                type="button"
                onClick={() => setSelectedDomain('Campus Facilities & Hostels')}
                className={`text-xs px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  selectedDomain === 'Campus Facilities & Hostels'
                    ? 'bg-[#D1FAE5] text-[#047857] font-semibold border-2 border-[#047857] shadow-xs flex items-center gap-1.5'
                    : 'bg-[#D1FAE5] text-[#047857] font-medium border border-[#A7F3D0] hover:opacity-80'
                }`}
              >
                {selectedDomain === 'Campus Facilities & Hostels' && <Check className="w-3 h-3 stroke-[2.5]" />}
                <span>Campus Facilities &amp; Hostels</span>
              </button>

              {/* Events */}
              <button
                type="button"
                onClick={() => setSelectedDomain('Events & Notices')}
                className={`text-xs px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  selectedDomain === 'Events & Notices'
                    ? 'bg-[#FFE4E6] text-[#BE123C] font-semibold border-2 border-[#BE123C] shadow-xs flex items-center gap-1.5'
                    : 'bg-[#FFE4E6] text-[#BE123C] font-medium border border-[#FECDD3] hover:opacity-80'
                }`}
              >
                {selectedDomain === 'Events & Notices' && <Check className="w-3 h-3 stroke-[2.5]" />}
                <span>Events &amp; Notices</span>
              </button>
            </div>
          </div>

          {/* PART 3: Explain The Issue Or Contribute Verified Data */}
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#888888] font-semibold block mb-3">
              3. EXPLAIN THE ISSUE OR CONTRIBUTE VERIFIED DATA
            </span>
            <div className="space-y-4">
              {/* Input 1 */}
              <div>
                <label className="text-xs font-medium text-[#4D4D4D] block mb-1.5" htmlFor="query-input">
                  Query or Topic Tested
                </label>
                <input
                  id="query-input"
                  type="text"
                  value={queryText}
                  onChange={(e) => setQueryText(e.target.value)}
                  placeholder="e.g., What are the late night canteen timings near BH-1?"
                  className="h-10 px-3 w-full bg-white border border-[#EBEBEB] rounded-md text-sm text-[#171717] focus:outline-hidden focus:border-[#171717] focus:ring-1 focus:ring-[#171717] transition-all placeholder:text-[#999999]"
                />
              </div>

              {/* Input 2 */}
              <div>
                <label className="text-xs font-medium text-[#4D4D4D] block mb-1.5" htmlFor="explanation-input">
                  Detailed Explanation / Correct Answer for Model Training
                </label>
                <textarea
                  id="explanation-input"
                  rows={4}
                  value={explanationText}
                  onChange={(e) => setExplanationText(e.target.value)}
                  placeholder="Explain the issue with the current output or provide the exact factual update so we can add it to cleaned_corpus.json..."
                  className="h-[110px] p-3 w-full bg-white border border-[#A1A1A1] rounded-md text-sm text-[#171717] font-sans focus:outline-hidden focus:border-[#171717] focus:ring-1 focus:ring-[#171717] resize-none transition-all placeholder:text-[#999999]"
                />
              </div>

              {/* Input 3 */}
              <div>
                <label className="text-xs font-medium text-[#4D4D4D] block mb-1.5" htmlFor="reference-url-input">
                  Reference Official Link or Google Doc URL (Optional)
                </label>
                <input
                  id="reference-url-input"
                  type="url"
                  value={referenceUrl}
                  onChange={(e) => setReferenceUrl(e.target.value)}
                  placeholder="https://www.iiitm.ac.in/..."
                  className="h-10 px-3 w-full bg-white border border-[#EBEBEB] rounded-md text-xs font-mono text-[#171717] focus:outline-hidden focus:border-[#171717] focus:ring-1 focus:ring-[#171717] transition-all placeholder:text-[#999999]"
                />
              </div>
            </div>
          </div>

          {/* Footer Action Row */}
          <div className="border-t border-[#EBEBEB] pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-[#888888] tracking-tight">
                Appends to training triage queue &amp; Google Docs log
              </span>
            </div>
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <button
                type="button"
                onClick={handleCopyFormattedEntry}
                className="bg-white hover:bg-[#FAFAFA] border border-[#EBEBEB] text-[#171717] text-xs font-medium px-3.5 py-2 rounded-md transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Formatted Entry for Google Doc</span>
                  </>
                )}
              </button>

              <button
                type="submit"
                className={`text-white text-xs font-medium px-4 py-2 rounded-md shadow-xs transition-colors cursor-pointer ${
                  submittedStatus ? 'bg-[#047857]' : 'bg-[#171717] hover:bg-[#262626]'
                }`}
              >
                {submittedStatus || 'Submit Feedback →'}
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* Section 4: Live Community Triage Queue */}
      <section className="bg-white border border-[#EBEBEB] rounded-lg p-5 shadow-xs flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#888888] font-semibold">
            RECENT COMMUNITY CONTRIBUTIONS &amp; TRIAGE LOG ({queue.length})
          </span>
          <span className="text-[11px] font-mono text-[#047857] bg-[#D1FAE5] px-2 py-0.5 rounded border border-[#A7F3D0]">
            Sync Engine: Active
          </span>
        </div>

        <div className="space-y-3 pt-1">
          {queue.map((item) => (
            <div
              key={item.id}
              className="p-3 bg-[#FAFAFA] border border-[#EBEBEB] rounded-md text-xs space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold text-[#171717]">{item.id}</span>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-white border border-[#EBEBEB] text-[#4D4D4D]">
                    {item.feedbackType.replace('_', ' ')}
                  </span>
                  {item.domain && (
                    <span className="text-[11px] px-2 py-0.5 rounded bg-white border border-[#EBEBEB] text-[#0369A1]">
                      {item.domain}
                    </span>
                  )}
                </div>
                <span className="font-mono text-[11px] text-[#888888]">{item.timestamp}</span>
              </div>

              <div className="font-medium text-[#171717]">Q: {item.query}</div>
              <p className="text-[#4D4D4D] leading-relaxed">{item.explanation}</p>

              {item.referenceUrl && (
                <div className="pt-1">
                  <a
                    href={item.referenceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[11px] text-[#0070F3] hover:underline inline-flex items-center gap-1"
                  >
                    <span>{item.referenceUrl}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
