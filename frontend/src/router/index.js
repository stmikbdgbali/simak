import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import NotFoundComponent from "../components/NotFoundComponent";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "FrontDashboard",
		meta: {
			title: "DASHBOARD",
		},
		component: () => import("../views/pages/front/Home.vue"),
	},
	{
		path: '/pmb',
		name: 'FrontPMB',
		meta:{
			title: "PENDAFTARAN MAHASISWA BARU"
		},
		component: () => import('../views/pages/front/PMB.vue')
	},
	{
		path: '/login',
		name: 'FrontLogin',
		meta:{
			title: "LOGIN"
		},
		component: () => import('../views/pages/front/Login.vue')
	},
	{
		path: '/dashboard/:token',
		name: 'AdminDashboard',
		meta:{
			title: "DASHBOARD",			
		},
		component: () => import('../views/pages/admin/Dashboard.vue'),		
	},
	//dmaster
	{
		path: '/dmaster',
		name: 'DMaster',
		meta:{
			title: "DATA MASTER",
			requiresAuth:true,
        },
		component: () => import('../views/pages/admin/dmaster/DMaster.vue'),
	},
	// dmaster - fasilitas
	{
		path: '/dmaster/ruangkelas',
		name: 'DMasterRuangKelas',
		meta:{
			title: "DATA MASTER - RUANG KELAS",
			requiresAuth:true,
        },
		component: () => import('../views/pages/admin/dmaster/RuangKelas.vue'),
	},
	{
		path: '/dmaster/kelas',
		name: 'DMasterKelas',
		meta:{
			title: "DATA MASTER - KELAS",
			requiresAuth:true,
        },
		component: () => import('../views/pages/admin/dmaster/Kelas.vue'),
	},
	// dmaster - pmb
	{
		path: '/dmaster/persyaratanpmb',
		name: 'DMasterPersyaratanPMB',
		meta:{
			title: "DATA MASTER - PERSYARATAN PMB",
			requiresAuth:true,
        },
		component: () => import('../views/pages/admin/dmaster/PersyaratanPMB.vue'),
	},
	{
		path: '/dmaster/jabatanakademik',
		name: 'DMasterJabatanAkademik',
		meta:{
			title: "DATA MASTER - JABATAN AKADEMIK",
			requiresAuth:true,
        },
		component: () => import('../views/pages/admin/dmaster/JabatanAkademik.vue'),
	},
	{
		path: '/dmaster/jenjangstudi',
		name: 'DMasterJenjangStudi',
		meta:{
			title: "DATA MASTER - JENJANG STUDI",
			requiresAuth:true,
        },
		component: () => import('../views/pages/admin/dmaster/JenjangStudi.vue'),
	},
	{
		path: '/dmaster/statusmahasiswa',
		name: 'DMasterStatusMahasiswa',
		meta:{
			title: "DATA MASTER - STATUS MAHASISWA",
			requiresAuth:true,
        },
		component: () => import('../views/pages/admin/dmaster/StatusMahasiswa.vue'),
	},
	{
		path: '/dmaster/ta',
		name: 'DMasterTahunAkademik',
		meta:{
			title: "DATA MASTER - TAHUN AKADEMIK",
			requiresAuth:true,
        },
		component: () => import('../views/pages/admin/dmaster/TahunAkademik.vue'),
	},
	{
		path: '/dmaster/fakultas',
		name: 'DMasterFakultas',
		meta:{
			title: "DATA MASTER - FAKULTAS",
			requiresAuth:true,
        },
		component: () => import('../views/pages/admin/dmaster/Fakultas.vue'),
		beforeEnter: (to, from, next) => {
			if(store.getters['uifront/getBentukPT']=='sekolahtinggi')
			{
				next('/dashboard/'+store.getters['auth/AccessToken']);
			}
			else
			{
				next();
			}
		}
	},
	{
		path: '/dmaster/programstudi',
		name: 'DMasterProgramStudi',
		meta:{
			title: "DATA MASTER - PROGRAM STUDI",
			requiresAuth:true,
        },
		component: () => import('../views/pages/admin/dmaster/ProgramStudi.vue'),
	},
	//system
	{
		path: '/system-setting',
		name: 'SystemSetting',
		meta:{
			title: "SETTING - SISTEM",
			requiresAuth:true,
		},
		component: () => import('../views/pages/admin/system/SystemSetting.vue'),
	},
	{
		path: '/system-setting/identitasdiri',
		name: 'IdentitasDiri',
		meta:{
			title: "SETTING - IDENTITAS DIRI",
			requiresAuth:true,
		},
		component: () => import('../views/pages/admin/system/IdentitasDiri.vue'),
	},
	{
		path: '/system-setting/variables',
		name: 'Variables',
		meta:{
			title: "SETTING - VARIABLES",
			requiresAuth:true,
		},
		component: () => import('../views/pages/admin/system/Variables.vue'),
	},
	{
		path: '/system-setting/headerlaporan',
		name: 'HeaderLaporan',
		meta:{
			title: "SETTING - HEADER LAPORAN",
			requiresAuth:true,
		},
		component: () => import('../views/pages/admin/system/HeaderLaporan.vue'),
	},
	{
		path: '/system-setting/captcha',
		name: 'SettingCaptcha',
		meta:{
			title: "SETTING - CAPTCHA",
			requiresAuth:true,
		},
		component: () => import('../views/pages/admin/system/Captcha.vue'),
	},
	{
		path: '/system-setting/email',
		name: 'SettingEmail',
		meta:{
			title: "SETTING - EMAIL",
			requiresAuth:true,
		},
		component: () => import('../views/pages/admin/system/Email.vue'),
	},
	{
		path: '/system-setting/cache',
		name: 'SettingCache',
		meta:{
			title: "SETTING - CACHE",
			requiresAuth:true,
		},
		component: () => import('../views/pages/admin/system/Cache.vue'),
	},
	//plugins
	{
		path: '/system-setting/zoom',
		name: 'SettingZoom',
		meta:{
			title: "SETTING - ZOOM",
			requiresAuth:true,
		},
		component: () => import('../views/pages/admin/system/Zoom.vue'),
	},
	//system - users
	{
		path: '/system-users',
		name: 'SystemUsers',
		meta:{
			title: "SYSTEM - USERS",
			requiresAuth:true,
		},
		component: () => import('../views/pages/admin/system/SystemUsers.vue'),
	},
	{
		path: '/system-users/permissions',
		name: 'UsersPermissions',
		meta:{
			title: "USERS - PERMISSIONS",
			requiresAuth:true,
		},
		component: () => import('../views/pages/admin/system/Permissions.vue'),
	},
	{
		path: '/system-users/mypermission',
		name: 'MyPermissions',
		meta:{
			title: "USERS - MY PERMISSION",
			requiresAuth:true,
		},
		component: () => import('../views/pages/admin/system/MyPermission.vue'),
	},
	{
		path: '/system-users/roles',
		name: 'UsersRoles',
		meta:{
			title: "USERS - ROLES",
			requiresAuth:true,
		},
		component: () => import('../views/pages/admin/system/Roles.vue'),
	},
	{
		path: '/system-users/superadmin',
		name: 'UsersSuperadmin',
		meta:{
			title: "USERS - SUPER ADMIN",
			requiresAuth:true,
		},
		component: () => import('../views/pages/admin/system/UsersSuperadmin.vue'),
	},
	{
		path: '/system-users/pmb',
		name: 'UsersPMB',
		meta:{
			title: "USERS - PMB",
			requiresAuth:true,
		},
		component: () => import('../views/pages/admin/system/UsersPMB.vue'),
	},
	{
		path: '/system-users/akademik',
		name: 'UsersAkademik',
		meta:{
			title: "USERS - AKADEMIK",
			requiresAuth:true,
		},
		component: () => import('../views/pages/admin/system/UsersAkademik.vue'),
	},
	{
		path: '/system-users/prodi',
		name: 'UsersProdi',
		meta:{
			title: "USERS - PROGRAM STUDI",
			requiresAuth:true,
		},
		component: () => import('../views/pages/admin/system/UsersProdi.vue'),
	},
	{
		path: '/system-users/puslahta',
		name: 'UsersPuslahta',
		meta:{
			title: "USERS - PUSLAHTA",
			requiresAuth:true,
		},
		component: () => import('../views/pages/admin/system/UsersPuslahta.vue'),
	},
	{
		path: '/system-users/dosen',
		name: 'UsersDosen',
		meta:{
			title: "USERS - DOSEN",
			requiresAuth:true,
		},
		component: () => import('../views/pages/admin/system/UsersDosen.vue'),
	},
	{
		path: '/system-users/keuangan',
		name: 'UsersKeuangan',
		meta:{
			title: "USERS - KEUANGAN",
			requiresAuth:true,
		},
		component: () => import('../views/pages/admin/system/UsersKeuangan.vue'),
	},
	{
		path: '/system-users/profil',
		name: 'UsersProfil',
		meta:{
			title: "USERS - PROFILE",
			requiresAuth:true,
		},
		component: () => import('../views/pages/admin/system/UsersProfile.vue'),
	},
	{
		path: "/404",
		name: "NotFoundComponent",
		meta: {
			title: "PAGE NOT FOUND",
		},
		component: NotFoundComponent,
	},
	{
		path: "*",
		redirect: "/404",
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	document.title = to.meta.title;
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (store.getters["auth/Authenticated"]) {
			next();
			return;
		}
		next("/login");
	} else {
		next();
	}
});

export default router;
