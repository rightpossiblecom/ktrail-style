import { NextResponse } from 'next/server';
import { getRequestSession } from '@/lib/server/session';
import { readWorkspace, resetStoredWorkspace, writeWorkspace } from '@/lib/server/workspace-db';
import type { KTrailWorkspace } from '@/lib/workspace/types';

export async function GET() {
	const session = await getRequestSession();
	if (!session) {
		return NextResponse.json({ error: 'Sign in required.' }, { status: 401 });
	}
	const workspace = await readWorkspace(session.uid);
	return NextResponse.json({ workspace });
}

export async function PUT(request: Request) {
	const session = await getRequestSession();
	if (!session) {
		return NextResponse.json({ error: 'Sign in required.' }, { status: 401 });
	}
	const body = (await request.json().catch(() => null)) as { workspace?: KTrailWorkspace } | null;
	if (!body?.workspace) {
		return NextResponse.json({ error: 'Workspace missing.' }, { status: 400 });
	}
	const workspace = await writeWorkspace(session.uid, body.workspace);
	return NextResponse.json({ workspace });
}

export async function DELETE() {
	const session = await getRequestSession();
	if (!session) {
		return NextResponse.json({ error: 'Sign in required.' }, { status: 401 });
	}
	const workspace = await resetStoredWorkspace(session.uid);
	return NextResponse.json({ workspace });
}
