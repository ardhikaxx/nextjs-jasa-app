import { NextResponse } from 'next/server';
import admin from '@/utils/firebaseAdmin';

const CACHE_TTL_MS = 60 * 60 * 1000;
let cachedCount: { value: number; updatedAt: number } | null = null;

export async function GET() {
    try {
        const now = Date.now();
        if (cachedCount && now - cachedCount.updatedAt < CACHE_TTL_MS) {
            return NextResponse.json({
                success: true,
                stats: null,
                count: cachedCount.value,
                summary: {
                    totalUsers: cachedCount.value,
                    batchesProcessed: 0
                }
            }, {
                headers: {
                    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                }
            });
        }

        const auth = admin.auth();
        let allUsers: any[] = [];
        let nextPageToken: string | undefined;
        let batchCount = 0;

        do {
            batchCount++;
            const listUsersResult = await auth.listUsers(1000, nextPageToken);
            allUsers = allUsers.concat(listUsersResult.users);
            nextPageToken = listUsersResult.pageToken;

            if (nextPageToken) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }

        } while (nextPageToken);

        const stats = {
            total: allUsers.length,
            active: allUsers.filter(user => user.metadata.lastSignInTime).length,
            inactive: allUsers.filter(user => !user.metadata.lastSignInTime).length,
            disabled: allUsers.filter(user => user.disabled).length,
            emailVerified: allUsers.filter(user => user.emailVerified).length,
            batches: batchCount
        };

        cachedCount = {
            value: allUsers.length,
            updatedAt: now
        };

        return NextResponse.json({
            success: true,
            stats: stats,
            count: allUsers.length,
            summary: {
                totalUsers: allUsers.length,
                batchesProcessed: batchCount
            }
        }, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
        });

    } catch (error: any) {
        console.error('Error fetching users:', error);

        return NextResponse.json({ 
            success: false,
            error: error.message,
            count: 0
        }, { 
            status: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
        });
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
    });
}

