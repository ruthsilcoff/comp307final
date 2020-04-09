<template>
<v-card class="mx-auto" max-height="500px">
  <v-toolbar fixed absolute width="100%" floating color="yellowSwitch" >
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
          style="width: 160px !important"
      ></v-text-field>
    </v-row>
  </v-toolbar>
  <v-container style="overflow: scroll; max-height: 500px;" >
    <v-list dense style="margin-top: 65px; margin-bottom: 20px">
      <v-list-item
        three-line
        link
        v-for="(item) in myChatsGetter"
        v-bind:key="item.id"
        v-on:click="openBottomChat(item.id)"
      >
        <div v-if="item.mostRecent" style="display: flex;">
          <v-list-item-avatar>
            <v-icon
              color="green"
              dark
            >mdi-leaf</v-icon>
          </v-list-item-avatar>

          <div style="display: block;">
            <v-list-item-title v-if="item.otherUser.first_name">{{item.otherUser.first_name}} {{item.otherUser.last_name}}</v-list-item-title>
            <v-list-item-title v-if="!item.otherUser.first_name">{{item.otherUser.username}}</v-list-item-title>
            <v-list-item-content v-if="item.mostRecent">{{item.mostRecent.content}}</v-list-item-content>
          </div>

          <v-list-item-avatar v-if="(!item.mostRecent.seen) && (item.mostRecent.sentTo === myID)">
            <v-icon
              v-text="item.icon"
              color="red"
            >mdi-circle</v-icon>
          </v-list-item-avatar>

          <v-list-item-avatar v-if="(!item.mostRecent.seen) && (item.mostRecent.sentTo !== myID)">
            <v-icon
              v-text="item.icon"
              color="blue"
            >mdi-circle</v-icon>
          </v-list-item-avatar>
        </div>
      </v-list-item>
    </v-list>
  </v-container>
</v-card>
</template>

<script>
import {mapGetters, mapActions} from "vuex"

export default {
	data: () => ({
    viewingChat: null,

    searchInput: '',
  }),

  components: {
  },

  computed: {
    ...mapGetters(['allMessagesGetter', 'myChatsGetter', 'myID', 'leftDrawerGetter', 'rightDrawerGetter', 'openChatIDGetter']),
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
      for (let x = 0; x < this.myChats.length; x++) {
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
  },

  methods: {
    ...mapActions(['setMessageDialog', 'setOpenChatID']),
    openBottomChat(id) {
      if (!this.openChatIDGetter.includes(id))
      this.setOpenChatID({id: id, bool: true})
    },

  },

}


</script>

<style scoped>


</style>