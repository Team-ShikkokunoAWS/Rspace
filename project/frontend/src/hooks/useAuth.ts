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
				// ローディングを1秒表示後、ログイン処理を実行
				setTimeout(() => {
					store.dispatch('login', {
						uid: response.data.user.uid,
						name: response.data.user.name,
						isLogined: true,
					});
					store.dispatch('setLoading', {
						isShow: false,
					});
					// home画面へ遷移
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
				}, 1000);
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
				// ローディングを1秒表示後、ログイン処理を実行
				setTimeout(() => {
					store.dispatch('login', {
						uid: response.data.user.uid,
						name: response.data.user.name,
						isLogined: true,
					});
					store.dispatch('setLoading', {
						isShow: false,
					});
					// home画面へ遷移
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
				}, 1000);
			})
			.catch((err) => {
				console.error(err.response);
				// ローディングを1秒表示し、エラー処理を行う
				setTimeout(() => {
					// ローディング削除
					store.dispatch('setLoading', {
						isShow: false,
					});
					// バックエンドからのエラーがname_errorの場合
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
		// ローディング表示
		store.dispatch('setLoading', {
			isShow: true,
		});
		// 2秒後、ログイン処理＆ローディングを解除
		setTimeout(() => {
			store.dispatch('login', {
				uid: 'test-1234-user-5678-abcd-9012-gues-tuse',
				name: 'ゲストユーザー',
				isLogined: true,
			});
			store.dispatch('setLoading', {
				isShow: false,
			});
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
		}, 1000);
	};

	// useAuth()の持つ処理
	return {
		signUp,
		login,
		guestLogin,
	};
};
