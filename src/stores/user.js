import { defineStore } from 'pinia'
import supabase from '@/lib/supabase'
import { ref } from 'vue'
import { setUser } from '@/services/session.js'

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
      return {
        error: false
      }
    }
  }

  const signIn = async (email, password) => {
    // From https://supabase.com/docs/reference/javascript/auth-signinwithpassword
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      console.error(error)
      return {
        error: error.message
      }
    } else {
      user.value = data
      setUser(data)
      return {
        error: false
      }
    }
  }

  const signInAnonymously = async (captchaToken) => {
    // From https://supabase.com/docs/reference/javascript/auth-signinanonymously

    const { data, error } = await supabase.auth.signInAnonymously({
      options: {
        captchaToken
      }
    })

    if (error) {
      console.error(error)
      return {
        error: error.message
      }
    } else {
      user.value = data
      setUser(data)
      return {
        error: false
      }
    }

  }

  return { user, createNewUser, signIn, signInAnonymously }
})
