<template>
  <v-content style="margin: 0; padding: 0;">
		<vue-cal
				:events="events"
				:time-from="0"
				:time-to="24 * 60"
				events-count-on-year-view
				events-on-month-view="short"
				class="vuecal--full-height-delete"
		/>
	</v-content>
</template>


<script>

import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import axios from "axios"
import {mapGetters, mapActions} from 'vuex'

export default {
	props: [],

	data: () => ({
		events: [{
			title: 'an event', start: '2020-04-04 14:12:00Z', end: '2020-04-04 15:14:00Z', allDay: false
		},]
	}),

  components: { VueCal },

	computed: {
		...mapGetters(['myUser', 'requestsGetter', 'availabilitiesGetter']),
		lessons() {
			if (this.myUser.profile.isTeacher) {
				return this.availabilitiesGetter
				//return this.requestsGetter.map(req => req.avail)
			}
			else {
				//return something that we haven't set up yet for students
				// lets just displaying everything for now
				return this.availabilitiesGetter
			}

		}
	},

};

</script>