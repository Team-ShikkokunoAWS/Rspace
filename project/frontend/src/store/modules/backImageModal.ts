import { BackImageModal } from '@/types/BackImageModal';

const namespaced = true;

const state = {
	// 背景編集モーダルの状態
	isShow: false,
};

const actions = {
	// 背景編集モーダルの表示・非表示切り替え
	setBackImageModal({ commit, state }: any, backImageModal: BackImageModal) {
		commit('setBackImageModal', { backImageModal: backImageModal });
	},
};

const mutations = {
	// 背景編集モーダルの表示・非表示を切り替える
	setBackImageModal(state: BackImageModal, { backImageModal }: any) {
		state.isShow = backImageModal.isShow;
	},
};

export default {
	namespaced,
	state,
	mutations,
	actions,
};
