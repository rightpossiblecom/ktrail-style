import type { AnalyzeRequest, StylePreviewResult, StyleRecommendation } from './types';

function hashSeed(input: string): number {
	let h = 0;
	for (let i = 0; i < input.length; i++) {
		h = (h * 31 + input.charCodeAt(i)) >>> 0;
	}
	return h;
}

function pickId(req: AnalyzeRequest): string {
	const seed = hashSeed(`${req.clientName}|${req.city}|${req.requestedStyle}`);
	return `preview_${seed.toString(16)}`;
}

export function proceduralAnalyze(req: AnalyzeRequest): StylePreviewResult {
	const ask = req.requestedStyle.toLowerCase();
	const wantsFade = /fade|skin|taper|line/.test(ask);
	const wantsBeard = /beard|goatee|mustache/.test(ask);
	const wantsColor = /color|highlight|caramel|copper|dye|bleach/.test(ask);
	const curly = req.hairTexture === 'curly' || req.hairTexture === 'coily';

	const styles: StyleRecommendation[] = [];

	if (wantsFade || (!wantsBeard && !wantsColor)) {
		styles.push({
			name: 'Low skin fade',
			category: 'cut',
			why: curly
				? 'Keeps density on top for curly/coily texture while cleaning the perimeter for a sharp finish.'
				: 'Clean Nigerian street fade that works across oval and square faces with low weekly upkeep.',
			difficulty: 'easy',
		});
		styles.push({
			name: 'Taper + line-up',
			category: 'cut',
			why: 'Strong temple and neck line without a full disconnect - good for humid weather and busy chairs.',
			difficulty: 'medium',
		});
	}

	if (wantsBeard || styles.length < 3) {
		styles.push({
			name: 'Beard sculpt + oil finish',
			category: 'beard',
			why: 'Balances the jaw so the cut reads finished in photos and WhatsApp previews.',
			difficulty: 'easy',
		});
	}

	if (wantsColor) {
		styles.push({
			name: 'Caramel face-frame highlights',
			category: 'color',
			why: 'Warms the perimeter without full-head lift risk - consult-friendly for first color clients.',
			difficulty: 'medium',
		});
		styles.push({
			name: 'Subtle copper tip test',
			category: 'color',
			why: 'Lower-commitment color test before a larger highlight session.',
			difficulty: 'easy',
		});
	}

	styles.push({
		name: 'Cut + light beard shape',
		category: 'combo',
		why: 'Full reset package barbers can upsell after a successful style preview.',
		difficulty: 'medium',
	});

	const recommendedStyles = styles.slice(0, 5);
	while (recommendedStyles.length < 3) {
		recommendedStyles.push({
			name: 'Classic scissor crop',
			category: 'cut',
			why: 'Safe fallback shape when the brief is vague - easy to refine in-chair.',
			difficulty: 'easy',
		});
	}

	let confidence = 76;
	if (wantsFade || wantsColor || wantsBeard) confidence += 6;
	if (req.faceShape !== 'unknown') confidence += 4;
	if (req.hairTexture !== 'unknown') confidence += 4;
	if (ask.length < 4) confidence -= 8;
	confidence = Math.max(70, Math.min(90, confidence));

	let nextAction: StylePreviewResult['nextAction'] = 'book_chair';
	if (ask.length < 4) nextAction = 'refine_brief';
	else if (wantsColor) nextAction = 'send_to_barber';

	const suggestedBarberType = wantsColor
		? 'Color-capable stylist'
		: wantsBeard && !wantsFade
			? 'Beard specialist'
			: 'Skin-fade specialist';

	return {
		id: pickId(req),
		createdAt: new Date().toISOString(),
		clientName: req.clientName,
		city: req.city,
		faceShape: req.faceShape,
		hairTexture: req.hairTexture,
		requestedStyle: req.requestedStyle,
		recommendedStyles,
		previewNotes: req.imageMeta
			? `Photo meta noted (${req.imageMeta}). Match lighting and head angle before the chair consult.`
			: 'Procedural preview pack for Wave 1 demo - barber should confirm texture and growth pattern in person.',
		suggestedBarberType,
		confidence,
		nextAction,
	};
}
