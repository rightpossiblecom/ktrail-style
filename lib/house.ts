/** Shared CloudGrant collection names. */

export function houseSlug(): string {
	const slug = process.env.CLOUDGRANT_HOUSE?.trim().toLowerCase();
	if (!slug) {
		throw new Error('Set CLOUDGRANT_HOUSE in .env.local (harbor, ibrahim, ktrail).');
	}
	return slug;
}

export function col(table: string): string {
	return `${houseSlug()}-${table}`;
}
