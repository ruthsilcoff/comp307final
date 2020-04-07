<template>
  <v-content>
    <v-container height="400px">
      <v-row>
        <v-col>
          <div class="addAvailabilitySection">
            <h1>Add an availability</h1>

            <v-text-field label="Name" v-model="titleInput"></v-text-field>
            <v-text-field label="Class size" v-model="sizeInput"></v-text-field>

            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="startDate"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="startDate"
                    label="Start date"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-if="menu" v-model="startDate" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(startDate)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            <v-row align="center" dense>
              <v-text-field style="max-width: 30px !important;" type="number" v-model="startHour"></v-text-field>
              :
              <v-text-field style="max-width: 30px !important;" type="number" v-model="startMinutes"></v-text-field>
            </v-row>

            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="startTime"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="startTime"
                  label="Start time"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menu1"
                v-model="startTime"
                full-width
                @click:minute="$refs.menu1.save(startTime)"
              ></v-time-picker>
            </v-menu>

            <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              :return-value.sync="endDate"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
            <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="endDate"
                  label="End date"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-if="menu2" v-model="endDate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu2.save(endDate)">OK</v-btn>
              </v-date-picker>
            </v-menu>

            <v-menu
              ref="menu3"
              v-model="menu3"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="endTime"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="endTime"
                  label="End time"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menu3"
                v-model="endTime"
                full-width
                @click:minute="$refs.menu3.save(endTime)"
              ></v-time-picker>
            </v-menu>

            <v-combobox
                v-model="repeatInput"
                :items="repeatOptions"
                label="Repeat"
                placeholder="None"
            />

            <v-content style="margin: 0; padding: 0;" v-if="repeatInput !== 'None'">
              <v-menu
                ref="menu4"
                v-model="menu4"
                :close-on-content-click="false"
                :return-value.sync="endRepeatDate"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
              <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="endRepeatDate"
                    label="End repeat date"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-if="menu4" v-model="endRepeatDate" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu4 = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.menu4.save(endRepeatDate)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-content>

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
            <Calendar/>
          </v-content>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import axios from "axios"
import Calendar from "../Calendars/Calendar"

export default {

  mounted() {
    this.getAvailabilities()
  },

  components: {
    Calendar,
  },

  data: () => ({
    startHour: '',
    startMinutes: '',
    availabilities: [],
    titleInput:'Lesson',
    sizeInput:'1',
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
    menu: false,
    menu1: false,
    menu2: false,
    menu3: false,
    inputStart: null,
    inputEnd: null,
    headers: [
        'ID',
        'Title',
        'Posted By',
        'Start',
        'End'
    ],
    repeatInput: 'None',
    repeatOptions: [
        'None',
        'Daily',
        'Weekly',
        'Monthly',
        'Custom',
    ],
    endRepeatDate: null,
  }),

  methods: {
    getAvailabilities: function() {
      axios.get('/api/availability/')
        .then((response) => {
          console.log(response.data)
          this.availabilities=response.data;
          for (let i = 0; i < this.availabilities.length; i++) {
            let start = this.availabilities[i].start.split("T")
            this.availabilities[i].start = start[0] + " " + start[1]

            let end = this.availabilities[i].end.split("T")
            this.availabilities[i].end = end[0] + " " + end[1]
          }
        })
      .catch((err) => {
        console.error(err.response.data);
      })
    },

    addAll: function() {
      let startD = this.startDate
      let endD = this.endDate
      if (this.repeatInput === 'None') {
        this.addAvailability(startD, endD)
      }
    },

    addAvailability: function(startD, endD) {
      this.inputStart = startD + ' ' + this.startTime
      this.inputEnd = endD + ' ' + this.endTime
      axios.post('/api/availability/', {title:this.titleInput, start:this.inputStart, end:this.inputEnd, classSize:this.sizeInput})
        .then((response) => {
          let newEvent = response.data
          let start = newEvent.start.split("T")
          newEvent.start = start[0] + " " + start[1]

          let end = newEvent.end.split("T")
          newEvent.end = end[0] + " " + end[1]

          this.availabilities.push(newEvent)
        })
      .catch((err) => {
        console.error(err.response.data);
      })
    },

    removeAvailability: function (item) {
      let index = this.availabilities.indexOf(item)
      axios.delete('/api/availability/' + item.id + '/')
          .then(response => {
            console.log("deleted")
            console.log(response.data)
            this.availabilities.splice(index, 1)
          })
          .catch((error) => {
            throw error.response.data
          })
    },

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