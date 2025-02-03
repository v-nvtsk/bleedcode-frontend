<template>
  <header class="container-fluid bg-body-tertiary">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">

      <div class="container">
        <RouterLink class="navbar-brand" to="/">BleedCode</RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse ms-5" id="navbarSupportedContent">
          <ul class="navbar-nav mb-2 mb-lg-0 w-100">
            <li class="nav-item" v-if="isUserAuthenticated">
              <RouterLink class="nav-link active" aria-current="page" to="/me">Мой профиль</RouterLink>
            </li>
            <li class="nav-item ms-auto" v-if="isUserAuthenticated">
              <button class="btn btn-outline-primary" @click="user.logout()">Выйти</button>
            </li>
            <li class="nav-item ms-auto" v-else>
              <button @click="signin()" class="nav-link active" aria-current="page" to="/auth">Войти</button>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
  import {useUserStore} from "@/stores/user";
  import {computed} from "vue";
  import {
    useRoute, useRouter
  } from "vue-router";

  const user = useUserStore();
  const route = useRoute();
  const router = useRouter();
  const isUserAuthenticated = computed(() => user.isAuthenticated);
  const signin = () => {
    router.push({
      path: '/auth',
      query: {redirect: route.fullPath},
    });
  };
</script>
