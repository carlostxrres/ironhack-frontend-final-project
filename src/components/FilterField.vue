<script setup>
import IconX from '@/components/icons/IconX.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import { defineProps, defineEmits } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: false,
    default: 'Search...'
  },
  info: {
    type: String,
    required: false,
    default: ''
  }
})

const updateValue = (event) => {
  emit('update:modelValue', event.target.value)
}

const clearValue = (event) => {
  event.preventDefault()
  emit('update:modelValue', '')
  // this.$refs.inputField.focus()
}
</script>

<template>
  <label v-if="!info" class="input-text">
    <IconSearch size="18" />
    <input
      ref="inputField"
      type="text"
      :placeholder="placeholder"
      :value="props.modelValue"
      @input="updateValue"
    />
    <button
      class="button-tertiary button-icon reset-button button-small"
      :style="{ visibility: props.modelValue.length > 0 ? 'visible' : 'hidden' }"
      @click="clearValue"
    >
      <IconX size="18" />
    </button>
  </label>

  <!-- to do: create tooltip-component -->
  <!--
    <tooltip-component v-else :text="info" position="bottom">
    <label class="input-text">
      <icon-component icon="search" />
      <input
        ref="inputField"
        type="text"
        :placeholder="placeholder"
        :value="value"
        @input="updateValue"
      />
      <button
        class="close-button"
        :style="{ visibility: value.length > 0 ? 'visible' : 'hidden' }"
        @click="clearValue"
      >
        <icon-component icon="backspace" />
      </button>
    </label>
  </tooltip-component>
  -->
</template>

<style scoped>
.input-text {
  background-color: var(--color-background);
  outline: 2px solid transparent;
  display: inline-flex;
  align-items: center;
  padding-inline: 0.5rem;
  border-radius: 4px;
  gap: 0.5rem;
  width: 100%;

  transition:
    outline var(--transition-slow),
    color var(--transition-slow),
    background-color var(--transition-slow);
}

.input-text:focus-within {
  outline-color: var(--secondary-color-1);
}

.input-text input {
  border: none;
  background-color: transparent;
  outline: none;
  line-height: 2rem;
  color: var(--text-color-2);
  transition: color var(--transition-slow);
  /* flex-grow: 1; */
  padding: 0;
}

.reset-button {
  margin-left: auto;
}
</style>
