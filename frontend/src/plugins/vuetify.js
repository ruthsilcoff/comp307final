import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import GSignInButton from 'vue-google-signin-button'
Vue.use(GSignInButton);

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		themes: {
			light: {
				primary: '#00ffff',
				secondary: '#003f3f',
				accent: '#008989',
				error: '#b71c1c',
			},
		},
	}
});
