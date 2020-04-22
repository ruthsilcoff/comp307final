<template>
<v-content style="margin: 0; padding: 0;">
  <v-list v-if="teachers.length > 0">
    <router-link v-for="(item, index) in teachers" v-bind:key="item.id" :to="'/profile/' + item.username">
      <v-divider v-if="index > 0"></v-divider>
      <v-list-item link>
        <v-chip link pill>
          <v-avatar left large v-if="!item.profile.avatar" color="blue">{{item.first_name[0]}}</v-avatar>
          <v-avatar left large v-if="item.profile.avatar">
            <v-img :src="item.profile.avatar"></v-img>
          </v-avatar>
          {{item.first_name + " " + item.last_name}}
        </v-chip>
      </v-list-item>
      <v-divider v-if="index < teachers.length - 1"></v-divider>
    </router-link>
  </v-list>
  <v-list-item v-if="teachers.length === 0">No teachers teach this subject.</v-list-item>
</v-content>
</template>

<script>
import axios from "axios"
import {mapGetters, mapActions} from 'vuex'


export default {
  data: () => ({}),

  props: ['course'],

  computed: {
    ...mapGetters(['teachersOneSubject']),
    teachers() {
      return this.teachersOneSubject(this.course.name)
    },
  },

}
</script>