<template>
	<v-content>
		<v-textarea filled label="Bio" v-model="bioInput">
		</v-textarea>
		<v-text-field filled label="Country" v-model="countryInput" value=profileData.country></v-text-field>
		<v-row>
			<v-btn color="primary" v-on:click="editProfile()">Submit</v-btn>
			<v-btn color="error" v-on:click="cancelEdit()">Cancel</v-btn>
		</v-row>
	</v-content>
</template>

<script>
import axios from "axios"

export default {
	props: ['userData', 'profileData', 'cancelEdit', 'onSuccessfulEdit', 'avatarInput'],

	data: () => ({
		bioInput: '',
		countryInput: '',
	}),

	mounted() {
		this.getCurrentProfile()
	},

	methods: {
		editProfile: function () {
			axios.patch('/api/profile/' + this.userData.id + "/", { bio: this.bioInput, country: this.countryInput, avatar:this.avatarInput})
			.then((response) => {
          this.onSuccessfulEdit(response.data)
        })
      .catch((err) => {
        console.error(err.response);
      })
		},

		getCurrentProfile: function () {
			this.bioInput = this.profileData.bio
			this.countryInput = this.profileData.country
		},

	}

}


</script>