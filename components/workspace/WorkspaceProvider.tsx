'use client';

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from 'react';

import { useAuthSession } from '@/components/auth/AuthSessionProvider';
import { createEmptyWorkspace, createSampleWorkspace } from '@/lib/workspace/fixture';
import { approveRequest, calculateMetrics } from '@/lib/workspace/operations';
import type { KTrailWorkspace, WorkspaceMetrics } from '@/lib/workspace/types';

interface WorkspaceContextValue {
	workspace: KTrailWorkspace;
	metrics: WorkspaceMetrics;
	hydrated: boolean;
	loadSample(): void;
	approveClientRequest(requestId: string): void;
	resetWorkspace(): void;
}

const WorkspaceContext = createContext<WorkspaceContextValue | undefined>(undefined);

async function saveRemote(workspace: KTrailWorkspace) {
	await fetch('/api/workspace', {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ workspace }),
	});
}

export function WorkspaceProvider({ children }: { children: ReactNode }) {
	const { session, ready } = useAuthSession();
	const [workspace, setWorkspace] = useState(createEmptyWorkspace);
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		if (!ready) return;
		if (!session) {
			setWorkspace(createEmptyWorkspace());
			setHydrated(true);
			return;
		}
		let cancelled = false;
		void fetch('/api/workspace', { cache: 'no-store' })
			.then((response) => response.json())
			.then((data: { workspace?: KTrailWorkspace }) => {
				if (!cancelled && data.workspace) setWorkspace(data.workspace);
			})
			.finally(() => {
				if (!cancelled) setHydrated(true);
			});
		return () => {
			cancelled = true;
		};
	}, [ready, session]);

	const persistWorkspace = useCallback((update: (current: KTrailWorkspace) => KTrailWorkspace) => {
		setWorkspace((current) => {
			const next = update(current);
			void saveRemote(next);
			return next;
		});
	}, []);

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
		const empty = createEmptyWorkspace();
		setWorkspace(empty);
		void fetch('/api/workspace', { method: 'DELETE' });
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
		[workspace, hydrated, loadSample, approveClientRequest, resetWorkspace],
	);

	return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace(): WorkspaceContextValue {
	const context = useContext(WorkspaceContext);
	if (!context) {
		throw new Error('useWorkspace must be used within WorkspaceProvider');
	}
	return context;
}
