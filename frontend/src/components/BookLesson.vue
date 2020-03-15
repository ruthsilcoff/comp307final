<template>
  <v-content>
    <v-container height="400px">
      <v-row>
        <v-col>
          <div class="addAvailabilitySection">
            <h1>Book a Lesson</h1>

            <v-text-field label="Lesson ID" v-model="lessonIDinput"></v-text-field>

						<h3>Date: {{}}</h3>

            <v-btn class="mx-2" fab dark color="info" v-on:click="addAll()">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>

          </div>
          <v-card style="margin-top:40px" max-width="1000" class="mx-auto">
            <v-toolbar color="info" dark>
              <v-toolbar-title>My Availabilities</v-toolbar-title>
            </v-toolbar>
            <v-list>
            <v-list-item>
              <v-list-item-content
                v-for="item in headers"
                :key="item"
              >
                <p class="sheetHeader">{{item}}</p>
              </v-list-item-content>
            </v-list-item>
            </v-list>
            <v-list>
              <v-list-item
                v-for="item in availabilities"
                :key="item.id"
              >
                <v-list-item-content>
                  <v-btn class="sheetButton" text v-text="item.id" v-on:click="removeAvailability(item)"></v-btn>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title v-text="item.userID"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title v-text="item.start"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title v-text="item.end"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col>
          <v-content style="margin:0">
              <v-toolbar color="info" dark>
                <v-toolbar-title>My Calendar</v-toolbar-title>
              </v-toolbar>
            <Calendar :events="availabilities"/>
          </v-content>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import axios from "axios"
import Calendar from "./Calendars/Calendar"

export default {
  name: 'App',
  props: [
      'lessonIDinput',
  ],

  mounted() {
    this.getAvailabilities()
  },

  components: {
    Calendar,
  },

  data: () => ({
    lessons: [],
    lessonTitle:'',
    startDate: null,
    startTime: null,
  }),

  methods: {

  }

};

</script>

<style>

.sheetHeader {
  color: #bdbdbd !important;
  font-size: 12px !important;
  font-weight: bold;
}

.sheetButton {
  margin: 0;
  padding: 0;
}

</style>