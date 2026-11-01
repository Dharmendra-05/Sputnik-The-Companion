import { useState, useEffect, useCallback } from 'react';
import { Header, ActiveTab } from './components/Header';
import { ChatView } from './components/ChatView';
import { WalkGuideView } from './components/WalkGuideView';
import { FeedbackCorpusView } from './components/FeedbackCorpusView';
import { SystemInitModal } from './components/SystemInitModal';
import { checkBackendHealth } from './services/sputnikApi';
import { BackendStatus } from './types/sputnik';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat');
  const [targetLandmarkId, setTargetLandmarkId] = useState<string | null>(null);
  const [showInitModal, setShowInitModal] = useState<boolean>(false);
  const [isFirstBoot, setIsFirstBoot] = useState<boolean>(true);
  const [backendStatus, setBackendStatus] = useState<BackendStatus | null>(null);

  // Poll backend health status
  const refreshBackendHealth = useCallback(async () => {
    try {
      const status = await checkBackendHealth();
      setBackendStatus(status);
    } catch {
      setBackendStatus({
        isConnected: false,
        url: '',
        error: 'Backend unreachable',
      });
    }
  }, []);

  useEffect(() => {
    refreshBackendHealth();
    // Re-check backend health periodically every 20 seconds
    const interval = setInterval(refreshBackendHealth, 20000);
    return () => clearInterval(interval);
  }, [refreshBackendHealth]);

  // Check URL parameters: e.g. ?view=feedback or ?init=1
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view') as ActiveTab | null;
    if (viewParam && (viewParam === 'chat' || viewParam === 'navigation' || viewParam === 'feedback')) {
      setActiveTab(viewParam);
    }
    if (params.get('init') === '1') {
      setShowInitModal(true);
      setIsFirstBoot(false);
    }
  }, []);

  const handleNavigateToLandmark = (landmarkId: string) => {
    setTargetLandmarkId(landmarkId);
    setActiveTab('navigation');
  };

  const handleNavigateWalk = (originId: string, destId: string) => {
    setTargetLandmarkId(destId);
    setActiveTab('navigation');
  };

  const handleOpenFeedback = (_prefilledQuery?: string) => {
    setActiveTab('feedback');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#171717] flex flex-col font-sans">
      {/* 56px Top Utility Header with 3 Tabs */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'chat') {
            setTargetLandmarkId(null);
          }
        }}
        isBackendConnected={backendStatus?.isConnected ?? false}
        onOpenSystemInit={() => {
          setIsFirstBoot(false);
          setShowInitModal(true);
        }}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full">
        {activeTab === 'chat' && (
          <ChatView
            onNavigateToLandmark={handleNavigateToLandmark}
            onOpenFeedback={handleOpenFeedback}
            onNavigateWalk={handleNavigateWalk}
          />
        )}
        {activeTab === 'navigation' && (
          <WalkGuideView initialLandmarkId={targetLandmarkId} />
        )}
        {activeTab === 'feedback' && (
          <FeedbackCorpusView />
        )}
      </main>

      {/* System Initialization & Backend Telemetry Modal */}
      <SystemInitModal
        isOpen={showInitModal}
        onClose={() => setShowInitModal(false)}
        autoClose={isFirstBoot}
        backendStatus={backendStatus}
        onRefreshBackend={refreshBackendHealth}
      />
    </div>
  );
}

