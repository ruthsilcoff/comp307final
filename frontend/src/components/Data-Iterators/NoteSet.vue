<template>
<v-content v-if="this.theSet" style="margin: 50px;">
  <h1>{{this.theSet.title}}</h1>
  <h2>{{this.theSet.description}}</h2>
  <v-chip-group style="margin-left: 10px;" column v-if="(subjects.length > 0) && (subjects[0])">
    <v-chip :close="editingSubjects" @click:close="removeSubject(item)" v-for="item in subjects" v-bind:key="item.name">
      <strong v-if="item">{{item.name}}</strong>
    </v-chip>
  </v-chip-group>

  <v-btn justify="center" style="margin-bottom: 40px;" text v-if="!editingSubjects" v-on:click="openEditingSubjects" color="secondary">
    <v-icon left>mdi-pencil</v-icon>Edit
  </v-btn>

  <v-divider v-if="editingSubjects"></v-divider>

  <EditNoteSet :id="id" :closeEditingSubjects="closeEditingSubjects" v-if="editingSubjects"/>

  <div v-for="(item, index) in theSet.content" v-bind:key="item.id">
    <v-divider style="margin-top: 10px; margin-bottom: 10px;" v-if="index > 0"></v-divider>
    <h2>File {{index + 1}}</h2>
    <v-img :src="item.content" max-height="200px" max-width="200px"></v-img>
    <a style="text-decoration: underline" :href="item.content">Download</a>
  </div>


</v-content>
</template>

<script>
import {mapGetters, mapActions} from "vuex"
import axios from "axios"
import NewNoteSetSubject from "./EditNoteSet"
import EditNoteSet from "./EditNoteSet";

export default {

  data: () => ({
    editingSubjects: false,
  }),

  props: ['id'],

  components: {
    EditNoteSet,
  },

  computed: {
		...mapGetters(['oneNoteSet', 'subjectsOneNoteSet']),

    theSet: function () {
      return this.oneNoteSet(parseInt(this.id))
    },
    subjects() {
      console.log("recomputing")
      let things = this.subjectsOneNoteSet(parseInt(this.id))
      if (things.length > 0) {
        console.log(things)
        return things.map(thing => thing.subject)
      }
      else {
        return []
      }
    },
  },

  methods: {
    ...mapActions(['createSnackbar', 'removeNoteSetSubject', 'addNewSubject', 'addNoteSetSubject']),
    async removeSubject(item) {
      try {
        await this.removeNoteSetSubject({name: item.name, id: parseInt(this.id)})
        this.createSnackbar({message: 'subject removed', color: 'success'})
      }catch(error) {
        this.createSnackbar({message: 'problem removing the subject', color: 'error'})
      }
    },

    openEditingSubjects() {
      this.editingSubjects = true
    },
    closeEditingSubjects() {
      this.editingSubjects = false
    },

  },

}

</script>

<style scoped>



</style>