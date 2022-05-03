import axios from '@/plugins/axios';
import { MessageManager, Messages } from '@/constants/MessageManager';
import { User } from '@/types/user';

/**
 * ユーザー更新機能の処理切り出し
 * @returns signUp, login, guestLogin
 */
export const useUpdateUser = () => {
	/**
	 * 新規登録 or ログインボタン押下時の処理
	 * @param state リアクティブ
	 * @param store any Store Vuex
	 * @param router any Vue-Router
	 */
	const update = (state: any, store: any, router: any) => {
		// ローディング表示
		store.dispatch('loading/setLoading', {
			isShow: true,
		});
		// 処理
		axios
			.post('v1/users/update', {
				uid: state.user.uid,
				name: state.username,
				description: state.description,
				currentPassword: state.currentPassword,
				newPassword: state.newPassword,
			})
			.then((response) => {
				console.log(response);
				const responseUser: User = response.data.user;
				setTimeout(() => {
					// 返却されたユーザー情報をstoreに登録
					store.dispatch('user/setUser', {
						uid: responseUser.uid,
						name: responseUser.name,
						description: responseUser.description,
						isLogined: true,
						iconImage: responseUser.iconImage,
						backImage: responseUser.backImage,
					});
					// フォームにstoreの値を再設定
					state.user = responseUser;
					// loading削除
					store.dispatch('loading/setLoading', {
						isShow: false,
					});
					// トースト(success)
					store.dispatch('toast/setToastShow', {
						message: MessageManager(Messages.MSG_004, ['ユーザー情報を更新']),
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
					// フォームを再設定
					state.username = store.state.user.name;
					state.currentPassword = '';
					state.newPassword = '';
					state.newPasswordConfirm = '';
				}, 1000);
			})
			.catch((err) => {
				console.log(err);
				// フォームはそのままにし、削除しない
				setTimeout(() => {
					// loading削除
					store.dispatch('loading/setLoading', {
						isShow: false,
					});
					// トースト(danger)
					let errorMessage: string = '';
					switch (err.response && err.response.data.errorDetail) {
						// currentPasswordError 現在のパスワードが間違っているエラー
						case 'currentPasswordError':
							errorMessage = MessageManager(
								Messages.MSG_005,
								'現在のパスワード'
							);
							break;
						// illegalUid 現在ログインしているユーザーが見つからないエラー
						case 'illegalUid':
							errorMessage = MessageManager(Messages.MSG_005, 'ユーザー情報');
							break;
						// alreadyRegist そのユーザー名はすでに登録されていますエラー
						case 'alreadyRegist':
							errorMessage = MessageManager(Messages.MSG_006, [
								'該当のユーザー名',
								'利用',
							]);
							break;
					}
					// illegal_uidの場合、強制遷移させる(404NotFound)
					if (err.response.data.errorDetail === 'illegalUid') {
						router.push('/404NotFound');
						// 遷移後、トーストメッセージ表示
						store.dispatch('toast/setToastShow', {
							message: MessageManager(Messages.MSG_005, 'ユーザー情報'),
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
				});
			});
	};

	return {
		update,
	};
};
