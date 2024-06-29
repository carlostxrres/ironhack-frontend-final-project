import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import TasksView from '../views/TasksView.vue'
import CreateTask from '../views/CreateTask.vue'
import TaskView from '../views/TaskView.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: LogIn
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TasksView,
      children: [
        {
          path: '/tasks/create',
          name: 'create',
          component: CreateTask
        },
        {
          path: '/tasks/:taskId',
          name: 'task',
          component: TaskView
        }
      ]
    },
    {
        path: '/:catchAll(.*)',
        name: 'Not found',
        component: NotFound,
    },
  ]
})

export default router
