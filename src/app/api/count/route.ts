import { NextResponse } from 'next/server';
import admin from '@/utils/firebaseAdmin';

export async function GET() {
    try {
        const auth = admin.auth();
        const listUsersResult = await auth.listUsers();
        const count = listUsersResult.users.length;

        return NextResponse.json({ count });
    } catch (error) {
        console.error('Error fetching user count:', error);
        return NextResponse.json({ count: 0 }, { status: 500 });
    }
}
