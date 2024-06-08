import { defineStore } from 'pinia'

const createToast = ({ title, text, status }) => ({
  title,
  text,
  status,
  id: crypto.randomUUID()
})

export default defineStore('toaster-store', {
  state: () => ({
    toasts: []
  }),
  actions: {
    updateState(toastParams, status) {
      const { text, title, timeout } = toastParams

      const toast = createToast({ title, text, status })

      this.toasts.push(toast)

      if (timeout) {
        setTimeout(() => this.removeToast(toast.id), timeout)
      }

      return toast
    },
    success(toastParams) {
      return this.updateState(toastParams, 'success')
    },

    warning(toastParams) {
      return this.updateState(toastParams, 'warning')
    },

    error(toastParams) {
      return this.updateState(toastParams, 'error')
    },

    removeToast(toastId) {
      this.toasts = this.toasts.filter((t) => t.id !== toastId)
    }
  }
})
