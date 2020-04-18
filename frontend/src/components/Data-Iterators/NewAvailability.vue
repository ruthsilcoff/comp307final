<template>
  <v-content style="margin-top: 10px;margin-left: 10px; margin-right: 10px; padding: 0;">
    <span v-if="addingAvailGetter">New Availability</span>
    <v-btn v-if="!addingAvailGetter" v-on:click="openAddAvail" color="success">Add availability</v-btn>

            <v-text-field v-if="addingAvailGetter" label="Class size" v-model="sizeInput"></v-text-field>
            <v-text-field v-if="addingAvailGetter" label="Name" v-model="titleInput"></v-text-field>

    <v-menu
         v-if="addingAvailGetter"
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
            dense
            style="margin: 0; padding: 0;"
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

    <v-menu
        dense
        style="margin: 0; padding: 0;"
         v-if="addingAvailGetter"
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
            dense
          style="margin: 0; padding: 0;"
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
      v-if="addingAvailGetter"
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
          style="margin: 0; padding: 0;"
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
         v-if="addingAvailGetter"
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
            style="margin: 0; padding: 0;"
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

    <v-content style="margin: 0; padding: 0;" v-if="repeatInput !== 'None' && addingAvailGetter">
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

    <v-row align="center" justify="center">
      <v-btn style="margin: 10px; padding: 0" v-if="addingAvailGetter" color="success" v-on:click="addAll()">
        Submit
      </v-btn>
      <v-btn style="margin: 10px; padding: 0" v-if="addingAvailGetter" color="error" v-on:click="cancel()">
        Cancel
      </v-btn>
    </v-row>

    <v-toolbar color="primary" dark>
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
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-content>
          <v-list-item-title v-text="item.start"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-content>
</template>

<script>
import axios from "axios"
import {mapActions, mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters(['availabilitiesOneTeacher', 'myID', 'addingAvailGetter']),
    availabilities() {
      let avails = this.availabilitiesOneTeacher(this.myID)
      return avails
    }

  },

  data: () => ({
    startHour: '',
    startMinutes: '',
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
        'Title',
        'Start',
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
    ...mapActions(['newAvail', 'changeAddingAvail']),

    openAddAvail() {
      this.changeAddingAvail(true)
    },

    cancel() {
      this.changeAddingAvail(false)
    },

    addAll: function() {
      //TODO: make a function for making repetitive avails
      let startD = this.startDate
      let endD = this.endDate
      if (this.repeatInput === 'None') {
        this.addAvailability(startD, endD)
      }
      this.addingAvail = false
    },

    addAvailability: async function(startD, endD) {
      this.inputStart = startD + ' ' + this.startTime
      this.inputEnd = endD + ' ' + this.endTime
      try {
        await this.newAvail({titleInput: this.titleInput, inputStart: this.inputStart, inputEnd: this.inputEnd, classSize:this.sizeInput})
        this.createSnackbar({message: 'Availability added', color: 'success'})
      }catch(error) {
        console.error(error.response.data);
        this.createSnackbar({message: 'Problem creating availability', color: 'error'})
      }
    },

    removeAvailability: async function (item) {
      let index = this.availabilities.indexOf(item)
      try {
        const response = await axios.delete('/api/availability/' + item.id + '/')
        console.log("deleted")
        console.log(response.data)
        this.availabilities.splice(index, 1)
        this.createSnackbar({message: 'Availability deleted', color: 'success'})
      }catch(error) {
        console.error(error.response.data);
        this.createSnackbar({message: 'Problem deleting availability', color: 'error'})
      }
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