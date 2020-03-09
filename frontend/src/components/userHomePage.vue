<template>
  <v-app>
		<v-col align="center" size="100px">
			<v-card >
				<v-card-text>
					<NewNoteSet/>
				</v-card-text>
			</v-card>

		</v-col>
	</v-app>
</template>

<script>
import axios from "axios"
import NewNoteSet from "../components/NewNoteSet"


export default {
  name: 'App',

  components: {
    NewNoteSet,
  },

  data: () => ({
  }),

  methods: {

  }

};

</script>