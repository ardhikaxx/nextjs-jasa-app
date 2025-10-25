import admin from '../utils/firebaseAdmin.js';

async function deleteInactiveUsers() {
    try {
        console.log('🔍 Mencari users yang tidak pernah sign in...');
        
        let allUsers: any[] = [];
        let nextPageToken: string | undefined;

        // Get all users dengan pagination
        do {
            const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
            allUsers = allUsers.concat(listUsersResult.users);
            nextPageToken = listUsersResult.pageToken;
        } while (nextPageToken);

        console.log(`📊 Total users ditemukan: ${allUsers.length}`);

        // Filter users yang tidak pernah sign in
        const inactiveUsers = allUsers.filter(user => {
            // User dianggap inactive jika:
            // 1. Tidak ada lastSignInTime
            // 2. Atau lastSignInTime lebih dari 30 hari yang lalu
            if (!user.metadata.lastSignInTime) {
                return true; // Tidak pernah sign in
            }
            
            const lastSignIn = new Date(user.metadata.lastSignInTime);
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            
            return lastSignIn < thirtyDaysAgo;
        });

        console.log(`🗑️  Found ${inactiveUsers.length} inactive users to delete`);

        if (inactiveUsers.length === 0) {
            console.log('✅ Tidak ada inactive users yang perlu dihapus');
            return;
        }

        // Delete users in batches (Firebase limit: 1000 users per batch)
        const batchSize = 1000;
        let deletedCount = 0;

        for (let i = 0; i < inactiveUsers.length; i += batchSize) {
            const batch = inactiveUsers.slice(i, i + batchSize);
            const uids = batch.map(user => user.uid);
            
            try {
                await admin.auth().deleteUsers(uids);
                deletedCount += uids.length;
                
                console.log(`✅ Deleted batch: ${uids.length} users`);
                console.log('📧 Emails:', batch.map(user => user.email).join(', '));
                
                // Delay to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (batchError: any) {
                console.error('❌ Error deleting batch:', batchError.message);
            }
        }

        console.log(`🎉 Successfully deleted ${deletedCount} inactive users`);

    } catch (error: any) {
        console.error('❌ Error:', error.message);
    }
}

// Jalankan script
deleteInactiveUsers();