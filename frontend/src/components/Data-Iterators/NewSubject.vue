<template>
  <v-app>
    <v-container style="height: 500px;">
      <h3>Add: </h3>
      <v-combobox
            v-model="subjectsInput"
            :items="allSubjectNames"
            :search-input.sync="search"
            chips
            clearable
            label="Subjects you teach"
            multiple
            solo
          >
        <template v-if="!(((search === '') || !search) && (subjectsInput.length > 0))" v-slot:no-data>
          <div style="margin: 0; padding: 5px;" v-if="search && (search !== '') ">
            <div style="margin: 0; padding: 0;">This subject does not exist.</div>
            <div style="margin: 0; padding: 0;">Press <kbd v-on:click="addNewSubject({name: search})">enter</kbd> to create a new one</div>
          </div>
          <div style="margin: 0; padding: 5px;" v-if="(search === '' || !search) && (subjectsInput.length === 0) && (subjectsNotTaught.length === 0)">
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
          <v-btn
              style="margin: 0;"
              v-on:click="updateSubjectsTaught()"
              color="success">
            <v-icon left>mdi-content-save</v-icon>Save
          </v-btn>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios"
import Header from "../Basic-Site-Stuff/Header"
import {mapGetters, mapActions} from 'vuex'

export default {
  props: ['closeEditingSubjects'],

  computed: {
    ...mapGetters(['subjectsOneTeacher', 'subjectsGetter', 'myID', 'viewingUser']),
    subjects() {
      return this.subjectsGetter
    },
    subjectsTaught() {
      if (this.viewingUser) {
        if (this.viewingUser.profile.isTeacher) {
          let things = this.subjectsOneTeacher(this.myID)
          if (things.length > 0) {
            return things.map(thing => thing.subject ? thing.subject.name : thing)
          }
          else {
            return []
          }
        }
        else {
          return []
        }
      }
      else {
        return []
      }
    },
    subjectsNotTaught() {
      return this.subjectsGetter.filter(subject => !this.subjectsTaught.includes(subject.name))
    },
    allSubjectNames() {
      if (this.subjectsNotTaught) {
        return this.subjectsNotTaught.map(subject => subject.name)
      }
      else {
        return []
      }
    },
  },

  data: () => ({
    subjectsInput: [],
    search: null,
  }),

  methods: {
    ...mapActions(['addNewSubject', 'addTeacherSubject', 'createSnackbar']),

    async updateSubjectsTaught() {
      for (let i = 0; i < this.subjectsInput.length; i++) {
        if (!this.subjectsTaught.includes(this.subjectsInput[i])) {
          if (this.allSubjectNames.includes(this.subjectsInput[i]) ) {
            try {
              await this.addTeacherSubject({name: this.subjectsInput[i]})
              this.createSnackbar({message: "Subject added to list", color: 'success'})
            }catch(error) {
              this.createSnackbar({message: "Problem adding subject", color: 'error'})
            }
          }
          else {
            try {
              await this.addNewSubject({name: this.subjectsInput[i]})
              await this.addTeacherSubject({name: this.subjectsInput[i]})
              this.createSnackbar({message: "New subject created and added to list", color: 'success'})
            }catch(error) {
              this.createSnackbar({message: "Problem adding subject", color: 'error'})
            }
          }
        }
        else {
          this.closeEditingSubjects()
        }
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
    }
  }

};

</script>
