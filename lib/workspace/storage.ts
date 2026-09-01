import { createEmptyWorkspace } from "./fixture";
import type { KTrailWorkspace } from "./types";

export const WORKSPACE_STORAGE_KEY = "ktrail_workspace_v1";

export interface StorageLike {
	getItem(key: string): string | null;
	setItem(key: string, value: string): void;
	removeItem(key: string): void;
}

interface WorkspaceEnvelope {
	version: 1;
	workspace: KTrailWorkspace;
}

type WorkspaceUpdate = (workspace: KTrailWorkspace) => KTrailWorkspace;

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasStrings(
	value: Record<string, unknown>,
	fields: string[],
): boolean {
	return fields.every((field) => typeof value[field] === "string");
}

function hasFiniteNumbers(
	value: Record<string, unknown>,
	fields: string[],
): boolean {
	return fields.every(
		(field) =>
			typeof value[field] === "number" && Number.isFinite(value[field]),
	);
}

function isArrayOf(
	value: unknown,
	isItem: (item: unknown) => boolean,
): boolean {
	return Array.isArray(value) && value.every(isItem);
}

function isShop(value: unknown): boolean {
	return (
		isRecord(value) &&
		hasStrings(value, ["name", "city", "operator"]) &&
		hasFiniteNumbers(value, ["chairCount"])
	);
}

function isTeamMember(value: unknown): boolean {
	return (
		isRecord(value) &&
		hasStrings(value, ["id", "name"]) &&
		value.role === "barber"
	);
}

function isService(value: unknown): boolean {
	return (
		isRecord(value) &&
		hasStrings(value, ["id", "name"]) &&
		hasFiniteNumbers(value, [
			"durationMinutes",
			"price",
			"depositAmount",
		])
	);
}

function isClientRequest(value: unknown): boolean {
	return (
		isRecord(value) &&
		hasStrings(value, [
			"id",
			"clientName",
			"serviceDescription",
			"matchedBarberName",
			"slot",
		]) &&
		hasFiniteNumbers(value, [
			"durationMinutes",
			"price",
			"depositAmount",
			"utilizationGainPercent",
		]) &&
		(value.status === "pending" || value.status === "approved")
	);
}

function isBooking(value: unknown): boolean {
	return (
		isRecord(value) &&
		hasStrings(value, [
			"id",
			"requestId",
			"clientName",
			"barberName",
			"serviceDescription",
			"slot",
		]) &&
		hasFiniteNumbers(value, [
			"durationMinutes",
			"price",
			"utilizationGainPercent",
		])
	);
}

function isClient(value: unknown): boolean {
	return isRecord(value) && hasStrings(value, ["id", "name"]);
}

function isDeposit(value: unknown): boolean {
	return (
		isRecord(value) &&
		hasStrings(value, ["id", "requestId", "clientId"]) &&
		hasFiniteNumbers(value, ["amount"]) &&
		value.status === "due"
	);
}

function isActivityEvent(value: unknown): boolean {
	return (
		isRecord(value) &&
		hasStrings(value, ["id", "message"]) &&
		value.type === "request-approved"
	);
}

function isWorkspace(value: unknown): value is KTrailWorkspace {
	return (
		isRecord(value) &&
		isShop(value.shop) &&
		isArrayOf(value.team, isTeamMember) &&
		isArrayOf(value.services, isService) &&
		isArrayOf(value.requests, isClientRequest) &&
		isArrayOf(value.bookings, isBooking) &&
		isArrayOf(value.clients, isClient) &&
		isArrayOf(value.deposits, isDeposit) &&
		isArrayOf(value.activity, isActivityEvent) &&
		hasFiniteNumbers(value, [
			"baseUtilizationPercent",
			"baseProjectedRevenue",
		])
	);
}

export function loadWorkspace(storage: StorageLike): KTrailWorkspace {
	const persisted = storage.getItem(WORKSPACE_STORAGE_KEY);

	if (persisted === null) {
		return createEmptyWorkspace();
	}

	try {
		const envelope: unknown = JSON.parse(persisted);

		if (
			!isRecord(envelope) ||
			envelope.version !== 1 ||
			!isWorkspace(envelope.workspace)
		) {
			storage.removeItem(WORKSPACE_STORAGE_KEY);
			return createEmptyWorkspace();
		}

		return envelope.workspace;
	} catch {
		storage.removeItem(WORKSPACE_STORAGE_KEY);
		return createEmptyWorkspace();
	}
}

export function saveWorkspace(
	storage: StorageLike,
	workspace: KTrailWorkspace,
): void {
	const envelope: WorkspaceEnvelope = {
		version: 1,
		workspace,
	};

	storage.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(envelope));
}

export function persistWorkspaceUpdate(
	storage: StorageLike,
	workspace: KTrailWorkspace,
	update: WorkspaceUpdate,
): KTrailWorkspace {
	const nextWorkspace = update(workspace);
	saveWorkspace(storage, nextWorkspace);
	return nextWorkspace;
}

export function resetWorkspace(storage: StorageLike): KTrailWorkspace {
	storage.removeItem(WORKSPACE_STORAGE_KEY);
	return createEmptyWorkspace();
}
