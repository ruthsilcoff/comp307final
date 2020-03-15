<template>
  <v-app>
		<v-container>
			<file/>
		</v-container>
		<v-container>
			<SearchBySubject/>
		</v-container>
		<v-container align="center">
			<v-card >
				<v-card-text>
					<NewNoteSet/>
				</v-card-text>
			</v-card>
		</v-container>
	</v-app>
</template>

<script>
import axios from "axios"
import NewNoteSet from "../NewNoteSet"
import SearchBySubject from "../SearchBySubject"
import file from "../file"

export default {
  name: 'App',

  components: {
		NewNoteSet,
		SearchBySubject,
		file,
  },

  data: () => ({
  }),

  methods: {

  }

};

</script>