<template>
<v-content>
  <v-tabs
    v-model="tab"
    background-color="transparent"
    color="primary"
    grow
  >
    <v-tab
      v-for="item in items"
      :key="item"
    >
      {{ item }}
    </v-tab>
  </v-tabs>

  <v-tabs-items v-model="tab">
    <v-tab-item>
      <ViewAvails/>
    </v-tab-item>
    <v-tab-item>
      <ViewNoteSets/>
    </v-tab-item>
  </v-tabs-items>
</v-content>
</template>

<script>
  import axios from "axios"

	export default {
    data: () => ({
      tab: null,
			items: [
				'Lessons', 'Note Sets', 'Attending Events'
			],
			availabilities: [],
			noteSets: [],
    }),
		props: ['userData'],

		methods: {
			getAvailabilities: function () {
				axios.get('/api/availability/?userID=' + this.userData.id + "/")
						.then((response) => {
							console.log(response.data)
							this.availabilities = response.data
						})
						.catch((err) => {
							console.error(err.response)
						})
			}
		}
  }
</script>