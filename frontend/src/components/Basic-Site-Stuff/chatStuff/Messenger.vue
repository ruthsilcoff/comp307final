<template>
<v-content style="margin: 0; padding: 0">
  <v-app id="inspire">
    <!-- LEFT DRAWER -->
    <v-navigation-drawer
      v-model="leftDrawerGetter"
      app
      clipped
      left
      width="220px"
      mobile-break-point="500px"
      overlay-color="secondary"
      disable-resize-watcher
    >
      <v-toolbar fixed absolute width="100%" floating color="green" dark >
        <v-icon v-on:click="setMessageDialog(true)" dark style="position: absolute !important; right: 5px; top:5px;" large >mdi-pencil-box-outline</v-icon>
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
          >
            <v-list-item-avatar v-on:click="openChat(item)">
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
    <v-content id="conversationBox"  style="position: relative; margin: 20px; padding: 20px">
      <v-content v-if="this.viewingChat" style="display: block; position: relative !important;">
        <h1 v-if="viewingChat.otherUser.first_name">{{this.viewingChat.otherUser.first_name}} {{this.viewingChat.otherUser.last_name}} </h1>
        <h1 v-if="!viewingChat.otherUser.first_name">{{this.viewingChat.otherUser.username}} </h1>
        <v-chip-group v-for="item in viewingChat.messages" v-bind:key="item.id">
          <v-chip style="margin-left:50%;" v-if="item.author === myID">
            {{item.content}} <span class="subtitle-1">{{item.dateSent}}</span>
          </v-chip>
          <v-chip v-if="item.author !== myID">
            <v-list-item-title>{{item.content}}</v-list-item-title>
            <v-list-item-subtitle>{{item.dateSent}}</v-list-item-subtitle>
          </v-chip>
        </v-chip-group>
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

  </v-app>
</v-content>
</template>

<script>
import {mapGetters, mapActions} from "vuex"

export default {
	data: () => ({
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
		...mapGetters(['myChatsGetter', 'myID', 'leftDrawerGetter']),
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
  },

  methods: {
    ...mapActions(['setMessageDialog', 'logOut', 'sendNewMessage', 'createSnackbar']),
    openChat(item) {
      this.viewingChat = item
    },

    async sendMessage() {
      try {
        await this.sendNewMessage({to: this.viewingChat.otherUser.id, content: this.messageInput})
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

<style scoped>

#messengerChatThing {
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}

</style>