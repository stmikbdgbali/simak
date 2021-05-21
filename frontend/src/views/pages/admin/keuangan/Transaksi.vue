<template>
	<KeuanganLayout>
		<ModuleHeader>
			<template v-slot:icon>
				mdi-account-cash
			</template>
			<template v-slot:name>
				TRANSAKSI
			</template>
			<template v-slot:subtitle>
				TAHUN AKADEMIK {{ tahun_akademik }} - {{ nama_prodi }}
			</template>
			<template v-slot:breadcrumbs>
				<v-breadcrumbs :items="breadcrumbs" class="pa-0">
					<template v-slot:divider>
						<v-icon>mdi-chevron-right</v-icon>
					</template>
				</v-breadcrumbs>
			</template>
			<template v-slot:desc>
				<v-alert color="cyan" border="left" colored-border type="info">
					Transaksi pembayaran mahasiswa baru atau lama dalam satu tahun.
				</v-alert>
			</template>
		</ModuleHeader>
		<template v-slot:filtersidebar>
			<Filter18
				v-on:changeTahunAkademik="changeTahunAkademik"
				v-on:changeProdi="changeProdi"
				ref="filter18"
			/>
		</template>
		<v-container fluid>
			<v-row class="mb-4" no-gutters>
				<v-col cols="12">
					<v-card>
						<v-card-text>
							<v-text-field
								v-model="search"
								append-icon="mdi-database-search"
								label="Search"
								single-line
								hide-details
							>
							</v-text-field>
							<v-switch
								v-model="filter_ignore"
								label="ABAIKAN FILTER"
								class="font-weight-bold"
							>
							</v-switch>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
			<v-row class="mb-4" no-gutters>
				<v-col cols="12">
					<v-data-table
						:headers="headers"
						:items="datatable"
						:search="search"
						item-key="id"
						sort-by="nama_mhs"
						show-expand
						:expanded.sync="expanded"
						:single-expand="true"
						@click:row="dataTableRowClicked"
						class="elevation-1"
						:loading="datatableLoading"
						loading-text="Loading... Please wait"
					>
						<template v-slot:top>
							<v-toolbar flat color="white">
								<v-toolbar-title>DAFTAR TRANSAKSI</v-toolbar-title>
								<v-divider class="mx-4" inset vertical></v-divider>
								<v-spacer></v-spacer>
							</v-toolbar>
						</template>
						<template v-slot:item.tanggal="{ item }">
							{{ $date(item.tanggal).format("DD/MM/YYYY") }}
						</template>
						<template v-slot:item.idsmt="{ item }">
							{{ $store.getters["uiadmin/getNamaSemester"](item.idsmt) }}
						</template>
						<template v-slot:item.total="{ item }">
							{{ item.total | formatUang }}
						</template>
						<template v-slot:item.nama_status="{ item }">
							<v-chip :color="item.style" dark>
								{{ item.nama_status }}
							</v-chip>
						</template>
						<template v-slot:item.actions="{ item }">
							<v-icon small class="mr-2" @click.stop="viewItem(item)">
								mdi-eye
							</v-icon>
						</template>
						<template v-slot:expanded-item="{ headers, item }">
							<td :colspan="headers.length" class="text-center">
								<v-col cols="12">
									<strong>ID:</strong>
									{{ item.id }}
									<strong>created_at:</strong>
									{{ $date(item.created_at).format("DD/MM/YYYY HH:mm") }}
									<strong>updated_at:</strong>
									{{ $date(item.updated_at).format("DD/MM/YYYY HH:mm") }}
								</v-col>
							</td>
						</template>
						<template v-slot:no-data>
							Data belum tersedia
						</template>
						<template v-slot:body.append v-if="datatable.length > 0">
							<tr class="grey lighten-4 font-weight-black">
								<td class="text-right" colspan="6">TOTAL TRANSAKSI PAID</td>
								<td class="text-right">
									{{ totaltransaksi_paid | formatUang }}
								</td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr class="grey lighten-4 font-weight-black">
								<td class="text-right" colspan="6">TOTAL TRANSAKSI UNPAID</td>
								<td class="text-right">
									{{ totaltransaksi_unpaid | formatUang }}
								</td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr class="grey lighten-4 font-weight-black">
								<td class="text-right" colspan="6">TOTAL TRANSAKSI CANCELED</td>
								<td class="text-right">
									{{ totaltransaksi_canceled | formatUang }}
								</td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr class="grey lighten-4 font-weight-black">
								<td class="text-right" colspan="6">TOTAL TRANSAKSI</td>
								<td class="text-right">
									{{
										(totaltransaksi_canceled +
											totaltransaksi_paid +
											totaltransaksi_unpaid)
											| formatUang
									}}
								</td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</template>
					</v-data-table>
				</v-col>
			</v-row>
		</v-container>
		<dialog-printout pid="transaksi" title="Daftar Transaksi" ref="dialogprint">
		</dialog-printout>
	</KeuanganLayout>
</template>
<script>
	import KeuanganLayout from "@/views/layouts/KeuanganLayout";
	import ModuleHeader from "@/components/ModuleHeader";
	import Filter18 from "@/components/sidebar/FilterMode18";
	import DialogPrintoutKeuangan from "@/components/DialogPrintoutKeuangan";
	export default {
		name: "Transaksi",
		created() {
			this.dashboard = this.$store.getters["uiadmin/getDefaultDashboard"];
			this.breadcrumbs = [
				{
					text: "HOME",
					disabled: false,
					href: "/dashboard/" + this.ACCESS_TOKEN,
				},
				{
					text: "KEUANGAN",
					disabled: false,
					href: "/keuangan",
				},
				{
					text: "DAFTAR TRANSAKSI",
					disabled: true,
					href: "#",
				},
			];
			this.breadcrumbs[1].disabled =
				this.dashboard == "mahasiswabaru" || this.dashboard == "mahasiswa";
			let prodi_id = this.$store.getters["uiadmin/getProdiID"];
			this.prodi_id = prodi_id;
			this.nama_prodi = this.$store.getters["uiadmin/getProdiName"](prodi_id);
			this.tahun_akademik = this.$store.getters["uiadmin/getTahunAkademik"];
		},
		mounted() {
			this.initialize();
		},
		data: () => ({
			firstloading: true,
			breadcrumbs: [],
			prodi_id: null,
			nama_prodi: null,
			tahun_akademik: 0,
			btnLoading: false,
			filter_ignore: false,
			awaiting_search: false,

			//tables
			datatableLoading: false,
			datatable: [],
			headers: [
				{
					text: "KODE BILLING",
					value: "no_transaksi",
					width: 100,
					sortable: true,
				},
				{ text: "TANGGAL", value: "tanggal", width: 100, sortable: true },
				{ text: "NIM", value: "nim", width: 100, sortable: true },
				{
					text: "NAMA MAHASISWA",
					value: "nama_mhs",
					sortable: true,
					width: 250,
				},
				{ text: "SMT", value: "idsmt", width: 50, sortable: true },
				{ text: "TOTAL", value: "total", width: 100, sortable: true },
				{ text: "STATUS", value: "nama_status", width: 50, sortable: true },
				{ text: "KET.", value: "desc", width: 150, sortable: false },
				{ text: "AKSI", value: "actions", sortable: false, width: 50 },
			],
			expanded: [],
			search: "",

			//dialog
			dialogdetailitem: false,
			headers_detail: [
				{ text: "KODE", value: "kombi_id", width: 50, sortable: false },
				{ text: "NAMA KOMPONEN", value: "nama_kombi", sortable: false },
				{ text: "BIAYA", value: "biaya", width: 60, sortable: false },
				{ text: "JUMLAH", value: "jumlah", width: 60, sortable: false },
				{ text: "BULAN", value: "bulan", width: 60, sortable: false },
				{ text: "JUMLAH", value: "sub_total", width: 60, sortable: false },
			],
			//form data
			data_transaksi: {},
			data_transaksi_detail: {},
		}),
		methods: {
			changeTahunAkademik(tahun) {
				this.tahun_akademik = tahun;
			},
			changeProdi(id) {
				this.prodi_id = id;
			},
			initialize: async function() {
				this.datatableLoading = true;
				await this.$ajax
					.post(
						"/keuangan/transaksi",
						{
							TA: this.tahun_akademik,
							PRODI_ID: this.prodi_id,
						},
						{
							headers: {
								Authorization: this.$store.getters["auth/Token"],
							},
						}
					)
					.then(({ data }) => {
						this.datatable = data.transaksi;
						this.datatableLoading = false;
					});
				this.firstloading = false;
				this.$refs.filter18.setFirstTimeLoading(this.firstloading);
			},
			dataTableRowClicked(item) {
				if (item === this.expanded[0]) {
					this.expanded = [];
				} else {
					this.expanded = [item];
				}
			},
			viewItem(item) {
				this.$router.push(
					"/keuangan/transaksi/" + item.id
				);
			},
			closedialogdetailitem() {
				this.dialogdetailitem = false;
				setTimeout(() => {
					this.editedIndex = -1;
					this.data_transaksi = {};
					this.data_transaksi_detail = {};
				}, 300);
			},
		},
		watch: {
			tahun_akademik() {
				if (!this.firstloading) {
					this.initialize();
				}
			},
			prodi_id(val) {
				if (!this.firstloading) {
					this.nama_prodi = this.$store.getters["uiadmin/getProdiName"](val);
					this.initialize();
				}
			},
			search() {
				if (!this.awaiting_search) {
					setTimeout(async () => {
						if (this.search.length > 0 && this.filter_ignore) {
							this.datatableLoading = true;
							await this.$ajax
								.post(
									"/keuangan/transaksi",
									{
										PRODI_ID: this.prodi_id,
										TA: this.tahun_akademik,
										search: this.search,
									},
									{
										headers: {
											Authorization: this.$store.getters["auth/Token"],
										},
									}
								)
								.then(({ data }) => {
									this.datatable = data.transaksi;
									this.datatableLoading = false;
								});
						}
						this.awaiting_search = false;
					}, 1000); // 1 sec delay
				}
				this.awaiting_search = true;
			},
		},
		computed: {
			totaltransaksi_paid() {
				var total = 0;
				this.datatable.forEach(item => {
					if (item.status == 1) {
						total += item.total;
					}
				});
				return total;
			},
			totaltransaksi_unpaid() {
				var total = 0;
				this.datatable.forEach(item => {
					if (item.status == 0) {
						total += item.total;
					}
				});
				return total;
			},
			totaltransaksi_canceled() {
				var total = 0;
				this.datatable.forEach(item => {
					if (item.status == 2) {
						total += item.total;
					}
				});
				return total;
			},
		},
		components: {
			KeuanganLayout,
			ModuleHeader,
			Filter18,
			"dialog-printout": DialogPrintoutKeuangan,
		},
	};
</script>
