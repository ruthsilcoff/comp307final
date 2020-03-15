<template>
	<v-app>
		<v-container style="margin: 0; padding: 0;">
			<v-content align="center" v-if="isTeacher === true" style="margin: 0; padding: 0;">
				<h1>Teacher: {{ userData.first_name }} {{ userData.last_name }}</h1>
			</v-content>
			<v-content align="center" v-if="isTeacher === false" style="margin: 0; padding: 0;">
				<h1>Student: {{ userData.first_name }} {{ userData.last_name }}</h1>
			</v-content>
			<v-row >
				<v-col align="center" style="margin-right:0; padding: 0">
					<v-card width="200px" style="margin: 0; padding: 0;">
						<v-card-title >
							<v-avatar size="100px" v-if="avatarInput === ''">
								<img
									src = avatarInput
									alt = "C"
								>
							</v-avatar>
							<v-avatar color=primary size="100px" v-if="avatarInput !== ''">
								<span class="white--text headline">C</span>
							</v-avatar>
							<v-content v-if="editingProfile === true">
								<v-file-input
									label="Change avatar"
									filled
									prepend-icon="mdi-camera"
									v-model="avatarInput"
								></v-file-input>
							</v-content>
						</v-card-title>
						<v-card-text>
							<h3>{{ userData.username }}</h3>
						</v-card-text>
					</v-card>
					<v-card width="200px">
						<v-card-text>
							<v-content v-if="editingProfile === true" style="margin: 0; padding: 0;">
									<EditProfile :avatarInput="avatarInput" :cancelEdit="cancelEdit" :onSuccessfulEdit="onSuccessfulEdit" :userData="userData" :profileData="profileData" :editingProfile="editingProfile"/>
							</v-content>

							<v-content v-if="editingProfile === false" style="margin: 0; padding: 0; line-height:2;">
								<h2 style="margin: 0; padding: 0;" v-if="profileData.bio !== '' && profileData.bio !== null">{{ profileData.bio }} </h2>
							</v-content>
						</v-card-text>
					</v-card>
					<v-card width="200px">
						<v-card-text>
							<v-content v-if="editingProfile === false" style="margin: 0; padding: 0; line-height:2;">
								<h3 style="margin: 0; padding: 0;" v-if="profileData.country !== '' && profileData.country !== null">
									<v-icon small>mdi-location</v-icon>
									Country: {{ profileData.country }}
								</h3>
							</v-content>

							<v-content align="center" v-if="editingProfile === false && isViewing === false" style="margin: 0; padding: 0;">
								<v-btn style="margin: 0; padding: 0;" text medium v-on:click="editProfilePage()">
										Edit Profile
								</v-btn>
							</v-content>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col align="center" style="margin-top: 0; padding:0">
					<v-container style="margin: 0; padding:0" v-if="this.isTeacher === true">
						<TeacherProfileTabs :AddAvailability="AddAvailability" />
					</v-container>
					<v-content style="margin: 0; padding:0" v-if="this.isTeacher === false">
						<RegularProfileTabs />
					</v-content>
				</v-col>
			</v-row>
		</v-container>
	</v-app>
</template>

<script>

import axios from "axios"
import EditProfile from "./EditProfile"
import TeacherProfileTabs from "./TeacherProfileTabs"
import RegularProfileTabs from "./RegularProfileTabs"

export default {
	props: ['userData', 'isViewing', 'onRequestLesson', 'AddAvailability'],

	mounted() {
		this.getProfileData()
		this.getCurrentProfile()
  },

  components: {
		TeacherProfileTabs,
		EditProfile,
		RegularProfileTabs,
	},

  data: () => ({
		events: [],
		profileData: {},
		editingProfile: false,
		isTeacher: false,
		avatarInput: '',
	}),

	methods: {
		getProfileData: function () {
			console.log("user ID is")
			console.log(this.userData.id)
			axios.get('/api/profile/' + this.userData.id + "/")
        .then((response) => {
					console.log(response.data)
          this.profileData = response.data
					if (this.profileData.isTeacher) {
						this.isTeacher = true
					}
				})
				.catch((err) => {
					console.error(err.response.data)
				})
		},

		editProfilePage: function () {
			this.editingProfile = true
		},

		onSuccessfulEdit: function (newProfile) {
			this.profileData=newProfile
			this.editingProfile = false
		},

		cancelEdit: function () {
			this.editingProfile = false
		},

		getCurrentProfile: function () {
			this.avatarInput = this.profileData.avatar
		},

  }
};
</script>
