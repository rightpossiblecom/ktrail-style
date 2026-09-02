import { NextResponse } from 'next/server';
import { writeSession } from '@/lib/server/session';
import { createUser } from '@/lib/server/users';
import { writeWorkspace } from '@/lib/server/workspace-db';
import { createEmptyWorkspace } from '@/lib/workspace/fixture';

export async function POST(request: Request) {
	const body = (await request.json().catch(() => null)) as
		| { email?: string; password?: string }
		| null;
	const email = body?.email?.trim() ?? '';
	const password = body?.password ?? '';
	if (!email || !password) {
		return NextResponse.json({ error: 'Enter your email and password.' }, { status: 400 });
	}
	if (password.length < 8) {
		return NextResponse.json({ error: 'Use at least 8 characters.' }, { status: 400 });
	}
	try {
		const user = await createUser(email, password);
		await writeWorkspace(user.uid, createEmptyWorkspace());
		await writeSession(user);
		return NextResponse.json({ email: user.email });
	} catch (error) {
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : 'Could not create the account.' },
			{ status: 400 },
		);
	}
}
