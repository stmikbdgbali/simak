<template>
	<v-app class="blue-grey lighten-5">
		<v-main>
			<v-container class="fill-height white" v-if="data_transaksi">
				<v-row align="center" justify="center" no-gutters>
					<v-col xs="12" sm="12" md="8">
						<v-row>
							<v-col cols="8">
								<v-img
									:src="$api.url + '/storages/images/logo.png'"
									max-width="200"
									max-height="200"
								/>
							</v-col>
							<v-col cols="4" class="font-weight-medium">
								<h1 :class="colorstatus(data_transaksi.status)">
									{{ data_transaksi.nama_status }}
								</h1>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="12">
								<h3>Kode Billing: #{{ data_transaksi.no_transaksi }}</h3>
							</v-col>
						</v-row>
						<v-divider></v-divider>
						<v-row>
							<v-col cols="6">
								<strong>Invoiced To:</strong><br />
								{{ data_transaksi.nama_mhs }}<br />
								{{ data_transaksi.alamat_rumah }}<br />
								{{ data_transaksi.telp_hp }}
								{{ this.headers.header_1 }}<br />
								{{ this.headers.header_address }}
							</v-col>
							<v-col cols="6">
								<strong>Pay To:</strong><br />
								BNI (BANK NEGARA INDONESIA) <br />
								NOMOR REKENING : 10-0062-8460 <br />
								A.N : STMIK BANDUNG BALI <br />
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="6">
								<strong>Invoice Date:</strong><br />
								{{
									$date(data_transaksi.created_at).format("DD/MM/YYYY HH:mm")
								}}
							</v-col>
							<v-col cols="6">
								<strong>Payment Method:</strong><br />
								Transfer BNI (24 Jam)
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="12">
								<v-data-table
									:disable-pagination="true"
									:hide-default-footer="true"
									:items="transaksi_detail"
									:headers="headers_detail"
								>
									<template v-slot:item.biaya="{ item }">
										{{ item.biaya | formatUang }}
									</template>
									<template v-slot:item.promovalue="{ item }">
										{{ item.promovalue | formatUang }}
									</template>
									<template v-slot:item.sub_total="{ item }">
										{{ item.sub_total | formatUang }}
									</template>
									<template
										v-slot:body.append
										v-if="transaksi_detail.length > 0"
									>
										<tr class="grey lighten-4 font-weight-black">
											<td class="text-right" colspan="6">TOTAL</td>
											<td class="text-right">
												{{ total | formatUang }}
											</td>
										</tr>
									</template>
								</v-data-table>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>
<script>
	import { mapGetters } from "vuex";
	export default {
		name: "TransaksiInvoice",
		created() {
			this.transaksi_id = this.$route.params.transaksi_id;
			this.initialize();
		},
		data: () => ({
			transaksi_id: null,
			data_transaksi: null,
			transaksi_detail: [],
			datatableLoading: false,
			errormessage: "",
			headers: {
				header_1: "",
				header_2: "",
				header_3: "",
				header_4: "",
				header_address: "",
			},
			headers_detail: [
				{ text: "KODE", value: "kombi_id", width: 50, sortable: false },
				{ text: "NAMA KOMPONEN", value: "nama_kombi", sortable: false },
				{ text: "BIAYA", value: "biaya", width: 60, sortable: false },
				{ text: "POTONGAN", value: "promovalue", width: 60, sortable: false },
				{ text: "JUMLAH", value: "jumlah", width: 60, sortable: false },
				{ text: "BULAN", value: "bulan", width: 60, sortable: false },
				{ text: "SUB TOTAL", value: "sub_total", width: 60, sortable: false },
			],
		}),
		methods: {
			initialize: async function() {
				this.datatableLoading = true;
				await this.$ajax
					.get("/system/setting/variables", {
						headers: {
							Authorization: this.$store.getters["auth/Token"],
						},
					})
					.then(({ data }) => {
						let setting = data.setting;
						this.headers.header_1 = setting.HEADER_1;
						this.headers.header_2 = setting.HEADER_2;
						this.headers.header_3 = setting.HEADER_3;
						this.headers.header_4 = setting.HEADER_4;
						this.headers.header_address = setting.HEADER_ADDRESS;
					});
				await this.$ajax
					.get("/keuangan/transaksi/" + this.transaksi_id, {
						headers: {
							Authorization: this.$store.getters["auth/Token"],
						},
					})
					.then(({ data }) => {
						this.data_transaksi = data.transaksi;
						this.transaksi_detail = data.transaksi_detail;
						this.datatableLoading = false;
					})
					.catch(() => {
						this.datatableLoading = false;
						this.errormessage = "Gagal memperoleh data";
					});
			},
			colorstatus(status) {
				switch (status) {
					case 0:
						return "red--text";
					case 1:
						return "green--text";
					case 2:
						return "orange--text";
				}
			},
		},
		computed: {
			...mapGetters("uifront", {
				namaPTAlias: "getNamaPTAlias",
			}),
			total() {
				var total = 0;
				this.transaksi_detail.forEach(element => {
					total += element.sub_total;
				});
				return total;
			},
		},
	};
</script>
