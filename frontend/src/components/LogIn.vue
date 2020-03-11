<template>
<v-app>

	<v-content>
		<v-card
    class="mx-auto"
    max-width="344"
		>
			<v-card-text>
				<h1>Log In</h1>
				<v-text-field label="Username" v-model="usernameInput"></v-text-field>
				<v-text-field label="Password" v-model="passwordInput"></v-text-field>
				<v-btn text v-on:click="logIn()">Submit</v-btn>
			</v-card-text>
		</v-card>
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
		usernameInput: ''
	}),

	methods: {
		logIn: function () {
				axios.post('/api-token-auth/', {
					username: this.usernameInput,
					password: this.passwordInput,
				})
				.then((response) => {
						console.log('logged in')
						localStorage.setItem('token', response.data.token)
						this.onLoginSuccess()
					})
				.catch((err) => {
						console.error(err.response)
				})
		}
	}

};

</script>

<style>

.v-text-field {
	width: 300px;
}

</style>