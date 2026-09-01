"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from "react";

import { createEmptyWorkspace, createSampleWorkspace } from "@/lib/workspace/fixture";
import {
	approveRequest,
	calculateMetrics,
} from "@/lib/workspace/operations";
import {
	loadWorkspace,
	persistWorkspaceUpdate,
	resetWorkspace as resetStoredWorkspace,
} from "@/lib/workspace/storage";
import type {
	KTrailWorkspace,
	WorkspaceMetrics,
} from "@/lib/workspace/types";

interface WorkspaceContextValue {
	workspace: KTrailWorkspace;
	metrics: WorkspaceMetrics;
	hydrated: boolean;
	loadSample(): void;
	approveClientRequest(requestId: string): void;
	resetWorkspace(): void;
}

const WorkspaceContext = createContext<WorkspaceContextValue | undefined>(
	undefined,
);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
	const [workspace, setWorkspace] = useState(createEmptyWorkspace);
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		setWorkspace(loadWorkspace(window.localStorage));
		setHydrated(true);
	}, []);

	const persistWorkspace = useCallback(
		(update: (current: KTrailWorkspace) => KTrailWorkspace) => {
			setWorkspace((current) =>
				persistWorkspaceUpdate(window.localStorage, current, update),
			);
		},
		[],
	);

	const loadSample = useCallback(() => {
		persistWorkspace(() => createSampleWorkspace());
	}, [persistWorkspace]);

	const approveClientRequest = useCallback(
		(requestId: string) => {
			persistWorkspace((current) => approveRequest(current, requestId));
		},
		[persistWorkspace],
	);

	const resetWorkspace = useCallback(() => {
		setWorkspace(() => resetStoredWorkspace(window.localStorage));
	}, []);

	const value = useMemo<WorkspaceContextValue>(
		() => ({
			workspace,
			metrics: calculateMetrics(workspace),
			hydrated,
			loadSample,
			approveClientRequest,
			resetWorkspace,
		}),
		[
			workspace,
			hydrated,
			loadSample,
			approveClientRequest,
			resetWorkspace,
		],
	);

	return (
		<WorkspaceContext.Provider value={value}>
			{children}
		</WorkspaceContext.Provider>
	);
}

export function useWorkspace(): WorkspaceContextValue {
	const context = useContext(WorkspaceContext);

	if (!context) {
		throw new Error("useWorkspace must be used within WorkspaceProvider");
	}

	return context;
}
