(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-291bce3c"],{"4bd4":function(t,e,a){"use strict";a("4de4"),a("7db0"),a("caad"),a("07ac"),a("2532"),a("159b");var i=a("5530"),r=a("58df"),n=a("7e2b"),o=a("3206");e["a"]=Object(r["a"])(n["a"],Object(o["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,a=function(t){return t.$watch("hasError",(function(a){e.$set(e.errorBag,t._uid,a)}),{immediate:!0})},i={_uid:t._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?i.shouldValidate=t.$watch("shouldValidate",(function(r){r&&(e.errorBag.hasOwnProperty(t._uid)||(i.valid=a(t)))})):i.valid=a(t),i},validate:function(){return 0===this.inputs.filter((function(t){return!t.validate(!0)})).length},reset:function(){this.inputs.forEach((function(t){return t.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(t){return t.resetValidation()})),this.resetErrorBag()},register:function(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister:function(t){var e=this.inputs.find((function(e){return e._uid===t._uid}));if(e){var a=this.watchers.find((function(t){return t._uid===e._uid}));a&&(a.valid(),a.shouldValidate()),this.watchers=this.watchers.filter((function(t){return t._uid!==e._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object(i["a"])({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},"553a":function(t,e,a){"use strict";a("a9e3"),a("c7cd");var i=a("5530"),r=(a("b5b6"),a("8dd9")),n=a("3a66"),o=a("d10f"),s=a("58df"),c=a("80d2");e["a"]=Object(s["a"])(r["a"],Object(n["a"])("footer",["height","inset"]),o["a"]).extend({name:"v-footer",props:{height:{default:"auto",type:[Number,String]},inset:Boolean,padless:Boolean,tag:{type:String,default:"footer"}},computed:{applicationProperty:function(){return this.inset?"insetFooter":"footer"},classes:function(){return Object(i["a"])(Object(i["a"])({},r["a"].options.computed.classes.call(this)),{},{"v-footer--absolute":this.absolute,"v-footer--fixed":!this.absolute&&(this.app||this.fixed),"v-footer--padless":this.padless,"v-footer--inset":this.inset})},computedBottom:function(){if(this.isPositioned)return this.app?this.$vuetify.application.bottom:0},computedLeft:function(){if(this.isPositioned)return this.app&&this.inset?this.$vuetify.application.left:0},computedRight:function(){if(this.isPositioned)return this.app&&this.inset?this.$vuetify.application.right:0},isPositioned:function(){return Boolean(this.absolute||this.fixed||this.app)},styles:function(){var t=parseInt(this.height);return Object(i["a"])(Object(i["a"])({},r["a"].options.computed.styles.call(this)),{},{height:isNaN(t)?t:Object(c["g"])(t),left:Object(c["g"])(this.computedLeft),right:Object(c["g"])(this.computedRight),bottom:Object(c["g"])(this.computedBottom)})}},methods:{updateApplication:function(){var t=parseInt(this.height);return isNaN(t)?this.$el?this.$el.clientHeight:0:t}},render:function(t){var e=this.setBackgroundColor(this.color,{staticClass:"v-footer",class:this.classes,style:this.styles});return t(this.tag,e,this.$slots.default)}})},"632e":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-app-bar",{attrs:{app:"",elevation:"0"}},[a("v-toolbar-title",[a("span",{staticClass:"hidden-sm-and-down"},[t._v(t._s(t.namaPTAlias))])]),a("v-spacer"),a("v-btn",{staticClass:"mr-2",attrs:{to:"/",color:"primary",text:"",large:""}},[t._v(" Home ")]),a("v-btn",{staticClass:"mr-2",attrs:{to:"/blog/cara-pendaftaran",color:"primary",text:"",large:""}},[t._v(" CARA PENDAFTARAN ")]),a("v-btn",{staticClass:"mr-2",attrs:{to:"/pmb",color:"primary",text:"",large:""}},[t._v(" PENDAFTARAN ")]),a("v-btn",{attrs:{to:"/login",color:"primary",text:"",large:""}},[t._v(" LOGIN ")])],1),a("v-main",[t._t("default")],2),a("v-footer",{attrs:{app:"",padless:"",fixed:"",dark:""}},[a("v-card",{staticClass:"flex",attrs:{flat:"",tile:""}},[a("v-divider"),a("v-card-text",{staticClass:"py-2 white--text text-center"},[a("strong",[t._v("SIMAK (2021-2020)")]),t._v(" dikembangkan oleh TIM IT STMIK Bandung Bali "),a("v-btn",{attrs:{dark:"",icon:"",href:"https://github.com/stmikbdgbali/simak"}},[a("v-icon",[t._v("mdi-github")])],1)],1)],1)],1)],1)},r=[],n=a("5530"),o=a("2f62"),s={name:"FrontLayout",created:function(){this.$store.dispatch("uifront/init",this.$ajax)},computed:Object(n["a"])({},Object(o["b"])("uifront",{namaPTAlias:"getNamaPTAlias"}))},c=s,d=a("2877"),u=a("6544"),l=a.n(u),f=a("40dc"),h=a("8336"),m=a("b0af"),p=a("99d9"),v=a("ce7e"),b=a("553a"),g=a("132d"),k=a("f6c4"),_=a("2fa4"),x=a("2a7f"),w=Object(d["a"])(c,i,r,!1,null,null,null);e["a"]=w.exports;l()(w,{VAppBar:f["a"],VBtn:h["a"],VCard:m["a"],VCardText:p["c"],VDivider:v["a"],VFooter:b["a"],VIcon:g["a"],VMain:k["a"],VSpacer:_["a"],VToolbarTitle:x["a"]})},"905d":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("FrontLayout",[a("v-container",{staticClass:"fill-height",attrs:{fluid:""}},[a("v-row",{attrs:{align:"center",justify:"center","no-gutters":""}},[a("v-col",{attrs:{xs:"12",sm:"6",md:"4"}},[a("h1",{staticClass:"text-center display-1 font-weight-black primary--text"},[t._v(" PENDAFTARAN MAHASISWA BARU ")]),a("h4",{staticClass:"text-center title font-weight-black primary--text"},[t._v(" TAHUN AKADEMIK "+t._s(t._f("formatTA")(t.tahunPendaftaran))+" ")]),a("v-form",{ref:"frmpendaftaran",attrs:{"lazy-validation":""},model:{value:t.form_valid,callback:function(e){t.form_valid=e},expression:"form_valid"}},[a("v-card",{attrs:{outlined:""}},[a("v-card-text",[a("v-text-field",{attrs:{label:"NAMA LENGKAP",rules:t.rule_name,outlined:"",dense:""},model:{value:t.formdata.name,callback:function(e){t.$set(t.formdata,"name",e)},expression:"formdata.name"}}),a("v-text-field",{attrs:{label:"NOMOR HP (ex: +628123456789)",rules:t.rule_nomorhp,outlined:"",dense:""},model:{value:t.formdata.nomor_hp,callback:function(e){t.$set(t.formdata,"nomor_hp",e)},expression:"formdata.nomor_hp"}}),a("v-text-field",{attrs:{label:"EMAIL",rules:t.rule_email,outlined:"",dense:""},model:{value:t.formdata.email,callback:function(e){t.$set(t.formdata,"email",e)},expression:"formdata.email"}}),"universitas"==t.$store.getters["uifront/getBentukPT"]?a("v-select",{attrs:{label:"FAKULTAS",outlined:"",rules:t.rule_fakultas,items:t.daftar_fakultas,"item-text":"nama_fakultas","item-value":"kode_fakultas",loading:t.btnLoadingFakultas},model:{value:t.kode_fakultas,callback:function(e){t.kode_fakultas=e},expression:"kode_fakultas"}}):t._e(),a("v-select",{attrs:{label:"PROGRAM STUDI",items:t.daftar_prodi,"item-text":"nama_prodi2","item-value":"id",rules:t.rule_prodi,outlined:""},model:{value:t.prodi_id,callback:function(e){t.prodi_id=e},expression:"prodi_id"}}),a("v-text-field",{attrs:{label:"USERNAME",rules:t.rule_username,outlined:"",dense:""},model:{value:t.formdata.username,callback:function(e){t.$set(t.formdata,"username",e)},expression:"formdata.username"}}),a("v-text-field",{attrs:{label:"PASSWORD",type:"password",rules:t.rule_password,outlined:"",dense:""},model:{value:t.formdata.password,callback:function(e){t.$set(t.formdata,"password",e)},expression:"formdata.password"}}),t.formdata.captcha_response.length<=0?a("v-alert",{staticClass:"mb-0",attrs:{color:"error",text:""}},[t._v(" Mohon dicentang Google Captcha ")]):t._e()],1),a("v-card-actions",{staticClass:"justify-center"},[a("vue-recaptcha",{ref:"recaptcha",attrs:{sitekey:t.sitekey,loadRecaptchaScript:!0},on:{verify:t.onVerify,expired:t.onExpired}})],1),a("v-card-actions",{staticClass:"justify-center"},[a("v-btn",{attrs:{color:"primary",disabled:t.btnLoading,block:""},on:{click:t.save}},[t._v(" DAFTAR ")])],1)],1)],1),a("v-dialog",{attrs:{"max-width":"500px",persistent:""},model:{value:t.dialogkonfirmasiemail,callback:function(e){t.dialogkonfirmasiemail=e},expression:"dialogkonfirmasiemail"}},[a("v-form",{ref:"frmkonfirmasi",attrs:{"lazy-validation":""},model:{value:t.form_valid,callback:function(e){t.form_valid=e},expression:"form_valid"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"headline"},[t._v(" Konfirmasi Email ")])]),a("v-card-text",[a("v-alert",{attrs:{type:"success"}},[t._v(" Proses pendaftaran berhasil, silahkan cek email Anda ( "+t._s(t.formkonfirmasi.email)+" ) untuk mendapatkan kode aktivasi atau hubungi panitia PMB jika kode tidak masuk ke email. ")]),a("v-text-field",{attrs:{label:"CODE",outlined:"",rules:t.rule_code},model:{value:t.formkonfirmasi.code,callback:function(e){t.$set(t.formkonfirmasi,"code",e)},expression:"formkonfirmasi.code"}})],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(e){return e.stopPropagation(),t.closedialogfrm(e)}}},[t._v(" KELUAR ")]),a("v-btn",{attrs:{color:"blue darken-1",text:"",disabled:t.btnLoading},on:{click:function(e){return e.stopPropagation(),t.konfirmasi(e)}}},[t._v(" KONFIRMASI ")])],1)],1)],1)],1)],1)],1)],1)],1)},r=[],n=(a("b0c0"),a("ac1f"),a("5319"),a("5530")),o=(a("96cf"),a("1da1")),s=a("2f62");function c(){return c=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(t[i]=a[i])}return t},c.apply(this,arguments)}var d=function(){var t=!1,e=[],a=function(a){if(!t){t=!0;for(var i=0,r=e.length;i<r;i++)e[i](a)}},i=function(a){t?a():e.push(a)},r={resolved:function(){return t},resolve:a,promise:{then:i}};return r},u=Object.prototype.hasOwnProperty;function l(){var t=d();return{notify:function(){t.resolve()},wait:function(){return t.promise},render:function(t,e,a){this.wait().then((function(){a(window.grecaptcha.render(t,e))}))},reset:function(t){"undefined"!==typeof t&&(this.assertLoaded(),this.wait().then((function(){return window.grecaptcha.reset(t)})))},execute:function(t){"undefined"!==typeof t&&(this.assertLoaded(),this.wait().then((function(){return window.grecaptcha.execute(t)})))},checkRecaptchaLoad:function(){u.call(window,"grecaptcha")&&u.call(window.grecaptcha,"render")&&this.notify()},assertLoaded:function(){if(!t.resolved())throw new Error("ReCAPTCHA has not been loaded")}}}var f=l();"undefined"!==typeof window&&(window.vueRecaptchaApiLoaded=f.notify);var h={name:"VueRecaptcha",props:{sitekey:{type:String,required:!0},theme:{type:String},badge:{type:String},type:{type:String},size:{type:String},tabindex:{type:String},loadRecaptchaScript:{type:Boolean,default:!1},recaptchaScriptId:{type:String,default:"__RECAPTCHA_SCRIPT"},recaptchaHost:{type:String,default:"www.google.com"},language:{type:String,default:""}},beforeMount:function(){if(this.loadRecaptchaScript&&!document.getElementById(this.recaptchaScriptId)){var t=document.createElement("script");t.id=this.recaptchaScriptId,t.src="https://"+this.recaptchaHost+"/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit&hl="+this.language,t.async=!0,t.defer=!0,document.head.appendChild(t)}},mounted:function(){var t=this;f.checkRecaptchaLoad();var e=c({},this.$props,{callback:this.emitVerify,"expired-callback":this.emitExpired,"error-callback":this.emitError}),a=this.$slots["default"]?this.$el.children[0]:this.$el;f.render(a,e,(function(e){t.$widgetId=e,t.$emit("render",e)}))},methods:{reset:function(){f.reset(this.$widgetId)},execute:function(){f.execute(this.$widgetId)},emitVerify:function(t){this.$emit("verify",t)},emitExpired:function(){this.$emit("expired")},emitError:function(){this.$emit("error")}},render:function(t){return t("div",{},this.$slots["default"])}},m=h,p=a("632e"),v={name:"PMB",created:function(){this.initialize()},data:function(){return{btnLoading:!1,btnLoadingFakultas:!1,form_valid:!0,dialogkonfirmasiemail:!1,daftar_fakultas:[],kode_fakultas:"",daftar_prodi:[],prodi_id:"",formdata:{name:"",email:"",nomor_hp:"",username:"",password:"",captcha_response:""},formdefault:{name:"",email:"",nomor_hp:"",username:"",password:"",captcha_response:""},formkonfirmasi:{email:"",code:""},rule_name:[function(t){return!!t||"Nama Mahasiswa mohon untuk diisi !!!"},function(t){return/^[A-Za-z\s\\,\\.]*$/.test(t)||"Nama Mahasiswa hanya boleh string dan spasi"}],rule_nomorhp:[function(t){return!!t||"Nomor HP mohon untuk diisi !!!"},function(t){return/^\+[1-9]{1}[0-9]{1,14}$/.test(t)||"Nomor HP hanya boleh angka dan gunakan kode negara di depan seperti +6281214553388"}],rule_email:[function(t){return!!t||"Email mohon untuk diisi !!!"},function(t){return/.+@.+\..+/.test(t)||"Format E-mail mohon di isi dengan benar"}],rule_fakultas:[function(t){return!!t||"Fakultas mohon untuk dipilih !!!"}],rule_prodi:[function(t){return!!t||"Program studi mohon untuk dipilih !!!"}],rule_username:[function(t){return!!t||"Username mohon untuk diisi !!!"}],rule_password:[function(t){return!!t||"Password mohon untuk diisi !!!"}],rule_code:[function(t){return/^[0-9]+$/.test(t)||"Code hanya boleh angka"}]}},methods:{initialize:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if("universitas"!=this.$store.getters["uifront/getBentukPT"]){t.next=5;break}return t.next=3,this.$ajax.get("/datamaster/fakultas").then((function(t){var a=t.data;e.daftar_fakultas=a.fakultas}));case 3:t.next=7;break;case 5:return t.next=7,this.$ajax.get("/datamaster/programstudi").then((function(t){var a=t.data;e.daftar_prodi=a.prodi}));case 7:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),save:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!this.$refs.frmpendaftaran.validate()){t.next=4;break}return this.btnLoading=!0,t.next=4,this.$ajax.post("/spmb/pmb/store",{name:this.formdata.name,email:this.formdata.email,nomor_hp:this.formdata.nomor_hp,username:this.formdata.username,prodi_id:this.prodi_id,password:this.formdata.password,captcha_response:this.formdata.captcha_response}).then((function(t){var a=t.data;e.formkonfirmasi.email=a.email,e.formkonfirmasi.code=a.code,e.btnLoading=!1,e.dialogkonfirmasiemail=!0,e.form_valid=!0,e.$refs.frmpendaftaran.reset(),e.formdata=Object.assign({},e.formdefault)})).catch((function(){e.btnLoading=!1}));case 4:this.resetRecaptcha();case 5:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),konfirmasi:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!this.$refs.frmkonfirmasi.validate()){t.next=8;break}return this.btnLoading=!0,t.next=4,this.$ajax.post("/spmb/pmb/konfirmasi",{email:this.formkonfirmasi.email,code:this.formkonfirmasi.code}).then((function(){e.dialogkonfirmasiemail=!1,e.btnLoading=!1})).catch((function(){e.btnLoading=!1}));case 4:this.form_valid=!0,this.$refs.frmkonfirmasi.reset(),this.frmkonfirmasi=Object.assign({},{email:"",code:""}),this.$router.replace("/login");case 8:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),onVerify:function(t){this.formdata.captcha_response=t},onExpired:function(){this.formdata.captcha_response=""},resetRecaptcha:function(){this.$refs.recaptcha.reset(),this.formdata.captcha_response=""},closedialogfrm:function(){var t=this;this.dialogkonfirmasiemail=!1,setTimeout((function(){t.frmpendaftaran=Object.assign({},t.formdefault),t.$refs.frmpendaftaran.reset()}),300)}},computed:Object(n["a"])({},Object(s["b"])("uifront",{sitekey:"getCaptchaKey",tahunPendaftaran:"getTahunPendaftaran"})),watch:{kode_fakultas:function(t){var e=this;null!=t&&""!=t&&(this.btnLoadingFakultas=!0,this.$ajax.get("/datamaster/fakultas/"+t+"/programstudi").then((function(t){var a=t.data;e.daftar_prodi=a.programstudi,e.btnLoadingFakultas=!1})))}},components:{FrontLayout:p["a"],VueRecaptcha:m}},b=v,g=a("2877"),k=a("6544"),_=a.n(k),x=a("0798"),w=a("8336"),y=a("b0af"),$=a("99d9"),A=a("62ad"),j=a("a523"),O=a("169a"),V=a("4bd4"),R=a("0fd9"),C=a("b974"),P=a("2fa4"),B=a("8654"),E=Object(g["a"])(b,i,r,!1,null,null,null);e["default"]=E.exports;_()(E,{VAlert:x["a"],VBtn:w["a"],VCard:y["a"],VCardActions:$["a"],VCardText:$["c"],VCardTitle:$["d"],VCol:A["a"],VContainer:j["a"],VDialog:O["a"],VForm:V["a"],VRow:R["a"],VSelect:C["a"],VSpacer:P["a"],VTextField:B["a"]})},b5b6:function(t,e,a){}}]);