<template>
	<div>
		<v-app-bar app class="white" elevation="0">
			<v-toolbar-title @click.stop="$router.push('/dashboard/'+$store.getters['auth/AccessToken']).catch(err => {})">
								<span>
									<v-img
											max-width="305"
											:src="$api.storageURL+'/storages/images/applogo.png'"
											>
										</v-img>
								</span>
				</v-toolbar-title>
			<v-spacer />
			<v-toolbar-items class="hidden-sm-and-down">
				<v-btn to="/" class="mr-2" color="red darken-3" text large>
					HOME
				</v-btn>
				<v-btn to="/blog/cara-pendaftaran" class="mr-2" color="red darken-3" text large>
					CARA PENDAFTARAN
				</v-btn>
				<v-btn to="/pmb" class="mr-2" color="red darken-3" text large>
					PENDAFTARAN
				</v-btn>
				<v-btn to="/login" color="red darken-3" text large>
					LOGIN
				</v-btn>
			</v-toolbar-items>
			<v-menu class="hidden-md-and-up" v-if="$vuetify.breakpoint.xsOnly">
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item to="/">
                        <v-list-item-title>HOME</v-list-item-title>
                    </v-list-item>
                    <v-list-item to="/blog/cara-pendaftaran">
                        <v-list-item-title>CARA PENDAFTARAN</v-list-item-title>
                    </v-list-item>
                    <v-list-item to="/pmb">
                        <v-list-item-title>PENDAFTARAN</v-list-item-title>
                    </v-list-item>
                    <v-list-item to="/login">
                        <v-list-item-title>LOGIN</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
		</v-app-bar>
		<v-main>
			<slot />
		</v-main>
		<v-footer app padless fixed dark>
			<v-card class="flex" flat tile>
				<v-divider></v-divider>
				<v-card-text class="py-2 white--text text-center">
					<strong>SIMAK (2021-2022)</strong>
					dikembangkan oleh TIM IT STMIK Bandung Bali
					<v-btn
						dark
						icon
						href="https://github.com/stmikbdgbali/simak"
					>
						<v-icon>mdi-github</v-icon>
					</v-btn>
				</v-card-text>
			</v-card>
		</v-footer>
	</div>
</template>
<script>
	import { mapGetters } from "vuex";
	export default {
		name: "FrontLayout",
		created() {
			this.$store.dispatch("uifront/init", this.$ajax);
		},
		computed: {
			...mapGetters("uifront", {
				namaPTAlias: "getNamaPTAlias",
			}),
		},
	};
</script>
