<template>
    <v-card color="grey lighten-4">
        <v-toolbar elevation="2"> 
            <v-toolbar-title>PROFIL DOSEN</v-toolbar-title>
            <v-divider
                class="mx-4"
                inset
                vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-icon                
                @click.stop="exit()">
                mdi-close-thick
            </v-icon>
        </v-toolbar>
        <v-card-text v-if="datadosen.hasOwnProperty('user_id')">            
            <v-row>
                <v-col xs="12" sm="12" md="2">
                    <v-card flat class="mb-2">
                        <v-img :src="$api.url+'/'+datadosen.foto" />
                        <v-card-title>NOMOR HP:</v-card-title>  
                        <v-card-subtitle>
                            {{datadosen.nomor_hp}}
                        </v-card-subtitle>
                        <v-card-title>USERNAME:</v-card-title>  
                        <v-card-subtitle>
                            {{datadosen.username}}
                        </v-card-subtitle>
                        <v-divider class="mx-4"></v-divider>
                        <v-card-text>
                            <v-chip label outlined color="info">{{active}}</v-chip>
                        </v-card-text>
                    </v-card>                                    
                </v-col>
                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly"/>
                <v-col xs="12" sm="12" md="10">
                    <v-row>
                        <v-col xs="12" sm="12" md="6">
                            <v-card flat class="mb-2">
                                <v-card-title>USER ID:</v-card-title>  
                                <v-card-subtitle>
                                    {{datadosen.user_id}}
                                </v-card-subtitle>
                            </v-card>
                        </v-col>
                        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly"/>
                        <v-col xs="12" sm="12" md="6">
                            <v-card flat class="mb-2">
                                <v-card-title>TEMPAT/TANGGGAL LAHIR:</v-card-title>  
                                <v-card-subtitle>
                                    {{tempat_tanggal_lahir}}
                                </v-card-subtitle>
                            </v-card>
                        </v-col>
                        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly"/>
                    </v-row>
                    <v-row>
                        <v-col xs="12" sm="12" md="6">
                            <v-card flat class="mb-2">
                                <v-card-title>NIDN / NIPY / NIPK:</v-card-title>  
                                <v-card-subtitle>
                                    {{datadosen.nidn}} / {{datadosen.nipy}} / {{datadosen.nipk}}
                                </v-card-subtitle>
                            </v-card>
                        </v-col>
                        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly"/>
                        <v-col xs="12" sm="12" md="6">
                            <v-card flat class="mb-2">
                                <v-card-title>ALAMAT KTP:</v-card-title>  
                                <v-card-subtitle>
                                    {{datadosen.alamat_ktp}}
                                </v-card-subtitle>
                            </v-card>
                        </v-col>
                        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly"/>
                    </v-row>
                    <v-row>
                        <v-col xs="12" sm="12" md="6">
                            <v-card flat class="mb-2">
                                <v-card-title>NAMA DOSEN:</v-card-title>  
                                <v-card-subtitle>
                                    {{datadosen.gelar_depan}} {{datadosen.nama_dosen}} {{datadosen.gelar_belakang}}[{{datadosen.jk}}]
                                </v-card-subtitle>
                            </v-card>
                        </v-col>
                        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly"/>
                        <v-col xs="12" sm="12" md="6">
                            <v-card flat class="mb-2">
                                <v-card-title>ALAMAT RUMAH:</v-card-title>  
                                <v-card-subtitle>
                                    {{datadosen.alamat_rumah}}
                                </v-card-subtitle>
                            </v-card>
                        </v-col>
                        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly"/>
                    </v-row>
                    <v-row>
                        <v-col xs="12" sm="12" md="6">
                            <v-card flat class="mb-2">
                                <v-card-title>EMAIL:</v-card-title>  
                                <v-card-subtitle>
                                    {{datadosen.email}}
                                </v-card-subtitle>
                            </v-card>
                        </v-col>
                        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly"/>
                        <v-col xs="12" sm="12" md="6">
                            <v-card flat class="mb-2">
                                <v-card-title>CREATED/UPDATED:</v-card-title>  
                                <v-card-subtitle>
                                    {{$date(datadosen.created_at).format('DD/MM/YYYY HH:mm')}} ~ {{$date(datadosen.updated_at).format('DD/MM/YYYY HH:mm')}}
                                </v-card-subtitle>
                            </v-card>
                        </v-col>
                        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly"/>
                    </v-row>
                </v-col>
                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly"/>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script>    
export default {
    name:'ProfiDosen',
    created()
    {
        this.initialize();                     
    },
    props:{
        datadosen:{
            type:Object,            
            required:true
        },
        url:{
            type:String,
            default:null            
        }
    },
    
    methods: {
        initialize:async function ()
        {
            
        },
        exit()
        {
            if (this.url != null)
            {
                this.$router.push(this.url);
            }            
        }
    },    
    computed:{
        active()
        {
            return this.datadosen.active==1?'AKTIF':'TIDAK AKTIF';
        },
        tempat_tanggal_lahir()
        {
            if (this.datadosen.tempat_lahir&&this.datadosen.tanggal_lahir)
            {
                return this.datadosen.tempat_lahir+' / '+this.$date(this.datadosen.tanggal_lahir).format('DD/MM/YYYY HH:mm');
            }
            else
            {
                return 'N.A'
            }
        }
    }
}
</script>