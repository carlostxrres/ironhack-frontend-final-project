<script setup>
import { ref, defineProps, onMounted, computed } from 'vue'
import IconPlayFilled from '@/components/icons/IconPlayFilled.vue'
import IconPauseFilled from '@/components/icons/IconPauseFilled.vue'
import IconPreviousFilled from '@/components/icons/IconPreviousFilled.vue'

const props = defineProps({
  duration: {
    type: Number,
    required: false,
    default: 60
  },
  startOnMount: {
    type: Boolean,
    required: false,
    default: false
  }
})

const end = ref(null)
const remaining = ref(0)

const min = computed(() => Math.floor(remaining.value / 60000))
const sec = computed(() => pad(Math.floor((remaining.value / 1000) % 60)))
const hun = computed(() => pad(Math.floor((remaining.value % 1000) / 10)))

const tick = () => {
  if (!getIsRunning()) {
    return
  }
  remaining.value = Math.max(0, end.value - Date.now())
  requestAnimationFrame(tick)
}

const start = () => {
  end.value = Date.now() + remaining.value
  tick()
}

const pause = () => {
  end.value = null
}

const reset = () => {
  const isRunning = getIsRunning() // Has to be taken before resetting the values
  remaining.value = props.duration * 60000
  end.value = isRunning ? Date.now() + remaining.value : null
}

const getIsRunning = () => {
  return end.value && remaining.value
}

const pad = (value) => {
  return String(value).padStart(2, '0')
}

onMounted(() => {
  reset()
  if (props.startOnMount) {
    start()
  }
})
</script>

<template>
  <article class="timer">
    <header class="timer-time">
      <span v-if="min > 0">{{ min }}:{{ sec }}</span>
      <span v-else>{{ sec }}.{{ hun }}</span>
    </header>
    <footer class="timer-actions">
      <span v-if="remaining === 0"></span>
      <span v-else>
        <button v-if="getIsRunning()" @click="pause" class="button-tertiary button-icon">
          <IconPauseFilled />
        </button>
        <button v-else @click="start" class="button-tertiary button-icon">
          <IconPlayFilled />
        </button>
      </span>

      <button @click="reset" class="button-tertiary button-icon">
        <IconPreviousFilled />
      </button>
    </footer>
  </article>
</template>

<style>
.timer {
  width: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.timer-time {
  font-family: monospace;
  font-size: 2rem;
}
.timer-actions {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
