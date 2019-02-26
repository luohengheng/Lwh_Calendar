import Vue from 'vue'
import Router from 'vue-router'
import LwhCalendar from '../lwh-calendar/Lwh_Calendar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LwhCalendar',
      component: LwhCalendar
    }
  ]
})
