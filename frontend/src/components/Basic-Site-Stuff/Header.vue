<template>
<v-app-bar app color="primary" absolute>
  <router-link to="/">
    <v-btn text align="left" style="font-size: 20px; font-weight: bold">
      Debate Academy
    </v-btn>
  </router-link>
  <v-spacer/>

  <router-link to="/signup">
    <v-btn class="header-button" text align="right">
      Sign up
    </v-btn>
  </router-link>
  <router-link to="/login">
    <v-btn class="header-button" text align="right">
      Login
    </v-btn>
  </router-link>
</v-app-bar>
</template>

<script>
import axios from "axios"

export default {
  components: {},

  data: () => ({}),
}

</script>


<style scoped>
.header-button {
  font-size: 20px !important;
  font-weight: bold !important;
}
</style>
