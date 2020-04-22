`
<template>
<v-content id="innerPage">
  <v-content v-if="!loggedIn">
    <welcomePage/>
    <whyItWorks/>
  </v-content>
  <v-content v-if="loggedIn" style="margin: 20px; height: 100%; padding: 0">
    <v-toolbar color="transparent" light flat dense>
      <v-tabs
          light
          grow
          v-model="tab"
          background-color="tabColor"
          color="secondary"
      >
        <v-tab>Welcome</v-tab>
        <v-tab>View All Teachers</v-tab>
        <v-tab>Courses Offered</v-tab>
      </v-tabs>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-row style="height: 300px;" align="center" justify="center">
          <h1> Welcome to debate academy!</h1>
        </v-row>
      </v-tab-item>

      <v-tab-item>
        <ViewTeachers/>
      </v-tab-item>

      <v-tab-item style="margin: 0; padding: 0;">
        <ViewCourses/>
      </v-tab-item>

    </v-tabs-items>

  </v-content>
</v-content>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

import ViewTeachers from "./components/Data-Iterators/ViewTeachers"
import ViewCourses from "./components/Data-Iterators/ViewCourses"
import ViewAllUsers from "./components/Data-Iterators/ViewAllUsers"

import welcomePage from "./components/Basic-Site-Stuff/welcomePage"
import whyItWorks from "./components/Basic-Site-Stuff/whyItWorks"


export default {
  data: () => ({
    tab: 0,
  }),

  components: {
    welcomePage,
    whyItWorks,
    ViewTeachers,
    ViewCourses,
  },

  methods: {},

  computed: {
    ...mapGetters(['loggedIn']),
  },
}
</script>

<style scoped>

#innerPage {
  margin-left: 10%;
  margin-right: 10%;
}

@media only screen and (max-width: 600px) {
  #innerPage {
    margin: 10px;
  }
}

</style>