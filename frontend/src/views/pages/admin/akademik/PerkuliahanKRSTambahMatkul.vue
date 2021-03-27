<template>
    <AkademikLayout :showrightsidebar="false">
        <ModuleHeader>
            <template v-slot:icon>
                mdi-format-columns
            </template>
            <template v-slot:name>
                KARTU RENCANA STUDI
            </template>
            <template v-slot:subtitle v-if="Object.keys(datakrs).length">
                TAHUN AKADEMIK {{tahun_akademik}} SEMESTER {{$store.getters['uiadmin/getNamaSemester'](semester_akademik)}} - {{nama_prodi}}
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
                    Halaman untuk melihat detail krs mahasiswa 
                </v-alert>
            </template>
        </ModuleHeader>  
        <v-container fluid v-if="Object.keys(datakrs).length">   
            <v-row>
                <v-col cols="12">
                    <DataKRS :datakrs="datakrs" :url="'/akademik/perkuliahan/krs/' + datakrs.id+'/detail'" :totalmatkul="totalMatkul" :totalsks="totalSKS" /> 
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">     
                    <v-form ref="frmdata" v-model="form_valid" lazy-validation>      
                        <v-card>
                            <v-card-title>
                                DAFTAR PENYELENGGARAAN MATAKULIAH
                                <v-spacer></v-spacer>         
                            </v-card-title>
                            <v-card-text>
                                <v-data-table   
                                    v-model="daftar_matkul_selected"                             
                                    :headers="headers"
                                    :items="datatable"                                
                                    item-key="id"                
                                    show-select                                        
                                    :disable-pagination="true"
                                    :hide-default-footer="true"                                                                
                                    :loading="datatableLoading"
                                    loading-text="Loading... Please wait">             
                                    <template v-slot:no-data>
                                        Data matakuliah belum tersedia silahkan hubungi bagian akademik
                                    </template>
                                </v-data-table>
                            </v-card-text>
                            <v-card-actions>
                                <v-chip
                                    color="info"
                                    class="mr-2"
                                    outlined>
                                    <strong>Jumlah Matakuliah Terpilih:</strong> {{daftar_matkul_selected.length}}
                                </v-chip>
                                <v-chip
                                    color="info"
                                    outlined>
                                    <strong>Jumlah SKS Terpilih:</strong> {{totalSKS}}
                                </v-chip>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click.stop="closedialogfrm">BATAL</v-btn>
                                <v-btn 
                                    color="blue darken-1" 
                                    text 
                                    @click.stop="save" 
                                    :loading="btnLoading"
                                    :disabled="!form_valid||btnLoading||!daftar_matkul_selected.length > 0">
                                        SIMPAN
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </AkademikLayout>
</template>
<script>
import AkademikLayout from "@/views/layouts/AkademikLayout";
import ModuleHeader from "@/components/ModuleHeader";
import DataKRS from '@/components/DataKRS';
export default {
    name: "PerkuliahanKRSDetail",
    created() {
        this.krs_id=this.$route.params.krsid;      
        this.breadcrumbs = [
            {
                text: "HOME",
                disabled: false,
                href: "/dashboard/" + this.$store.getters['auth/AccessToken']
            },
            {
                text: "AKADEMIK",
                disabled: false,
                href: "/akademik",
            },
            {
                text: "PERKULIAHAN",
                disabled: false,
                href: "#"
            },
            {
                text: "KRS",
                disabled: false,
                href: "/akademik/perkuliahan/krs/daftar"
            },
            {
                text: "TAMBAH MATAKULIAH",
                disabled: true,
                href: "#"
            },
        ];
        this.fetchKRS();             
    },  
    data: () => ({ 
        firstloading: true,       
        nama_prodi: null,
        tahun_akademik: null,       
        semester_akademik: null,
    
        btnLoading: false, 
        
        //formdata
        form_valid: true,  
        krs_id: null,
        datakrs: {},
        jumlah_matkul:0,
        jumlah_sks:0,
        daftar_matkul_selected: [],

        //table        
        datatableLoading: false,
        expanded: [],
        datatable: [],
        headers: [
            { text: "KODE", value: "kmatkul", sortable: true,width:120  },   
            { text: "NAMA MATAKULIAH", value: "nmatkul",sortable: true },
            { text: "SKS", value: "sks", sortable: false,width:120 },
            { text: "SMT", value: "semester", sortable: false,width:120 },            
            { text: "TAHUN MATKUL", value: "ta_matkul", sortable: false,width:120 },            
        ],
    }),
    methods: {          
        async fetchKRS()
        {
            await this.$ajax.get("/akademik/perkuliahan/krs/" + this.krs_id,            
            {
                headers: {
                    Authorization: this.$store.getters["auth/Token"]
                }
            }).then(({ data }) => {                   
                this.datakrs=data.krs;
                if (Object.keys(this.datakrs).length)
                {
                    let prodi_id=this.datakrs.kjur;                  
                    this.nama_prodi = this.$store.getters['uiadmin/getProdiName'](prodi_id);              
                    this.tahun_akademik=this.datakrs.tahun;                                                    
                    this.semester_akademik=this.datakrs.idsmt;                      
                }
            })  

            if (Object.keys(this.datakrs).length)
            {
                this.datatableLoading = true;
                await this.$ajax.post("/akademik/perkuliahan/krs/penyelenggaraan",
                {
                    nim: this.datakrs.nim,
                    prodi_id: this.datakrs.kjur,
                    ta: this.datakrs.tahun,
                    semester_akademik: this.datakrs.idsmt,
                    pid: "belumterdaftar"
                },
                {
                    headers: {
                        Authorization: this.$store.getters["auth/Token"]
                    }
                }).then(({ data }) => {    
                    this.datatable = data.penyelenggaraan;
                    this.datatableLoading = false;
                }).catch(() => {
                    this.datatableLoading = false;
                });
            }
        },
        save: async function() {
            if (this.$refs.frmdata.validate())
            {
                
                this.btnLoading = true;
                await this.$ajax.post("/akademik/perkuliahan/krs/storematkul",
                    {
                        krs_id: this.krs_id,            
                        matkul_selected:JSON.stringify(Object.assign({},this.daftar_matkul_selected)),
                    },
                    {
                        headers: {
                            Authorization: this.$store.getters["auth/Token"]
                        }
                    }
                ).then(() => {         
                    this.btnLoading = false;
                    this.closedialogfrm();
                }).catch(() => {
                    this.btnLoading = false;
                });
            }
        }, 
        closedialogfrm () {                  
            setTimeout(() => {            
                this.$router.push("/akademik/perkuliahan/krs/" + this.krs_id + "/detail");
                }, 300
            );
        },   
    },
    computed: {
        totalSKS()
        {
            var total = 0;
            var index;
            for (index in this.daftar_matkul_selected)
            {
                total = total + parseInt(this.daftar_matkul_selected[index].sks);
            }            
            return total;
        }
    },
    components: {
        AkademikLayout,
        ModuleHeader, 
        DataKRS           
    },
}
</script>