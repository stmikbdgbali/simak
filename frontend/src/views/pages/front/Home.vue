<template>
    <FrontLayout>
        <v-container fluid>
            <v-card>
                <v-card-title>
                    PROSEDUR PENERIMAAN MAHASISWA BARU
                </v-card-title>
                <v-card-text>
                    <h1>Langkah 1 - MEMBUAT AKUN</h1>
                    Klik menu PENDAFTARAN maka muncul halaman pendaftaran, yang terdiri dari beberapa bagian yang wajib untuk diisi, yaitu :
                    <ol>
                        <li>Nama Lengkap</li>
                        <li>Nomor HP / WA dengan format seperti contoh +6281234567</li>
                        <li>Email yang valid dan aktif</li>
                        <li>Program studi yang di pilih Sistem Informasi atau Teknik Informatika</li>
                        <li>Tentukan Username dan Password</li>
                        <li>Ceklis Recaptcha / I'm Not Robot</li>                        
                    </ol>
                    Setelah tekan tombol "Daftar" maka akan muncul konfirmasi pendaftaran yang menyatakan proses pengisian form telah berhasil; 
                    dan disana juga memuat informasi biaya pendaftaran.                     
                    Selanjutnya lakukan pembayaran dengan cara ditransfer ke :
                    
                    BNI (BANK NEGARA INDONESIA)
                    NOMOR REKENING : 10-0062-8460
                    A.N : STMIK BANDUNG BALI

                    Anda saat ini sudah dapat login dengan username dan password yang telah dibuat.

                    <h1>Langkah 2 - ISI FORMULIR PENDAFTARAN</h1>
                    Setelah berhasil login ke dalam SIMAK, klik tombol "Isi Formulir" yang terdiri dari beberapa bagian yang wajib untuk diisi, yaitu :
                    <ol>
                        <li>Identitas Diri</li>
                        <li>Alamat Domisili</li>
                        <li>Rencana Studi dan Menentukan Kelas (Pagi, Sore, Karyawan)</li>                        
                    </ol>
                    Setelah tekan tombol "Simpan" maka lanjutkan langkah 3.
                    <h1>Langkah 3 - UPLOAD PERSYARATAN</h1>
                    
                </v-card-text>
            </v-card>

        </v-container>
    </FrontLayout>
</template>
<script>
import FrontLayout from '@/views/layouts/FrontLayout';
export default {
    name: "Home",
    data:()=>({
        slides: [
            {
                src: "storage/images/sliders/slider1.jpg",
            },
            {
                src: "storage/images/sliders/slider2.jpg",
            }
        ],
    }), 
    components: {
		FrontLayout,
	}  
}
</script>