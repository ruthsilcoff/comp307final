<template>
  <v-content style="margin: 0; padding: 0;">
		<vue-cal
				:events="lessons"
				:time-from="9 * 60"
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
		...mapGetters(['myUser', 'confirmedRequestsGetter', 'availabilitiesGetter']),
		lessons() {
			if (this.myUser.profile.isTeacher) {
				let lessons = []
				for (let i = 0; i < this.confirmedRequestsGetter.length; i++) {
					let lesson = this.confirmedRequestsGetter[i]
					let avail = lesson.avail
					avail.start = avail.start.split("T")[0] + " " + avail.start.split("T")[1]
					avail.end = avail.end.split("T")[0] + " " + avail.end.split("T")[1]
					lesson.avail = avail
					lessons.push(avail)
				}
				return lessons
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