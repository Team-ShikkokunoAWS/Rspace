import { Loading } from '@/types/loading';

const namespaced = true;

const state = {
	// ローディングの状態
	loading: {
		isShow: false,
	},
};

const actions = {
	// ローディングの表示・非表示切り替え
	setLoading(commit: any, loading: Loading) {
		commit('setLoading', { loading: loading });
	},
};

const mutations = {
	// ローディングの表示・非表示切り替え
	setLoading(state: Loading, loading: Loading) {
		state.isShow = loading.isShow;
	},
};

export default {
	namespaced,
	state,
	mutations,
	actions,
};

// export default {
// 	namespaced: true,
// 	state: {
// 		// ローディングの状態
// 		loading: {
// 			isShow: false,
// 		},
// 	},
// 	actions: {
// 		// ローディングの表示・非表示切り替え
// 		setLoading(commit: any, loading: Loading) {
// 			commit('setLoading', { loading: loading });
// 		},
// 	},
// 	mutations: {
// 		// ローディングの表示・非表示切り替え
// 		setLoading(state: Loading, loading: Loading) {
// 			state.isShow = loading.isShow;
// 		},
// 	},
// };
