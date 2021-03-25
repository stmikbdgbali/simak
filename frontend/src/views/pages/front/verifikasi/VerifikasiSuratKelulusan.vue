<template>
	<v-app>
		<v-main>
			<v-container class="fill-height" v-if="sk_id">
				<v-row align="center" justify="center" no-gutters>
					<v-col xs="12" sm="6" md="4">

					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>
<script>
	export default {
		name: "VerifikasiSuratKelulusan",
		created() {
			this.sk_id=this.$route.params.sk_id;
			this.initialize();
		},
		data: () => ({
			sk_id: null,
		}),
		methods: {
			async initialize() {
				await this.$ajax
					.get(
						"/verifikasi/" + this.sk_id + "/suratkelulusan",
						{
							headers: {
								Authorization: this.$store.getters["auth/Token"],
							},
						})
						.then(({ data }) => {
							console.log(data);
						});
			},
		},
	};
</script>
