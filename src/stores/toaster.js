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
    updateState(payload, status) {
      const { text, title, timeout } = payload

      const toast = createToast({ title, text, status })

      this.toasts.push(toast)

      if (timeout) {
        setTimeout(() => this.removeToast(toast.id), timeout)
      }

      return toast
    },
    success(payload) {
      return this.updateState(payload, 'success')
    },

    warning(payload) {
      return this.updateState(payload, 'warning')
    },

    error(payload) {
      return this.updateState(payload, 'error')
    },

    removeToast(toastId) {
      this.toasts = this.toasts.filter((t) => t.id !== toastId)
    }
  }
})
