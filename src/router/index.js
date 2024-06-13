import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomeView.vue';
import Login from '../views/LoginView.vue';
import Register from '../views/RegisterView.vue';
import store from '../store'; // Tambahkan impor ini

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    props: { user: store.getters.user },  // Gunakan user dari store
    meta: { requiresAuth: true } // Tambahkan meta ini
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Tambahkan navigasi guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
