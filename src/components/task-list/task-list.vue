<template>
  <div class="col-9">
    <h2>Список задач</h2>
    <div class="d-flex justify-content-center" v-if="loading">
      <div class="spinner-border text-primary" role="status" v-if="loading">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else>
      <ul class="task-list d-flex flex-wrap gap-4" v-if="tasks && tasks.length > 0">
        <li class="task-list-item" v-for="task in tasks" :key="task.id">
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">{{ task.title }}</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary">{{task.category}}</h6>
              <p class="card-text">{{task.description}}</p>
              <RouterLink :to="'/tasks/' + task.id">Открыть задание</RouterLink>
            </div>
          </div>
        </li>
      </ul>
      <p v-else>Задачи не найдены.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {RouterLink} from 'vue-router';
  import type {Task} from '@/types';

  defineProps<{
    tasks: Task[];
    loading: boolean;
  }>();
</script>

<style>
  .task-list {
    list-style-type: none;
    padding: 0;
  }
</style>
