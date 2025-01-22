<template>
  <h2 class="mt-3 border-bottom-1">{{ profile.username }}</h2>
  <div class="mt-3 d-flex flex-wrap gap-5 justify-content-between">
    <div class="col-auto d-flex justify-content-center align-items-center p-5 profile-header rounded shadow-sm">
      <UserIcon :size="160"/>
    </div>
    <div class="col-9 mt-4">
      <div class="row">
        <div class="col-md-6">
          <h5>Информация о пользователе</h5>
          <ul class="list-unstyled">
            <li><strong>Роль: </strong>{{ profile.role }}</li>
            <li><strong>Статус: </strong>{{ profile.status }}</li>
            <li><strong>Рейтинг: </strong>{{ profile.rating }}</li>
          </ul>
        </div>
        <div class="d-flex gap-3 profile-actions mt-4 text-center">
          <button class="btn btn-primary">Редактировать</button>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-3">
    <h5 class="h3-ns">Решенные задачи</h5>
    <table class="table" v-if="profile.solutions!.length>0">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Название</th>
          <th scope="col">Оценка</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in profile.solutions" :key="item!.id">
          <th scope="row">{{ index + 1}}</th>
          <td>
            {{item.title}}
          </td>
          <td>
            {{item.mark}}
          </td>
        </tr>

      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
  import type {UserProfile} from '@/types';
  import {
    onMounted, ref
  } from 'vue';
  import {ProfilesApi} from '../../api/profiles.api';
  import UserIcon from '../ui/user-icon/user-icon.vue';

  const props = defineProps<{id: number}>();
  const profile = ref<Partial<UserProfile>>({
    username: '',
    role: '',
    status: '',
    rating: 0,
    solutions: []

  });

  onMounted(async () => {
    profile.value = await ProfilesApi.getProfile(props.id);
  });
</script >
