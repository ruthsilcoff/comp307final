<template>
	<v-app>
		<v-content style="margin: 0; padding: 0;">
			<v-content align="center" v-if="isTeacher === true" style="margin: 0; padding: 0;">
				<h1>Teacher Profile</h1>
			</v-content>
			<v-content align="center" v-if="isTeacher === false">
				<h1>Student Profile</h1>
			</v-content>
			<v-row>
				<v-col>
					<v-card width="400px" style="margin: 0; padding: 0;">
						<v-card-title>
							<v-row>
								<v-avatar size="100px" v-if="avatarInput !== ''">
									<img
										src = avatarInput
										alt = "C"
									>
								</v-avatar>
								<v-avatar color=red size="100px" v-if="avatarInput === ''">
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
							</v-row>
							<h1>{{ userData.first_name }} {{ userData.last_name }}</h1>
							<h3>{{ userData.username }}</h3>
						</v-card-title>
					</v-card>
					<v-card width="400px">
						<v-card-text>
							<v-content v-if="editingProfile === true" style="margin: 0; padding: 0;">
									<EditProfile :avatarInput="avatarInput" :cancelEdit="cancelEdit" :onSuccessfulEdit="onSuccessfulEdit" :userData="userData" :profileData="profileData" :editingProfile="editingProfile"/>
							</v-content>

							<v-content v-if="editingProfile === false" style="margin: 0; padding: 0; line-height:2;">
								<h2 style="margin: 0; padding: 0;" v-if="profileData.bio !== '' && profileData.bio !== null">{{ profileData.bio }} </h2>
							</v-content>
						</v-card-text>
					</v-card>
					<v-card width="400px">
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
				<v-col style="margin-right: 20%">
					<v-content v-if="this.isTeacher === true">
						<TeacherProfileTabs/>
					</v-content>
				</v-col>
			</v-row>
		</v-content>
	</v-app>
</template>

<script>

import axios from "axios"
import EditProfile from "./EditProfile"
import TeacherProfileTabs from "./TeacherProfileTabs"

export default {
	props: ['userData', 'isViewing'],

	mounted() {
		this.getProfileData()
		this.getCurrentProfile()
  },

  components: {
		TeacherProfileTabs,
		EditProfile,
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
