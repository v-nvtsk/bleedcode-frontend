<script setup lang="ts">
  import type {Task} from '@/types';

  defineProps<{task: Task | null}>();
</script>

<template>
  <div class="mt-2">
    <h3 class="h5">Описание:</h3>
    <p v-for="(item, index) in task?.description.split('\n')" :key="index">{{item}}</p>
    <h3 class="h5">Примеры входных данных и ожидаемый результат:</h3>
    <p>{{task?.examples}}</p>
  </div>
</template>
