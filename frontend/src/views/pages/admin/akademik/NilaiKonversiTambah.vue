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
        <v-form ref="frmdata" v-model="form_valid" lazy-validation>
            <v-container fluid>                         
                <v-row class="mb-4" no-gutters>
                    <v-col cols="12">
                        <v-card>
                            <v-card-title>
                                Data Konversi
                            </v-card-title>
                            <v-card-text>
                                <v-text-field
                                    v-model="formdata.nim_asal"                                
                                    label="NIM ASAL"
                                    :rules="rule_nim_asal"
                                    outlined                                
                                ></v-text-field>
                                <v-text-field
                                    v-model="formdata.nama_mhs"                                
                                    label="NAMA"
                                    :rules="rule_nama_mhs"
                                    outlined                                
                                ></v-text-field>
                                <v-text-field
                                    v-model="formdata.alamat"                                
                                    label="ALAMAT"
                                    outlined       
                                    :rules="rule_alamat"                         
                                ></v-text-field>
                                <v-text-field
                                    v-model="formdata.no_telp"                                
                                    label="NO. TELEPON/HP"
                                    outlined       
                                    :rules="rule_telepon"                          
                                ></v-text-field>
                                <v-text-field
                                    v-model="formdata.email"                                
                                    label="EMAIL"
                                    outlined       
                                    :rules="rule_email"                          
                                ></v-text-field>
                                <v-text-field
                                    v-model="formdata.kode_pt_asal"                                
                                    label="KODE P.T. ASAL"
                                    outlined        
                                    :rules="rule_kode_pt_asal"                        
                                ></v-text-field>
                                <v-text-field
                                    v-model="formdata.nama_pt_asal"                                
                                    label="NAMA P.T. ASAL"
                                    outlined            
                                    :rules="rule_nama_pt_asal"                    
                                ></v-text-field>
                                <v-select 
                                    v-model="formdata.kode_jenjang" 
                                    label="JENJANG"
                                    :items="daftar_jenjang"
                                    item-text="nama_jenjang"
                                    item-value="kode_jenjang"                                
                                    outlined
                                    :rules="rule_kode_jenjang">
                                </v-select>
                                <v-text-field
                                    v-model="formdata.kode_ps_asal"                                
                                    label="KODE PRODI ASAL"
                                    :rules="rule_kode_ps_asal"
                                    outlined                                
                                ></v-text-field>
                                <v-text-field
                                    v-model="formdata.nama_ps_asal"                                
                                    label="NAMA PRODI ASAL"
                                    :rules="rule_nama_ps_asal"
                                    outlined                                
                                ></v-text-field>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text href="/akademik/nilai/konversi">BATAL</v-btn>
                                <v-btn 
                                    color="blue darken-1" 
                                    text 
                                    @click.stop="save" 
                                    :loading="btnLoading"
                                    :disabled="!form_valid||btnLoading">
                                        SIMPAN
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
                            :search="search"
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
                            <template v-slot:item.kmatkul_asal="props">                                
                                <v-text-field
                                    v-model="props.item.kmatkul_asal"                            
                                    dense                                                                 
                                >
                                </v-text-field>
                            </template>                                                                                
                            <template v-slot:item.matkul_asal="props">                                
                                <v-text-field
                                    v-model="props.item.matkul_asal"                            
                                    dense                                 
                                >
                                </v-text-field>
                            </template>                                                                                
                            <template v-slot:item.sks_asal="props">                                
                                <v-text-field
                                    v-model="props.item.sks_asal"                            
                                    dense                                                             
                                >
                                </v-text-field>
                            </template>                                                                                
                            <template v-slot:item.n_kual="props">                                
                                <v-select 
                                    :items="$store.getters['uiadmin/getSkalaNilai']"  
                                    v-model="props.item.n_kual"
                                    style="width:65px"                                
                                    dense>
                                </v-select>
                            </template>                                                                                
                            <template v-slot:no-data>
                                Data belum tersedia
                            </template>   
                        </v-data-table>
                    </v-col>
                </v-row>            
            </v-container>
        </v-form>        
    </AkademikLayout>
</template>
<script>
import AkademikLayout from '@/views/layouts/AkademikLayout';
import ModuleHeader from '@/components/ModuleHeader';
export default {
    name: 'NilaiKonversiTambah',
    created () {
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
                text:'TAMBAH',
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
        search:'', 
                
        form_valid:true,   
        daftar_jenjang:[],                        
        formdata:{
            'id':'',
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
        formdefault:{
            'id':'',
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
        rule_nim_asal:[
            value => !!value||"Mohon di isi nim mahasiswa pindahan/ampulan dengan  nim dari perguruan tinggi asal !!!",              
        ],
        rule_nama_mhs:[
            value => !!value||"Mohon di isi nama mahasiswa pindahan/ampulan dari perguruan tinggi asal !!!", 
            value => /^[A-Za-z\s]*$/.test(value) || 'Nama mahasiswa pindahan/ampulan hanya boleh string dan spasi',                
        ],
        rule_alamat:[
            value => !!value||"Mohon di isi alamat mahasiswa pindahan/ampulan !!!",              
        ],
        rule_telepon:[
            value => !!value||"Mohon di isi nomor hp mahasiswa pindahan/ampulan !!!",          
            value => /^\+[1-9]{1}[0-9]{1,14}$/.test(value) || 'Nomor HP/Telepon hanya boleh angka dan gunakan kode negara didepan seperti +6281214553388',    
        ],       
        rule_email:[
            value => !!value||"Mohon di isi email mahasiswa pindahan/ampulan !!!",          
            value => /.+@.+\..+/.test(value) || 'Format E-mail mohon di isi dengan benar',
        ],       
        rule_kode_pt_asal:[
            value => !!value||"Mohon di isi kode perguruan tinggi asal !!!",      
            value => /^[0-9]+$/.test(value) || 'Kode perguruan tinggi asal hanya boleh angka',        
        ],
        rule_nama_pt_asal:[
            value => !!value||"Mohon di isi nama perguruan tinggi asal !!!",              
        ],
        rule_kode_jenjang:[
            value => !!value||"Mohon dipilih Jenjang Studi dari perguruan tinggi asal !!!",              
        ],
        rule_kode_ps_asal:[
            value => !!value||"Mohon di isi kode program studi dari perguruan tinggi asal !!!",        
            value => /^[0-9]+$/.test(value) || 'Kode program studi asal hanya boleh angka',              
        ],
        rule_nama_ps_asal:[
            value => !!value||"Mohon di isi nama program studi dari tinggi asal !!!",              
        ],
    }),
    methods: {        
        initialize:async function () 
        {      
            this.datatableLoading=true;
            await this.$ajax.post('/akademik/nilai/konversi/matakuliah',
            {
                prodi_id:this.prodi_id,
                ta:this.tahun_pendaftaran
            },
            {
                headers: {
                    Authorization:this.$store.getters['auth/Token']
                }
            }).then(({data})=>{               
                this.datatable = data.matakuliah;
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

                await this.$ajax.post('/akademik/nilai/konversi/store',
                    {
                        nim_asal:this.formdata.nim_asal,                            
                        nama_mhs:this.formdata.nama_mhs,                            
                        alamat:this.formdata.alamat,   
                        no_telp:this.formdata.no_telp,                                                        
                        email:this.formdata.email,                                                        
                        kode_jenjang:this.formdata.kode_jenjang,                                                        
                        kode_pt_asal:this.formdata.kode_pt_asal,                                                                                                             
                        nama_pt_asal:this.formdata.nama_pt_asal,                                                                                                             
                        kode_ps_asal:this.formdata.kode_ps_asal,                                                                                                             
                        nama_ps_asal:this.formdata.nama_ps_asal,                                                                                                             
                        tahun:this.tahun_pendaftaran,                                                                                                             
                        kjur:this.prodi_id,  
                        daftar_nilai:JSON.stringify(Object.assign({},daftar_nilai)),                    
                    },
                    {
                        headers:{
                            Authorization:this.$store.getters['auth/Token']
                        }
                    }
                ).then(({data})=>{   
                    this.$router.push('/akademik/nilai/konversi/'+data.data_konversi.id+'/edit');                   
                    this.btnLoading=false;
                }).catch(()=>{
                    this.btnLoading=false;
                });                
            }
        },        
    },    
    components:{
        AkademikLayout,
        ModuleHeader,            
    },
}
</script>
