<template>
    <SPMBLayout>
        <ModuleHeader>
            <template v-slot:icon>
                mdi-file-document-edit-outline
            </template>
            <template v-slot:name>
                NILAI UJIAN
            </template>
            <template v-slot:subtitle v-if="dashboard!='mahasiswabaru'">
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
                        Halaman ini digunakan untuk menampilkan hasil ujian PMB Calon Mahasiswa baru
                </v-alert>
            </template>
        </ModuleHeader> 
        <v-container fluid>            
            <v-row class="mb-4" no-gutters>                
                    
            </v-row>
        </v-container>                
    </SPMBLayout>
</template>
<script>
import SPMBLayout from '@/views/layouts/SPMBLayout';
import ModuleHeader from '@/components/ModuleHeader';
export default {
    name: 'NilaiUjianHasil', 
    created()
    {
        this.dashboard = this.$store.getters['uiadmin/getDefaultDashboard'];
        this.user_id=this.$route.params.user_id;     
        this.breadcrumbs = [
            {
                text:'HOME',
                disabled:false,
                href:'/dashboard/'+this.$store.getters['auth/AccessToken']
            },
            {
                text:'SPMB',
                disabled:false,
                href:'/spmb'
            },
            {
                text:'NILAI UJIAN',
                disabled:false,
                href:'/spmb/nilaiujian'
            },
            {
                text:'HASIL',
                disabled:true,
                href:'#'
            }
        ];
        this.breadcrumbs[1].disabled=(this.dashboard=='mahasiswabaru'||this.dashboard=='mahasiswa');
        
        let prodi_id=this.$store.getters['uiadmin/getProdiID'];
        this.prodi_id=prodi_id;
        this.nama_prodi=this.$store.getters['uiadmin/getProdiName'](prodi_id);
        this.tahun_pendaftaran=this.$store.getters['uiadmin/getTahunPendaftaran'];                
        this.initialize()   
    },  
    data: () => ({        
        prodi_id:null,
        tahun_pendaftaran:null,
        nama_prodi:null,

        breadcrumbs:[],        
        dashboard:null,
        user_id:null,

        btnLoading:false,
        datatableLoading:false,
        expanded:[],
        datatable:[],
        headers: [                        
            { text: '', value: 'foto', width:70 },               
            { text: 'NO.FORMULIR', value: 'no_formulir',width:120,sortable:true },
            { text: 'NAMA MAHASISWA', value: 'name',width:350,sortable:true },
            { text: 'NOMOR HP', value: 'nomor_hp',width:100},
            { text: 'KELAS', value: 'nkelas',width:100,sortable:true },
            { text: 'NILAI', value: 'nilai',width:100,sortable:true },
            { text: 'STATUS', value: 'status',width:100,sortable:true },
            { text: 'AKSI', value: 'actions', sortable: false,width:100 },
        ],
        datamhsbaru:{},

        //form data   
        form_valid:true,   

        data_mhs:{},
        
        daftar_prodi:[],

        daftar_status:[
            {
                value:'0',
                text:'TIDAK LULUS',
            },
            {
                value:'1',
                text:'LULUS',
            },
        ],
        formdata: {            
            user_id:'',            
            jadwal_ujian_id:null,            
            jumlah_soal:null,            
            jawaban_benar:null,            
            jawaban_salah:null,            
            soal_tidak_terjawab:null,            
            passing_grade_1:null,            
            passing_grade_2:null,            
            nilai:0,            
            ket_lulus:'',            
            kjur:null,            
            desc:'',            
            created_at:'',            
            updated_at:'',            
        }, 
    }),
    methods : {        
		initialize:async function()
		{	
            switch(this.dashboard)
            {
                case 'mahasiswabaru':

                break;
                default :
                    this.datatableLoading=true;            
                    await this.$ajax.post('/spmb/nilaiujian',
                    {
                        TA:this.tahun_pendaftaran,
                        prodi_id:this.prodi_id,
                    },
                    {
                        headers: {
                            Authorization:this.$store.getters['auth/Token']
                        }
                    }).then(({data})=>{               
                        this.datatable = data.pmb;                
                        this.datatableLoading=false;
                    });                             
            }
            
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
        badgeColor(item)
        {
            return item.active == 1 ? 'success':'error'
        },
        badgeIcon(item)
        {
            return item.active == 1 ? 'mdi-check-bold':'mdi-close-thick'
        },     
        viewItem(item)
        {
            this.datamhsbaru = item;            
        },
        async addItem(item)
        {
            await this.$ajax.get('/spmb/nilaiujian/'+item.id,
            {
                headers: {
                    Authorization:this.$store.getters['auth/Token']
                }
            }).then(({data})=>{   
                if (data.transaksi_status==1)
                {
                    this.dialogfrm=true;        
                    this.data_mhs=item;
                    this.data_mhs['no_transaksi']=data.no_transaksi;                                        
                    this.daftar_prodi=data.daftar_prodi;
                    if (JSON.stringify(data.data_nilai_ujian)=='{}')
                    {
                        this.formdata.kjur=data.kjur;  
                    }
                    else
                    {
                        var ket_lulus=data.data_nilai_ujian.ket_lulus.toString();
                        this.formdata=data.data_nilai_ujian;
                        this.formdata.ket_lulus=ket_lulus                        
                        this.editedItem=1;
                    }
                }       
                else
                {
                    this.$root.$confirm.open('Warning', 'Mahasiswa ini belum melakukan pembayaran PMB', { color: 'warning',width:400,action:'ok' });
                }         
            });              
        },
        save () {
            if (this.$refs.frmdata.validate())
            {
                this.btnLoading=true;                      
                if (this.editedItem > 0)
                {
                    this.$ajax.post('/spmb/nilaiujian/'+this.formdata.user_id,
                    {
                        _method:'put',
                        no_transaksi:this.data_mhs.no_transaksi,
                        nilai:this.formdata.nilai,
                        kjur:this.formdata.kjur,
                        ket_lulus:this.formdata.ket_lulus,
                        desc:this.formdata.desc,
                    },                    
                    {
                        headers:{
                            Authorization:this.$store.getters['auth/Token'],                        
                        }
                    }
                    ).then(()=>{               
                        this.btnLoading=false;          
                        this.closedialogfrm();
                        this.initialize();
                    }).catch(()=>{
                        this.btnLoading=false;
                    });   
                }
                else
                {
                    this.$ajax.post('/spmb/nilaiujian/store',
                    {
                        no_transaksi:this.data_mhs.no_transaksi,
                        user_id:this.data_mhs.id,
                        nilai:this.formdata.nilai,
                        kjur:this.formdata.kjur,
                        ket_lulus:this.formdata.ket_lulus,
                        desc:this.formdata.desc,
                    },                    
                    {
                        headers:{
                            Authorization:this.$store.getters['auth/Token'],                        
                        }
                    }
                    ).then(()=>{               
                        this.btnLoading=false;          
                        this.closedialogfrm();
                        this.initialize();
                    }).catch(()=>{
                        this.btnLoading=false;
                    });   
                }                
            
            }
        },
        ulangujian (item)
        {
            this.$root.$confirm.open('Delete', 'Apakah Anda ingin menghapus data dengan ID '+item.id+' ?', { color: 'red' }).then((confirm) => {
                if (confirm)
                {
                    this.$ajax.post('/spmb/nilaiujian/'+item.id,
                    {
                        '_method':'DELETE',
                    },                    
                    {
                        headers:{
                            Authorization:this.$store.getters['auth/Token'],                        
                        }
                    }
                    ).then(()=>{               
                        this.btnLoading=false;                          
                        this.initialize();
                    }).catch(()=>{
                        this.btnLoading=false;
                    });   
                }
            });
        },
        closedialogfrm () {            
            this.dialogfrm = false;            
            setTimeout(() => {
                this.formdata = Object.assign({}, this.formdefault);                                
                this.data_mhs = Object.assign({}, {});   
                this.editedItem=-1;                               
                }, 300
            );
        },
        closeProfilMahasiswaBaru ()
        {
            this.dialogprofilmhsbaru = false;         
            this.editedItem=-1;                                   
        }        
    },    
    components:{
        SPMBLayout,
        ModuleHeader,                        
    },
}
</script>