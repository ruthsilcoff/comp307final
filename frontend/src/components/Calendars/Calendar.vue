<template>
  <v-content style="margin: 0; padding: 0;">
		<vue-cal
				:events="lessons"
				:time-from="9 * 60"
				:time-to="23 * 60"
				events-count-on-year-view
				events-on-month-view="short"
				editable-events
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

  components: { VueCal },

	computed: {
		...mapGetters(['myUser', 'requestsGetter', 'availabilitiesGetter']),
		lessons() {
			if (!this.myUser.profile.isTeacher) {
				return this.requestsGetter.map(req => req.avail)
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