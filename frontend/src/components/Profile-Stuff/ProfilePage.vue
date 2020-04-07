<template>
<v-content v-if="viewingUser">
  <v-content id="innerPage">
    <v-row style="padding: 0; margin: 0;">
      <v-col cols="4">
        <v-card style="width: 300px; position: relative !important;">
          <v-card-title>
            <v-avatar v-on:mouseenter="showAvatarInput = true" style="position:relative !important" v-if="viewingUser.profile.avatar !== null" size="200px">
              <v-img :src="viewingUser.profile.avatar"></v-img>
            </v-avatar>
            <v-avatar v-on:mouseenter="showAvatarInput = true" style="position:relative !important" v-if="viewingUser.profile.avatar == null" size="200px" color="cyan">{{viewingUser.first_name[0]}}</v-avatar>
            <v-file-input
                v-if="showAvatarInput"
                position="absolute"
                hide-details="auto"
                accept="image/png, image/jpeg, image/bmp"
                prepend-icon="mdi-camera"
                v-model="avatarInput"
                style="width: 0 !important; position:absolute !important; top: 35%; left: 40%;"
                v-on:change="submitAvatar"
            ></v-file-input>
          </v-card-title>
          <h3 style="margin-left:10px;">{{ viewingUser.username }}</h3>
          <v-card-text>
            <EditProfile v-if="editingProfile === true" :userData="viewingUser"
                         :cancelEdit="cancelEdit"
                         :onSuccessfulEdit="onSuccessfulEdit" />

            <v-divider ></v-divider>

            <h1 style="margin: 10px;" v-if="viewingUser.profile.bio && !editingProfile">{{ viewingUser.profile.bio }} </h1>

            <v-divider ></v-divider>

            <h3 style="margin: 10px;" class="grey--text" v-if="viewingUser.profile.country && !editingProfile">
              <v-icon small color="grey">mdi-map-marker</v-icon>
              {{ viewingUser.profile.country }}
            </h3>

            <v-divider ></v-divider>

            <h3 style="margin: 10px;" v-if="viewingUser.profile.rate && !editingProfile">Hourly Rate: {{ viewingUser.profile.rate}}</h3>

            <v-row justify="center">
              <v-btn style="margin: 0;" v-if="!isViewing && !editingProfile" color="secondary" text medium v-on:click="editProfilePage()">
                <v-icon >mdi-pencil</v-icon>Edit
              </v-btn>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card style="width: 300px; margin-top: 20px;">
          <v-btn v-if="!isViewing" v-on:click="editingSubjects = true" style="position: absolute !important; margin: 0; padding: 0; right: 5px; top: 5px;" color="secondary">Add</v-btn>
          <v-card-title>Subjects</v-card-title>
          <v-chip-group>
            <v-chip v-for="item in subjectsTaught" v-bind:key="item.id" value="item.name"></v-chip>
          </v-chip-group>
          <v-divider></v-divider>
          <v-combobox
            v-if="editingSubjects"
            v-model="subjectsInput"
            :items="allSubjectNames"
            chips
            clearable
            label="Subjects you teach"
            multiple
            solo
          >
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
          <v-btn v-on:click="updateSubjectsTaught()" v-if="editingSubjects" color="success"><v-icon left>mdi-save-content</v-icon>Save</v-btn>
        </v-card>
      </v-col>
      <v-col cols="8">
        <h1 v-if="viewingUser.profile.isTeacher">Teacher</h1>
        <h1 v-if="!viewingUser.profile.isTeacher">Student</h1>
        <h2 style="font-size: 50px; margin: 10px;" v-if="viewingUser.first_name">{{ viewingUser.first_name }} {{ viewingUser.last_name }}</h2>
        <v-content style="margin: 0; padding: 0" v-if="!viewingUser.profile.isTeacher">
          <RegularProfileTabs :userData="viewingUser"/>
        </v-content>
        <v-content style="margin: 0; padding: 0" v-if="viewingUser.profile.isTeacher">
          <TeacherProfileTabs :userData="viewingUser"/>
        </v-content>
      </v-col>
    </v-row>
  </v-content>
</v-content>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import EditProfile from "./EditProfile"
import RegularProfileTabs from "./RegularProfileTabs"
import TeacherProfileTabs from "./TeacherProfileTabs"
import axios from "axios"

export default {
  props: ['username'],

  mounted: function() {
    this.initialize()

  },

  components: {
    EditProfile,
    RegularProfileTabs,
    TeacherProfileTabs,
  },

  data: () => ({
    subjectsInput: [],
    loading: true,
    showAvatarInput:false,
    events: [],
    editingProfile: false,
    editingSubjects: false,
    editAvatar: false,
    avatarInput: null,
  }),

  computed: {
    ...mapGetters(['myID', 'viewingID', 'viewingUser', 'isViewing', 'allUsers', 'subjectsGetter', 'subjectsOneTeacher']),
    viewingUserID() {
      return this.allUsers.find(user => user.username === this.$route.params.username).id
    },
    subjectsTaught() {
      if (this.viewingUser) {
        if (this.viewingUser.profile.isTeacher) {
          return this.subjectsOneTeacher(this.viewingID).map(subject => subject.name)
        }
        else {
          return []
        }
      }
      else {
        return []
      }
    },
    allSubjectNames() {
      return this.subjectsGetter.map(subject => subject.name)
    },
  },

  methods: {
    ...mapActions(['setViewingUser', 'updateAvatar', 'addNewSubject', 'addTeacherSubject', 'createSnackbar']),
    async updateSubjectsTaught() {
      this.subjectsInput = [...this.subjectsInput]
      console.log(this.subjectsInput)
      for (let i = 0; i < this.subjectsInput.length; i++) {
        if (!this.subjectsTaught.includes(this.subjectsInput[i])) {
          if (this.allSubjectNames.includes(this.subjectsInput[i]) ) {
            try {
              this.addTeacherSubject({name: this.subjectsInput[i]})
              this.createSnackbar({message: "Subject added to list", color: 'success'})
            }catch(error) {
              this.createSnackbar({message: "Problem adding subject", color: 'error'})
            }
          }
          else {
            try {
              await this.addNewSubject({name: this.subjectsInput[i]})
              this.createSnackbar({message: "New subject created", color: 'success'})
              await this.addTeacherSubject({name: this.subjectsInput[i]})
              this.createSnackbar({message: "Subject added to list", color: 'success'})
            }catch(error) {
              this.createSnackbar({message: "Problem adding subject", color: 'error'})
            }
          }
        }
      }
      this.editingSubjects = false
    },

    remove (item) {
      this.subjectsInput.splice(this.subjectsInput.indexOf(item), 1)
      this.subjectsInput = [...this.subjectsInput]
    },

    async initialize() {
      const viewingUser = this.allUsers.find(user => user.username === this.$route.params.username)
      await this.setViewingUser(viewingUser.id)
      this.subjectsInput = this.subjectsTaught
    },

    submitAvatar: async function () {
      console.log(this.avatarInput)
      try {
				await this.updateAvatar({avatar: this.avatarInput})
        this.avatarInput = null
			} catch(error){
        console.log(error.response.data)
      }
    },
    showAvatarEdit() {
      this.editAvatar = true
    },
    hideAvatarEdit() {
      this.editAvatar = false
    },
    editProfilePage() {
      this.editingProfile = !this.editingProfile;
    },
    onSuccessfulEdit: async function () {
      this.editingProfile = false
    },
    cancelEdit: function () {
      this.editingProfile = false
    },

  },
};
</script>

<style scoped>

#innerPage {
  margin-left: 10%;
  margin-right: 10%;
}

@media only screen and (max-width: 600px) {
  #innerPage {
  }
}

</style>