import Vue from 'vue';
import Vuex from 'vuex';
import { UserStore, UserStoreState } from './modules/user';
import { ContentStore, ContentStoreState } from './modules/content';

export interface RootStoreState {
  user: UserStoreState;
  content: ContentStoreState;
}

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    user: UserStore,
    content: ContentStore
  }
});
