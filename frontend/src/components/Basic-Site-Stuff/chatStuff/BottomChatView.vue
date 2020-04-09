<template>
<v-content style="margin: 0; padding: 0; height:250px; position: relative !important;">
  <v-content style="margin: 0; padding: 0;">
    <v-container ref="messagesBox" style="margin: 0; max-height: 200px; overflow: scroll">
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
  </v-content>
  <v-bottom-navigation absolute bottom style="padding: 0;">
      <v-text-field placeholder="Aa" style="border: 1px solid black; max-width: 500px !important; margin: 0; padding: 0;"
                    v-model="messageInput"></v-text-field>
      <v-btn style="margin: 0; padding: 0;" color="success" icon v-on:click="sendMessage()">
        <v-icon dark left>mdi-reply</v-icon>
      </v-btn>
    </v-bottom-navigation>
</v-content>
</template>

<script>
import axios from 'axios'
import {mapGetters, mapActions} from 'vuex'

export default {
  components: {
  },

  mounted: async function() {
    await this.updateMessages()
    this.scrollToBottom()
  },

  props: ['chat'],

  data: () => ({
    messageInput: '',
  }),

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
    ...mapActions([
      'sendNewMessage',
      'createSnackbar',
      'updateMessageSeen',
    ]),

    async updateMessages() {
      let theChat = this.chat
      let filteredMessages = this.allMessagesGetter.filter(
        msg => (
          (msg.author.id === theChat.otherUser.id && msg.sentTo === theChat.owner))
      )
      for (let i = 0; i < filteredMessages.length; i++) {
        try {
          await this.updateMessageSeen({id: filteredMessages[i].id})
        }catch(error) {
          this.createSnackbar({message: 'Problem viewing messages.', color: 'error'})
        }
      }
    },

    scrollToBottom() {
      let content = this.$refs.messagesBox
      content.scrollTop = content.scrollHeight
    },

    async sendMessage() {
      let messageToSend = this.messageInput
      try {
        await this.sendNewMessage({to: this.theChat.otherUser.id, content: messageToSend})
        this.createSnackbar({message: 'Message sent.', color: 'success'})
        this.scrollToBottom()
        this.messageInput = ''
      } catch (error) {
        console.log(error.response.data)
        this.createSnackbar({message: 'Problem sending message.', color: 'error'})
      }
    },

  },
}
</script>