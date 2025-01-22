<template>
  <div class="filtered-list d-flex flex-sm-row flex-column gap-5">
    <TaskFilter v-model:filters="filters" v-model:categories="categories" />
    <TaskList :tasks="paginatedTasks" :loading="loading" />
  </div>

  <nav class="mt-2 d-flex justify-content-end" aria-label="Page navigation" v-if="filteredTasks.length > tasksPerPage">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Previous</a>
      </li>
      <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
        <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
          Next
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
  import TaskFilter from '../task-filter/task-filter.vue';
  import TaskList from '../task-list/task-list.vue';
  import {
    onMounted, ref, watch, computed
  } from 'vue';
  import {TasksApi} from '@/api/tasks.api';
  import type {Task} from '@/types';
  import router from '@/router';

  interface Filters{
    category: string;
    difficulty: string;
    popularityMin: number;
    popularityMax: number;
  }

  const filters = ref<Filters>({
    category: '',
    difficulty: '',
    popularityMin: 1,
    popularityMax: 5,
  });
  const filteredTasks = ref<Task[]>([]);
  const categories = ref<string[]>([]);
  const loading = ref(true);
  const currentPage = ref(1);
  const tasksPerPage = 10;
  let debounceTimeout: ReturnType<typeof setTimeout>;

  async function loadFilteredTasks(initialLoading = false) {
    loading.value = true;
    filteredTasks.value = await TasksApi.getAllTasks(filters.value) || [];
    loading.value = false;
    if (!initialLoading) {
      currentPage.value = 1;
    }
  }

  function updateSearchParams() {
    const filterParams = Object.entries(filters.value).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: String(value),
    }), {});

    router.replace({
      path: location.pathname,
      query: {
        ...filterParams,
        page: currentPage.value
      },
    });
  }

  const totalPages = computed(() => Math.ceil(filteredTasks.value.length / tasksPerPage));
  const paginatedTasks = computed(() => {
    const start = (currentPage.value - 1) * tasksPerPage;

    return filteredTasks.value.slice(start, start + tasksPerPage);
  });

  function changePage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
      updateSearchParams();
    }
  }
  watch(
    filters,
    () => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        loadFilteredTasks().then(() => {
          updateSearchParams();
        });
      }, 500);
    },
    {deep: true}
  );
  onMounted(async () => {
    categories.value = await TasksApi.getAllCategories();

    const routeQuery = router.currentRoute.value.query;

    Object.keys(filters.value).forEach((key) => {
      const typedKey = key as keyof Filters;
      const value = routeQuery[typedKey];

      if (value !== undefined) {
        const parsedValue = Array.isArray(value) ? value[0] : value;

        if (parsedValue !== null) {
          if (typedKey === 'popularityMin' || typedKey === 'popularityMax') {
            filters.value[typedKey] = Number(parsedValue) as Filters[typeof typedKey];
          } else {
            filters.value[typedKey] = parsedValue as Filters[typeof typedKey];
          }
        }
      }
    });
    await loadFilteredTasks(true);
    if (routeQuery.page) {
      const page = parseInt(routeQuery.page as string, 10);

      if (!isNaN(page) && page > 0) {
        currentPage.value = page;
      }
    }
  });
</script>
