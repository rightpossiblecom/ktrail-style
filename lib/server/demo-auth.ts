import { createHash } from 'node:crypto';
import type { SessionUser } from '@/lib/server/session';

export function demoUserFromEmail(email: string): SessionUser {
	const normalized = email.trim().toLowerCase();
	return {
		uid: createHash('sha256').update(`ktrail:${normalized}`).digest('hex').slice(0, 24),
		email: normalized,
	};
}
