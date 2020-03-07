<template>
<v-app>

	<v-content>
		<v-text-field label="Email" v-model="emailInput"></v-text-field>
		<v-text-field label="Password" v-model="passwordInput"></v-text-field>
		<v-btn class="mx-2" fab dark color="indigo" v-on:click="logIn()">
			<v-icon dark>mdi-plus</v-icon>
		</v-btn>

	</v-content>

</v-app>
</template>


<script>
import axios from "axios"

export default {
	name: 'App',
	props: ['onLoginSuccess'],

	components: {},

	data: () => ({
		passwordInput: '',
		emailInput: ''
	}),

	methods: {
		logIn: function () {
			axios.get('/api/user/', {
				password: this.passwordInput,
				email: this.emailInput
			})
				.then((response) => {

				})
				.catch((err) => {
					console.error(err);
				})
		}
	}

};

</script>