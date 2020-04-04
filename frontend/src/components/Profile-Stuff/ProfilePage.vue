<template>
<v-content style="margin-top: 100px;" v-if="viewingUser">
  <v-content id="innerPage">
    <h1 v-if="viewingUser.profile.isTeacher">Teacher</h1>
    <h1 v-if="!viewingUser.profile.isTeacher">Student</h1>
    <v-row>
      <v-col cols="4">
        <v-card style="width: 300px;">
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
            <h2 v-if="viewingUser.first_name">{{ viewingUser.first_name }} {{ viewingUser.last_name }}</h2>

            <v-content v-if="editingProfile === true" style="margin: 0; padding: 0 !important;">
              <EditProfile :userData="viewingUser"
                           :cancelEdit="cancelEdit"
                           :onSuccessfulEdit="onSuccessfulEdit" />
            </v-content>
            Bio:
            <v-content v-if="editingProfile === false" style="margin: 0; padding: 0; line-height:2;">
              <h2 style="margin: 0; padding: 0;" v-if="viewingUser.profile.bio !== '' && viewingUser.profile.bio !== null">{{ viewingUser.profile.bio }} </h2>
              <v-btn v-if="isViewing === false" color="secondary" icon medium v-on:click="editProfilePage()">
                <v-icon color="secondary" large>mdi-pencil</v-icon>
              </v-btn>
            </v-content>

            Country:
            <v-content v-if="editingProfile === false" style="margin: 0; padding: 0; line-height:2;">
              <h3 class="grey--text" style="margin: 0; padding: 0;" v-if="viewingUser.profile.country !== '' && viewingUser.profile.country !== null">
                <v-icon small color="grey">mdi-map-marker</v-icon>
                {{ viewingUser.profile.country }}
              </h3>
              <v-btn v-if="isViewing === false" color="secondary" icon medium v-on:click="editProfilePage()">
                <v-icon color="secondary" large>mdi-pencil</v-icon>
              </v-btn>
            </v-content>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="8">
        <v-content v-if="this.isViewing === false">
          <RegularProfileTabs :userData="viewingUser"/>
        </v-content>
        <v-content v-if="this.isViewing === true">
          <TeacherProfileTabs :somePosts="viewingPosts" :userData="viewingUser"/>
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
    loading: true,
    showAvatarInput:false,
    events: [],
    editingProfile: false,
    editAvatar: false,
    avatarInput: null,
  }),

  computed: {
    ...mapGetters(['myID', 'viewingID', 'viewingUser', 'isViewing', 'allUsers']),
    viewingUserID() {
      return this.allUsers.find(user => user.username === this.$route.params.username).id
    },
  },

  methods: {
    ...mapActions(['setViewingUser', 'updateAvatar']),
    async initialize() {
      if (this.allUsers.length === 0) {
        console.log("why is this not working")
        this.loading = true
      }
      this.loading = false
      const viewingUser = this.allUsers.find(user => user.username === this.$route.params.username)
      console.log(this.allUsers)
      console.log(viewingUser)
      this.setViewingUser(viewingUser.id)
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