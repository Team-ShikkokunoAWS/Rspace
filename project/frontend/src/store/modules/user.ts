import { User } from '@/types/user';

const namespaced = true;

const state = {
	// ユーザーの状態
	user: {
		uid: '',
		name: '',
		isLogined: false,
		iconImage: '',
		backImage: '',
	},
};

const actions = {
	// ユーザー情報を追加（ログイン状態に）するためのコミット
	login(commit: any, user: User) {
		commit('login', { user: user });
	},
	// ユーザー情報をログアウト状態にするためのコミット
	logout(commit: any) {
		commit('logout');
	},
};

const mutations = {
	// ユーザー情報を追加（ログイン状態に）する
	login(state: User, user: User) {
		state.uid = user.uid;
		state.name = user.name;
		state.isLogined = user.isLogined;
		state.iconImage = user.iconImage;
		state.backImage = user.backImage;
	},
	// ログアウト状態にする
	logout(state: User) {
		state.uid = '';
		state.name = '';
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

// export default {
// 	namespaced: true,
// 	state: {
// 		// ユーザーの状態
// 		user: {
// 			uid: '',
// 			name: '',
// 			isLogined: false,
// 			iconImage: '',
// 			backImage: '',
// 		},
// 	},
// 	actions: {
// 		// ユーザー情報を追加（ログイン状態に）するためのコミット
// 		login(commit: any, user: User) {
// 			commit('login', { user: user });
// 		},
// 		// ユーザー情報をログアウト状態にするためのコミット
// 		logout(commit: any) {
// 			commit('logout');
// 		},
// 	},
// 	mutations: {
// 		// ユーザー情報を追加（ログイン状態に）する
// 		login(state: User, user: User) {
// 			state.uid = user.uid;
// 			state.name = user.name;
// 			state.isLogined = user.isLogined;
// 			state.iconImage = user.iconImage;
// 			state.backImage = user.backImage;
// 		},
// 		// ログアウト状態にする
// 		logout(state: User) {
// 			state.uid = '';
// 			state.name = '';
// 			state.isLogined = false;
// 			state.iconImage = '';
// 			state.backImage = '';
// 		},
// 	},
// };
