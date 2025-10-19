import { NextResponse } from 'next/server';
import admin from '@/utils/firebaseAdmin';

export async function GET() {
    try {
        const auth = admin.auth();

        const listUsersResult = await auth.listUsers(5000);
        const recentUsers = listUsersResult.users
            .sort((a, b) => new Date(b.metadata.creationTime!).getTime() - new Date(a.metadata.creationTime!).getTime())
            .slice(0, 5);

        const usersWithAvatars = await Promise.all(
            recentUsers.map(async (user) => {
                try {
                    if (user.photoURL) {
                        return {
                            uid: user.uid,
                            photoURL: user.photoURL,
                            displayName: user.displayName || user.email || 'User'
                        };
                    }

                    return {
                        uid: user.uid,
                        photoURL: null,
                        displayName: user.displayName || user.email || 'User'
                    };
                } catch (error) {
                    console.error(`Error processing user ${user.uid}:`, error);
                    return {
                        uid: user.uid,
                        photoURL: null,
                        displayName: user.displayName || user.email || 'User'
                    };
                }
            })
        );

        return NextResponse.json({ users: usersWithAvatars });
    } catch (error) {
        console.error('Error fetching users with avatars:', error);
        return NextResponse.json({ users: [] }, { status: 500 });
    }
}