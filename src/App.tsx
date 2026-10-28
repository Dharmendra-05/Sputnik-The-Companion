import { useState } from 'react';
import { Header, ActiveTab } from './components/Header';
import { ChatView } from './components/ChatView';
import { WalkGuideView } from './components/WalkGuideView';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat');
  const [targetLandmarkId, setTargetLandmarkId] = useState<string | null>(null);

  const handleNavigateToLandmark = (landmarkId: string) => {
    setTargetLandmarkId(landmarkId);
    setActiveTab('navigation');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#171717] flex flex-col font-sans">
      {/* 56px Top Utility Header */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'chat') {
            setTargetLandmarkId(null);
          }
        }}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full">
        {activeTab === 'chat' ? (
          <ChatView onNavigateToLandmark={handleNavigateToLandmark} />
        ) : (
          <WalkGuideView initialLandmarkId={targetLandmarkId} />
        )}
      </main>
    </div>
  );
}
