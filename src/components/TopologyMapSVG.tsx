import React, { useState } from 'react';
import { RotateCcw, Copy, Check, Compass } from 'lucide-react';
import { CAMPUS_LANDMARKS, CAMPUS_EDGES } from '../data/campusGraphData';
import { LandmarkNode, NavigationResponse } from '../types/sputnik';

interface TopologyMapSVGProps {
  navigationResult: NavigationResponse;
  onSelectOrigin: (id: string) => void;
  onSelectDestination: (id: string) => void;
  onResetView: () => void;
}

export const TopologyMapSVG: React.FC<TopologyMapSVGProps> = ({
  navigationResult,
  onSelectOrigin,
  onSelectDestination,
  onResetView,
}) => {
  const [copied, setCopied] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<LandmarkNode | null>(null);

  const pathNodes = navigationResult.path_nodes || [];
  const activePathSet = new Set(pathNodes);

  // Check if edge is on active path
  const isEdgeOnPath = (fromId: string, toId: string): boolean => {
    for (let i = 0; i < pathNodes.length - 1; i++) {
      if (
        (pathNodes[i] === fromId && pathNodes[i + 1] === toId) ||
        (pathNodes[i] === toId && pathNodes[i + 1] === fromId)
      ) {
        return true;
      }
    }
    return false;
  };

  const handleCopySteps = () => {
    const text = [
      `Sputnik Campus Navigation: ${navigationResult.origin_name} to ${navigationResult.destination_name}`,
      `Total Distance: ${navigationResult.distance_meters}m (~${navigationResult.estimated_minutes} mins)`,
      `Path: ${navigationResult.path_names.join(' → ')}`,
      '',
      'Turn-by-Turn Steps:',
      ...navigationResult.instructions.map(
        (inst) => `${inst.step}. ${inst.instructionText} (${inst.distanceMeters}m · ~${inst.estimatedMinutes} mins)`
      ),
    ].join('\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getNodeLegIndex = (id: string): number | null => {
    const idx = pathNodes.indexOf(id);
    return idx >= 0 ? idx : null;
  };

  return (
    <div className="bg-white border border-[#EBEBEB] rounded-lg p-5 shadow-xs flex flex-col">
      {/* Map Header & Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#171717]">
          160-ACRE CAMPUS TOPOLOGY (14 VERTICES · 20 WALKWAY EDGES)
        </h3>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0070F3]" />
            <span className="text-[#4D4D4D]">Active Route</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C7C7C7]" />
            <span className="text-[#888888]">Walkway Edge</span>
          </div>
        </div>
      </div>

      {/* Map Viewport Canvas */}
      <div className="relative w-full aspect-[800/520] rounded-md border border-[#EBEBEB] overflow-hidden map-grid-bg select-none">
        {/* Scale Tag */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 bg-white/90 backdrop-blur-xs rounded border border-[#EBEBEB] text-[11px] font-mono text-[#555555] shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#047857]" />
          <span>Scale: 1:2500 · Planar Projection</span>
        </div>

        {/* Compass Rose */}
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 bg-white/90 backdrop-blur-xs rounded border border-[#EBEBEB] text-[11px] font-mono font-semibold text-[#171717] shadow-xs">
          <Compass className="w-3.5 h-3.5 text-[#0070F3]" />
          <span>NORTH 000°</span>
        </div>

        {/* Hover Info Tooltip */}
        {hoveredNode && (
          <div className="absolute top-3 right-3 z-10 max-w-[240px] px-2.5 py-1.5 bg-[#171717] text-white rounded shadow-md text-xs pointer-events-none">
            <div className="font-semibold">{hoveredNode.name}</div>
            <div className="text-[10px] text-[#A1A1A1] font-mono">{hoveredNode.nodeCode}</div>
            <div className="text-[10px] text-[#D4D4D4] mt-0.5">Click to set Destination (Shift+click for Origin)</div>
          </div>
        )}

        {/* 2D Topological SVG */}
        <svg
          viewBox="0 0 800 520"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Defs for gradients & markers */}
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Pulsing beacon marker */}
            <radialGradient id="destGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0070F3" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0070F3" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 1. Inactive Walkway Edges */}
          <g id="inactive-edges">
            {CAMPUS_EDGES.map((edge, idx) => {
              const fromN = CAMPUS_LANDMARKS.find((l) => l.id === edge.from);
              const toN = CAMPUS_LANDMARKS.find((l) => l.id === edge.to);
              if (!fromN || !toN) return null;

              const active = isEdgeOnPath(edge.from, edge.to);
              if (active) return null; // Drawn in active layer

              return (
                <line
                  key={`edge-inactive-${idx}`}
                  x1={fromN.x}
                  y1={fromN.y}
                  x2={toN.x}
                  y2={toN.y}
                  stroke="#D8D8D8"
                  strokeWidth="2"
                  strokeDasharray="none"
                />
              );
            })}
          </g>

          {/* 2. Active Route Edges (Thick Blue Stroke) */}
          <g id="active-edges">
            {CAMPUS_EDGES.map((edge, idx) => {
              const fromN = CAMPUS_LANDMARKS.find((l) => l.id === edge.from);
              const toN = CAMPUS_LANDMARKS.find((l) => l.id === edge.to);
              if (!fromN || !toN) return null;

              const active = isEdgeOnPath(edge.from, edge.to);
              if (!active) return null;

              // Calculate edge midpoint for distance pill
              const midX = (fromN.x + toN.x) / 2;
              const midY = (fromN.y + toN.y) / 2;

              return (
                <g key={`edge-active-${idx}`}>
                  {/* Outer subtle glow */}
                  <line
                    x1={fromN.x}
                    y1={fromN.y}
                    x2={toN.x}
                    y2={toN.y}
                    stroke="#0070F3"
                    strokeWidth="8"
                    strokeOpacity="0.2"
                  />
                  {/* Crisp primary active line */}
                  <line
                    x1={fromN.x}
                    y1={fromN.y}
                    x2={toN.x}
                    y2={toN.y}
                    stroke="#0070F3"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  {/* Distance badge on active line */}
                  <g transform={`translate(${midX}, ${midY})`}>
                    <rect
                      x="-20"
                      y="-10"
                      width="40"
                      height="18"
                      rx="4"
                      fill="#FFFFFF"
                      stroke="#0070F3"
                      strokeWidth="1.25"
                    />
                    <text
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="text-[11px] font-mono font-semibold"
                      fill="#0070F3"
                    >
                      {edge.distance}m
                    </text>
                  </g>
                </g>
              );
            })}
          </g>

          {/* 3. Landmark Vertices */}
          <g id="nodes">
            {CAMPUS_LANDMARKS.map((node) => {
              const legIdx = getNodeLegIndex(node.id);
              const isOrigin = node.id === navigationResult.origin;
              const isDest = node.id === navigationResult.destination;
              const isOnPath = activePathSet.has(node.id);

              return (
                <g
                  key={node.id}
                  className="cursor-pointer transition-transform"
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={(e) => {
                    if (e.shiftKey || e.altKey) {
                      onSelectOrigin(node.id);
                    } else {
                      onSelectDestination(node.id);
                    }
                  }}
                >
                  {/* Node Halo / Pulse for Origin & Destination */}
                  {isDest && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="18"
                      fill="url(#destGradient)"
                      className="animate-pulse"
                    />
                  )}

                  {/* Node Circle */}
                  {isOrigin ? (
                    // Origin node: concentric double ring
                    <g>
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="9"
                        fill="#FFFFFF"
                        stroke="#171717"
                        strokeWidth="3"
                      />
                      <circle cx={node.x} cy={node.y} r="4" fill="#0070F3" />
                    </g>
                  ) : isDest ? (
                    // Destination node: vibrant blue target
                    <g>
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="9"
                        fill="#FFFFFF"
                        stroke="#0070F3"
                        strokeWidth="3.5"
                      />
                      <circle cx={node.x} cy={node.y} r="4.5" fill="#0070F3" />
                    </g>
                  ) : isOnPath ? (
                    // Intermediate leg node: blue ring
                    <g>
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="7.5"
                        fill="#FFFFFF"
                        stroke="#0070F3"
                        strokeWidth="3"
                      />
                      <circle cx={node.x} cy={node.y} r="2.5" fill="#0070F3" />
                    </g>
                  ) : (
                    // Default node: quiet gray ring
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="6"
                      fill="#FFFFFF"
                      stroke="#A1A1A1"
                      strokeWidth="2"
                    />
                  )}

                  {/* Vertex Labels */}
                  <g className="pointer-events-none select-none">
                    {(() => {
                      // Custom fine-tuned label offsets based on planar layout
                      let dx = 12;
                      let dy = -6;
                      let anchor: 'start' | 'end' | 'middle' = 'start';

                      if (node.id === 'main_gate') {
                        dx = -12;
                        dy = 18;
                        anchor = 'middle';
                      } else if (node.id === 'health_center') {
                        dx = 0;
                        dy = 22;
                        anchor = 'middle';
                      } else if (node.id === 'gh') {
                        dx = 14;
                        dy = 20;
                        anchor = 'start';
                      } else if (node.id === 'sports_complex') {
                        dx = -14;
                        dy = -10;
                        anchor = 'end';
                      } else if (node.id === 'library') {
                        dx = -12;
                        dy = -6;
                        anchor = 'end';
                      } else if (node.id === 'admin_block') {
                        dx = 12;
                        dy = -4;
                        anchor = 'start';
                      } else if (node.id === 'central_mess') {
                        dx = 14;
                        dy = 10;
                        anchor = 'start';
                      } else if (node.id === 'bh1' || node.id === 'bh2' || node.id === 'bh3') {
                        dx = 14;
                        dy = 0;
                        anchor = 'start';
                      }

                      return (
                        <>
                          {/* Primary Label */}
                          <text
                            x={node.x + dx}
                            y={node.y + dy}
                            textAnchor={anchor}
                            className={`text-[12px] font-sans ${
                              isOrigin || isDest
                                ? 'font-bold fill-[#0070F3]'
                                : isOnPath
                                ? 'font-semibold fill-[#0070F3]'
                                : 'font-medium fill-[#333333]'
                            }`}
                          >
                            {node.shortLabel}
                            {isOrigin ? ' (Origin)' : isDest ? ' (Dest)' : ''}
                          </text>

                          {/* Secondary Monospace Node Code */}
                          <text
                            x={node.x + dx}
                            y={node.y + dy + 11}
                            textAnchor={anchor}
                            className="text-[9px] font-mono fill-[#777777]"
                          >
                            {node.nodeCode}
                            {legIdx !== null && legIdx > 0 && !isDest
                              ? ` [LEG ${legIdx}]`
                              : isDest
                              ? ' [TERMINUS]'
                              : ''}
                          </text>
                        </>
                      );
                    })()}
                  </g>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Map Bottom Telemetry & Utility Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-3 border-t border-[#EBEBEB]">
        <div className="flex items-center gap-3 text-xs font-mono text-[#666666]">
          <span className="px-2.5 py-1 bg-[#F5F5F5] rounded border border-[#EBEBEB] text-[#171717]">
            Dijkstra execution: {navigationResult.execution_ms}ms
          </span>
          <span className="hidden sm:inline text-[#888888]">
            Graph density: 0.22 (Sparse planar)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onResetView}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-[#F5F5F5] hover:bg-[#EBEBEB] text-[#171717] border border-[#EBEBEB] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset View</span>
          </button>

          <button
            type="button"
            onClick={handleCopySteps}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-[#F5F5F5] hover:bg-[#EBEBEB] text-[#171717] border border-[#EBEBEB] transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Steps</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
