import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import GSignInButton from 'vue-google-signin-button'
Vue.use(GSignInButton);
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify, {
	options: {
    customProperties: true
  }
});

export default new Vuetify({
	icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
	theme: {
		options: {
      customProperties: true,
    },
		themes: {
			light: {
				primary: '#00b7e6',
				primarydarken1: '#009cca',
				primarylighten5: '#cdffff',
				secondary: '#8039db',
				accent: '#82B1FF',
				error: '#FF5252',
				info: '#2196F3',
				success: '#4CAF50',
				warning: '#FFC107',
				extra: '#FFFFFF',
				other: '#006e99',
				unreadColor: '#5240ac',
				yellowSwitch: '#269ddb',
				starColor: '#ffe100',
				greyChip: '#9d9d9f',
				dropBox: '#dad6d6',
				calendar: '#fafafa',
				blackToWhite: '#000000',
			},
			dark: {
				primary: '#00a3cc',
				primarydarken1: '#0089b0',
				primarylighten5: '#c3ffff',
				secondary: '#934bff',
				accent: '#82B1FF',
				error: '#FF5252',
				info: '#2196F3',
				success: '#4CAF50',
				warning: '#FFC107',
				extra: '#282828',
				other: '#8efbff',
				unreadColor: '#5240ac',
				yellowSwitch: '#51b6db',
				starColor: '#FFC107',
				greyChip: '#545456',
				dropBox: '#242222',
				calendar: '#242222',
				blackToWhite: '#faf4ff',
			}
		},
	}
});
