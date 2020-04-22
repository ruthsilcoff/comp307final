<template>
<v-app>

  <v-content>
    <v-card
        class="mx-auto"
        max-width="344"
    >
      <v-card-text>
        <h1>Log In</h1>
        <v-text-field label="Username" v-model="usernameInput"></v-text-field>
        <v-row>
          <v-text-field id="passwordField" style="width: 250px; margin-left: 20px;"
                        :type="showPassword ? 'text' : 'password'" label="Password"
                        v-model="passwordInput">
          </v-text-field>
          <v-icon flat v-on:click="togglePasswordView" v-if="showPassword" color="primary" right>
            mdi-eye-off
          </v-icon>
          <v-icon flat v-on:click="togglePasswordView" v-if="!showPassword" color="primary" right>
            mdi-eye
          </v-icon>
        </v-row>

        <v-btn text v-on:click="logInFunction()">Submit</v-btn>
      </v-card-text>
    </v-card>
  </v-content>

</v-app>
</template>


<script>
import axios from "axios"
import {mapGetters, mapActions} from 'vuex'


export default {
  components: {},

  data: () => ({
    showPassword: false,
    loading: false,
    passwordInput: '',
    usernameInput: ''
  }),

  mounted() {
    document.getElementById('passwordField').addEventListener('keypress', this.checkForEnterKey)
  },

  methods: {
    ...mapActions(['login', 'setMyUser', 'createSnackbar', 'yesLoggedIn']),


    checkForEnterKey(event) {
      if (event.keyCode === 13) {
        this.logInFunction()
      }
    },

    togglePasswordView() {
      this.showPassword = !this.showPassword
    },

    logInFunction: async function () {
      this.loading = true
      let user = {username: this.usernameInput, password: this.passwordInput}
      try {
        await this.login(user)
        const response2 = await axios.get('/api/user/current/')
        await this.setMyUser(response2.data.id)
        await this.yesLoggedIn()
        await this.$router.push('/')
        this.createSnackbar({message: 'logged in', color: 'success'})
      } catch (error) {
        console.log("error")
        this.createSnackbar({message: 'Wrong password', color: 'error'})
      }
    }
  }

}

</script>

<style>

.v-text-field {
  width: 300px;
}

</style>