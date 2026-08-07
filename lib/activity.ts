import { siteConfig } from '@/config/site';

export type ActivityAction = 'book_chair' | 'send_to_barber';

export type ActivityItem = {
	id: string;
	previewId: string;
	clientName: string;
	city: string;
	action: ActivityAction;
	label: string;
	createdAt: string;
};

function storageKey() {
	return siteConfig.storageKeys.activity;
}

export function listActivity(): ActivityItem[] {
	if (typeof window === 'undefined') return [];
	try {
		const raw = localStorage.getItem(storageKey());
		if (!raw) return [];
		const parsed = JSON.parse(raw) as ActivityItem[];
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}

export function appendActivity(
	input: Omit<ActivityItem, 'id' | 'createdAt'>,
): ActivityItem {
	const item: ActivityItem = {
		...input,
		id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
		createdAt: new Date().toISOString(),
	};
	const next = [item, ...listActivity()].slice(0, 50);
	localStorage.setItem(storageKey(), JSON.stringify(next));
	return item;
}
