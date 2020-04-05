<template>
<v-content style="margin: 0; padding: 0">
  <v-app id="inspire">
    <!-- LEFT DRAWER -->
    <v-navigation-drawer
      v-model="leftDrawerGetter"
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
            v-for="(item) in myChatsGetter"
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
    <v-content id="conversationBox" class="conversationBoxWhite" style="position: relative; margin: 20px; padding: 20px">
      <v-content v-if="this.viewingChat" >
        <h1 v-if="viewingChat.otherUser.first_name">{{this.viewingChat.otherUser.first_name}} {{this.viewingChat.otherUser.last_name}} </h1>
        <h1 v-if="!viewingChat.otherUser.first_name">{{this.viewingChat.otherUser.username}} </h1>
        <v-row v-for="item in viewingChat.messages" v-bind:key="item.id" :justify="(item.author.id === myID) ? 'right' : 'left'">
          <v-col>
            <v-chip-group >
              <v-chip style="margin-left: 30%;" v-if="item.author.id === myID">
                <v-avatar large v-if="item.author.profile.avatar" left>
                  <v-img :src="item.author.profile.avatar"></v-img>
                </v-avatar>
                <v-avatar large v-if="!item.author.profile.avatar" left color="red">
                  {{item.author.username[0]}}
                </v-avatar>
                {{item.content}}
              </v-chip>
              <v-chip v-if="item.author.id !== myID">
                <v-avatar large v-if="item.author.profile.avatar" left>
                  <v-img :src="item.author.profile.avatar"></v-img>
                </v-avatar>
                <v-avatar large v-if="!item.author.profile.avatar" left color="blue">
                  {{item.author.username[0]}}
                </v-avatar>
                {{item.content}}
              </v-chip>
            </v-chip-group>
            <span :style="(item.author.id === myID) ? 'margin-left: 30%;' : 'margin-left: 0;'"  class="subtitle-1">{{item.dateSent}}</span>
          </v-col>
        </v-row>

      </v-content>

      <div style="display: flex; position: absolute; left: 20%; right: 20%; bottom: 0; width: 100%; background-color: transparent;">
        <v-text-field placeholder="Aa" style="border: 1px solid black; max-width: 300px !important;" v-model="messageInput"></v-text-field>
        <v-file-input
          dense
          style="margin: 20px; max-width: 0 !important;"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Add Photo"
          prepend-icon="mdi-camera"
          v-model="photoInput"
        ></v-file-input>
        <v-btn large color="success" v-on:click="sendMessage"><v-icon dark left>mdi-reply</v-icon>Send</v-btn>
      </div>
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

export default {
	data: () => ({
    backgroundColor: 'white',
    messageInput: null,
    photoInput: '',
    viewingChat: null,
    snackbar: false,
    snackbarMessage: '',
    snackbarColor: '',
    timeout: 5000,
    mode: '',
    searchInput: '',
    drawer: null,
    drawerRight: false,
    right: false,
    left: false,
  }),

  components: {
  },

  computed: {
		...mapGetters(['myChatsGetter', 'myID', 'leftDrawerGetter', 'rightDrawerGetter']),
    numberUnread() {
      let num = 0;
      console.log(this.myChatsGetter)
      for (let x= 0; x< this.myChatsGetter.length; x++) {
        for (let i = 0; i < this.myChatsGetter[x].messages.length; i++) {
          if (!this.myChatsGetter[x].messages[i].seen && (this.myChatsGetter[x].messages[i].sentTo === this.myID)) {
            num++
          }
        }
      }
      return num
    },
  },

  mounted() {
    this.changeLeftDrawer(true)
  },

  methods: {
    ...mapActions(['setMessageDialog', 'logOut', 'sendNewMessage', 'createSnackbar', 'changeLeftDrawer']),
    openChat(item) {
      this.viewingChat = item
    },

    async sendMessage() {
      try {
        await this.sendNewMessage({to: this.viewingChat.otherUser.id, content: this.messageInput})
        this.createSnackbar({message: 'Message sent.', color: 'success'})
      } catch(error){
        console.log(error.response.data)
        this.createSnackbar({message: 'Problem sending message.', color: 'error'})
      }
      this.setMessageDialog(false)
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