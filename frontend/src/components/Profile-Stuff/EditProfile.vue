<template>
	<v-content>
		<v-textarea filled label="Bio" v-model="bioInput">
		</v-textarea>
		<v-text-field filled label="Country" v-model="countryInput" value=profileData.country></v-text-field>
		<v-text-field v-if="userData.isTeacher" filled label="Hourly rate" v-model="rateInput"></v-text-field>
		<v-row>
			<v-btn color="success" v-on:click="editProfile()">Submit</v-btn>
			<v-btn color="error" v-on:click="cancelEdit()">Cancel</v-btn>
		</v-row>
	</v-content>
</template>

<script>
import axios from "axios"
import {mapActions} from 'vuex'

export default {
	props: ['userData', 'cancelEdit', 'onSuccessfulEdit'],

	data: () => ({
		bioInput: '',
		countryInput: '',
		rateInput: '',
	}),

	mounted() {
		this.getCurrentProfile()
	},

	methods: {
		...mapActions(['updateProfile']),

		editProfile: async function () {
      let newProfile = {bio: this.bioInput, country: this.countryInput, rate: this.rateInput}
      try {
        await this.updateProfile(newProfile)
        this.onSuccessfulEdit(newProfile)
      } catch(error) {
        console.log(error.response.data)
      }
    },

		getCurrentProfile: function () {
			this.bioInput = this.userData.profile.bio
			this.countryInput = this.userData.profile.country
			this.rateInput = this.userData.profile.rate
		},

	}

}


</script>