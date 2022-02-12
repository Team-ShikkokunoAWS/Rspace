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
      name: 'test',
      password: 'test'
    }
  },
  // 状態の取得メソッド設定
  getters: {

  },
  // 変更のためのmutationsにコミット
  actions: {

  },
  // storeの状態を変更するためのmutation
  mutations: {

  }
})

// 独自のuseStoreメソッドを定義し、各コンポーネントで用いる
export const useStore = (): Store<State> => {
  // InjectionKeyをuseStoreメソッドに渡す
  return baseUseStore(key);
}