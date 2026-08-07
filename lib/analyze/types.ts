/** Intake contract — shared by Gemini, procedural fallback, and demo seeds. */

export type StyleRecommendation = {
	name: string;
	category: 'cut' | 'color' | 'beard' | 'combo';
	why: string;
	difficulty: 'easy' | 'medium' | 'bold';
};

export type StylePreviewResult = {
	id: string;
	createdAt: string;
	clientName: string;
	city: string;
	faceShape: 'oval' | 'round' | 'square' | 'heart' | 'long' | 'diamond' | 'unknown';
	hairTexture: 'straight' | 'wavy' | 'curly' | 'coily' | 'unknown';
	requestedStyle: string;
	recommendedStyles: StyleRecommendation[];
	previewNotes: string;
	suggestedBarberType: string;
	confidence: number;
	nextAction: 'book_chair' | 'send_to_barber' | 'refine_brief';
};

export type AnalyzeRequest = {
	clientName: string;
	city: string;
	faceShape: StylePreviewResult['faceShape'];
	hairTexture: StylePreviewResult['hairTexture'];
	requestedStyle: string;
	imageMeta?: string;
};

const FACE = new Set<StylePreviewResult['faceShape']>([
	'oval',
	'round',
	'square',
	'heart',
	'long',
	'diamond',
	'unknown',
]);

const TEXTURE = new Set<StylePreviewResult['hairTexture']>([
	'straight',
	'wavy',
	'curly',
	'coily',
	'unknown',
]);

const ACTIONS = new Set<StylePreviewResult['nextAction']>([
	'book_chair',
	'send_to_barber',
	'refine_brief',
]);

export function validateResult(obj: unknown): StylePreviewResult {
	if (!obj || typeof obj !== 'object') {
		throw new Error('Result must be an object');
	}
	const r = obj as Partial<StylePreviewResult>;
	if (!r.id || !r.createdAt || !r.clientName || !r.city || !r.requestedStyle) {
		throw new Error('Missing required result fields');
	}
	if (!FACE.has(r.faceShape as StylePreviewResult['faceShape'])) {
		throw new Error('Invalid faceShape');
	}
	if (!TEXTURE.has(r.hairTexture as StylePreviewResult['hairTexture'])) {
		throw new Error('Invalid hairTexture');
	}
	if (!Array.isArray(r.recommendedStyles) || r.recommendedStyles.length < 3) {
		throw new Error('recommendedStyles must have at least 3 items');
	}
	if (typeof r.previewNotes !== 'string' || typeof r.suggestedBarberType !== 'string') {
		throw new Error('Missing previewNotes or suggestedBarberType');
	}
	if (typeof r.confidence !== 'number' || r.confidence < 0 || r.confidence > 100) {
		throw new Error('confidence must be 0–100');
	}
	if (!ACTIONS.has(r.nextAction as StylePreviewResult['nextAction'])) {
		throw new Error('Invalid nextAction');
	}
	return r as StylePreviewResult;
}
