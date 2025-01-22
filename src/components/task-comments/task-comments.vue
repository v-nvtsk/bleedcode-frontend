<script setup lang="ts">
  import {
    onMounted, ref
  } from 'vue';
  import {CommentsApi} from '../../api/comments.api';
  import type {UserComment} from '../../types';
  import CommentsItem from './comments-item/comments-item.vue';
  import AddCommentForm from './add-comment-form/add-comment-form.vue';

  const props = defineProps<{taskId: number}>();
  const comments = ref<UserComment[]>([]);
  const isSubmitting = ref(false);
  const submitComment = async (content: string) => {
    if (!content.trim()) {
      console.warn('Комментарий не может быть пустым');

      return;
    }
    isSubmitting.value = true;
    try {
      const result = await CommentsApi.addComment(props.taskId, content);

      comments.value = [...comments.value, result!];
    } catch (error) {
      console.error('Ошибка при отправке комментария:', error);
    } finally {
      isSubmitting.value = false;
    }
  };

  onMounted(async () => {
    try {
      comments.value = await CommentsApi.getTaskComments(props.taskId);
    } catch (e) {
      console.error(e);
    }
  });
</script>

<template>
  <section>
    <div class="container my-3 py-2">
      <div class="row d-flex justify-content-center">
        <div class="col-md-12 col-lg-10">
          <div class="card text-body">
            <div class="card-body p-4">
              <h4 class="mb-0">Комментарии</h4>
              <p class="fw-light mb-4 pb-2">Добавьте свои комментарии к задаче</p>
              <CommentsItem
                v-for="comment in comments"
                :key="comment.id"
                :username="comment.username"
                :date="comment.created_at"
                :content="comment.content"
              />
            </div>
            <AddCommentForm :submitHandler="submitComment" :isSubmitting="isSubmitting" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
