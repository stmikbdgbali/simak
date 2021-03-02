<template>
    <v-card color="grey lighten-4">
        <v-toolbar elevation="2"> 
            <v-toolbar-title>DATA KARTU RENCANA STUDI</v-toolbar-title>
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
        <v-card-text v-if="datakrs.hasOwnProperty('id')">
            <v-row>
                <v-col xs="12" sm="12" md="6">
                    <v-card flat>
                        <v-card-title>ID KRS:</v-card-title>  
                        <v-card-subtitle>
                            {{datakrs.id}}
                        </v-card-subtitle>
                    </v-card>
                </v-col>
                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly"/>
                <v-col xs="12" sm="12" md="6">
                    <v-card flat>
                        <v-card-title>TAHUN MASUK :</v-card-title>
                        <v-card-subtitle>
                            {{datakrs.tahun_pendaftaran}}
                        </v-card-subtitle>
                    </v-card>
                </v-col>
                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly"/>
            </v-row>
            <v-row>
                <v-col xs="12" sm="12" md="6">
                    <v-card flat>
                        <v-card-title>NIM / NIRM / NO. FORMULIR:</v-card-title>  
                        <v-card-subtitle>
                            {{datakrs.nim}} / {{datakrs.nirm}} / {{datakrs.no_formulir}}
                        </v-card-subtitle>
                    </v-card>
                </v-col>
                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly"/>
                <v-col xs="12" sm="12" md="6">
                    <v-card flat>
                        <v-card-title>SAH :</v-card-title>
                        <v-card-subtitle>
                            <v-chip                                
                                :color="datakrs.sah==1?'green':'warning'"
                                text-color="white"
                                small
                                >
                                {{datakrs.sah==1?'YA':'TIDAK'}}                            
                            </v-chip>
                        </v-card-subtitle>
                    </v-card>
                </v-col>
                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly"/>
            </v-row>
            <v-row>
                <v-col xs="12" sm="12" md="6">
                    <v-card flat>
                        <v-card-title>NAMA MAHASISWA:</v-card-title>  
                        <v-card-subtitle>
                            {{datakrs.nama_mhs}} [{{datakrs.jk}}]
                        </v-card-subtitle>
                    </v-card>
                </v-col>
                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly"/>
                <v-col xs="12" sm="12" md="6">
                    <v-card flat>
                        <v-card-title>JUMLAH MATKUL / SKS :</v-card-title>
                        <v-card-subtitle>
                            {{totalmatkul}} / {{totalsks}}
                        </v-card-subtitle>
                    </v-card>
                </v-col>
                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly"/>
            </v-row>
            <v-row>
                <v-col xs="12" sm="12" md="6">
                    <v-card flat>
                        <v-card-title>DOSEN WALI:</v-card-title>  
                        <v-card-subtitle>
                            {{datakrs.nama_dosen}} [{{datakrs.nidn}}]
                        </v-card-subtitle>
                    </v-card>
                </v-col>
                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly"/>
                <v-col xs="12" sm="12" md="6">
                    <v-card flat>
                        <v-card-title>CREATED/UPDATED:</v-card-title>  
                        <v-card-subtitle>
                            {{$date(datakrs.created_at).format('DD/MM/YYYY HH:mm')}} ~ {{$date(datakrs.updated_at).format('DD/MM/YYYY HH:mm')}}
                        </v-card-subtitle>
                    </v-card>
                </v-col>
                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly || $vuetify.breakpoint.smOnly"/>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script>    
export default {
    name:'DataKRS',
    created()
    {
        this.initialize();                     
    },
    props:{
        datakrs:{
            type:Object,            
            required:true
        },
        totalmatkul:{
            type:Number,
            requreid:true
        },
        totalsks:{
            type:Number,
            requreid:true
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
}
</script>