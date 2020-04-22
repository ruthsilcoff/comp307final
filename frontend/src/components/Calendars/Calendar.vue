<template>
  <v-content style="margin: 0; padding: 0;">

		<!-- LEFT DRAWER -->
    <v-navigation-drawer
      v-model="leftDrawerGetSet"
      app
      clipped
      left
      width="250px"
      mobile-break-point="500px"
      overlay-color="secondary"
      disable-resize-watcher
    >
			<v-content style="margin: 0; padding: 0;">
				<NewAvailability v-if="myUser.profile.isTeacher"/>
			</v-content>

    </v-navigation-drawer>

		<v-content>
			<vue-cal
					:events="lessons"
					:time-from="9 * 60"
					:time-to="24 * 60"
					events-count-on-year-view
					events-on-month-view="short"
					class="vuecal--full-height-delete"
			/>
		</v-content>

	</v-content>
</template>


<script>

import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import axios from "axios"
import {mapGetters, mapActions} from 'vuex'
import NewAvailability from "../Data-Iterators/NewAvailability"

export default {
	props: [],

	mounted() {
	this.changeShowLeftNav(true)
    this.changeLeftDrawer(true)
  },

	data: () => ({

	}),

  components: {
		VueCal,
    NewAvailability,
	},

	methods: {
		...mapActions(['changeLeftDrawer', 'changeShowLeftNav']),
	},

	computed: {
		...mapGetters(['myUser', 'confirmedRequestsGetter', 'availabilitiesGetter', 'myID', 'availabilitiesOneTeacher', 'leftDrawerGetter']),
		leftDrawerGetSet: {
      get() {
        return this.leftDrawerGetter
      },
      set(value) {
        return this.changeLeftDrawer(value)
      },
    },
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

};

</script>