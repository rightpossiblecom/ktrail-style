'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useWorkspace } from '@/components/workspace/WorkspaceProvider';

const ANALYSIS_MS = 90_000;
const STAGES = [
	'Reading the WhatsApp request',
	'Identifying the service',
	'Matching the best barber',
	'Finding an open chair',
	'Preparing price and deposit',
];

const fieldClass =
	'mt-2 w-full rounded-xl border border-[var(--color-line-strong)] bg-[var(--color-bg-deep)] px-4 py-3 text-sm outline-none focus:border-[var(--color-cobalt)]';

export default function InboxPage() {
	const router = useRouter();
	const { loadSample } = useWorkspace();
	const [clientName, setClientName] = useState('');
	const [requestText, setRequestText] = useState('');
	const [fileName, setFileName] = useState('');
	const [error, setError] = useState('');
	const [analyzing, setAnalyzing] = useState(false);
	const [remaining, setRemaining] = useState(ANALYSIS_MS);
	const [notify, setNotify] = useState(false);
	const [notifyArmed, setNotifyArmed] = useState(false);

	useEffect(() => {
		if (!analyzing) return undefined;
		const started = Date.now();
		const timer = window.setInterval(() => {
			const left = Math.max(0, ANALYSIS_MS - (Date.now() - started));
			setRemaining(left);
			if (left === 0) {
				window.clearInterval(timer);
				loadSample();
				router.push('/projects/req_tunde_wedding');
			}
		}, 250);
		return () => window.clearInterval(timer);
	}, [analyzing, loadSample, router]);

	function fillSample() {
		setClientName('Tunde Adebayo');
		setRequestText('Low taper before a wedding. Thursday afternoon if Chinedu is free.');
		setFileName('whatsapp-tunde-wedding.png');
		setError('');
	}

	function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!clientName.trim() || (!requestText.trim() && !fileName)) {
			setError('Add the client and a WhatsApp screenshot, selfie, or typed request.');
			return;
		}
		setAnalyzing(true);
		setRemaining(ANALYSIS_MS);
	}

	const stageIndex = Math.min(
		STAGES.length - 1,
		Math.floor(((ANALYSIS_MS - remaining) / ANALYSIS_MS) * STAGES.length),
	);

	if (analyzing) {
		return (
			<div className="mx-auto max-w-lg space-y-5">
				<p className="kicker">Smart Inbox</p>
				<h1 className="heading-display text-[1.75rem] leading-tight sm:text-3xl">Building the booking pack</h1>
				<p className="text-sm text-[var(--color-cream-muted)]">
					{Math.ceil(remaining / 1000)} seconds remaining. Leave if you want — we will write when it is done.
				</p>
				<ul className="card divide-y divide-[var(--color-line)]">
					{STAGES.map((stage, index) => (
						<li
							key={stage}
							className="flex items-start justify-between gap-4 px-4 py-3.5 text-sm sm:items-center sm:px-5"
						>
							<span className="min-w-0 pr-2 leading-snug">{stage}</span>
							<span className="shrink-0 pt-0.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--color-success)] sm:pt-0 sm:text-xs">
								{index < stageIndex ? 'Done' : index === stageIndex ? 'Running' : 'Queued'}
							</span>
						</li>
					))}
				</ul>
				<label className="flex min-h-11 items-center gap-3 text-sm">
					<input
						type="checkbox"
						checked={notify}
						onChange={(event) => {
							setNotify(event.target.checked);
							if (event.target.checked) setNotifyArmed(true);
						}}
					/>
					Notify me when it is done
				</label>
				{notifyArmed && (
					<p className="text-sm text-[var(--color-success)]">
						Pending note set. Command will get a done note when the pack is ready.
					</p>
				)}
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-lg space-y-8">
			<div>
				<p className="kicker">Smart Inbox</p>
				<h1 className="heading-display mt-2 text-[1.75rem] leading-tight sm:text-3xl">New client request</h1>
				<p className="mt-3 text-sm text-[var(--color-cream-muted)]">
					Upload a WhatsApp screenshot or selfie, or type the request. Use the Fade District sample for the recording.
				</p>
			</div>
			<form onSubmit={onSubmit} className="space-y-5">
				<div>
					<label className="text-xs font-semibold uppercase tracking-[0.08em]" htmlFor="clientName">
						Client
					</label>
					<input
						id="clientName"
						value={clientName}
						onChange={(event) => setClientName(event.target.value)}
						className={fieldClass}
						placeholder="Tunde Adebayo"
					/>
				</div>
				<div>
					<p className="text-xs font-semibold uppercase tracking-[0.08em]">WhatsApp screenshot or selfie</p>
					<label className="btn-secondary mt-2 w-full cursor-pointer">
						<input
							id="artifact"
							type="file"
							accept="image/*"
							onChange={(event) => setFileName(event.target.files?.[0]?.name ?? '')}
							className="sr-only"
						/>
						{fileName || 'Choose screenshot or selfie'}
					</label>
				</div>
				<div>
					<label className="text-xs font-semibold uppercase tracking-[0.08em]" htmlFor="requestText">
						Typed request
					</label>
					<textarea
						id="requestText"
						rows={4}
						value={requestText}
						onChange={(event) => setRequestText(event.target.value)}
						className={fieldClass}
						placeholder="Low taper before a wedding…"
					/>
				</div>
				{error && <p className="text-sm text-[var(--color-cobalt)]">{error}</p>}
				<div className="flex flex-col gap-3 sm:flex-row">
					<button type="button" onClick={fillSample} className="btn-secondary w-full sm:w-auto">
						Use Fade District sample
					</button>
					<button type="submit" className="btn-primary w-full sm:w-auto">
						Run analysis
					</button>
				</div>
			</form>
		</div>
	);
}
