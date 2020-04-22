<template>
<v-app>

  <v-content id="signUpPage">
    <v-container id="signUpForm" style="padding:0; background-color:white">
      <v-row>
        <v-col cols="10" md="5" style="color:white; background-color:#006e99; margin:0;">
          <v-card-text style="padding: 40px">
            <p style="font-size: 30px; font-weight: bold; line-height: 40px;">A world class education
              for anyone, anywhere.</p>
            <p>By signing up for Debate Academy, you agree to our Terms of use and Privacy Policy.</p>
          </v-card-text>
        </v-col>
        <v-col cols="10" md="6">
          <v-card-text style="padding: 40px">
            <v-form
                ref="form"
                lazy-validation
            >
              <h1 style="line-height: 1.5; color: black">Join Debate Academy as a</h1>
              <v-tabs
                  grow
                  background-color="other"
                  dark
                  v-model=tabNumber
              >
                <v-tab>
                  Learner
                </v-tab>
                <v-tab>
                  Teacher
                </v-tab>

                <v-tab-item>
                  <v-card flat background-color="extra">
                    <v-card-text>
                      <v-text-field label="Email" v-model="emailInput"
                                    :rules="[v => !!v || 'Email is required']"
                                    required></v-text-field>
                      <v-text-field label="Username" v-model="usernameInput"
                                    :rules="[v => !!v || 'Username is required']"
                                    required></v-text-field>
                      <v-text-field label="Password" v-model="passwordInput" type="password"
                                    :rules="[v => !!v || 'Password is required']"
                                    required></v-text-field>
                      <v-btn style="font-size:20px" v-on:click="signUp(false)">Submit</v-btn>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat background-color="extra">
                    <v-card-text>
                      <v-text-field label="First Name" v-model="fNameInput"
                                    :rules="[v => !!v || 'Name is required']"
                                    required></v-text-field>
                      <v-text-field label="Last Name" v-model="lNameInput"
                                    :rules="[v => !!v || 'Last name is required']"
                                    required></v-text-field>
                      <v-text-field label="Username" v-model="usernameInput"
                                    :rules="[v => !!v || 'Username is required']"
                                    required></v-text-field>
                      <v-text-field label="Email" v-model="emailInput"
                                    :rules="[v => !!v || 'Email is required']"
                                    required></v-text-field>
                      <v-text-field label="Password" v-model="passwordInput" type="password"
                                    :rules="[v => !!v || 'Password is required']"
                                    required></v-text-field>
                      <v-btn style="font-size:20px" v-on:click="signUp(true)">Submit</v-btn>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </v-form>
          </v-card-text>
        </v-col>
      </v-row>
    </v-container>
  </v-content>

</v-app>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import axios from "axios"

export default {
  name: 'App',
  props: [],

  components: {},

  computed: {
    ...mapGetters(['initialTabNumber']),
  },

  mounted() {
    this.initializeTabNumber()
  },

  data: () => ({
    tabNumber: 0,
    fNameInput: '',
    lNameInput: '',
    usernameInput: '',
    passwordInput: '',
    is_superuser: false,
    emailInput: '',
    userData: {},
  }),

  methods: {
    ...mapActions(['addUser', 'createSnackbar']),

    signUp: async function (isTeacher) {
      try {
        let newUser = {
          first_name: this.fNameInput,
          last_name: this.lNameInput,
          username: this.usernameInput,
          password: this.passwordInput,
          email: this.emailInput,
          isTeacher: isTeacher,
        }
        const response = await this.addUser(newUser)
        await this.$router.push('/LogIn')
        this.createSnackbar({message: 'successful sign up', color: 'success'})
      } catch (error) {
        this.createSnackbar({message: 'problem signing up', color: 'error'})
        console.log(error.response.data)
      }
    },

    initializeTabNumber() {
      this.tab = this.initializeTabNumber()
    }

  },

}

</script>


<style>

#signUpForm {
  border-radius: 5px;
  box-shadow: 2px 2px 7px black;
  width: 1000px;
}

#signUpPage {
  background: url('../../assets/cyan.jpg');
  background-size: cover;
}

.v-text-field {
  width: 300px;
}

</style>