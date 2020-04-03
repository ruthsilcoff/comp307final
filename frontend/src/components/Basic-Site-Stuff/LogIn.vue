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
				<v-btn text v-on:click="logInFunction()">Submit</v-btn>
			</v-card-text>
		</v-card>
	</v-content>

</v-app>
</template>


<script>
import axios from "axios"
import {mapGetters, mapActions} from 'vuex'

export default {
	components: {},

	data: () => ({
		loading: false,
		passwordInput: '',
		usernameInput: ''
	}),

	methods: {
		...mapActions(['login', 'setMyUser', 'createSnackbar']),

    logInFunction: async function () {
      this.loading = true
      let user = {username: this.usernameInput, password: this.passwordInput}
      try {
        await this.login(user)
        const response2 = await axios.get('/api/user/current/')
        await this.setMyUser(response2.data.id)
        await this.$router.push('/')
				this.createSnackbar({message: 'logged in', color:'success', mode: ''})
      }
      catch (error) {
        console.error(error)
        this.createSnackbar({message: 'Problem logging in', color: 'error', mode: ''})
      }
    }
	}

};

</script>

<style>

.v-text-field {
	width: 300px;
}

</style>