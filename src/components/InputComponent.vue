<script setup lang="ts">
defineProps(["modelValue", "title"]);
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="flex flex-col">
    <label class="text-gray-300">{{ title }}</label>
    <input
      :value="modelValue"
      type="number"
      min="0"
      max="10000000000000000000000"
      step="0.01"
      @input="
        (event: Event) => {
          const target = event.target as HTMLTextAreaElement;
          emit('update:modelValue', target.value);
        }
      "
    />
  </div>
</template>

<style scoped>
input {
  @apply mt-2 rounded border-2 border-transparent bg-gray-800 p-4 text-lg text-gray-300 ring-2 ring-transparent placeholder-gray-400 focus-visible:outline-none;
}

input:invalid {
  @apply border-red-500 border-2 ring-2 ring-red-500 focus-visible:outline-none;
}
</style>
