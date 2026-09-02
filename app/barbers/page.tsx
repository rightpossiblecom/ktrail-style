'use client';

import { useWorkspace } from '@/components/workspace/WorkspaceProvider';

export default function BarbersPage() {
	const { workspace } = useWorkspace();

	return (
		<div className="space-y-8">
			<div>
				<p className="kicker">Team</p>
				<h1 className="heading-display mt-2 text-[1.75rem] leading-tight sm:text-3xl">Barbers on the floor</h1>
				<p className="mt-2 text-sm text-[var(--color-cream-muted)]">
					{workspace.shop.chairCount} chairs · {workspace.shop.operator} operating
				</p>
			</div>

			{workspace.team.length === 0 ? (
				<div className="card p-6 text-sm text-[var(--color-cream-muted)] sm:p-8">
					Load the Fade District sample to see the roster.
				</div>
			) : (
				<>
					<ul className="grid gap-3 md:hidden">
						{workspace.team.map((member) => (
							<li key={member.id} className="card p-4">
								<p className="font-semibold">{member.name}</p>
								<p className="mt-1 text-sm text-[var(--color-cream-muted)]">{member.role}</p>
								<p className="mt-2 text-sm text-[var(--color-cobalt)]">
									{workspace.bookings.filter((booking) => booking.barberName === member.name).length}{' '}
									bookings
								</p>
							</li>
						))}
					</ul>
					<div className="card hidden overflow-x-auto md:block">
						<table className="w-full text-left text-sm">
							<thead className="bg-[var(--color-surface)] text-xs uppercase tracking-[0.08em] text-[var(--color-cream-dim)]">
								<tr>
									<th className="px-4 py-3">Name</th>
									<th className="px-4 py-3">Role</th>
									<th className="px-4 py-3">Bookings</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-[var(--color-line)]">
								{workspace.team.map((member) => (
									<tr key={member.id}>
										<td className="px-4 py-3">{member.name}</td>
										<td className="px-4 py-3 text-[var(--color-cream-muted)]">{member.role}</td>
										<td className="px-4 py-3 text-[var(--color-cobalt)]">
											{workspace.bookings.filter((booking) => booking.barberName === member.name).length}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</>
			)}
		</div>
	);
}
