import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { User } from '@/types/user';
import { Toast } from '@/types/toast';
import { Dialog } from '@/types/dialog';

// storeの型設定
export interface State {
	user: User;
	toast: Toast;
	dialog: Dialog;
}

// InjectionKeyの設定
export const key: InjectionKey<Store<State>> = Symbol();

// storeの設定
export const store = createStore<State>({
	state: {
		// ユーザーの状態
		user: {
			uuid: '',
			name: '',
			password: '',
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
	},
	// storeの状態を変更するためのmutation
	mutations: {
		// ユーザー情報を追加（ログイン状態に）する
		login(state, { user }) {
			state.user.uuid = user.uuid;
			state.user.name = user.name;
			state.user.password = user.password;
			state.user.isLogined = user.isLogined;
			// TODO: バックエンドから得たsessionトークンをブラウザに保持させる必要がある？
		},
		// ログアウト状態にする
		logout(state) {
			state.user.uuid = '';
			state.user.name = '';
			state.user.password = '';
			state.user.isLogined = false;
			// TODO: ブラウザに保持させていたsessionトークンを破棄する必要がある？
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
	},
});

// 独自のuseStoreメソッドを定義し、各コンポーネントで用いる
export const useStore = (): Store<State> => {
	// InjectionKeyをuseStoreメソッドに渡す
	return baseUseStore(key);
};
