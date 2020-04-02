import Vue from 'vue'
import VueRouter from "vue-router";

import Greeting from "./Greeting";
import SignUp from './components/Basic-Site-Stuff/SignUp'
import LogIn from './components/Basic-Site-Stuff/LogIn'
import ProfilePage from './components/Profile-Stuff/ProfilePage'
import Calendar from './components/Calendars/Calendar'
import Messenger from "./components/Basic-Site-Stuff/chatStuff/Messenger"

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Greeting },
  { path: '/signup', component: SignUp },
  { path: '/login', component: LogIn },
  { path: '/calendar', component: Calendar },
  { path: '/profile/:username', component: ProfilePage, props: true },
  { path: '/messenger', component: Messenger},
]

const router = new VueRouter({
  routes,
})

export default router