import Vue from 'vue'
import VueRouter from "vue-router";

import Greeting from "./Greeting";
import SignUp from './components/Basic-Site-Stuff/SignUp'
import LogIn from './components/Basic-Site-Stuff/LogIn'
import ProfilePage from './components/Profile-Stuff/ProfilePage'
import Calendar from './components/Calendars/Calendar'
import Messenger from "./components/Basic-Site-Stuff/chatStuff/Messenger"
import NewAvailability from "./components/Data-Iterators/NewAvailability"
import NewNoteSet from "./components/Data-Iterators/NewNoteSet"
import NoteSet from "./components/Data-Iterators/NoteSet"
import NewReview from "./components/Data-Iterators/NewReview"

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Greeting },
  { path: '/signup', component: SignUp },
  { path: '/login', component: LogIn },
  { path: '/calendar', component: Calendar },
  { path: '/profile/:username', component: ProfilePage, props: true },
  { path: '/noteSet/:id', component: NoteSet, props: true },
  { path: '/messenger', component: Messenger},
  { path: '/addAvailability', component: NewAvailability},
  { path: '/newNoteSet', component: NewNoteSet},
  { path: '/newReview', component:NewReview},
]

const router = new VueRouter({
  routes,
})

export default router