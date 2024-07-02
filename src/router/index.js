import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'
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
      name: 'Home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'About',
      component: AboutView
    },
    {
      path: '/sign-up',
      name: 'Sign up',
      component: SignUp
    },
    {
      path: '/sign-in',
      name: 'Sign in',
      component: LogIn
    },
    {
      path: '/tasks',
      name: 'Tasks',
      component: TasksView,
      children: [
        {
          path: '/tasks/create',
          name: 'Create task',
          component: CreateTask
        },
        {
          path: '/tasks/:taskId',
          name: 'Task details',
          component: TaskView
        }
      ]
    },
    {
      path: '/:catchAll(.*)',
      name: 'Not found',
      component: NotFound
    }
  ]
})

router.afterEach(() => {
  nextTick(() => {
    const name = router.currentRoute.value.name
    document.title = name ? `To do app - ${name}` : 'To do app'
  })
})

export default router
