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
          <v-btn v-if="isViewing" color="success" v-on:click="sendMessage()"><v-icon left>mdi-reply</v-icon>Send Message</v-btn>
          <v-card-text>
            <EditProfile v-if="editingProfile" :userData="viewingUser"
                         :cancelEdit="cancelEdit"
                         :onSuccessfulEdit="onSuccessfulEdit" />

            <v-divider v-if="editingProfile"></v-divider>

            <h1 style="margin: 10px;" v-if="viewingUser.profile.bio && !editingProfile">{{ viewingUser.profile.bio }} </h1>

            <v-divider ></v-divider>

            <h3 style="margin: 10px;" class="grey--text" v-if="viewingUser.profile.country && !editingProfile">
              <v-icon small color="grey">mdi-map-marker</v-icon>
              {{ viewingUser.profile.country }}
            </h3>

            <v-divider ></v-divider>

            <h3 style="margin: 10px;" v-if="viewingUser.profile.isTeacher && viewingUser.profile.rate && !editingProfile">Hourly Rate: {{ viewingUser.profile.rate}}</h3>

            <v-row justify="center">
              <v-btn style="margin: 0;" v-if="!isViewing && !editingProfile" color="secondary" text medium v-on:click="editProfilePage()">
                <v-icon >mdi-pencil</v-icon>Edit
              </v-btn>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card style="width: 300px; margin-top: 20px;">
          <v-card-title>Subjects</v-card-title>
          <v-chip-group style="margin-left: 10px;" column v-if="(subjectsTaught.length > 0) && (subjectsTaught[0])">
            <v-chip :close="editingSubjects" @click:close="removeSubject(item)" v-for="item in subjectsTaught" v-bind:key="item.name">
              <strong v-if="item">{{item.name}}</strong>
            </v-chip>
          </v-chip-group>

          <v-btn justify="center" style="margin-bottom: 40px;" text v-if="!isViewing && !editingSubjects" v-on:click="openEditingSubjects" color="secondary">
            <v-icon left>mdi-pencil</v-icon>Edit
          </v-btn>

          <v-divider v-if="editingSubjects"></v-divider>

          <NewSubject :closeEditingSubjects="closeEditingSubjects" v-if="editingSubjects"/>
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
import NewSubject from "../Data-Iterators/NewSubject"
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
    NewSubject,
  },

  data: () => ({
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
          let things = this.subjectsOneTeacher(this.viewingID)
          if (things.length > 0) {
            return things.map(thing => thing.subject)
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
  },

  methods: {
    ...mapActions(['setPersonToMessage', 'setMessageDialog', 'setViewingUser','createSnackbar', 'removeTeacherSubject', 'updateAvatar', 'addNewSubject', 'addTeacherSubject', 'createSnackbar']),

    async sendMessage() {
      await this.setPersonToMessage({user: this.viewingUser})
      await this.setMessageDialog(true)
    },

    async removeSubject(item) {
      try {
        await this.removeTeacherSubject({name: item})
        this.createSnackbar({message: 'subject removed', color: 'success'})
      }catch(error) {
        console.log(error.response.data)
        this.createSnackbar({message: 'problem removing the subject', color: 'error'})
      }
    },

    openEditingSubjects() {
      this.editingSubjects = true
    },
    closeEditingSubjects() {
      this.editingSubjects = false
    },

    async initialize() {
      const viewingUser = this.allUsers.find(user => user.username === this.$route.params.username)
      await this.setViewingUser(viewingUser.id)
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