<template>
<v-content>
  <v-tabs
      v-model="tab"
      background-color="transparent"
      color="primary"
      grow
  >
    <v-tab
        v-for="item in items"
        :key="item"
    >
      {{ item }}
    </v-tab>
  </v-tabs>

  <v-tabs-items v-model="tab">
    <v-tab-item>
      <v-container max-width="200px">
        <ViewUpcomingLessons :userData="userData"/>
      </v-container>
    </v-tab-item>
    <v-tab-item>
      <ViewRequestsStudent :userData="userData"/>
    </v-tab-item>
    <v-tab-item>
      <ViewTeachers :userData="userData"/>
    </v-tab-item>
    <v-tab-item>
      <ViewInvoices :userData="userData"/>
    </v-tab-item>
  </v-tabs-items>
</v-content>
</template>

<script>
import axios from "axios"
import ViewUpcomingLessons from "./ViewUpcomingLessons"
import ViewTeachers from "../Data-Iterators/ViewTeachers"
import ViewInvoices from "../Data-Iterators/ViewInvoices"
import ViewRequestsStudent from "../Data-Iterators/ViewRequestsStudent"

export default {
  data: () => ({
    tab: 0,
    items: [
      'Upcoming Sessions',
      'Sessions Requested',
      'Teachers',
      'Invoices'
    ],
  }),

  props: ['userData'],

  components: {
    ViewUpcomingLessons,
    ViewRequestsStudent,
    ViewTeachers,
    ViewInvoices,
  },

  mounted() {
  },

  methods: {},
}
</script>