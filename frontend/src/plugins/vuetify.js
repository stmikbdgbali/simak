import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import VCurrencyField from "v-currency-field";
import { VTextField } from "vuetify/lib";  //Globally import VTextField

Vue.use(Vuetify);
Vue.component("v-text-field", VTextField);

Vue.use(VCurrencyField, { 
	decimalLength: 0,
	autoDecimalMode: true,
	min: null,
	max: null,
	valueAsInteger: true,
	defaultValue: 0,
});

export default new Vuetify({
	theme: {
		themes: {
			light: {
				primary: "#2196f3",
				secondary: "#03a9f4",
				accent: "#ffeb3b",
				error: "#f44336",
				warning: "#ff9800",
				info: "#00bcd4",
				success: "#4caf50",
			},
		},
	},
});
