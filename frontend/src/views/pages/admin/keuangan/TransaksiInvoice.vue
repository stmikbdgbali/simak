<template>
    <v-app>
        <v-main>
            <v-container class="fill-height" v-if="data_transaksi">
                <v-row align="center" justify="center" no-gutters>
                    <v-col xs="12" sm="12" md="8">
                        <v-row>
                            <v-col cols="8">
                                {{namaPTAlias}}
                            </v-col>
                            <v-col cols="4">
                                FAKTUR PEMBAYARAN
                            </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row>
                            <v-col cols="6">
                                {{this.headers.header_1}}<br>
                                {{this.headers.header_address}}
                            </v-col>
                            <v-col cols="6">
                                <table width="100%">
                                    <tr>
                                        <td width="120">Tanggal Faktur</td>
                                        <td width="15">:</td>
                                        <td>{{$date(data_transaksi.created_at).format('DD/MM/YYYY HH:mm')}}</td>
                                    </tr>
                                    <tr>
                                        <td>Kode Billing</td>
                                        <td>:</td>
                                        <td>{{data_transaksi.no_transaksi}}</td>
                                    </tr>
                                    <tr>
                                        <td>Userid</td>
                                        <td>:</td>
                                        <td>{{data_transaksi.user_id}}</td>
                                    </tr>
                                    <tr>
                                        <td>Mahasiswa</td>
                                        <td>:</td>
                                        <td>
                                            {{data_transaksi.nama_mhs}}<br>
                                            {{data_transaksi.alamat_rumah}}<br>
                                            {{data_transaksi.telp_hp}}
                                        </td>
                                    </tr>
                                </table>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-data-table
                                    :disable-pagination="true"
                                    :hide-default-footer="true"
                                    :items="transaksi_detail"
                                    :headers="headers_detail">
                                    <template v-slot:item.biaya="{ item }">    
                                        {{item.biaya|formatUang}}
                                    </template>
                                    <template v-slot:item.sub_total="{ item }">    
                                        {{item.sub_total|formatUang}}
                                    </template>
                                </v-data-table>
                            </v-col>
                        </v-row>
                    </v-col>                    
                </v-row>                
            </v-container>
            <v-container class="fill-height" v-else>
                <v-row align="center" justify="center" no-gutters>
                    <v-col xs="12" sm="12" md="8">
                        Loading ... {{errormessage}}
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    name:'TransaksiInvoice',
    created()
    {
        this.transaksi_id=this.$route.params.transaksi_id;   
        this.initialize();
    },
    data: () => ({
        transaksi_id:null,
        data_transaksi:null,
        transaksi_detail:[],

        datatableLoading:false,       
        
        errormessage:'',

        headers:{
            header_1:'',
            header_2:'',
            header_3:'',
            header_4:'',
            header_address:'',
        },
        headers_detail:[
            { text: 'KODE', value: 'kombi_id',width:50,sortable:false },
            { text: 'NAMA KOMPONEN', value: 'nama_kombi',sortable:false },
            { text: 'BIAYA', value: 'biaya',width:60,sortable:false },
            { text: 'JUMLAH', value: 'jumlah',width:60,sortable:false },
            { text: 'BULAN', value: 'bulan',width:60,sortable:false },
            { text: 'JUMLAH', value: 'sub_total',width:60,sortable:false },
        ],
    }),    
    methods: {
        initialize:async function () 
        {
            this.datatableLoading=true;

            await this.$ajax.get('/system/setting/variables',
            {
                headers: {
                    Authorization:this.$store.getters['auth/Token']
                }
            }).then(({data})=>{  
                let setting = data.setting;                           
                this.headers.header_1=setting.HEADER_1;
                this.headers.header_2=setting.HEADER_2;
                this.headers.header_3=setting.HEADER_3;
                this.headers.header_4=setting.HEADER_4;
                this.headers.header_address=setting.HEADER_ADDRESS;
            });          
            
            await this.$ajax.get('/keuangan/transaksi/'+this.transaksi_id,                        
            {
                headers: {
                    Authorization:this.$store.getters['auth/Token']
                }
            }).then(({data})=>{       
                this.data_transaksi=data.transaksi;                                       
                this.transaksi_detail = data.transaksi_detail;                
                this.datatableLoading=false;
            }).catch(()=>{
                this.datatableLoading=false;
                this.errormessage='Gagal memperoleh data';
            });

        },
    },    
    computed :{
        ...mapGetters('uifront',{
            namaPTAlias: 'getNamaPTAlias'
        })
    }
}
</script>