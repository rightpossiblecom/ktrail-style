export interface Shop {
	name: string;
	city: string;
	operator: string;
	chairCount: number;
}

export interface TeamMember {
	id: string;
	name: string;
	role: "barber";
}

export interface Service {
	id: string;
	name: string;
	durationMinutes: number;
	price: number;
	depositAmount: number;
}

export interface ClientRequest {
	id: string;
	clientName: string;
	serviceDescription: string;
	matchedBarberName: string;
	slot: string;
	durationMinutes: number;
	price: number;
	depositAmount: number;
	utilizationGainPercent: number;
	status: "pending" | "approved";
}

export interface Booking {
	id: string;
	requestId: string;
	clientName: string;
	barberName: string;
	serviceDescription: string;
	slot: string;
	durationMinutes: number;
	price: number;
	utilizationGainPercent: number;
}

export interface Client {
	id: string;
	name: string;
}

export interface Deposit {
	id: string;
	requestId: string;
	clientId: string;
	amount: number;
	status: "due";
}

export interface ActivityEvent {
	id: string;
	type: "request-approved";
	message: string;
}

export interface KTrailWorkspace {
	shop: Shop;
	team: TeamMember[];
	services: Service[];
	requests: ClientRequest[];
	bookings: Booking[];
	clients: Client[];
	deposits: Deposit[];
	activity: ActivityEvent[];
	baseUtilizationPercent: number;
	baseProjectedRevenue: number;
}

export interface WorkspaceMetrics {
	utilizationPercent: number;
	projectedRevenue: number;
	clientCount: number;
	bookingCount: number;
	depositTotal: number;
}
