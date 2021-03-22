<template>
	<SPMBLayout :showrightsidebar="false">
		<ModuleHeader>
			<template v-slot:icon>
				mdi-file-document-edit-outline
			</template>
			<template v-slot:name>
				NILAI UJIAN
			</template>
			<template v-slot:subtitle v-if="dashboard != 'mahasiswabaru'">
				TAHUN PENDAFTARAN {{ tahun_pendaftaran }} - {{ nama_prodi }}
			</template>
			<template v-slot:breadcrumbs>
				<v-breadcrumbs :items="breadcrumbs" class="pa-0">
					<template v-slot:divider>
						<v-icon>mdi-chevron-right</v-icon>
					</template>
				</v-breadcrumbs>
			</template>            
			<template v-slot:desc>
				<v-alert                                        
					color="cyan"
					border="left"                    
					colored-border
					type="info"
					>
					Halaman ini digunakan untuk menampilkan hasil ujian PMB Calon Mahasiswa baru
				</v-alert>
			</template>
		</ModuleHeader>
		<v-container fluid v-if="data_nilai_ujian">            
			<v-row class="mb-4" no-gutters>                
				<v-col cols="12">
					<v-card color="grey lighten-4">
						<v-toolbar elevation="2"> 
							<v-toolbar-title>DATA NILAI UJIAN</v-toolbar-title>
							<v-divider
								class="mx-4"
								inset
								vertical
							></v-divider>
							<v-spacer></v-spacer>
							<v-icon                
								@click.stop="closedialogfrm()">
								mdi-close-thick
							</v-icon>
						</v-toolbar>
						<v-card-text>
							<v-row>
								<v-col xs="12" sm="6" md="6">
									<v-card flat>
										<v-card-title>ID :</v-card-title>
										<v-card-subtitle>
											{{data_mhs.user_id}}
										</v-card-subtitle>
									</v-card>
								</v-col>
								<v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>           
								<v-col xs="12" sm="6" md="6">
									<v-card flat>
										<v-card-title>PROGRAM STUDI :</v-card-title>
										<v-card-subtitle>
											{{data_mhs.nama_prodi}}
										</v-card-subtitle>
									</v-card>
								</v-col>
							</v-row>
							<v-row>
								<v-col xs="12" sm="6" md="6">
									<v-card flat>
										<v-card-title>NAMA MAHASISWA :</v-card-title>
										<v-card-subtitle>
											{{data_mhs.nama_mhs}}
										</v-card-subtitle>
									</v-card>
								</v-col>
								<v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>           
								<v-col xs="12" sm="6" md="6">
									<v-card flat>
										<v-card-title>JUMLAH SOAL :</v-card-title>
										<v-card-subtitle>
											{{data_nilai_ujian.jumlah_soal}}
										</v-card-subtitle>
									</v-card>
								</v-col>
							</v-row>
							<v-row>
								<v-col xs="12" sm="6" md="6">
									<v-card flat>
										<v-card-title>NILAI UJIAN :</v-card-title>
										<v-card-subtitle>
											{{ data_nilai_ujian.nilai }}
										</v-card-subtitle>
									</v-card>
								</v-col>
								<v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>           
								<v-col xs="12" sm="6" md="6">
									<v-card flat>
										<v-card-title>JAWABAN :</v-card-title>
										<v-card-subtitle>
											BENAR ({{ data_nilai_ujian.jawaban_benar }}), SALAH ({{ data_nilai_ujian.jawaban_salah }})
										</v-card-subtitle>
									</v-card>
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</v-container>                
	</SPMBLayout>
</template>
<script>
	import SPMBLayout from "@/views/layouts/SPMBLayout";
	import ModuleHeader from "@/components/ModuleHeader";
	export default {
		name: "NilaiUjianHasil", 
		created() {
			this.dashboard = this.$store.getters['uiadmin/getDefaultDashboard'];
			this.user_id=this.$route.params.user_id;   
			this.breadcrumbs = [
				{
					text: "HOME",
					disabled: false,
					href: "/dashboard/" + this.$store.getters['auth/AccessToken'],
				},
				{
					text: "SPMB",
					disabled: false,
					href: "/spmb",
				},
				{
					text: "NILAI UJIAN",
					disabled: false,
					href: "/spmb/nilaiujian",
				},
				{
					text: "HASIL",
					disabled: true,
					href: "#",
				}
			];
			this.breadcrumbs[1].disabled=(this.dashboard=='mahasiswabaru'||this.dashboard == "mahasiswa");				
			let prodi_id = this.$store.getters['uiadmin/getProdiID'];
			this.prodi_id = prodi_id;
			this.nama_prodi = this.$store.getters['uiadmin/getProdiName'](prodi_id);
			this.tahun_pendaftaran = this.$store.getters['uiadmin/getTahunPendaftaran'];              
			this.initialize()   
		},  
		data: () => ({        
				prodi_id: null,
				tahun_pendaftaran: null,
				nama_prodi: null,

				breadcrumbs: [],
				dashboard: null,
				user_id: null,

				data_mhs: null,
				data_nilai_ujian: null,
				
		}),
		methods: {        
			initialize: async function() {	
				switch(this.dashboard)  {
					case 'mahasiswabaru':

					break;
					default :
						this.datatableLoading = true;          
						await this.$ajax
							.get
							(
								"/spmb/nilaiujian/" + this.user_id,
								{
									headers: {
										Authorization: this.$store.getters["auth/Token"]
									},
								}
							)
							.then(({ data }) => {								
								this.data_nilai_ujian = data.data_nilai_ujian;
								this.data_mhs = data.formulir;
								this.datatable = data.pmb;
								this.datatableLoading = false;
							});
				}
			},
			closedialogfrm() {
				this.$router.push("/spmb/nilaiujian/");
			},
		},
		components: {
			SPMBLayout,
			ModuleHeader,
		},
	};
</script>
