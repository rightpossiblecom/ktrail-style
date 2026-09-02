import { createEmptyWorkspace } from '@/lib/workspace/fixture';
import { adminDb } from '@/lib/firebase-admin';
import { col } from '@/lib/house';
import type { KTrailWorkspace } from '@/lib/workspace/types';

function desks() {
	return adminDb().collection(col('desk'));
}

export async function readWorkspace(uid: string): Promise<KTrailWorkspace> {
	try {
		const snap = await desks().doc(uid).get();
		const workspace = snap.data()?.workspace as KTrailWorkspace | undefined;
		return workspace ?? createEmptyWorkspace();
	} catch {
		return createEmptyWorkspace();
	}
}

export async function writeWorkspace(uid: string, workspace: KTrailWorkspace) {
	try {
		await desks().doc(uid).set(
			{
				version: 1,
				workspace,
				updatedAt: new Date().toISOString(),
			},
			{ merge: true },
		);
	} catch {
		// Desk still works from the browser session when Cloud is down.
	}
	return workspace;
}

export async function resetStoredWorkspace(uid: string) {
	const workspace = createEmptyWorkspace();
	await writeWorkspace(uid, workspace);
	return workspace;
}
