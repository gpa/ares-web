import { ActionTree, MutationTree, GetterTree } from 'vuex';
import {
  UPLOAD_CONTENT,
  LOAD_MORE_CONTENT,
  ADD_CONTENT_TO_LIST,
  SELECT_CONTENT,
  SET_SELECTED_CONTENT
} from '../types';
import { RootStoreState } from '..';
import { ContentInfo } from '@/app/api/models/ContentInfo';
import ContentApi from '@/app/api/ContentApi';

export interface ContentStoreState {
  loadedContentInfos: ContentInfo[];
  selectedContentInfo: ContentInfo | null;
}

const state: ContentStoreState = {
  loadedContentInfos: [],
  selectedContentInfo: null
};

const actions: ActionTree<ContentStoreState, RootStoreState> = {
  async [UPLOAD_CONTENT]({ rootState }, files: File[]) {
    if (!rootState.user.userInfo) throw new Error('Unauthorized.');

    await ContentApi.addContent(rootState.user.userInfo.token, files);
  },

  async [LOAD_MORE_CONTENT]({ commit, state, rootState }) {
    if (!rootState.user.userInfo) throw new Error('Unauthorized.');

    let after = undefined;
    if (state.loadedContentInfos.length > 0)
      after = state.loadedContentInfos[state.loadedContentInfos.length - 1].uri;

    const contentEntries = await ContentApi.getContent(rootState.user.userInfo.token, after);
    if (contentEntries && contentEntries.length > 0) commit(ADD_CONTENT_TO_LIST, contentEntries);
    return contentEntries.length > 0;
  },

  async [SELECT_CONTENT]({ commit, state, rootState }, contentUri: string) {
    if (!rootState.user.userInfo) throw new Error('Unauthorized.');
    if (!contentUri) {
      commit(SET_SELECTED_CONTENT, null);
      return;
    }
    const contentInfo = await ContentApi.getContentDetail(
      rootState.user.userInfo.token,
      contentUri
    );
    commit(SET_SELECTED_CONTENT, contentInfo);
  }
};

const mutations: MutationTree<ContentStoreState> = {
  [ADD_CONTENT_TO_LIST](state, contentInfos: ContentInfo[]) {
    contentInfos.forEach((contentInfo: ContentInfo) => {
      state.loadedContentInfos.push(contentInfo);
    });
  },
  [SET_SELECTED_CONTENT](state, contentInfo: ContentInfo | null) {
    state.selectedContentInfo = contentInfo;
  }
};

const getters: GetterTree<ContentStoreState, RootStoreState> = {};

export const ContentStore = {
  state,
  actions,
  mutations,
  getters
};
