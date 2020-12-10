import { Route } from 'vue-router';
import { Position as VueScrollPosition } from 'vue-router/types/router';

export const scrollBehavior = (
  to: Route,
  from: Route,
  savedPosition: VueScrollPosition | void
): VueScrollPosition => {
  if (savedPosition) {
    return savedPosition;
  } else {
    return { x: 0, y: 0 };
  }
};
