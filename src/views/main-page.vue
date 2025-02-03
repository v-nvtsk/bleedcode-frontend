<script setup lang="ts">
  import FilteredList from '@/components/filtered-list/filtered-list.vue';
</script>

<!-- Главная страница: Отображение списка задач с возможностью фильтрации по сложности, категории и популярности. -->
<template>
  <main class="main-view">
    <FilteredList />
  </main>
</template>

<style scoped>
  .main-view {
    margin-top: 20px;
  }

  @media screen and (max-width: 768px) {
    .main-view {
      margin-top: 0px;
    }
  }
</style>
