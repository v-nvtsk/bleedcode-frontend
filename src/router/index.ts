import {
  createRouter, createWebHistory
} from 'vue-router';
import MainView from '../views/main-page.vue';
import TaskView from '../views/task-page.vue';
import ProfileView from '../views/profile-page.vue';
import AuthView from '../views/auth-page.vue';
import {useUserStore} from '../stores/user';
import NotFound404Page from '../views/not-found-404-page.vue';
import {watch} from 'vue';

declare module 'vue-router' {
  interface RouteMeta {
      isAdmin?: boolean
      requiresAuth?: boolean
      title: string
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'Главная',
      component: MainView,
      meta: {title: 'BleedCode'}
    },
    {
      path: '/',
      redirect: () => ({path: '/home'})

    },
    {
      path: '/auth',
      name: 'Аутентификация',
      component: AuthView,
      meta: {title: 'Аутентификация'}
    },
    {
      path: '/tasks/:id',
      name: 'Задача',
      component: TaskView,
      meta: {
        title: 'Задача',
        requiresAuth: true
      }
    },
    {
      path: '/profiles/:id',
      name: 'Профиль пользователя',
      component: ProfileView,
      meta: {
        title: 'Профиль пользователя',
        requiresAuth: true
      }

    },
    {
      path: '/me',
      redirect: () => ({path: '/profiles/me'})
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: NotFound404Page,
      meta: {title: 'Не найдено'}
    }

  ],
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  if (!userStore.isInitialized) {
    await new Promise<void>((resolve) => {
      const stopWatch = watch(
        () => userStore.isInitialized,
        (isInitialized) => {
          if (isInitialized) {
            stopWatch();
            resolve();
          }
        }
      );
    });
  }
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    return next({
      path: '/auth',
      query: {redirect: to.fullPath},
    });
  }
  next();
});
router.beforeEach((to) => {
  document.title = to.meta.title || 'BleedCode';
});

export const route = 1;
export default router;
