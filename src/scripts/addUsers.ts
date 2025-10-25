import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import admin from '../utils/firebaseAdmin.js';

const namaDepanLaki = [
    'Ahmad', 'Budi', 'Cahya', 'Dwi', 'Eko', 
    'Fajar', 'Gunawan', 'Hadi', 'Irfan', 'Kurniawan',
    'Lukman', 'Mulyadi', 'Nugroho', 'Oki', 'Prasetyo', 
    'Rizki', 'Surya', 'Tri', 'Umar', 'Wahyu', 
    'Yoga', 'Zainal', 'Agus', 'Bayu', 'Dimas',
    'Eka', 'Farhan', 'Gilang', 'Hendra', 'Ibrahim'
];

const namaBelakangLaki = [
    'Santoso', 'Wijaya', 'Kusuma', 'Hidayat', 'Nugraha',
    'Pratama', 'Maulana', 'Saputra', 'Setiawan', 'Perdana',
    'Irawan', 'Fernando', 'Kurniawan', 'Halim', 'Susilo',
    'Rahman', 'Purnomo', 'Siregar', 'Ginting', 'Simbolon',
    'Nasution', 'Sihombing', 'Manullang', 'Situmorang', 'Wibowo',
    'Kusnadi', 'Hartono', 'Suryadi', 'Wicaksono', 'Pramono'
];

const namaDepanPerempuan = [
    'Ayu', 'Bunga', 'Citra', 'Dewi', 'Elsa',
    'Fitri', 'Gita', 'Hana', 'Intan', 'Juli',
    'Kartika', 'Lestari', 'Maya', 'Nina', 'Olivia',
    'Putri', 'Rara', 'Sari', 'Tari', 'Umi',
    'Wulan', 'Yuni', 'Zahra', 'Ani', 'Dian',
    'Eva', 'Fira', 'Ghea', 'Hesti', 'Indah'
];

const namaBelakangPerempuan = [
    'Wulandari', 'Sari', 'Pertiwi', 'Lestari', 'Kusuma',
    'Rahayu', 'Puspita', 'Anggraini', 'Hapsari', 'Utami',
    'Ningrum', 'Purnama', 'Safitri', 'Handayani', 'Kartika',
    'Melati', 'Permata', 'Cahyaningrum', 'Indah', 'Mulyani',
    'Suryani', 'Damayanti', 'Wijayanti', 'Wardani', 'Kurniasih',
    'Andini', 'Febriani', 'Gunarsih', 'Hartati', 'Iswanti'
];

function generateUsers(count: number) {
    const users = [];
    
    for (let i = 1; i <= count; i++) {
        const isMale = i % 2 === 1;
        
        let displayName, email;
        
        if (isMale) {
            const depan = namaDepanLaki[Math.floor(Math.random() * namaDepanLaki.length)];
            const belakang = namaBelakangLaki[Math.floor(Math.random() * namaBelakangLaki.length)];
            displayName = `${depan} ${belakang}`;
            email = `${depan.toLowerCase()}_${belakang.toLowerCase()}${i}@gmail.com`;
        } else {
            const depan = namaDepanPerempuan[Math.floor(Math.random() * namaDepanPerempuan.length)];
            const belakang = namaBelakangPerempuan[Math.floor(Math.random() * namaBelakangPerempuan.length)];
            displayName = `${depan} ${belakang}`;
            email = `${depan.toLowerCase()}_${belakang.toLowerCase()}${i}@gmail.com`;
        }
        
        users.push({
            email: email,
            password: 'password123',
            displayName: displayName,
        });
    }
    return users;
}

async function addUsers() {
    try {
        console.log('🔧 Checking environment variables...');
        console.log('Project ID:', process.env.FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Missing');
        console.log('Client Email:', process.env.FIREBASE_CLIENT_EMAIL ? '✅ Set' : '❌ Missing');
        console.log('Private Key:', process.env.FIREBASE_PRIVATE_KEY ? '✅ Set' : '❌ Missing');
        
        const users = generateUsers(50000);
        
        console.log('\n🚀 Membuat user dengan nama Indonesia...');
        console.log('=========================================');
        
        let successCount = 0;
        let errorCount = 0;
        
        for (const user of users) {
            try {
                await admin.auth().createUser(user);
                console.log(`✅ ${user.email} - ${user.displayName} berhasil dibuat`);
                successCount++;
            } catch (error: any) {
                console.error(`❌ ${user.email} gagal:`, error.message);
                errorCount++;
            }
        }
        
        console.log('=========================================');
        console.log(`📊 Ringkasan: ${successCount} berhasil, ${errorCount} gagal`);
        console.log('✅ Proses selesai!');
        
    } catch (error: any) {
        console.error('❌ Error dalam proses:', error.message);
    }
}

addUsers();