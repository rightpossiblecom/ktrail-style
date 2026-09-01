import { describe, expect, it } from "vitest";

import { createEmptyWorkspace, createSampleWorkspace } from "./fixture";
import {
	WORKSPACE_STORAGE_KEY,
	loadWorkspace,
	resetWorkspace,
	saveWorkspace,
	type StorageLike,
} from "./storage";

class MemoryStorage implements StorageLike {
	private readonly values = new Map<string, string>();

	getItem(key: string): string | null {
		return this.values.get(key) ?? null;
	}

	setItem(key: string, value: string): void {
		this.values.set(key, value);
	}

	removeItem(key: string): void {
		this.values.delete(key);
	}
}

describe("workspace storage", () => {
	it("returns a fresh empty workspace when storage is missing", () => {
		const storage = new MemoryStorage();

		const first = loadWorkspace(storage);
		const second = loadWorkspace(storage);

		expect(first).toEqual(createEmptyWorkspace());
		expect(second).toEqual(createEmptyWorkspace());
		expect(second).not.toBe(first);
	});

	it("reloads a saved sample with Tunde's request pending", () => {
		const storage = new MemoryStorage();

		saveWorkspace(storage, createSampleWorkspace());

		expect(
			loadWorkspace(storage).requests.find(
				(request) => request.id === "req_tunde_wedding",
			),
		).toMatchObject({
			clientName: "Tunde Adebayo",
			status: "pending",
		});
	});

	it("returns an empty workspace and removes malformed JSON", () => {
		const storage = new MemoryStorage();
		storage.setItem(WORKSPACE_STORAGE_KEY, "{malformed");

		expect(loadWorkspace(storage)).toEqual(createEmptyWorkspace());
		expect(storage.getItem(WORKSPACE_STORAGE_KEY)).toBeNull();
	});

	it("returns an empty workspace for the wrong schema version", () => {
		const storage = new MemoryStorage();
		storage.setItem(
			WORKSPACE_STORAGE_KEY,
			JSON.stringify({ version: 2, workspace: createSampleWorkspace() }),
		);

		expect(loadWorkspace(storage)).toEqual(createEmptyWorkspace());
	});

	it("removes persisted state and returns an empty workspace on reset", () => {
		const storage = new MemoryStorage();
		saveWorkspace(storage, createSampleWorkspace());

		const reset = resetWorkspace(storage);

		expect(reset).toEqual(createEmptyWorkspace());
		expect(storage.getItem(WORKSPACE_STORAGE_KEY)).toBeNull();
	});
});
