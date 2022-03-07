import { Dialog } from '@/types/Dialog';

const namespaced = true;

const state = {
	// 確認ダイアログの状態
	title: '',
	message: '',
	dialogType: '',
	isShow: false,
};

const actions = {
	// 確認ダイアログの表示・非表示切り替え
	setDialog({ commit, state }: any, dialog: Dialog) {
		commit('setDialog', { dialog: dialog });
	},
};

const mutations = {
	// 確認ダイアログの表示・非表示を切り替える
	setDialog(state: Dialog, { dialog }: any) {
		state.title = dialog.title;
		state.message = dialog.message;
		state.dialogType = dialog.dialogType;
		state.isShow = dialog.isShow;
	},
};

export default {
	namespaced,
	state,
	mutations,
	actions,
};
