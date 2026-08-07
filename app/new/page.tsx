'use client';

import { useCallback, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { PipelineOverlay } from '@/components/demo/PipelineOverlay';
import { demoFlow } from '@/config/demo-flow';
import { siteConfig } from '@/config/site';
import { saveAssessment } from '@/lib/assessments';
import type { StylePreviewResult } from '@/lib/analyze/types';

const fieldClass =
	'mt-2 w-full border border-[var(--color-line-strong)] bg-[var(--color-bg-deep)] px-4 py-3 text-sm text-[var(--color-cream)] outline-none placeholder:text-[var(--color-cream-dim)] focus:border-[var(--color-copper)]';

const labelClass = 'block text-[0.65rem] font-medium uppercase tracking-[0.22em] text-[var(--color-cream-dim)]';

type Mode = 'upload' | 'manual';

export default function NewPreviewPage() {
	const router = useRouter();
	const [mode, setMode] = useState<Mode>('upload');
	const [error, setError] = useState('');
	const [busy, setBusy] = useState(false);
	const [overlayOpen, setOverlayOpen] = useState(false);
	const [pendingFileName, setPendingFileName] = useState('');
	const [uploadClientName, setUploadClientName] = useState('Walk-in client');
	const [uploadCity, setUploadCity] = useState('Ado-Ekiti');

	const finishUpload = useCallback(() => {
		const seed = siteConfig.demoResults[0];
		if (!seed) {
			setError('No demo seed available.');
			setOverlayOpen(false);
			setBusy(false);
			return;
		}
		const id = `preview_upload_${Date.now()}`;
		const result: StylePreviewResult = {
			...seed,
			id,
			createdAt: new Date().toISOString(),
			clientName: uploadClientName.trim() || 'Walk-in client',
			city: uploadCity.trim() || 'Ado-Ekiti',
			previewNotes: pendingFileName
				? `Choreographed demo from photo "${pendingFileName}". ${seed.previewNotes}`
				: seed.previewNotes,
		};
		saveAssessment(result);
		setOverlayOpen(false);
		setBusy(false);
		router.push(`/projects/${id}`);
	}, [pendingFileName, router, uploadCity, uploadClientName]);

	function onUploadSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError('');
		const fd = new FormData(e.currentTarget);
		const file = fd.get('photo') as File | null;
		if (!file || !file.size) {
			setError('Choose a client photo to continue.');
			return;
		}
		setPendingFileName(file.name);
		setUploadClientName(String(fd.get('clientName') || 'Walk-in client').trim());
		setUploadCity(String(fd.get('city') || 'Ado-Ekiti').trim());
		setBusy(true);
		if (demoFlow.hardcodeVisionDemo) {
			setOverlayOpen(true);
		} else {
			finishUpload();
		}
	}

	async function onManualSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError('');
		setBusy(true);
		const fd = new FormData(e.currentTarget);
		const body = {
			clientName: String(fd.get('clientName') || '').trim(),
			city: String(fd.get('city') || '').trim(),
			faceShape: String(fd.get('faceShape') || 'unknown'),
			hairTexture: String(fd.get('hairTexture') || 'unknown'),
			requestedStyle: String(fd.get('requestedStyle') || '').trim(),
		};
		if (!body.clientName || !body.city || !body.requestedStyle) {
			setError('Name, city, and requested style are required.');
			setBusy(false);
			return;
		}
		try {
			const res = await fetch('/api/analyze', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});
			if (!res.ok) {
				throw new Error('Analyze failed');
			}
			const result = (await res.json()) as StylePreviewResult;
			saveAssessment(result);
			router.push(`/projects/${result.id}`);
		} catch {
			setError('Could not build preview. Try again.');
			setBusy(false);
		}
	}

	return (
		<>
			<div className="mx-auto max-w-lg space-y-8">
				<div>
					<p className="text-[0.65rem] uppercase tracking-[0.28em] text-[var(--color-copper)]">
						New preview
					</p>
					<h1 className="heading-display mt-2 text-3xl">Style preview intake</h1>
					<p className="mt-3 text-sm text-[var(--color-cream-muted)]">
						Upload a photo for the choreographed demo path, or enter a manual brief for analyze.
					</p>
				</div>

				<div className="flex gap-2 border-b border-[var(--color-line)] pb-3">
					{(['upload', 'manual'] as const).map((m) => (
						<button
							key={m}
							type="button"
							onClick={() => {
								setMode(m);
								setError('');
							}}
							className={`rounded-full px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] ${
								mode === m
									? 'bg-[var(--color-copper)] text-[var(--color-bg-deep)]'
									: 'text-[var(--color-cream-muted)] hover:text-[var(--color-cream)]'
							}`}
						>
							{m}
						</button>
					))}
				</div>

				{mode === 'upload' ? (
					<form onSubmit={onUploadSubmit} className="space-y-5">
						<div>
							<label className={labelClass} htmlFor="photo">
								Client photo
							</label>
							<input
								id="photo"
								name="photo"
								type="file"
								accept="image/*"
								required
								className={`${fieldClass} file:mr-4 file:border-0 file:bg-[var(--color-copper)] file:px-3 file:py-1 file:text-[0.65rem] file:font-semibold file:uppercase file:tracking-[0.14em] file:text-[var(--color-bg-deep)]`}
							/>
						</div>
						<div>
							<label className={labelClass} htmlFor="clientName">
								Client name
							</label>
							<input
								id="clientName"
								name="clientName"
								defaultValue="Walk-in client"
								className={fieldClass}
							/>
						</div>
						<div>
							<label className={labelClass} htmlFor="city">
								City
							</label>
							<input id="city" name="city" defaultValue="Ado-Ekiti" className={fieldClass} />
						</div>
						{error && <p className="text-sm text-[var(--color-copper-bright)]">{error}</p>}
						<button
							type="submit"
							disabled={busy}
							className="w-full rounded-full bg-[var(--color-copper)] px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-bg-deep)] disabled:opacity-60"
						>
							{busy ? 'Running pipeline…' : 'Run photo preview'}
						</button>
					</form>
				) : (
					<form onSubmit={onManualSubmit} className="space-y-5">
						<div>
							<label className={labelClass} htmlFor="m-clientName">
								Client name
							</label>
							<input id="m-clientName" name="clientName" required className={fieldClass} />
						</div>
						<div>
							<label className={labelClass} htmlFor="m-city">
								City
							</label>
							<input id="m-city" name="city" required className={fieldClass} placeholder="Lagos" />
						</div>
						<div>
							<label className={labelClass} htmlFor="faceShape">
								Face shape
							</label>
							<select id="faceShape" name="faceShape" className={fieldClass} defaultValue="unknown">
								<option value="unknown">Unknown</option>
								<option value="oval">Oval</option>
								<option value="round">Round</option>
								<option value="square">Square</option>
								<option value="heart">Heart</option>
								<option value="long">Long</option>
								<option value="diamond">Diamond</option>
							</select>
						</div>
						<div>
							<label className={labelClass} htmlFor="hairTexture">
								Hair texture
							</label>
							<select id="hairTexture" name="hairTexture" className={fieldClass} defaultValue="unknown">
								<option value="unknown">Unknown</option>
								<option value="straight">Straight</option>
								<option value="wavy">Wavy</option>
								<option value="curly">Curly</option>
								<option value="coily">Coily</option>
							</select>
						</div>
						<div>
							<label className={labelClass} htmlFor="requestedStyle">
								Requested style
							</label>
							<input
								id="requestedStyle"
								name="requestedStyle"
								required
								className={fieldClass}
								placeholder="Low skin fade"
							/>
						</div>
						{error && <p className="text-sm text-[var(--color-copper-bright)]">{error}</p>}
						<button
							type="submit"
							disabled={busy}
							className="w-full rounded-full bg-[var(--color-copper)] px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-bg-deep)] disabled:opacity-60"
						>
							{busy ? 'Analyzing…' : 'Build preview'}
						</button>
					</form>
				)}
			</div>

			<PipelineOverlay open={overlayOpen} onComplete={finishUpload} />
		</>
	);
}
