import { siteConfig } from '@/config/site';
import type { StylePreviewResult } from '@/lib/analyze/types';

function storageKey() {
	return siteConfig.storageKeys.assessments;
}

export function listAssessments(): StylePreviewResult[] {
	if (typeof window === 'undefined') return [];
	try {
		const raw = localStorage.getItem(storageKey());
		if (!raw) return [];
		const parsed = JSON.parse(raw) as StylePreviewResult[];
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}

export function getAssessment(id: string): StylePreviewResult | null {
	return listAssessments().find((a) => a.id === id) ?? null;
}

export function saveAssessment(result: StylePreviewResult): StylePreviewResult {
	const next = [result, ...listAssessments().filter((a) => a.id !== result.id)];
	localStorage.setItem(storageKey(), JSON.stringify(next));
	return result;
}
