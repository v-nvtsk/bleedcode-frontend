import {ref} from 'vue';
import {defineStore} from 'pinia';
import {AuthApi} from '@/api/auth.api';
import router from '@/router';
import type {
  User, UserProfile
} from '../types';

export const useUserStore = defineStore('user', () => {
  const isAuthenticated = ref(false);
  const profile = ref<Partial<UserProfile>>({});
  const isLoading = ref(true);
  const isInitialized = ref(false);

  AuthApi.updateSession()
    .then((result?: User) => {
      if (result) {
        isAuthenticated.value = true;
        profile.value = result;
      }
    })
    .finally(() => {
      isLoading.value = false;
      isInitialized.value = true;
    });

  async function login(username: string, password: string) {

    const result = await AuthApi.login(username, password);

    if (result){
      isAuthenticated.value = true;
      profile.value = result;

      return true;
    }
    throw new Error('authorization failed');
  }

  async function logout() {
    await AuthApi.logout();
    isAuthenticated.value = false;
    router.push({
      path: '/auth',
      query: {redirect: location.pathname},
    });
  }

  async function register(username: string, password: string, role: string) {
    const result = await AuthApi.register(username, password, role);

    if(result){
      isAuthenticated.value = true;

      return true;
    }
    throw new Error('registration failed');

  }

  return {
    isAuthenticated,
    isLoading,
    isInitialized,
    profile,
    login,
    register,
    logout,
  };
});
