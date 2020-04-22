<template>
<v-content style="margin:0; padding: 0;">
  <v-list v-if="lessons.length > 0">
    <router-link v-for="item in lessons" v-bind:key="item.id" :to="'/profile/' + item.teacher.username">

      <v-list-item link>
        <v-list-item-title>{{item.title}}</v-list-item-title>
        <v-list-item-subtitle>{{item.teacher.first_name + " " + item.teacher.last_name}}
        </v-list-item-subtitle>
      </v-list-item>
    </router-link>
  </v-list>
  <v-list-item v-if="lessons.length === 0">No lessons in this subject.</v-list-item>
</v-content>
</template>

<script>
import axios from "axios"
import {mapGetters, mapActions} from 'vuex'


export default {
  data: () => ({}),

  props: ['course'],

  computed: {
    ...mapGetters(['subjectsGetter', 'lessonsOneSubject']),
    lessons() {
      return this.lessonsOneSubject(this.course.name)
    },
  },

  methods: {},


}
</script>