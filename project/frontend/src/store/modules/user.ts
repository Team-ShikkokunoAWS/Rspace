import { User } from '@/types/user';

const namespaced = true;

const state: User = {
	// ユーザーの状態
	uid: '',
	name: '',
	description: '',
	isLogined: false,
	iconImage: '',
	backImage: '',
};

const actions = {
	// ユーザー情報を追加（ログイン状態に）するためのコミット
	login({ commit, state }: any, user: User) {
		commit('login', { user: user });
	},
	// ユーザー情報をログアウト状態にするためのコミット
	logout({ commit, state }: any) {
		commit('logout');
	},
};

const mutations = {
	// ユーザー情報を追加（ログイン状態に）する
	login(state: User, { user }: any) {
		state.uid = user.uid;
		state.name = user.name;
		state.description = user.description;
		state.isLogined = user.isLogined;
		state.iconImage = user.iconImage;
		state.backImage = user.backImage;
	},
	// ログアウト状態にする
	logout(state: User) {
		state.uid = '';
		state.name = '';
		state.description = '';
		state.isLogined = false;
		state.iconImage = '';
		state.backImage = '';
	},
};

export default {
	namespaced,
	state,
	mutations,
	actions,
};
