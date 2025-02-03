<template>
  <UserProfile :id="id"/>
</template>
<script setup lang="ts">
  import {useUserStore} from '@/stores/user';
  import {useRoute} from 'vue-router';
  import UserProfile from '@/components/user-profile/user-profile.vue';
  import {ref} from 'vue';

  const user = useUserStore();
  const route = useRoute();
  const routeId = Number(route.params.id);
  const id = ref<number>(isNaN(routeId) ? user.profile.id! : routeId);
</script>
