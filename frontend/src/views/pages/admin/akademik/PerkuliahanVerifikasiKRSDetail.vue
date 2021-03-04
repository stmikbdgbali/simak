<template>
    <AkademikLayout :showrightsidebar="false">
        <ModuleHeader>
            <template v-slot:icon>
                mdi-format-columns
            </template>
            <template v-slot:name>
                VERIFIKASI KRS (KARTU RENCANA STUDI)
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
                    Halaman untuk melihat detail dan verifikasi krs mahasiswa 
                </v-alert>
            </template>
        </ModuleHeader>   
        <v-container fluid v-if="Object.keys(datakrs).length">   
            <v-row> 
                <v-col cols="12">                  
                    <DataKRS :datakrs="datakrs" url="/akademik/perkuliahan/krs/verifikasi" :totalmatkul="totalMatkul" :totalsks="totalSKS" />
                </v-col>
            </v-row>            
            <v-row>
                <v-col cols="12">           
                    <v-card>
                        <v-card-title>
                            DAFTAR MATAKULIAH
                            <v-spacer></v-spacer>                                                        
                        </v-card-title>
                        <v-card-text>
                            <v-data-table        
                                dense                        
                                :headers="headers"
                                :items="datatable"                                
                                item-key="id"                                                        
                                :disable-pagination="true"
                                :hide-default-footer="true"                                                                
                                :loading="datatableLoading"
                                loading-text="Loading... Please wait">                                                                
                                <template v-slot:body.append v-if="datatable.length > 0">
                                    <tr class="grey lighten-4 font-weight-black">
                                        <td class="text-right" colspan="2">TOTAL MATAKULIAH</td>
                                        <td>{{totalMatkul}}</td> 
                                        <td></td>
                                        <td></td>
                                        <td></td>                                        
                                    </tr>
                                    <tr class="grey lighten-4 font-weight-black">
                                        <td class="text-right" colspan="2">TOTAL SKS</td>
                                        <td>{{totalSKS}}</td> 
                                        <td></td>
                                        <td></td>                                        
                                        <td></td>
                                    </tr>
                                </template>   
                                <template v-slot:no-data>
                                    Data matakuliah belum tersedia silahkan tambah
                                </template>
                            </v-data-table>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </AkademikLayout>
</template>
<script>
import AkademikLayout from '@/views/layouts/AkademikLayout';
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
                text: "DETAIL",
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
        btnLoadingTable: false,

        //formdata
        krs_id: null,
        datakrs: {},
        
        //table        
        datatableLoading: false,
        expanded: [],
        datatable: [],      
        headers: [
            { text: "KODE", value: "kmatkul", sortable: true,width:120  },   
            { text: "NAMA MATAKULIAH", value: "nmatkul",sortable: true },               
            { text: "SKS", value: "sks", sortable: false,width:50 },                           
            { text: "SMT", value: "semester", sortable: false,width:50 },                           
            { text: "KELAS", value: "nama_kelas", sortable: false,width:200 },                           
            { text: "NAMA DOSEN", value: "nama_dosen", sortable: false,width:200 },                                                                
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
            }).then(({ data })=>{                                               
                this.datakrs=data.krs;                
                this.datatable=data.krsmatkul;                
                if (Object.keys(this.datakrs).length)
                {
                    let prodi_id=this.datakrs.kjur;                    
                    this.nama_prodi=this.$store.getters['uiadmin/getProdiName'](prodi_id);                
                    this.tahun_akademik=this.datakrs.tahun;                                                      
                    this.semester_akademik=this.datakrs.idsmt;                        
                }
            })  
        },             
    },
    computed: {
        totalMatkul()
        {
            return this.datatable.length;            
        },
        totalSKS()
        {
            var total = 0;
            var index;
            for (index in this.datatable)
            {
                total = total + parseInt(this.datatable[index].sks);
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