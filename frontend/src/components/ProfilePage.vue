<template>
	<v-app>
		<v-content>
			<v-container>
				<v-card>
					<v-card-text>
						<v-row justify="center">
							<v-avatar>
								<img
									src="../assets/cyan.jpg"
									alt="Marie"
								>
							</v-avatar>
							<h1>{{userData.username}} Marie Cornellier</h1>
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

  components: {
	},

  data: () => ({
		events: [],
	}),

	methods: {

  }
};
</script>
