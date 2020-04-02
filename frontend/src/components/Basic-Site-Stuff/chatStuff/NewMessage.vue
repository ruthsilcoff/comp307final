<template>
  <v-dialog
    v-model="newMessageDialog"
    max-width="290"
  >
    <v-card style="padding: 10px;">
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="error"
          text
          @click="cancelSend()"
        >
          Cancel
        </v-btn>

        <v-btn
          color="success"
          text
          @click="sendMessage()"
        >
          Send <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-card-actions>

      <v-card-title class="headline">New message</v-card-title>

      <v-combobox
        v-model="personInput"
        :items="myFriends"
        required
        label="To:"
      >
        <template v-slot:item="{ item }">
          <v-avatar v-if="item.profile.avatar" dark size="30"><v-img :src="item.profile.avatar"></v-img></v-avatar>
          <v-avatar v-if="!item.profile.avatar" dark size="30" color="avatarColor">{{item.first_name[0]}}</v-avatar>
          <span>{{item.first_name}} {{item.last_name}}</span>
        </template>

      </v-combobox>

      <v-textarea label="Content" v-model="contentInput"></v-textarea>


    </v-card>
  </v-dialog>
</template>

<script>

import {mapActions, mapGetters} from "vuex"

export default {

  data: () => ({
    personInput: null,
    contentInput: '',
  }),

  computed: {
    ...mapGetters([
      'newMessageDialog',
      'loggedIn',
      'allUsers',
    ]),

  },

  methods: {
    ...mapActions(['setMessageDialog', 'sendNewMessage', 'createSnackbar', ]),
    cancelSend() {
      this.setMessageDialog(false)
    },

    async sendMessage() {
      try {
        await this.sendNewMessage({to: this.personInput.id, content: this.contentInput})
        this.createSnackbar({message: 'Message sent.', color: 'success', mode: ''})
      } catch(error){
        console.log(error.response.data)
        this.createSnackbar({message: 'Problem sending message.', color: 'error', mode: ''})
      }
      this.setMessageDialog(false)
    },
  },

}

</script>