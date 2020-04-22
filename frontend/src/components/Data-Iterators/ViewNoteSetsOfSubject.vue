<template>
<v-content style="margin: 0; padding: 0;">
  <v-list v-if="noteSets.length > 0">
    <router-link v-for="(item, index) in noteSets" v-bind:key="item.id" :to="'/noteSet/' + item.id">
      <v-divider v-if="index > 0"></v-divider>
      <v-list-item link>
        <v-list-item-title>{{item.title}}</v-list-item-title>
        <v-list-item-subtitle>{{item.description}}</v-list-item-subtitle>
        <v-list-item-subtitle v-if="item.author">{{item.author.first_name + " " + item.author.last_name}}
        </v-list-item-subtitle>
      </v-list-item>
      <v-divider v-if="index < noteSets.length - 1"></v-divider>
    </router-link>
  </v-list>
  <v-list-item v-if="noteSets.length === 0">No note sets.</v-list-item>
</v-content>
</template>

<script>
import axios from "axios"
import {mapGetters, mapActions} from 'vuex'


export default {
  data: () => ({}),

  props: ['course'],

  computed: {
    ...mapGetters(['noteSetsOneSubject']),
    noteSets() {
      let result = this.noteSetsOneSubject(this.course.name)
      console.log(result)
      return result
    },
  },

}
</script>