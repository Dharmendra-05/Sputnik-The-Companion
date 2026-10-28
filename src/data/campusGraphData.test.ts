import test from 'node:test';
import assert from 'node:assert/strict';
import { CAMPUS_LANDMARKS, CAMPUS_EDGES, computeShortestPath } from './campusGraphData';

test('14 canonical ABV-IIITM landmarks are present and unique', () => {
  assert.equal(CAMPUS_LANDMARKS.length, 14);
  const ids = new Set(CAMPUS_LANDMARKS.map((l) => l.id));
  assert.equal(ids.size, 14);
  assert.ok(ids.has('main_gate'));
  assert.ok(ids.has('sports_complex'));
  assert.ok(ids.has('health_center'));
  assert.ok(ids.has('gh'));
  assert.ok(ids.has('library'));
});

test('20 undirected campus walkway edges are defined', () => {
  assert.equal(CAMPUS_EDGES.length, 20);
  CAMPUS_EDGES.forEach((edge) => {
    assert.ok(edge.distance > 0);
    assert.ok(edge.from);
    assert.ok(edge.to);
  });
});

test('Dijkstra computes optimal route from main_gate to sports_complex (700m, 8.8 mins, 3 legs)', () => {
  const result = computeShortestPath('main_gate', 'sports_complex');
  assert.equal(result.distance_meters, 700);
  assert.equal(result.estimated_minutes, 8.8);
  assert.deepEqual(result.path_nodes, ['main_gate', 'health_center', 'gh', 'sports_complex']);
  assert.equal(result.instructions.length, 3);
  assert.equal(result.instructions[0].distanceMeters, 180);
  assert.equal(result.instructions[1].distanceMeters, 240);
  assert.equal(result.instructions[2].distanceMeters, 280);
});

test('Dijkstra returns zero distance for same origin and destination', () => {
  const result = computeShortestPath('library', 'library');
  assert.equal(result.distance_meters, 0);
  assert.equal(result.estimated_minutes, 0);
  assert.deepEqual(result.path_nodes, ['library']);
});

test('Dijkstra computes path between library and central_mess', () => {
  const result = computeShortestPath('library', 'central_mess');
  assert.ok(result.distance_meters > 0);
  assert.ok(result.path_nodes.length >= 3);
  assert.equal(result.path_nodes[0], 'library');
  assert.equal(result.path_nodes[result.path_nodes.length - 1], 'central_mess');
});
