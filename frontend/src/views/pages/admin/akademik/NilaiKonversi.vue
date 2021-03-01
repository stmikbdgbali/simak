<template>
    <AkademikLayout>
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
        <template v-slot:filtersidebar>
            <Filter7 v-on:changeTahunPendaftaran="changeTahunPendaftaran" v-on:changeProdi="changeProdi" ref="filter7" />	
        </template>
        <v-container fluid>                         
            <v-row class="mb-4" no-gutters>
                <v-col cols="12">
                    <v-card>
                        <v-card-text>
                            <v-text-field
                                v-model="search"
                                append-icon="mdi-database-search"
                                label="Search"
                                single-line
                                hide-details
                            ></v-text-field>
                        </v-card-text>
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
                        show-expand
                        :expanded.sync="expanded"
                        :single-expand="true"
                        :disable-pagination="true"
                        :hide-default-footer="true"
                        @click:row="dataTableRowClicked"
                        class="elevation-1"
                        :loading="datatableLoading"
                        loading-text="Loading... Please wait">
                        <template v-slot:top>
                            <v-toolbar flat color="white">
                                <v-toolbar-title>DAFTAR MAHASISWA</v-toolbar-title>
                                <v-divider
                                    class="mx-4"
                                    inset
                                    vertical
                                ></v-divider>
                                <v-spacer></v-spacer>
                                <v-btn 
                                    color="primary" 
                                    icon 
                                    outlined 
                                    small 
                                    class="ma-2" 
                                    to="/akademik/nilai/konversi/tambah"
                                    v-if="$store.getters['auth/can']('AKADEMIK-NILAI-KONVERSI_STORE')">
                                        <v-icon>mdi-plus</v-icon>
                                </v-btn>  
                            </v-toolbar>
                        </template>
                        <template v-slot:item.nim="{item}">
                            {{item.nim == null ?'N.A':item.nim}}
                        </template>
                        <template v-slot:item.actions="{ item }">
                            <v-tooltip bottom>             
                                <template v-slot:activator="{ on, attrs }">                                             
                                    <v-btn 
                                        v-bind="attrs"
                                        v-on="on"
                                        color="primary" 
                                        icon                                         
                                        x-small 
                                        class="ma-1" 
                                        @click.stop="viewItem(item)"
                                        :loading="btnLoading"
                                        :disabled="btnLoading">
                                        <v-icon>mdi-eye</v-icon>
                                    </v-btn>     
                                </template>
                                <span>Detail Konversi Nilai</span>                                   
                            </v-tooltip> 
                            <v-tooltip bottom>             
                                <template v-slot:activator="{ on, attrs }">                                             
                                    <v-btn 
                                        v-bind="attrs"
                                        v-on="on"
                                        color="primary" 
                                        icon                                         
                                        x-small 
                                        class="ma-1" 
                                        @click.stop="editItem(item)"
                                        :loading="btnLoading"
                                        :disabled="btnLoading">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>     
                                </template>
                                <span>Ubah Konversi Nilai</span>                                   
                            </v-tooltip>                             
                            <v-tooltip bottom>             
                                <template v-slot:activator="{ on, attrs }">                                             
                                    <v-btn 
                                        v-bind="attrs"
                                        v-on="on"
                                        color="primary" 
                                        icon                                         
                                        x-small 
                                        class="ma-1" 
                                        @click.stop="printpdf1(item)"
                                        :loading="btnLoading"
                                        :disabled="btnLoading">
                                        <v-icon>mdi-printer</v-icon>
                                    </v-btn>     
                                </template>
                                <span>Cetak Konversi Nilai</span>                                   
                            </v-tooltip>
                            <v-tooltip bottom>             
                                <template v-slot:activator="{ on, attrs }">                                             
                                    <v-btn 
                                        v-bind="attrs"
                                        v-on="on"
                                        color="warning" 
                                        icon                                         
                                        x-small 
                                        class="ma-1" 
                                        @click.stop="deleteItem(item)"
                                        :loading="btnLoading"
                                        :disabled="btnLoading">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>     
                                </template>
                                <span>Hapus Konversi Nilai</span>                                   
                            </v-tooltip>                  
                        </template>           
                        <template v-slot:expanded-item="{ headers, item }">
                            <td :colspan="headers.length" class="text-center">
                                <v-col cols="12">                          
                                    <strong>ID:</strong>{{ item.id}}     
                                    <strong>created_at:</strong>{{ $date(item.created_at).format('DD/MM/YYYY HH:mm') }}
                                    <strong>updated_at:</strong>{{ $date(item.updated_at).format('DD/MM/YYYY HH:mm') }}                                         
                                </v-col>                                
                            </td>
                        </template>
                        <template v-slot:no-data>
                            Data belum tersedia
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
import Filter7 from '@/components/sidebar/FilterMode7';
export default {
    name: 'NilaiKonversi',
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
        firstloading:true,
        prodi_id:null,
        nama_prodi:null,
        tahun_pendaftaran:null,

        btnLoading:false,
        btnLoadingTable:false,
        datatableLoading:false,
        expanded:[],
        datatable:[],      
        headers: [            
            { text: 'NIM', value: 'nim_asal', sortable:true,width:100  },               
            { text: 'NAMA', value: 'nama_mhs', sortable:true,width:250  },               
            { text: 'ALAMAT', value: 'alamat',sortable:true,width:200 },                           
            { text: 'NO. TELP', value: 'no_telp',sortable:true,width:120, },                           
            { text: 'JUMLAH MATKUL', value: 'jumlah_matkul',sortable:false,width:100, },                           
            { text: 'JUMLAH SKS', value: 'jumlah_sks',sortable:false,width:100, },                           
            { text: 'NIM SISTEM', value: 'nim',sortable:true,width:100, },                           
            { text: 'AKSI', value: 'actions', sortable: false,width:150 },
        ],  
        search:'', 

        dialogprintpdf:false,
        file_pdf:null
    }),
    methods: {
        changeTahunPendaftaran (tahun)
        {
            this.tahun_pendaftaran=tahun;
        },
        changeProdi (id)
        {
            this.prodi_id=id;
        },
        initialize:async function () 
        {
            this.datatableLoading=true;
            await this.$ajax.post('/akademik/nilai/konversi',
            {
                prodi_id:this.prodi_id,
                ta:this.tahun_pendaftaran
            },
            {
                headers: {
                    Authorization:this.$store.getters['auth/Token']
                }
            }).then(({data})=>{               
                this.datatable = data.mahasiswa;
                this.datatableLoading=false;
            }).catch(()=>{
                this.datatableLoading=false;
            });  
            this.firstloading=false;
            this.$refs.filter7.setFirstTimeLoading(this.firstloading); 
        },
        dataTableRowClicked(item)
        {
            if ( item === this.expanded[0])
            {
                this.expanded=[];                
            }
            else
            {
                this.expanded=[item];
            }               
        },
        viewItem(item)
        {
            this.$router.push('/akademik/nilai/konversi/'+item.id+'/detail');
        },
        editItem(item)
        {
            this.$router.push('/akademik/nilai/konversi/'+item.id+'/edit');
        },
        deleteItem (item) {           
            this.$root.$confirm.open('Delete', 'Apakah Anda ingin menghapus data nilai konvesi dengan ID '+item.id+' ?', { color: 'red' }).then((confirm) => {
                if (confirm)
                {
                    this.btnLoading=true;
                    this.$ajax.post('/akademik/nilai/konversi/'+item.id,
                        {
                            '_method':'DELETE',
                        },
                        {
                            headers:{
                                Authorization:this.$store.getters['auth/Token']
                            }
                        }
                    ).then(()=>{   
                        const index = this.datatable.indexOf(item);
                        this.datatable.splice(index, 1);
                        this.btnLoading=false;
                    }).catch(()=>{
                        this.btnLoading=false;
                    });
                }                
            });
        },
        async printpdf1(item)
        {
            this.btnLoading=true;
            await this.$ajax.get('/akademik/nilai/konversi/printpdf1/'+item.id,                
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
    },
    watch:{
        tahun_pendaftaran()
        {
            if (!this.firstloading)
            {
                this.initialize();
            }            
        },
        prodi_id(val)
        {
            if (!this.firstloading)
            {
                this.nama_prodi=this.$store.getters['uiadmin/getProdiName'](val);
                this.initialize();
            }            
        }
    },
    components:{
        AkademikLayout,
        ModuleHeader,    
        Filter7               
    },
}
</script>