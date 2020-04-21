<template>
<v-content style="margin: 0; padding: 0">
    <!-- LEFT DRAWER -->
    <v-navigation-drawer
      v-model="leftDrawerGetSet"
      app
      clipped
      left
      width="300px"
      mobile-break-point="500px"
      overlay-color="secondary"
      disable-resize-watcher
    >
      <v-toolbar fixed absolute width="100%" floating color="primarydarken1">
        <v-icon v-on:click="setMessageDialog(true)" style="position: absolute !important; right: 0; top:15px;" large >mdi-pencil-box-outline</v-icon>
        <v-toolbar-title class="title">Chats({{this.numberUnread}})</v-toolbar-title>
        <v-row style="margin-left: 20px; margin-right: 40px" align="center" justify="center">
          <v-text-field
              dense
              class="d-none d-md-flex"
              solo-inverted
              flat
              hide-details
              label="Search"
              prepend-inner-icon="mdi-magnify"
              style="width: 100px !important"
              v-model="searchInput"
              v-on:keyup="filterChats"
          ></v-text-field>
        </v-row>
      </v-toolbar>
      <div style="overflow-y: scroll; margin-top: 20px;" >
        <v-list subheader two-line link>
          <v-subheader>Your Chats</v-subheader>
          <v-list-item
            v-for="(item) in chats"
            v-bind:key="item.id"
            v-on:click="openChat(item)"
          >
            <v-list-item-avatar color="avatarColor" x-large v-if="!item.otherUser.profile.avatar">
              {{item.otherUser.username[0]}}
            </v-list-item-avatar>
            <v-list-item-avatar x-large v-if="item.otherUser.profile.avatar">
              <v-img :src="item.otherUser.profile.avatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-if="item.otherUser.first_name">{{item.otherUser.first_name}} {{item.otherUser.last_name}}</v-list-item-title>
              <v-list-item-title v-if="!item.otherUser.first_name">{{item.otherUser.username}}</v-list-item-title>
             {{item.mostRecent.content}}
            </v-list-item-content>
            <v-list-item-avatar v-if="(!item.mostRecent.seen) && (item.mostRecent.sentTo === myID)">
              <v-icon
                v-text="item.icon"
                color="red"
              >mdi-circle</v-icon>
            </v-list-item-avatar>
            <v-list-item-avatar v-if="(!item.mostRecent.seen) && (item.mostRecent.sentTo === item.otherUser)">
              <v-icon
                v-text="item.icon"
                color="unreadColor"
              >mdi-circle-outline</v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>


    <!-- THE ACTUAL CONTENT OF THE PAGE-->
    <v-content v-if="viewingChat">
      <v-list-item>
        <v-list-item-avatar x-large v-if="viewingChat.otherUser.profile.avatar">
          <v-img :src="viewingChat.otherUser.profile.avatar"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>
          <h1 style="padding: 50px;" v-if="viewingChat.otherUser.first_name">{{this.viewingChat.otherUser.first_name}} {{this.viewingChat.otherUser.last_name}} </h1>
        <h1 style="padding: 50px;" v-if="!viewingChat.otherUser.first_name">{{this.viewingChat.otherUser.username}} </h1>
        </v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <div class="chat-container-messenger" v-on:scroll="onScroll" ref="chatContainerMessenger" >
        <MessengerViewChat :chat="viewingChat"/>
      </div>
      <v-content style="margin: 0; padding: 0;" class="typer">
        <input type="text" placeholder="Aa" v-on:keyup.enter="sendMessage" v-model="messageInput">
        <v-file-input
          dense
          style="margin-right: 40px; max-width: 0 !important;"
          accept="image/png, image/jpeg, image/bmp"
          prepend-icon="mdi-camera"
          v-model="photoInput"
        ></v-file-input>
      </v-content>
    </v-content>
</v-content>
</template>

<script>
import {mapGetters, mapActions} from "vuex"
import MessengerViewChat from '../chatStuff/MessengerViewChat'

export default {
  data: () => ({
    messageInput: null,
    photoInput: null,
    backgroundColor: 'white',
    viewingChat: null,
    timeout: 5000,
    mode: '',
    searchInput: '',
    chats: [],
  }),

  components: {
    MessengerViewChat,
  },

  computed: {
		...mapGetters(['allMessagesGetter', 'chatGetter', 'myID', 'leftDrawerGetter', 'rightDrawerGetter']),
    leftDrawerGetSet: {
      get() {
        return this.leftDrawerGetter
      },
      set(value) {
        return this.changeLeftDrawer(value)
      },
    },
    myChats() {
      let myChats = this.chatGetter.filter(chat => chat.owner === this.myID)
      let chats = []
      for (let x = 0; x < myChats.length; x++) {
        let chat = myChats[x]
        let filteredMessages = this.allMessagesGetter.filter(
          msg => ((msg.author.id === chat.owner && msg.sentTo === chat.otherUser.id)
            || (msg.author.id === chat.otherUser.id && msg.sentTo === chat.owner)),
        )
        chat.messages = filteredMessages
        chat.mostRecent = chat.messages[(filteredMessages.length) - 1]
        chats.push(chat)
      }
      return chats
    },
    numberUnread() {
      let num = 0;
      console.log(this.myChats)
      for (let x= 0; x< this.myChats.length; x++) {
        for (let i = 0; i < this.myChats[x].messages.length; i++) {
          if (!this.myChats[x].messages[i].seen && (this.myChats[x].messages[i].sentTo === this.myID)) {
            num++
          }
        }
      }
      return num
    },
  },

  mounted() {
    this.changeLeftDrawer(true)
    this.initialize()
    while (!this.myChats) {
      console.log("repeating loop")
    }
    this.chats = this.myChats
    this.scrollToBottom()
  },

  methods: {
    ...mapActions(['setMessageDialog', 'sendNewMessage', 'createSnackbar', 'changeLeftDrawer']),
    openChat(item) {
      this.viewingChat = item
    },

    filterChats() {
      if (this.searchInput != ''){
        this.chats = this.myChats.filter(chat => (chat.mostRecent.content.includes(this.searchInput) || chat.otherUser.username.includes(this.searchInput)))
      }
      else {
        this.chats = this.myChats
      }
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

    initialize() {
      if (this.myChats.length > 0) {
        this.viewingChat = this.myChats[0]
      }
    },

    onScroll() {

    },

    scrollToBottom() {
      let container = this.$el.querySelector('.chat-container-messenger')
      if (container) {
        container.scrollTop = container.scrollHeight
      }
    },

  },

}


</script>

<style scoped>

#messengerChatThing {
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}

.scrollable {
  overflow-y: auto;
  height: 90vh;
}
.typer{
  box-sizing: border-box;
  display: flex;
  align-items: center;
  bottom: 100px;
  height: 4.9rem;
  width: 100%;
  box-shadow: 0 -5px 10px -5px rgba(0,0,0,.2);
}
.typer input[type=text]{
  position: absolute;
  left: 2.5rem;
  padding: 1rem;
  width: 80%;
  background-color: var(--v-primary-lighten5);
  border: none;
  outline: none;
  font-size: 1.25rem;
}
.chat-container-messenger{
  box-sizing: border-box;
  height: calc(100vh - 20.5rem);
  overflow-y: auto;
  padding: 20px;
}

</style>