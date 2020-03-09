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

export default {
  name: 'App',

  components: { VueCal },

  data: () => ({
		events: [],
	}),

	methods: {

  }
};

</script>