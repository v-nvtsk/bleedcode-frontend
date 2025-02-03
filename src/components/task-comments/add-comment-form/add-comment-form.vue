<template>
  <div class="card-footer py-3 border-0">
    <div class="d-flex flex-start w-100">
      <UserIcon className="rounded-circle shadow-1-strong me-3" :size="40" />
      <div data-mdb-input-init class="form-outline w-100">
        <textarea
          class="form-control"
          id="textAreaExample"
          rows="4"
          placeholder="Добавьте ваш комментарий"
          v-model="content"
          style="background: #fff;"
        ></textarea>
      </div>
    </div>
    <div class="float-end mt-2 pt-1">
      <button
        type="button"
        class="btn btn-primary btn-sm"
        :disabled="isSubmitting"
        @click="handleSubmit"
      >
        {{ isSubmitting ? 'Отправка...' : 'Отправить' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {ref} from 'vue';
  import UserIcon from '@/components/ui/user-icon/user-icon.vue';

  const props = defineProps<{
    submitHandler: (content: string) => void;
    isSubmitting: boolean;
  }>();
  const content = ref<string>('');
  const handleSubmit = () => {
    props.submitHandler(content.value);
    content.value = '';
  };
</script>
