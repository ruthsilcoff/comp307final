<template>
<v-app>

	<v-content id="signUpPage">
		<v-container id="signUpForm" style="padding:0">
			<v-row justify="space-between">
				<v-col cols="10" md="5" style="color:white; background-color:#003f3f; margin:0;">
					<v-card-text style="padding: 40px" >
						<p style="font-size: 30px; font-weight: bold; line-height: 40px;">A world class education for anyone, anywhere.</p>
						<p>By signing up for Debate Academy, you agree to our Terms of use and Privacy Policy.</p>
					</v-card-text>
				</v-col>
				<v-col cols="10" md="6">
					<v-card-text style="padding: 40px">
						<v-form
							ref="form"
							v-model="valid"
							lazy-validation
						>
							<h1 style="line-height: 1.5">Join Debate Academy as a</h1>
							<v-tabs
								grow
								background-color="#008989"
								dark
							>
								<v-tab>
									Learner
								</v-tab>
								<v-tab>
									Teacher
								</v-tab>
								<v-tab>
									Parent
								</v-tab>

								<v-tab-item>
									<v-card flat>
										<v-card-text>
											<g-signin-button
												:params="googleSignInParams"
												@success="onSignInSuccess"
												@error="onSignInError">
												Sign in with Google
											</g-signin-button>
											<v-text-field label="Email" v-model="emailInput" :rules="[v => !!v || 'Email is required']" required></v-text-field>
											<v-text-field label="Username" v-model="usernameInput" :rules="[v => !!v || 'Username is required']" required></v-text-field>
											<v-text-field label="Password" v-model="passwordInput" :rules="[v => !!v || 'Password is required']" required></v-text-field>
											<v-btn style="font-size:20px" v-on:click="signUp()">Submit</v-btn>
										</v-card-text>
									</v-card>
								</v-tab-item>
								<v-tab-item>
									<v-card flat>
										<v-card-text>
											<v-text-field label="First Name" v-model="fNameInput" :rules="[v => !!v || 'Name is required']" required></v-text-field>
											<v-text-field label="Last Name" v-model="lNameInput" :rules="[v => !!v || 'Last name is required']" required></v-text-field>
											<v-text-field label="Email" v-model="emailInput" :rules="[v => !!v || 'Email is required']" required></v-text-field>
											<v-text-field label="Username" v-model="usernameInput" :rules="[v => !!v || 'Username is required']" required></v-text-field>
											<v-text-field label="Password" v-model="passwordInput" :rules="[v => !!v || 'Password is required']" required></v-text-field>
											<v-btn style="font-size:20px" v-on:click="signUp()">Submit</v-btn>
										</v-card-text>
									</v-card>
								</v-tab-item>
								<v-tab-item>
									<v-card flat>
										<v-card-text>
											<v-text-field label="First Name" v-model="fNameInput" :rules="[v => !!v || 'Name is required']" required></v-text-field>
											<v-text-field label="Last Name" v-model="lNameInput" :rules="[v => !!v || 'Last name is required']" required></v-text-field>
											<v-text-field label="Email" v-model="emailInput" :rules="[v => !!v || 'Email is required']" required></v-text-field>
											<v-text-field label="Username" v-model="usernameInput" :rules="[v => !!v || 'Username is required']" required></v-text-field>
											<v-text-field label="Password" v-model="passwordInput" :rules="[v => !!v || 'Password is required']" required></v-text-field>
											<v-btn style="font-size:20px" v-on:click="signUp()">Submit</v-btn>
										</v-card-text>
									</v-card>
								</v-tab-item>
							</v-tabs>
						</v-form>
					</v-card-text>
				</v-col>
			</v-row>
		</v-container>
	</v-content>

</v-app>
</template>

<script>

import axios from "axios"

export default {
	name: 'App',
	props: ['onSuccessfulSignUp'],

	components: {},

	data: () => ({
		fNameInput: '',
		lNameInput: '',
		usernameInput: '',
		passwordInput: '',
		is_superuser: false,
		emailInput: '',
		googleSignInParams: {
        clientId: 'YOUR_APP_CLIENT_ID.apps.googleusercontent.com'
		},
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
					this.onSuccessfulSignUp()
				})
				.catch((err) => {
					console.error(err.response.data);
				})
		},

		onSignInSuccess (googleUser) {
			const profile = googleUser.getBasicProfile()
      this.first_name = profile.first_name;
      this.last_name = profile.last_name;
      this.email = profile.email;
      this.email = profile.email;
    },
    onSignInError (error) {
      console.log(error)
    },
	},

};

</script>



<style>

.g-signin-button {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}

#signUpForm {
	background-color: white;
	border-radius: 5px;
	box-shadow: 2px 2px 7px black;
	width: 1000px;
}

#signUpPage {
	background: url('../assets/cyan.jpg');
	background-size: cover;
}

.v-text-field {
	width: 300px;
}

</style>