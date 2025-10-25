import { NextResponse } from 'next/server';
import admin from '@/utils/firebaseAdmin';

export async function GET() {
    try {
        const auth = admin.auth();
        let allUsers: any[] = [];
        let nextPageToken: string | undefined;
        let batchCount = 0;

        console.log('🚀 Starting to fetch all users...');

        do {
            batchCount++;
            const listUsersResult = await auth.listUsers(1000, nextPageToken);
            allUsers = allUsers.concat(listUsersResult.users);
            nextPageToken = listUsersResult.pageToken;
            
            console.log(`📦 Batch ${batchCount}: ${listUsersResult.users.length} users`);
            
            if (nextPageToken) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            
        } while (nextPageToken);

        console.log(`✅ Successfully fetched ${allUsers.length} total users`);

        const stats = {
            total: allUsers.length,
            active: allUsers.filter(user => user.metadata.lastSignInTime).length,
            inactive: allUsers.filter(user => !user.metadata.lastSignInTime).length,
            disabled: allUsers.filter(user => user.disabled).length,
            emailVerified: allUsers.filter(user => user.emailVerified).length,
            batches: batchCount
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
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
        });

    } catch (error: any) {
        console.error('❌ Error fetching users:', error);
        
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