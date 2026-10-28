import { LandmarkNode, WalkwayEdge, NavigationResponse, TurnInstruction } from '../types/sputnik';

/**
 * 14 Canonical ABV-IIITM Gwalior Landmarks
 * Planar 2D SVG canvas projection (800 x 520)
 */
export const CAMPUS_LANDMARKS: LandmarkNode[] = [
  {
    id: 'main_gate',
    name: 'Institute Main Entrance Gate',
    shortLabel: 'Main Gate',
    category: 'gate',
    x: 100,
    y: 390,
    nodeCode: 'NODE_01',
    description: 'Main security checkpoint, visitor registry, vehicular access control, and auto stand.',
  },
  {
    id: 'admin_block',
    name: 'Administrative Block & Directorate',
    shortLabel: 'Admin Block',
    category: 'admin',
    x: 210,
    y: 340,
    nodeCode: 'NODE_02',
    description: 'Director office, Registrar desk, Finance & Accounts, and Academic Administration.',
  },
  {
    id: 'academic_block',
    name: 'Main Academic Block & Lecture Theatres',
    shortLabel: 'Academic Block (A/B)',
    category: 'academic',
    x: 350,
    y: 330,
    nodeCode: 'NODE_03',
    description: 'Classroom complex (LT-1 to LT-6), faculty chambers, department seminar halls.',
  },
  {
    id: 'library',
    name: 'Learning Resource Centre (Central Library)',
    shortLabel: 'Central Library',
    category: 'academic',
    x: 170,
    y: 220,
    nodeCode: 'NODE_04',
    description: 'Multi-storey knowledge repository, digital IEEE/ACM research terminal, reading halls.',
  },
  {
    id: 'computer_center',
    name: 'Computer Centre & Server Labs',
    shortLabel: 'Computer Center',
    category: 'academic',
    x: 390,
    y: 190,
    nodeCode: 'NODE_05',
    description: 'High-performance computing cluster, institute network NOC, student workstation labs.',
  },
  {
    id: 'health_center',
    name: 'Institute Health Care Center',
    shortLabel: 'Health Center',
    category: 'facility',
    x: 220,
    y: 405,
    nodeCode: 'NODE_06',
    description: '24/7 emergency medical outpatient clinic, dispensary, and on-call ambulance station.',
  },
  {
    id: 'gh',
    name: 'Gangotri Girls Hostel (GH)',
    shortLabel: 'Girls Hostel (GH)',
    category: 'hostel',
    x: 440,
    y: 390,
    nodeCode: 'NODE_07',
    description: 'Residential quarters for female students with internal dining mess and badminton courts.',
  },
  {
    id: 'bh1',
    name: 'Aravali Boys Hostel (BH-1)',
    shortLabel: 'BH-1 (Aravali)',
    category: 'hostel',
    x: 650,
    y: 345,
    nodeCode: 'NODE_08',
    description: 'Undergraduate residential hall with student recreation common hall and reading room.',
  },
  {
    id: 'bh2',
    name: 'Nilgiri Boys Hostel (BH-2)',
    shortLabel: 'BH-2 (Nilgiri)',
    category: 'hostel',
    x: 670,
    y: 270,
    nodeCode: 'NODE_09',
    description: 'Senior undergraduate hall equipped with high-speed LAN per room and table tennis arena.',
  },
  {
    id: 'bh3',
    name: 'Shivalik Boys Hostel (BH-3)',
    shortLabel: 'BH-3 (Shivalik)',
    category: 'hostel',
    x: 650,
    y: 200,
    nodeCode: 'NODE_10',
    description: 'Postgraduate and doctoral scholar hostel blocks surrounded by quiet woodland zone.',
  },
  {
    id: 'central_mess',
    name: 'Central Dining & Student Mess',
    shortLabel: 'Central Mess',
    category: 'facility',
    x: 570,
    y: 385,
    nodeCode: 'NODE_11',
    description: 'Multi-wing student dining facility serving breakfast, lunch, high tea, and dinner.',
  },
  {
    id: 'cafeteria',
    name: 'Institute Cafeteria & Nescafe Point',
    shortLabel: 'SAC Cafeteria',
    category: 'facility',
    x: 480,
    y: 340,
    nodeCode: 'NODE_12',
    description: 'Student Activity Centre eatery, evening hangout hub, juice bar, and stationery shop.',
  },
  {
    id: 'mdp_center',
    name: 'MDP Centre & Visitors Hostel (VH)',
    shortLabel: 'MDP Center',
    category: 'facility',
    x: 520,
    y: 210,
    nodeCode: 'NODE_13',
    description: 'Executive development centre, guest suites for visiting professors, conference suites.',
  },
  {
    id: 'sports_complex',
    name: 'Sports Complex, Gymnasium & Athletic Grounds',
    shortLabel: 'Sports Complex & Gym',
    category: 'facility',
    x: 640,
    y: 130,
    nodeCode: 'NODE_14',
    description: 'Olympic-size athletic track, cricket pavilion, floodlit basketball, tennis, and gym.',
  },
];

/**
 * 20 Undirected Weighted Walkway Edges
 * Distance in meters measured along paved campus corridors
 */
export const CAMPUS_EDGES: WalkwayEdge[] = [
  { from: 'main_gate', to: 'admin_block', distance: 160, pathType: 'Perimeter avenue' },
  { from: 'main_gate', to: 'health_center', distance: 180, pathType: 'Perimeter avenue' },
  { from: 'admin_block', to: 'library', distance: 190, pathType: 'Paved walkway' },
  { from: 'admin_block', to: 'academic_block', distance: 150, pathType: 'Paved walkway' },
  { from: 'admin_block', to: 'health_center', distance: 120, pathType: 'Connecting corridor' },
  { from: 'library', to: 'computer_center', distance: 220, pathType: 'Paved walkway' },
  { from: 'computer_center', to: 'academic_block', distance: 160, pathType: 'Paved walkway' },
  { from: 'computer_center', to: 'mdp_center', distance: 210, pathType: 'Garden path' },
  { from: 'academic_block', to: 'cafeteria', distance: 130, pathType: 'Paved walkway' },
  { from: 'academic_block', to: 'health_center', distance: 170, pathType: 'Connecting corridor' },
  { from: 'health_center', to: 'gh', distance: 240, pathType: 'Garden path' },
  { from: 'gh', to: 'cafeteria', distance: 150, pathType: 'Connecting corridor' },
  { from: 'gh', to: 'sports_complex', distance: 280, pathType: 'Athletic promenade' },
  { from: 'cafeteria', to: 'central_mess', distance: 110, pathType: 'Paved walkway' },
  { from: 'central_mess', to: 'bh1', distance: 120, pathType: 'Paved walkway' },
  { from: 'bh1', to: 'bh2', distance: 90, pathType: 'Paved walkway' },
  { from: 'bh2', to: 'bh3', distance: 95, pathType: 'Paved walkway' },
  { from: 'bh3', to: 'sports_complex', distance: 190, pathType: 'Athletic promenade' },
  { from: 'mdp_center', to: 'sports_complex', distance: 200, pathType: 'Garden path' },
  { from: 'cafeteria', to: 'mdp_center', distance: 230, pathType: 'Garden path' },
];

/**
 * Adjacency List Map helper
 */
interface Neighbor {
  to: string;
  distance: number;
  pathType: WalkwayEdge['pathType'];
}

const adjacencyList = new Map<string, Neighbor[]>();

// Initialize adjacency list once
CAMPUS_LANDMARKS.forEach((node) => adjacencyList.set(node.id, []));
CAMPUS_EDGES.forEach((edge) => {
  adjacencyList.get(edge.from)?.push({ to: edge.to, distance: edge.distance, pathType: edge.pathType });
  adjacencyList.get(edge.to)?.push({ to: edge.from, distance: edge.distance, pathType: edge.pathType });
});

export function getLandmarkById(id: string): LandmarkNode | undefined {
  return CAMPUS_LANDMARKS.find((lm) => lm.id === id);
}

/**
 * Deterministic Dijkstra Shortest-Path Navigation Solver
 */
export function computeShortestPath(originId: string, destinationId: string): NavigationResponse {
  const startTime = performance.now();

  const originNode = getLandmarkById(originId) || CAMPUS_LANDMARKS[0];
  const destNode = getLandmarkById(destinationId) || CAMPUS_LANDMARKS[13];

  if (originId === destinationId) {
    return {
      origin: originNode.id,
      origin_name: originNode.name,
      destination: destNode.id,
      destination_name: destNode.name,
      distance_meters: 0,
      estimated_minutes: 0,
      path_nodes: [originNode.id],
      path_names: [originNode.name],
      instructions: [
        {
          step: 1,
          fromName: originNode.name,
          toName: destNode.name,
          instructionText: `You are already at ${originNode.name}.`,
          distanceMeters: 0,
          estimatedMinutes: 0,
          pathTypeNote: 'Current location',
        },
      ],
      legs_count: 0,
      paved_percentage: 100,
      shade_factor_percentage: 100,
      elevation_delta_m: 0,
      execution_ms: 0.4,
    };
  }

  // Priority queue / distances setup
  const distances = new Map<string, number>();
  const previous = new Map<string, { prevNode: string; distance: number; pathType: string }>();
  const unvisited = new Set<string>();

  CAMPUS_LANDMARKS.forEach((node) => {
    distances.set(node.id, Infinity);
    unvisited.add(node.id);
  });

  distances.set(originId, 0);

  while (unvisited.size > 0) {
    // Find unvisited node with smallest distance
    let currentId: string | null = null;
    let minDistance = Infinity;

    for (const nodeId of unvisited) {
      const dist = distances.get(nodeId)!;
      if (dist < minDistance) {
        minDistance = dist;
        currentId = nodeId;
      }
    }

    if (currentId === null || minDistance === Infinity) {
      break;
    }

    if (currentId === destinationId) {
      break; // Reached destination
    }

    unvisited.delete(currentId);

    const neighbors = adjacencyList.get(currentId) || [];
    for (const neighbor of neighbors) {
      if (!unvisited.has(neighbor.to)) continue;

      const alt = minDistance + neighbor.distance;
      if (alt < distances.get(neighbor.to)!) {
        distances.set(neighbor.to, alt);
        previous.set(neighbor.to, {
          prevNode: currentId,
          distance: neighbor.distance,
          pathType: neighbor.pathType,
        });
      }
    }
  }

  // Reconstruct path
  const pathNodes: string[] = [];
  const edgeDetails: Array<{ from: string; to: string; distance: number; pathType: string }> = [];

  let curr: string | undefined = destinationId;
  while (curr && curr !== originId) {
    pathNodes.unshift(curr);
    const prevInfo = previous.get(curr);
    if (prevInfo) {
      edgeDetails.unshift({
        from: prevInfo.prevNode,
        to: curr,
        distance: prevInfo.distance,
        pathType: prevInfo.pathType,
      });
      curr = prevInfo.prevNode;
    } else {
      break;
    }
  }
  pathNodes.unshift(originId);

  const totalDistance = distances.get(destinationId) || 0;
  // Walking speed 80m/min
  const estimatedMinutes = Math.round((totalDistance / 80) * 10) / 10;

  // Build step-by-step turn-by-turn guidance
  const instructions: TurnInstruction[] = edgeDetails.map((edge, idx) => {
    const fromL = getLandmarkById(edge.from);
    const toL = getLandmarkById(edge.to);
    const legMinutes = Math.round((edge.distance / 80) * 10) / 10;

    let directive = `Walk ${edge.distance}m from ${fromL?.shortLabel || edge.from} to ${toL?.shortLabel || edge.to}.`;
    if (idx === 0) {
      directive = `Walk ${edge.distance}m from ${fromL?.name || edge.from} along ${edge.pathType.toLowerCase()} to ${toL?.shortLabel || edge.to}.`;
    } else if (idx === edgeDetails.length - 1) {
      directive = `Follow ${edge.pathType.toLowerCase()} ${edge.distance}m straight into ${toL?.name || edge.to}.`;
    } else {
      directive = `Proceed along ${edge.pathType.toLowerCase()} for ${edge.distance}m toward ${toL?.shortLabel || edge.to}.`;
    }

    return {
      step: idx + 1,
      fromName: fromL?.name || edge.from,
      toName: toL?.name || edge.to,
      instructionText: directive,
      distanceMeters: edge.distance,
      estimatedMinutes: legMinutes,
      pathTypeNote: idx === edgeDetails.length - 1 ? 'Arrival at terminus' : edge.pathType,
    };
  });

  const pathNames = pathNodes.map((id) => getLandmarkById(id)?.name || id);
  const executionMs = Math.max(0.8, Math.round((performance.now() - startTime) * 10) / 10);

  // Shade & elevation metrics based on route characteristics
  const hasGardenOrAvenue = edgeDetails.some((e) => e.pathType === 'Garden path' || e.pathType === 'Perimeter avenue');
  const shadeFactor = hasGardenOrAvenue ? 65 : 50;
  const elevationDelta = +(totalDistance * 0.0034).toFixed(1);

  return {
    origin: originNode.id,
    origin_name: originNode.name,
    destination: destNode.id,
    destination_name: destNode.name,
    distance_meters: totalDistance,
    estimated_minutes: estimatedMinutes,
    path_nodes: pathNodes,
    path_names: pathNames,
    instructions,
    legs_count: edgeDetails.length,
    paved_percentage: 100,
    shade_factor_percentage: shadeFactor,
    elevation_delta_m: elevationDelta,
    execution_ms: executionMs,
  };
}
