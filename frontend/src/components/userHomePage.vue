<template>
  <v-app>
		<v-container>
			<file/>
		</v-container>
		<v-container>
			<SearchBySubject/>
		</v-container>
		<v-container>
			<NewVideoService/>
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
import NewNoteSet from "../components/NewNoteSet"
import NewVideoService from "../components/NewVideoService"
import SearchBySubject from "../components/SearchBySubject"
import file from "../components/file"

export default {
  name: 'App',

  components: {
    NewVideoService,
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