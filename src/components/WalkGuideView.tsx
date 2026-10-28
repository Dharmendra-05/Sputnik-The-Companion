import React, { useState, useEffect } from 'react';
import { ArrowUpDown, Bike } from 'lucide-react';
import { CAMPUS_LANDMARKS, computeShortestPath } from '../data/campusGraphData';
import { NavigationResponse } from '../types/sputnik';
import { TopologyMapSVG } from './TopologyMapSVG';

interface WalkGuideViewProps {
  initialLandmarkId?: string | null;
}

export const WalkGuideView: React.FC<WalkGuideViewProps> = ({ initialLandmarkId }) => {
  const [originId, setOriginId] = useState<string>('main_gate');
  const [destinationId, setDestinationId] = useState<string>('sports_complex');
  const [navigationResult, setNavigationResult] = useState<NavigationResponse>(() =>
    computeShortestPath('main_gate', 'sports_complex')
  );

  // If a landmark was passed from ChatView, set it as destination
  useEffect(() => {
    if (initialLandmarkId) {
      setDestinationId(initialLandmarkId);
      setNavigationResult(computeShortestPath(originId, initialLandmarkId));
    }
  }, [initialLandmarkId]);

  const handleCompute = (from = originId, to = destinationId) => {
    const res = computeShortestPath(from, to);
    setNavigationResult(res);
  };

  const handleSwap = () => {
    const newFrom = destinationId;
    const newTo = originId;
    setOriginId(newFrom);
    setDestinationId(newTo);
    handleCompute(newFrom, newTo);
  };

  const handleSelectOrigin = (id: string) => {
    setOriginId(id);
    handleCompute(id, destinationId);
  };

  const handleSelectDestination = (id: string) => {
    setDestinationId(id);
    handleCompute(originId, id);
  };

  const handleResetView = () => {
    setOriginId('main_gate');
    setDestinationId('sports_complex');
    handleCompute('main_gate', 'sports_complex');
  };

  return (
    <div className="w-full max-w-[1120px] mx-auto px-4 pt-6 pb-20">
      {/* Subheader breadcrumbs & Engine Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="text-xs font-mono tracking-wider uppercase text-[#888888]">
          NAVIGATION SYSTEM /{' '}
          <span className="text-[#171717] font-semibold">CAMPUS WALK GUIDE (160-ACRE GRID)</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-full border border-[#BAE6FD] text-[#0369A1] shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] animate-pulse" />
            <span>Dijkstra Engine: Online</span>
          </div>
          <span className="text-[#888888]">v2.4.1</span>
        </div>
      </div>

      {/* 2-Column Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-start">
        {/* Left Column: Route Controller & Stepper */}
        <div className="space-y-5">
          {/* Form Card */}
          <div className="bg-white border border-[#EBEBEB] rounded-lg p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#666666]">
              DIJKSTRA SHORTEST PATH SOLVER (14 LANDMARKS)
            </h3>

            {/* Origin Select */}
            <div>
              <label htmlFor="origin-select" className="block text-[11px] font-mono uppercase text-[#888888] mb-1.5">
                ORIGIN
              </label>
              <select
                id="origin-select"
                value={originId}
                onChange={(e) => {
                  setOriginId(e.target.value);
                  handleCompute(e.target.value, destinationId);
                }}
                className="w-full h-10 px-3 text-xs bg-white border border-[#EBEBEB] rounded-md text-[#171717] focus:border-[#171717] focus:ring-1 focus:ring-[#171717] outline-hidden truncate"
              >
                {CAMPUS_LANDMARKS.map((lm) => (
                  <option key={lm.id} value={lm.id}>
                    {lm.name} ({lm.id})
                  </option>
                ))}
              </select>
            </div>

            {/* Destination Select & Swap Button */}
            <div className="relative">
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="dest-select" className="text-[11px] font-mono uppercase text-[#888888]">
                  DESTINATION
                </label>
                <button
                  type="button"
                  onClick={handleSwap}
                  className="flex items-center gap-1 text-[11px] font-mono text-[#0070F3] hover:text-[#0761D1] transition-colors"
                  title="Swap Origin and Destination"
                >
                  <ArrowUpDown className="w-3 h-3" />
                  <span>Swap</span>
                </button>
              </div>

              <select
                id="dest-select"
                value={destinationId}
                onChange={(e) => {
                  setDestinationId(e.target.value);
                  handleCompute(originId, e.target.value);
                }}
                className="w-full h-10 px-3 text-xs bg-white border border-[#EBEBEB] rounded-md text-[#171717] focus:border-[#171717] focus:ring-1 focus:ring-[#171717] outline-hidden truncate"
              >
                {CAMPUS_LANDMARKS.map((lm) => (
                  <option key={lm.id} value={lm.id}>
                    {lm.name} ({lm.id})
                  </option>
                ))}
              </select>
            </div>

            {/* Compute Button */}
            <button
              type="button"
              onClick={() => handleCompute()}
              className="w-full h-10 bg-[#171717] text-white rounded-md text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#2E2E2E] active:scale-98 transition-all"
            >
              <span>Compute Walking Route</span>
            </button>
          </div>

          {/* Route Summary Banner */}
          <div className="bg-white border border-[#EBEBEB] rounded-lg p-5 shadow-xs space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-[17px] font-semibold tracking-tight text-[#171717]">
                  {navigationResult.distance_meters} meters · ~{navigationResult.estimated_minutes} mins
                </div>
                <div className="text-xs text-[#888888]">walking pace @ 80m/min</div>
              </div>

              <span className="px-2 py-0.5 rounded bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD] text-[11px] font-mono font-medium">
                Optimal
              </span>
            </div>

            {/* Path Nodes Chain */}
            <div className="p-2.5 bg-[#F5F5F5] rounded border border-[#EBEBEB] font-mono text-xs text-[#0070F3] break-words leading-relaxed">
              {navigationResult.path_nodes.join(' → ')}
            </div>

            {/* Road Quality / Environmental Metrics */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#EBEBEB] text-[11px] font-mono text-[#666666]">
              <div>
                <span className="text-[#888888] block text-[10px]">Surface</span>
                <span className="font-semibold text-[#171717]">100% Paved</span>
              </div>
              <div>
                <span className="text-[#888888] block text-[10px]">Shade factor</span>
                <span className="font-semibold text-[#171717]">{navigationResult.shade_factor_percentage}%</span>
              </div>
              <div>
                <span className="text-[#888888] block text-[10px]">Elevation Δ</span>
                <span className="font-semibold text-[#171717]">+{navigationResult.elevation_delta_m}m</span>
              </div>
            </div>
          </div>

          {/* Turn-by-Turn Stepper */}
          <div className="bg-white border border-[#EBEBEB] rounded-lg p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-semibold uppercase tracking-wider text-[#666666]">
                TURN-BY-TURN DIRECTIONS
              </span>
              <span className="text-[#888888]">{navigationResult.legs_count} legs</span>
            </div>

            <div className="space-y-4 pt-1">
              {navigationResult.instructions.map((inst) => (
                <div key={inst.step} className="flex items-start gap-3">
                  {/* Step Number Circle */}
                  <div className="w-5 h-5 rounded-full bg-[#171717] text-white text-[11px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {inst.step}
                  </div>

                  {/* Step Content */}
                  <div className="space-y-1.5 flex-1">
                    <p className="text-xs text-[#171717] leading-relaxed">
                      {inst.instructionText}
                    </p>

                    <div className="flex items-center gap-2 text-[10px] font-mono">
                      <span className="px-1.5 py-0.5 bg-[#F5F5F5] rounded border border-[#EBEBEB] text-[#555555]">
                        {inst.distanceMeters}m · ~{inst.estimatedMinutes} mins
                      </span>
                      <span className="text-[#888888]">{inst.pathTypeNote}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pedestrian / Cycle Advisory Footer Note */}
          <div className="p-3.5 bg-white border border-[#EBEBEB] rounded-lg flex items-start gap-2.5 text-xs text-[#666666]">
            <Bike className="w-4 h-4 text-[#888888] shrink-0 mt-0.5" />
            <p className="leading-relaxed text-[11px]">
              Cycle racks are available at Main Gate & Sports Pavilion. Walking recommended along interior paved corridors with solar lighting.
            </p>
          </div>
        </div>

        {/* Right Column: 2D Interactive Topological Map SVG */}
        <div className="w-full">
          <TopologyMapSVG
            navigationResult={navigationResult}
            onSelectOrigin={handleSelectOrigin}
            onSelectDestination={handleSelectDestination}
            onResetView={handleResetView}
          />
        </div>
      </div>
    </div>
  );
};
