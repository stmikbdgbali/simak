import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

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
