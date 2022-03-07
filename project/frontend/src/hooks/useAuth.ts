import axios from '@/plugins/axios';
import { MessageManager, Messages } from '@/constants/MessageManager';

/**
 * 認証関連の処理切り出し
 * @returns signUp, login, guestLogin
 */
export const useAuth = () => {
	/**
	 * 新規登録 or ログインボタン押下時の処理
	 * @param username string
	 * @param password string
	 * @param store any Store Vuex
	 * @param router any Vue-Router
	 */
	const doAuth = (
		username: string,
		password: string,
		store: any,
		router: any,
		type: 'login' | 'signup'
	) => {
		// ローディング表示
		store.dispatch('loading/setLoading', {
			isShow: true,
		});
		// ログイン処理のAPI操作
		const user = {
			name: username,
			password: password,
		};
		const url: string =
			type === 'login' ? 'v1/auth' : type === 'signup' ? 'v1/users' : '';
		axios
			.post(url, { user })
			.then((response) => {
				// ローディングを1秒表示後、ログイン処理を実行
				setTimeout(() => {
					store.dispatch('user/login', {
						uid: response.data.user.uid,
						name: response.data.user.name,
						isLogined: true,
						// ユーザーアイコンを設定。レスポンスにない場合は、空白文字を設定
						iconImage: response.data.user.iconImage
							? response.data.user.iconImage
							: '',
						// ユーザー背景を設定。レスポンスにない場合は、空白文字を設定
						backImage: response.data.user.backImage
							? response.data.user.backImage
							: '',
					});
					store.dispatch('loading/setLoading', {
						isShow: false,
					});
					// home画面へ遷移
					router.push('/');
					// 遷移後、トーストメッセージ表示
					store.dispatch('toast/setToastShow', {
						message: MessageManager(Messages.MSG_004, ['ログイン']),
						toastType: 'success',
						isShow: true,
					});
					// トーストを2秒表示し、消す
					setTimeout(() => {
						store.dispatch('toast/setToastShow', {
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
					store.dispatch('loading/setLoading', {
						isShow: false,
					});
					let errorMessage: string = '';
					switch (err.response && err.response.data.error_detail) {
						case 'name_error':
							errorMessage = MessageManager(Messages.MSG_005, 'ユーザー名');
							break;
						case 'password_error':
							errorMessage = MessageManager(Messages.MSG_005, 'パスワード');
							break;
						case 'already_regist':
							errorMessage = MessageManager(Messages.MSG_006, [
								'該当のユーザー名',
								'利用',
							]);
							break;
					}
					// どのエラーにもならなかった場合、システムエラーとして出力する
					if (!errorMessage) {
						errorMessage = MessageManager(Messages.SYS_ERROR);
					}
					store.dispatch('toast/setToastShow', {
						message: errorMessage,
						toastType: 'danger',
						isShow: true,
					});
					// トーストを2秒表示し、消す
					setTimeout(() => {
						store.dispatch('toast/setToastShow', {
							message: '',
							toastType: '',
							isShow: false,
						});
					}, 2000);
				}, 1000);
			});
	};

	/**
	 * ゲストログインボタン押下時の処理
	 * @param store Store Vuex
	 * @param router Vue-Router
	 */
	const guestLogin = (store: any, router: any) => {
		console.log(store);
		// ローディング表示
		store.dispatch('loading/setLoading', {
			isShow: true,
		});
		// 2秒後、ログイン処理＆ローディングを解除
		setTimeout(() => {
			store.dispatch('user/login', {
				uid: 'test-1234-user-5678-abcd-9012-gues-tuse',
				name: 'ゲストユーザー',
				isLogined: true,
				// ゲストユーザーのアイコンはno_image.jpgを設定するため、空白文字をセット
				iconImage: '',
				backImage: '',
			});
			store.dispatch('loading/setLoading', {
				isShow: false,
			});
			router.push('/');
			console.log('遷移');
			console.log(store);
			console.log(store.state);
			// 遷移後、トーストメッセージ表示
			store.dispatch('toast/setToastShow', {
				message: MessageManager(Messages.MSG_004, ['ログイン']),
				toastType: 'success',
				isShow: true,
			});
			// トーストを2秒表示し、消す
			setTimeout(() => {
				store.dispatch('toast/setToastShow', {
					message: '',
					toastType: '',
					isShow: false,
				});
			}, 2000);
		}, 1000);
	};

	// useAuth()の持つ処理
	return {
		doAuth,
		guestLogin,
	};
};
