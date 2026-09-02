import { NextResponse } from 'next/server';
import { writeSession } from '@/lib/server/session';
import { authenticateUser } from '@/lib/server/users';

export async function POST(request: Request) {
	const body = (await request.json().catch(() => null)) as
		| { email?: string; password?: string }
		| null;
	const email = body?.email?.trim() ?? '';
	const password = body?.password ?? '';
	if (!email || !password) {
		return NextResponse.json({ error: 'Enter your email and password.' }, { status: 400 });
	}
	try {
		const user = await authenticateUser(email, password);
		await writeSession(user);
		return NextResponse.json({ email: user.email });
	} catch (error) {
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : 'Could not log in.' },
			{ status: 401 },
		);
	}
}
