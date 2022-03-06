import { SideBar } from '@/types/sidebar';

const namespaced = true;

const state = {
	// サイドバーの状態
	active: '',
	isShow: false,
};

const actions = {
	// サイドバーの表示・非表示切り替え
	setSideBar({ commit, state }: any, sidebar: SideBar) {
		commit('setSideBar', { sidebar: sidebar });
	},
};

const mutations = {
	// サイドバーの表示・非表示切り替え
	setSideBar(state: SideBar, { sidebar }: any) {
		state.active = sidebar.active;
		state.isShow = sidebar.isShow;
	},
};

export default {
	namespaced,
	state,
	mutations,
	actions,
};
