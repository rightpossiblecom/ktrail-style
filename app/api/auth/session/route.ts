import { NextResponse } from 'next/server';
import { getRequestSession } from '@/lib/server/session';

export async function GET() {
	const session = await getRequestSession();
	return NextResponse.json(session);
}
