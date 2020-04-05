<template>
  <v-content>
		<vue-cal
				:events="events"
				events-count-on-year-view
				:disable-views="['years']"
				editable-events
				:events-on-month-view="[true, 'short'][shortEventsOnMonthView * 1]"
				class="vuecal--full-height-delete"
		/>
	</v-content>
</template>


<script>

import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import axios from "axios"

export default {
	props: ['events'],

  components: { VueCal },

	mounted() {
	},

  data: () => ({
		shortEventsOnMonthView: false
	}),

	methods: {

  }
};

</script>