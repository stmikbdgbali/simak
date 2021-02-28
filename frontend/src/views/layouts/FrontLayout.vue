<template>
    <div>
        <v-app-bar app elevation="0">
            <v-toolbar-title>
                <span class="hidden-sm-and-down">{{namaPTAlias}}</span>
            </v-toolbar-title>
            <v-spacer />
            <v-btn to="/" class="mr-2" color="primary" text large>
                Home
            </v-btn>
            <v-btn to="/pmb" class="mr-2" color="primary" text large>
                PENDAFTARAN
            </v-btn>
            <v-btn to="/login" color="primary" text large>
                LOGIN
            </v-btn>
        </v-app-bar>
        <v-main>
            <slot/>
        </v-main>      
        <v-footer app padless fixed dark>
			<v-card class="flex" flat tile>
				<v-divider></v-divider>
				<v-card-text class="py-2 white--text text-center">
					<strong>SIMAK (2021-2020)</strong> dikembangkan oleh TIM IT STMIK Bandung Bali 
					<v-btn dark icon href="https://github.com/stmikbdgbali/simak">
						<v-icon>mdi-github</v-icon>
					</v-btn>					
				</v-card-text>
			</v-card>			
		</v-footer>  
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    name:'FrontLayout',
    created ()
    {
        this.$store.dispatch('uifront/init',this.$ajax);           
    },
    computed :{
        ...mapGetters('uifront',{
            namaPTAlias: 'getNamaPTAlias'
        })
    }
}
</script>