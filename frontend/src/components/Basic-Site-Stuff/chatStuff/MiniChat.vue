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
        v-for="(item) in myChats"
        v-bind:key="item.id"
      >
        <v-list-item-avatar>
          <v-icon
            v-text="item.icon"
            color="green"
            dark
          >mdi-leaf</v-icon>
        </v-list-item-avatar>

        <div style="display: block;">
          <v-list-item-title>{{item.name}}</v-list-item-title>
          <v-list-item-content>{{item.message}}</v-list-item-content>
        </div>

        <v-list-item-avatar v-if="item.unread">
          <v-icon
            v-text="item.icon"
            color="red"
          >mdi-circle</v-icon>
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
    myChats: [
      {name: 'Marie', message:'hey are you there?', unread: true},
      {name: 'Chels', message:'want to get brunch this weekend?', unread: true},
      {name: 'Alex', message:'I\'m working now', unread: true},
      {name: 'Heyzeus', message:'What\'s for dinner tonight?', unread: false},
      {name: 'Ju', message:'When are you coming home?', unread: false},
      {name: 'Mike', message:'Date this weekend?', unread: true},
      {name: 'Ruth', message:'I\'m working on the AI project', unread: false},
    ],
    searchInput: '',
  }),

  components: {
  },

  computed: {
		...mapGetters([]),
    numberUnread() {
      let num = 0;
      for (let i = 0; i < this.myChats.length; i++) {
        if (this.myChats[i].unread) {
          num++
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