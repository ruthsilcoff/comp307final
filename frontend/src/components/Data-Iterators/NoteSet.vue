<template>
<v-content v-if="this.theSet" style="margin-left: 10%;margin-right: 10%; margin-top: 30px;">
  <v-card width="50vm" style="padding: 20px;">
    <v-btn absolute right="0" top="0" text v-if="!editingSubjects" v-on:click="openEditingSubjects" color="secondary">
      <v-icon left>mdi-pencil</v-icon>Edit
    </v-btn>
    <h1>Note Set: <strong> {{" " + this.theSet.title}}</strong></h1>
    <v-divider style="margin-top: 10px; margin-bottom: 10px;"></v-divider>
    <h2>{{this.theSet.description}}</h2>
    <v-chip-group style="margin-left: 10px;" column v-if="(subjects.length > 0) && (subjects[0])">
      <v-chip :close="editingSubjects" @click:close="removeSubject(item)" v-for="item in subjects" v-bind:key="item.name">
        <strong v-if="item">{{item.name}}</strong>
      </v-chip>
    </v-chip-group>

    <v-divider v-if="editingSubjects"></v-divider>

    <EditNoteSet :id="id" :closeEditingSubjects="closeEditingSubjects" v-if="editingSubjects"/>

    <div v-for="(file, index) in theSet.content" v-bind:key="file.id">
        <v-divider style="margin-top: 10px; margin-bottom: 10px;"></v-divider>
        <v-list-item-subtitle>
            File {{index + 1}}:
            <a style="text-decoration: underline" :href="file.content">
                {{file.content.split("/")[6]}}
            </a>
        </v-list-item-subtitle>
        <v-img max-height="200" max-width="200" :src="file.content"></v-img>

    </div>
  </v-card>

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