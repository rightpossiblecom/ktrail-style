import { describe, expect, it } from "vitest";

import { createEmptyWorkspace, createSampleWorkspace } from "./fixture";
import {
	approveRequest,
	calculateMetrics,
	composeWhatsAppMessage,
} from "./operations";

describe("workspace domain", () => {
	it("creates an empty first-run workspace with no live figures", () => {
		const workspace = createEmptyWorkspace();

		expect(workspace.shop).toEqual({
			name: "Fade District",
			city: "Lekki, Lagos",
			operator: "Amara Balogun",
			chairCount: 6,
		});
		expect(workspace.requests).toEqual([]);
		expect(workspace.bookings).toEqual([]);
		expect(workspace.clients).toEqual([]);
		expect(workspace.deposits).toEqual([]);
		expect(workspace.activity).toEqual([]);
		expect(calculateMetrics(workspace)).toEqual({
			utilizationPercent: 0,
			projectedRevenue: 0,
			clientCount: 0,
			bookingCount: 0,
			depositTotal: 0,
		});
	});

	it("starts the sample workspace with Tunde pending at 67% utilization", () => {
		const workspace = createSampleWorkspace();
		const request = workspace.requests.find(
			(candidate) => candidate.id === "req_tunde_wedding",
		);

		expect(workspace.team).toHaveLength(4);
		expect(request).toMatchObject({
			clientName: "Tunde Adebayo",
			serviceDescription: "low taper before a wedding",
			matchedBarberName: "Chinedu Okeke",
			slot: "Thursday at 4:30 PM",
			durationMinutes: 75,
			price: 8500,
			depositAmount: 3000,
			status: "pending",
		});
		expect(calculateMetrics(workspace).utilizationPercent).toBe(67);
	});

	it("approves Tunde into exactly one booking, client, deposit, and activity event", () => {
		const approved = approveRequest(
			createSampleWorkspace(),
			"req_tunde_wedding",
		);

		expect(approved.bookings).toHaveLength(1);
		expect(approved.clients).toHaveLength(1);
		expect(approved.deposits).toHaveLength(1);
		expect(approved.activity).toHaveLength(1);
		expect(
			approved.requests.find(({ id }) => id === "req_tunde_wedding")?.status,
		).toBe("approved");
	});

	it("raises utilization to 75% and projected revenue by ₦8,500", () => {
		const workspace = createSampleWorkspace();
		const before = calculateMetrics(workspace);
		const after = calculateMetrics(
			approveRequest(workspace, "req_tunde_wedding"),
		);

		expect(after.utilizationPercent).toBe(75);
		expect(after.projectedRevenue - before.projectedRevenue).toBe(8500);
	});

	it("is idempotent when the same request is approved twice", () => {
		const once = approveRequest(
			createSampleWorkspace(),
			"req_tunde_wedding",
		);
		const twice = approveRequest(once, "req_tunde_wedding");

		expect(twice).toEqual(once);
	});

	it("composes WhatsApp text with every booking detail", () => {
		const message = composeWhatsAppMessage(
			createSampleWorkspace(),
			"req_tunde_wedding",
		);

		expect(message).toContain("Tunde Adebayo");
		expect(message).toContain("low taper before a wedding");
		expect(message).toContain("Chinedu Okeke");
		expect(message).toContain("Thursday at 4:30 PM");
		expect(message).toContain("₦8,500");
		expect(message).toContain("₦3,000");
	});
});
