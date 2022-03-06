import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { User } from '@/types/user';
import { Toast } from '@/types/toast';
import { Dialog } from '@/types/dialog';
import { Loading } from '@/types/loading';
import { SideBar } from '@/types/SideBar';
import createPersistedState from 'vuex-persistedstate';
import { VueCookieNext } from 'vue-cookie-next';
import { user, toast, dialog, loading, sidebar } from './modules';

// storeの型設定
export interface State {
	user: User;
	toast: Toast;
	dialog: Dialog;
	loading: Loading;
	sidebar: SideBar;
}

// InjectionKeyの設定
export const key: InjectionKey<Store<State>> = Symbol();

// storeの設定
export const store = createStore<State>({
	plugins: [
		// storeのstateがリロードなどで消えないようにする設定
		createPersistedState({
			paths: ['user'], // userデータをpersistedによる永続化対象とする
			storage: {
				getItem: (key) => VueCookieNext.getCookie(key),
				setItem: (key, value) =>
					VueCookieNext.setCookie(key, value, { expire: '1d' }),
				removeItem: (key) => VueCookieNext.removeCookie(key),
			},
		}),
	],
	modules: {
		user,
		toast,
		dialog,
		loading,
		sidebar,
	},
});

// 独自のuseStoreメソッドを定義し、各コンポーネントで用いる
export const useStore = (): Store<State> => {
	// InjectionKeyをuseStoreメソッドに渡す
	return baseUseStore(key);
};
