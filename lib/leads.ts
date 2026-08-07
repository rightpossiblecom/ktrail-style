import { siteConfig } from '@/config/site';

export type LeadFormType = 'waitlist' | 'demo' | 'early-access';

export type Lead = {
	id: string;
	type: LeadFormType;
	name: string;
	email: string;
	phone: string;
	city: string;
	role?: string;
	company?: string;
	need?: string;
	reason?: string;
	createdAt: string;
};

function storageKey() {
	return siteConfig.storageKeys.leads;
}

export function listLeads(): Lead[] {
	if (typeof window === 'undefined') return [];
	try {
		const raw = localStorage.getItem(storageKey());
		if (!raw) return [];
		const parsed = JSON.parse(raw) as Lead[];
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}

export function saveLead(input: Omit<Lead, 'id' | 'createdAt'>): Lead {
	const lead: Lead = {
		...input,
		id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
		createdAt: new Date().toISOString(),
	};
	const next = [lead, ...listLeads()];
	localStorage.setItem(storageKey(), JSON.stringify(next));
	return lead;
}
