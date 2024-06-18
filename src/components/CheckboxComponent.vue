<script setup>
import { computed, } from 'vue'

const props = defineProps({
  value: { type: String },
  modelValue: { default: '' },
  label: { type: String, required: false },
  trueValue: { default: true },
  falseValue: { default: false }
})

const emit = defineEmits(['change'])

const isChecked = computed(() => {
  if (props.modelValue instanceof Array) {
    return props.modelValue.includes(props.value)
  }
  return props.modelValue === props.trueValue
})

function updateInput(event) {
  const isChecked = event.target.checked
  if (props.modelValue instanceof Array) {
    const newValue = [...props.modelValue]
    if (isChecked) {
      newValue.push(props.value)
    } else {
      newValue.splice(newValue.indexOf(props.value), 1)
    }
    emit('change', newValue)
  } else {
    emit('change', isChecked ? props.trueValue : props.falseValue)
  }
}
</script>

<template>
  <label class="checkbox-wrap">
    {{ label }}
    <input
      class="checkbox"
      type="checkbox"
      :checked="isChecked"
      :value="value"
      @change="updateInput"
    />
    <span class="checkmark"></span>
  </label>
</template>

<style scoped>
.checkbox-wrap {
  display: block;
  position: relative;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.checkbox-wrap .checkbox {
  opacity: 0;
  height: 0;
  width: 0;
}
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 1.5rem;
  aspect-ratio: 1;
  border-radius: 1.5rem;
  background-color: white;
  border: 1px solid var(--color-text-n);
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast);
}
.checkbox-wrap:hover .checkbox ~ .checkmark {
  background-color: var(--color-text-n);
}
.checkbox-wrap .checkbox:checked ~ .checkmark {
  background-color: var(--primary-color-1);
  border-color: transparent;
}
.checkmark:after {
  content: '';
  position: absolute;
  display: none;
}
.checkbox-wrap .checkbox:checked ~ .checkmark:after {
  display: block;
}
.checkbox-wrap .checkmark:after {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  width: 0.5rem;
  aspect-ratio: 1;
  border-radius: 1.5rem;

  background-color: var(--color-background);
}
</style>
