import { createWebHistory, createRouter } from 'vue-router';
import HomePage from './pages/HomePage.vue';
import LoginPage from './pages/LoginPage.vue';
import SignUpPage from './pages/SignUpPage.vue';

// ルーティングパスと表示内容を配列として設定
const routes = [
  { path:'/', name: 'HomePage', component: HomePage },
  { path:'/login', name: 'LoginPage', component: LoginPage },
  { path:'/signup', name: 'SignUpPage', component: SignUpPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;