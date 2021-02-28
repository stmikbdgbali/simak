<template>
    <SystemUserLayout>
		<ModuleHeader>
            <template v-slot:icon>
                mdi-account-key
            </template>
            <template v-slot:name>
                MY PERMISSIONS
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
                    Daftar aksi-aksi terhadap sebuah modul. Format penulisan permission, NAMAMODULE atau NAMA MODULE. Nama Permission tighly coupling dengan kode sumber.
                </v-alert>
            </template>
        </ModuleHeader>        
        <v-container fluid>    
            <v-row class="mb-4" no-gutters>
                <v-col xs="12" sm="12" md="12">
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
                <v-col xs="12" sm="12" md="12">
                    <v-data-table
                        :headers="headers"
                        :items="daftar_permissions"
                        :search="search"
                        item-key="id"
                        sort-by="name"
                        show-expand
                        :expanded.sync="expanded"
                        :single-expand="true"
                        class="elevation-1"
                        :loading="datatableLoading"
                        loading-text="Loading... Please wait"
                        @click:row="dataTableRowClicked"
                    >
                        <template v-slot:top>
                            <v-toolbar flat color="white">
                                <v-toolbar-title>DAFTAR PERMISSION</v-toolbar-title>
                                <v-divider
                                    class="mx-4"
                                    inset
                                    vertical
                                ></v-divider>
                                <v-spacer></v-spacer>                                                             
                            </v-toolbar>
                        </template>                       
                        <template v-slot:expanded-item="{ headers, item }">
                            <td :colspan="headers.length" class="text-center">
                                <strong>ID:</strong>{{ item.id }}
                                <strong>created_at:</strong>{{ $date(item.created_at).format('DD/MM/YYYY HH:mm') }}
                                <strong>updated_at:</strong>{{ $date(item.updated_at).format('DD/MM/YYYY HH:mm') }}
                            </td>
                        </template>
                        <template v-slot:no-data>
                            Data belum tersedia
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>
        </v-container>
    </SystemUserLayout>
</template>
<script>
import {mapGetters} from 'vuex';
import SystemUserLayout from '@/views/layouts/SystemUserLayout';
import ModuleHeader from '@/components/ModuleHeader';
export default {
    name: 'Permissions',
    created()
    {
        this.breadcrumbs = [
            {
                text:'HOME',
                disabled:false,
                href:'/dashboard/'+this.ACCESS_TOKEN
            },
            {
                text:'USER SISTEM',
                disabled:false,
                href:'/system-users'
            },
            {
                text:'PERMISSIONS',
                disabled:true,
                href:'#'
            }
        ];
        this.initialize();
    },
    data: () => ({
        breadcrumbs:[],
        datatableLoading:false,
        btnLoading:false,  
        expanded:[],        
        daftar_permissions: [],
        //tables
        headers: [                        
            { text: 'NAMA PERMISSION', value: 'name' },
            { text: 'GUARD', value: 'guard_name' },                        
        ],
        search:'', 
   
    }),
    methods: {
        initialize () 
        {

            this.datatableLoading=true;
            this.$ajax.get('/system/users/'+this.ATTRIBUTE_USER('id')+'/mypermission',{
                headers: {
                    Authorization:this.TOKEN
                }
            }).then(({data})=>{                
                this.daftar_permissions = data.permissions;
                this.datatableLoading=false;
            });          
            
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
    },
    computed:{
        ...mapGetters('auth',{            
            ACCESS_TOKEN:'AccessToken',          
            TOKEN:'Token',          
            CAN_ACCESS:'can',         
            ATTRIBUTE_USER:'AttributeUser',          
        }),
    },    
    components:{
		SystemUserLayout,
		ModuleHeader,
	}
}
</script>