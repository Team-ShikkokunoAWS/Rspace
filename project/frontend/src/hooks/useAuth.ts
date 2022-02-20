import axios from '@/plugins/axios';
import { MessageManager, Messages } from '@/constants/MessageManager';

/**
 * 認証関連の処理切り出し
 * @returns signUp, login, guestLogin
 */
export const useAuth = () => {
	/**
	 * 新規登録ボタン押下時の処理
	 * @param username string
	 * @param password string
	 * @param store any Store Vuex
	 * @param router any Vue-Router
	 */
	const signUp = (
		username: string,
		password: string,
		store: any,
		router: any
	) => {
		// ローディング表示
		store.dispatch('setLoading', {
			isShow: true,
		});
		// ログイン処理のAPI操作
		const user = {
			name: username,
			password: password,
		};
		axios
			.post('v1/users', { user })
			.then((response) => {
				store.dispatch('login', {
					uid: response.data.user.uid,
					name: response.data.user.name,
					isLogined: true,
				});
				setTimeout(() => {
					router.push('/');
					store.dispatch('setLoading', {
						isShow: false,
					});
				}, 1000);
				// 遷移後、トーストメッセージ表示
				setTimeout(() => {
					store.dispatch('setToastShow', {
						message: MessageManager(Messages.MSG_004, ['ログイン']),
						toastType: 'success',
						isShow: true,
					});
				}, 1000);
				// トーストを2秒表示し、消す
				setTimeout(() => {
					store.dispatch('setToastShow', {
						message: '',
						toastType: '',
						isShow: false,
					});
				}, 2000);
			})
			.catch((err) => {
				// ローディング削除
				setTimeout(() => {
					store.dispatch('setLoading', {
						isShow: false,
					});
				}, 2000);
				console.error(err.response);
				setTimeout(() => {
					// トーストを2秒表示し、消す
					setTimeout(() => {
						store.dispatch('setToastShow', {
							message: '',
							toastType: '',
							isShow: false,
						});
					}, 2000);
				}, 1000);
			});
	};

	/**
	 * ログインボタン押下時の処理
	 * @param username string
	 * @param password string
	 * @param store any Store Vuex
	 * @param router any Vue-Router
	 */
	const login = (
		username: string,
		password: string,
		store: any,
		router: any
	) => {
		// ローディング表示
		store.dispatch('setLoading', {
			isShow: true,
		});
		// ログイン処理のAPI操作
		const user = {
			name: username,
			password: password,
		};
		axios
			.post('v1/auth', { user })
			.then((response) => {
				store.dispatch('login', {
					uid: response.data.user.uid,
					name: response.data.user.name,
					isLogined: true,
				});
				setTimeout(() => {
					router.push('/');
					store.dispatch('setLoading', {
						isShow: false,
					});
				}, 1000);
				// 遷移後、トーストメッセージ表示
				setTimeout(() => {
					store.dispatch('setToastShow', {
						message: MessageManager(Messages.MSG_004, ['ログイン']),
						toastType: 'success',
						isShow: true,
					});
				}, 1000);
				// トーストを2秒表示し、消す
				setTimeout(() => {
					store.dispatch('setToastShow', {
						message: '',
						toastType: '',
						isShow: false,
					});
				}, 2000);
			})
			.catch((err) => {
				// ローディング削除
				setTimeout(() => {
					store.dispatch('setLoading', {
						isShow: false,
					});
				}, 2000);
				console.error(err.response);
				setTimeout(() => {
					if (err.response.data.error === 'name_error') {
						store.dispatch('setToastShow', {
							message: 'ユーザーが存在しません',
							toastType: 'danger',
							isShow: true,
						});
						// トーストを2秒表示し、消す
						setTimeout(() => {
							store.dispatch('setToastShow', {
								message: '',
								toastType: '',
								isShow: false,
							});
						}, 2000);
					}
				}, 1000);
			});
	};

	/**
	 * ゲストログインボタン押下時の処理
	 * @param store Store Vuex
	 * @param router Vue-Router
	 */
	const guestLogin = (store: any, router: any) => {
		store.dispatch('login', {
			uid: 'test-1234-user-5678-abcd-9012-gues-tuse',
			name: 'ゲストユーザー',
			isLogined: true,
		});
		// ローディング表示
		store.dispatch('setLoading', {
			isShow: true,
		});
		// 2秒後、ローディングを解除
		setTimeout(() => {
			store.dispatch('setLoading', {
				isShow: false,
			});
		}, 2000);
		setTimeout(() => {
			// Homeに遷移
			router.push('/');
			// 遷移後、トーストメッセージ表示
			store.dispatch('setToastShow', {
				message: MessageManager(Messages.MSG_004, ['ログイン']),
				toastType: 'success',
				isShow: true,
			});
			// トーストを2秒表示し、消す
			setTimeout(() => {
				store.dispatch('setToastShow', {
					message: '',
					toastType: '',
					isShow: false,
				});
			}, 2000);
		}, 2000);
	};

	// useAuth()の持つ処理
	return {
		signUp,
		login,
		guestLogin,
	};
};
