'use client';

import { useEffect } from 'react';

export function DemoToast({
	message,
	onDismiss,
}: {
	message: string | null;
	onDismiss: () => void;
}) {
	useEffect(() => {
		if (!message) return;
		const t = window.setTimeout(onDismiss, 2500);
		return () => window.clearTimeout(t);
	}, [message, onDismiss]);

	if (!message) return null;

	return (
		<div className="fixed bottom-6 left-1/2 z-[90] w-[min(92vw,28rem)] -translate-x-1/2 border border-[var(--color-copper)] bg-[var(--color-bg-deep)] px-5 py-4 text-center shadow-lg">
			<p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-copper)]">
				Demo
			</p>
			<p className="mt-2 text-sm text-[var(--color-cream)]">{message}</p>
		</div>
	);
}
