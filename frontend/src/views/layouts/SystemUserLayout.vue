<template>
	<div>
		<v-system-bar
			app
			dark
			:class="
				this.$store.getters['uiadmin/getTheme'](
					'V-SYSTEM-BAR-CSS-CLASS'
				)
			"
		>
			<strong>Hak Akses Sebagai :</strong> {{ ROLE }}
		</v-system-bar>
		<v-app-bar app>
			<v-app-bar-nav-icon
				@click.stop="drawer = !drawer"
				class="grey--text"
			>
			</v-app-bar-nav-icon>
			<v-toolbar-title
				class="headline clickable"
				@click.stop="
					$router
						.push(
							'/dashboard/' + $store.getters['auth/AccessToken']
						)
						.catch(err => {})
				"
			>
				<span class="hidden-sm-and-down">{{ APP_NAME }}</span>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-divider class="mx-4" inset vertical />
			<v-menu
				:close-on-content-click="true"
				origin="center center"
				transition="scale-transition"
				:offset-y="true"
				bottom
				left
			>
				<template v-slot:activator="{ on }">
					<v-avatar size="30">
						<v-img :src="photoUser" v-on="on" />
					</v-avatar>
				</template>
				<v-list>
					<v-list-item>
						<v-list-item-avatar>
							<v-img :src="photoUser"></v-img>
						</v-list-item-avatar>
						<v-list-item-content>
							<v-list-item-title class="title">
								{{ ATTRIBUTE_USER("username") }}
							</v-list-item-title>
							<v-list-item-subtitle>
								[{{ DEFAULT_ROLE }}]
							</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
					<v-divider />
					<v-list-item to="/system-users/profil">
						<v-list-item-icon class="mr-2">
							<v-icon>mdi-account</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Profil</v-list-item-title>
					</v-list-item>
					<v-divider />
					<v-list-item @click.prevent="logout">
						<v-list-item-icon class="mr-2">
							<v-icon>mdi-power</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Logout</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</v-app-bar>
		<v-navigation-drawer
			v-model="drawer"
			width="300"
			dark
			class="green darken-1"
			:temporary="temporaryleftsidebar"
			app
		>
			<v-list-item>
				<v-list-item-avatar>
					<v-img :src="photoUser" @click.stop="toProfile"></v-img>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title class="title">
						{{ ATTRIBUTE_USER("username") }}
					</v-list-item-title>
					<v-list-item-subtitle>
						[{{ DEFAULT_ROLE }}]
					</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
			<v-divider></v-divider>
			<v-list expand>
				<v-list-item
					:to="{ path: '/system-users' }"
					v-if="CAN_ACCESS('SYSTEM-USERS-GROUP')"
					link
					class="yellow"
					color="green"
				>
					<v-list-item-icon class="mr-2">
						<v-icon>mdi-account</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>BOARD USERS</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item link to="/system-users/profil">
					<v-list-item-icon class="mr-2">
						<v-icon>mdi-account</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>
							PROFIL USER
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-divider />
				<v-list-item
					link
					v-if="CAN_ACCESS('SYSTEM-SETTING-PERMISSIONS')"
					to="/system-users/permissions"
				>
					<v-list-item-icon class="mr-2">
						<v-icon>mdi-account-key</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>
							PERMISSIONS
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item
					link
					v-if="CAN_ACCESS('SYSTEM-SETTING-ROLES')"
					to="/system-users/roles"
				>
					<v-list-item-icon class="mr-2">
						<v-icon>mdi-account-group</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>
							ROLES
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-divider v-if="CAN_ACCESS('SYSTEM-SETTING-ROLES')" />
				<v-list-item
					link
					v-if="CAN_ACCESS('SYSTEM-USERS-SUPERADMIN_BROWSE')"
					to="/system-users/superadmin"
				>
					<v-list-item-icon class="mr-2">
						<v-icon>mdi-account</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>
							SUPERADMIN
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item
					link
					v-if="CAN_ACCESS('SYSTEM-USERS-KEUANGAN_BROWSE')"
					to="/system-users/keuangan"
				>
					<v-list-item-icon class="mr-2">
						<v-icon>mdi-account</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>
							KEUANGAN
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item
					link
					v-if="CAN_ACCESS('SYSTEM-USERS-PMB_BROWSE')"
					to="/system-users/pmb"
				>
					<v-list-item-icon class="mr-2">
						<v-icon>mdi-account</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>
							TIM PMB
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item
					link
					v-if="CAN_ACCESS('SYSTEM-USERS-AKADEMIK_BROWSE')"
					to="/system-users/akademik"
				>
					<v-list-item-icon class="mr-2">
						<v-icon>mdi-account</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>
							AKADEMIK
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item
					link
					v-if="CAN_ACCESS('SYSTEM-USERS-PROGRAM-STUDI_BROWSE')"
					to="/system-users/prodi"
				>
					<v-list-item-icon class="mr-2">
						<v-icon>mdi-account</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>
							PROGRAM STUDI
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item
					link
					v-if="CAN_ACCESS('SYSTEM-USERS-PUSLAHTA_BROWSE')"
					to="/system-users/puslahta"
				>
					<v-list-item-icon class="mr-2">
						<v-icon>mdi-account</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>
							PUSLAHTA
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item
					link
					v-if="CAN_ACCESS('SYSTEM-USERS-DOSEN_BROWSE')"
					to="/system-users/dosen"
				>
					<v-list-item-icon class="mr-2">
						<v-icon>mdi-account</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>
							DOSEN
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item
					link
					v-if="dashboard == 'dosen'"
					to="/system-users/biodatadiridosen"
				>
					<v-list-item-icon class="mr-2">
						<v-icon>mdi-account</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>
							BIODATA DIRI
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item
					link
					v-if="dashboard == 'mahasiswa'"
					to="/system-users/biodatadirimahasiswa"
				>
					<v-list-item-icon class="mr-2">
						<v-icon>mdi-account</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>
							BIODATA DIRI
						</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-main class="mx-4 mb-4">
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
		name: "SystemUserLayout",
		created() {
			this.dashboard = this.$store.getters["uiadmin/getDefaultDashboard"];
		},
		props: {
			showrightsidebar: {
				type: Boolean,
				default: true,
			},
			temporaryleftsidebar: {
				type: Boolean,
				default: false,
			},
		},
		data: () => ({
			loginTime: 0,
			drawer: null,
			dashboard: null,
		}),
		methods: {
			logout() {
				this.loginTime = 0;
				this.$ajax
					.post(
						"/auth/logout",
						{},
						{
							headers: {
								Authorization: this.TOKEN,
							},
						}
					)
					.then(() => {
						this.$store.dispatch("auth/logout");
						this.$store.dispatch("uifront/reinit");
						this.$store.dispatch("uiadmin/reinit");
						this.$router.push("/");
					})
					.catch(() => {
						this.$store.dispatch("auth/logout");
						this.$store.dispatch("uifront/reinit");
						this.$store.dispatch("uiadmin/reinit");
						this.$router.push("/");
					});
			},
			isBentukPT(bentuk_pt) {
				return this.$store.getters["uifront/getBentukPT"] == bentuk_pt
					? true
					: false;
			},
		},
		computed: {
			...mapGetters({
				AUTHENTICATED: "auth/Authenticated",
				ACCESS_TOKEN: "auth/AccessToken",
				TOKEN: "auth/Token",
				DEFAULT_ROLE: "auth/DefaultRole",
				ROLE: "auth/Role",
				CAN_ACCESS: "auth/can",
				ATTRIBUTE_USER: "auth/AttributeUser",
			}),
			APP_NAME() {
				return process.env.VUE_APP_NAME;
			},
			photoUser() {
				let img = this.ATTRIBUTE_USER("foto");
				var photo;
				if (img == "") {
					photo =
						this.$api.url + "/storage/images/users/no_photo.png";
				} else {
					photo = this.$api.url + "/" + img;
				}
				return photo;
			},
		},
		watch: {
			loginTime: {
				handler(value) {
					if (value >= 0) {
						setTimeout(() => {
							this.loginTime =
								this.AUTHENTICATED == true
									? this.loginTime + 1
									: -1;
						}, 1000);
					} else {
						this.$store.dispatch("auth/logout");
						this.$router.replace("/login");
					}
				},
				immediate: true,
			},
		},
	};
</script>
