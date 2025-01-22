<script setup lang="ts">
  import {ref} from 'vue';

  const props = defineProps<{
    isLoading: boolean;
    spinnerClass?: string;
    classNames?: string[];
  }>();
  const classes = ref('d-flex justify-content-start' + (props.classNames || [''])?.join(' '));
</script>

<template>
  <div :class="classes">
    <div v-if="isLoading" :class="['spinner-border', spinnerClass || 'text-primary']" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <div v-else>
      <slot />
    </div>
  </div>
</template>
