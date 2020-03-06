<template>
    <v-app>

        <v-content>
            <Header/>

        </v-content>

    </v-app>
</template>


<script>
import axios from "axios"
import Header from "./Header"

export default {
  name: 'App',

  components: {
    Header,
  },

};

</script>