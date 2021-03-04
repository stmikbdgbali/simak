<template>
    <KepegawaianLayout>
        <ModuleHeader>
            <template v-slot:icon>
                mdi-account
            </template>
            <template v-slot:name>
                DOSEN
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
                    Halaman ini untuk melakukan pengelolaan data dosen. Namun untuk menghapus dan menambah di halaman user dosen.
                </v-alert>
            </template>
        </ModuleHeader>        
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
                        :items="daftar_dosen"
                        :search="search"
                        item-key="id"
                        sort-by="name"
                        show-expand
                        :expanded.sync="expanded"
                        :single-expand="true"
                        @click:row="dataTableRowClicked"
                        class="elevation-1"
                        :loading="datatableLoading"
                        loading-text="Loading... Please wait"
                    >
                        <template v-slot:top>
                            <v-toolbar flat color="white">
                                <v-toolbar-title>DAFTAR  DOSEN</v-toolbar-title>
                                <v-divider
                                    class="mx-4"
                                    inset
                                    vertical
                                ></v-divider>
                                <v-spacer></v-spacer>                                                                
                                <v-dialog v-model="dialogEdit" max-width="700px" persistent>
                                    <v-form ref="frmdata" v-model="form_valid" lazy-validation>
                                        <v-card>
                                            <v-card-title>
                                                <span class="headline">UBAH DATA DOSEN</span>
                                            </v-card-title>                                            
                                            <v-card-text>                                                                                                
                                                <v-row>
                                                    <v-col cols="3">
                                                        <v-text-field 
                                                            v-model="editedItem.gelar_depan" 
                                                            label="GELAR DPN"
                                                            outlined>
                                                        </v-text-field>
                                                    </v-col>
                                                    <v-col cols="6">
                                                        <v-text-field 
                                                            v-model="editedItem.name" 
                                                            label="NAMA DOSEN"
                                                            outlined
                                                            :rules="rule_user_name">
                                                        </v-text-field>
                                                    </v-col>
                                                    <v-col cols="3">
                                                        <v-text-field 
                                                            v-model="editedItem.gelar_belakang" 
                                                            label="GELAR BLK"
                                                            outlined>
                                                        </v-text-field>
                                                    </v-col>
                                                </v-row>
                                                <v-text-field 
                                                    v-model="editedItem.nidn" 
                                                    label="NIDN (NOMOR INDUK DOSEN NASIONAL)"
                                                    outlined>
                                                </v-text-field>                                                                                               
                                                <v-text-field 
                                                    v-model="editedItem.nipy" 
                                                    label="NIPY (NOMOR INDUK PEGAWAI YAYASAN)"
                                                    outlined
                                                    :rules="rule_nipy">
                                                </v-text-field>     
                                                <v-select 
                                                    v-model="editedItem.id_jabatan" 
                                                    label="JABATAN AKADEMIK"
                                                    :items="daftar_jabatan"
                                                    item-text="nama_jabatan"
                                                    item-value="id_jabatan"                                                    
                                                    outlined>
                                                </v-select>                                         
                                                <v-text-field 
                                                    v-model="editedItem.email" 
                                                    label="EMAIL"
                                                    outlined
                                                    :rules="rule_user_email">
                                                </v-text-field>
                                                <v-text-field 
                                                    v-model="editedItem.nomor_hp" 
                                                    label="NOMOR HP"
                                                    outlined
                                                    :rules="rule_user_nomorhp">
                                                </v-text-field>                                                
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="blue darken-1" text @click.stop="close">BATAL</v-btn>
                                                <v-btn 
                                                    color="blue darken-1" 
                                                    text 
                                                    @click.stop="save" 
                                                    :loading="btnLoading"
                                                    :disabled="!form_valid||btnLoading">SIMPAN</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-form>
                                </v-dialog>                                   
                            </v-toolbar>
                        </template>
                        <template v-slot:item.nidn="{ item }">
                            {{(item.nidn && item.nidn.length > 0) > 0 ? item.nidn: "N.A'}}
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
                                        class="ma-2" 
                                        @click.stop="editItem(item)"
                                        :loading="btnLoading"
                                        :disabled="btnLoading">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>     
                                </template>
                                <span>Ubah data user dosen</span>                                   
                            </v-tooltip>                              
                        </template>
                        <template v-slot:item.foto="{ item }">                            
                            <v-avatar size="30">
                                <v-img :src="$api.url+'/'+item.foto" />                                
                            </v-avatar>                                                                                                  
                        </template>
                        <template v-slot:expanded-item="{ headers, item }">
                            <td :colspan="headers.length" class="text-center">
                                <v-col cols="12">
                                    <strong>ID:</strong>{{ item.id }}
                                    <strong>DW:</strong>{{item.is_dw == false ? 'BUKAN': "YA'}}
                                    <strong>Email:</strong>{{ item.email }}
                                    <strong>created_at:</strong>{{ $date(item.created_at).format("DD/MM/YYYY HH:mm") }}
                                    <strong>updated_at:</strong>{{ $date(item.updated_at).format("DD/MM/YYYY HH:mm") }}
                                </v-col>                                
                            </td>
                        </template>
                        <template v-slot:no-data>
                            Data belum tersedia
                        </template>
                    </v-data-table>
                    <p class="text--secondary">DW : Dosen Wali</p>
                </v-col>
            </v-row>
        </v-container>
    </KepegawaianLayout>
</template>
<script>
import { mapGetters } from "vuex";
import KepegawaianLayout from '@/views/layouts/KepegawaianLayout';
import ModuleHeader from "@/components/ModuleHeader";
export default {
    name: "KepegawaianDosen",  
    created() {
        this.breadcrumbs = [
            {
                text: "HOME",
                disabled: false,
                href: "/dashboard/" + this.ACCESS_TOKEN
            },
            {
                text: "KEPEGAWAIAN",
                disabled: false,
                href: "/kepegawaian"
            },
            {
                text: "DOSEN",
                disabled: true,
                href: "#"
            }
        ];
        this.initialize()
    },  
   
    data: () => ({         
        datatableLoading: false,
        btnLoading: false,      
        //tables
        headers: [                        
            { text: "", value: "foto" },            
            { text: "NAMA DOSEN", value: "nama_dosen",sortable: true, width:250 },
            { text: "NIDN", value: "nidn",sortable: true },     
            { text: "NIPY", value: "nipy",sortable: true },     
            { text: "NOMOR HP", value: "nomor_hp",sortable: true },     
            { text: "JABATAN AKADEMIK", value: "nama_jabatan",sortable: true },  
            { text: "AKSI", value: "actions", sortable: false, width:100 },
        ],
        expanded: [],
        search: "",
        daftar_dosen: [],                       
        
        //form
        form_valid: true,        
        dialogEdit: false,           
        editedIndex: -1,      
        daftar_jabatan: [],  
        editedItem: {
            id: 0,
            username: "",           
            name: "",                       
            nama_dosen: "",                                   
            id_jabatan:1,           
            gelar_depan: "",           
            gelar_belakang: "1",                       
            nidn: "",   
            nipy: "",         
            email: "",           
            nomor_hp: "",                 
            is_dw: false,      
            created_at: "",           
            updated_at: "",   
        },
        defaultItem: {
            id: 0,
            username: "",                       
            name: "",                       
            nama_dosen: "",                       
            id_jabatan:1,      
            gelar_depan: "",           
            gelar_belakang: "1",                             
            nidn: "",
            nipy: "",       
            email: "",           
            nomor_hp: "",          
            is_dw: false,    
            created_at: "",           
            updated_at: "",        
        },
        //form rules        
        rule_user_name: [
            value => !!value || "Mohon untuk di isi nama Dosen !!!",  
            value => /^[A-Za-z\s]*$/.test(value) || "Nama Dosen hanya boleh string dan spasi",                
        ],         
        rule_nidn: [                         
            value => /^[0-9]+$/.test(value) || "NIDN hanya boleh angka",                
        ],         
        rule_nipy: [            
            value => /^[0-9]+$/.test(value) || "Nomor Induk Pegawai Yayasan (NIPY) hanya boleh angka",                
        ], 
        rule_user_email: [
            value => !!value || "Mohon untuk di isi email User !!!",  
            value => /.+@.+\..+/.test(value) || "Format E-mail harus benar",       
        ], 
        rule_user_nomorhp: [
            value => !!value || "Nomor HP mohon untuk diisi !!!",
            value => /^\+[1-9]{1}[0-9]{1,14}$/.test(value) || "Nomor HP hanya boleh angka dan gunakan kode negara didepan seperti +6281214553388",
        ],         
    }),
    methods: {
        initialize: async function() 
        {
            this.datatableLoading = true;
            await this.$ajax.get("/kepegawaian/dosen",{
                headers: {
                    Authorization: this.TOKEN
                }
            }).then(({ data })=>{               
                this.daftar_dosen = data.dosen;                
                this.datatableLoading = false;
            });          
            
        },
        dataTableRowClicked(item)
        {
            if ( item === this.expanded[0])
            {
                this.expanded = [];                
            }
            else
            {
                this.expanded = [item];
            }               
        },                        
        editItem: async function(item) {
            this.$ajax.get("/datamaster/jabatanakademik",                
                {
                    headers: {
                        Authorization: this.TOKEN
                    }
                }
            ).then(({ data })=>{   
                this.daftar_jabatan=data.jabatan_akademik;
            });             
            
            this.editedIndex = this.daftar_dosen.indexOf(item);                  
            this.editedItem = Object.assign({}, item);                              
            this.dialogEdit = true;
        },        
        close () {            
            this.btnLoading = false;            
            this.dialogEdit = false;            
            setTimeout(() => {
                this.$refs.frmdata.resetValidation(); 
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1                
                }, 300
            );
        },                
        save () {
            if (this.$refs.frmdata.validate())
            {
                this.btnLoading=true;
                if (this.editedIndex > -1) 
                {
                    this.$ajax.post("/kepegawaian/dosen/" + this.editedItem.id,
                        {
                            _method: "PUT",
                            name: this.editedItem.name,
                            id_jabatan: this.editedItem.id_jabatan,
                            gelar_depan: this.editedItem.gelar_depan,
                            gelar_belakang: this.editedItem.gelar_belakang,
                            nidn: this.editedItem.nidn,
                            nipy: this.editedItem.nipy,
                            email: this.editedItem.email,
                            nomor_hp: this.editedItem.nomor_hp,                                                                                         
                        },
                        {
                            headers: {
                                Authorization: this.TOKEN
                            }
                        }
                    ).then(()=>{   
                        this.initialize();
                        this.close();
                    }).catch(()=>{
                        this.btnLoading = false;
                    });                    
                    
                } 
            }
        },                
    },
    computed: {        
        ...mapGetters("auth",{            
            ACCESS_TOKEN: "AccessToken",          
            TOKEN: "Token",                                  
        }),
    },

    watch: {        
        dialogEdit (val) {
            val || this.close()
        },        
    },    
    components: {
        KepegawaianLayout,
        ModuleHeader,         
    },
}
</script>