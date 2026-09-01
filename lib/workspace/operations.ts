import type {
	Booking,
	Client,
	ClientRequest,
	Deposit,
	KTrailWorkspace,
	WorkspaceMetrics,
} from "./types";

export function formatNaira(amount: number): string {
	return `₦${amount.toLocaleString("en-US")}`;
}

export const DEMO_WHATSAPP_NUMBER = "2348015550180";

export function composeWhatsAppUrl(
	workspace: KTrailWorkspace,
	requestId: string,
): string {
	const message = composeWhatsAppMessage(workspace, requestId);
	return `https://wa.me/${DEMO_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function findRequest(
	workspace: KTrailWorkspace,
	requestId: string,
): ClientRequest | undefined {
	return workspace.requests.find((request) => request.id === requestId);
}

export function approveRequest(
	workspace: KTrailWorkspace,
	requestId: string,
): KTrailWorkspace {
	const request = findRequest(workspace, requestId);

	if (!request || request.status === "approved") {
		return workspace;
	}

	const client: Client = {
		id: `client_${request.id}`,
		name: request.clientName,
	};
	const booking: Booking = {
		id: `booking_${request.id}`,
		requestId: request.id,
		clientName: request.clientName,
		barberName: request.matchedBarberName,
		serviceDescription: request.serviceDescription,
		slot: request.slot,
		durationMinutes: request.durationMinutes,
		price: request.price,
		utilizationGainPercent: request.utilizationGainPercent,
	};
	const deposit: Deposit = {
		id: `deposit_${request.id}`,
		requestId: request.id,
		clientId: client.id,
		amount: request.depositAmount,
		status: "due",
	};

	return {
		...workspace,
		requests: workspace.requests.map((candidate) =>
			candidate.id === request.id
				? { ...candidate, status: "approved" }
				: candidate,
		),
		bookings: [...workspace.bookings, booking],
		clients: [...workspace.clients, client],
		deposits: [...workspace.deposits, deposit],
		activity: [
			...workspace.activity,
			{
				id: `activity_approved_${request.id}`,
				type: "request-approved",
				message: `${request.clientName} approved with ${request.matchedBarberName}`,
			},
		],
	};
}

export function calculateMetrics(
	workspace: KTrailWorkspace,
): WorkspaceMetrics {
	const bookingRevenue = workspace.bookings.reduce(
		(total, booking) => total + booking.price,
		0,
	);
	const bookingUtilization = workspace.bookings.reduce(
		(total, booking) => total + booking.utilizationGainPercent,
		0,
	);
	const depositTotal = workspace.deposits.reduce(
		(total, deposit) => total + deposit.amount,
		0,
	);

	return {
		utilizationPercent: Math.min(
			100,
			workspace.baseUtilizationPercent + bookingUtilization,
		),
		projectedRevenue: workspace.baseProjectedRevenue + bookingRevenue,
		clientCount: workspace.clients.length,
		bookingCount: workspace.bookings.length,
		depositTotal,
	};
}

export function composeWhatsAppMessage(
	workspace: KTrailWorkspace,
	requestId: string,
): string {
	const request = findRequest(workspace, requestId);

	if (!request) {
		throw new Error(`Unknown request: ${requestId}`);
	}

	return [
		`Hi ${request.clientName}, your ${request.serviceDescription} is ready to confirm.`,
		`${request.matchedBarberName} will see you ${request.slot} for ${request.durationMinutes} minutes.`,
		`Price: ${formatNaira(request.price)}. Deposit: ${formatNaira(request.depositAmount)}.`,
	].join(" ");
}
