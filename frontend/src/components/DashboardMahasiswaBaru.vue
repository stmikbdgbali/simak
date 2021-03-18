<template>
	<v-container>
		<v-row no-gutters>
			<v-col cols="12">
				<v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
					<!-- <v-timeline-item color="deep-orange lighten-2" icon="mdi-email-alert" fill-dot>
						<v-card color="deep-orange lighten-2" dark>
							<v-card-title class="title">Verifikasi Email</v-card-title>
							<v-card-text class="white text--primary">
								<p>Email belum diverifikasi, silahkan diverifikasi !!!.</p>
								<v-btn
									color="deep-orange lighten-2"
									class="mx-0"
									outlined
								>
									Kirim Ulang
								</v-btn>
							</v-card-text> 
						</v-card>
					</v-timeline-item> -->
					<v-timeline-item color="teal lighten-3" icon="mdi-book-variant" fill-dot>
						<v-card color="teal lighten-3" dark>
							<v-card-title class="title">Formulir Pendaftaran</v-card-title>
							<v-card-text class="white text--primary">
								<p>
									Isi formulir pendaftaran dengan benar dan lengkap.                                
								</p>         
								<v-btn
									color="teal lighten-3"
									class="mx-0 mr-2"
									outlined
									to="/spmb/formulirpendaftaran"
								>
									Isi Formulir
								</v-btn>
							</v-card-text> 
						</v-card>
					</v-timeline-item>
					<v-timeline-item color="red lighten-2" icon="mdi-account-cash" fill-dot>
						<v-card color="red lighten-2" dark>
							<v-card-title class="title">Konfirmasi Pembayaran</v-card-title>
							<v-card-text class="white text--primary" v-if="kode_billing == 'N.A'">
								<p>Konfirmasi Pembayaran Biaya Pendaftaran.</p>
								<v-btn
									color="red lighten-2"
									class="mx-0"
									outlined
									:disabled="true"
									to="/keuangan/konfirmasipembayaran">
									Konfirmasi
								</v-btn>
							</v-card-text>
							<v-card-text class="white text--primary" v-else>
								<p>Konfirmasi Pembayaran Biaya Pendaftaran.</p>
								<p>Kode Billing: {{ kode_billing }}</p>
								<p>Biaya Pendaftaran: Rp. {{ biaya_pendaftaran|formatUang }}.</p>
								<v-alert type="info">
									BNI (BANK NEGARA INDONESIA) <br />
									NOMOR REKENING : 10-0062-8460 <br />
									A.N : STMIK BANDUNG BALI <br />
								</v-alert>
								<v-btn
									color="red lighten-2"
									class="mx-0"
									outlined									
									to="/keuangan/konfirmasipembayaran">
									Konfirmasi
								</v-btn>
							</v-card-text> 
						</v-card>
					</v-timeline-item>                
					<v-timeline-item color="indigo" icon="mdi-head-question-outline" fill-dot v-if="status_ujian">
						<v-card color="indigo">
							<v-card-title class="title white--text">Ujian Online</v-card-title>
							<v-card-text class="white text--primary">
								<table width="100%">
									<tbody>
										<tr>
											<td width="25%">No. Peserta</td>
											<td>: {{peserta.no_peserta}}</td>
										</tr>
										<tr>
											<td width="25%">Tanggal Daftar</td>
											<td>: {{$date(peserta.created_at).format("DD/MM/YYYY HH:mm")}}</td>
										</tr>
										<tr>
											<td width="25%">Tanggal Ujian</td>
											<td>: {{$date(jadwal_ujian.tanggal_ujian).format("DD/MM/YYYY")}}</td>
										</tr>
										<tr>
											<td width="25%">Waktu Ujian</td>
											<td>: {{jadwal_ujian.jam_mulai_ujian}} - {{jadwal_ujian.jam_selesai_ujian}} ({{durasiUjian(jadwal_ujian)}})</td>
										</tr>
										<tr>
											<td width="25%">Keterangan</td>
											<td>: {{keterangan_ujian}}</td>
										</tr>
									</tbody>
								</table>
								<v-btn
									color="indigo"
									class="mx-0"
									@click.stop="mulaiUjian"
									:disabled="ismulai"
									outlined>
									Mulai
								</v-btn>
							</v-card-text> 
						</v-card>
					</v-timeline-item>
					<v-timeline-item color="indigo" icon="mdi-head-question-outline" fill-dot v-else>
						<v-card color="indigo">
							<v-card-title class="title white--text">Ujian Online</v-card-title>
							<v-card-text class="white text--primary">
								<p>Untuk mengikuti ujian online, silahkan pilih jadwal terlebih dahulu</p>
								<v-btn
									color="indigo"
									class="mx-0 mr-2"
									@click.stop="showPilihJadwal"
									outlined>
									Pilih Jadwal Ujian
								</v-btn>
							</v-card-text> 
						</v-card> 
					</v-timeline-item>
					<v-timeline-item color="purple darken-1" icon="mdi-book-variant" fill-dot>
						<v-card color="purple darken-1" dark>
							<v-card-title class="title">Persyaratan</v-card-title>
							<v-card-text class="white text--primary">
								<p>
									Setelah melakukan ujian mohon lengkapi persyaratan berikut ini dengan mengunggah ke sistem:
									<ul>
										<li>Scan Pas Foto</li>
										<li>Scan Ijazah Terakhir</li>
										<li>Scan KTP</li>
										<li>Scan Kartu Keluarga</li>
									</ul>
								</p>                                     
								<v-btn
									color="purple darken-1"
									class="mx-0"
									outlined
									to="/spmb/persyaratan"
								>
									Upload
								</v-btn>
							</v-card-text> 
						</v-card>
					</v-timeline-item>
					<v-timeline-item color="green lighten-1" icon="mdi-airballoon" fill-dot>
						<v-card color="green lighten-1" dark>
							<v-card-title class="title">Surat Keterangan Lulus</v-card-title>
							<v-card-text class="white text--primary">
								<p>Silahkan download Surat Keterangan Kelulusan kemudian cetak dan dibawa ke kampus saat daftar ulang beserta persyaratan ASLI lainnya.</p>
								<v-btn
									color="green lighten-1"
									class="mx-0"
									outlined
									:disabled="btnLoading"
									@click.stop="printpdf"
								>
									Download
								</v-btn>
							</v-card-text> 
						</v-card>
					</v-timeline-item>
				</v-timeline>
			</v-col>
		</v-row>
		<v-row align="center" justify="center" no-gutters>
			<v-col xs="12" sm="6" md="4">            
				<v-card outlined>
					<v-card-title class="justify-center">
						<h3 class="title">INFORMASI PENDAFTARAN</h3>
					</v-card-title>
					<v-card-subtitle class="justify-center">
						Silahkan hubungi kami, bila ada pertanyaan atau hal yang belum jelas di nomor kontak WA berikut.
					</v-card-subtitle>
					<v-card-text class="justify-center">
						<div>
							<h3 class="headline pink--text text--accent-2">SANG AYU</h3>
							<div><v-icon>mdi-card-account-phone-outline</v-icon> 0822 3662 5018</div>
						</div>
						<div>
							<h3 class="headline pink--text text--accent-2">KADEK AYU</h3>
							<div><v-icon>mdi-card-account-phone-outline</v-icon> 0878 6111 0357</div>
						</div>
						<div>
							<h3 class="headline pink--text text--accent-2">VIONA</h3>
							<div><v-icon>mdi-card-account-phone-outline</v-icon> 0823 5935 5795</div>
						</div>							
					</v-card-text>
				</v-card>	
			</v-col>
		</v-row>
		<v-dialog v-model="dialogpilihjadwal" persistent>    
			<v-card>
				<v-card-title>
					<span class="headline">Pilih Jadwal Ujian PMB</span>
				</v-card-title>
				<v-card-text>
					<v-data-table
						:headers="headers"
						:items="datatable"                        
						item-key="id"
						sort-by="name"                        
						class="elevation-1"
						:loading="datatableLoading"
						loading-text="Loading... Please wait">
						<template v-slot:item.tanggal_ujian="{ item }">
							{{$date(item.tanggal_ujian).format("DD/MM/YYYY")}}
						</template>
						<template v-slot:item.tanggal_akhir_daftar="{ item }">
							{{$date(item.tanggal_akhir_daftar).format("DD/MM/YYYY")}}
						</template>
						<template v-slot:item.durasi_ujian="{ item }">
							{{item.jam_mulai_ujian}} - {{item.jam_selesai_ujian}} <br>({{durasiUjian(item)}})
						</template>
						<template v-slot:item.actions="{ item }">
							<v-icon                                
								@click.stop="pilihJadwal(item)"
								:loading="btnLoading"
								:disabled="btnLoading">
								mdi-select-drag
							</v-icon>
						</template>
					</v-data-table>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click.stop="closedialogfrm">BATAL</v-btn> 
				</v-card-actions>
			</v-card>            
		</v-dialog>
		<dialog-printout pid="sklulus" title="SK kelulusan" ref="dialogprint"></dialog-printout>
	</v-container>
</template>
<script>
	import DialogPrintoutSPMB from "@/components/DialogPrintoutSPMB";
	export default {
		name: "DashboardMahasiswaBaru",
		created() {
			this.initialize();        
			this.$store.dispatch("uiadmin/deletePage", "ujianonline");
		},
		data: () => ({
			kode_billing: "N.A",
			biaya_pendaftaran: 0,

			btnLoading: false,
			datatableLoading : false,        
			datatable: [],
			headers: [                
				{ text: "NAMA UJIAN", value: "nama_kegiatan", sortable: true,width:300 },
				{ text: "TGL. UJIAN", value: "tanggal_ujian", sortable: true,width:100 },
				{ text: "TGL. AKHIR PENDAFTARAN", value: "tanggal_akhir_daftar", sortable: true,width:100 },
				{ text: "DURASI UJIAN", value: "durasi_ujian", sortable: true,width:100 },
				{ text: "RUANGAN", value: "namaruang", sortable: true,width:100 },
				{ text: "AKSI", value: "actions", sortable: false, width:100 },
			],
			dialogpilihjadwal: false,
			ismulai: true,

			status_ujian: false,
			jadwal_ujian: null,
			peserta: null,
			keterangan_ujian: "",
		}),
		methods: {
			initialize: async function() {
				var user_id = this.$store.getters['auth/AttributeUser']("id");
				await this.$ajax
					.get(
						"/spmb/ujianonline/peserta/" + user_id,
						{
							headers: {
								Authorization: this.$store.getters["auth/Token"]
							}
						}
					)
					.then(({ data }) => {          
						if (data.status == 1) {
							this.status_ujian=true;
							this.peserta = data.peserta;                     
							this.jadwal_ujian = data.jadwal_ujian;    
							this.ismulai=this.jadwal_ujian.status_ujian == 0 ?true: false;
							if (this.peserta.isfinish== 1) {
								this.ismulai = true;
								this.keterangan_ujian = "SELESAI UJIAN";
							} else {
								this.keterangan_ujian = "BELUM UJIAN";
							}
						}
					});
				await this.$ajax
					.get(
						"/spmb/formulirpendaftaran/" + user_id,
						{
							headers: {
								Authorization: this.$store.getters["auth/Token"]
							}
						}
					)
					.then(({ data }) => {          
						this.kode_billing = data.no_transaksi;
						this.biaya_pendaftaran = data.biaya_pendaftaran;
					});
			},
			showPilihJadwal: async function() {
				this.dialogpilihjadwal = true;
				let tahun_pendaftaran=this.$store.getters['auth/AttributeUser']("ta");      
				let semester_pendaftaran=this.$store.getters['auth/AttributeUser']("idsmt");                              

				this.datatableLoading=true;
				await this.$ajax.post("/spmb/ujianonline/jadwal",
				{
					tahun_pendaftaran:tahun_pendaftaran,
					semester_pendaftaran:semester_pendaftaran
				},
				{
					headers: {
						Authorization: this.$store.getters["auth/Token"]
					}
				}).then(({ data }) => {             
					this.datatable = data.jadwal_ujian;
					this.datatableLoading=false;
				}).catch(() => {
					this.datatableLoading=false;
				});
			},
			pilihJadwal: async function(item) {
				this.btnLoading = true;
				await this.$ajax.post("/spmb/ujianonline/daftar",
				{
					user_id: this.$store.getters['auth/AttributeUser']("id"),
					jadwal_ujian_id:item.id,    
				},
				{
					headers: {
						Authorization: this.$store.getters["auth/Token"]
					}
				}).then(() => { 
					this.initialize();       
					this.closedialogfrm();
					this.btnLoading = false;
				}).catch(() => {
					this.btnLoading = false;
				});
			},
			durasiUjian(item) {
				let waktu_mulai = this.$date(item.tanggal_ujian + " " +item.jam_mulai_ujian);
				let waktu_selesai = this.$date(item.tanggal_ujian + " " +item.jam_selesai_ujian);
				return waktu_selesai.diff(waktu_mulai, "minute") + ' menit';
			},
			mulaiUjian: async function() {          
				this.btnLoading = false;
				await this.$ajax.post("/spmb/ujianonline/mulaiujian",
				{
					_method: "put",
					user_id: this.$store.getters['auth/AttributeUser']("id"),    
				},
				{
					headers: {
						Authorization: this.$store.getters["auth/Token"]
					}
				}).then(({ data }) => {    
					this.btnLoading = false;
					this.$store.dispatch("uiadmin/addToPages",{
						name: "ujianonline",
						data_ujian: this.jadwal_ujian,
						data_peserta:data.peserta,    
					});
					this.$router.push("/spmb/ujianonline");              
				}).catch(() => {
					this.btnLoading = false;
				});            
			},
			async printpdf() {
				this.btnLoading = true;
				var user_id = this.$store.getters['auth/AttributeUser']("id");
				await this.$ajax
					.post(
						"/spmb/skkelulusan/printtopdf1/" + user_id,    
						{},
						{
							headers: {
								Authorization: this.$store.getters["auth/Token"],
							},								
						}
					)
					.then(({ data }) => {  
						this.$refs.dialogprint.open({
							message: "Silahkah download Formulir Pendaftaran dan SK Kelulusan",
							file: data.pdf_file,
							nama_file: "SK KELULUSAN"			
						});												
						this.btnLoading = false;
					})
					.catch(() => {
						this.btnLoading = false;
					});               
			},
			closedialogfrm () {
				this.dialogpilihjadwal = false;                      
			},
		},
		components: {
			"dialog-printout": DialogPrintoutSPMB,
		},
	};
</script>
