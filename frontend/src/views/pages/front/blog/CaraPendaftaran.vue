<template>
	<FrontLayout>
		<v-container fluid>
			<v-row no-gutters>
				<v-col
					class="hidden-sm-and-down"
					sm="12"
					md="4"
					align="center">
					<v-card
						class="pa-0 rounded-0"
						elevation="0"
						color="white">
							<v-img
								max-width="100%"
								max-height="100%"
								:src="$api.url+'/storages/images/petunjuk_pendaftaran.png'">
							</v-img>
					</v-card>
				</v-col>

				<v-col
					sm="12"
					md="8">
					<v-card
						class="pa-0 rounded-0"
						elevation="0"
						color="white">
							
							<v-timeline dense>
								<v-slide-x-reverse-transition
									group
									hide-on-leave
								>
									<v-timeline-item
										key="0"
										color="red darken-3"
										small
										fill-dot
									>
										<v-alert
											type="success"
											color="red darken-3"
											icon="mdi-account-plus pt-2"
											class="white--text"
										>
											<h2 class="headline font-weight-bold">
												Membuat Akun
											</h2>
											<br>
											<p class="text-left">
												Klik menu PENDAFTARAN maka muncul halaman pendaftaran,
												yang terdiri dari beberapa bagian yang wajib untuk diisi,
												yaitu :
											</p>
											<ol type="1">
												<li>Nama Lengkap.</li>
												<li>Nomor HP / WA dengan format seperti contoh +6281234567.</li>
												<li>Email yang valid dan aktif.</li>
												<li>Program studi yang di pilih Sistem Informasi atau Teknik Informatika.</li>
												<li>Tentukan Username dan Password.</li>
												<li>Ceklis Recaptcha / I'm Not Robot.</li>
												<li>Setelah tekan tombol "Daftar" maka akan muncul konfirmasi pendaftaran yang menyatakan proses pengisian form telah berhasil; Sistem akan mengirimkan kode aktivasi bila sudah tersedia kode tersebut tekan tombol "Konfirmasi".</li>
											</ol>

										</v-alert>
									</v-timeline-item>

									<v-timeline-item
										key="1"
										color="light-blue darken-4"
										small
										fill-dot
									>
										<v-alert
											type="success"
											color="light-blue darken-4"
											icon="mdi-file-upload pt-2"
											class="white--text"
										>
											<h2 class="headline font-weight-bold">
												Lengkapi Formulir Pendaftaran
											</h2>
											<br>
											<p class="text-left">
												Klik tombol Login di menu utama, setelah berhasil login ke dalam SIMAK, klik tombol "Isi Formulir" yang terdiri dari beberapa bagian yang wajib untuk diisi, yaitu :
											</p>
											<ol>
												<li>Identitas Diri.</li>
												<li>Alamat Domisili.</li>
												<li>Rencana Studi dan Menentukan Kelas (Pagi, Sore, Karyawan).</li>
												<br/>
											</ol>
											<p class="text-left">
												Setelah tekan tombol "Simpan" maka lanjutkan langkah 3.
											</p>

											<v-divider class="mt-2 mb-2"></v-divider>

											<p class="text-left">
												Selanjutnya lakukan pembayaran dengan cara ditransfer ke :
											</p>
											
											<v-alert
											type="success"
											color="light-blue accent-3"
											icon="mdi-contactless-payment-circle pt-2"
											class="white--text pb-0"
											>
												<p class="text-left">
													BNI (BANK NEGARA INDONESIA)
													<br>
													NOMOR REKENING : 10-0062-8460
													<br>
													A.N : STMIK BANDUNG BALI
												</p>
											</v-alert>
										</v-alert>
									</v-timeline-item>
								</v-slide-x-reverse-transition>
							</v-timeline>
					</v-card>
				</v-col>
			</v-row>

			<v-container fluid class="pa-0 ma-0 mt-4 mb-0">
				<v-alert
					text
					color="primary"
					icon="mdi-phone pt-2"
					class="white--text"
					>
						<h3 class="headline font-weight-bold">
							Informasi dan Pendaftaran
						</h3>
						<br>
						<p class="text-left">
							Silahkan hubungi kami, bila ada pertanyaan atau hal yang belum jelas di nomor kontak WhatsApp berikut.
						</p>
						<h3 class="font-weight-black">
							KADEK AYU
						</h3>
						<v-icon color="blue darken-1">mdi-cellphone-message</v-icon>
						<strong> 0878 6111 0357 </strong>
						<h3 class="font-weight-black">
							VIONA
						</h3>
						<v-icon color="blue darken-1">mdi-cellphone-message</v-icon>
						<strong> 0823 5935 5795 </strong>
				</v-alert>
			</v-container>
		</v-container>
	</FrontLayout>
</template>
<script>
	import FrontLayout from "@/views/layouts/FrontLayout";
	export default {
		name: "CaraPendaftaran",
		data: () => ({}),
		components: {
			FrontLayout,
		},
	};
</script>
