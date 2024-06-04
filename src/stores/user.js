import { defineStore } from 'pinia'
import supabase from '@/lib/supabase'
import { ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
  const user = ref()

  const createNewUser = async (email, password) => {
    // From https://supabase.com/docs/reference/javascript/auth-signup
    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error) {
      console.error(error)
      return {
        error: error.message
      }
    } else {
      user.value = data
      return {}
    }
  }

  return { user, createNewUser }
})
