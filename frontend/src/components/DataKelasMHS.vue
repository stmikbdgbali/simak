<template>
    <v-card v-if="datakelas">
        <v-toolbar elevation="2"> 
            <v-toolbar-title>DATA KELAS</v-toolbar-title>
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
        <v-card-text>
            <v-row no-gutters>
                <v-col xs="12" sm="6" md="6">
                    <v-card flat>
                        <v-card-title>ID KELAS:</v-card-title>
                        <v-card-subtitle>
                            {{datakelas.id}}
                        </v-card-subtitle>
                    </v-card>
                </v-col>
                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>
                <v-col xs="12" sm="6" md="6">
                    <v-card flat>
                        <v-card-title>NAMA DOSEN :</v-card-title>
                        <v-card-subtitle>
                            {{datakelas.nama_dosen}}
                        </v-card-subtitle>
                    </v-card>
                </v-col>
                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>
            </v-row>
            <v-row no-gutters>
                <v-col xs="12" sm="6" md="6">
                    <v-card flat>
                        <v-card-title>KODE MATAKULIAH:</v-card-title>
                        <v-card-subtitle>
                            {{datakelas.kmatkul}}
                        </v-card-subtitle>
                    </v-card>
                </v-col>
                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>
                <v-col xs="12" sm="6" md="6">
                    <v-card flat>
                        <v-card-title>HARI/WAKTU:</v-card-title>
                        <v-card-subtitle>
                            {{datakelas.nama_hari}} {{datakelas.jam_masuk}}-{{datakelas.jam_keluar}}
                        </v-card-subtitle>
                    </v-card>
                </v-col>
                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/> 
            </v-row>
            <v-row no-gutters>
                <v-col xs="12" sm="6" md="6">
                    <v-card flat>
                        <v-card-title>NAMA KELAS/MATAKULIAH:</v-card-title>
                        <v-card-subtitle>
                            {{datakelas.nmatkul}} - {{$store.getters['uiadmin/getNamaKelas'](datakelas.idkelas)}}
                        </v-card-subtitle>
                    </v-card>
                </v-col>
                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>
                <v-col xs="12" sm="6" md="6">
                    <v-card flat>
                        <v-card-title>RUANGAN :</v-card-title>
                        <v-card-subtitle>
                            {{datakelas.namaruang}}
                        </v-card-subtitle>
                    </v-card>
                </v-col>
                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>
            </v-row>            
            <v-row no-gutters>
                <v-col xs="12" sm="6" md="6">
                    <v-card flat>
                        <v-card-title>SKS :</v-card-title>
                        <v-card-subtitle>
                            {{datakelas.sks}}
                        </v-card-subtitle>
                    </v-card>
                </v-col>
                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>
                <v-col xs="12" sm="6" md="6">
                    <v-card flat>
                        <v-card-title>CREATED / UPDATED :</v-card-title>
                        <v-card-subtitle>
                            {{$date(datakelas.created_at).format('DD/MM/YYYY HH:mm')}} / {{$date(datakelas.updated_at).format('DD/MM/YYYY HH:mm')}}
                        </v-card-subtitle>
                    </v-card>
                </v-col>
                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>
            </v-row>            
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    name:'DataMatakuliahPenyelenggaraan',
    props:{
        datakelas:{
            default:null,
            type:Object,            
        },
        url:{
            type:String,
            default:null            
        }
    },  
    methods: {       
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