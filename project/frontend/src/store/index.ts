import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { User } from '@/types/user';

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
			password: '',
			isLogined: false,
		},
	},
	// 変更のためのmutationsにコミット
	actions: {
		// ユーザー情報を追加（ログイン状態に）するためのコミット
		login({ commit, state }, user: User) {
			commit('login', { user: user });
		},
		// ユーザー情報をログアウト状態にするためのコミット
		logout({ commit, state }) {
			commit('logout');
		},
	},
	// storeの状態を変更するためのmutation
	mutations: {
		// ユーザー情報を追加（ログイン状態に）する
		login(state, { user }) {
			state.user.name = user.name;
			state.user.password = user.password;
			state.user.isLogined = user.isLogined;
			// TODO: バックエンドから得たsessionトークンをブラウザに保持させる必要がある？
		},
		// ログアウト状態にする
		logout(state) {
			state.user.name = '';
			state.user.password = '';
			state.user.isLogined = false;
			// TODO: ブラウザに保持させていたsessionトークンを破棄する必要がある？
		},
	},
});

// 独自のuseStoreメソッドを定義し、各コンポーネントで用いる
export const useStore = (): Store<State> => {
	// InjectionKeyをuseStoreメソッドに渡す
	return baseUseStore(key);
};
