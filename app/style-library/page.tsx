'use client';

import { useWorkspace } from '@/components/workspace/WorkspaceProvider';

export default function StyleLibraryPage() {
	const { workspace } = useWorkspace();
	const styles = workspace.services.map((service) => service.name);

	return (
		<div className="space-y-8">
			<div>
				<p className="kicker">Preview Studio</p>
				<h1 className="heading-display mt-2 text-3xl">Styles tied to bookings</h1>
				<p className="mt-2 text-sm text-[var(--color-cream-muted)]">
					Consultation tools stay attached to the active shop case.
				</p>
			</div>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{(styles.length ? styles : ['Load a sample to attach styles']).map((name) => (
					<article key={name} className="card p-5">
						<p className="text-xs uppercase tracking-[0.08em] text-[var(--color-cream-dim)]">Cut</p>
						<h2 className="heading-display mt-3 text-xl">{name}</h2>
					</article>
				))}
			</div>
		</div>
	);
}
