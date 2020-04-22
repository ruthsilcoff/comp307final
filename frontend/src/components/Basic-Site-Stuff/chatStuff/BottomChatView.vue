<template>
<v-content style="margin: 0; padding: 0;">

  <div class="chat-container" v-on:scroll="onScroll" ref="chatContainer">
    <div class="message" v-for="(item, index) in theChat.messages" v-bind:key="item.id"
         :class="item.author.id === myID ? 'own' : 'notOwn'">
      <div class="username" v-if="index>0 && theChat.messages[index-1].author.id != item.author.id">
        {{item.author.username}}
      </div>
      <div class="username" v-if="index == 0">{{item.author.username}}</div>
      <div style="margin-top: 5px"></div>
      <v-chip>
        <v-avatar large v-if="item.author.profile.avatar" left>
          <v-img :src="item.author.profile.avatar"></v-img>
        </v-avatar>
        <v-avatar large v-if="!item.author.profile.avatar" left color="blue">
          {{item.author.username[0]}}
        </v-avatar>
        {{item.content}}
      </v-chip>
      <span class="subtitle-1">{{item.dateSent.getHours() + ":" + item.dateSent.getMinutes()}}</span>
    </div>
  </div>

  <div style="margin: 0; padding: 0;" class="typer">
    <input type="text" placeholder="Aa" v-on:keyup.enter="sendMessage" v-model="messageInput">
  </div>
</v-content>
</template>

<script>
import axios from 'axios'
import {mapGetters, mapActions} from 'vuex'

export default {
  components: {},

  mounted: async function () {
    await this.updateMessages()
    this.scrollToBottom()
  },

  props: ['chat'],

  data: () => ({
    messageInput: '',
    photoInput: null,
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
        } catch (error) {
          this.createSnackbar({message: 'Problem viewing messages.', color: 'error'})
        }
      }
    },

    onScroll() {

    },

    scrollToBottom() {
      let container = this.$el.querySelector('.chat-container')
      if (container) {
        container.scrollTop = container.scrollHeight
      }
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


<style scoped>

.message {
  margin-bottom: 3px;
}

.message.own {
  text-align: right;
}

.username {
  font-size: 15px;
  font-weight: bold;
}

@media (max-width: 480px) {
  .content {
    max-width: 60%;
  }
}

.typer {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  bottom: 100px;
  height: 2rem;
  width: 100%;
  box-shadow: 0 -10px 15px -5px rgba(0, 0, 0, .2);
}

.typer input[type=text] {
  position: absolute;
  left: 2.5rem;
  padding: 1rem;
  width: 80%;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 1.25rem;
}

.chat-container {
  box-sizing: border-box;
  height: 205px;
  overflow-y: auto;
  padding: 20px;
}

</style>