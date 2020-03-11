<template>
  <v-app>

		<v-container style="height: 500px;">
			<vue-cal/>
		</v-container>

	</v-app>
</template>


<script>

import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import axios from "axios"

export default {
  name: 'App',
	props: ['events'],

  components: { VueCal },

	mounted() {
	},

  data: () => ({
	}),

	methods: {

  }
};

</script>