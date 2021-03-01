<template>
    <AkademikLayout :showrightsidebar="false" :temporaryleftsidebar="true">
        <ModuleHeader>
            <template v-slot:icon>
                mdi-book-open-outline
            </template>
            <template v-slot:name>
                KONVERSI NILAI 
            </template>
            <template v-slot:subtitle>
                TAHUN PENDAFTARAN {{tahun_pendaftaran}} - {{nama_prodi}}
            </template>
            <template v-slot:breadcrumbs>
                <v-breadcrumbs :items="breadcrumbs" class="pa-0">
                    <template v-slot:divider>
                        <v-icon>mdi-chevron-right</v-icon>
                    </template>
                </v-breadcrumbs>
            </template>
            <template v-slot:desc>
                <v-alert                                        
                    color="cyan"
                    border="left"                    
                    colored-border
                    type="info"
                    >
                    Halaman ini digunakan untuk mengelola konversi nilai mahasiswa pindahan/ampulan 
                </v-alert>
            </template>
        </ModuleHeader>                
        <v-container fluid v-if="data_konversi.id">                         
            <v-row class="mb-4" no-gutters>
                <v-col cols="12">
                    <v-card color="grey lighten-4">
                        <v-toolbar elevation="2"> 
                            <v-toolbar-title>DATA KONVERSI</v-toolbar-title>
                            <v-divider
                                class="mx-4"
                                inset
                                vertical
                            ></v-divider>
                            <v-spacer></v-spacer>
                            <v-icon                
                                @click.stop="$router.push('/akademik/nilai/konversi')">
                                mdi-close-thick
                            </v-icon>
                        </v-toolbar>
                        <v-card-text>
                            <v-row>
                                <v-col xs="12" sm="12" md="6">
                                    <v-card flat>
                                        <v-card-title>ID KONVERSI:</v-card-title>  
                                        <v-card-subtitle>
                                            {{data_konversi.id}}
                                        </v-card-subtitle>
                                    </v-card>
                                </v-col>
                                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly"/>
                                <v-col xs="12" sm="12" md="6">
                                    <v-card flat>
                                        <v-card-title>TAHUN MATAKULIAH :</v-card-title>
                                        <v-card-subtitle>
                                            {{data_konversi.tahun}}
                                        </v-card-subtitle>
                                    </v-card>
                                </v-col>
                                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly"/>
                            </v-row>
                            <v-row>
                                <v-col xs="12" sm="12" md="6">
                                    <v-card flat>
                                        <v-card-title>NIM ASAL / NIM SISTEM:</v-card-title>  
                                        <v-card-subtitle>
                                            {{data_konversi.nim_asal}} / {{data_konversi.nim==null?'N.A':data_konversi.nim}} 
                                        </v-card-subtitle>
                                    </v-card>
                                </v-col>
                                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly"/>
                                <v-col xs="12" sm="12" md="6">
                                    <v-card flat>
                                        <v-card-title>NAMA P.T ASAL:</v-card-title>
                                        <v-card-subtitle>
                                            [{{data_konversi.kode_pt_asal}}] / {{data_konversi.nama_pt_asal}}
                                        </v-card-subtitle>
                                    </v-card>
                                </v-col>
                                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly"/>
                            </v-row>
                            <v-row>
                                <v-col xs="12" sm="12" md="6">
                                    <v-card flat>
                                        <v-card-title>NAMA MAHASISWA:</v-card-title>  
                                        <v-card-subtitle>
                                            {{data_konversi.nama_mhs}}
                                        </v-card-subtitle>
                                    </v-card>
                                </v-col>
                                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly"/>
                                <v-col xs="12" sm="12" md="6">
                                    <v-card flat>
                                        <v-card-title>PROGRAM STUDI ASAL:</v-card-title>  
                                        <v-card-subtitle>
                                            [{{data_konversi.kode_ps_asal}}] / {{data_konversi.nama_ps_asal}}
                                        </v-card-subtitle>
                                    </v-card>
                                </v-col>
                                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly"/>
                            </v-row>
                            <v-row>
                                <v-col xs="12" sm="12" md="6">
                                    <v-card flat>
                                        <v-card-title>ALAMAT:</v-card-title>  
                                        <v-card-subtitle>
                                            {{data_konversi.alamat}}
                                        </v-card-subtitle>
                                    </v-card>
                                </v-col>
                                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly"/>
                                <v-col xs="12" sm="12" md="6">
                                    <v-card flat>
                                        <v-card-title>JUMLAH YANG TERKONVERSI:</v-card-title>  
                                        <v-card-subtitle>
                                            Matakuliah : {{totalMatkul}} / SKS: {{totalSKS}}
                                        </v-card-subtitle>
                                    </v-card>
                                </v-col>
                                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly"/>
                            </v-row>
                            <v-row>
                                <v-col xs="12" sm="12" md="6">
                                    <v-card flat>
                                        <v-card-title>NO. TELEPON:</v-card-title>  
                                        <v-card-subtitle>
                                            {{data_konversi.no_telp}}
                                        </v-card-subtitle>
                                    </v-card>
                                </v-col>
                                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly"/>
                                <v-col xs="12" sm="12" md="6">
                                    <v-card flat>
                                        <v-card-title>CREATED/UPDATED:</v-card-title>  
                                        <v-card-subtitle>
                                            {{$date(data_konversi.created_at).format('DD/MM/YYYY HH:mm')}} / {{$date(data_konversi.updated_at).format('DD/MM/YYYY HH:mm')}}
                                        </v-card-subtitle>
                                    </v-card>
                                </v-col>
                                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly"/>
                            </v-row>                            
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row v-if="data_konversi.nim">
                <v-col cols="12">
                    <v-card outlined>
                        <v-expand-transition>
                            <v-list>
                                <template>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                {{data_konversi.user_id}}
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                                <strong>USER ID</strong>
                                            </v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </template>
                                <template>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                {{data_konversi.nim}}
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                                <strong>NIM</strong>
                                            </v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </template>
                            </v-list>
                        </v-expand-transition>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                class="warning"                                                                
                                @click="putuskan"
                            >
                                Putuskan
                                <v-icon right>
                                    mdi-close-network-outline
                                </v-icon>
                            </v-btn>
                        </v-card-actions>                    
                    </v-card>
                </v-col>
            </v-row>
            <v-row v-else>
                <v-col cols="12">
                    <v-card outlined>
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div class="overline mb-1">
                                    PASANGKAN NIM KE DATA KONVERSI INI
                                </div>                                
                                <v-list-item-subtitle>                                    
                                    <v-autocomplete
                                        v-model="data_mhs"
                                        :items="entries"
                                        :loading="isLoading"
                                        :search-input.sync="search"     
                                        cache-items                                        
                                        dense                                                                                                                
                                        item-text="nama_mhs_alias"
                                        item-value="user_id"       
                                        hide-no-data                                 
                                        hide-details                                                                              
                                        prepend-icon="mdi-database-search"
                                        return-object
                                        ref="ref_data_mhs"
                                    ></v-autocomplete>
                                </v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-avatar
                                tile
                                size="80"
                                color="grey"
                            >
                                <v-icon>mdi-account</v-icon>
                            </v-list-item-avatar>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-expand-transition>
                            <v-list v-if="data_mhs">
                                <template v-for="(field, i) in fields">                                    
                                <v-list-item :key="i" v-if="field.key!='foto' && field.key!='nama_mhs_alias'">
                                    <v-list-item-content>
                                        <v-list-item-title>                                            
                                            {{field.value}}
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            <strong>{{field_alias(field.key)}}</strong>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                </template>
                            </v-list>
                        </v-expand-transition>  
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                :disabled="!data_mhs"                                
                                @click="pasangkan"
                            >
                                Pasangkan
                                <v-icon right>
                                    mdi-forward
                                </v-icon>
                            </v-btn>
                            <v-btn
                                :disabled="!data_mhs"                                
                                @click="clearDataMhs"
                            >
                                Clear
                                <v-icon right>
                                    mdi-close-circle
                                </v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>                    
                </v-col>
            </v-row>
            <v-row class="mb-4" no-gutters>
                <v-col cols="12">
                    <v-data-table                            
                        :headers="headers"
                        :items="datatable"                        
                        item-key="id"                                                                        
                        :disable-pagination="true"
                        :hide-default-footer="true"                        
                        class="elevation-1"
                        :loading="datatableLoading"
                        loading-text="Loading... Please wait">
                        <template v-slot:top>
                            <v-toolbar flat color="white">
                                <v-toolbar-title>KURIKULUM MATAKULIAH T.A {{tahun_pendaftaran}}</v-toolbar-title>
                                <v-divider
                                    class="mx-4"
                                    inset
                                    vertical
                                ></v-divider>
                                <v-spacer></v-spacer>                                  
                            </v-toolbar>
                        </template>     
                        <template v-slot:item.kmatkul_asal="{item}">                                
                            {{item.kmatkul_asal==null ? 'N.A':item.kmatkul_asal}}
                        </template>                                                                                
                        <template v-slot:item.matkul_asal="{item}">                                
                            {{item.matkul_asal==null ? 'N.A':item.matkul_asal}}
                        </template>                                                                                
                        <template v-slot:item.sks_asal="{item}">                                
                            {{item.sks_asal==null ? 'N.A':item.sks_asal}}
                        </template>                                                                  
                        <template v-slot:item.n_kual="{item}">                                
                            {{item.n_kual==null ? 'N.A':item.n_kual}}
                        </template>                                                                                                                                                                      
                        <template v-slot:no-data>
                            Data belum tersedia
                        </template>   
                        <template v-slot:body.append v-if="datatable.length > 0">
                            <tr class="grey lighten-4 font-weight-black">
                                <td class="text-right" colspan="2">TOTAL SKS</td>
                                <td colspan="6">{{totalSKS}}</td>                                 
                            </tr>
                            <tr class="grey lighten-4 font-weight-black">
                                <td class="text-right" colspan="2">TOTAL MATAKULIAH</td>
                                <td colspan="6">{{totalMatkul}}</td>                                 
                            </tr>
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>            
        </v-container>        
        <v-dialog v-model="dialogprintpdf" max-width="500px" persistent>                
            <v-card>
                <v-card-title>
                    <span class="headline">Print to PDF</span>
                </v-card-title>
                <v-card-text>
                    <v-btn
                        color="green"
                        text
                        :href="$api.url+'/'+file_pdf">                            
                        Download
                    </v-btn>                           
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click.stop="closedialogprintpdf">CLOSE</v-btn>                            
                </v-card-actions>
            </v-card>            
        </v-dialog>
    </AkademikLayout>
</template>
<script>
import AkademikLayout from '@/views/layouts/AkademikLayout';
import ModuleHeader from '@/components/ModuleHeader';
export default {
    name: 'NilaiKonversiDetail',
    created () {
        this.nilai_konversi_id=this.$route.params.nilai_konversi_id;        
        this.breadcrumbs = [
            {
                text:'HOME',
                disabled:false,
                href:'/dashboard/'+this.$store.getters['auth/AccessToken']
            },
            {
                text:'AKADEMIK',
                disabled:false,
                href:'/akademik'
            },
            {
                text:'NILAI',
                disabled:false,
                href:'#'
            },            
            {
                text:'KONVERSI MAHASISWA PINDAHAN/AMPULAN',
                disabled:false,
                href:'/akademik/nilai/konversi'
            },
            {
                text:'DETAIL',
                disabled:true,
                href:'#'
            }
        ];
        let prodi_id=this.$store.getters['uiadmin/getProdiID'];
        this.prodi_id=prodi_id;
        this.nama_prodi=this.$store.getters['uiadmin/getProdiName'](prodi_id);
        this.tahun_pendaftaran=this.$store.getters['uiadmin/getTahunPendaftaran'];                
        this.initialize()
    },  
    data: () => ({ 
        nilai_konversi_id:null,        
        prodi_id:null,
        nama_prodi:null,
        tahun_pendaftaran:null,

        btnLoading:false,
        btnLoadingTable:false,
        datatableLoading:false,        
        datatable:[],      
        headers: [            
            { text: 'KODE', value: 'kmatkul', sortable:false, width:100  },               
            { text: 'NAMA', value: 'nmatkul', sortable:false, width:250  },               
            { text: 'SKS', value: 'sks',sortable:false, width:70 },                           
            { text: 'SMT', value: 'semester',sortable:true,width:70, },                           
            { text: 'KODE MATKUL ASAL', value: 'kmatkul_asal',sortable:false,width:120 },                           
            { text: 'MATAKULIAH ASAL', value: 'matkul_asal',sortable:false,width:170 },                           
            { text: 'SKS ASAL', value: 'sks_asal',sortable:false,width:70},                           
            { text: 'NILAI', value: 'n_kual',sortable:false,width:70},                                       
        ],  

        dialogprintpdf:false,
        file_pdf:null,

        form_valid:true,   
        daftar_jenjang:[],                        
        data_konversi:{
            'id':null,
            'user_id':'',
            'nim':'',
            'nama_mhs':'',
            'alamat':'', 
            'no_telp':'',         
            'nim_asal':'', 
            'kode_jenjang':'', 
            'kode_pt_asal':'',
            'nama_pt_asal':'',
            'kode_ps_asal':'',
            'nama_ps_asal':'',
            'tahun':'',
            
            'kjur':'',
            'perpanjangan':'',   
        },        
        
        //profil mahasiswa        
        entries:[],
        isLoading:false,
        data_mhs:null,
        search:null
    }),
    methods: {        
        initialize:async function () 
        {      
            this.datatableLoading=true;
            await this.$ajax.get('/akademik/nilai/konversi/'+this.nilai_konversi_id,            
            {
                headers: {
                    Authorization:this.$store.getters['auth/Token']
                }
            }).then(({data})=>{               
                this.datatable = data.nilai_konversi;
                this.data_konversi = data.data_konversi;
                this.datatableLoading=false;
            }).catch(()=>{
                this.datatableLoading=false;
            });         
            await this.$ajax.get('/datamaster/programstudi/jenjangstudi').then(({data})=>{
                this.daftar_jenjang=data.jenjangstudi;
            }); 
        },   
        save:async function () {
            if (this.$refs.frmdata.validate())
            {
                this.btnLoading=true;  

                var daftar_nilai=[];
                this.datatable.forEach(item => {
                    if (item.kmatkul_asal && item.matkul_asal && item.sks_asal && item.n_kual)
                    {
                        daftar_nilai.push({
                            matkul_id:item.id,
                            kmatkul_asal:item.kmatkul_asal,
                            matkul_asal:item.matkul_asal,
                            sks_asal:item.sks_asal,
                            n_kual:item.n_kual,     
                        });
                    }
                });

                await this.$ajax.post('/akademik/nilai/konversi/'+this.nilai_konversi_id,
                    {
                        _method:'put',
                        nim_asal:this.data_konversi.nim_asal,                            
                        nama_mhs:this.data_konversi.nama_mhs,                            
                        alamat:this.data_konversi.alamat,   
                        no_telp:this.data_konversi.no_telp,                                                        
                        email:this.data_konversi.email,                                                        
                        kode_jenjang:this.data_konversi.kode_jenjang,                                                        
                        kode_pt_asal:this.data_konversi.kode_pt_asal,                                                                                                             
                        nama_pt_asal:this.data_konversi.nama_pt_asal,                                                                                                             
                        kode_ps_asal:this.data_konversi.kode_ps_asal,                                                                                                             
                        nama_ps_asal:this.data_konversi.nama_ps_asal,                                                                                                             
                        tahun:this.tahun_pendaftaran,                                                                                                             
                        kjur:this.prodi_id,  
                        daftar_nilai:JSON.stringify(Object.assign({},daftar_nilai)),                    
                    },
                    {
                        headers:{
                            Authorization:this.$store.getters['auth/Token']
                        }
                    }
                ).then(()=>{   
                    this.$router.go();        
                    this.btnLoading=false;
                }).catch(()=>{
                    this.btnLoading=false;
                });                
            }
        },  
        field_alias(atr)
        {
            var alias;
            switch(atr)
            {
                case 'user_id' :
                    alias = 'USER ID';
                break;                
                case 'nim' :
                    alias = 'NIM';
                break;                
                case 'nama_mhs' :
                    alias = 'NAMA MAHASIWA';
                break;                
                case 'nama_prodi' :
                    alias = 'PROGRAM STUDI';
                break;                
            }
            return alias;
        },
        async printpdf2(item)
        {
            this.btnLoading=true;
            await this.$ajax.get('/akademik/nilai/transkripkurikulum/printpdf2/'+item.user_id,                
                {
                    headers:{
                        Authorization:this.$store.getters['auth/Token']
                    },
                    
                }
            ).then(({data})=>{                              
                this.file_pdf=data.pdf_file;
                this.dialogprintpdf=true;
                this.btnLoading=false;
            }).catch(()=>{
                this.btnLoading=false;
            });                 
        },
        closedialogprintpdf () {                  
            setTimeout(() => {
                this.file_pdf=null;
                this.dialogprintpdf = false;      
                }, 300
            );
        }, 
        async pasangkan()
        {
            this.btnLoading=true;
            await this.$ajax.post('/akademik/nilai/konversi/plugtomhs',                
                {
                    nilai_konversi_id:this.nilai_konversi_id,
                    user_id:this.data_mhs.user_id
                },
                {
                    headers:{
                        Authorization:this.$store.getters['auth/Token']
                    },
                    
                }
            ).then(()=>{                              
                this.$router.go();
            }).catch(()=>{
                this.btnLoading=false;
            }); 
        },
        putuskan ()
        {
            this.$root.$confirm.open('Delete', 'Apakah Anda ingin memutuskan dengan data mahasiswa ?', { color: 'red' }).then((confirm) => {
                if (confirm)
                {
                    this.btnLoading=true;
                    this.$ajax.post('/akademik/nilai/konversi/unplugtomhs',
                        {
                            nilai_konversi_id:this.nilai_konversi_id,                            
                        },
                        {
                            headers:{
                                Authorization:this.$store.getters['auth/Token']
                            }
                        }
                    ).then(()=>{   
                        this.$router.go();
                    }).catch(()=>{
                        this.btnLoading=false;
                    });
                }                
            });
        },
        clearDataMhs()
        {
            this.data_mhs = null;
            this.$refs.ref_data_mhs.cachedItems=[];            
        }
    },
    computed: {
        totalMatkul()
        {
            var jumlah_matkul=0;
            this.datatable.forEach(item => {
                if (item.kmatkul_asal && item.matkul_asal && item.sks_asal && item.n_kual)
                {
                    jumlah_matkul+=1;
                }
            });
            return jumlah_matkul;
        },
        totalSKS()
        {
            var jumlah_sks=0;
            this.datatable.forEach(item => {
                if (item.kmatkul_asal && item.matkul_asal && item.sks_asal && item.n_kual)
                {
                    jumlah_sks+=parseInt(item.sks);
                }
            });
            return jumlah_sks;
        },
        fields () {
            if (!this.data_mhs) return [];
            return Object.keys(this.data_mhs).map(key => {
                return {
                    key,
                    value: this.data_mhs[key] || 'n/a',
                }
            })
        },           
    },
    watch:{
        search (val) 
        {
            if (this.isLoading) return;
            
            if (val && val !== this.data_mhs && val.length > 1)
            {
                setTimeout(async () => {
                    this.isLoading = true 
                    await this.$ajax.post('/kemahasiswaan/profil/searchnonampulan',
                    {
                        search:val,                    
                    },
                    {
                        headers: {
                            Authorization:this.$store.getters['auth/Token']
                        }
                    }).then(({data})=>{                                                       
                        const { jumlah, daftar_mhs } = data;
                        this.count = jumlah;
                        this.entries = daftar_mhs;
                        this.isLoading=false;
                    }).catch(()=>{
                        this.isLoading=false;
                    });  
                    }, 1000
                );
            }
        },
    },
    components:{
        AkademikLayout,
        ModuleHeader,            
    },
}
</script>