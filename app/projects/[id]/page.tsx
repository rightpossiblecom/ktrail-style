'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useWorkspace } from '@/components/workspace/WorkspaceProvider';
import {
	composeWhatsAppUrl,
	formatNaira,
} from '@/lib/workspace/operations';

function Field({ label, value }: { label: string; value: string }) {
	return (
		<div>
			<p className="text-xs uppercase tracking-[0.08em] text-[var(--color-cream-dim)]">{label}</p>
			<p className="mt-1 text-sm font-medium">{value}</p>
		</div>
	);
}

export default function ProjectResultPage() {
	const params = useParams();
	const id = String(params?.id ?? '');
	const { workspace, hydrated, approveClientRequest } = useWorkspace();
	const request = workspace.requests.find((item) => item.id === id);

	if (!hydrated) {
		return <p className="text-sm text-[var(--color-cream-dim)]">Loading pack…</p>;
	}

	if (!request) {
		return (
			<div className="mx-auto max-w-2xl space-y-6">
				<p className="text-sm text-[var(--color-cream-muted)]">No booking pack for this request.</p>
				<Link href="/new" className="btn-primary">
					Open Inbox
				</Link>
			</div>
		);
	}

	const approved = request.status === 'approved';
	const requestId = request.id;

	function confirmAndSend() {
		approveClientRequest(requestId);
		window.open(composeWhatsAppUrl(workspace, requestId), '_blank', 'noopener,noreferrer');
	}

	return (
		<div className="mx-auto max-w-2xl space-y-8">
			<div>
				<p className="kicker">Booking pack</p>
				<h1 className="heading-display mt-2 text-[1.85rem] leading-tight sm:text-4xl">{request.clientName}</h1>
				<p className="mt-2 text-sm text-[var(--color-cream-muted)]">
					{workspace.shop.name} · {workspace.shop.city}
				</p>
			</div>

			<div className="card grid gap-5 p-6 sm:grid-cols-2">
				<Field label="Service" value={request.serviceDescription} />
				<Field label="Barber" value={request.matchedBarberName} />
				<Field label="Slot" value={request.slot} />
				<Field label="Duration" value={`${request.durationMinutes} minutes`} />
				<Field label="Price" value={formatNaira(request.price)} />
				<Field label="Deposit" value={formatNaira(request.depositAmount)} />
			</div>

			{approved ? (
				<p className="text-sm text-[var(--color-success)]">
					Confirmed. Command, Calendar, and Clients now share this booking.
				</p>
			) : (
				<button type="button" onClick={confirmAndSend} className="btn-primary w-full sm:w-auto">
					Send WhatsApp confirmation
				</button>
			)}

			<Link href="/dashboard" className="inline-flex text-sm font-semibold text-[var(--color-cobalt)]">
				Back to Command
			</Link>
		</div>
	);
}
