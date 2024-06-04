import { defineStore } from 'pinia'
import supabase from '@/lib/supabase'
import { ref } from 'vue'

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref([])

  const fetchTasks = async () => {
    // From https://supabase.com/docs/reference/javascript/select
    const { data, error } = await supabase.from('tasks').select()

    if (error) {
      console.log('Error: ', error)
      // to do: do something, show the type of error to the user
    } else {
      tasks.value = data
    }
    console.log('tasks: ', tasks.value)
  }

  return { tasks, fetchTasks }
})
