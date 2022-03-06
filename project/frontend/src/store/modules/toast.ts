import { Toast } from '@/types/Toast';

export default {
	namespaced: true,
	state: {
		// メッセージトーストの状態
		toast: {
			message: '',
			toastType: '',
			isShow: false,
		},
	},
	actions: {
		// メッセージトーストの表示・非表示切り替え
		setToastShow(commit: any, toast: Toast) {
			commit('setToastShow', { toast: toast });
		},
	},
	mutations: {
		// メッセージトーストの表示・非表示を切り替える
		setToastShow(state: Toast, toast: Toast) {
			state.message = toast.message;
			state.toastType = toast.toastType;
			state.isShow = toast.isShow;
		},
	},
};
