'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { BookChairModal } from '@/components/demo/BookChairModal';
import { DemoToast } from '@/components/demo/DemoToast';
import { SendToBarberModal } from '@/components/demo/SendToBarberModal';
import { siteConfig } from '@/config/site';
import { getAssessment } from '@/lib/assessments';
import type { StylePreviewResult } from '@/lib/analyze/types';

function Field({ label, value }: { label: string; value: string }) {
	return (
		<div>
			<p className="text-[0.6rem] uppercase tracking-[0.2em] text-[var(--color-cream-dim)]">{label}</p>
			<p className="mt-1 text-sm text-[var(--color-cream)]">{value}</p>
		</div>
	);
}

export default function ProjectResultPage() {
	const params = useParams();
	const id = String(params?.id ?? '');
	const [result, setResult] = useState<StylePreviewResult | null>(null);
	const [ready, setReady] = useState(false);
	const [bookOpen, setBookOpen] = useState(false);
	const [sendOpen, setSendOpen] = useState(false);
	const [toast, setToast] = useState<string | null>(null);

	const dismissToast = useCallback(() => setToast(null), []);

	useEffect(() => {
		if (!id) {
			setReady(true);
			return;
		}
		const fromStore = getAssessment(id);
		const fromSeed = siteConfig.demoResults.find((r) => r.id === id) ?? null;
		setResult(fromStore ?? fromSeed);
		setReady(true);
	}, [id]);

	if (!ready) {
		return (
			<p className="text-sm text-[var(--color-cream-dim)]">Loading preview…</p>
		);
	}

	if (!result) {
		return (
			<div className="mx-auto max-w-2xl space-y-6">
				<p className="text-sm text-[var(--color-cream-muted)]">No preview found for this id.</p>
				<Link
					href="/dashboard"
					className="inline-flex text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-copper)] hover:underline"
				>
					Back to overview
				</Link>
			</div>
		);
	}

	const preferBook = result.nextAction === 'book_chair';
	const preferSend = result.nextAction === 'send_to_barber';
	const primaryBtn =
		'rounded-full bg-[var(--color-copper)] px-6 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-bg-deep)]';
	const secondaryBtn =
		'rounded-full border border-[var(--color-line-strong)] px-6 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-cream)]';

	return (
		<div className="mx-auto max-w-2xl space-y-8">
			<div>
				<p className="text-[0.65rem] uppercase tracking-[0.28em] text-[var(--color-copper)]">
					Style preview
				</p>
				<h1 className="heading-display mt-2 text-3xl lg:text-4xl">{result.clientName}</h1>
				<p className="mt-2 text-sm text-[var(--color-cream-muted)]">
					{result.city} · {result.confidence}% confidence
				</p>
			</div>

			<div className="grid gap-5 border border-[var(--color-line)] bg-[var(--color-bg-deep)] p-6 sm:grid-cols-2">
				<Field label="Preview id" value={result.id} />
				<Field
					label="Created"
					value={new Date(result.createdAt).toLocaleString()}
				/>
				<Field label="Client" value={result.clientName} />
				<Field label="City" value={result.city} />
				<Field label="Face shape" value={result.faceShape} />
				<Field label="Hair texture" value={result.hairTexture} />
				<Field label="Requested style" value={result.requestedStyle} />
				<Field label="Suggested barber type" value={result.suggestedBarberType} />
				<Field label="Confidence" value={`${result.confidence}%`} />
				<Field
					label="Next action"
					value={
						result.nextAction === 'book_chair'
							? 'Request a chair'
							: result.nextAction === 'send_to_barber'
								? 'Send to barber'
								: result.nextAction
					}
				/>
				<div className="sm:col-span-2">
					<p className="text-[0.6rem] uppercase tracking-[0.2em] text-[var(--color-cream-dim)]">
						Preview notes
					</p>
					<p className="mt-1 text-sm leading-relaxed text-[var(--color-cream-muted)]">
						{result.previewNotes}
					</p>
				</div>
			</div>

			<div className="border border-[var(--color-line)] bg-[var(--color-bg-deep)]">
				<div className="border-b border-[var(--color-line)] px-6 py-4">
					<p className="text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-copper)]">
						Recommended styles
					</p>
				</div>
				<ul className="divide-y divide-[var(--color-line)]">
					{result.recommendedStyles.map((s) => (
						<li key={s.name} className="px-6 py-4">
							<div className="flex flex-wrap items-baseline justify-between gap-2">
								<p className="text-sm font-medium text-[var(--color-cream)]">{s.name}</p>
								<p className="text-[0.6rem] uppercase tracking-[0.18em] text-[var(--color-cream-dim)]">
									{s.category} · {s.difficulty}
								</p>
							</div>
							<p className="mt-2 text-sm text-[var(--color-cream-muted)]">{s.why}</p>
						</li>
					))}
				</ul>
			</div>

			<div className="flex flex-wrap gap-3">
				<button
					type="button"
					onClick={() => setBookOpen(true)}
					className={preferBook || !preferSend ? primaryBtn : secondaryBtn}
				>
					Request a chair
				</button>
				<button
					type="button"
					onClick={() => setSendOpen(true)}
					className={preferSend ? primaryBtn : secondaryBtn}
				>
					Send preview to barber
				</button>
			</div>

			<Link
				href="/dashboard"
				className="inline-flex text-[0.68rem] uppercase tracking-[0.2em] text-[var(--color-copper)] hover:underline"
			>
				Back to overview
			</Link>

			<BookChairModal
				open={bookOpen}
				result={result}
				onClose={() => setBookOpen(false)}
				onSuccess={setToast}
			/>
			<SendToBarberModal
				open={sendOpen}
				result={result}
				onClose={() => setSendOpen(false)}
				onSuccess={setToast}
			/>
			<DemoToast message={toast} onDismiss={dismissToast} />
		</div>
	);
}
