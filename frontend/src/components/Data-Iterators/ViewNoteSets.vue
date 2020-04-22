<template>
<v-content style="padding: 0;">
  <v-toolbar style="margin-bottom: 30px;" fixed absolute width="100%" floating color="primarydarken1">
    <v-toolbar-title class="title">Note Sets</v-toolbar-title>
    <v-row style="margin-left: 20px; margin-right: 40px" align="center" justify="center">
      <v-text-field
          dense
          class="d-none d-md-flex"
          solo-inverted
          flat
          hide-details
          label="Search"
          prepend-inner-icon="mdi-magnify"
          style="width: 120px !important"
          v-model="searchInput"
          v-on:keyup="filterNoteSets"
      ></v-text-field>
    </v-row>
    <v-row align="center" justify="center">
      <v-select
          style="margin-left: 18px;margin-right: 18px;margin-top: 22px; width: 80px !important"
          label="Subject"
          :items="options"
          v-model="filter"
          v-on:change="filterNoteSets">
      </v-select>
    </v-row>
    <v-spacer></v-spacer>
    <v-btn style="padding: 0;" icon v-if="!isViewing && !addingNoteSet" v-on:click="openNewNoteSet"
           color="success" large>
      <v-icon>mdi-pencil-box-outline</v-icon>
    </v-btn>
  </v-toolbar>

  <v-content style="margin-top: 70px; padding: 0;">

    <NewNoteSet v-if="addingNoteSet" :submit="submitNoteSet" :cancel="submitNoteSet"/>
    <div>
      <v-list three-line>
        <div v-for="(item, idx) in filteredNoteSets" v-bind:key="item.id">
          <v-divider v-if="idx > 0"></v-divider>
          <v-list-item class="listHighlight" link>
            <div style="display: flex; position: absolute !important; top:0; right: 0;">
              <router-link :to="'/noteSet/' + item.id">
                <v-btn title="view note" style="margin:0; padding: 0;" v-if="!isViewing" icon
                       color="info">
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
              </router-link>
              <v-btn title="delete note" style="margin:0; padding: 0;" v-if="!isViewing" icon
                     color="error" v-on:click="removeNote(item)"><strong>X</strong></v-btn>
            </div>
            <div style="display: block;">
              <h2>
                {{item.title}}
              </h2>
              <v-list-item-subtitle style="margin-bottom: 10px;">
                {{item.description}}
              </v-list-item-subtitle>

              <div v-for="(file, index) in item.content" v-bind:key="file.id">
                <v-divider style="margin-top: 10px; margin-bottom: 10px;"></v-divider>
                <v-list-item-subtitle>
                  File {{index + 1}}:
                  <a style="text-decoration: underline" :href="file.content">
                    {{file.content.split("/")[6]}}
                  </a>
                </v-list-item-subtitle>
                <v-img max-height="200" max-width="200" :src="file.content"></v-img>

              </div>
            </div>
          </v-list-item>
        </div>

      </v-list>
    </div>

  </v-content>
</v-content>
</template>


<script>
import axios from "axios"
import {mapActions, mapGetters} from 'vuex'
import NewNoteSet from "../Data-Iterators/NewNoteSet"

export default {
  data: () => ({
    filteredNoteSets: [],
    filter: 'All',
    options: ['All'],
    addingNoteSet: false,
    searchInput: '',
  }),

  components: {
    NewNoteSet,
  },

  props: ['isViewing'],

  computed: {
    ...mapGetters(['noteSetsGetter', 'subjectsOneNoteSet', 'viewingID']),
    unfilteredNoteSets() {
      let noteSets = this.noteSetsGetter
      let result = []
      for (let i = 0; i < noteSets.length; i++) {
        if (noteSets[i].userID === this.viewingID) {
          let things = this.subjectsOneNoteSet(noteSets[i].id).map(thing => thing.subject.name)
          let set = noteSets[i]
          set.subjects = things
          result.push(set)
        }
      }
      return result
    },
  },

  mounted() {
    while (!this.unfilteredNoteSets) {
      console.log("repeating loop")
    }
    this.filteredNoteSets = this.unfilteredNoteSets
    for (let i = 0; i < this.filteredNoteSets.length; i++) {
      for (let j = 0; j < this.filteredNoteSets[i].subjects.length; j++) {
        if (!this.options.includes(this.filteredNoteSets[i].subjects[j])) {
          this.options.push(this.filteredNoteSets[i].subjects[j])
        }
      }
    }
  },

  methods: {
    ...mapActions(['deleteNote', 'createSnackbar']),

    filterNoteSets() {
      if (this.searchInput !== '') {
        this.filteredNoteSets = this.unfilteredNoteSets.filter(set => (set.title.includes(this.searchInput) || set.description.includes(this.searchInput)))
      } else {
        this.filteredNoteSets = this.unfilteredNoteSets
      }
      if (this.filter !== '' || this.filter !== 'All') {
        let result = []
        for (let i = 0; i < this.filteredNoteSets.length; i++) {
          for (let j = 0; j < this.filteredNoteSets[i].subjects.length; j++) {
            if (this.filter === this.filteredNoteSets[i].subjects[j]) {
              result.push(this.filteredNoteSets[i])
              break
            }
          }
        }
        this.filteredNoteSets = result
      }

    },
    openNewNoteSet() {
      this.addingNoteSet = true
    },
    submitNoteSet(noteSet) {
      this.filteredNoteSets.unshift(noteSet)
      this.addingNoteSet = false
    },

    async removeNote(item) {
      try {
        console.log(item.id)
        await this.deleteNote({id: item.id})
        let index = this.filteredNoteSets.indexOf(this.filteredNoteSets.find(s => s.id === item.id))
        this.filteredNoteSets.splice(index, 1)
        this.createSnackbar({message: 'Note Removed', color: 'success'})
      } catch (error) {
        console.log(error)
        this.createSnackbar({message: 'problem removing note', color: 'error'})
      }
    },

  }

}

</script>

<style scoped>

.listHighlight {
  padding-top: 20px;
  padding-bottom: 20px;
  cursor: default;
}


</style>