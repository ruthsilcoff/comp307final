import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import GSignInButton from 'vue-google-signin-button'
Vue.use(GSignInButton);

Vue.use(Vuetify, {
	options: {
    customProperties: true
  }
});

export default new Vuetify({
	theme: {
		themes: {
			light: {
				primary: '#00CCFF',
				secondary: '#424242',
				accent: '#82B1FF',
				error: '#FF5252',
				info: '#2196F3',
				success: '#4CAF50',
				warning: '#FFC107',
				extra: '#FFFFFF',
				other: '#006e99',
			},
			dark: {
				primary: '#00a3cc',
				secondary: '#424242',
				accent: '#82B1FF',
				error: '#FF5252',
				info: '#2196F3',
				success: '#4CAF50',
				warning: '#FFC107',
				extra: '#282828',
				other: '#8efbff',
			}
		},
	}
});
