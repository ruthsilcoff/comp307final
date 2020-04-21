<template>
<v-content style="padding: 20px;">
    <v-card-title>Add a Note Set</v-card-title>
    <v-divider></v-divider>
     <v-text-field style="width: 100%;" label="Title" v-model="titleInput"></v-text-field>
    <v-text-field style="width: 100%;" label="Description" v-model="descriptionInput"></v-text-field>
    <div class="noHoverDrop" style="width: 100%; border: 2px dashed black; margin-bottom: 20px;" id="dragDropPhotoBox" v-cloak @drop.prevent="addFile" @dragover.prevent="activateDragOver" @dragleave="deactivateDragOver">
      <h3>{{text}}</h3>
      <v-file-input counter multiple label="Input files" v-model="filesInput" v-on:change="updateFileList"></v-file-input>
      <ul>
        <li v-for="file in files" v-bind:key="file.name">
          {{ file.name }} ({{ file.size | kb }} kb) <button @click="removeFile(file)" title="Remove">X</button>
        </li>
      </ul>
    </div>
    <v-combobox
        style="width: 100%;"
        v-model="subjectsInput"
        :items="allSubjectNames"
        :search-input.sync="search"
        chips
        clearable
        label="Subjects"
        multiple
        solo
      >
    <template v-if="!(((search === '') || !search) && (subjectsInput.length > 0))" v-slot:no-data>
      <div style="margin: 0; padding: 5px;" v-if="search && (search !== '') ">
        <div style="margin: 0; padding: 0;">This subject does not exist.</div>
        <div style="margin: 0; padding: 0;">Press <kbd v-on:click="addNewSubject({name: search})">enter</kbd> to create a new one</div>
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
    <v-row>
        <v-btn color="success" v-on:click="createNoteSet()">
            Submit
        </v-btn>
        <v-btn color="error" v-on:click="cancel()">
            Cancel
        </v-btn>
    </v-row>
</v-content>
</template>

<script>
import axios from "axios"
import {mapActions, mapGetters} from 'vuex'
import ViewNoteSets from "./ViewNoteSets"

export default {
  computed: {
    ...mapGetters(['noteSetsGetter', 'subjectsGetter']),
    allSubjectNames() {
      return this.subjectsGetter.map(subject => subject.name)
    },
  },
    props: ['cancel', 'submit'],

  data: () => ({
    titleInput:'',
    descriptionInput: '',
    filesInput: [],
    subjectsInput: [],
    search: null,
    files: [],
    text: 'Files to Upload (Drag them over)'
  }),

  methods: {
    ...mapActions(['createSnackbar', 'newNoteSet', 'addNewSubject', 'addNoteSetSubject']),

    createNoteSet: async function() {
        if (this.titleInput === '') {
            this.createSnackbar({message: 'Title is required', color: 'error'})
        }
        else if (this.descriptionInput === '') {
            this.createSnackbar({message: 'Description is required', color: 'error'})
        }
        else {
            try {
                for (let i = 0; i < this.files.length; i++) {
                    this.filesInput.push(this.files[i])
                }
                const id = await this.newNoteSet({title: this.titleInput, description: this.descriptionInput, files: this.filesInput})
                await this.updateSubjects(id)
                this.createSnackbar({message: 'Notes uploaded', color:'success'})
                this.submit()
            }catch(error){
                this.createSnackbar({message: 'Problem uploading notes', color: 'error'})
            }
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
    async updateSubjects(id) {
      for (let i = 0; i < this.subjectsInput.length; i++) {
        if (this.allSubjectNames.includes(this.subjectsInput[i]) ) {
            await this.addNoteSetSubject({name: this.subjectsInput[i], id: id})
        }
        else {
            await this.addNewSubject({name: this.subjectsInput[i]})
            await this.addNoteSetSubject({name: this.subjectsInput[i], id: id})
        }
      }
    },
    remove (item) {
      this.subjectsInput.splice(this.subjectsInput.indexOf(item), 1)
      this.subjectsInput = [...this.subjectsInput]
    },
    updateFileList() {
      for (let i = 0; i < this.filesInput.length; i++) {
        if (!this.files[i]) {
          this.files.push(this.filesInput[i])
        }
      }
    },
  }

};

</script>

<style scoped>


</style>