<template>
<v-card>
  <TinyCalendar/>
</v-card>
</template>

<script>
import {mapGetters, mapActions} from "vuex"
import TinyCalendar from '../Calendars/TinyCalendar'

export default {
	data: () => ({
    searchInput: '',
  }),

  components: {
    TinyCalendar,
  },

  computed: {
		...mapGetters(['myID', 'av']),
  },

  mounted() {
  },

  methods: {
    ...mapActions(['']),

  },

}


</script>

<style scoped>


</style>