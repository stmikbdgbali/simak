<template>
    <AkademikLayout>
        <ModuleHeader>
            <template v-slot:icon>
                mdi-teach
            </template>
            <template v-slot:name>
                DOSEN WALI
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
                        Halaman ini berisi daftar DOSEN WALI / PENDAMPING AKADEMIK yang bertanggungjawab untuk membantu pembelajaran mahasiswa.
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
                        :items="daftar_users"
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
                                <v-toolbar-title>DAFTAR DOSEN WALI</v-toolbar-title>
                                <v-divider
                                    class="mx-4"
                                    inset
                                    vertical
                                ></v-divider>
                                <v-spacer></v-spacer> 
                            </v-toolbar>
                        </template>
                        <template v-slot:item.nidn="{ item }">
                            {{ (item.nidn && item.nidn.length > 0) > 0 ? item.nidn: "N.A" }}
                        </template>
                        <template v-slot:item.is_dw="{ item }">
                            {{ item.is_dw == false ? 'BUKAN': "YA" }}
                        </template>
                        <template v-slot:item.actions="{ item }">         
                            <v-icon
                                small
                                class="mr-2"
                                
                                :disabled="btnLoading"
                                @click.stop="viewItem(item)"
                            >
                                mdi-eye
                            </v-icon>
                            <v-icon
                                small
                                
                                :disabled="btnLoading"
                                @click.stop="deleteItem(item)"
                            >
                                mdi-delete
                            </v-icon>
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
    </AkademikLayout>
</template>
<script>
import { mapGetters } from "vuex";
import AkademikLayout from "@/views/layouts/AkademikLayout";
import ModuleHeader from "@/components/ModuleHeader";
export default {
    name: "DosenWali",  
    created() {
        this.breadcrumbs = [
            {
                text: "HOME",
                disabled: false,
                href: "/dashboard/" + this.ACCESS_TOKEN
            },
            {
                text: "AKADEMIK",
                disabled: false,
                href: "/akademik",
            },
            {
                text: "DOSEN WALI",
                disabled: true,
                href: "#"
            }
        ];
        this.initialize()
    },  
   
    data: () => ({ 
        role_id: 0,
        datatableLoading: false,
        btnLoading: false,      
        //tables
        headers: [
            { text: "",value: "foto" },
            { text: "USERNAME", value: "username",sortable: true },
            { text: "NAMA DOSEN", value: "name",sortable: true },
            { text: "NIDN", value: "nidn",sortable: true }, 
            { text: "NIPY", value: "nipy",sortable: true }, 
            { text: "NOMOR HP", value: "nomor_hp",sortable: true },  
            { text: "AKSI", value: "actions", sortable: false, width:100 },
        ],
        expanded: [],
        search: "",
        daftar_users: [],
    }),
    methods: {
        initialize: async function() 
        {
            this.datatableLoading = true;
            await this.$ajax.get("/akademik/dosenwali",{
                headers: {
                    Authorization: this.TOKEN
                }
            }).then(({ data }) => {    
                this.daftar_users = data.users;
                this.role_id=data.role.id;
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
        viewItem: async function(item) {
            this.$router.push("/akademik/dosenwali" + item.id)
        }, 
        deleteItem(item) {
            this.$root.$confirm.open("Delete", "Apakah Anda ingin menghapus dosen wali '+item.username+' ?", { color: "red" }).then(confirm => {
                if (confirm)
                {
                    this.btnLoading = true;
                    this.$ajax.post("/akademik/dosenwali" + item.id,
                        {
                            _method: "DELETE",
                        },
                        {
                            headers: {
                                Authorization: this.TOKEN
                            }
                        }
                    ).then(() => {
                        const index = this.daftar_users.indexOf(item);
                        this.daftar_users.splice(index, 1);
                        this.btnLoading = false;
                    }).catch(() => {
                        this.btnLoading = false;
                    });
                }
            });
        },
    },
    computed: {        
        ...mapGetters("auth",{ 
            ACCESS_TOKEN: "AccessToken",          
            TOKEN: "Token",     
        }),
    },
    watch: {
        dialog (val) {
            val || this.close()
        },
        dialogAlihkan (val) {
            val || this.close()
        },    
    },
    components: {
        AkademikLayout,
        ModuleHeader,        
    },
}
</script>