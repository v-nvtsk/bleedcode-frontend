<template>
  <form class="d-flex flex-column align-items-start">
    <div class="row">
      <h2>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-filter"
             viewBox="0 0 16 16">
          <path
            d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
        </svg>
        Фильтр
      </h2>
    </div>

    <div class="row w-100">
      <label class="form-label mb-2">Сложность</label>
      <select class="form-select" aria-label="Сложность" v-model="filter.difficulty">
        <option value="">Все</option>
        <option value="easy">Легкая</option>
        <option value="medium">Средняя</option>
        <option value="hard">Сложная</option>
      </select>
    </div>
    <div class="mt-2 row w-100">
      <label class="form-label mb-2">Категория</label>
      <select class="form-select" aria-label="Категории" v-model="filter.category">
        <option value="">Все</option>
        <option v-for="category in categories" :key="category">{{ category }}</option>
      </select>
    </div>

    <div class=" mt-2 row w-100">
      <p class="mb-2">Популярность</p>
      <div class="p-0 d-flex gap-3 flex-column flex-auto-m">
        <div class="col-auto d-flex">
          <label class="col-form-label me-2" for="popularity-from">От</label>
          <input
            class="form-control"
            type="number"
            name="popularity-from"
            id="popularity-from"
            v-model="filter.popularityMin"
            :min="1"
            :max="filter.popularityMax"
          />
        </div>

        <div class="col-auto d-flex">
          <label class="col-form-label me-2" for="popularity-to">До</label>
          <input
            class="form-control"
            type="number"
            name="popularity-to"
            id="popularity-to"
            v-model="filter.popularityMax"
            :min="filter.popularityMin"
            :max="5"
          />
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
  import {
    computed, watch
  } from 'vue';

  const props = defineProps<{
    filters: {
      category: string;
      difficulty: string;
      popularityMin: number;
      popularityMax: number;
    },
    categories: string[]
  }>();
  const emit = defineEmits(['update:filters']);
  const filter = computed({
    get: () => props.filters,
    set: (newFilters: typeof props.filters) => emit('update:filters', newFilters),
  });

  watch(filter, (newFilters) => {
    emit('update:filters', newFilters);
  }, {deep: true});
</script>
<style lang="">

</style>
