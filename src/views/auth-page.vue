<template>
  <div class="auth-page d-flex justify-content-center align-items-center">
    <div class="auth-container position-absolute top-50 translate-middle-y border rounded shadow p-4 bg-light">
      <h1 class="text-center mb-4">{{ isLogin ? 'Sign In' : 'Sign Up' }}</h1>
      <form @submit.prevent="handleSubmit">
        <div class="error-message text-danger text-center mb-3">
          <span v-if="errorMessage">{{ errorMessage }}</span>
        </div>

        <div class="form-group mb-3">
          <label for="username" class="form-label">Username</label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            class="form-control"
            placeholder="Введите имя пользователя"
            required
          />
        </div>
        <div class="form-group mb-4">
          <label for="password" class="form-label">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="form-control"
            placeholder="Введите пароль"
            required
          />
        </div>
        <div class="form-group mb-4" v-if="!isLogin">
          <label class="form-label" for="role">Select role</label>
          <select
            class="form-select"
            id="role"
            v-model="form.role"
            required
          >
            <option value="user">Пользователь</option>
            <option value="interviewer">Интервьюер</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary w-100">
          {{ isLogin ? 'Sign In' : 'Sign Up' }}
        </button>
      </form>
      <p class="text-center mt-3">
        {{ isLogin ? "Ещё нет аккаунта?" : 'Уже есть аккаунт?' }}
        <a href="#" @click.prevent="toggleAuth">
          {{ isLogin ? 'Sign Up' : 'Sign In' }}
        </a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {useRoute} from 'vue-router';
  import router from '../router';
  import {useUserStore} from '../stores/user';
  import {ref} from 'vue';

  const user = useUserStore();
  const route = useRoute();
  const isLogin = ref(true);
  const errorMessage = ref('');
  const form = ref({
    username: '',
    password: '',
    role: 'user',
  });

  function signin() {
    user.login(form.value.username, form.value.password)
      .then(() => {
        const redirectPath = route.query.redirect ? String(route.query.redirect) : '/';

        router.replace(redirectPath);
      })
      .catch((error) => {
        errorMessage.value = error.message;
        console.error(error);
      });
  }

  function signup() {
    user.register(form.value.username, form.value.password, form.value.role)
      .then(() => {
        const redirectPath = route.query.redirect ? String(route.query.redirect) : '/';

        router.replace(redirectPath);
      })
      .catch((error) => {
        errorMessage.value = error.message;
        console.error(error);
      });
  }

  function toggleAuth() {
    isLogin.value = !isLogin.value;
    if (isLogin.value) {
      form.value.role = 'user';
    }
  }

  function handleSubmit() {
    if (isLogin.value) {
      signin();
    } else {
      signup();
    }
  }
</script>

<style scoped>
.auth-container {
  max-width:  400px;
  width: 100%;
  border: 1px solid #dee2e6;
}

.error-message {
  min-height: 24px;
}

.error-message span {
  opacity: 1;
}

.error-message span.hidden {
  opacity: 0;
}
</style>
