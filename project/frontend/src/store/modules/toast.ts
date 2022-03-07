import { Toast } from '@/types/Toast';

const namespaced = true;

const state: Toast = {
	// メッセージトーストの状態
	message: '',
	toastType: '',
	isShow: false,
};

const actions = {
	// メッセージトーストの表示・非表示切り替え
	setToastShow({ commit }: any, toast: Toast) {
		commit('setToastShow', { toast: toast });
	},
};

const mutations = {
	// メッセージトーストの表示・非表示を切り替える
	setToastShow(state: Toast, { toast }: any) {
		state.message = toast.message;
		state.toastType = toast.toastType;
		state.isShow = toast.isShow;
	},
};

export default {
	namespaced,
	state,
	mutations,
	actions,
};
