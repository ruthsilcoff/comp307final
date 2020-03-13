<template>
<v-app>

	<v-content id="signUpPage">
		<v-container id="signUpForm" style="padding:0; background-color:white">
			<v-row>
				<v-col cols="10" md="5" style="color:white; background-color:#006e99; margin:0;">
					<v-card-text style="padding: 40px" >
						<p style="font-size: 30px; font-weight: bold; line-height: 40px;">A world class education for anyone, anywhere.</p>
						<p>By signing up for Debate Academy, you agree to our Terms of use and Privacy Policy.</p>
					</v-card-text>
				</v-col>
				<v-col cols="10" md="6">
					<v-card-text style="padding: 40px">
						<v-form
							ref="form"
							lazy-validation
						>
							<h1 style="line-height: 1.5; color: black">Join Debate Academy as a</h1>
							<v-tabs
								grow
								background-color="other"
								dark
								v-model=tabNumber
							>
								<v-tab>
									Learner
								</v-tab>
								<v-tab>
									Teacher
								</v-tab>

								<v-tab-item>
									<v-card flat background-color="extra" >
										<v-card-text>
											<v-text-field label="Email" v-model="emailInput" :rules="[v => !!v || 'Email is required']" required></v-text-field>
											<v-text-field label="Username" v-model="usernameInput" :rules="[v => !!v || 'Username is required']" required></v-text-field>
											<v-text-field label="Password" v-model="passwordInput" type="password" :rules="[v => !!v || 'Password is required']" required></v-text-field>
											<v-btn style="font-size:20px" v-on:click="signUpLearner()">Submit</v-btn>
										</v-card-text>
									</v-card>
								</v-tab-item>
								<v-tab-item>
									<v-card flat background-color="extra">
										<v-card-text>
											<v-text-field label="First Name" v-model="fNameInput" :rules="[v => !!v || 'Name is required']" required></v-text-field>
											<v-text-field label="Last Name" v-model="lNameInput" :rules="[v => !!v || 'Last name is required']" required></v-text-field>
											<v-text-field label="Username" v-model="usernameInput" :rules="[v => !!v || 'Username is required']" required></v-text-field>
											<v-text-field label="Email" v-model="emailInput" :rules="[v => !!v || 'Email is required']" required></v-text-field>
											<v-text-field label="Password" v-model="passwordInput" type="password" :rules="[v => !!v || 'Password is required']" required></v-text-field>
											<v-btn style="font-size:20px" v-on:click="signUpTeacher()">Submit</v-btn>
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
	props: ['onLoginSuccess', 'initialTabNumber'],

	components: {},

	mounted() {
		this.initializeTabNumber()
	},

	data: () => ({
		fNameInput: '',
		lNameInput: '',
		usernameInput: '',
		passwordInput: '',
		is_superuser: false,
		emailInput: '',
		userData: {},
		tabNumber: null,
	}),

	methods: {
		signUpLearner: function () {
			axios.post('/api/user/', {
				username: this.usernameInput,
				password: this.passwordInput,
				email: this.emailInput
			})
				.then((response) => {
					this.logIn(false)
				})
				.catch((err) => {
					console.error(err.response);
				})
		},

		signUpTeacher: function () {
			axios.post('/api/user/', {
				first_name: this.fNameInput,
				last_name: this.lNameInput,
				username: this.usernameInput,
				password: this.passwordInput,
				email: this.emailInput
			})
				.then((response) => {
					this.logIn(true)
				})
				.catch((err) => {
					console.error(err.response);
				})
		},

		logIn: function (isTeacher) {
				axios.post('/api-token-auth/', {
					username: this.usernameInput,
					password: this.passwordInput,
				})
				.then((response) => {
						console.log('logged in')
						localStorage.setItem('token', response.data.token)
						this.getUserInfo(isTeacher)
					})
				.catch((err) => {
						console.error(err.response)
				})
		},

		getUserInfo: function (isTeacher) {
			axios.get('/api/user/current/')
        .then((response) => {
					console.log(response.data)
          this.userData = response.data
					this.createUserProfile(isTeacher)
				})
				.catch((err) => {
					console.error(err.response)
				})
		},

		createUserProfile: function (isTeacher) {
      axios.post('/api/profile/', {user: this.userData.id, isTeacher:isTeacher})
        .then((response) => {
					console.log('created profile!')
					console.log(response.data)
          this.onLoginSuccess()
        })
      .catch((err) => {
        console.error(err.response.data);
      })
    },

		initializeTabNumber: function () {
			this.tabNumber = this.initialTabNumber
		},

	},

};

</script>



<style>

#signUpForm {
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