import { IconImageModal } from '@/types/IconImageModal';

const namespaced = true;

const state = {
	// アイコン編集モーダルの状態
	isShow: false,
};

const actions = {
	// アイコン編集モーダルの表示・非表示切り替え
	setIconImageModal({ commit, state }: any, iconImageModal: IconImageModal) {
		commit('setIconImageModal', { iconImageModal: iconImageModal });
	},
};

const mutations = {
	// アイコン編集モーダルの表示・非表示を切り替える
	setIconImageModal(state: IconImageModal, { iconImageModal }: any) {
		state.isShow = iconImageModal.isShow;
	},
};

export default {
	namespaced,
	state,
	mutations,
	actions,
};
