import { NextResponse } from 'next/server';
import admin from '@/utils/firebaseAdmin';

export async function GET() {
    try {
        const auth = admin.auth();
        let allUsers: any[] = [];
        let nextPageToken: string | undefined;
        let batchCount = 0;

        console.log('🚀 Starting to fetch all users (5000+ data)...');

        // Loop sampai semua data terambil
        do {
            batchCount++;
            const listUsersResult = await auth.listUsers(1000, nextPageToken);
            allUsers = allUsers.concat(listUsersResult.users);
            nextPageToken = listUsersResult.pageToken;
            
            console.log(`📦 Batch ${batchCount}: ${listUsersResult.users.length} users`);
            console.log(`📊 Total collected: ${allUsers.length} users`);
            
            // Optional: Small delay to avoid overwhelming the API
            if (nextPageToken) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            
        } while (nextPageToken);

        console.log(`✅ Successfully fetched ${allUsers.length} total users in ${batchCount} batches`);

        // Hitung statistics
        const activeUsers = allUsers.filter(user => user.metadata.lastSignInTime);
        const inactiveUsers = allUsers.filter(user => !user.metadata.lastSignInTime);
        
        const stats = {
            total: allUsers.length,
            active: activeUsers.length,
            inactive: inactiveUsers.length,
            disabled: allUsers.filter(user => user.disabled).length,
            emailVerified: allUsers.filter(user => user.emailVerified).length,
            batches: batchCount
        };

        return NextResponse.json({
            success: true,
            stats: stats,
            count: allUsers.length,
            // Return summary instead of all users to avoid huge response
            summary: {
                totalUsers: allUsers.length,
                activeUsers: activeUsers.length,
                inactiveUsers: inactiveUsers.length,
                batchesProcessed: batchCount
            }
        });

    } catch (error: any) {
        console.error('❌ Error fetching users:', error);
        return NextResponse.json({ 
            success: false,
            error: error.message,
            count: 0
        }, { status: 500 });
    }
}
