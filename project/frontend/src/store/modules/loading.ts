import { Loading } from '@/types/loading';

const namespaced = true;

const state: Loading = {
	// ローディングの状態
	isShow: false,
};

const actions = {
	// ローディングの表示・非表示切り替え
	setLoading({ commit, state }: any, loading: Loading) {
		commit('setLoading', { loading: loading });
	},
};

const mutations = {
	// ローディングの表示・非表示切り替え
	setLoading(state: Loading, { loading }: any) {
		state.isShow = loading.isShow;
	},
};

export default {
	namespaced,
	state,
	mutations,
	actions,
};
