import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { LOGIN, SET_USER, LOGOUT, ATTEMPT_REAUTHENTICATION, CHECK_AUTHENTICATION } from '../types';
import { RootStoreState } from '..';
import { UserInfo } from '@/app/api/models/UserInfo';
import AuthApi from '@/app/api/AuthApi';
import { localStorageService } from '@/app/infrastructure/StorageService';

export interface UserStoreState {
  userInfo: UserInfo | null;
}

const state: UserStoreState = {
  userInfo: null
};

const actions: ActionTree<UserStoreState, RootStoreState> = {
  async [LOGIN]({ commit }, { name, password }) {
    const token = await AuthApi.logIn(name, password);
    commit(SET_USER, token);
  },
  async [LOGOUT]({ commit, state }) {
    if (state.userInfo) await AuthApi.logOut(state.userInfo.token);
    commit(SET_USER, null);
  },
  async [ATTEMPT_REAUTHENTICATION]({ commit }) {
    const token = localStorageService.getItem('auth.token');
    if (token) {
      const isAuthenticated = await AuthApi.isAuthenticated(token);
      if (isAuthenticated) {
        commit(SET_USER, { token });
      } else {
        commit(SET_USER, null);
      }
      return isAuthenticated;
    } else {
      return false;
    }
  },
  async [CHECK_AUTHENTICATION]({ dispatch, state }) {
    const loggedIn = state.userInfo != null;
    if (loggedIn) return true;
    return await dispatch(ATTEMPT_REAUTHENTICATION);
  }
};

const mutations: MutationTree<UserStoreState> = {
  [SET_USER](state, user: UserInfo) {
    state.userInfo = user;
    if (user) localStorageService.setItem('auth.token', user.token);
    else localStorageService.removeItem('auth.token');
  }
};

const getters: GetterTree<UserStoreState, RootStoreState> = {};

export const UserStore = {
  state,
  actions,
  mutations,
  getters
};
