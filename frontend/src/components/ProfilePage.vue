<template>
	<v-app>
		<v-content>
			<v-container>
				<v-card>
					<v-card-text>
						<h1>{{ userData.first_name }}</h1>
						<h1> </h1>
						<h1>{{ userData.last_name }}</h1>
						<v-row justify="center">
							<v-avatar size="30px">
								<img
									src="../assets/cyan.jpg"
									alt="Marie"
								>
							</v-avatar>
							<ul>
								<li>Username: {{ userData.username }}</li>
								<li>Email: {{ userData.email }}</li>
							</ul>
						</v-row>
					</v-card-text>
				</v-card>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>

import axios from "axios"

export default {
  name: 'App',
	props: ['userData'],

	mounted() {
		this.getProfileData()
  },

  components: {
	},

  data: () => ({
		events: [],
		profileData: {},
	}),

	methods: {
		getProfileData: function () {
			console.log("user ID is")
			console.log(this.userData.id)
			axios.get('/api/profile/' + this.userData.id)
        .then((response) => {
					console.log(response.data)
          this.profileData = response.data
				})
				.catch((err) => {
					console.error(err.response.data)
				})
		}
  }
};
</script>
