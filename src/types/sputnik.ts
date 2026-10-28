/**
 * Sputnik Data Contracts & Types
 * Matching ABV-IIITM Gwalior classical ML pipeline and FastAPI schemas
 */

export type MLIntentCategoryId = 0 | 1 | 2 | 3 | 4;

export type MLIntentCategoryName =
  | 'Academics & Curriculum'
  | 'Administration & Governance'
  | 'Admissions & Careers'
  | 'Campus Facilities & Hostels'
  | 'Events & Notices';

export interface RetrievedExcerpt {
  doc_id: string;
  category: MLIntentCategoryName | string;
  url: string;
  similarity_score: number;
  adjusted_score: number;
  text: string;
}

export interface ChatRequest {
  query: string;
  use_svm: boolean;
}

export interface ChatResponse {
  query: string;
  answer: string;
  category: MLIntentCategoryName | string;
  category_id: number;
  confidence: number;
  model_type: 'Multinomial Logistic Regression' | 'Calibrated Linear SVM';
  domain_boost_applied: boolean;
  is_low_confidence_fallback: boolean;
  sources: string[];
  retrieved_excerpts: RetrievedExcerpt[];
  probabilities: Record<MLIntentCategoryName, number>;
  latency_ms: number;
}

export type LandmarkCategory = 'gate' | 'academic' | 'admin' | 'hostel' | 'facility';

export interface LandmarkNode {
  id: string;
  name: string;
  shortLabel: string;
  category: LandmarkCategory;
  x: number;
  y: number;
  nodeCode: string; // e.g. NODE_01
  description: string;
}

export interface WalkwayEdge {
  from: string;
  to: string;
  distance: number; // in meters
  pathType: 'Perimeter avenue' | 'Paved walkway' | 'Garden path' | 'Athletic promenade' | 'Connecting corridor';
}

export interface TurnInstruction {
  step: number;
  fromName: string;
  toName: string;
  instructionText: string;
  distanceMeters: number;
  estimatedMinutes: number;
  pathTypeNote: string;
}

export interface NavigationResponse {
  origin: string;
  origin_name: string;
  destination: string;
  destination_name: string;
  distance_meters: number;
  estimated_minutes: number;
  path_nodes: string[];
  path_names: string[];
  instructions: TurnInstruction[];
  legs_count: number;
  paved_percentage: number;
  shade_factor_percentage: number;
  elevation_delta_m: number;
  execution_ms: number;
}

export interface HotspotContact {
  id: string;
  title: string;
  office: string;
  location: string;
  timing: string;
  contact: string;
  scope: string;
}
