<template>
<v-app>

	<v-content>
		<v-text-field label="First Name" v-model="fNameInput"></v-text-field>
		<v-text-field label="Last Name" v-model="lNameInput"></v-text-field>
		<v-text-field label="Username" v-model="usernameInput"></v-text-field>
		<v-text-field label="Email" v-model="emailInput"></v-text-field>
		<v-text-field label="Password" v-model="passwordInput"></v-text-field>
		<v-btn class="mx-2" fab dark color="indigo" v-on:click="signUp()">
			<v-icon dark>mdi-plus</v-icon>
		</v-btn>

	</v-content>

</v-app>
</template>


<script>
import axios from "axios"

export default {
	name: 'App',

	components: {},

	data: () => ({
		fNameInput: '',
		lNameInput: '',
		usernameInput: '',
		passwordInput: '',
		is_superuser: false,
		emailInput: ''
	}),

	methods: {
		signUp: function () {
			axios.post('/api/user/', {
				first_name: this.fNameInput,
				last_name: this.lNameInput,
				username: this.usernameInput,
				password: this.passwordInput,
				email: this.emailInput,
				is_superuser: this.is_superuser
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