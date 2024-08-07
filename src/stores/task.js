import { defineStore } from 'pinia'
import supabase from '@/lib/supabase'
import { ref } from 'vue'
import { getUser } from '@/services/session.js'

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref([])

  const fetchTasks = async () => {
    // From https://supabase.com/docs/reference/javascript/select
    const { data, error } = await supabase
      .from('tasks')
      .select()
      .order('is_complete')
      .order('inserted_at', { ascending: false })

    if (error) {
      console.error('Error: ', error)
      // to do: show the type of error to the user
    } else {
      tasks.value = data
    }
  }

  const createTask = async ({ title }) => {
    // https://supabase.com/docs/reference/javascript/insert

    const user = getUser()
    const user_id = user.user.id

    const { error } = await supabase.from('tasks').insert({
      user_id,
      title,
      is_complete: false
    })

    if (error) {
      return {
        error: error.message
      }
    } else {
      return {
        error: false
      }
    }
  }

  const deleteTask = async ({ id }) => {
    // https://supabase.com/docs/reference/javascript/delete
    const response = await supabase.from('tasks').delete().eq('id', id)

    if (response.error) {
      return {
        error: response.error.message
      }
    } else {
      return {
        error: false
      }
    }
  }

  const updateTask = async ({ id, update }) => {
    // https://supabase.com/docs/reference/javascript/update
    const response = await supabase.from('tasks').update(update).eq('id', id)

    if (response.error) {
      return {
        error: response.error.message
      }
    } else {
      return {
        error: false
      }
    }
  }

  const updateComplete = async (newValue, task, toasterStore) => {
    const response = await updateTask({
      id: task.id,
      update: {
        is_complete: newValue
      }
    })

    const newValueString = newValue ? 'complete' : 'incomplete'
    if (response.error) {
      console.error('Error updating task:', response.error)
      toasterStore.error({
        title: `The task "${task.title}" could not be set to "${newValueString}"`,
        text: response.error
      })
      return
    }

    toasterStore.success({
      title: 'Task updated',
      text: `The task "${task.title}" was set to "${newValueString}".`,
      timeout: 4000
    })

    fetchTasks()
  }

  return { tasks, fetchTasks, createTask, deleteTask, updateTask, updateComplete }
})
