<template>
	<v-app>
		<v-content>
			<v-container>
				<v-card>
					<v-card-text>
						<v-row justify="center">
							<v-avatar size="30px">
								<img
									src="../assets/cyan.jpg"
									alt="Marie"
								>
							</v-avatar>
							<h1>{{ userData.get_full_name }}</h1>
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

export default {
  name: 'App',
	props: ['userData'],

	mounted() {
    this.run()
  },

  components: {
	},

  data: () => ({
		events: [],
	}),

	methods: {
			run: function () {
				console.log(this.userData)
			}
  }
};
</script>
