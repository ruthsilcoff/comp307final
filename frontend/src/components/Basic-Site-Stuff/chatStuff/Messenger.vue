<template>
<v-content style="margin: 0; padding: 0">
  <v-app id="inspire">
    <!-- LEFT DRAWER -->
    <v-navigation-drawer
      v-model="leftDrawerGetSet"
      app
      clipped
      left
      width="250px"
      mobile-break-point="500px"
      overlay-color="secondary"
      disable-resize-watcher
    >
      <v-toolbar fixed absolute width="100%" floating color="yellowSwitch" >
        <v-icon v-on:click="setMessageDialog(true)" dark style="position: absolute !important; right: 8px; top:15px;" large >mdi-pencil-box-outline</v-icon>
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
              style="width: 80px !important"
          ></v-text-field>
        </v-row>
      </v-toolbar>
      <div style="overflow: scroll; " >
        <v-list dense style="margin-top: 65px; margin-bottom: 20px">
          <v-list-item
            three-line
            link
            v-for="(item) in myChats"
            v-bind:key="item.id"
            v-on:click="openChat(item)"
          >
            <v-list-item-avatar>
              <v-icon
                color="green"
                dark
              >mdi-leaf</v-icon>
            </v-list-item-avatar>

            <div style="display: block;">
              <v-list-item-title v-if="item.otherUser.first_name">{{item.otherUser.first_name}} {{item.otherUser.last_name}}</v-list-item-title>
              <v-list-item-title v-if="!item.otherUser.first_name">{{item.otherUser.username}}</v-list-item-title>
              <v-list-item-content>{{item.mostRecent.content}}</v-list-item-content>
            </div>

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
    <v-content id="conversationBox" style=" position: relative !important;">
      <v-content style="margin: 0; padding: 0; " v-if="viewingChat">
        <h1 v-if="viewingChat.otherUser.first_name">{{this.viewingChat.otherUser.first_name}} {{this.viewingChat.otherUser.last_name}} </h1>
        <h1 v-if="!viewingChat.otherUser.first_name">{{this.viewingChat.otherUser.username}} </h1>
        <MessengerViewChat :chat="viewingChat"/>
      </v-content>

    </v-content>

    <!-- RIGHT DRAWER -->
    <v-navigation-drawer
      v-model="rightDrawerGetter"
      app
      clipped
      right
      width="220px"
      mobile-break-point="500px"
      overlay-color="secondary"
      disable-resize-watcher
    >
      <v-combobox
            style=" margin: 0;"
            v-model="backgroundColor"
            :items="['purple', 'blue', 'red', 'yellow', 'green', 'white', 'rainbow']"
            label="Background Color"
            required
            v-on:change="updateBackground"
        />
    </v-navigation-drawer>

  </v-app>
</v-content>
</template>

<script>
import {mapGetters, mapActions} from "vuex"
import MessengerViewChat from '../chatStuff/MessengerViewChat'

export default {
	data: () => ({
    backgroundColor: 'white',
    viewingChat: null,
    snackbar: false,
    snackbarMessage: '',
    snackbarColor: '',
    timeout: 5000,
    mode: '',
    searchInput: '',
  }),

  components: {
    MessengerViewChat,
  },

  computed: {
		...mapGetters(['allMessagesGetter', 'myChatsGetter', 'myID', 'leftDrawerGetter', 'rightDrawerGetter']),
    leftDrawerGetSet: {
      get() {
        return this.leftDrawerGetter
      },
      set(value) {
        return this.changeLeftDrawer(value)
      },
    },
    myChats() {
      let chats = []
      for (let x = 0; x < this.myChatsGetter.length; x++) {
        let chat = this.myChatsGetter[x]
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
  },

  methods: {
    ...mapActions(['setMessageDialog', 'sendNewMessage', 'createSnackbar', 'changeLeftDrawer']),
    openChat(item) {
      this.viewingChat = item
    },

    initialize() {
      if (this.myChats.length > 0) {
        this.viewingChat = this.myChats[0]
      }
    },

    updateBackground() {
      if (this.backgroundColor === 'blue') {
        document.getElementById("conversationBox").className = "conversationBoxBlue"
      }
      else if (this.backgroundColor === 'purple') {
        document.getElementById("conversationBox").className = "conversationBoxBlue"
      }
      else if (this.backgroundColor === 'red') {
        document.getElementById("conversationBox").className = "conversationBoxRed"
      }
      else if (this.backgroundColor === 'yellow') {
        document.getElementById("conversationBox").className = "conversationBoxYellow"
      }
      else if (this.backgroundColor === 'green') {
        document.getElementById("conversationBox").className = "conversationBoxGreen"
      }
      else if (this.backgroundColor === 'rainbow') {
        document.getElementById("conversationBox").className = "conversationBoxRainbow"
      }
      else {
        document.getElementById("conversationBox").style.background = this.backgroundColor
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

.conversationBoxWhite {
  background-color: white;
}

.conversationBoxPurple {
  background-color: #922fff;
}

.conversationBoxBlue {
  background-color: #00d3ff;
}

.conversationBoxYellow {
  background-color: #fff800;
}

.conversationBoxGreen {
  background-color: #00ff0f;
}

.conversationBoxRed {
  background-color: #de0007;
}

.conversationBoxRainbow {
  animation-name: messengerBackground;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes messengerBackground {
  0% {
    background-color: #00d3ff;
  }
  20% {
    background-color: #7950ff;
  }
  40% {
    background-color: #de0007;
  }
  60% {
    background-color: #fff800;
  }
  80% {
    background-color: #00ff0f;
  }
  100% {
    background-color: #00d3ff;
  }
}

</style>