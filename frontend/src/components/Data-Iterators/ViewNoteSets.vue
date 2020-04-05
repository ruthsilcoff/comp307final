<template>
  <v-content>

    <v-list two-line>
      <v-list-item v-for="item in noteSetsGetter" v-bind:key="item.id" link >
        <router-link :to="'/noteSet/' + item.id">
          {{item.id}}

          <v-list-item-title>
            {{item.title}}
          </v-list-item-title>

          <v-list-item-subtitle>
            {{item.description}}
          </v-list-item-subtitle>

          <v-list-item-avatar v-if="item.content.length > 0">
            <v-img max-height="200px" max-width="200px" :src="item.content[0]"></v-img>
          </v-list-item-avatar>
        </router-link>
      </v-list-item>
    </v-list>

  </v-content>
</template>



<script>
import axios from "axios"
import {mapActions, mapGetters} from 'vuex'

export default {
  data: () => ({
  }),

  computed: {
    ...mapGetters(['noteSetsGetter']),
  },

  methods: {


  }

};

</script>