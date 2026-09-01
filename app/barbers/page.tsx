'use client';

import { useWorkspace } from '@/components/workspace/WorkspaceProvider';

export default function BarbersPage() {
	const { workspace } = useWorkspace();

	return (
		<div className="space-y-8">
			<div>
				<p className="kicker">Team</p>
				<h1 className="heading-display mt-2 text-3xl">Barbers on the floor</h1>
				<p className="mt-2 text-sm text-[var(--color-cream-muted)]">
					{workspace.shop.chairCount} chairs · {workspace.shop.operator} operating
				</p>
			</div>
			<div className="card overflow-x-auto">
				<table className="w-full min-w-[640px] text-left text-sm">
					<thead className="bg-[var(--color-surface)] text-xs uppercase tracking-[0.08em] text-[var(--color-cream-dim)]">
						<tr>
							<th className="px-4 py-3">Name</th>
							<th className="px-4 py-3">Role</th>
							<th className="px-4 py-3">Bookings</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-[var(--color-line)]">
						{workspace.team.length === 0 ? (
							<tr>
								<td colSpan={3} className="px-4 py-8 text-[var(--color-cream-muted)]">
									Load the Fade District sample to see the roster.
								</td>
							</tr>
						) : (
							workspace.team.map((member) => (
								<tr key={member.id}>
									<td className="px-4 py-3">{member.name}</td>
									<td className="px-4 py-3 text-[var(--color-cream-muted)]">{member.role}</td>
									<td className="px-4 py-3 text-[var(--color-cobalt)]">
										{workspace.bookings.filter((booking) => booking.barberName === member.name).length}
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
