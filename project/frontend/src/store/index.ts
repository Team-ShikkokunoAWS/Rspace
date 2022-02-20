import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { User } from '@/types/user';
import { Toast } from '@/types/toast';
import { Dialog } from '@/types/dialog';
import { Loading } from '@/types/loading';
import { SideBar } from '@/types/SideBar';
import createPersistedState from 'vuex-persistedstate';
import { VueCookieNext } from 'vue-cookie-next';

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
	state: {
		// ユーザーの状態
		user: {
			uid: '',
			name: '',
			isLogined: false,
		},
		// メッセージトーストの状態
		toast: {
			message: '',
			toastType: '',
			isShow: false,
		},
		// 確認ダイアログの状態
		dialog: {
			title: '',
			message: '',
			dialogType: '',
			isShow: false,
		},
		// ローディングの状態
		loading: {
			isShow: false,
		},
		// サイドバーの状態
		sidebar: {
			active: '',
			isShow: false,
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
		// メッセージトーストの表示・非表示切り替え
		setToastShow({ commit, state }, toast: Toast) {
			commit('setToastShow', { toast: toast });
		},
		// 確認ダイアログの表示・非表示切り替え
		setDialog({ commit, state }, dialog: Dialog) {
			commit('setDialog', { dialog: dialog });
		},
		// ローディングの表示・非表示切り替え
		setLoading({ commit, state }, loading: Loading) {
			commit('setLoading', { loading: loading });
		},
		// サイドバーの表示・非表示切り替え
		setSideBar({ commit, state }, sidebar: SideBar) {
			commit('setSideBar', { sidebar: sidebar });
		},
	},
	// storeの状態を変更するためのmutation
	mutations: {
		// ユーザー情報を追加（ログイン状態に）する
		login(state, { user }) {
			state.user.uid = user.uid;
			state.user.name = user.name;
			state.user.isLogined = user.isLogined;
		},
		// ログアウト状態にする
		logout(state) {
			state.user.uid = '';
			state.user.name = '';
			state.user.isLogined = false;
		},
		// メッセージトーストの表示・非表示を切り替える
		setToastShow(state, { toast }) {
			state.toast.message = toast.message;
			state.toast.toastType = toast.toastType;
			state.toast.isShow = toast.isShow;
		},
		// 確認ダイアログの表示・非表示を切り替える
		setDialog(state, { dialog }) {
			state.dialog.title = dialog.title;
			state.dialog.message = dialog.message;
			state.dialog.dialogType = dialog.dialogType;
			state.dialog.isShow = dialog.isShow;
		},
		// ローディングの表示・非表示切り替え
		setLoading(state, { loading }) {
			state.loading.isShow = loading.isShow;
		},
		// サイドバーの表示・非表示切り替え
		setSideBar(state, { sidebar }) {
			state.sidebar.active = sidebar.active;
			state.sidebar.isShow = sidebar.isShow;
		},
	},
});

// 独自のuseStoreメソッドを定義し、各コンポーネントで用いる
export const useStore = (): Store<State> => {
	// InjectionKeyをuseStoreメソッドに渡す
	return baseUseStore(key);
};
