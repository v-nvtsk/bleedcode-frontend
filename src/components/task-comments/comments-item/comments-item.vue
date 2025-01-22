<template>
  <div class="card-body p-4">
    <div class="d-flex flex-start">
      <UserIcon :className="`rounded-circle shadow-1-strong me-3`" :size="60" />

      <div>
        <h6 class="fw-bold mb-1">{{username}}</h6>
        <div class="d-flex align-items-center mb-3">
          <p class="mb-0">
            {{commentDate}}
          </p>
          <a href="#!" class="link-muted"><i class="fas fa-pencil-alt ms-2"></i></a>
          <a href="#!" class="link-muted"><i class="fas fa-redo-alt ms-2"></i></a>
          <a href="#!" class="link-muted"><i class="fas fa-heart ms-2"></i></a>
        </div>
        <p class="mb-0">
          {{ content }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import UserIcon from '@/components/ui/user-icon/user-icon.vue';
  import {
    onMounted, ref
  } from 'vue';

  const props = defineProps<{
    username: string;
    date: Date | string;
    content: string;
  }>();
  const commentDate = ref<string>('');

  onMounted(() => {
    commentDate.value = typeof props.date === 'string'
      ? props.date
      : props.date.toLocaleDateString('ru-RU', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
  });
</script>
