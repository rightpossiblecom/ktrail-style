import { NextResponse } from 'next/server';
import { isFirebaseAdminConfigured } from '@/lib/firebase-admin';
import { createFirebaseUser } from '@/lib/server/firebase-auth';

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
	if (password.length < 8) {
		return NextResponse.json({ error: 'Use at least 8 characters.' }, { status: 400 });
	}
	try {
		await createFirebaseUser(email, password);
		return NextResponse.json({ verify: true, email: email.toLowerCase() });
	} catch (error) {
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : 'Could not create the account.' },
			{ status: 400 },
		);
	}
}
