import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import { User } from '../types/user';

// storeの型設定
export interface State {
  user: User;
}

// InjectionKeyの設定
export const key: InjectionKey<Store<State>> = Symbol();

// storeの設定
export const store = createStore<State>({
  // ユーザーの状態
  state: {
    user: {
      name: '',
      password: ''
    }
  },
  // 状態の取得メソッド設定
  getters: {
    // ユーザー情報を返却する
    getLoginUser: function(state) {
      return state.user;
    }
  },
  // 変更のためのmutationsにコミット
  actions: {
    // ユーザー情報を追加（ログイン状態に）するためのコミット
    login({commit, state}, user: User) {
      commit('login', {user: user})
    }
  },
  // storeの状態を変更するためのmutation
  mutations: {
    // ユーザー情報を追加（ログイン状態に）する
    login(state, {user}) {
      state.user.name = user.name;
      state.user.password = user.password;
    }
  }
})

// 独自のuseStoreメソッドを定義し、各コンポーネントで用いる
export const useStore = (): Store<State> => {
  // InjectionKeyをuseStoreメソッドに渡す
  return baseUseStore(key);
}