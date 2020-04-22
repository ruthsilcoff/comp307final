<template>
	<div style="margin: 0; padding: 0;">
	<v-container class="smallCal">
	<vue-cal
		xsmall
		default-view="day"
		:disable-views="['years', 'year', 'month']"
		:events="lessons"
		:time-from="9 * 60"
		:time-to="24 * 60"
	/>
	</v-container>

		<v-bottom-navigation grow>
			<router-link to="/calendar">
				<v-list-item link>View Full Calendar</v-list-item>
			</router-link>
		</v-bottom-navigation>
	</div>
</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import axios from "axios"
import {mapGetters, mapActions} from 'vuex'

export default {
  components: { VueCal },

  computed: {
    ...mapGetters(['availabilitiesGetter', 'myUser', 'confirmedRequestsGetter', 'availabilitiesOneTeacher']),
    lessons() {
			if (this.myUser.profile.isTeacher) {
				let lessons = []
				for (let i = 0; i < this.confirmedRequestsGetter.length; i++) {
					let lesson = this.confirmedRequestsGetter[i]
					let avail = lesson.avail
					avail.start = avail.start.split("T")[0] + " " + avail.start.split("T")[1]
					avail.end = avail.end.split("T")[0] + " " + avail.end.split("T")[1]
					avail.content='Lesson'
					lessons.push(avail)
				}
				let avails = this.availabilitiesOneTeacher(this.myID)
				avails.forEach(thing => {
					let start = thing.start.split("T")
					thing.start = start[0] + " " + start[1]

					let end = thing.end.split("T")
					thing.end = end[0] + " " + end[1]

					thing.content='Availability'

					lessons.push(thing)
				})
				return lessons
			}
			else {
				//return something that we haven't set up yet for students
				// lets just displaying everything for now
				return this.availabilitiesGetter
			}

		}
  },

  data: () => ({

  }),

}

</script>


<style>

.smallCal {
	max-height: 500px;
	overflow-y:scroll;
	background-color: var(--v-calendar-base)
}

</style>