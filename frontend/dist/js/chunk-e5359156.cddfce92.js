(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e5359156"],{"0bc6":function(t,e,i){},cfd9:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("PerencanaanLayout")},s=[],r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("v-system-bar",{class:this.$store.getters["uiadmin/getTheme"]("V_SYSTEM_BAR_CSS_CLASS"),attrs:{app:"",dark:""}},[i("strong",[t._v("Hak Akses Sebagai :")]),t._v(" "+t._s(t.ROLE)+" ")]),i("v-app-bar",{attrs:{app:""}},[i("v-app-bar-nav-icon",{class:this.$store.getters["uiadmin/getTheme"]("V_APP_BAR_NAV_ICON_CSS_CLASS"),on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),i("v-toolbar-title",{staticClass:"headline clickable",on:{click:function(e){e.stopPropagation(),t.$router.push("/dashboard/"+t.$store.getters["auth/AccessToken"]).catch((function(t){}))}}},[i("span",{staticClass:"hidden-sm-and-down"},[t._v(t._s(t.APP_NAME))])]),i("v-spacer"),i("v-menu",{attrs:{"close-on-content-click":!0,origin:"center center",transition:"scale-transition","offset-y":!0,bottom:"",left:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[i("v-avatar",{attrs:{size:"30"}},[i("v-img",t._g({attrs:{src:t.photoUser}},a))],1)]}}])},[i("v-list",[i("v-list-item",[i("v-list-item-avatar",[i("v-img",{attrs:{src:t.photoUser}})],1),i("v-list-item-content",[i("v-list-item-title",{staticClass:"title"},[t._v(" "+t._s(t.ATTRIBUTE_USER("username"))+" ")]),i("v-list-item-subtitle",[t._v(" ["+t._s(t.DEFAULT_ROLE)+"] ")])],1)],1),i("v-divider"),i("v-list-item",{attrs:{to:"/system-users/profil"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-account")])],1),i("v-list-item-title",[t._v("Profil")])],1),i("v-divider"),i("v-list-item",{on:{click:function(e){return e.preventDefault(),t.logout(e)}}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-power")])],1),i("v-list-item-title",[t._v("Logout")])],1)],1)],1),i("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),i("v-app-bar-nav-icon",{on:{click:function(e){e.stopPropagation(),t.drawerRight=!t.drawerRight}}},[i("v-icon",[t._v("mdi-menu-open")])],1)],1),i("v-navigation-drawer",{class:this.$store.getters["uiadmin/getTheme"]("V_NAVIGATION_DRAWER_CSS_CLASS"),attrs:{width:"300",dark:"",temporary:t.temporaryleftsidebar,app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[i("v-list-item",[i("v-list-item-avatar",[i("v-img",{attrs:{src:t.photoUser},on:{click:function(e){return e.stopPropagation(),t.toProfile(e)}}})],1),i("v-list-item-content",[i("v-list-item-title",{staticClass:"title"},[t._v(" "+t._s(t.ATTRIBUTE_USER("username"))+" ")]),i("v-list-item-subtitle",[t._v(" ["+t._s(t.DEFAULT_ROLE)+"] ")])],1)],1),i("v-divider"),i("v-list",{attrs:{expand:""}},[t.CAN_ACCESS("PERENCANAAN-GROUP")?i("v-list-item",{class:this.$store.getters["uiadmin/getTheme"]("V_LIST_ITEM_BOARD_CSS_CLASS"),attrs:{to:{path:"/perencanaan"},link:"",color:this.$store.getters["uiadmin/getTheme"]("V_LIST_ITEM_BOARD_COLOR")}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-home-floor-b")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v("BOARD PERENCANAAN")])],1)],1):t._e(),i("v-subheader",[t._v("RENSTRA P.T")]),i("v-list-item",{attrs:{link:"",to:"/dmaster/renstra/visi"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-stairs-up")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" VISI ")])],1)],1),i("v-list-item",{attrs:{link:"",to:"/perencanaan/renstra/misi"}},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-stairs-up")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v(" MISI ")])],1)],1)],1)],1),t.showrightsidebar?i("v-navigation-drawer",{attrs:{width:"300",app:"",fixed:"",right:"",temporary:""},model:{value:t.drawerRight,callback:function(e){t.drawerRight=e},expression:"drawerRight"}},[i("v-list",{attrs:{dense:""}},[i("v-list-item",[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-menu-open")])],1),i("v-list-item-content",[i("v-list-item-title",{staticClass:"title"},[t._v(" OPTIONS ")])],1)],1),i("v-divider"),i("v-list-item",{staticClass:"teal lighten-5 mb-5"},[i("v-list-item-icon",{staticClass:"mr-2"},[i("v-icon",[t._v("mdi-filter")])],1),i("v-list-item-content",[i("v-list-item-title",[t._v("FILTER")])],1)],1),t._t("filtersidebar")],2)],1):t._e(),i("v-main",{staticClass:"mx-4 mb-4"},[t._t("default")],2)],1)},n=[],o=i("5530"),l=(i("5319"),i("ac1f"),i("2f62")),c={name:"PerencanaanLayout.vue",props:{showrightsidebar:{type:Boolean,default:!0},temporaryleftsidebar:{type:Boolean,default:!1}},data:function(){return{loginTime:0,drawer:null,drawerRight:null}},methods:{logout:function(){var t=this;this.loginTime=0,this.$ajax.post("/auth/logout",{},{headers:{Authorization:this.TOKEN}}).then((function(){t.$store.dispatch("auth/logout"),t.$store.dispatch("uifront/reinit"),t.$store.dispatch("uiadmin/reinit"),t.$router.push("/")})).catch((function(){t.$store.dispatch("auth/logout"),t.$store.dispatch("uifront/reinit"),t.$store.dispatch("uiadmin/reinit"),t.$router.push("/")}))},isBentukPT:function(t){return this.$store.getters["uifront/getBentukPT"]==t}},computed:Object(o["a"])(Object(o["a"])({},Object(l["b"])("auth",{AUTHENTICATED:"Authenticated",ACCESS_TOKEN:"AccessToken",TOKEN:"Token",DEFAULT_ROLE:"DefaultRole",ROLE:"Role",CAN_ACCESS:"can",ATTRIBUTE_USER:"AttributeUser"})),{},{APP_NAME:function(){return"SIMAK v1"},photoUser:function(){var t,e=this.ATTRIBUTE_USER("foto");return t=""==e?this.$api.storageURL+"/storage/images/users/no_photo.png":this.$api.storageURL+"/"+e,t}}),watch:{loginTime:{handler:function(t){var e=this;t>=0?setTimeout((function(){e.loginTime=1==e.AUTHENTICATED?e.loginTime+1:-1}),1e3):(this.$store.dispatch("auth/logout"),this.$router.replace("/login"))},immediate:!0}}},v=c,u=i("2877"),m=i("6544"),d=i.n(m),h=i("40dc"),p=i("5bc1"),_=i("8212"),f=i("ce7e"),g=i("132d"),T=i("adda"),A=i("8860"),b=i("da13"),S=i("8270"),C=i("5d23"),E=i("34c3"),R=i("f6c4"),I=i("e449"),L=i("f774"),w=i("2fa4"),V=i("e0c7"),$=i("afd9"),k=i("2a7f"),O=Object(u["a"])(v,r,n,!1,null,null,null),N=O.exports;d()(O,{VAppBar:h["a"],VAppBarNavIcon:p["a"],VAvatar:_["a"],VDivider:f["a"],VIcon:g["a"],VImg:T["a"],VList:A["a"],VListItem:b["a"],VListItemAvatar:S["a"],VListItemContent:C["a"],VListItemIcon:E["a"],VListItemSubtitle:C["b"],VListItemTitle:C["c"],VMain:R["a"],VMenu:I["a"],VNavigationDrawer:L["a"],VSpacer:w["a"],VSubheader:V["a"],VSystemBar:$["a"],VToolbarTitle:k["b"]});var P={name:"Perencanaan",components:{PerencanaanLayout:N}},U=P,B=Object(u["a"])(U,a,s,!1,null,null,null);e["default"]=B.exports},e0c7:function(t,e,i){"use strict";var a=i("5530"),s=(i("0bc6"),i("7560")),r=i("58df");e["a"]=Object(r["a"])(s["a"]).extend({name:"v-subheader",props:{inset:Boolean},render:function(t){return t("div",{staticClass:"v-subheader",class:Object(a["a"])({"v-subheader--inset":this.inset},this.themeClasses),attrs:this.$attrs,on:this.$listeners},this.$slots.default)}})}}]);