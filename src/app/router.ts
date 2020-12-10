import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { authGuard } from '@/app/infrastructure/routerMiddleware';
import { scrollBehavior } from '@/app/infrastructure/scrollBehavior';
import ContentFeedView from '@/app/views/ContentFeedView.vue';
import LoginView from '@/app/views/LoginView.vue';
import ContentUploadView from '@/app/views/ContentUploadView.vue';
import ContentDetailView from '@/app/views/ContentDetailView.vue';

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: ContentFeedView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      isPublic: true,
      ensureNotAuthenticated: true
    }
  },
  {
    path: '/upload',
    name: 'upload',
    component: ContentUploadView
  },
  {
    path: '/content/:contentUri',
    name: 'contentDetailView',
    component: ContentDetailView,
    props: true
  }
];

Vue.use(VueRouter);
const router = new VueRouter({
  routes: routes,
  scrollBehavior
});
router.beforeEach(authGuard);
export default router;
