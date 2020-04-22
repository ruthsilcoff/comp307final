<template>
  <v-container>
    <h3>Add subjects: </h3>
    <v-combobox
          v-model="subjectsInput"
          :items="allSubjectNames"
          :search-input.sync="search"
          chips
          clearable
          label="Subjects related to this set"
          multiple
          solo
        >
      <template v-if="!(((search === '') || !search) && (subjectsInput.length > 0))" v-slot:no-data>
        <div style="margin: 0; padding: 5px;" v-if="search && (search !== '') ">
          <div style="margin: 0; padding: 0;">This subject does not exist.</div>
          <div style="margin: 0; padding: 0;">Press <kbd v-on:click="addNewSubject({name: search})">enter</kbd> to create a new one</div>
        </div>
        <div style="margin: 0; padding: 5px;" v-if="(search === '' || !search) && (subjectsInput.length === 0) && (subjectsNotIncluded.length === 0)">
          <div style="margin: 0; padding: 0;">You are already teaching all existing subjects.</div>
          <div style="margin: 0; padding: 0;">Feel free to create a new one.</div>
        </div>
      </template>
        <template v-slot:item="{ item }">
          <v-chip
            >
              <strong>{{ item }}</strong>&nbsp;
            </v-chip>

        </template>
          <template v-slot:selection="{ attrs, item, select, selected }">
            <v-chip
              v-bind="attrs"
              :input-value="selected"
              close
              @click="select"
              @click:close="remove(item)"
            >
              <strong>{{ item }}</strong>&nbsp;
            </v-chip>

          </template>
        </v-combobox>
    <div class="noHoverDrop" style="border: 2px dashed black" id="dragDropPhotoBox" v-cloak @drop.prevent="addFile" @dragover.prevent="activateDragOver" @dragleave="deactivateDragOver">
      <h3>{{text}}</h3>
      <v-file-input counter multiple label="Input files" v-model="files"></v-file-input>
      <ul>
        <li v-for="file in files" v-bind:key="file.name">
          {{ file.name }} ({{ file.size | kb }} kb) <button @click="removeFile(file)" title="Remove">X</button>
        </li>
      </ul>
    </div>
    <v-btn
        style="margin: 0;"
        v-on:click="updateSubjects()"
        color="success">
      <v-icon left>mdi-content-save</v-icon>Save
    </v-btn>
  </v-container>
</template>

<script>
import axios from "axios"
import Header from "../Basic-Site-Stuff/Header"
import {mapGetters, mapActions} from 'vuex'

export default {
  props: ['closeEditingSubjects', 'id'],

  computed: {
    ...mapGetters(['subjectsOneNoteSet', 'subjectsGetter', 'myID', 'viewingUser']),
    relatedSubjects() {
      console.log("recomputing")
      let things = this.subjectsOneNoteSet(parseInt(this.id))
      if (things.length > 0) {
        console.log(things)
        return things.map(thing => thing.subject.name)
      }
      else {
        return []
      }
    },
    subjectsNotIncluded() {
      if (this.relatedSubjects) {
        return this.subjectsGetter.filter(subject => !this.relatedSubjects.includes(subject.name))
      }
      else {
        return []
      }
    },
    allSubjectNames() {
      if (this.subjectsNotIncluded) {
        return this.subjectsNotIncluded.map(subject => subject.name)
      }
      else {
        return []
      }
    },
  },

  data: () => ({
    subjectsInput: [],
    search: null,
    files: [],
    text: 'Files to Upload (Drag them over)'
  }),

  methods: {
    ...mapActions(['addNewSubject', 'addNoteSetSubject', 'createSnackbar', 'addNoteSetContent']),

    async updateSubjects() {
      for (let i = 0; i < this.subjectsInput.length; i++) {
        if (!this.relatedSubjects.includes(this.subjectsInput[i])) {
          if (this.allSubjectNames.includes(this.subjectsInput[i]) ) {
            try {
              await this.addNoteSetSubject({name: this.subjectsInput[i], id: parseInt(this.id)})
              this.createSnackbar({message: "Subject added to list", color: 'success'})
            }catch(error) {
              this.createSnackbar({message: "Problem adding subject", color: 'error'})
              return
            }
          }
          else {
            try {
              await this.addNewSubject({name: this.subjectsInput[i]})
              await this.addNoteSetSubject({name: this.subjectsInput[i], id: this.id})
              this.createSnackbar({message: "New subject created and added to list", color: 'success'})
            }catch(error) {
              this.createSnackbar({message: "Problem adding subject", color: 'error'})
              return
            }
          }
        }
      }
      try {
        await this.addNoteSetContent({id: parseInt(this.id), files: this.files})
      }catch(error) {
        this.createSnackbar({message:'Problem adding files to note set', color: 'error'})
        return
      }
      this.closeEditingSubjects()
    },
    remove (item) {
      this.subjectsInput.splice(this.subjectsInput.indexOf(item), 1)
      this.subjectsInput = [...this.subjectsInput]
    },
    addSubjects: function() {
      try {
        this.addNewSubject({name: this.subjectInput})
        this.createSnackbar({message: 'New subject added', color:'success'})
      }catch(error) {
        this.createSnackbar({message: 'Problem adding new subject', color:'error'})
      }
    },
    activateDragOver() {
      document.getElementById('dragDropPhotoBox').className = "hoverDrop"
      this.text = 'Drop file'
    },
    deactivateDragOver() {
      document.getElementById('dragDropPhotoBox').className = "noHoverDrop"
      this.text = 'Files to Upload (Drag them over)'
    },
    addFile(e) {
      let droppedFiles = e.dataTransfer.files;
      if(!droppedFiles) return;
      // this tip, convert FileList to array, credit: https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
      ([...droppedFiles]).forEach(f => {
        this.files.push(f);
      });
      document.getElementById('dragDropPhotoBox').className = "noHoverDrop"
      this.text = 'Files to Upload (Drag them over)'
    },
    removeFile(file){
      this.files = this.files.filter(f => {
        return f != file;
      });
    },
  }

};

</script>

<style scoped>



</style>