<template>
<div>
  <div class="message" v-for="(item, index) in theChat.messages" v-bind:key="item.id" :class="item.author.id === myID ? 'own' : 'notOwn'">
    <div class="username" v-if="index>0 && theChat.messages[index-1].author.id != item.author.id">{{item.author.username}}</div>
    <div class="username" v-if="index == 0">{{item.author.username}}</div>
    <div style="margin-top: 5px"></div>
    <v-chip >
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
</template>

<script>

import {mapGetters, mapActions} from "vuex"


export default {

  mounted() {
  },

  data: () => ({

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
    ...mapActions([]),

  }
}

</script>

<style scoped>

.message{
  margin-bottom: 3px;
}
.message.own{
  text-align: right;
}

.username{
  font-size: 18px;
  font-weight: bold;
}

@media (max-width: 480px) {
  .content {
    max-width: 60%;
  }
}



</style>