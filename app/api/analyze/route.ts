import { NextResponse } from 'next/server';
import { proceduralAnalyze } from '@/lib/analyze/procedural';
import { callGeminiAnalyze } from '@/lib/analyze/prompt';
import {
	validateResult,
	type AnalyzeRequest,
	type StylePreviewResult,
} from '@/lib/analyze/types';

const FACE = new Set([
	'oval',
	'round',
	'square',
	'heart',
	'long',
	'diamond',
	'unknown',
]);
const TEXTURE = new Set(['straight', 'wavy', 'curly', 'coily', 'unknown']);

function parseBody(body: unknown): AnalyzeRequest | null {
	if (!body || typeof body !== 'object') return null;
	const b = body as Record<string, unknown>;
	const clientName = String(b.clientName ?? '').trim();
	const city = String(b.city ?? '').trim();
	const requestedStyle = String(b.requestedStyle ?? '').trim();
	if (!clientName || !city || !requestedStyle) return null;

	const faceRaw = String(b.faceShape ?? 'unknown');
	const textureRaw = String(b.hairTexture ?? 'unknown');

	return {
		clientName,
		city,
		requestedStyle,
		faceShape: (FACE.has(faceRaw) ? faceRaw : 'unknown') as AnalyzeRequest['faceShape'],
		hairTexture: (TEXTURE.has(textureRaw)
			? textureRaw
			: 'unknown') as AnalyzeRequest['hairTexture'],
		imageMeta: b.imageMeta ? String(b.imageMeta) : undefined,
	};
}

export async function POST(request: Request) {
	let json: unknown;
	try {
		json = await request.json();
	} catch {
		return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
	}

	const req = parseBody(json);
	if (!req) {
		return NextResponse.json(
			{ error: 'Required: clientName, city, requestedStyle' },
			{ status: 400 },
		);
	}

	let result: StylePreviewResult;

	try {
		if (process.env.GEMINI_API_KEY) {
			try {
				result = await callGeminiAnalyze(req);
			} catch (err) {
				console.warn('[KTrail analyze] Gemini failed, using procedural:', err);
				result = proceduralAnalyze(req);
			}
		} else {
			result = proceduralAnalyze(req);
		}
		result = validateResult(result);
	} catch (err) {
		console.error('[KTrail analyze] fatal:', err);
		return NextResponse.json({ error: 'Analyze failed' }, { status: 500 });
	}

	return NextResponse.json(result);
}
