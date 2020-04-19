<template>
    <v-content>
        <v-card style="padding: 20px;">
            <v-card-title>Add a Note Set</v-card-title>
             <v-text-field label="Title" v-model="titleInput"></v-text-field>
            <v-text-field label="Description" v-model="descriptionInput"></v-text-field>
            <v-file-input counter multiple label="Input files" v-model="filesInput"></v-file-input>
            <v-combobox
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
        </v-card>
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
                const id = await this.newNoteSet({title: this.titleInput, description: this.descriptionInput, files: this.filesInput})
                await this.updateSubjects(id)
                this.createSnackbar({message: 'Notes uploaded', color:'success'})
                this.submit()
            }catch(error){
                this.createSnackbar({message: 'Problem uploading notes', color: 'error'})
            }
        }
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
  }

};

</script>