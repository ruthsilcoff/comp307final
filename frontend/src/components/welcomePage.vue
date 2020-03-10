<template>
  <v-app style="margin-top:100px; height:600px;">
		<v-row>
			<v-img
				src="../assets/peopleLearning.png"
				lazy-src="../assets/peopleLearning.png"
				aspect-ratio="1"
				class="grey lighten-2"
				max-width="500"
				max-height="500"
			>
				<template v-slot:placeholder>
					<v-row class="fill-height ma-0" align="center" justify="center">
						<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
					</v-row>
				</template>
			</v-img>
			<v-col class="text-center" style="margin-top:150px; margin-bottom:0; padding:0; height:300px;">
				<h1>Welcome to Debate Academy.</h1>
				<h2> Whether you're a student or a teacher... this is the place for you!</h2>
					<v-btn x-large color="cyan" dark style="font-weight: bold">Teachers</v-btn>
					<v-btn x-large color="cyan" dark style="font-weight: bold">Learners</v-btn>
					<v-btn x-large :color="testStatus === 0 ? 'yellow' : testStatus === 1 ? 'green' : 'red'"
								dark style="font-weight: bold" @click="test()">
						TEST PERMISSIONS
					</v-btn>
			</v-col>
		</v-row>
	</v-app>
</template>

<script>
import axios from "axios"

export default {
	name: 'App',

	components: {},

	data: () => ({
		testStatus: 0,
	}),

	methods: {
			test: function () {
				axios.get('api/subject')
						.then((response) => {
							this.testStatus = 1
						})
						.catch((err) => {
							console.error(err.response.data)
							this.testStatus = 2
						})
			},
	}
}

</script>

