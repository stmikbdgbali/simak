(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7ff46c63"],{"2bc5":function(t,e,i){"use strict";var a=i("5530"),s=(i("a15b"),i("abd3"),i("ade3")),r=i("1c87"),n=i("58df"),o=Object(n["a"])(r["a"]).extend({name:"v-breadcrumbs-item",props:{activeClass:{type:String,default:"v-breadcrumbs__item--disabled"},ripple:{type:[Boolean,Object],default:!1}},computed:{classes:function(){return Object(s["a"])({"v-breadcrumbs__item":!0},this.activeClass,this.disabled)}},render:function(t){var e=this.generateRouteLink(),i=e.tag,s=e.data;return t("li",[t(i,Object(a["a"])(Object(a["a"])({},s),{},{attrs:Object(a["a"])(Object(a["a"])({},s.attrs),{},{"aria-current":this.isActive&&this.isLink?"page":void 0})}),this.$slots.default)])}}),l=i("80d2"),c=Object(l["i"])("v-breadcrumbs__divider","li"),d=i("7560");e["a"]=Object(n["a"])(d["a"]).extend({name:"v-breadcrumbs",props:{divider:{type:String,default:"/"},items:{type:Array,default:function(){return[]}},large:Boolean},computed:{classes:function(){return Object(a["a"])({"v-breadcrumbs--large":this.large},this.themeClasses)}},methods:{genDivider:function(){return this.$createElement(c,this.$slots.divider?this.$slots.divider:this.divider)},genItems:function(){for(var t=[],e=!!this.$scopedSlots.item,i=[],a=0;a<this.items.length;a++){var s=this.items[a];i.push(s.text),e?t.push(this.$scopedSlots.item({item:s})):t.push(this.$createElement(o,{key:i.join("."),props:s},[s.text])),a<this.items.length-1&&t.push(this.genDivider())}return t}},render:function(t){var e=this.$slots.default||this.genItems();return t("ul",{staticClass:"v-breadcrumbs",class:this.classes},e)}})},"553a":function(t,e,i){"use strict";var a=i("5530"),s=(i("a9e3"),i("c7cd"),i("b5b6"),i("8dd9")),r=i("3a66"),n=i("d10f"),o=i("58df"),l=i("80d2");e["a"]=Object(o["a"])(s["a"],Object(r["a"])("footer",["height","inset"]),n["a"]).extend({name:"v-footer",props:{height:{default:"auto",type:[Number,String]},inset:Boolean,padless:Boolean,tag:{type:String,default:"footer"}},computed:{applicationProperty:function(){return this.inset?"insetFooter":"footer"},classes:function(){return Object(a["a"])(Object(a["a"])({},s["a"].options.computed.classes.call(this)),{},{"v-footer--absolute":this.absolute,"v-footer--fixed":!this.absolute&&(this.app||this.fixed),"v-footer--padless":this.padless,"v-footer--inset":this.inset})},computedBottom:function(){if(this.isPositioned)return this.app?this.$vuetify.application.bottom:0},computedLeft:function(){if(this.isPositioned)return this.app&&this.inset?this.$vuetify.application.left:0},computedRight:function(){if(this.isPositioned)return this.app&&this.inset?this.$vuetify.application.right:0},isPositioned:function(){return Boolean(this.absolute||this.fixed||this.app)},styles:function(){var t=parseInt(this.height);return Object(a["a"])(Object(a["a"])({},s["a"].options.computed.styles.call(this)),{},{height:isNaN(t)?t:Object(l["g"])(t),left:Object(l["g"])(this.computedLeft),right:Object(l["g"])(this.computedRight),bottom:Object(l["g"])(this.computedBottom)})}},methods:{updateApplication:function(){var t=parseInt(this.height);return isNaN(t)?this.$el?this.$el.clientHeight:0:t}},render:function(t){var e=this.setBackgroundColor(this.color,{staticClass:"v-footer",class:this.classes,style:this.styles});return t(this.tag,e,this.$slots.default)}})},"94df":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("v-system-bar",{class:this.$store.getters["uiadmin/getTheme"]("V-SYSTEM-BAR-CSS-CLASS"),attrs:{app:"",dark:""}},[i("strong",[t._v("Hak Akses Sebagai :")]),t._v(" "+t._s(t.ROLE)+" ")]),i("v-app-bar",{attrs:{app:""}},[i("v-app-bar-nav-icon",{staticClass:"grey--text",on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),i("v-toolbar-title",{staticClass:"headline clickable",on:{click:function(e){e.stopPropagation(),t.$router.push("/dashboard/"+t.$store.getters["auth/AccessToken"]).catch((function(t){}))}}},[i("span",{staticClass:"hidden-sm-and-down"},[t._v(t._s(t.APP_NAME))])]),i("v-spacer"),i("v-menu",{attrs:{"close-on-content-click":!0,origin:"center center",transition:"scale-transition","offset-y":!0,bottom:"",left:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[i("v-avatar",{attrs:{size:"30"}},[i("v-img",t._g({attrs:{src:t.photoUser}},a))],1)]}}])},[i("v-list",[i("v-list-item",[i("v-list-item-avatar",[i("v-img",{attrs:{src:t.photoUser}})],1),i("v-list-item-content",[i("v-list-item-title",{staticClass:"title"},[t._v(" "+t._s(t.ATTRIBUTE_USER("username"))+" ")]),i("v-list-item-subtitle",[t._v(" ["+t._s(t.DEFAULT_ROLE)+"] ")])],1)],1),i("v-divider"),i("v-list-item",{attrs:{to:"/system-users/profil"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-account")])],1),i("v-list-item-title",[t._v("Profil")])],1),i("v-divider"),i("v-list-item",{on:{click:function(e){return e.preventDefault(),t.logout(e)}}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-power")])],1),i("v-list-item-title",[t._v("Logout")])],1)],1)],1),i("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),i("v-app-bar-nav-icon",{on:{click:function(e){e.stopPropagation(),t.drawerRight=!t.drawerRight}}},[i("v-icon",[t._v("mdi-menu-open")])],1)],1),i("v-navigation-drawer",{staticClass:"green darken-1",attrs:{width:"300",dark:"",temporary:t.temporaryleftsidebar,app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[i("v-list-item",[i("v-list-item-avatar",[i("v-img",{attrs:{src:t.photoUser},on:{click:function(e){return e.stopPropagation(),t.toProfile(e)}}})],1),i("v-list-item-content",[i("v-list-item-title",{staticClass:"title"},[t._v(" "+t._s(t.ATTRIBUTE_USER("username"))+" ")]),i("v-list-item-subtitle",[t._v(" ["+t._s(t.DEFAULT_ROLE)+"] ")])],1)],1),i("v-divider"),i("v-list",{attrs:{expand:""}},[t.CAN_ACCESS("DMASTER-GROUP")?i("v-list-item",{staticClass:"yellow",attrs:{to:{path:"/dmaster"},link:"",color:"green"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-home-floor-b")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v("BOARD DATA MASTER")])],1)],1):t._e(),i("v-subheader",[t._v("FASILITAS")]),i("v-list-item",{attrs:{link:"",to:"/dmaster/ruangkelas"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-seat-legroom-extra")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" RUANG KELAS ")])],1)],1),i("v-subheader",[t._v("PMB")]),t.CAN_ACCESS("DMASTER-PERSYARATAN-PMB_BROWSE")?i("v-list-item",{attrs:{link:"",to:"/dmaster/persyaratanpmb"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-format-list-checks")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" PERSYARATAN PMB ")])],1)],1):t._e(),i("v-subheader",[t._v("MAHASISWA")]),i("v-list-item",{attrs:{link:"",to:"/dmaster/statusmahasiswa"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-arrow-vertical-lock")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" STATUS MAHASISWA ")])],1)],1),t.CAN_ACCESS("DMASTER-KELAS_BROWSE")?i("v-list-item",{attrs:{link:"",to:"/dmaster/kelas"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-google-classroom")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" KELAS ")])],1)],1):t._e(),i("v-list-item",{attrs:{link:"",to:"/dmaster/jenjangstudi"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-stairs-up")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" JENJANG STUDI ")])],1)],1),t.CAN_ACCESS("DMASTER-FAKULTAS_BROWSE")&&t.isBentukPT("universitas")?i("v-list-item",{attrs:{link:"",to:"/dmaster/fakultas"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-home")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" FAKULTAS ")])],1)],1):t._e(),t.CAN_ACCESS("DMASTER-PRODI_BROWSE")?i("v-list-item",{attrs:{link:"",to:"/dmaster/programstudi"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-home-assistant")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" PROGRAM STUDI ")])],1)],1):t._e(),i("v-subheader",[t._v("DOSEN")]),i("v-list-item",{attrs:{link:"",to:"/dmaster/jabatanakademik"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-chair-rolling")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" JABATAN AKADEMIK ")])],1)],1),i("v-subheader",[t._v("AKADEMIK")]),t.CAN_ACCESS("DMASTER-TA_BROWSE")?i("v-list-item",{attrs:{link:"",to:"/dmaster/ta"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-calendar-outline")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" TAHUN AKADEMIK ")])],1)],1):t._e()],1)],1),t.showrightsidebar?i("v-navigation-drawer",{attrs:{width:"300",app:"",fixed:"",right:"",temporary:""},model:{value:t.drawerRight,callback:function(e){t.drawerRight=e},expression:"drawerRight"}},[i("v-list",{attrs:{dense:""}},[i("v-list-item",[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-menu-open")])],1),i("v-list-item-content",[i("v-list-item-title",{staticClass:"title"},[t._v(" OPTIONS ")])],1)],1),i("v-divider"),i("v-list-item",{staticClass:"teal lighten-5 mb-5"},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-filter")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v("FILTER")])],1)],1),t._t("filtersidebar")],2)],1):t._e(),i("v-main",{staticClass:"mx-4 mb-4"},[t._t("default")],2),i("v-footer",{attrs:{app:"",padless:"",fixed:"",dark:""}},[i("v-card",{staticClass:"flex",attrs:{flat:"",tile:""}},[i("v-divider"),i("v-card-text",{staticClass:"py-2 white--text text-center"},[i("strong",[t._v("SIMAK (2021-2022)")]),t._v(" dikembangkan oleh TIM IT STMIK Bandung Bali "),i("v-btn",{attrs:{dark:"",icon:"",href:"https://github.com/stmikbdgbali/simak"}},[i("v-icon",[t._v("mdi-github")])],1)],1)],1)],1)],1)},s=[],r=i("5530"),n=(i("5319"),i("ac1f"),i("2f62")),o={name:"DataMasterLayout",props:{showrightsidebar:{type:Boolean,default:!0},temporaryleftsidebar:{type:Boolean,default:!1}},data:function(){return{loginTime:0,drawer:null,drawerRight:null}},methods:{logout:function(){var t=this;this.loginTime=0,this.$ajax.post("/auth/logout",{},{headers:{Authorization:this.TOKEN}}).then((function(){t.$store.dispatch("auth/logout"),t.$store.dispatch("uifront/reinit"),t.$store.dispatch("uiadmin/reinit"),t.$router.push("/")})).catch((function(){t.$store.dispatch("auth/logout"),t.$store.dispatch("uifront/reinit"),t.$store.dispatch("uiadmin/reinit"),t.$router.push("/")}))},isBentukPT:function(t){return this.$store.getters["uifront/getBentukPT"]==t}},computed:Object(r["a"])(Object(r["a"])({},Object(n["b"])("auth",{AUTHENTICATED:"Authenticated",ACCESS_TOKEN:"AccessToken",TOKEN:"Token",DEFAULT_ROLE:"DefaultRole",ROLE:"Role",CAN_ACCESS:"can",ATTRIBUTE_USER:"AttributeUser"})),{},{APP_NAME:function(){return"SIMAK v1"},photoUser:function(){var t,e=this.ATTRIBUTE_USER("foto");return t=""==e?this.$api.url+"/storage/images/users/no_photo.png":this.$api.url+"/"+e,t}}),watch:{loginTime:{handler:function(t){var e=this;t>=0?setTimeout((function(){e.loginTime=1==e.AUTHENTICATED?e.loginTime+1:-1}),1e3):(this.$store.dispatch("auth/logout"),this.$router.replace("/login"))},immediate:!0}}},l=o,c=i("2877"),d=i("6544"),u=i.n(d),v=i("40dc"),m=i("5bc1"),h=i("8212"),p=i("8336"),f=i("b0af"),b=i("99d9"),g=i("ce7e"),_=i("553a"),A=i("132d"),S=i("adda"),T=i("8860"),C=i("da13"),k=i("8270"),E=i("5d23"),x=i("34c3"),R=i("f6c4"),y=i("e449"),w=i("f774"),O=i("2fa4"),j=i("e0c7"),I=i("afd9"),D=i("2a7f"),$=Object(c["a"])(l,a,s,!1,null,null,null);e["a"]=$.exports;u()($,{VAppBar:v["a"],VAppBarNavIcon:m["a"],VAvatar:h["a"],VBtn:p["a"],VCard:f["a"],VCardText:b["c"],VDivider:g["a"],VFooter:_["a"],VIcon:A["a"],VImg:S["a"],VList:T["a"],VListItem:C["a"],VListItemAvatar:k["a"],VListItemContent:E["a"],VListItemIcon:x["a"],VListItemSubtitle:E["b"],VListItemTitle:E["c"],VMain:R["a"],VMenu:y["a"],VNavigationDrawer:w["a"],VSpacer:O["a"],VSubheader:j["a"],VSystemBar:I["a"],VToolbarTitle:D["b"]})},a05d:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("DataMasterLayout",[i("ModuleHeader",{scopedSlots:t._u([{key:"icon",fn:function(){return[t._v(" mdi-stairs-up ")]},proxy:!0},{key:"name",fn:function(){return[t._v(" JENJANG STUDI ")]},proxy:!0},{key:"subtitle",fn:function(){},proxy:!0},{key:"breadcrumbs",fn:function(){return[i("v-breadcrumbs",{staticClass:"pa-0",attrs:{items:t.breadcrumbs},scopedSlots:t._u([{key:"divider",fn:function(){return[i("v-icon",[t._v("mdi-chevron-right")])]},proxy:!0}])})]},proxy:!0},{key:"desc",fn:function(){return[i("v-alert",{attrs:{color:"cyan",border:"left","colored-border":"",type:"info"}},[t._v(" Halaman ini berisi informasi jenjang studi. ID dan Nama Jenjang melekat ke sistem sehingga tidak bisa diubah. ")])]},proxy:!0}])}),i("v-container",{attrs:{fluid:""}},[i("v-row",{staticClass:"mb-4",attrs:{"no-gutters":""}},[i("v-col",{attrs:{cols:"12"}},[i("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.datatable,"item-key":"kode_jenjang","sort-by":"id","show-expand":"","disable-pagination":!0,"hide-default-footer":!0,expanded:t.expanded,"single-expand":!0,loading:t.datatableLoading,"loading-text":"Loading... Please wait"},on:{"update:expanded":function(e){t.expanded=e},"click:row":t.dataTableRowClicked},scopedSlots:t._u([{key:"expanded-item",fn:function(e){var a=e.headers,s=e.item;return[i("td",{staticClass:"text-center",attrs:{colspan:a.length}},[i("v-col",{attrs:{cols:"12"}},[i("strong",[t._v("created_at:")]),t._v(t._s(t.$date(s.created_at).format("DD/MM/YYYY HH:mm"))+" "),i("strong",[t._v("updated_at:")]),t._v(t._s(t.$date(s.updated_at).format("DD/MM/YYYY HH:mm"))+" ")])],1)]}},{key:"no-data",fn:function(){return[t._v(" Data belum tersedia ")]},proxy:!0}])})],1)],1)],1)],1)},s=[],r=i("1da1"),n=(i("96cf"),i("94df")),o=i("e477"),l={name:"JenjangStudi",created:function(){this.breadcrumbs=[{text:"HOME",disabled:!1,href:"/dashboard/"+this.$store.getters["auth/AccessToken"]},{text:"DATA MASTER",disabled:!1,href:"/dmaster"},{text:"JENJANG STUDI",disabled:!0,href:"#"}],this.initialize()},data:function(){return{breadcrumbs:[],btnLoading:!1,datatableLoading:!1,expanded:[],datatable:[],headers:[{text:"ID",value:"kode_jenjang",width:10,sortable:!1},{text:"NAMA JENJANG",value:"nama_jenjang",sortable:!1}]}},methods:{initialize:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.datatableLoading=!0,t.next=3,this.$ajax.get("/datamaster/jenjangstudi",{headers:{Authorization:this.$store.getters["auth/Token"]}}).then((function(t){var i=t.data;e.datatable=i.jenjang_studi,e.datatableLoading=!1}));case 3:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),dataTableRowClicked:function(t){t===this.expanded[0]?this.expanded=[]:this.expanded=[t]}},components:{DataMasterLayout:n["a"],ModuleHeader:o["a"]}},c=l,d=i("2877"),u=i("6544"),v=i.n(u),m=i("0798"),h=i("2bc5"),p=i("62ad"),f=i("a523"),b=i("8fea"),g=i("132d"),_=i("0fd9"),A=Object(d["a"])(c,a,s,!1,null,null,null);e["default"]=A.exports;v()(A,{VAlert:m["a"],VBreadcrumbs:h["a"],VCol:p["a"],VContainer:f["a"],VDataTable:b["a"],VIcon:g["a"],VRow:_["a"]})},abd3:function(t,e,i){},b5b6:function(t,e,i){},e477:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",{attrs:{fluid:t.isReportPage}},[i("v-row",{attrs:{"no-gutters":""}},[i("v-col",{attrs:{cols:"12",xs:"12",sm:"12",md:"12"}},[t._t("breadcrumbs")],2)],1),i("v-row",{attrs:{"no-gutters":""}},[i("v-col",{attrs:{cols:"12",xs:"12",sm:"12",md:"12"}},[i("h1",{staticClass:"subheading grey--text"},[i("v-icon",{attrs:{large:""}},[t._t("icon")],2),t._t("name")],2)]),i("v-col",{attrs:{cols:"12",xs:"12",sm:"12",md:"12"}},[i("span",{staticClass:"ml-10 subtitle-1 green--text font-weight-bold"},[t._t("subtitle")],2)])],1),i("v-row",{attrs:{"no-gutters":""}},[i("v-col",{attrs:{cols:"12",xs:"12",sm:"12",md:"12"}},[t._t("desc")],2)],1)],1)},s=[],r={name:"ModuleHeader",computed:{isReportPage:function(){return!0}}},n=r,o=i("2877"),l=i("6544"),c=i.n(l),d=i("62ad"),u=i("a523"),v=i("132d"),m=i("0fd9"),h=Object(o["a"])(n,a,s,!1,null,null,null);e["a"]=h.exports;c()(h,{VCol:d["a"],VContainer:u["a"],VIcon:v["a"],VRow:m["a"]})}}]);