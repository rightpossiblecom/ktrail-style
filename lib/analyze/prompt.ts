import { validateResult, type AnalyzeRequest, type StylePreviewResult } from './types';

const MODEL = 'gemini-2.5-flash';

export function buildAnalyzePrompt(req: AnalyzeRequest): string {
	return `You are KTrail Style's style-preview engine for Nigerian barbers and clients.
Return ONLY valid JSON (no markdown) matching this TypeScript shape:
{
  "id": string,
  "createdAt": ISO string,
  "clientName": string,
  "city": string,
  "faceShape": "oval"|"round"|"square"|"heart"|"long"|"diamond"|"unknown",
  "hairTexture": "straight"|"wavy"|"curly"|"coily"|"unknown",
  "requestedStyle": string,
  "recommendedStyles": [{ "name", "category": "cut"|"color"|"beard"|"combo", "why", "difficulty": "easy"|"medium"|"bold" }], // 3-5 items
  "previewNotes": string,
  "suggestedBarberType": string,
  "confidence": number 0-100,
  "nextAction": "book_chair"|"send_to_barber"|"refine_brief"
}

Rules:
- Nigerian multi-barber context (fades, line-ups, coils, beard work, consult-friendly color).
- Never mention Frisor, Berlin, Opencals, or European shop brands.
- Echo clientName, city, faceShape, hairTexture, requestedStyle from the input.
- recommendedStyles must have at least 3 items with concrete why text.

Client input:
${JSON.stringify(req, null, 2)}`;
}

export async function callGeminiAnalyze(req: AnalyzeRequest): Promise<StylePreviewResult> {
	const key = process.env.GEMINI_API_KEY;
	if (!key) {
		throw new Error('GEMINI_API_KEY missing');
	}

	const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`;
	const res = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			contents: [{ role: 'user', parts: [{ text: buildAnalyzePrompt(req) }] }],
			generationConfig: {
				temperature: 0.4,
				responseMimeType: 'application/json',
			},
		}),
	});

	if (!res.ok) {
		const errText = await res.text();
		throw new Error(`Gemini HTTP ${res.status}: ${errText.slice(0, 200)}`);
	}

	const data = (await res.json()) as {
		candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
	};
	const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
	if (!text) {
		throw new Error('Gemini returned empty content');
	}

	let parsed: unknown;
	try {
		parsed = JSON.parse(text);
	} catch {
		const match = text.match(/\{[\s\S]*\}/);
		if (!match) throw new Error('Gemini response was not JSON');
		parsed = JSON.parse(match[0]);
	}

	const result = validateResult(parsed);
	// Ensure identity fields stick to request
	return {
		...result,
		clientName: req.clientName,
		city: req.city,
		faceShape: req.faceShape,
		hairTexture: req.hairTexture,
		requestedStyle: req.requestedStyle,
		createdAt: result.createdAt || new Date().toISOString(),
		id: result.id || `preview_gemini_${Date.now()}`,
	};
}
