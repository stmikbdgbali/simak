(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3bc47bda"],{"0bc6":function(t,i,a){},"553a":function(t,i,a){"use strict";a("a9e3"),a("c7cd");var e=a("5530"),s=(a("b5b6"),a("8dd9")),r=a("3a66"),n=a("d10f"),o=a("58df"),l=a("80d2");i["a"]=Object(o["a"])(s["a"],Object(r["a"])("footer",["height","inset"]),n["a"]).extend({name:"v-footer",props:{height:{default:"auto",type:[Number,String]},inset:Boolean,padless:Boolean,tag:{type:String,default:"footer"}},computed:{applicationProperty:function(){return this.inset?"insetFooter":"footer"},classes:function(){return Object(e["a"])(Object(e["a"])({},s["a"].options.computed.classes.call(this)),{},{"v-footer--absolute":this.absolute,"v-footer--fixed":!this.absolute&&(this.app||this.fixed),"v-footer--padless":this.padless,"v-footer--inset":this.inset})},computedBottom:function(){if(this.isPositioned)return this.app?this.$vuetify.application.bottom:0},computedLeft:function(){if(this.isPositioned)return this.app&&this.inset?this.$vuetify.application.left:0},computedRight:function(){if(this.isPositioned)return this.app&&this.inset?this.$vuetify.application.right:0},isPositioned:function(){return Boolean(this.absolute||this.fixed||this.app)},styles:function(){var t=parseInt(this.height);return Object(e["a"])(Object(e["a"])({},s["a"].options.computed.styles.call(this)),{},{height:isNaN(t)?t:Object(l["g"])(t),left:Object(l["g"])(this.computedLeft),right:Object(l["g"])(this.computedRight),bottom:Object(l["g"])(this.computedBottom)})}},methods:{updateApplication:function(){var t=parseInt(this.height);return isNaN(t)?this.$el?this.$el.clientHeight:0:t}},render:function(t){var i=this.setBackgroundColor(this.color,{staticClass:"v-footer",class:this.classes,style:this.styles});return t(this.tag,i,this.$slots.default)}})},"565c":function(t,i,a){"use strict";a.r(i);var e=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("SPMBLayout",{attrs:{showrightsidebar:!1}},[a("ModuleHeader",{scopedSlots:t._u([{key:"icon",fn:function(){return[t._v(" mdi-file-document-edit-outline ")]},proxy:!0},{key:"name",fn:function(){return[t._v(" NILAI UJIAN ")]},proxy:!0},"mahasiswabaru"!=t.dashboard?{key:"subtitle",fn:function(){return[t._v(" TAHUN PENDAFTARAN "+t._s(t.tahun_pendaftaran)+" - "+t._s(t.nama_prodi)+" ")]},proxy:!0}:null,{key:"breadcrumbs",fn:function(){return[a("v-breadcrumbs",{staticClass:"pa-0",attrs:{items:t.breadcrumbs},scopedSlots:t._u([{key:"divider",fn:function(){return[a("v-icon",[t._v("mdi-chevron-right")])]},proxy:!0}])})]},proxy:!0},{key:"desc",fn:function(){return[a("v-alert",{attrs:{color:"cyan",border:"left","colored-border":"",type:"info"}},[t._v(" Halaman ini digunakan untuk menampilkan hasil ujian PMB Calon Mahasiswa baru ")])]},proxy:!0}],null,!0)}),t.data_nilai_ujian?a("v-container",{attrs:{fluid:""}},[a("v-row",{staticClass:"mb-4",attrs:{"no-gutters":""}},[a("v-col",{attrs:{cols:"12"}},[a("v-card",{attrs:{color:"grey lighten-4"}},[a("v-toolbar",{attrs:{elevation:"2"}},[a("v-toolbar-title",[t._v("DATA NILAI UJIAN")]),a("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),a("v-spacer"),a("v-icon",{on:{click:function(i){return i.stopPropagation(),t.closedialogfrm()}}},[t._v(" mdi-close-thick ")])],1),a("v-card-text",[a("v-row",[a("v-col",{attrs:{xs:"12",sm:"6",md:"6"}},[a("v-card",{attrs:{flat:""}},[a("v-card-title",[t._v("ID :")]),a("v-card-subtitle",[t._v(" "+t._s(t.data_mhs.user_id)+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?a("v-responsive",{attrs:{width:"100%"}}):t._e(),a("v-col",{attrs:{xs:"12",sm:"6",md:"6"}},[a("v-card",{attrs:{flat:""}},[a("v-card-title",[t._v("PROGRAM STUDI :")]),a("v-card-subtitle",[t._v(" "+t._s(t.data_mhs.nama_prodi)+" ")])],1)],1)],1),a("v-row",[a("v-col",{attrs:{xs:"12",sm:"6",md:"6"}},[a("v-card",{attrs:{flat:""}},[a("v-card-title",[t._v("NAMA MAHASISWA :")]),a("v-card-subtitle",[t._v(" "+t._s(t.data_mhs.nama_mhs)+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?a("v-responsive",{attrs:{width:"100%"}}):t._e(),a("v-col",{attrs:{xs:"12",sm:"6",md:"6"}},[a("v-card",{attrs:{flat:""}},[a("v-card-title",[t._v("JUMLAH SOAL :")]),a("v-card-subtitle",[t._v(" "+t._s(t.data_nilai_ujian.jumlah_soal)+" ")])],1)],1)],1),a("v-row",[a("v-col",{attrs:{xs:"12",sm:"6",md:"6"}},[a("v-card",{attrs:{flat:""}},[a("v-card-title",[t._v("NILAI UJIAN :")]),a("v-card-subtitle",[t._v(" "+t._s(t.data_nilai_ujian.nilai)+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?a("v-responsive",{attrs:{width:"100%"}}):t._e(),a("v-col",{attrs:{xs:"12",sm:"6",md:"6"}},[a("v-card",{attrs:{flat:""}},[a("v-card-title",[t._v("JAWABAN :")]),a("v-card-subtitle",[t._v(" BENAR ("+t._s(t.data_nilai_ujian.jawaban_benar)+"), SALAH ("+t._s(t.data_nilai_ujian.jawaban_salah)+") ")])],1)],1)],1)],1)],1)],1)],1)],1):t._e()],1)},s=[],r=(a("96cf"),a("1da1")),n=a("684f"),o=a("e477"),l={name:"NilaiUjianHasil",created:function(){this.dashboard=this.$store.getters["uiadmin/getDefaultDashboard"],this.user_id=this.$route.params.user_id,this.breadcrumbs=[{text:"HOME",disabled:!1,href:"/dashboard/"+this.$store.getters["auth/AccessToken"]},{text:"SPMB",disabled:!1,href:"/spmb"},{text:"NILAI UJIAN",disabled:!1,href:"/spmb/nilaiujian"},{text:"HASIL",disabled:!0,href:"#"}],this.breadcrumbs[1].disabled="mahasiswabaru"==this.dashboard||"mahasiswa"==this.dashboard;var t=this.$store.getters["uiadmin/getProdiID"];this.prodi_id=t,this.nama_prodi=this.$store.getters["uiadmin/getProdiName"](t),this.tahun_pendaftaran=this.$store.getters["uiadmin/getTahunPendaftaran"],this.initialize()},data:function(){return{prodi_id:null,tahun_pendaftaran:null,nama_prodi:null,breadcrumbs:[],dashboard:null,user_id:null,data_mhs:null,data_nilai_ujian:null}},methods:{initialize:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){var i=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:t.t0=this.dashboard,t.next="mahasiswabaru"===t.t0?3:4;break;case 3:return t.abrupt("break",7);case 4:return this.datatableLoading=!0,t.next=7,this.$ajax.get("/spmb/nilaiujian/"+this.user_id,{headers:{Authorization:this.$store.getters["auth/Token"]}}).then((function(t){var a=t.data;i.data_nilai_ujian=a.data_nilai_ujian,i.data_mhs=a.formulir,i.datatable=a.pmb,i.datatableLoading=!1}));case 7:case"end":return t.stop()}}),t,this)})));function i(){return t.apply(this,arguments)}return i}(),closedialogfrm:function(){this.$router.push("/spmb/nilaiujian/")}},components:{SPMBLayout:n["a"],ModuleHeader:o["a"]}},c=l,d=a("2877"),u=a("6544"),v=a.n(u),m=a("0798"),h=a("2bc5"),p=a("b0af"),b=a("99d9"),_=a("62ad"),f=a("a523"),A=a("ce7e"),g=a("132d"),S=a("6b53"),C=a("0fd9"),P=a("2fa4"),B=a("71d9"),T=a("2a7f"),N=Object(d["a"])(c,e,s,!1,null,null,null);i["default"]=N.exports;v()(N,{VAlert:m["a"],VBreadcrumbs:h["a"],VCard:p["a"],VCardSubtitle:b["b"],VCardText:b["c"],VCardTitle:b["d"],VCol:_["a"],VContainer:f["a"],VDivider:A["a"],VIcon:g["a"],VResponsive:S["a"],VRow:C["a"],VSpacer:P["a"],VToolbar:B["a"],VToolbarTitle:T["b"]})},"684f":function(t,i,a){"use strict";var e=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",[a("v-system-bar",{class:this.$store.getters["uiadmin/getTheme"]("V-SYSTEM-BAR-CSS-CLASS"),attrs:{app:"",dark:""}},[a("strong",[t._v("Hak Akses Sebagai :")]),t._v(" "+t._s(t.ROLE)+" ")]),a("v-app-bar",{attrs:{app:""}},[a("v-app-bar-nav-icon",{staticClass:"grey--text",on:{click:function(i){i.stopPropagation(),t.drawer=!t.drawer}}}),a("v-toolbar-title",{staticClass:"headline clickable",on:{click:function(i){i.stopPropagation(),t.$router.push("/dashboard/"+t.$store.getters["auth/AccessToken"]).catch((function(t){}))}}},[a("span",{staticClass:"hidden-sm-and-down"},[t._v(t._s(t.APP_NAME))])]),a("v-spacer"),a("v-menu",{attrs:{"close-on-content-click":!0,origin:"center center",transition:"scale-transition","offset-y":!0,bottom:"",left:""},scopedSlots:t._u([{key:"activator",fn:function(i){var e=i.on;return[a("v-avatar",{attrs:{size:"30"}},[a("v-img",t._g({attrs:{src:t.photoUser}},e))],1)]}}])},[a("v-list",[a("v-list-item",[a("v-list-item-avatar",[a("v-img",{attrs:{src:t.photoUser}})],1),a("v-list-item-content",[a("v-list-item-title",{staticClass:"title"},[t._v(" "+t._s(t.ATTRIBUTE_USER("username"))+" ")]),a("v-list-item-subtitle",[t._v(" ["+t._s(t.DEFAULT_ROLE)+"] ")])],1)],1),a("v-divider"),a("v-list-item",{attrs:{to:"/system-users/profil"}},[a("v-list-item-icon",{staticClass:"mr-2"},[a("v-icon",[t._v("mdi-account")])],1),a("v-list-item-title",[t._v("Profil")])],1),a("v-divider"),a("v-list-item",{on:{click:function(i){return i.preventDefault(),t.logout(i)}}},[a("v-list-item-icon",{staticClass:"mr-2"},[a("v-icon",[t._v("mdi-power")])],1),a("v-list-item-title",[t._v("Logout")])],1)],1)],1),a("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),a("v-app-bar-nav-icon",{on:{click:function(i){i.stopPropagation(),t.drawerRight=!t.drawerRight}}},[a("v-icon",[t._v("mdi-menu-open")])],1)],1),a("v-navigation-drawer",{staticClass:"green darken-1",attrs:{width:"300",dark:"",temporary:t.temporaryleftsidebar,app:""},model:{value:t.drawer,callback:function(i){t.drawer=i},expression:"drawer"}},[a("v-list-item",[a("v-list-item-avatar",[a("v-img",{attrs:{src:t.photoUser},on:{click:function(i){return i.stopPropagation(),t.toProfile(i)}}})],1),a("v-list-item-content",[a("v-list-item-title",{staticClass:"title"},[t._v(" "+t._s(t.ATTRIBUTE_USER("username"))+" ")]),a("v-list-item-subtitle",[t._v(" ["+t._s(t.DEFAULT_ROLE)+"] ")])],1)],1),a("v-divider"),a("v-list",{attrs:{expand:""}},[t.CAN_ACCESS("SPMB-GROUP")&&"mahasiswabaru"!=t.dashboard&&"mahasiswa"!=t.dashboard?a("v-list-item",{staticClass:"yellow",attrs:{to:{path:"/spmb"},link:"",color:"green"}},[a("v-list-item-icon",{staticClass:"mr-2"},[a("v-icon",[t._v("mdi-monitor-dashboard")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("BOARD SPMB")])],1)],1):t._e(),t.CAN_ACCESS("SPMB-PMB-SOAL_BROWSE")?a("v-list-item",{attrs:{link:"",to:"/spmb/soalpmb"}},[a("v-list-item-icon",{staticClass:"mr-2"},[a("v-icon",[t._v("mdi-head-question-outline")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v(" SOAL PMB ")])],1)],1):t._e(),a("v-subheader",[t._v("DATA MHS. BARU")]),t.CAN_ACCESS("SPMB-PMB_BROWSE")?a("v-list-item",{attrs:{link:"",to:"/spmb/pendaftaranbaru"}},[a("v-list-item-icon",{staticClass:"mr-2"},[a("v-icon",[t._v("mdi-account-plus")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v(" PENDAFTAR ")])],1)],1):t._e(),t.CAN_ACCESS("SPMB-PMB-FORMULIR-PENDAFTARAN_BROWSE")?a("v-list-item",{attrs:{link:"",to:"/spmb/formulirpendaftaran"}},[a("v-list-item-icon",{staticClass:"mr-2"},[a("v-icon",[t._v("mdi-file-document-edit-outline")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v(" BIODATA ")])],1)],1):t._e(),t.CAN_ACCESS("SPMB-PMB-PERSYARATAN_BROWSE")?a("v-list-item",{attrs:{link:"",to:"/spmb/persyaratan"}},[a("v-list-item-icon",{staticClass:"mr-2"},[a("v-icon",[t._v("mdi-file-document-edit-outline")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v(" PERSYARATAN ")])],1)],1):t._e(),t.CAN_ACCESS("SPMB-PMB-JADWAL-UJIAN_BROWSE")&&"mahasiswabaru"!=t.dashboard&&"mahasiswa"!=t.dashboard?a("v-subheader",[t._v("UJIAN PMB")]):t._e(),t.CAN_ACCESS("SPMB-PMB-JADWAL-UJIAN_BROWSE")&&"mahasiswabaru"!=t.dashboard&&"mahasiswa"!=t.dashboard?a("v-list-item",{attrs:{link:"",to:"/spmb/jadwalujianpmb"}},[a("v-list-item-icon",{staticClass:"mr-2"},[a("v-icon",[t._v("mdi-calendar-account")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v(" JADWAL UJIAN ")])],1)],1):t._e(),t.CAN_ACCESS("SPMB-PMB-NILAI-UJIAN_BROWSE")&&"mahasiswabaru"!=t.dashboard&&"mahasiswa"!=t.dashboard?a("v-list-item",{attrs:{link:"",to:"/spmb/nilaiujian"}},[a("v-list-item-icon",{staticClass:"mr-2"},[a("v-icon",[t._v("mdi-calendar-account")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v(" NILAI UJIAN ")])],1)],1):t._e(),t.CAN_ACCESS("SPMB-GROUP")&&"mahasiswabaru"!=t.dashboard&&"mahasiswa"!=t.dashboard?a("v-subheader",[t._v("LAPORAN")]):t._e(),t.CAN_ACCESS("SPMB-PMB-LAPORAN-FAKULTAS_BROWSE")&&t.isBentukPT("universitas")?a("v-list-item",{attrs:{link:"",to:"/spmb/laporanfakultas"}},[a("v-list-item-icon",{staticClass:"mr-2"},[a("v-icon",[t._v("mdi-file-document-edit-outline")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v(" LAPORAN FAKULTAS ")])],1)],1):t._e(),t.CAN_ACCESS("SPMB-PMB-LAPORAN-PRODI_BROWSE")?a("v-list-item",{attrs:{link:"",to:"/spmb/laporanprodi"}},[a("v-list-item-icon",{staticClass:"mr-2"},[a("v-icon",[t._v("mdi-file-document-edit-outline")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v(" LAPORAN PRODI ")])],1)],1):t._e(),t.CAN_ACCESS("SPMB-PMB-LAPORAN-KELULUSAN_BROWSE")?a("v-list-item",{attrs:{link:"",to:"/spmb/laporankelulusan"}},[a("v-list-item-icon",{staticClass:"mr-2"},[a("v-icon",[t._v("mdi-file-document-edit-outline")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v(" LAPORAN KELULUSAN ")])],1)],1):t._e()],1)],1),t.showrightsidebar?a("v-navigation-drawer",{attrs:{width:"300",app:"",fixed:"",right:"",temporary:""},model:{value:t.drawerRight,callback:function(i){t.drawerRight=i},expression:"drawerRight"}},[a("v-list",{attrs:{dense:""}},[a("v-list-item",[a("v-list-item-icon",{staticClass:"mr-2"},[a("v-icon",[t._v("mdi-menu-open")])],1),a("v-list-item-content",[a("v-list-item-title",{staticClass:"title"},[t._v(" OPTIONS ")])],1)],1),a("v-divider"),a("v-list-item",{staticClass:"teal lighten-5 mb-5"},[a("v-list-item-icon",{staticClass:"mr-2"},[a("v-icon",[t._v("mdi-filter")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("FILTER")])],1)],1),t._t("filtersidebar")],2)],1):t._e(),a("v-main",{staticClass:"mx-4 mb-4"},[t._t("default")],2),a("v-footer",{attrs:{app:"",padless:"",fixed:"",dark:""}},[a("v-card",{staticClass:"flex",attrs:{flat:"",tile:""}},[a("v-divider"),a("v-card-text",{staticClass:"py-2 white--text text-center"},[a("strong",[t._v("SIMAK (2021-2022)")]),t._v(" dikembangkan oleh TIM IT STMIK Bandung Bali "),a("v-btn",{attrs:{dark:"",icon:"",href:"https://github.com/stmikbdgbali/simak"}},[a("v-icon",[t._v("mdi-github")])],1)],1)],1)],1)],1)},s=[],r=(a("ac1f"),a("5319"),a("5530")),n=a("2f62"),o={name:"SPMBLayout",created:function(){this.dashboard=this.$store.getters["uiadmin/getDefaultDashboard"]},props:{showrightsidebar:{type:Boolean,default:!0},temporaryleftsidebar:{type:Boolean,default:!1}},data:function(){return{loginTime:0,drawer:null,drawerRight:null,dashboard:null}},methods:{logout:function(){var t=this;this.loginTime=0,this.$ajax.post("/auth/logout",{},{headers:{Authorization:this.TOKEN}}).then((function(){t.$store.dispatch("auth/logout"),t.$store.dispatch("uifront/reinit"),t.$store.dispatch("uiadmin/reinit"),t.$router.push("/")})).catch((function(){t.$store.dispatch("auth/logout"),t.$store.dispatch("uifront/reinit"),t.$store.dispatch("uiadmin/reinit"),t.$router.push("/")}))},isBentukPT:function(t){return this.$store.getters["uifront/getBentukPT"]==t}},computed:Object(r["a"])(Object(r["a"])({},Object(n["b"])("auth",{AUTHENTICATED:"Authenticated",ACCESS_TOKEN:"AccessToken",TOKEN:"Token",DEFAULT_ROLE:"DefaultRole",ROLE:"Role",CAN_ACCESS:"can",ATTRIBUTE_USER:"AttributeUser"})),{},{APP_NAME:function(){return"SIMAK v1"},photoUser:function(){var t,i=this.ATTRIBUTE_USER("foto");return t=""==i?this.$api.url+"/storage/images/users/no_photo.png":this.$api.url+"/"+i,t}}),watch:{loginTime:{handler:function(t){var i=this;t>=0?setTimeout((function(){i.loginTime=1==i.AUTHENTICATED?i.loginTime+1:-1}),1e3):(this.$store.dispatch("auth/logout"),this.$router.replace("/login"))},immediate:!0}}},l=o,c=a("2877"),d=a("6544"),u=a.n(d),v=a("40dc"),m=a("5bc1"),h=a("8212"),p=a("8336"),b=a("b0af"),_=a("99d9"),f=a("ce7e"),A=a("553a"),g=a("132d"),S=a("adda"),C=a("8860"),P=a("da13"),B=a("8270"),T=a("5d23"),N=a("34c3"),R=a("f6c4"),k=a("e449"),E=a("f774"),w=a("2fa4"),O=a("e0c7"),I=a("afd9"),L=a("2a7f"),y=Object(c["a"])(l,e,s,!1,null,null,null);i["a"]=y.exports;u()(y,{VAppBar:v["a"],VAppBarNavIcon:m["a"],VAvatar:h["a"],VBtn:p["a"],VCard:b["a"],VCardText:_["c"],VDivider:f["a"],VFooter:A["a"],VIcon:g["a"],VImg:S["a"],VList:C["a"],VListItem:P["a"],VListItemAvatar:B["a"],VListItemContent:T["a"],VListItemIcon:N["a"],VListItemSubtitle:T["b"],VListItemTitle:T["c"],VMain:R["a"],VMenu:k["a"],VNavigationDrawer:E["a"],VSpacer:w["a"],VSubheader:O["a"],VSystemBar:I["a"],VToolbarTitle:L["b"]})},b5b6:function(t,i,a){},e0c7:function(t,i,a){"use strict";var e=a("5530"),s=(a("0bc6"),a("7560")),r=a("58df");i["a"]=Object(r["a"])(s["a"]).extend({name:"v-subheader",props:{inset:Boolean},render:function(t){return t("div",{staticClass:"v-subheader",class:Object(e["a"])({"v-subheader--inset":this.inset},this.themeClasses),attrs:this.$attrs,on:this.$listeners},this.$slots.default)}})}}]);