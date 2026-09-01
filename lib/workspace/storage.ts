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

export function loadWorkspace(storage: StorageLike): KTrailWorkspace {
	const persisted = storage.getItem(WORKSPACE_STORAGE_KEY);

	if (persisted === null) {
		return createEmptyWorkspace();
	}

	try {
		const envelope = JSON.parse(persisted) as Partial<WorkspaceEnvelope>;

		if (envelope.version !== 1 || !envelope.workspace) {
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

export function resetWorkspace(storage: StorageLike): KTrailWorkspace {
	storage.removeItem(WORKSPACE_STORAGE_KEY);
	return createEmptyWorkspace();
}
