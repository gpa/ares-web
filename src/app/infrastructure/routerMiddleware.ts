import { NavigationGuard, Route, RawLocation } from 'vue-router';
import { CHECK_AUTHENTICATION } from '@/app/store/types';
import store from '@/app/store';

export const authGuard: NavigationGuard<Vue> = async (
  to: Route,
  from: Route,
  next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void
) => {
  const isAuthenticated = await store.dispatch(CHECK_AUTHENTICATION);
  if (to.meta['isPublic']) {
    if (!to.meta['ensureNotAuthenticated']) {
      next();
    } else {
      if (isAuthenticated) {
        next({ name: 'home' });
      } else {
        next();
      }
    }
  } else {
    if (isAuthenticated) {
      next();
    } else {
      next({ name: 'login', query: { next: to.path } });
    }
  }
};
