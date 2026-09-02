import { createEmptyWorkspace } from '@/lib/workspace/fixture';
import { getFirestore } from '@/lib/server/gcp';
import type { KTrailWorkspace } from '@/lib/workspace/types';

function workspaces() {
	return getFirestore().collection('workspaces');
}

export async function readWorkspace(uid: string): Promise<KTrailWorkspace> {
	const snap = await workspaces().doc(uid).get();
	const workspace = snap.data()?.workspace as KTrailWorkspace | undefined;
	return workspace ?? createEmptyWorkspace();
}

export async function writeWorkspace(uid: string, workspace: KTrailWorkspace) {
	await workspaces().doc(uid).set(
		{
			version: 1,
			workspace,
			updatedAt: new Date().toISOString(),
		},
		{ merge: true },
	);
	return workspace;
}

export async function resetStoredWorkspace(uid: string) {
	const workspace = createEmptyWorkspace();
	await writeWorkspace(uid, workspace);
	return workspace;
}
