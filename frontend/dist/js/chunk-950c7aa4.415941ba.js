(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-950c7aa4"],{"553a":function(t,a,i){"use strict";i("a9e3"),i("c7cd");var e=i("5530"),n=(i("b5b6"),i("8dd9")),s=i("3a66"),r=i("d10f"),o=i("58df"),l=i("80d2");a["a"]=Object(o["a"])(n["a"],Object(s["a"])("footer",["height","inset"]),r["a"]).extend({name:"v-footer",props:{height:{default:"auto",type:[Number,String]},inset:Boolean,padless:Boolean,tag:{type:String,default:"footer"}},computed:{applicationProperty:function(){return this.inset?"insetFooter":"footer"},classes:function(){return Object(e["a"])(Object(e["a"])({},n["a"].options.computed.classes.call(this)),{},{"v-footer--absolute":this.absolute,"v-footer--fixed":!this.absolute&&(this.app||this.fixed),"v-footer--padless":this.padless,"v-footer--inset":this.inset})},computedBottom:function(){if(this.isPositioned)return this.app?this.$vuetify.application.bottom:0},computedLeft:function(){if(this.isPositioned)return this.app&&this.inset?this.$vuetify.application.left:0},computedRight:function(){if(this.isPositioned)return this.app&&this.inset?this.$vuetify.application.right:0},isPositioned:function(){return Boolean(this.absolute||this.fixed||this.app)},styles:function(){var t=parseInt(this.height);return Object(e["a"])(Object(e["a"])({},n["a"].options.computed.styles.call(this)),{},{height:isNaN(t)?t:Object(l["g"])(t),left:Object(l["g"])(this.computedLeft),right:Object(l["g"])(this.computedRight),bottom:Object(l["g"])(this.computedBottom)})}},methods:{updateApplication:function(){var t=parseInt(this.height);return isNaN(t)?this.$el?this.$el.clientHeight:0:t}},render:function(t){var a=this.setBackgroundColor(this.color,{staticClass:"v-footer",class:this.classes,style:this.styles});return t(this.tag,a,this.$slots.default)}})},7300:function(t,a,i){"use strict";i.r(a);var e=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("KeuanganLayout",{scopedSlots:t._u([{key:"filtersidebar",fn:function(){return[i("Filter1",{ref:"filter1",on:{changeTahunAkademik:t.changeTahunAkademik}})]},proxy:!0}])},[i("ModuleHeader",{scopedSlots:t._u([{key:"icon",fn:function(){return[t._v(" mdi-monitor-dashboard ")]},proxy:!0},{key:"name",fn:function(){return[t._v(" KEUANGAN ")]},proxy:!0},{key:"subtitle",fn:function(){return[t._v(" TAHUN AKADEMIK "+t._s(t.tahun_akademik)+" ")]},proxy:!0},{key:"breadcrumbs",fn:function(){return[i("v-breadcrumbs",{staticClass:"pa-0",attrs:{items:t.breadcrumbs},scopedSlots:t._u([{key:"divider",fn:function(){return[i("v-icon",[t._v("mdi-chevron-right")])]},proxy:!0}])})]},proxy:!0},{key:"desc",fn:function(){return[i("v-alert",{attrs:{color:"cyan",border:"left","colored-border":"",type:"info"}},[t._v(" dashboard untuk memperoleh ringkasan informasi keuangan perguruan tinggi. ")])]},proxy:!0}])}),"mahasiswa"==t.dashboard?i("DashboardKeuanganMHS",{attrs:{ta:t.tahun_akademik}}):i("DashboardKeuanganAdmin",{attrs:{ta:t.tahun_akademik}})],1)},n=[],s=i("c8b0"),r=i("e477"),o=i("9fc1"),l=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("v-container",{attrs:{fluid:""}},[i("v-row",{attrs:{dense:""}},[i("v-col",{attrs:{xs:"12",sm:"4",md:"3"}},[i("v-card",{staticClass:"clickable green darken-1",attrs:{color:"#385F73",dark:""},nativeOn:{click:function(a){return t.$router.push("/spmb/pendaftaranbaru")}}},[i("v-card-title",{staticClass:"headline"},[t._v(" TOTAL TRANSAKSI ")]),i("v-card-subtitle",[t._v(" Total transaksi keseluruhan ")]),i("v-card-text",[t._v(" "+t._s(t._f("formatUang")(t.total_transaction))+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?i("v-responsive",{attrs:{width:"100%"}}):t._e(),i("v-col",{attrs:{xs:"12",sm:"4",md:"3"}},[i("v-card",{staticClass:"clickable green darken-1",attrs:{color:"#385F73",dark:""},nativeOn:{click:function(a){return t.$router.push("/spmb/pendaftaranbaru")}}},[i("v-card-title",{staticClass:"headline"},[t._v(" TRANSAKSI PAID ")]),i("v-card-subtitle",[t._v(" Total transaksi dengan status PAID ")]),i("v-card-text",[t._v(" "+t._s(t._f("formatUang")(t.total_transaction_paid))+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?i("v-responsive",{attrs:{width:"100%"}}):t._e(),i("v-col",{attrs:{xs:"12",sm:"4",md:"3"}},[i("v-card",{staticClass:"clickable green darken-1",attrs:{color:"#385F73",dark:""},nativeOn:{click:function(a){return t.$router.push("/spmb/pendaftaranbaru")}}},[i("v-card-title",{staticClass:"headline"},[t._v(" TRANSAKSI UNPAID ")]),i("v-card-subtitle",[t._v(" Total transaksi dengan status UNPAID ")]),i("v-card-text",[t._v(" "+t._s(t._f("formatUang")(t.total_transaction_unpaid))+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?i("v-responsive",{attrs:{width:"100%"}}):t._e(),i("v-col",{attrs:{xs:"12",sm:"4",md:"3"}},[i("v-card",{staticClass:"clickable green darken-1",attrs:{color:"#385F73",dark:""},nativeOn:{click:function(a){return t.$router.push("/spmb/pendaftaranbaru")}}},[i("v-card-title",{staticClass:"headline"},[t._v(" TRANSAKSI CANCELLED ")]),i("v-card-subtitle",[t._v(" Total transaksi dengan status CANCELLED ")]),i("v-card-text",[t._v(" "+t._s(t._f("formatUang")(t.total_transaction_cancelled))+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?i("v-responsive",{attrs:{width:"100%"}}):t._e()],1)],1)},c=[],d=(i("a9e3"),i("96cf"),i("1da1")),u={name:"DashboardKeuanganMHS",created:function(){this.initialize()},data:function(){return{datatableLoading:!1,kombi_ganjil_unpaid:[],kombi_genap_unpaid:[],kombi_ganjil_paid:[],kombi_genap_paid:[],kombi_ganjil_cancelled:[],kombi_genap_cancelled:[],headers:[{text:"NAMA KOMPONEN",value:"nama_kombi",sortable:!1},{text:"JUMLAH",align:"end",value:"jumlah",width:250,sortable:!1}],total_transaction:0,total_transaction_paid:0,total_transaction_unpaid:0,total_transaction_cancelled:0}},props:{ta:{type:Number,required:!0}},methods:{initialize:function(){var t=Object(d["a"])(regeneratorRuntime.mark((function t(){var a=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.datatableLoading=!0,t.next=3,this.$ajax.post("/dashboard/keuangan",{TA:this.ta},{headers:{Authorization:this.$store.getters["auth/Token"]}}).then((function(t){var i=t.data;a.total_transaction=i.total_transaction,a.total_transaction_paid=i.total_transaction_paid,a.total_transaction_unpaid=i.total_transaction_unpaid,a.total_transaction_cancelled=i.total_transaction_cancelled,a.kombi_ganjil_unpaid=i.kombi_ganjil_unpaid,a.kombi_genap_unpaid=i.kombi_genap_unpaid,a.kombi_ganjil_paid=i.kombi_ganjil_paid,a.kombi_genap_paid=i.kombi_genap_paid,a.kombi_ganjil_cancelled=i.kombi_ganjil_cancelled,a.kombi_genap_cancelled=i.kombi_genap_cancelled,a.datatableLoading=!1})).catch((function(){a.datatableLoading=!1}));case 3:case"end":return t.stop()}}),t,this)})));function a(){return t.apply(this,arguments)}return a}()},computed:{totalKombiGanjilPaid:function(){for(var t=0,a=0;a<this.kombi_ganjil_paid.length;a++){var i=this.kombi_ganjil_paid[a];t+=parseFloat(i.jumlah)}return t},totalKombiGenapPaid:function(){for(var t=0,a=0;a<this.kombi_genap_paid.length;a++){var i=this.kombi_genap_paid[a];t+=parseFloat(i.jumlah)}return t}},watch:{ta:function(){this.initialize()}}},v=u,m=i("2877"),_=i("6544"),h=i.n(_),p=i("b0af"),b=i("99d9"),f=i("62ad"),g=i("a523"),k=i("6b53"),A=i("0fd9"),C=Object(m["a"])(v,l,c,!1,null,null,null),T=C.exports;h()(C,{VCard:p["a"],VCardSubtitle:b["b"],VCardText:b["c"],VCardTitle:b["d"],VCol:f["a"],VContainer:g["a"],VResponsive:k["a"],VRow:A["a"]});var N=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("v-container",{attrs:{fluid:""}},[i("v-row",{attrs:{dense:""}},[i("v-col",{attrs:{xs:"12",sm:"4",md:"3"}},[i("v-card",{staticClass:"clickable green darken-1",attrs:{color:"#385F73",dark:""},nativeOn:{click:function(a){return t.$router.push("/spmb/pendaftaranbaru")}}},[i("v-card-title",{staticClass:"headline"},[t._v(" TOTAL ")]),i("v-card-subtitle",[t._v(" Total transaksi keseluruhan ")]),i("v-card-text",[t._v(" "+t._s(t._f("formatUang")(t.total_transaction))+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?i("v-responsive",{attrs:{width:"100%"}}):t._e(),i("v-col",{attrs:{xs:"12",sm:"4",md:"3"}},[i("v-card",{staticClass:"clickable green darken-1",attrs:{color:"#385F73",dark:""},nativeOn:{click:function(a){return t.$router.push("/spmb/pendaftaranbaru")}}},[i("v-card-title",{staticClass:"headline"},[t._v(" PAID ")]),i("v-card-subtitle",[t._v(" Total transaksi dengan status PAID ")]),i("v-card-text",[t._v(" "+t._s(t._f("formatUang")(t.total_transaction_paid))+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?i("v-responsive",{attrs:{width:"100%"}}):t._e(),i("v-col",{attrs:{xs:"12",sm:"4",md:"3"}},[i("v-card",{staticClass:"clickable green darken-1",attrs:{color:"#385F73",dark:""},nativeOn:{click:function(a){return t.$router.push("/spmb/pendaftaranbaru")}}},[i("v-card-title",{staticClass:"headline"},[t._v(" UNPAID ")]),i("v-card-subtitle",[t._v(" Total transaksi dengan status UNPAID ")]),i("v-card-text",[t._v(" "+t._s(t._f("formatUang")(t.total_transaction_unpaid))+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?i("v-responsive",{attrs:{width:"100%"}}):t._e(),i("v-col",{attrs:{xs:"12",sm:"4",md:"3"}},[i("v-card",{staticClass:"clickable green darken-1",attrs:{color:"#385F73",dark:""},nativeOn:{click:function(a){return t.$router.push("/spmb/pendaftaranbaru")}}},[i("v-card-title",{staticClass:"headline"},[t._v(" CANCELLED ")]),i("v-card-subtitle",[t._v(" Total transaksi dengan status CANCELLED ")]),i("v-card-text",[t._v(" "+t._s(t._f("formatUang")(t.total_transaction_cancelled))+" ")])],1)],1),t.$vuetify.breakpoint.xsOnly?i("v-responsive",{attrs:{width:"100%"}}):t._e()],1),i("v-row",[i("v-col",{attrs:{xs:"12",sm:"12",md:"6"}},[i("v-card",{staticClass:"mb-3"},[i("v-card-title",[t._v(" Semester Ganjil ")]),i("v-card-subtitle",[t._v(" Jumlah yang muncul berdasarkan transaksi yang statusnya PAID ")]),i("v-card-text",[i("v-data-table",{attrs:{loading:t.datatableLoading,"loading-text":"Loading... Please wait",dense:!0,"disable-pagination":!0,"hide-default-footer":!0,headers:t.headers,items:t.kombi_ganjil_paid},scopedSlots:t._u([{key:"item.jumlah",fn:function(a){var i=a.item;return[t._v(" "+t._s(t._f("formatUang")(i.jumlah))+" ")]}},t.kombi_ganjil_paid.length>0?{key:"body.append",fn:function(){return[i("tr",{staticClass:"grey lighten-4 font-weight-black"},[i("td",{staticClass:"text-right"},[t._v("TOTAL")]),i("td",{staticClass:"text-right"},[t._v(t._s(t._f("formatUang")(t.totalKombiGanjilPaid)))])])]},proxy:!0}:null,{key:"no-data",fn:function(){return[t._v(" belum ada transaksi dengan status PAID. ")]},proxy:!0}],null,!0)})],1)],1)],1),t.$vuetify.breakpoint.xsOnly?i("v-responsive",{attrs:{width:"100%"}}):t._e(),i("v-col",{attrs:{xs:"12",sm:"12",md:"6"}},[i("v-card",{staticClass:"mb-3"},[i("v-card-title",[t._v(" Semester Genap ")]),i("v-card-subtitle",[t._v(" Jumlah yang muncul berdasarkan transaksi yang statusnya PAID ")]),i("v-card-text",[i("v-data-table",{attrs:{loading:t.datatableLoading,"loading-text":"Loading... Please wait",dense:!0,"disable-pagination":!0,"hide-default-footer":!0,headers:t.headers,items:t.kombi_genap_paid},scopedSlots:t._u([{key:"item.jumlah",fn:function(a){var i=a.item;return[t._v(" "+t._s(t._f("formatUang")(i.jumlah))+" ")]}},t.kombi_genap_paid.length>0?{key:"body.append",fn:function(){return[i("tr",{staticClass:"grey lighten-4 font-weight-black"},[i("td",{staticClass:"text-right"},[t._v("TOTAL")]),i("td",{staticClass:"text-right"},[t._v(t._s(t._f("formatUang")(t.totalKombiGenapPaid)))])])]},proxy:!0}:null,{key:"no-data",fn:function(){return[t._v(" belum ada transaksi dengan status PAID. ")]},proxy:!0}],null,!0)})],1)],1)],1),t.$vuetify.breakpoint.xsOnly?i("v-responsive",{attrs:{width:"100%"}}):t._e()],1)],1)},E=[],S={name:"DashboardKeuanganMHS",created:function(){this.initialize()},data:function(){return{datatableLoading:!1,kombi_ganjil_unpaid:[],kombi_genap_unpaid:[],kombi_ganjil_paid:[],kombi_genap_paid:[],kombi_ganjil_cancelled:[],kombi_genap_cancelled:[],headers:[{text:"NAMA KOMPONEN",value:"nama_kombi",sortable:!1},{text:"JUMLAH",align:"end",value:"jumlah",width:250,sortable:!1}],total_transaction:0,total_transaction_paid:0,total_transaction_unpaid:0,total_transaction_cancelled:0}},props:{ta:{type:Number,required:!0}},methods:{initialize:function(){var t=Object(d["a"])(regeneratorRuntime.mark((function t(){var a=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.datatableLoading=!0,t.next=3,this.$ajax.post("/dashboard/keuangan",{TA:this.ta},{headers:{Authorization:this.$store.getters["auth/Token"]}}).then((function(t){var i=t.data;a.total_transaction=i.total_transaction,a.total_transaction_paid=i.total_transaction_paid,a.total_transaction_unpaid=i.total_transaction_unpaid,a.total_transaction_cancelled=i.total_transaction_cancelled,a.kombi_ganjil_unpaid=i.kombi_ganjil_unpaid,a.kombi_genap_unpaid=i.kombi_genap_unpaid,a.kombi_ganjil_paid=i.kombi_ganjil_paid,a.kombi_genap_paid=i.kombi_genap_paid,a.kombi_ganjil_cancelled=i.kombi_ganjil_cancelled,a.kombi_genap_cancelled=i.kombi_genap_cancelled,a.datatableLoading=!1})).catch((function(){a.datatableLoading=!1}));case 3:case"end":return t.stop()}}),t,this)})));function a(){return t.apply(this,arguments)}return a}()},computed:{totalKombiGanjilPaid:function(){for(var t=0,a=0;a<this.kombi_ganjil_paid.length;a++){var i=this.kombi_ganjil_paid[a];t+=parseFloat(i.jumlah)}return t},totalKombiGenapPaid:function(){for(var t=0,a=0;a<this.kombi_genap_paid.length;a++){var i=this.kombi_genap_paid[a];t+=parseFloat(i.jumlah)}return t}},watch:{ta:function(){this.initialize()}}},y=S,x=i("8fea"),O=Object(m["a"])(y,N,E,!1,null,null,null),R=O.exports;h()(O,{VCard:p["a"],VCardSubtitle:b["b"],VCardText:b["c"],VCardTitle:b["d"],VCol:f["a"],VContainer:g["a"],VDataTable:x["a"],VResponsive:k["a"],VRow:A["a"]});var w={name:"Keuangan",created:function(){this.dashboard=this.$store.getters["uiadmin/getDefaultDashboard"],this.breadcrumbs=[{text:"HOME",disabled:!1,href:"/dashboard/"+this.$store.getters["auth/AccessToken"]},{text:"KEUANGAN",disabled:!0,href:"#"}],this.tahun_akademik=this.$store.getters["uiadmin/getTahunAkademik"]},mounted:function(){this.firstloading=!1,this.$refs.filter1.setFirstTimeLoading(this.firstloading)},data:function(){return{firstloading:!0,breadcrumbs:[],tahun_akademik:0,dashboard:null}},methods:{changeTahunAkademik:function(t){this.tahun_akademik=t}},components:{KeuanganLayout:s["a"],ModuleHeader:r["a"],Filter1:o["a"],DashboardKeuanganMHS:T,DashboardKeuanganAdmin:R}},I=w,j=i("0798"),$=i("2bc5"),K=i("132d"),L=Object(m["a"])(I,e,n,!1,null,null,null);a["default"]=L.exports;h()(L,{VAlert:j["a"],VBreadcrumbs:$["a"],VIcon:K["a"]})},"9fc1":function(t,a,i){"use strict";var e=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("v-list-item",[i("v-list-item-content",[i("v-select",{attrs:{items:t.daftar_ta,label:"TAHUN AKADEMIK",outlined:""},model:{value:t.tahun_akademik,callback:function(a){t.tahun_akademik=a},expression:"tahun_akademik"}})],1)],1)},n=[],s={name:"FilterMode1",created:function(){this.daftar_ta=this.$store.getters["uiadmin/getDaftarTA"],this.tahun_akademik=this.$store.getters["uiadmin/getTahunAkademik"]},data:function(){return{firstloading:!0,daftar_ta:[],tahun_akademik:null}},methods:{setFirstTimeLoading:function(t){this.firstloading=t}},watch:{tahun_akademik:function(t){this.firstloading||(this.$store.dispatch("uiadmin/updateTahunAkademik",t),this.$emit("changeTahunAkademik",t))}}},r=s,o=i("2877"),l=i("6544"),c=i.n(l),d=i("da13"),u=i("5d23"),v=i("b974"),m=Object(o["a"])(r,e,n,!1,null,null,null);a["a"]=m.exports;c()(m,{VListItem:d["a"],VListItemContent:u["a"],VSelect:v["a"]})},b5b6:function(t,a,i){},c8b0:function(t,a,i){"use strict";var e=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",[i("v-system-bar",{class:this.$store.getters["uiadmin/getTheme"]("V-SYSTEM-BAR-CSS-CLASS"),attrs:{app:"",dark:""}},[i("strong",[t._v("Hak Akses Sebagai :")]),t._v(" "+t._s(t.ROLE)+" ")]),i("v-app-bar",{attrs:{app:""}},[i("v-app-bar-nav-icon",{staticClass:"grey--text",on:{click:function(a){a.stopPropagation(),t.drawer=!t.drawer}}}),i("v-toolbar-title",{staticClass:"headline clickable",on:{click:function(a){a.stopPropagation(),t.$router.push("/dashboard/"+t.$store.getters["auth/AccessToken"]).catch((function(t){}))}}},[i("span",{staticClass:"hidden-sm-and-down"},[t._v(t._s(t.APP_NAME))])]),i("v-spacer"),i("v-menu",{attrs:{"close-on-content-click":!0,origin:"center center",transition:"scale-transition","offset-y":!0,bottom:"",left:""},scopedSlots:t._u([{key:"activator",fn:function(a){var e=a.on;return[i("v-avatar",{attrs:{size:"30"}},[i("v-img",t._g({attrs:{src:t.photoUser}},e))],1)]}}])},[i("v-list",[i("v-list-item",[i("v-list-item-avatar",[i("v-img",{attrs:{src:t.photoUser}})],1),i("v-list-item-content",[i("v-list-item-title",{staticClass:"title"},[t._v(" "+t._s(t.ATTRIBUTE_USER("username"))+" ")]),i("v-list-item-subtitle",[t._v(" ["+t._s(t.DEFAULT_ROLE)+"] ")])],1)],1),i("v-divider"),i("v-list-item",{attrs:{to:"/system-users/profil"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-account")])],1),i("v-list-item-title",[t._v("Profil")])],1),i("v-divider"),i("v-list-item",{on:{click:function(a){return a.preventDefault(),t.logout(a)}}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-power")])],1),i("v-list-item-title",[t._v("Logout")])],1)],1)],1),i("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),i("v-app-bar-nav-icon",{on:{click:function(a){a.stopPropagation(),t.drawerRight=!t.drawerRight}}},[i("v-icon",[t._v("mdi-menu-open")])],1)],1),i("v-navigation-drawer",{staticClass:"green darken-1",attrs:{width:"300",dark:"",temporary:t.temporaryleftsidebar,app:""},model:{value:t.drawer,callback:function(a){t.drawer=a},expression:"drawer"}},[i("v-list-item",[i("v-list-item-avatar",[i("v-img",{attrs:{src:t.photoUser},on:{click:function(a){return a.stopPropagation(),t.toProfile(a)}}})],1),i("v-list-item-content",[i("v-list-item-title",{staticClass:"title"},[t._v(" "+t._s(t.ATTRIBUTE_USER("username"))+" ")]),i("v-list-item-subtitle",[t._v(" ["+t._s(t.DEFAULT_ROLE)+"] ")])],1)],1),i("v-divider"),i("v-list",{attrs:{expand:""}},[t.CAN_ACCESS("KEUANGAN-GROUP")&&"mahasiswabaru"!=t.dashboard&&"mahasiswa"!=t.dashboard?i("v-list-item",{staticClass:"yellow",attrs:{to:{path:"/keuangan"},link:"",color:"green"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-monitor-dashboard")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v("BOARD KEUANGAN")])],1)],1):t._e(),i("v-subheader",[t._v("DAFTAR ULANG")]),i("v-list-item",{attrs:{link:"",to:"/keuangan/channelpembayaran"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-triforce")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" CHANNEL PEMBAYARAN ")])],1)],1),t.CAN_ACCESS("KEUANGAN-STATUS-TRANSAKSI_BROWSE")?i("v-list-item",{attrs:{link:"",to:"/keuangan/statustransaksi"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-triforce")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" STATUS TRANSAKSI ")])],1)],1):t._e(),t.CAN_ACCESS("KEUANGAN-KOMPONEN-BIAYA_BROWSE")?i("v-list-item",{attrs:{link:"",to:"/keuangan/biayakomponen"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-video-input-component")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" BIAYA KOMPONEN ")])],1)],1):t._e(),t.CAN_ACCESS("KEUANGAN-BIAYA-KOMPONEN-PERIODE_BROWSE")?i("v-list-item",{attrs:{link:"",to:"/keuangan/biayakomponenperiode"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-triforce")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" BIAYA KOMPONEN PERIODE ")])],1)],1):t._e(),"mahasiswabaru"!=t.dashboard&&"mahasiswa"!=t.dashboard?i("v-subheader",[t._v("METODE PEMBAYARAN")]):t._e(),t.CAN_ACCESS("KEUANGAN-METODE-TRANSFER-BANK_BROWSE")?i("v-list-item",{attrs:{link:"",to:"/keuangan/transferbank"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-account-cash")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" TRANSFER BANK ")])],1)],1):t._e(),i("v-subheader",[t._v("TRANSAKSI")]),t.CAN_ACCESS("KEUANGAN-KONFIRMASI-PEMBAYARAN_BROWSE")?i("v-list-item",{attrs:{link:"",to:"/keuangan/konfirmasipembayaran"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-account-cash")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" KONFIRMASI PEMBAYARAN ")])],1)],1):t._e(),t.CAN_ACCESS("KEUANGAN-TRANSAKSI_BROWSE")?i("v-list-item",{attrs:{link:"",to:"/keuangan/transaksi"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-account-cash")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" DAFTAR TRANSAKSI ")])],1)],1):t._e(),i("v-divider"),t.CAN_ACCESS("KEUANGAN-TRANSAKSI-BIAYA-PENDAFTARAN_BROWSE")?i("v-list-item",{attrs:{link:"",to:"/keuangan/transaksi-pendaftaranmhsbaru"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-account-cash")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" PENDAFTARAN MHS BARU ")])],1)],1):t._e()],1)],1),t.showrightsidebar?i("v-navigation-drawer",{attrs:{width:"300",app:"",fixed:"",right:"",temporary:""},model:{value:t.drawerRight,callback:function(a){t.drawerRight=a},expression:"drawerRight"}},[i("v-list",{attrs:{dense:""}},[i("v-list-item",[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-menu-open")])],1),i("v-list-item-content",[i("v-list-item-title",{staticClass:"title"},[t._v(" OPTIONS ")])],1)],1),i("v-divider"),i("v-list-item",{staticClass:"teal lighten-5 mb-5"},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-filter")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v("FILTER")])],1)],1),t._t("filtersidebar")],2)],1):t._e(),i("v-main",{staticClass:"mx-4 mb-4"},[t._t("default")],2),i("v-footer",{attrs:{app:"",padless:"",fixed:"",dark:""}},[i("v-card",{staticClass:"flex",attrs:{flat:"",tile:""}},[i("v-divider"),i("v-card-text",{staticClass:"py-2 white--text text-center"},[i("strong",[t._v("SIMAK (2021-2022)")]),t._v(" dikembangkan oleh TIM IT STMIK Bandung Bali "),i("v-btn",{attrs:{dark:"",icon:"",href:"https://github.com/stmikbdgbali/simak"}},[i("v-icon",[t._v("mdi-github")])],1)],1)],1)],1)],1)},n=[],s=(i("ac1f"),i("5319"),i("5530")),r=i("2f62"),o={name:"KeuanganLayout",created:function(){this.dashboard=this.$store.getters["uiadmin/getDefaultDashboard"]},props:{showrightsidebar:{type:Boolean,default:!0},temporaryleftsidebar:{type:Boolean,default:!1}},data:function(){return{loginTime:0,drawer:null,drawerRight:null,dashboard:null}},methods:{logout:function(){var t=this;this.loginTime=0,this.$ajax.post("/auth/logout",{},{headers:{Authorization:this.TOKEN}}).then((function(){t.$store.dispatch("auth/logout"),t.$store.dispatch("uifront/reinit"),t.$store.dispatch("uiadmin/reinit"),t.$router.push("/")})).catch((function(){t.$store.dispatch("auth/logout"),t.$store.dispatch("uifront/reinit"),t.$store.dispatch("uiadmin/reinit"),t.$router.push("/")}))},isBentukPT:function(t){return this.$store.getters["uifront/getBentukPT"]==t}},computed:Object(s["a"])(Object(s["a"])({},Object(r["b"])("auth",{AUTHENTICATED:"Authenticated",ACCESS_TOKEN:"AccessToken",TOKEN:"Token",DEFAULT_ROLE:"DefaultRole",ROLE:"Role",CAN_ACCESS:"can",ATTRIBUTE_USER:"AttributeUser"})),{},{APP_NAME:function(){return"SIMAK v1"},photoUser:function(){var t,a=this.ATTRIBUTE_USER("foto");return t=""==a?this.$api.url+"/storage/images/users/no_photo.png":this.$api.url+"/"+a,t}}),watch:{loginTime:{handler:function(t){var a=this;t>=0?setTimeout((function(){a.loginTime=1==a.AUTHENTICATED?a.loginTime+1:-1}),1e3):(this.$store.dispatch("auth/logout"),this.$router.replace("/login"))},immediate:!0}}},l=o,c=i("2877"),d=i("6544"),u=i.n(d),v=i("40dc"),m=i("5bc1"),_=i("8212"),h=i("8336"),p=i("b0af"),b=i("99d9"),f=i("ce7e"),g=i("553a"),k=i("132d"),A=i("adda"),C=i("8860"),T=i("da13"),N=i("8270"),E=i("5d23"),S=i("34c3"),y=i("f6c4"),x=i("e449"),O=i("f774"),R=i("2fa4"),w=i("e0c7"),I=i("afd9"),j=i("2a7f"),$=Object(c["a"])(l,e,n,!1,null,null,null);a["a"]=$.exports;u()($,{VAppBar:v["a"],VAppBarNavIcon:m["a"],VAvatar:_["a"],VBtn:h["a"],VCard:p["a"],VCardText:b["c"],VDivider:f["a"],VFooter:g["a"],VIcon:k["a"],VImg:A["a"],VList:C["a"],VListItem:T["a"],VListItemAvatar:N["a"],VListItemContent:E["a"],VListItemIcon:S["a"],VListItemSubtitle:E["b"],VListItemTitle:E["c"],VMain:y["a"],VMenu:x["a"],VNavigationDrawer:O["a"],VSpacer:R["a"],VSubheader:w["a"],VSystemBar:I["a"],VToolbarTitle:j["b"]})}}]);