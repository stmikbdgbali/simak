(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-32b42719"],{"2bc5":function(t,a,e){"use strict";var i=e("5530"),s=(e("a15b"),e("abd3"),e("ade3")),r=e("1c87"),n=e("58df"),o=Object(n["a"])(r["a"]).extend({name:"v-breadcrumbs-item",props:{activeClass:{type:String,default:"v-breadcrumbs__item--disabled"},ripple:{type:[Boolean,Object],default:!1}},computed:{classes:function(){return Object(s["a"])({"v-breadcrumbs__item":!0},this.activeClass,this.disabled)}},render:function(t){var a=this.generateRouteLink(),e=a.tag,s=a.data;return t("li",[t(e,Object(i["a"])(Object(i["a"])({},s),{},{attrs:Object(i["a"])(Object(i["a"])({},s.attrs),{},{"aria-current":this.isActive&&this.isLink?"page":void 0})}),this.$slots.default)])}}),l=e("80d2"),c=Object(l["i"])("v-breadcrumbs__divider","li"),d=e("7560");a["a"]=Object(n["a"])(d["a"]).extend({name:"v-breadcrumbs",props:{divider:{type:String,default:"/"},items:{type:Array,default:function(){return[]}},large:Boolean},computed:{classes:function(){return Object(i["a"])({"v-breadcrumbs--large":this.large},this.themeClasses)}},methods:{genDivider:function(){return this.$createElement(c,this.$slots.divider?this.$slots.divider:this.divider)},genItems:function(){for(var t=[],a=!!this.$scopedSlots.item,e=[],i=0;i<this.items.length;i++){var s=this.items[i];e.push(s.text),a?t.push(this.$scopedSlots.item({item:s})):t.push(this.$createElement(o,{key:e.join("."),props:s},[s.text])),i<this.items.length-1&&t.push(this.genDivider())}return t}},render:function(t){var a=this.$slots.default||this.genItems();return t("ul",{staticClass:"v-breadcrumbs",class:this.classes},a)}})},"4bd4":function(t,a,e){"use strict";var i=e("5530"),s=(e("caad"),e("2532"),e("07ac"),e("4de4"),e("159b"),e("7db0"),e("58df")),r=e("7e2b"),n=e("3206");a["a"]=Object(s["a"])(r["a"],Object(n["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var a=Object.values(t).includes(!0);this.$emit("input",!a)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var a=this,e=function(t){return t.$watch("hasError",(function(e){a.$set(a.errorBag,t._uid,e)}),{immediate:!0})},i={_uid:t._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?i.shouldValidate=t.$watch("shouldValidate",(function(s){s&&(a.errorBag.hasOwnProperty(t._uid)||(i.valid=e(t)))})):i.valid=e(t),i},validate:function(){return 0===this.inputs.filter((function(t){return!t.validate(!0)})).length},reset:function(){this.inputs.forEach((function(t){return t.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(t){return t.resetValidation()})),this.resetErrorBag()},register:function(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister:function(t){var a=this.inputs.find((function(a){return a._uid===t._uid}));if(a){var e=this.watchers.find((function(t){return t._uid===a._uid}));e&&(e.valid(),e.shouldValidate()),this.watchers=this.watchers.filter((function(t){return t._uid!==a._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==a._uid})),this.$delete(this.errorBag,a._uid)}}},render:function(t){var a=this;return t("form",{staticClass:"v-form",attrs:Object(i["a"])({novalidate:!0},this.attrs$),on:{submit:function(t){return a.$emit("submit",t)}}},this.$slots.default)}})},"553a":function(t,a,e){"use strict";var i=e("5530"),s=(e("a9e3"),e("c7cd"),e("b5b6"),e("8dd9")),r=e("3a66"),n=e("d10f"),o=e("58df"),l=e("80d2");a["a"]=Object(o["a"])(s["a"],Object(r["a"])("footer",["height","inset"]),n["a"]).extend({name:"v-footer",props:{height:{default:"auto",type:[Number,String]},inset:Boolean,padless:Boolean,tag:{type:String,default:"footer"}},computed:{applicationProperty:function(){return this.inset?"insetFooter":"footer"},classes:function(){return Object(i["a"])(Object(i["a"])({},s["a"].options.computed.classes.call(this)),{},{"v-footer--absolute":this.absolute,"v-footer--fixed":!this.absolute&&(this.app||this.fixed),"v-footer--padless":this.padless,"v-footer--inset":this.inset})},computedBottom:function(){if(this.isPositioned)return this.app?this.$vuetify.application.bottom:0},computedLeft:function(){if(this.isPositioned)return this.app&&this.inset?this.$vuetify.application.left:0},computedRight:function(){if(this.isPositioned)return this.app&&this.inset?this.$vuetify.application.right:0},isPositioned:function(){return Boolean(this.absolute||this.fixed||this.app)},styles:function(){var t=parseInt(this.height);return Object(i["a"])(Object(i["a"])({},s["a"].options.computed.styles.call(this)),{},{height:isNaN(t)?t:Object(l["g"])(t),left:Object(l["g"])(this.computedLeft),right:Object(l["g"])(this.computedRight),bottom:Object(l["g"])(this.computedBottom)})}},methods:{updateApplication:function(){var t=parseInt(this.height);return isNaN(t)?this.$el?this.$el.clientHeight:0:t}},render:function(t){var a=this.setBackgroundColor(this.color,{staticClass:"v-footer",class:this.classes,style:this.styles});return t(this.tag,a,this.$slots.default)}})},"598a":function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("KeuanganLayout",{attrs:{showrightsidebar:!1}},[e("ModuleHeader",{scopedSlots:t._u([{key:"icon",fn:function(){return[t._v(" mdi-video-input-component ")]},proxy:!0},{key:"name",fn:function(){return[t._v(" TRANSAKSI SPP ")]},proxy:!0},t.data_transaksi?{key:"subtitle",fn:function(){return[t._v(" TAHUN AKADEMIK / SEMESTER TRANSAKSI: "+t._s(t.data_transaksi.ta)+" - "+t._s(t.$store.getters["uiadmin/getNamaSemester"](t.data_transaksi.idsmt))+" ")]},proxy:!0}:null,{key:"breadcrumbs",fn:function(){return[e("v-breadcrumbs",{staticClass:"pa-0",attrs:{items:t.breadcrumbs},scopedSlots:t._u([{key:"divider",fn:function(){return[e("v-icon",[t._v("mdi-chevron-right")])]},proxy:!0}])})]},proxy:!0},{key:"desc",fn:function(){return[e("v-alert",{attrs:{color:"cyan",border:"left","colored-border":"",type:"info"}},[t._v(" Halaman ini digunakan untuk melakukan transaksi SPP mahasiswa baru dan lama. ")])]},proxy:!0}],null,!0)}),t.data_transaksi?e("v-container",{attrs:{fluid:""}},[e("v-row",[e("v-col",{attrs:{cols:"12"}},[e("v-card",[e("v-card-title",[e("span",{staticClass:"headline"},[t._v("DATA TRANSAKSI "),e("v-chip",{attrs:{color:t.data_transaksi.style,dark:""}},[t._v(t._s(t.data_transaksi.nama_status))])],1),e("v-spacer"),e("v-icon",{on:{click:function(a){return a.stopPropagation(),t.closeDetailTransaksi(a)}}},[t._v(" mdi-close-thick ")])],1),e("v-card-text",[e("v-row",{attrs:{"no-gutters":""}},[e("v-col",{attrs:{xs:"12",sm:"6",md:"6"}},[e("v-card",{attrs:{flat:""}},[e("v-card-title",[t._v("ID TRANSAKSI:")]),e("v-card-subtitle",[t._v(" "+t._s(t.data_transaksi.id)+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?e("v-responsive",{attrs:{width:"100%"}}):t._e(),e("v-col",{attrs:{xs:"12",sm:"6",md:"6"}},[e("v-card",{attrs:{flat:""}},[e("v-card-title",[t._v("KODE BILLING :")]),e("v-card-subtitle",[t._v(" "+t._s(t.data_transaksi.no_transaksi)+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?e("v-responsive",{attrs:{width:"100%"}}):t._e(),e("v-col",{attrs:{xs:"12",sm:"6",md:"6"}},[e("v-card",{attrs:{flat:""}},[e("v-card-title",[t._v("NIM / NO.FORMULIR:")]),e("v-card-subtitle",[t._v(" "+t._s(t.data_transaksi.nim)+" / "+t._s(t.data_transaksi.no_formulir)+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?e("v-responsive",{attrs:{width:"100%"}}):t._e(),e("v-col",{attrs:{xs:"12",sm:"6",md:"6"}},[e("v-card",{attrs:{flat:""}},[e("v-card-title",[t._v("NAMA MAHASISWA:")]),e("v-card-subtitle",[t._v(" "+t._s(t.data_transaksi.nama_mhs)+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?e("v-responsive",{attrs:{width:"100%"}}):t._e(),e("v-col",{attrs:{xs:"12",sm:"6",md:"6"}},[e("v-card",{attrs:{flat:""}},[e("v-card-title",[t._v("PROGRAM STUDI:")]),e("v-card-subtitle",[t._v(" "+t._s(this.$store.getters["uiadmin/getProdiName"](t.data_transaksi.kjur))+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?e("v-responsive",{attrs:{width:"100%"}}):t._e(),e("v-col",{attrs:{xs:"12",sm:"6",md:"6"}},[e("v-card",{attrs:{flat:""}},[e("v-card-title",[t._v("KELAS:")]),e("v-card-subtitle",[t._v(" "+t._s(t.data_transaksi.nkelas)+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?e("v-responsive",{attrs:{width:"100%"}}):t._e(),e("v-col",{attrs:{xs:"12",sm:"6",md:"6"}},[e("v-card",{attrs:{flat:""}},[e("v-card-title",[t._v("TOTAL:")]),e("v-card-subtitle",[t._v(" "+t._s(t._f("formatUang")(t.data_transaksi.total))+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?e("v-responsive",{attrs:{width:"100%"}}):t._e(),e("v-col",{attrs:{xs:"12",sm:"6",md:"6"}},[e("v-card",{attrs:{flat:""}},[e("v-card-title",[t._v("CREATED / UPDATED :")]),e("v-card-subtitle",[t._v(" "+t._s(t.$date(t.data_transaksi.created_at).format("DD/MM/YYYY HH:mm"))+" / "+t._s(t.$date(t.data_transaksi.updated_at).format("DD/MM/YYYY HH:mm"))+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?e("v-responsive",{attrs:{width:"100%"}}):t._e()],1)],1)],1)],1)],1),e("v-row",{staticClass:"mb-4",attrs:{"no-gutters":""}},[e("v-col",{attrs:{cols:"12"}},[e("v-form",{ref:"frmdata",attrs:{"lazy-validation":""},model:{value:t.form_valid,callback:function(a){t.form_valid=a},expression:"form_valid"}},[e("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.item_selected,"disable-pagination":!0,"hide-default-footer":!0,"item-key":"id",loading:t.datatableLoading,"loading-text":"Loading... Please wait"},scopedSlots:t._u([{key:"top",fn:function(){return[e("v-toolbar",{attrs:{flat:"",color:"white"}},[e("v-toolbar-title",[t._v("DAFTAR BULAN SPP YANG AKAN DIBAYAR")]),e("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),e("v-spacer"),e("v-btn",{staticClass:"ma-2",attrs:{color:"primary",icon:"",outlined:"",small:"",to:{path:"/keuangan/transaksi-spp/tambah/"+t.transaksi_id},disabled:1==t.data_transaksi.status||2==t.data_transaksi.status}},[e("v-icon",[t._v("mdi-plus")])],1)],1)]},proxy:!0},{key:"item.biaya_kombi",fn:function(a){var e=a.item;return[t._v(" "+t._s(t._f("formatUang")(e.biaya_kombi))+" ")]}},{key:"item.actions",fn:function(a){var i=a.item;return[e("v-icon",{attrs:{small:"",disabled:t.btnLoading},on:{click:function(a){return a.stopPropagation(),t.deleteItem(i)}}},[t._v(" mdi-delete ")])]}},t.item_selected.length>0?{key:"body.append",fn:function(){return[e("tr",{staticClass:"grey lighten-4 font-weight-black"},[e("td",[t._v("JUMLAH")]),e("td",[t._v(t._s(t.totalBulan)+" Bulan")]),e("td"),e("td",[t._v(t._s(t._f("formatUang")(t.totalBiayaKombi)))]),e("td")])]},proxy:!0}:null,{key:"no-data",fn:function(){return[t._v(" daftar bulan yang akan dibayar belum tersedia; silahkan pilih bulan di bawah ini. ")]},proxy:!0}],null,!0)})],1)],1)],1)],1):t._e()],1)},s=[],r=e("5530"),n=e("1da1"),o=(e("a434"),e("d81d"),e("96cf"),e("c8b0")),l=e("e477"),c={name:"TransaksiSPPDetail",created:function(){this.dashboard=this.$store.getters["uiadmin/getDefaultDashboard"],this.transaksi_id=this.$route.params.transaksi_id,this.breadcrumbs=[{text:"HOME",disabled:!1,href:"/dashboard/"+this.$store.getters["auth/AccessToken"]},{text:"KEUANGAN",disabled:!1,href:"/keuangan"},{text:"TRANSAKSI SPP",disabled:!1,href:"/keuangan/transaksi-spp"},{text:"DETAIL",disabled:!0,href:"#"}],this.initialize(),this.tahun_akademik=this.$store.getters["uiadmin/getTahunAkademik"]},data:function(){return{transaksi_id:null,data_transaksi:null,item_selected:[],breadcrumbs:[],tahun_akademik:0,btnLoading:!1,datatableLoading:!1,datatable:[],headers:[{text:"NO. BULAN",value:"no_bulan",width:120,sortable:!1},{text:"BULAN",value:"nama_bulan",sortable:!1},{text:"TAHUN",value:"tahun",sortable:!1},{text:"BIAYA KOMBI",value:"biaya_kombi",sortable:!1},{text:"AKSI",value:"actions",sortable:!1,width:100}],form_valid:!0}},methods:{changeTahunAkademik:function(t){this.tahun_akademik=t},initialize:function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(){var a=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.datatableLoading=!0,t.next=3,this.$ajax.get("/keuangan/transaksi-spp/"+this.transaksi_id,{headers:{Authorization:this.$store.getters["auth/Token"]}}).then((function(t){var e=t.data;a.data_transaksi=e.transaksi,a.item_selected=e.item_selected,a.datatableLoading=!1}));case 3:case"end":return t.stop()}}),t,this)})));function a(){return t.apply(this,arguments)}return a}(),deleteItem:function(t){var a=this;this.$root.$confirm.open("Delete","Apakah Anda ingin menghapus data dengan ID '+item.id+' ?",{color:"red"}).then((function(e){e&&(a.btnLoading=!0,a.$ajax.post("/keuangan/transaksi-spp/"+t.id,{_method:"DELETE"},{headers:{Authorization:a.$store.getters["auth/Token"]}}).then((function(){var e=a.datatable.indexOf(t);a.item_selected.splice(e,1),a.btnLoading=!1})).catch((function(){a.btnLoading=!1})))}))},closeDetailTransaksi:function(){this.$router.push("/keuangan/transaksi-spp")}},computed:{enrichedDataTable:function(){return this.datatable.map((function(t){return Object(r["a"])(Object(r["a"])({},t),{},{isSelectable:0==t.status})}))},totalBulan:function(){return this.item_selected.length},totalBiayaKombi:function(){var t,a=0;for(t in this.item_selected)a+=parseInt(this.item_selected[t].biaya_kombi);return a}},components:{KeuanganLayout:o["a"],ModuleHeader:l["a"]}},d=c,u=e("2877"),v=e("6544"),m=e.n(v),h=e("0798"),f=e("2bc5"),p=e("8336"),b=e("b0af"),_=e("99d9"),g=e("cc20"),A=e("62ad"),k=e("a523"),S=e("8fea"),E=e("ce7e"),T=e("4bd4"),y=e("132d"),N=e("6b53"),C=e("0fd9"),O=e("2fa4"),R=e("71d9"),x=e("2a7f"),w=Object(u["a"])(d,i,s,!1,null,null,null);a["default"]=w.exports;m()(w,{VAlert:h["a"],VBreadcrumbs:f["a"],VBtn:p["a"],VCard:b["a"],VCardSubtitle:_["b"],VCardText:_["c"],VCardTitle:_["d"],VChip:g["a"],VCol:A["a"],VContainer:k["a"],VDataTable:S["a"],VDivider:E["a"],VForm:T["a"],VIcon:y["a"],VResponsive:N["a"],VRow:C["a"],VSpacer:O["a"],VToolbar:R["a"],VToolbarTitle:x["b"]})},abd3:function(t,a,e){},b5b6:function(t,a,e){},c8b0:function(t,a,e){"use strict";var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("v-system-bar",{class:this.$store.getters["uiadmin/getTheme"]("V-SYSTEM-BAR-CSS-CLASS"),attrs:{app:"",dark:""}},[e("strong",[t._v("Hak Akses Sebagai :")]),t._v(" "+t._s(t.ROLE)+" ")]),e("v-app-bar",{attrs:{app:""}},[e("v-app-bar-nav-icon",{staticClass:"grey--text",on:{click:function(a){a.stopPropagation(),t.drawer=!t.drawer}}}),e("v-toolbar-title",{staticClass:"headline clickable",on:{click:function(a){a.stopPropagation(),t.$router.push("/dashboard/"+t.$store.getters["auth/AccessToken"]).catch((function(t){}))}}},[e("span",{staticClass:"hidden-sm-and-down"},[t._v(t._s(t.APP_NAME))])]),e("v-spacer"),e("v-menu",{attrs:{"close-on-content-click":!0,origin:"center center",transition:"scale-transition","offset-y":!0,bottom:"",left:""},scopedSlots:t._u([{key:"activator",fn:function(a){var i=a.on;return[e("v-avatar",{attrs:{size:"30"}},[e("v-img",t._g({attrs:{src:t.photoUser}},i))],1)]}}])},[e("v-list",[e("v-list-item",[e("v-list-item-avatar",[e("v-img",{attrs:{src:t.photoUser}})],1),e("v-list-item-content",[e("v-list-item-title",{staticClass:"title"},[t._v(" "+t._s(t.ATTRIBUTE_USER("username"))+" ")]),e("v-list-item-subtitle",[t._v(" ["+t._s(t.DEFAULT_ROLE)+"] ")])],1)],1),e("v-divider"),e("v-list-item",{attrs:{to:"/system-users/profil"}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-account")])],1),e("v-list-item-title",[t._v("Profil")])],1),e("v-divider"),e("v-list-item",{on:{click:function(a){return a.preventDefault(),t.logout(a)}}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-power")])],1),e("v-list-item-title",[t._v("Logout")])],1)],1)],1),e("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),e("v-app-bar-nav-icon",{on:{click:function(a){a.stopPropagation(),t.drawerRight=!t.drawerRight}}},[e("v-icon",[t._v("mdi-menu-open")])],1)],1),e("v-navigation-drawer",{staticClass:"green darken-1",attrs:{width:"300",dark:"",temporary:t.temporaryleftsidebar,app:""},model:{value:t.drawer,callback:function(a){t.drawer=a},expression:"drawer"}},[e("v-list-item",[e("v-list-item-avatar",[e("v-img",{attrs:{src:t.photoUser},on:{click:function(a){return a.stopPropagation(),t.toProfile(a)}}})],1),e("v-list-item-content",[e("v-list-item-title",{staticClass:"title"},[t._v(" "+t._s(t.ATTRIBUTE_USER("username"))+" ")]),e("v-list-item-subtitle",[t._v(" ["+t._s(t.DEFAULT_ROLE)+"] ")])],1)],1),e("v-divider"),e("v-list",{attrs:{expand:""}},[t.CAN_ACCESS("KEUANGAN-GROUP")&&"mahasiswabaru"!=t.dashboard&&"mahasiswa"!=t.dashboard?e("v-list-item",{staticClass:"yellow",attrs:{to:{path:"/keuangan"},link:"",color:"green"}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-monitor-dashboard")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v("BOARD KEUANGAN")])],1)],1):t._e(),e("v-subheader",[t._v("DAFTAR ULANG")]),e("v-list-item",{attrs:{link:"",to:"/keuangan/channelpembayaran"}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-triforce")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v(" CHANNEL PEMBAYARAN ")])],1)],1),t.CAN_ACCESS("KEUANGAN-STATUS-TRANSAKSI_BROWSE")?e("v-list-item",{attrs:{link:"",to:"/keuangan/statustransaksi"}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-triforce")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v(" STATUS TRANSAKSI ")])],1)],1):t._e(),t.CAN_ACCESS("KEUANGAN-KOMPONEN-BIAYA_BROWSE")?e("v-list-item",{attrs:{link:"",to:"/keuangan/biayakomponen"}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-video-input-component")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v(" BIAYA KOMPONEN ")])],1)],1):t._e(),t.CAN_ACCESS("KEUANGAN-BIAYA-KOMPONEN-PERIODE_BROWSE")?e("v-list-item",{attrs:{link:"",to:"/keuangan/biayakomponenperiode"}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-triforce")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v(" BIAYA KOMPONEN PERIODE ")])],1)],1):t._e(),"mahasiswabaru"!=t.dashboard&&"mahasiswa"!=t.dashboard?e("v-subheader",[t._v("METODE PEMBAYARAN")]):t._e(),t.CAN_ACCESS("KEUANGAN-METODE-TRANSFER-BANK_BROWSE")?e("v-list-item",{attrs:{link:"",to:"/keuangan/transferbank"}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-account-cash")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v(" TRANSFER BANK ")])],1)],1):t._e(),e("v-subheader",[t._v("TRANSAKSI")]),t.CAN_ACCESS("KEUANGAN-KONFIRMASI-PEMBAYARAN_BROWSE")?e("v-list-item",{attrs:{link:"",to:"/keuangan/konfirmasipembayaran"}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-account-cash")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v(" KONFIRMASI PEMBAYARAN ")])],1)],1):t._e(),t.CAN_ACCESS("KEUANGAN-TRANSAKSI_BROWSE")?e("v-list-item",{attrs:{link:"",to:"/keuangan/transaksi"}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-account-cash")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v(" DAFTAR TRANSAKSI ")])],1)],1):t._e(),e("v-divider"),t.CAN_ACCESS("KEUANGAN-TRANSAKSI-BIAYA-PENDAFTARAN_BROWSE")?e("v-list-item",{attrs:{link:"",to:"/keuangan/transaksi-pendaftaranmhsbaru"}},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-account-cash")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v(" PENDAFTARAN MHS BARU ")])],1)],1):t._e()],1)],1),t.showrightsidebar?e("v-navigation-drawer",{attrs:{width:"300",app:"",fixed:"",right:"",temporary:""},model:{value:t.drawerRight,callback:function(a){t.drawerRight=a},expression:"drawerRight"}},[e("v-list",{attrs:{dense:""}},[e("v-list-item",[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-menu-open")])],1),e("v-list-item-content",[e("v-list-item-title",{staticClass:"title"},[t._v(" OPTIONS ")])],1)],1),e("v-divider"),e("v-list-item",{staticClass:"teal lighten-5 mb-5"},[e("v-list-item-icon",{staticClass:"mr-2"},[e("v-icon",[t._v("mdi-filter")])],1),e("v-list-item-content",[e("v-list-item-title",[t._v("FILTER")])],1)],1),t._t("filtersidebar")],2)],1):t._e(),e("v-main",{staticClass:"mx-4 mb-4"},[t._t("default")],2),e("v-footer",{attrs:{app:"",padless:"",fixed:"",dark:""}},[e("v-card",{staticClass:"flex",attrs:{flat:"",tile:""}},[e("v-divider"),e("v-card-text",{staticClass:"py-2 white--text text-center"},[e("strong",[t._v("SIMAK (2021-2022)")]),t._v(" dikembangkan oleh TIM IT STMIK Bandung Bali "),e("v-btn",{attrs:{dark:"",icon:"",href:"https://github.com/stmikbdgbali/simak"}},[e("v-icon",[t._v("mdi-github")])],1)],1)],1)],1)],1)},s=[],r=e("5530"),n=(e("5319"),e("ac1f"),e("2f62")),o={name:"KeuanganLayout",created:function(){this.dashboard=this.$store.getters["uiadmin/getDefaultDashboard"]},props:{showrightsidebar:{type:Boolean,default:!0},temporaryleftsidebar:{type:Boolean,default:!1}},data:function(){return{loginTime:0,drawer:null,drawerRight:null,dashboard:null}},methods:{logout:function(){var t=this;this.loginTime=0,this.$ajax.post("/auth/logout",{},{headers:{Authorization:this.TOKEN}}).then((function(){t.$store.dispatch("auth/logout"),t.$store.dispatch("uifront/reinit"),t.$store.dispatch("uiadmin/reinit"),t.$router.push("/")})).catch((function(){t.$store.dispatch("auth/logout"),t.$store.dispatch("uifront/reinit"),t.$store.dispatch("uiadmin/reinit"),t.$router.push("/")}))},isBentukPT:function(t){return this.$store.getters["uifront/getBentukPT"]==t}},computed:Object(r["a"])(Object(r["a"])({},Object(n["b"])("auth",{AUTHENTICATED:"Authenticated",ACCESS_TOKEN:"AccessToken",TOKEN:"Token",DEFAULT_ROLE:"DefaultRole",ROLE:"Role",CAN_ACCESS:"can",ATTRIBUTE_USER:"AttributeUser"})),{},{APP_NAME:function(){return"SIMAK v1"},photoUser:function(){var t,a=this.ATTRIBUTE_USER("foto");return t=""==a?this.$api.url+"/storage/images/users/no_photo.png":this.$api.url+"/"+a,t}}),watch:{loginTime:{handler:function(t){var a=this;t>=0?setTimeout((function(){a.loginTime=1==a.AUTHENTICATED?a.loginTime+1:-1}),1e3):(this.$store.dispatch("auth/logout"),this.$router.replace("/login"))},immediate:!0}}},l=o,c=e("2877"),d=e("6544"),u=e.n(d),v=e("40dc"),m=e("5bc1"),h=e("8212"),f=e("8336"),p=e("b0af"),b=e("99d9"),_=e("ce7e"),g=e("553a"),A=e("132d"),k=e("adda"),S=e("8860"),E=e("da13"),T=e("8270"),y=e("5d23"),N=e("34c3"),C=e("f6c4"),O=e("e449"),R=e("f774"),x=e("2fa4"),w=e("e0c7"),B=e("afd9"),I=e("2a7f"),$=Object(c["a"])(l,i,s,!1,null,null,null);a["a"]=$.exports;u()($,{VAppBar:v["a"],VAppBarNavIcon:m["a"],VAvatar:h["a"],VBtn:f["a"],VCard:p["a"],VCardText:b["c"],VDivider:_["a"],VFooter:g["a"],VIcon:A["a"],VImg:k["a"],VList:S["a"],VListItem:E["a"],VListItemAvatar:T["a"],VListItemContent:y["a"],VListItemIcon:N["a"],VListItemSubtitle:y["b"],VListItemTitle:y["c"],VMain:C["a"],VMenu:O["a"],VNavigationDrawer:R["a"],VSpacer:x["a"],VSubheader:w["a"],VSystemBar:B["a"],VToolbarTitle:I["b"]})},e477:function(t,a,e){"use strict";var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-container",{attrs:{fluid:t.isReportPage}},[e("v-row",{attrs:{"no-gutters":""}},[e("v-col",{attrs:{cols:"12",xs:"12",sm:"12",md:"12"}},[t._t("breadcrumbs")],2)],1),e("v-row",{attrs:{"no-gutters":""}},[e("v-col",{attrs:{cols:"12",xs:"12",sm:"12",md:"12"}},[e("h1",{staticClass:"subheading grey--text"},[e("v-icon",{attrs:{large:""}},[t._t("icon")],2),t._t("name")],2)]),e("v-col",{attrs:{cols:"12",xs:"12",sm:"12",md:"12"}},[e("span",{staticClass:"ml-10 subtitle-1 green--text font-weight-bold"},[t._t("subtitle")],2)])],1),e("v-row",{attrs:{"no-gutters":""}},[e("v-col",{attrs:{cols:"12",xs:"12",sm:"12",md:"12"}},[t._t("desc")],2)],1)],1)},s=[],r={name:"ModuleHeader",computed:{isReportPage:function(){return!0}}},n=r,o=e("2877"),l=e("6544"),c=e.n(l),d=e("62ad"),u=e("a523"),v=e("132d"),m=e("0fd9"),h=Object(o["a"])(n,i,s,!1,null,null,null);a["a"]=h.exports;c()(h,{VCol:d["a"],VContainer:u["a"],VIcon:v["a"],VRow:m["a"]})}}]);