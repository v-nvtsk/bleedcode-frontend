<script setup lang="ts">
  import {
    ref, onMounted
  } from 'vue';
  import {TasksApi} from '@/api/tasks.api';
  import CodeEditor from '@/components/code-editor/code-editor.vue';
  import TaskInfo from '@/components/task-info/task-info.vue';
  import {useRoute} from 'vue-router';
  import type {Task} from '@/types';
  import UiSpinner from '../components/ui/spinner/ui-spinner.vue';
  import TaskComments from '../components/task-comments/task-comments.vue';
  import {useUserStore} from '../stores/user';

  const route = useRoute();
  const user = useUserStore();
  const id = route.params.id;
  const task = ref<Task | null>(null);
  const isLoading = ref(true);
  const error = ref<string | null>(null);
  const solution = ref<string>('');

  onMounted(async () => {
    try {
      task.value = await TasksApi.getTask(Number(id));
      solution.value = await TasksApi.getTaskSolution(Number(id), user.profile!.id!);
    } catch {
      error.value = 'Ошибка при загрузке задачи id: ' + id;
      console.error(error.value);
    } finally {
      isLoading.value = false;
      document.title = task.value?.title ? 'BleedCode - ' + task.value.title : 'BleedCode';

    }
  });
</script>

<template>
  <main class="bg-red-100" v-if="task">
    <UiSpinner :isLoading="isLoading">
      <h2>{{ task?.title || '' }}</h2>
    </UiSpinner>

    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="task-tab"
          data-bs-toggle="tab"
          data-bs-target="#task"
          type="button"
          role="tab"
          aria-controls="task"
          aria-selected="true"
        >
          Задача
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="discussion-tab"
          data-bs-toggle="tab"
          data-bs-target="#discussion"
          type="button"
          role="tab"
          aria-controls="discussion"
          aria-selected="false"
        >
          Обсуждение
        </button>
      </li>
    </ul>

    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="task"
        role="tabpanel"
        aria-labelledby="task-tab"
      >
        <div class="d-flex flex-row gap-4 p-2">
          <div class="col-5">
            <UiSpinner :isLoading="isLoading">
              <TaskInfo :task="task" />
            </UiSpinner>
          </div>
          <div class="col-7">
            <CodeEditor :code="solution" />
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="discussion"
        role="tabpanel"
        aria-labelledby="discussion-tab"
      >
        <TaskComments :taskId="task!.id"/>
      </div>
    </div>
  </main>
  <div class="d-flex flex-row gap-4 p-2" v-else>
    <p>{{ error }}</p>
  </div>
</template>

<style>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

p {
  margin-top: 20px;
}
</style>
