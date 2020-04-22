<template>
<v-content style="margin-top: 10px;margin-left: 10px; margin-right: 10px; padding: 0;">
  <v-text-field filled label="Name" v-model="titleInput">
  </v-text-field>
  <v-text-field label="Class size" v-model="classSizeInput"></v-text-field>
  <v-text-field label="Start" v-model="startInput"></v-text-field>
  <v-text-field label="End" v-model="endInput"></v-text-field>
  <v-row>
    <v-btn color="success" v-on:click="editAvail()">Submit</v-btn>
    <v-btn color="error" v-on:click="cancelEdit()">Cancel</v-btn>
  </v-row>

</v-content>
</template>

<script>
import axios from "axios"
import {mapActions} from 'vuex'

export default {
  props: ['avail', 'cancelEdit', 'onSuccessfulEdit', 'userDate', 'id'],

  data: () => ({
    titleInput: '',
    classSizeInput: '',
    startInput: '',
    endInput: '',
  }),

  mounted() {
    this.getCurrentAvail()
  },

  methods: {
    ...mapActions(['updateAvail', 'createSnackbar']),

    editAvail: async function () {
      let newAvail = {
        id: this.id,
        title: this.titleInput,
        classSize: this.classSizeInput,
        start: this.startInput,
        end: this.endInput
      }
      try {
        await this.updateAvail(newAvail)
        this.onSuccessfulEdit(newAvail)
        this.createSnackbar({message: 'Successfully Edited!', color: 'success'})
      } catch (error) {
        console.log(error.response.data)
        this.createSnackbar({message: 'problem editing Availability', color: 'error'})
      }
    },

    getCurrentAvail: function () {
      for (let i = 0; i < this.avail.length; i++) {
        if (this.avail[i].id === this.id) {
          this.titleInput = this.avail[i].title
          this.classSizeInput = this.avail[i].classSize
          this.startInput = this.avail[i].start
          this.endInput = this.avail[i].end
        }
        console.log(this.titleInput)
        console.log(this.classSizeInput)
        console.log(this.startInput)
        console.log(this.endInput)
      }
    },

  }

}


</script>