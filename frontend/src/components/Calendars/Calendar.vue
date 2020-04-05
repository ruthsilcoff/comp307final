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
  name: 'App',
    props: [],

  components: { VueCal },

  computed: {
    ...mapGetters(['myUser', 'confirmedRequestsGetter', 'availabiltiesGetter']),
      lessons() {
        if (this.myUser.profile.isTeacher) {
            return this.confirmedRequestsGetter.map(request => request.avail)
        }
        return this.availabiltiesGetter
    }
    },

};

</script>