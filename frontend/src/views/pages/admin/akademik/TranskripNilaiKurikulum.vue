<template>
    <AkademikLayout>
        <ModuleHeader>
            <template v-slot:icon>
                mdi-book-open
            </template>
            <template v-slot:name>
                TRANSKRIP NILAI KURIKULUM 
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
                    Halaman berisi daftar transkrip nilai berdasarkan kurikulum. Jumlah SKS, Jumlah Matkul, dan IPK Sementara nilai-nya tidak realtime.
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
                            <v-switch
                                v-model="filter_ignore"
                                label="ABAIKAN FILTER"
                                class="font-weight-bold">
                            </v-switch>
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
                        item-key="user_id"                        
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
                            </v-toolbar>
                        </template>
                        <template v-slot:item.idkelas="{item}">
                            {{$store.getters['uiadmin/getNamaKelas'](item.idkelas)}}
                        </template>
                        <template v-slot:item.actions="{ item }">
                            <v-tooltip bottom>             
                                <template v-slot:activator="{ on, attrs }">                                             
                                    <v-btn 
                                        v-bind="attrs"
                                        v-on="on"
                                        color="primary" 
                                        icon 
                                        outlined 
                                        x-small 
                                        class="ma-2" 
                                        @click.stop="viewItem(item)"
                                        :loading="btnLoading"
                                        :disabled="btnLoading">
                                        <v-icon>mdi-eye</v-icon>
                                    </v-btn>     
                                </template>
                                <span>Detail Transkrip</span>                                   
                            </v-tooltip> 
                            <v-tooltip bottom>             
                                <template v-slot:activator="{ on, attrs }">                                             
                                    <v-btn 
                                        v-bind="attrs"
                                        v-on="on"
                                        color="primary" 
                                        icon 
                                        outlined 
                                        x-small 
                                        class="ma-2" 
                                        @click.stop="printpdf2(item)"
                                        :loading="btnLoading"
                                        :disabled="btnLoading">
                                        <v-icon>mdi-printer</v-icon>
                                    </v-btn>     
                                </template>
                                <span>Cetak Transkrip Dua Kolom</span>                                   
                            </v-tooltip>                 
                        </template>           
                        <template v-slot:expanded-item="{ headers, item }">
                            <td :colspan="headers.length" class="text-center">
                                <v-col cols="12">                          
                                    <strong>user_id:</strong>{{ item.user_id }}                                              
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
    name: 'TranskripNilaiKurikulum',
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
                text:'TRANSKRIP KURIKULUM',
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
        filter_ignore:false, 
        awaiting_search:false,
        
        btnLoading:false,
        btnLoadingTable:false,
        datatableLoading:false,
        expanded:[],
        datatable:[],      
        headers: [            
            { text: 'NIM', value: 'nim', sortable:true,width:100  },               
            { text: 'NAMA MAHASISWA', value: 'nama_mhs',sortable:true },                           
            { text: 'KELAS', value: 'idkelas',sortable:true,width:120, },                           
            { text: 'JUMLAH MATKUL', value: 'jumlah_matkul',sortable:false,width:100, },                           
            { text: 'JUMLAH SKS', value: 'jumlah_sks',sortable:false,width:100, },                           
            { text: 'IPK SEMENTARA', value: 'ipk',sortable:true,width:100, },                           
            { text: 'AKSI', value: 'actions', sortable: false,width:120 },
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
            await this.$ajax.post('/akademik/nilai/transkripkurikulum',
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
            this.$router.push('/akademik/nilai/transkripkurikulum/'+item.user_id);
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
        },
        search ()
        {
            if (!this.awaiting_search) 
            {
                setTimeout(async () => {
                    if (this.search.length > 0 && this.filter_ignore)
                    {
                        this.datatableLoading=true;            
                        await this.$ajax.post('/akademik/nilai/transkripkurikulum',
                        {
                            prodi_id:this.prodi_id,
                            ta:this.tahun_pendaftaran,            
                            search:this.search
                        },
                        {
                            headers: {
                                Authorization:this.$store.getters['auth/Token']
                            }
                        }).then(({data})=>{               
                            this.datatable = data.mahasiswa;
                            this.datatableLoading=false;
                        });                     
                    }
                    this.awaiting_search = false;
                }, 1000); // 1 sec delay
            }
            this.awaiting_search = true;
        }
        
    },
    components:{
        AkademikLayout,
        ModuleHeader,    
        Filter7               
    },
}
</script>