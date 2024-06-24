<script setup>
import { ref, defineProps, onMounted, computed } from "vue";
import IconPlayFilled from "@/components/icons/IconPlayFilled.vue";
import IconPauseFilled from "@/components/icons/IconPauseFilled.vue";
import IconPreviousFilled from "@/components/icons/IconPreviousFilled.vue";

const props = defineProps({
  duration: {
    type: Number,
    required: false,
    default: 60,
  },
});

const end = ref(null);
const remaining = ref(0);

const min = computed(() => Math.floor(remaining.value / 60000));
const sec = computed(() => pad(Math.floor((remaining.value / 1000) % 60)));
const hun = computed(() => pad(Math.floor((remaining.value % 1000) / 10)));

const tick = () => {
  if (!getIsRunning()) {
    return;
  }
  remaining.value = Math.max(0, end.value - Date.now());
  requestAnimationFrame(tick);
};

const start = () => {
  end.value = Date.now() + remaining.value;
  tick();
};

const pause = () => {
  end.value = null;
};

const reset = () => {
  const isRunning = getIsRunning(); // Has to be taken before resetting the values
  remaining.value = props.duration * 1000;
  end.value = isRunning ? Date.now() + remaining.value : null;
};

const getIsRunning = () => {
  return end.value && remaining.value;
};

const pad = (value) => {
  return String(value).padStart(2, "0");
};

onMounted(reset);
</script>

<template>
  <article>
    <header>
      <span v-if="min > 0">{{ min }}:{{ sec }}</span>
      <span v-else>{{ sec }}.{{ hun }}</span>
    </header>
    <footer>
      <span>
        <span v-if="remaining === 0"></span>
        <IconPauseFilled v-else-if="getIsRunning()" @click="pause" />
        <IconPlayFilled v-else @click="start" />
      </span>
      <span>
        <IconPreviousFilled @click="reset" />
      </span>
    </footer>
  </article>
</template>

<style scoped>
article {
  width: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
}
header {
  font-family: monospace;
  font-size: 2rem;
}
footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
