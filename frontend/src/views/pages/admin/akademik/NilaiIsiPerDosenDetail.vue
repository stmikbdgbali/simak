<template>
    <AkademikLayout :showrightsidebar="false" :temporaryleftsidebar="true">
        <ModuleHeader>
            <template v-slot:icon>
                mdi-monitor-dashboard
            </template>
            <template v-slot:name>
                ISI NILAI PER KELAS
            </template>
            <template v-slot:subtitle>
                TAHUN AKADEMIK {{tahun_akademik}} SEMESTER {{$store.getters['uiadmin/getNamaSemester'](semester_akademik)}}
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
                    Halaman untuk melakukan pengisian nilai berdasarkan kelas mahasiswa yang telah dibentuk pada pembagian kelas.
                </v-alert>
            </template>
        </ModuleHeader>        
        <v-container fluid v-if="data_kelas_mhs">        
            <v-row>
                <v-col cols="12">         
                    <DataKelasMHS :datakelas="data_kelas_mhs" />
                </v-col>
            </v-row>            
            <v-row>                 
                <v-col cols="12">  
                    <v-alert type="warning">
                        Catatan: Pilihlah (CENTANG) mahasiswa yang akan diisi nilainya. Untuk meningkatkan performance bila jumlah peserta lebih dari 10; maka disarankan mengisi nilai per 10 mahasiswa.
                    </v-alert>
                </v-col>
                <v-col cols="12">
                    <v-expansion-panels focusable>
                        <v-expansion-panel>
                            <v-expansion-panel-header>Range Nilai Huruf</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                A = 95.00-100.00<br>
                                A- = 90.00-94.99<br>
                                A/B = 85.00-89.99<br>
                                (B+) = 80.00-84.99<br>
                                B = 75.00-79.99<br>
                                B- = 70.00-74.99<br>
                                B/C = 65.00-69.99<br>
                                (C+) = 60.00-64.99<br>
                                C = 55.00-59.99<br>
                                C- = 50.00-54.99<br>
                                C/D = 45.00-49.99<br>
                                (D+) = 40.00-44.99<br>
                                D = 35.00-39.99<br>
                                E = 34.99-0<br>             
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-col>
                <v-col cols="12">  
                    <v-form ref="frmdata" v-model="form_valid" lazy-validation>
                        <v-data-table
                            v-model="daftar_nilai"
                            :headers="headers_peserta"
                            :items="datatable_peserta"                        
                            item-key="krsmatkul_id"
                            show-select                                                                            
                            :disable-pagination="true"
                            :hide-default-footer="true"                        
                            class="elevation-1"
                            :loading="datatableLoading"
                            loading-text="Loading... Please wait"
                            dense>
                            <template v-slot:top>
                                <v-toolbar flat color="white">
                                    <v-toolbar-title>DAFTAR PESERTA</v-toolbar-title>
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
                            <template v-slot:item.kjur="{item}">
                                {{$store.getters['uiadmin/getProdiName'](item.kjur)}}
                            </template>             
                            <template v-slot:item.nilai_absen="props"> 
                                <VAngkaNilai 
                                    @input="updateNKuan(props)" 
                                    v-model="props.item.nilai_absen"
                                    dense 
                                    :disabled="isbydosen(props.item.bydosen)"
                                    style="width:65px">
                                </VAngkaNilai>             
                            </template>          
                            <template v-slot:item.nilai_quiz="props"> 
                                <VAngkaNilai               
                                    @input="updateNKuan(props)" 
                                    v-model="props.item.nilai_quiz"                                    
                                    dense    
                                    :disabled="isbydosen(props.item.bydosen)"                                
                                    style="width:65px">
                                </VAngkaNilai>                   
                            </template>     
                            <template v-slot:item.nilai_tugas_individu="props"> 
                                <VAngkaNilai                
                                    @input="updateNKuan(props)"
                                    v-model="props.item.nilai_tugas_individu"                                    
                                    dense      
                                    :disabled="isbydosen(props.item.bydosen)"                              
                                    style="width:65px">
                                </VAngkaNilai>                   
                            </template>     
                            <template v-slot:item.nilai_tugas_kelompok="props"> 
                                <VAngkaNilai            
                                    @input="updateNKuan(props)"    
                                    v-model="props.item.nilai_tugas_kelompok"                                    
                                    dense      
                                    :disabled="isbydosen(props.item.bydosen)"                              
                                    style="width:65px">
                                </VAngkaNilai>                   
                            </template>     
                            <template v-slot:item.nilai_uts="props"> 
                                <VAngkaNilai                
                                    @input="updateNKuan(props)"
                                    v-model="props.item.nilai_uts"                                    
                                    dense                   
                                    :disabled="isbydosen(props.item.bydosen)"                 
                                    style="width:65px">
                                </VAngkaNilai>                   
                            </template>     
                            <template v-slot:item.nilai_uas="props"> 
                                <VAngkaNilai                
                                    @input="updateNKuan(props)"
                                    v-model="props.item.nilai_uas"                                    
                                    dense             
                                    :disabled="isbydosen(props.item.bydosen)"                       
                                    style="width:65px">
                                </VAngkaNilai>                   
                            </template>     
                            <template v-slot:item.n_kuan="props">                
                                <v-chip color="primary" class="ma-2" outlined label v-if="props.item.n_kuan != null">{{props.item.n_kuan}}</v-chip>        
                            </template>     
                            <template v-slot:item.n_kual="props">             
                                <v-select 
                                    :items="$store.getters['uiadmin/getSkalaNilai']"  
                                    v-model="props.item.n_kual"
                                    style="width:65px"
                                    :disabled="isbydosen(props.item.bydosen)"
                                    dense>
                               </v-select>
                            </template>  
                            <template v-slot:body.append v-if="datatable_peserta.length > 0">
                                <tr>
                                    <td class="text-right" colspan="12">
                                        <v-btn 
                                            class="primary mt-2 mb-2"                                 
                                            @click.stop="save" 
                                            :loading="btnLoading"
                                            :disabled="btnLoading">
                                                SIMPAN
                                        </v-btn>
                                    </td>
                                </tr>             
                            </template>  
                            <template v-slot:no-data>
                                Data belum tersedia
                            </template>   
                        </v-data-table>       
                    </v-form>
                </v-col>     
            </v-row>            
        </v-container>        
    </AkademikLayout>
</template>
<script>
import AkademikLayout from "@/views/layouts/AkademikLayout";
import ModuleHeader from "@/components/ModuleHeader";
import DataKelasMHS from '@/components/DataKelasMHS';
import VAngkaNilai from '@/components/VAngkaNilai';
export default {
    name: "NilaiIsiPerKelasMHSDetail",
    created() {
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
                text: "ISI NILAI",
                disabled: false,
                href: "#"
            },
            {
                text: "PER KELAS MAHASISWA",
                disabled: true,
                href: "#"
            }
        ];
        this.kelas_mhs_id=this.$route.params.kelas_mhs_id;      
        this.tahun_akademik = this.$store.getters['uiadmin/getTahunAkademik'];              
        this.semester_akademik=this.$store.getters['uiadmin/getSemesterAkademik'];              
        this.initialize()
    },  
    data: () => ({ 
        kelas_mhs_id: null,
        data_kelas_mhs: null,
        tahun_akademik: null,
        semester_akademik: null,

        btnLoadingTable: false,
        datatableLoading: false,
        btnLoading: false,  
        
        datatable: [],
        datatable_peserta: [], 
        headers_peserta: [             
            { text: "NIM", value: "nim", sortable: false, width:100  },   
            { text: "NAMA", value: "nama_mhs", sortable: false,width:250   },   
            { text: "NILAI ABSENSI", value: "nilai_absen", sortable: false, width:100   },   
            { text: "NILAI QUIZ", value: "nilai_quiz", sortable: false, width:100   },   
            { text: "NILAI TUGAS INDIVIDU", value: "nilai_tugas_individu", sortable: false, width:100   },   
            { text: "NILAI TUGAS KELOMPOK", value: "nilai_tugas_kelompok", sortable: false, width:100   },
            { text: "NILAI UTS", value: "nilai_uts", sortable: false, width:100   },            
            { text: "NILAI UAS", value: "nilai_uas", sortable: false, width:100  },       
            { text: "NILAI ANGKA (0 s.d 100)", value: "n_kuan", sortable: false, width:100 },       
            { text: "NILAI HURUP", value: "n_kual", sortable: false, width:100 },       
        ],   

        //formdata
        form_valid: true,
        komponen_nilai: {
            'persen_absen':15,
            'persen_quiz':0,
            'persen_tugas_individu':35,
            'persen_tugas_kelompok':0,
            'persen_uts':25,
            'persen_uas':25,            
        },
        daftar_nilai: [],
    }),
    methods: {        
        initialize: async function() 
        {
            this.datatableLoading = true;
            await this.$ajax.get("/akademik/perkuliahan/pembagiankelas/" + this.kelas_mhs_id,            
            {
                headers: {
                    Authorization: this.$store.getters["auth/Token"]
                }
            }).then(({ data })=>{
                this.data_kelas_mhs=data.pembagiankelas;                                       
            });
            await this.$ajax.get("/akademik/nilai/matakuliah/pesertakelas/" + this.kelas_mhs_id,            
            {
                headers: {
                    Authorization: this.$store.getters["auth/Token"]
                }
            }).then(({ data })=>{                                                                      
                this.datatableLoading = false;              
                this.datatable_peserta=data.peserta; 
            })              
        },         
        updateNKuan(props)
        {
            var nilai_absen=0;
            if (props.item.nilai_absen>0 && this.komponen_nilai.persen_absen > 0)
            {
                nilai_absen=(this.komponen_nilai.persen_absen/100)*props.item.nilai_absen;              
            }
            
            var nilai_quiz=0;
            if (props.item.nilai_quiz>0 && this.komponen_nilai.persen_quiz > 0)
            {
                nilai_quiz=(this.komponen_nilai.persen_quiz/100)*props.item.nilai_quiz;
            }
            
            var nilai_tugas_individu=0;
            if (props.item.nilai_tugas_individu>0 && this.komponen_nilai.persen_tugas_individu > 0)
            {
                nilai_tugas_individu=(this.komponen_nilai.persen_tugas_individu/100)*props.item.nilai_tugas_individu;
            }
            
            var nilai_tugas_kelompok=0;
            if (props.item.nilai_tugas_kelompok>0 && this.komponen_nilai.persen_tugas_kelompok > 0)
            {
                nilai_tugas_kelompok=(this.komponen_nilai.persen_tugas_kelompok/100)*props.item.nilai_tugas_kelompok;
            }
            
            var nilai_uts=0;
            if (props.item.nilai_uts>0 && this.komponen_nilai.persen_uts > 0)
            {
                nilai_uts=(this.komponen_nilai.persen_uts/100)*props.item.nilai_uts;
            }
            var nilai_uas=0;
            if (props.item.nilai_uas>0 && this.komponen_nilai.persen_uas > 0)
            {
                nilai_uas=(this.komponen_nilai.persen_uas/100)*props.item.nilai_uas;
            }
            
            var n_kuan=(nilai_absen+nilai_quiz+nilai_tugas_individu+nilai_tugas_kelompok+nilai_uts+nilai_uas).toFixed(2);          
            props.item.n_kuan=n_kuan;

            var n_kual=null;
            
            if (n_kuan >= 95)
            {
                n_kual='A';
            }
            else if (n_kuan >= 90 && n_kuan <95)
            {
                n_kual='A-';
            }
            else if (n_kuan >= 85 && n_kuan <90)
            {
                n_kual='A/B';
            }
            else if (n_kuan >= 80 && n_kuan <85)
            {
                n_kual='B+';
            }
            else if (n_kuan >= 75 && n_kuan <80)
            {
                n_kual='B';
            }
            else if (n_kuan >= 70 && n_kuan <75)
            {
                n_kual='B-';
            }
            else if (n_kuan >= 65 && n_kuan <70)
            {
                n_kual='B/C';
            }
            else if (n_kuan >= 60 && n_kuan <65)
            {
                n_kual='C+';
            }
            else if (n_kuan >= 55 && n_kuan <59)
            {
                n_kual='C';
            }
            else if (n_kuan >= 50 && n_kuan <54)
            {
                n_kual='C-';
            }
            else if (n_kuan >= 45 && n_kuan <50)
            {
                n_kual='C/D';
            }
            else if (n_kuan >= 40 && n_kuan <45)
            {
                n_kual='C/D';
            }
            else if (n_kuan >= 40 && n_kuan <45)
            {
                n_kual='D+';
            }
            else if (n_kuan <40)
            {
                n_kual='E';
            }            
            props.item.n_kual=n_kual;

        },
        async save()
        {
            this.btnLoadingTable=true;
            var daftar_nilai=[];

            this.daftar_nilai.forEach(item => {
                daftar_nilai.push({
                    krsmatkul_id:item.krsmatkul_id,
                    nilai_absen:item.nilai_absen,
                    nilai_tugas_individu:item.nilai_tugas_individu,
                    nilai_tugas_kelompok:item.nilai_tugas_kelompok,
                    nilai_quiz:item.nilai_quiz,
                    nilai_uts:item.nilai_uts,
                    nilai_uas:item.nilai_uas,                    
                    n_kuan:item.n_kuan,
                    n_kual:item.n_kual
                });
            });       
            await this.$ajax.post("/akademik/nilai/matakuliah/perdosen/storeperdosen",
                {
                    kelas_mhs_id: this.kelas_mhs_id,
                    daftar_nilai:JSON.stringify(Object.assign({},daftar_nilai)),                    
                },
                {
                    headers: {
                        Authorization: this.$store.getters["auth/Token"]
                    }
                }
            ).then(() => {     
                this.$router.go();
            }).catch(() => {
                this.btnLoadingTable=false;
            });          
        },    
        isbydosen(bool)
        {
            if (bool)
            {
                return !bool;
            }
            else
            {
                return false;              
            }
        }
    },
    computed: {
        
    },  
    components: {
        AkademikLayout,
        ModuleHeader,     
        DataKelasMHS,
        VAngkaNilai       
    },
}
</script>