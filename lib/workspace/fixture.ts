import type { KTrailWorkspace } from "./types";

const shop = {
	name: "Fade District",
	city: "Lekki, Lagos",
	operator: "Amara Balogun",
	chairCount: 6,
} as const;

export function createEmptyWorkspace(): KTrailWorkspace {
	return {
		shop: { ...shop },
		team: [],
		services: [],
		requests: [],
		bookings: [],
		clients: [],
		deposits: [],
		activity: [],
		baseUtilizationPercent: 0,
		baseProjectedRevenue: 0,
	};
}

export function createSampleWorkspace(): KTrailWorkspace {
	return {
		...createEmptyWorkspace(),
		team: [
			{ id: "barber_chinedu", name: "Chinedu Okeke", role: "barber" },
			{ id: "barber_femi", name: "Femi Adeyemi", role: "barber" },
			{ id: "barber_kofi", name: "Kofi Mensah", role: "barber" },
			{ id: "barber_samuel", name: "Samuel Eze", role: "barber" },
		],
		services: [
			{
				id: "service_low_taper",
				name: "Low taper",
				durationMinutes: 75,
				price: 8500,
				depositAmount: 3000,
			},
		],
		requests: [
			{
				id: "req_tunde_wedding",
				clientName: "Tunde Adebayo",
				serviceDescription: "low taper before a wedding",
				matchedBarberName: "Chinedu Okeke",
				slot: "Thursday at 4:30 PM",
				durationMinutes: 75,
				price: 8500,
				depositAmount: 3000,
				utilizationGainPercent: 8,
				status: "pending",
			},
		],
		baseUtilizationPercent: 67,
	};
}
