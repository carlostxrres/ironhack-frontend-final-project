import { defineStore } from 'pinia'
import supabase from '@/lib/supabase'
import { ref } from 'vue'
import { getUser } from '@/services/session.js'

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

  const createTask = async ({ title }) => {
    // https://supabase.com/docs/reference/javascript/insert

    const user = getUser()
    const user_id = user.user.id

    const { error } = await supabase.from('tasks').insert({
      user_id,
      title,
      is_complete: false
      // id: 1,
      // inserted_at: //
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
    const response = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)

    if (response.error) {
      return {
        error: error.message
      }
    } else {
      return {
        error: false
      }
    }
  }

  const updateTask = async ({ id, update }) => {
    // https://supabase.com/docs/reference/javascript/update
    // { is_complete }
    const response = await supabase
      .from('tasks')
      .update(update)
      .eq('id', id)

    if (response.error) {
      return {
        error: error.message
      }
    } else {
      return {
        error: false
      }
    }
  }

  return { tasks, fetchTasks, createTask, deleteTask, updateTask }
})
