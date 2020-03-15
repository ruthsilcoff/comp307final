import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

<template>
  <v-app>

		<v-container style="height: 500px;">
			<vue-cal xsmall default-view="day" :disable-views="['years', 'year', 'month']" />
		</v-container>

	</v-app>
</template>



export default {
  components: { VueCal },
  data: () => ({
    ...
  }),
  ...
}