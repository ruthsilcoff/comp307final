<template>
  <v-app>

		<v-container style="max-height: 300px; overflow: scroll">
			<vue-cal
          xsmall
          default-view="day"
          :disable-views="['years', 'year', 'month']"
          :events="lessons"
					:time-from="9 * 60"
					:time-to="24 * 60"
      />
		</v-container>

	</v-app>
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