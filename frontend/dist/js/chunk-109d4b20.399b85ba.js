(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-109d4b20"],{"553a":function(t,a,i){"use strict";i("a9e3"),i("c7cd");var e=i("5530"),s=(i("b5b6"),i("8dd9")),r=i("3a66"),n=i("d10f"),o=i("58df"),l=i("80d2");a["a"]=Object(o["a"])(s["a"],Object(r["a"])("footer",["height","inset"]),n["a"]).extend({name:"v-footer",props:{height:{default:"auto",type:[Number,String]},inset:Boolean,padless:Boolean,tag:{type:String,default:"footer"}},computed:{applicationProperty:function(){return this.inset?"insetFooter":"footer"},classes:function(){return Object(e["a"])(Object(e["a"])({},s["a"].options.computed.classes.call(this)),{},{"v-footer--absolute":this.absolute,"v-footer--fixed":!this.absolute&&(this.app||this.fixed),"v-footer--padless":this.padless,"v-footer--inset":this.inset})},computedBottom:function(){if(this.isPositioned)return this.app?this.$vuetify.application.bottom:0},computedLeft:function(){if(this.isPositioned)return this.app&&this.inset?this.$vuetify.application.left:0},computedRight:function(){if(this.isPositioned)return this.app&&this.inset?this.$vuetify.application.right:0},isPositioned:function(){return Boolean(this.absolute||this.fixed||this.app)},styles:function(){var t=parseInt(this.height);return Object(e["a"])(Object(e["a"])({},s["a"].options.computed.styles.call(this)),{},{height:isNaN(t)?t:Object(l["g"])(t),left:Object(l["g"])(this.computedLeft),right:Object(l["g"])(this.computedRight),bottom:Object(l["g"])(this.computedBottom)})}},methods:{updateApplication:function(){var t=parseInt(this.height);return isNaN(t)?this.$el?this.$el.clientHeight:0:t}},render:function(t){var a=this.setBackgroundColor(this.color,{staticClass:"v-footer",class:this.classes,style:this.styles});return t(this.tag,a,this.$slots.default)}})},"684f":function(t,a,i){"use strict";var e=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",[i("v-system-bar",{class:this.$store.getters["uiadmin/getTheme"]("V-SYSTEM-BAR-CSS-CLASS"),attrs:{app:"",dark:""}},[i("strong",[t._v("Hak Akses Sebagai :")]),t._v(" "+t._s(t.ROLE)+" ")]),i("v-app-bar",{attrs:{app:""}},[i("v-app-bar-nav-icon",{staticClass:"grey--text",on:{click:function(a){a.stopPropagation(),t.drawer=!t.drawer}}}),i("v-toolbar-title",{staticClass:"headline clickable",on:{click:function(a){a.stopPropagation(),t.$router.push("/dashboard/"+t.$store.getters["auth/AccessToken"]).catch((function(t){}))}}},[i("span",{staticClass:"hidden-sm-and-down"},[t._v(t._s(t.APP_NAME))])]),i("v-spacer"),i("v-menu",{attrs:{"close-on-content-click":!0,origin:"center center",transition:"scale-transition","offset-y":!0,bottom:"",left:""},scopedSlots:t._u([{key:"activator",fn:function(a){var e=a.on;return[i("v-avatar",{attrs:{size:"30"}},[i("v-img",t._g({attrs:{src:t.photoUser}},e))],1)]}}])},[i("v-list",[i("v-list-item",[i("v-list-item-avatar",[i("v-img",{attrs:{src:t.photoUser}})],1),i("v-list-item-content",[i("v-list-item-title",{staticClass:"title"},[t._v(" "+t._s(t.ATTRIBUTE_USER("username"))+" ")]),i("v-list-item-subtitle",[t._v(" ["+t._s(t.DEFAULT_ROLE)+"] ")])],1)],1),i("v-divider"),i("v-list-item",{attrs:{to:"/system-users/profil"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-account")])],1),i("v-list-item-title",[t._v("Profil")])],1),i("v-divider"),i("v-list-item",{on:{click:function(a){return a.preventDefault(),t.logout(a)}}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-power")])],1),i("v-list-item-title",[t._v("Logout")])],1)],1)],1),i("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),i("v-app-bar-nav-icon",{on:{click:function(a){a.stopPropagation(),t.drawerRight=!t.drawerRight}}},[i("v-icon",[t._v("mdi-menu-open")])],1)],1),i("v-navigation-drawer",{staticClass:"green darken-1",attrs:{width:"300",dark:"",temporary:t.temporaryleftsidebar,app:""},model:{value:t.drawer,callback:function(a){t.drawer=a},expression:"drawer"}},[i("v-list-item",[i("v-list-item-avatar",[i("v-img",{attrs:{src:t.photoUser},on:{click:function(a){return a.stopPropagation(),t.toProfile(a)}}})],1),i("v-list-item-content",[i("v-list-item-title",{staticClass:"title"},[t._v(" "+t._s(t.ATTRIBUTE_USER("username"))+" ")]),i("v-list-item-subtitle",[t._v(" ["+t._s(t.DEFAULT_ROLE)+"] ")])],1)],1),i("v-divider"),i("v-list",{attrs:{expand:""}},[t.CAN_ACCESS("SPMB-GROUP")&&"mahasiswabaru"!=t.dashboard&&"mahasiswa"!=t.dashboard?i("v-list-item",{staticClass:"yellow",attrs:{to:{path:"/spmb"},link:"",color:"green"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-monitor-dashboard")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v("BOARD SPMB")])],1)],1):t._e(),t.CAN_ACCESS("SPMB-PMB-SOAL_BROWSE")?i("v-list-item",{attrs:{link:"",to:"/spmb/soalpmb"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-head-question-outline")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" SOAL PMB ")])],1)],1):t._e(),i("v-subheader",[t._v("DATA MHS. BARU")]),t.CAN_ACCESS("SPMB-PMB_BROWSE")?i("v-list-item",{attrs:{link:"",to:"/spmb/pendaftaranbaru"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-account-plus")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" PENDAFTAR ")])],1)],1):t._e(),t.CAN_ACCESS("SPMB-PMB-FORMULIR-PENDAFTARAN_BROWSE")?i("v-list-item",{attrs:{link:"",to:"/spmb/formulirpendaftaran"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-file-document-edit-outline")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" BIODATA ")])],1)],1):t._e(),t.CAN_ACCESS("SPMB-PMB-PERSYARATAN_BROWSE")?i("v-list-item",{attrs:{link:"",to:"/spmb/persyaratan"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-file-document-edit-outline")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" PERSYARATAN ")])],1)],1):t._e(),i("v-subheader",[t._v("UJIAN PMB")]),t.CAN_ACCESS("SPMB-PMB-JADWAL-UJIAN_BROWSE")&&"mahasiswabaru"!=t.dashboard&&"mahasiswa"!=t.dashboard?i("v-list-item",{attrs:{link:"",to:"/spmb/jadwalujianpmb"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-calendar-account")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" JADWAL UJIAN ")])],1)],1):t._e(),t.CAN_ACCESS("SPMB-PMB-NILAI-UJIAN_BROWSE")&&"mahasiswabaru"!=t.dashboard&&"mahasiswa"!=t.dashboard?i("v-list-item",{attrs:{link:"",to:"/spmb/nilaiujian"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-calendar-account")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" NILAI UJIAN ")])],1)],1):t._e(),t.CAN_ACCESS("SPMB-GROUP")&&"mahasiswabaru"!=t.dashboard&&"mahasiswa"!=t.dashboard?i("v-subheader",[t._v("LAPORAN")]):t._e(),t.CAN_ACCESS("SPMB-PMB-LAPORAN-FAKULTAS_BROWSE")&&t.isBentukPT("universitas")?i("v-list-item",{attrs:{link:"",to:"/spmb/laporanfakultas"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-file-document-edit-outline")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" LAPORAN FAKULTAS ")])],1)],1):t._e(),t.CAN_ACCESS("SPMB-PMB-LAPORAN-PRODI_BROWSE")?i("v-list-item",{attrs:{link:"",to:"/spmb/laporanprodi"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-file-document-edit-outline")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" LAPORAN PRODI ")])],1)],1):t._e(),t.CAN_ACCESS("SPMB-PMB-LAPORAN-KELULUSAN_BROWSE")?i("v-list-item",{attrs:{link:"",to:"/spmb/laporankelulusan"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-file-document-edit-outline")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" LAPORAN KELULUSAN ")])],1)],1):t._e()],1)],1),t.showrightsidebar?i("v-navigation-drawer",{attrs:{width:"300",app:"",fixed:"",right:"",temporary:""},model:{value:t.drawerRight,callback:function(a){t.drawerRight=a},expression:"drawerRight"}},[i("v-list",{attrs:{dense:""}},[i("v-list-item",[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-menu-open")])],1),i("v-list-item-content",[i("v-list-item-title",{staticClass:"title"},[t._v(" OPTIONS ")])],1)],1),i("v-divider"),i("v-list-item",{staticClass:"teal lighten-5 mb-5"},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-filter")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v("FILTER")])],1)],1),t._t("filtersidebar")],2)],1):t._e(),i("v-main",{staticClass:"mx-4 mb-4"},[t._t("default")],2),i("v-footer",{attrs:{app:"",padless:"",fixed:"",dark:""}},[i("v-card",{staticClass:"flex",attrs:{flat:"",tile:""}},[i("v-divider"),i("v-card-text",{staticClass:"py-2 white--text text-center"},[i("strong",[t._v("SIMAK (2021-2022)")]),t._v(" dikembangkan oleh TIM IT STMIK Bandung Bali "),i("v-btn",{attrs:{dark:"",icon:"",href:"https://github.com/stmikbdgbali/simak"}},[i("v-icon",[t._v("mdi-github")])],1)],1)],1)],1)],1)},s=[],r=(i("ac1f"),i("5319"),i("5530")),n=i("2f62"),o={name:"SPMBLayout",created:function(){this.dashboard=this.$store.getters["uiadmin/getDefaultDashboard"]},props:{showrightsidebar:{type:Boolean,default:!0},temporaryleftsidebar:{type:Boolean,default:!1}},data:function(){return{loginTime:0,drawer:null,drawerRight:null,dashboard:null}},methods:{logout:function(){var t=this;this.loginTime=0,this.$ajax.post("/auth/logout",{},{headers:{Authorization:this.TOKEN}}).then((function(){t.$store.dispatch("auth/logout"),t.$store.dispatch("uifront/reinit"),t.$store.dispatch("uiadmin/reinit"),t.$router.push("/")})).catch((function(){t.$store.dispatch("auth/logout"),t.$store.dispatch("uifront/reinit"),t.$store.dispatch("uiadmin/reinit"),t.$router.push("/")}))},isBentukPT:function(t){return this.$store.getters["uifront/getBentukPT"]==t}},computed:Object(r["a"])(Object(r["a"])({},Object(n["b"])("auth",{AUTHENTICATED:"Authenticated",ACCESS_TOKEN:"AccessToken",TOKEN:"Token",DEFAULT_ROLE:"DefaultRole",ROLE:"Role",CAN_ACCESS:"can",ATTRIBUTE_USER:"AttributeUser"})),{},{APP_NAME:function(){return"SIMAK v1"},photoUser:function(){var t,a=this.ATTRIBUTE_USER("foto");return t=""==a?this.$api.url+"/storage/images/users/no_photo.png":this.$api.url+"/"+a,t}}),watch:{loginTime:{handler:function(t){var a=this;t>=0?setTimeout((function(){a.loginTime=1==a.AUTHENTICATED?a.loginTime+1:-1}),1e3):(this.$store.dispatch("auth/logout"),this.$router.replace("/login"))},immediate:!0}}},l=o,d=i("2877"),u=i("6544"),c=i.n(u),v=i("40dc"),m=i("5bc1"),h=i("8212"),f=i("8336"),p=i("b0af"),_=i("99d9"),b=i("ce7e"),g=i("553a"),A=i("132d"),k=i("adda"),C=i("8860"),S=i("da13"),y=i("8270"),T=i("5d23"),x=i("34c3"),w=i("f6c4"),P=i("e449"),L=i("f774"),O=i("2fa4"),B=i("e0c7"),R=i("afd9"),E=i("2a7f"),M=Object(d["a"])(l,e,s,!1,null,null,null);a["a"]=M.exports;c()(M,{VAppBar:v["a"],VAppBarNavIcon:m["a"],VAvatar:h["a"],VBtn:f["a"],VCard:p["a"],VCardText:_["c"],VDivider:b["a"],VFooter:g["a"],VIcon:A["a"],VImg:k["a"],VList:C["a"],VListItem:S["a"],VListItemAvatar:y["a"],VListItemContent:T["a"],VListItemIcon:x["a"],VListItemSubtitle:T["b"],VListItemTitle:T["c"],VMain:w["a"],VMenu:P["a"],VNavigationDrawer:L["a"],VSpacer:O["a"],VSubheader:B["a"],VSystemBar:R["a"],VToolbarTitle:E["b"]})},"6ba9":function(t,a,i){"use strict";var e=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("v-list-item",[i("v-list-item-content",[i("v-select",{attrs:{items:t.daftar_ta,label:"TAHUN PENDAFTARAN",outlined:""},model:{value:t.tahun_pendaftaran,callback:function(a){t.tahun_pendaftaran=a},expression:"tahun_pendaftaran"}})],1)],1)},s=[],r={name:"FilterMode9",created:function(){this.daftar_ta=this.$store.getters["uiadmin/getDaftarTA"],this.tahun_pendaftaran=this.$store.getters["uiadmin/getTahunPendaftaran"]},data:function(){return{firstloading:!0,daftar_ta:[],tahun_pendaftaran:null}},methods:{setFirstTimeLoading:function(t){this.firstloading=t}},watch:{tahun_pendaftaran:function(t){this.firstloading||(this.$store.dispatch("uiadmin/updateTahunPendaftaran",t),this.$emit("changeTahunPendaftaran",t))}}},n=r,o=i("2877"),l=i("6544"),d=i.n(l),u=i("da13"),c=i("5d23"),v=i("b974"),m=Object(o["a"])(n,e,s,!1,null,null,null);a["a"]=m.exports;d()(m,{VListItem:u["a"],VListItemContent:c["a"],VSelect:v["a"]})},b5b6:function(t,a,i){},bd1a:function(t,a,i){"use strict";i.r(a);var e=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("SPMBLayout",{scopedSlots:t._u([{key:"filtersidebar",fn:function(){return[i("Filter9",{ref:"filter9",on:{changeTahunPendaftaran:t.changeTahunPendaftaran}})]},proxy:!0}])},[i("ModuleHeader",{scopedSlots:t._u([{key:"icon",fn:function(){return[t._v(" mdi-monitor-dashboard ")]},proxy:!0},{key:"name",fn:function(){return[t._v(" SPMB ")]},proxy:!0},{key:"subtitle",fn:function(){return[t._v(" TAHUN PENDAFTARAN "+t._s(t.tahun_pendaftaran)+" ")]},proxy:!0},{key:"breadcrumbs",fn:function(){return[i("v-breadcrumbs",{staticClass:"pa-0",attrs:{items:t.breadcrumbs},scopedSlots:t._u([{key:"divider",fn:function(){return[i("v-icon",[t._v("mdi-chevron-right")])]},proxy:!0}])})]},proxy:!0},{key:"desc",fn:function(){return[i("v-alert",{attrs:{color:"cyan",border:"left","colored-border":"",type:"info"}},[t._v(" dashboard untuk memperoleh ringkasan informasi seleksi penerimaan mahasiswa baru (SPMB). ")])]},proxy:!0}])}),i("v-container",{attrs:{fluid:""}},[i("v-row",{attrs:{dense:""}},[i("v-col",{attrs:{xs:"12",sm:"6",md:"3"}},[i("v-card",{staticClass:"clickable green darken-1",attrs:{color:"#385F73",dark:""},nativeOn:{click:function(a){return t.$router.push("/spmb/pendaftaranbaru")}}},[i("v-card-title",{staticClass:"headline"},[t._v(" JUMLAH REGISTRASI ")]),i("v-card-subtitle",[t._v(" Jumlah calon mahasiswa baru yang melakukan registrasi ")]),i("v-card-text",[t._v(" "+t._s(t.total_registrasi)+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?i("v-responsive",{attrs:{width:"100%"}}):t._e(),i("v-col",{attrs:{xs:"12",sm:"6",md:"3"}},[i("v-card",{staticClass:"clickable green darken-1",attrs:{color:"#385F73",dark:""},nativeOn:{click:function(a){return t.$router.push("/spmb/formulirpendaftaran")}}},[i("v-card-title",{staticClass:"headline"},[t._v(" JUMLAH ISI FORMULIR ")]),i("v-card-subtitle",[t._v(" Jumlah calon mahasiswa baru yang mengisi formulir pendaftaran ")]),i("v-card-text",[t._v(" "+t._s(t.total_isi_formulir)+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?i("v-responsive",{attrs:{width:"100%"}}):t._e(),i("v-col",{attrs:{xs:"12",sm:"6",md:"3"}},[i("v-card",{staticClass:"clickable green darken-1",attrs:{color:"#385F73",dark:""},nativeOn:{click:function(a){return t.$router.push("/spmb/laporankelulusan")}}},[i("v-card-title",{staticClass:"headline"},[t._v(" JUMLAH LULUS ")]),i("v-card-subtitle",[t._v(" Jumlah calon mahasiswa baru yang dinyatakan lulus ")]),i("v-card-text",[t._v(" "+t._s(t.total_lulus)+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?i("v-responsive",{attrs:{width:"100%"}}):t._e(),i("v-col",{attrs:{xs:"12",sm:"6",md:"3"}},[i("v-card",{staticClass:"clickable green darken-1",attrs:{color:"#385F73",dark:""},nativeOn:{click:function(a){return t.$router.push("/spmb/laporankelulusan")}}},[i("v-card-title",{staticClass:"headline"},[t._v(" JUMLAH TIDAK LULUS ")]),i("v-card-subtitle",[t._v(" Jumlah calon mahasiswa baru yang dinyatakan tidak lulus ")]),i("v-card-text",[t._v(" "+t._s(t.total_tidak_lulus)+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?i("v-responsive",{attrs:{width:"100%"}}):t._e()],1),i("v-row",[i("v-col",{attrs:{xs:"12",sm:"12",md:"6"}},[i("v-card",{staticClass:"mb-3"},[i("v-card-title",[t._v(" Registrasi Mahasiswa Baru ")]),i("v-card-subtitle",[t._v(" Jumlah registrasi form pendaftaran calon mahasiswa baru per program studi. ")]),i("v-card-text",[i("v-data-table",{attrs:{loading:t.datatableLoading,"loading-text":"Loading... Please wait",dense:!0,"disable-pagination":!0,"hide-default-footer":!0,headers:t.headers,items:t.daftar_registrasi},scopedSlots:t._u([t.daftar_registrasi.length>0?{key:"body.append",fn:function(){return[i("tr",{staticClass:"grey lighten-4 font-weight-black"},[i("td",{staticClass:"text-right",attrs:{colspan:"2"}},[t._v("TOTAL")]),i("td",{staticClass:"text-right"},[t._v(t._s(t.total_registrasi))])])]},proxy:!0}:null,{key:"no-data",fn:function(){return[t._v(" belum ada data calon mahasiswa baru yang mengisi formulir pendaftaran. ")]},proxy:!0}],null,!0)})],1)],1)],1),t.$vuetify.breakpoint.xsOnly?i("v-responsive",{attrs:{width:"100%"}}):t._e(),i("v-col",{attrs:{xs:"12",sm:"12",md:"6"}},[i("v-card",{staticClass:"mb-3"},[i("v-card-title",[t._v(" Melengkapi Formulir Calon Mahasiswa Baru ")]),i("v-card-subtitle",[t._v(" Jumlah calon mahasiswa baru yang mengisi formulir pendaftaran per program studi. ")]),i("v-card-text",[i("v-data-table",{attrs:{loading:t.datatableLoading,"loading-text":"Loading... Please wait",dense:!0,"disable-pagination":!0,"hide-default-footer":!0,headers:t.headers,items:t.daftar_isi_formulir},scopedSlots:t._u([t.daftar_isi_formulir.length>0?{key:"body.append",fn:function(){return[i("tr",{staticClass:"grey lighten-4 font-weight-black"},[i("td",{staticClass:"text-right",attrs:{colspan:"2"}},[t._v("TOTAL")]),i("td",{staticClass:"text-right"},[t._v(t._s(t.total_isi_formulir))])])]},proxy:!0}:null,{key:"no-data",fn:function(){return[t._v(" belum ada data calon mahasiswa baru yang mengisi formulir. ")]},proxy:!0}],null,!0)})],1)],1)],1),t.$vuetify.breakpoint.xsOnly?i("v-responsive",{attrs:{width:"100%"}}):t._e()],1),i("v-row",[i("v-col",{attrs:{xs:"12",sm:"12",md:"6"}},[i("v-card",{staticClass:"mb-3"},[i("v-card-title",[t._v(" Mahasiswa Lulus ")]),i("v-card-subtitle",[t._v(" Jumlah calon mahasiswa baru yang lulus per program studi. ")]),i("v-card-text",[i("v-data-table",{attrs:{loading:t.datatableLoading,"loading-text":"Loading... Please wait",dense:!0,"disable-pagination":!0,"hide-default-footer":!0,headers:t.headers,items:t.daftar_lulus},scopedSlots:t._u([t.daftar_lulus.length>0?{key:"body.append",fn:function(){return[i("tr",{staticClass:"grey lighten-4 font-weight-black"},[i("td",{staticClass:"text-right",attrs:{colspan:"2"}},[t._v("TOTAL")]),i("td",{staticClass:"text-right"},[t._v(t._s(t.total_lulus))])])]},proxy:!0}:null,{key:"no-data",fn:function(){return[t._v(" belum ada data calon mahasiswa baru yang lulus. ")]},proxy:!0}],null,!0)})],1)],1)],1),t.$vuetify.breakpoint.xsOnly?i("v-responsive",{attrs:{width:"100%"}}):t._e(),i("v-col",{attrs:{xs:"12",sm:"12",md:"6"}},[i("v-card",{staticClass:"mb-3"},[i("v-card-title",[t._v(" Mahasiswa Tidak Lulus ")]),i("v-card-subtitle",[t._v(" Jumlah calon mahasiswa baru yang tidak lulus per program studi. ")]),i("v-card-text",[i("v-data-table",{attrs:{loading:t.datatableLoading,"loading-text":"Loading... Please wait",dense:!0,"disable-pagination":!0,"hide-default-footer":!0,headers:t.headers,items:t.daftar_tidak_lulus},scopedSlots:t._u([t.daftar_lulus.length>0?{key:"body.append",fn:function(){return[i("tr",{staticClass:"grey lighten-4 font-weight-black"},[i("td",{staticClass:"text-right",attrs:{colspan:"2"}},[t._v("TOTAL")]),i("td",{staticClass:"text-right"},[t._v(t._s(t.total_tidak_lulus))])])]},proxy:!0}:null,{key:"no-data",fn:function(){return[t._v(" belum ada data calon mahasiswa baru yang tidak lulus. ")]},proxy:!0}],null,!0)})],1)],1)],1),t.$vuetify.breakpoint.xsOnly?i("v-responsive",{attrs:{width:"100%"}}):t._e()],1)],1)],1)},s=[],r=(i("96cf"),i("1da1")),n=i("684f"),o=i("e477"),l=i("6ba9"),d={name:"SPMB",created:function(){this.breadcrumbs=[{text:"HOME",disabled:!1,href:"/dashboard/"+this.$store.getters["auth/AccessToken"]},{text:"SPMB",disabled:!0,href:"#"}],this.tahun_pendaftaran=this.$store.getters["uiadmin/getTahunPendaftaran"]},mounted:function(){this.initialize()},data:function(){return{datatableLoading:!1,firstloading:!0,breadcrumbs:[],tahun_pendaftaran:0,total_registrasi:0,daftar_registrasi:[],total_isi_formulir:0,daftar_isi_formulir:[],total_lulus:0,daftar_lulus:[],total_tidak_lulus:0,daftar_tidak_lulus:[],headers:[{text:"NAMA PRODI",value:"nama_prodi",sortable:!1},{text:"JENJANG",value:"nama_jenjang",sortable:!1},{text:"JUMLAH",align:"end",value:"jumlah",sortable:!1}]}},methods:{changeTahunPendaftaran:function(t){this.tahun_pendaftaran=t},initialize:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){var a=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.datatableLoading=!0,t.next=3,this.$ajax.post("/dashboard/pmb",{TA:this.tahun_pendaftaran},{headers:{Authorization:this.$store.getters["auth/Token"]}}).then((function(t){var i=t.data;a.daftar_registrasi=i.daftar_registrasi,a.total_registrasi=i.total_registrasi,a.daftar_isi_formulir=i.daftar_isi_formulir,a.total_isi_formulir=i.total_isi_formulir,a.daftar_lulus=i.daftar_lulus,a.total_lulus=i.total_lulus,a.daftar_tidak_lulus=i.daftar_tidak_lulus,a.total_tidak_lulus=i.total_tidak_lulus,a.datatableLoading=!1})).catch((function(){a.datatableLoading=!1}));case 3:this.firstloading=!1,this.$refs.filter9.setFirstTimeLoading(this.firstloading);case 5:case"end":return t.stop()}}),t,this)})));function a(){return t.apply(this,arguments)}return a}()},watch:{tahun_pendaftaran:function(){this.firstloading||this.initialize()}},components:{SPMBLayout:n["a"],ModuleHeader:o["a"],Filter9:l["a"]}},u=d,c=i("2877"),v=i("6544"),m=i.n(v),h=i("0798"),f=i("2bc5"),p=i("b0af"),_=i("99d9"),b=i("62ad"),g=i("a523"),A=i("8fea"),k=i("132d"),C=i("6b53"),S=i("0fd9"),y=Object(c["a"])(u,e,s,!1,null,null,null);a["default"]=y.exports;m()(y,{VAlert:h["a"],VBreadcrumbs:f["a"],VCard:p["a"],VCardSubtitle:_["b"],VCardText:_["c"],VCardTitle:_["d"],VCol:b["a"],VContainer:g["a"],VDataTable:A["a"],VIcon:k["a"],VResponsive:C["a"],VRow:S["a"]})}}]);