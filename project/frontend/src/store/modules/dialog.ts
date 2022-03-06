import { Dialog } from '@/types/Dialog';

export default {
	namespaced: true,
	state: {
		// 確認ダイアログの状態
		dialog: {
			title: '',
			message: '',
			dialogType: '',
			isShow: false,
		},
	},
	actions: {
		// 確認ダイアログの表示・非表示切り替え
		setDialog(commit: any, dialog: Dialog) {
			commit('setDialog', { dialog: dialog });
		},
	},
	mutations: {
		// 確認ダイアログの表示・非表示を切り替える
		setDialog(state: Dialog, dialog: Dialog) {
			state.title = dialog.title;
			state.message = dialog.message;
			state.dialogType = dialog.dialogType;
			state.isShow = dialog.isShow;
		},
	},
};
