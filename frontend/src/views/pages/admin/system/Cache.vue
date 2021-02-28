<template>
    <SystemConfigLayout>
		<ModuleHeader>
            <template v-slot:icon>
                mdi-cache
            </template>
            <template v-slot:name>
                CACHE
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
                    Setting cache sistem
                    </v-alert>
            </template>
        </ModuleHeader>
        <v-container fluid>
            <v-row class="mb-4" no-gutters>
                <v-col cols="12">
                    <v-form ref="frmdata" v-model="form_valid" lazy-validation>
                        <v-card>                            
                            <v-card-text>
                                <v-text-field
                                    v-model="formdata.token_ttl_expire"
                                    label="TTL EXPIRE TOKEN (MENIT)"
                                    outlined
                                    :rules="rule_ttl_token_expire">
                                </v-text-field>                               
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click.stop="save"
                                    :loading="btnLoading"
                                    :disabled="!form_valid||btnLoading">SIMPAN</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </SystemConfigLayout>
</template>
<script>
import {mapGetters} from 'vuex';
import SystemConfigLayout from '@/views/layouts/SystemConfigLayout';
import ModuleHeader from '@/components/ModuleHeader';
export default {
    name: 'Cache',
    created()
    {
        this.breadcrumbs = [
            {
                text:'HOME',
                disabled:false,
                href:'/dashboard/'+this.ACCESS_TOKEN
            },
            {
                text:'KONFIGURASI SISTEM',
                disabled:false,
                href:'/system-setting'
            },  
            {
                text:'SERVER - CACHE',
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
        //form
        form_valid:true,
        formdata: {            
            token_ttl_expire:60          
        },
        //form rules
        rule_ttl_token_expire:[
            value => !!value||"Mohon untuk di isi TTL (Time To Live) expire dari token !!!",
            value => /^[0-9]+$/.test(value) || 'TTL Expire dari token hanya boleh angka',    
        ],        
    }),
    methods: {
        initialize:async function ()
        {
            this.datatableLoading=true;
            await this.$ajax.get('/system/setting/variables',
            {
                headers: {
                    Authorization:this.TOKEN
                }
            }).then(({data})=>{
                let setting = data.setting;
                this.formdata.token_ttl_expire=setting.TOKEN_TTL_EXPIRE;                
            });

        },
        save () {
            if (this.$refs.frmdata.validate())
            {
                this.btnLoading=true;
                this.$ajax.post('/system/setting/variables',
                    {
                        '_method':'PUT',
                        'pid':'token_ttl_expire',
                        setting:JSON.stringify({
                            903:this.formdata.token_ttl_expire,                            
                        }),
                    },
                    {
                        headers:{
                            Authorization:this.TOKEN
                        }
                    }
                ).then(()=>{
                    this.btnLoading=false;
                }).catch(()=>{
                    this.btnLoading=false;
                });
            }
        }
    },
    computed:{
        ...mapGetters('auth',{
            ACCESS_TOKEN:'AccessToken',
            TOKEN:'Token',
        }),
    },
    components:{
		SystemConfigLayout,
        ModuleHeader,
	}
}
</script>
