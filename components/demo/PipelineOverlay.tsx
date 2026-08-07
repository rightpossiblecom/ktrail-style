'use client';

import { useEffect, useState } from 'react';
import { demoFlow } from '@/config/demo-flow';

const STEP_MS = 800;

export function PipelineOverlay({
	open,
	onComplete,
}: {
	open: boolean;
	onComplete: () => void;
}) {
	const steps = demoFlow.pipelineSteps;
	const [index, setIndex] = useState(0);

	useEffect(() => {
		if (!open) {
			setIndex(0);
			return;
		}

		setIndex(0);
		let i = 0;
		const timer = window.setInterval(() => {
			i += 1;
			if (i >= steps.length) {
				window.clearInterval(timer);
				onComplete();
				return;
			}
			setIndex(i);
		}, STEP_MS);

		return () => window.clearInterval(timer);
	}, [open, onComplete, steps.length]);

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-[80] flex items-center justify-center bg-[var(--color-bg-deep)]/92 px-6 backdrop-blur-sm">
			<div className="w-full max-w-md border border-[var(--color-line)] bg-[var(--color-bg)] p-8">
				<p className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[var(--color-copper)]">
					Style pipeline
				</p>
				<h2 className="heading-display mt-3 text-2xl text-[var(--color-cream)]">
					Building preview pack
				</h2>
				<ul className="mt-8 space-y-4">
					{steps.map((step, i) => {
						const done = i < index;
						const active = i === index;
						return (
							<li
								key={step.id}
								className={`flex items-center gap-3 border-b border-[var(--color-line)] pb-3 text-sm ${
									active
										? 'text-[var(--color-cream)]'
										: done
											? 'text-[var(--color-copper)]'
											: 'text-[var(--color-cream-dim)]'
								}`}
							>
								<span className="heading-display w-8 text-[var(--color-copper)]">
									{String(i + 1).padStart(2, '0')}
								</span>
								<span>{step.label}</span>
								{active && (
									<span className="ml-auto text-[0.6rem] uppercase tracking-[0.18em] text-[var(--color-copper)]">
										Running
									</span>
								)}
								{done && (
									<span className="ml-auto text-[0.6rem] uppercase tracking-[0.18em]">Done</span>
								)}
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
