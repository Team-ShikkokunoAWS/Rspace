import { SideBar } from '@/types/sidebar';

export default {
	namespaced: true,
	state: {
		// サイドバーの状態
		sidebar: {
			active: '',
			isShow: false,
		},
	},
	actions: {
		// サイドバーの表示・非表示切り替え
		setSideBar(commit: any, sidebar: SideBar) {
			commit('setSideBar', { sidebar: sidebar });
		},
	},
	mutations: {
		// サイドバーの表示・非表示切り替え
		setSideBar(state: SideBar, sidebar: SideBar) {
			state.active = sidebar.active;
			state.isShow = sidebar.isShow;
		},
	},
};
