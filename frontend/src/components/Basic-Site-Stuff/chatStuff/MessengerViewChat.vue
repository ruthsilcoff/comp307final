<template>
<v-content id="mySpecialBox" style=" padding: 0; height: 80vh; position: relative !important;">
  <v-container ref="messagesContainer" style="overflow:scroll; padding-bottom: 50px; max-height: 70vh;">
    <v-row v-for="item in theChat.messages" v-bind:key="item.id">
      <v-col v-if="item.author.id !== myID" cols="12" align="left">
        <v-chip >
          <v-avatar large v-if="item.author.profile.avatar" left>
            <v-img :src="item.author.profile.avatar"></v-img>
          </v-avatar>
          <v-avatar large v-if="!item.author.profile.avatar" left color="blue">
            {{item.author.username[0]}}
          </v-avatar>
          {{item.content}}
        </v-chip>
        <span v-if="item.author.id !== myID" class="subtitle-1">{{item.dateSent.getHours() + ":" + item.dateSent.getMinutes()}}</span>
      </v-col>
      <v-col v-if="item.author.id === myID" cols="12" align="right">
        <v-chip>
          <v-avatar large v-if="item.author.profile.avatar" left>
            <v-img :src="item.author.profile.avatar"></v-img>
          </v-avatar>
          <v-avatar large v-if="!item.author.profile.avatar" left color="red">
            {{item.author.username[0]}}
          </v-avatar>
          {{item.content}}
        </v-chip>
        <span v-if="item.author.id === myID" class="subtitle-1">{{item.dateSent.getHours() + ":" + item.dateSent.getMinutes()}}</span>
      </v-col>
    </v-row>
  </v-container>
  <v-bottom-navigation absolute bottom >
  <v-file-input
    dense
    style="margin-right: 40px; max-width: 0 !important;"
    accept="image/png, image/jpeg, image/bmp"
    prepend-icon="mdi-camera"
    v-model="photoInput"
  ></v-file-input>

  <v-text-field placeholder="Aa" style="border: 1px solid black; max-width: 300px !important;"
                v-model="messageInput"></v-text-field>

  <v-spacer></v-spacer>

  <v-btn style="margin: 0; padding: 0;" color="success" v-on:click="sendMessage">
    <v-icon dark left>mdi-reply</v-icon>
    Send
  </v-btn>
</v-bottom-navigation>
</v-content>
</template>


<script>

import {mapGetters, mapActions} from "vuex"


export default {

  mounted() {
    this.scrollToBottom()
  },

  data: () => ({
    messageInput: null,
    photoInput: null,
  }),

  props: ['chat'],

  computed: {
    ...mapGetters(['myID', 'allMessagesGetter']),
    theChat() {
      let theChat = this.chat
      let filteredMessages = this.allMessagesGetter.filter(
        msg => ((msg.author.id === theChat.owner && msg.sentTo === theChat.otherUser.id)
          || (msg.author.id === theChat.otherUser.id && msg.sentTo === theChat.owner)),
      )
      theChat.messages = filteredMessages
      theChat.mostRecent = theChat.messages[(filteredMessages.length) - 1]
      return theChat
    },
  },

  methods: {
    ...mapActions(['sendNewMessage', 'createSnackbar',]),
    scrollToBottom() {
      let content = this.$refs.messagesContainer
      content.scrollTop = content.scrollHeight
    },
    async sendMessage() {
      try {
        await this.sendNewMessage({to: this.theChat.otherUser.id, content: this.messageInput})
        this.createSnackbar({message: 'Message sent.', color: 'success'})
        this.scrollToBottom()
      } catch(error){
        console.log(error.response.data)
        this.createSnackbar({message: 'Problem sending message.', color: 'error'})
      }
      this.setMessageDialog(false)
    },
  }
}

</script>