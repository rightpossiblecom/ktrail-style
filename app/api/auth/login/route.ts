import { NextResponse } from 'next/server';
import { isFirebaseAdminConfigured } from '@/lib/firebase-admin';
import { verifyFirebaseUser } from '@/lib/server/firebase-auth';
import { writeSession } from '@/lib/server/session';

export async function POST(request: Request) {
	if (!isFirebaseAdminConfigured()) {
		return NextResponse.json({ error: 'Accounts are not connected yet.' }, { status: 503 });
	}
	const body = (await request.json().catch(() => null)) as
		| { email?: string; password?: string }
		| null;
	const email = body?.email?.trim() ?? '';
	const password = body?.password ?? '';
	if (!email || !password) {
		return NextResponse.json({ error: 'Enter your email and password.' }, { status: 400 });
	}
	try {
		const user = await verifyFirebaseUser(email, password);
		await writeSession(user);
		return NextResponse.json({ email: user.email });
	} catch (error) {
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : 'Could not log in.' },
			{ status: 401 },
		);
	}
}
