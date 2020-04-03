<template>
<v-card class="mx-auto" max-height="500px">
  <v-toolbar fixed absolute width="100%" floating color="green" dark >
    <v-icon v-on:click="setMessageDialog(true)" dark style="position: absolute !important; right: 5px; top:5px;" large >mdi-pencil-box-outline</v-icon>
    <v-toolbar-title class="title">Chats({{this.numberUnread}})</v-toolbar-title>
    <div style="margin-left: 20px; margin-right: 40px" align="center" justify="center">
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
    </div>
  </v-toolbar>
  <div style="overflow: scroll; max-height: 500px;" >
    <v-list dense style="margin-top: 65px; margin-bottom: 20px">
      <v-list-item
        three-line
        link
        v-for="(item) in myChatsGetter"
        v-bind:key="item.id"
      >
        <v-list-item-avatar>
          <v-icon
            color="green"
            dark
          >mdi-leaf</v-icon>
        </v-list-item-avatar>

        <div style="display: block;">
          <v-list-item-title>{{item.otherUser.first_name}} {{item.otherUser.last_name}}</v-list-item-title>
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
          >mdi-reply</v-icon>
        </v-list-item-avatar>

      </v-list-item>
    </v-list>
  </div>
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
		...mapGetters(['myChatsGetter', 'myID']),
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
    ...mapActions(['setMessageDialog']),
    viewChat(item) {
    },

  },

}


</script>

<style scoped>


</style>