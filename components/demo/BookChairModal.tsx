'use client';

import { type FormEvent } from 'react';
import { demoFlow } from '@/config/demo-flow';
import { appendActivity } from '@/lib/activity';
import type { StylePreviewResult } from '@/lib/analyze/types';

const fieldClass =
	'mt-2 w-full border border-[var(--color-line-strong)] bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-cream)] outline-none focus:border-[var(--color-copper)]';

export function BookChairModal({
	open,
	result,
	onClose,
	onSuccess,
}: {
	open: boolean;
	result: StylePreviewResult;
	onClose: () => void;
	onSuccess: (toast: string) => void;
}) {
	if (!open) return null;

	const copy = demoFlow.modals.bookChair;
	const topStyle = result.recommendedStyles[0]?.name;

	function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const city = String(fd.get('barberCity') || '').trim() || result.city;
		appendActivity({
			previewId: result.id,
			clientName: result.clientName,
			city,
			action: 'book_chair',
			label: `Chair request · ${result.clientName} · ${city}${topStyle ? ` · ${topStyle}` : ''}`,
		});
		onSuccess(copy.successToast);
		onClose();
	}

	return (
		<div className="fixed inset-0 z-[85] flex items-center justify-center bg-[var(--color-bg-deep)]/80 px-4 backdrop-blur-sm">
			<div className="w-full max-w-md border border-[var(--color-line)] bg-[var(--color-bg-deep)] p-6">
				<p className="text-[0.65rem] uppercase tracking-[0.28em] text-[var(--color-copper)]">
					Conversion
				</p>
				<h2 className="heading-display mt-2 text-2xl text-[var(--color-cream)]">{copy.title}</h2>
				{topStyle && (
					<p className="mt-2 text-sm text-[var(--color-cream-muted)]">
						Top match: {topStyle}. Typical chair fee from ₦3,000 (demo).
					</p>
				)}
				<form onSubmit={onSubmit} className="mt-6 space-y-4">
					<div>
						<label className="text-[0.6rem] uppercase tracking-[0.2em] text-[var(--color-cream-dim)]">
							Barber city
						</label>
						<input
							name="barberCity"
							defaultValue={result.city}
							className={fieldClass}
							placeholder="Ado-Ekiti"
							required
						/>
					</div>
					<div>
						<label className="text-[0.6rem] uppercase tracking-[0.2em] text-[var(--color-cream-dim)]">
							Preferred day
						</label>
						<input
							name="preferredDay"
							className={fieldClass}
							placeholder="Saturday"
							required
						/>
					</div>
					<div>
						<label className="text-[0.6rem] uppercase tracking-[0.2em] text-[var(--color-cream-dim)]">
							Notes
						</label>
						<textarea name="notes" rows={3} className={fieldClass} placeholder="Low fade, neat lineup…" />
					</div>
					<div className="flex gap-3 pt-2">
						<button
							type="button"
							onClick={onClose}
							className="flex-1 rounded-full border border-[var(--color-line-strong)] px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-cream)]"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="flex-1 rounded-full bg-[var(--color-copper)] px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-bg-deep)]"
						>
							Save request
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
