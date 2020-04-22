<template>
  <v-dialog
    v-model="messageDialog"
    max-width="400"
  >
    <v-card style="padding: 10px;">
      <v-card-title class="headline">New message</v-card-title>

      <v-combobox
        v-model="personInput"
        :items="myCommunications"
        required
        label="To:"
      >
        <template v-slot:item="{ item }">
          <v-avatar v-if="item.profile.avatar" dark size="30"><v-img :src="item.profile.avatar"></v-img></v-avatar>
          <v-avatar v-if="!item.profile.avatar" dark size="30" color="avatarColor">{{item.username[0]}}</v-avatar>
          <span v-if="item.first_name">{{item.first_name}} {{item.last_name}}</span>
          <span v-if="!item.first_name">{{item.username}}</span>
        </template>

        <template v-slot:selection="{ item }">
          <span v-if="item.first_name">{{item.first_name}} {{item.last_name}}</span>
          <span v-if="!item.first_name">{{item.username}}</span>
        </template>

      </v-combobox>

      <v-textarea label="Content" v-model="contentInput"></v-textarea>

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

  mounted() {
    this.initialize()
  },

  computed: {
    ...mapGetters([
      'myUser',
      'newMessageDialog',
      'loggedIn',
      'allUsers',
      'personInputForMessageGetter',
    ]),
    myCommunications() {
      if (this.myUser.profile.isTeacher) {
        return this.allUsers.filter(user => !user.profile.isTeacher)
      }
      else {
        return this.allUsers.filter(user => user.profile.isTeacher)
      }
    },
    messageDialog: {
      get() {
        return this.newMessageDialog
      },
      set(value) {
        this.setMessageDialog(value)
      }
    },

  },

  methods: {
    ...mapActions(['getMyChatsAndAllMessages', 'setMessageDialog', 'sendNewMessage', 'createSnackbar', 'setPersonToMessage',]),
    initialize() {
      if (this.personInputForMessageGetter !== null) {
        this.personInput = this.personInputForMessageGetter
      }
      else {
        this.personInput = null
      }
    },

    cancelSend() {
      this.setMessageDialog(false)
    },

    async sendMessage() {
      try {
        await this.sendNewMessage({to: this.personInput.id, content: this.contentInput})
        await this.setPersonToMessage({user: null})
        this.setMessageDialog(false)
        this.getMyChatsAndAllMessages()
        this.createSnackbar({message: 'Message sent.', color: 'success'})
      } catch(error){
        console.log(error)
        this.createSnackbar({message: 'Problem sending message.', color: 'error'})
      }
    },
  },

}

</script>