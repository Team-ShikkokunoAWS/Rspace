import { MessageManager, Messages } from '@/constants/MessageManager';

/**
 * バリデーション関連のロジック切り出し
 * @returns signUpValidate, loginValidate
 */
export const useValidate = () => {
	/**
	 * 新規登録ボタン押下時のエラーチェック
	 * エラーメッセージ配列を返却
	 * @param username: string
	 * @param password: string
	 * @param passwordConfirm: string
	 * @return errorMessages: Array<string>
	 */
	const signUpValidate = (
		username: string,
		password: string,
		passwordConfirm: string
	): Array<string> => {
		const errorMessages: Array<string> = [];
		// CH-001: パスワード文字数チェック
		if (password && password.length < 8) {
			errorMessages.push(MessageManager(Messages.MSG_007, ['パスワード', '8']));
		}
		// CH-002: 確認用パスワード文字数チェック
		if (passwordConfirm && passwordConfirm.length < 8) {
			errorMessages.push(
				MessageManager(Messages.MSG_007, ['確認用パスワード', '8'])
			);
		}
		// 半角英数字記号の正規表現
		const reg = new RegExp(/^[a-zA-Z0-9!-/:-@¥[-`{-~]+$/);
		// CH-003: ユーザー名に半角英数字記号以外の入力がある場合
		if (username && !reg.test(username)) {
			errorMessages.push(MessageManager(Messages.MSG_002, 'ユーザー名'));
		}
		// CH-004: パスワードに半角英数字記号以外の入力がある場合
		if (password && !reg.test(password)) {
			errorMessages.push(MessageManager(Messages.MSG_002, 'パスワード'));
		}
		// CH-005: 確認用パスワードに半角英数字記号以外の入力がある場合
		if (passwordConfirm && !reg.test(passwordConfirm)) {
			errorMessages.push(MessageManager(Messages.MSG_002, '確認用パスワード'));
		}
		// CH-006: パスワード＆確認パスワードの一致確認
		if (password !== passwordConfirm) {
			errorMessages.push(
				MessageManager(
					Messages.MSG_000,
					'パスワードと確認用パスワードが一致していません'
				)
			);
		}
		return errorMessages;
	};

	/**
	 * ログインボタン押下時のエラーチェック
	 * エラーメッセージ配列を返却
	 * @param username: string
	 * @param password: string
	 * @return errorMessages: Array<string>
	 */
	const loginValidate = (username: string, password: string) => {
		const errorMessages: Array<string> = [];
		// CH-001: パスワード文字数チェック
		if (password && password.length < 8) {
			errorMessages.push(MessageManager(Messages.MSG_007, ['パスワード', '8']));
		}
		// 半角英数字記号の正規表現
		const reg = new RegExp(/^[a-zA-Z0-9!-/:-@¥[-`{-~]+$/);
		// CH-002: ユーザー名に半角英数字記号以外の入力がある場合
		if (username && !reg.test(username)) {
			errorMessages.push(MessageManager(Messages.MSG_002, 'ユーザー名'));
		}
		// CH-003: パスワードに半角英数字記号以外の入力がある場合
		if (password && !reg.test(password)) {
			errorMessages.push(MessageManager(Messages.MSG_002, 'パスワード'));
		}
		return errorMessages;
	};

	/**
	 * ユーザー編集画面にて、保存するボタン押下時のエラーチェック
	 * エラーメッセージ配列を返却
	 * @param username: string
	 * @param currentPassword: string
	 * @param newPassword: string
	 * @param newPasswordConfirm: string
	 * @return errorMessages: Array<string>
	 */
	const updateUserValidate = (
		username: string,
		currentPassword: string,
		newPassword: string,
		newPasswordConfirm: string
	) => {
		const errorMessages: Array<string> = [];

		// 正規表現チェック
		const reg = new RegExp(/^[a-zA-Z0-9!-/:-@¥[-`{-~]+$/);

		// CH-001: ユーザー名に半角英数字記号以外の入力がある場合
		if (username && !reg.test(username)) {
			errorMessages.push(MessageManager(Messages.MSG_002, 'ユーザー名'));
		}

		// CH-005: 現在のパスワードの文字数チェック
		if (currentPassword && currentPassword.length < 8) {
			errorMessages.push(
				MessageManager(Messages.MSG_007, ['現在のパスワード', '8'])
			);
		}
		// CH-006: 新しいパスワードの文字数チェック
		if (newPassword && newPassword.length < 8) {
			errorMessages.push(
				MessageManager(Messages.MSG_007, ['新しいパスワード', '8'])
			);
		}
		// CH-007: 新しいパスワード（確認用）の文字数チェック
		if (newPasswordConfirm && newPasswordConfirm.length < 8) {
			errorMessages.push(
				MessageManager(Messages.MSG_007, ['新しいパスワード（確認用）', '8'])
			);
		}

		// CH-008: 現在のパスワードに半角英数字記号以外の入力がある場合
		if (currentPassword && !reg.test(currentPassword)) {
			errorMessages.push(MessageManager(Messages.MSG_002, '現在のパスワード'));
		}
		// CH-009: 新しいパスワードに半角英数字記号以外の入力がある場合
		if (newPassword && !reg.test(newPassword)) {
			errorMessages.push(MessageManager(Messages.MSG_002, '新しいパスワード'));
		}
		// CH-010: 新しいパスワード（確認用）に半角英数字記号以外の入力がある場合
		if (newPasswordConfirm && !reg.test(newPasswordConfirm)) {
			errorMessages.push(
				MessageManager(Messages.MSG_002, '新しいパスワード（確認用）')
			);
		}

		// CH-011: 現在のパスワードと新しいパスワードの一致チェック
		if (currentPassword && newPassword && currentPassword === newPassword) {
			errorMessages.push(
				MessageManager(
					Messages.MSG_000,
					'現在のパスワードと新しいパスワードが一致しているため、登録できません'
				)
			);
		}

		// CH-012: 新しいパスワードと新しいパスワード（確認用）の一致チェック
		if (
			newPassword &&
			newPasswordConfirm &&
			newPassword !== newPasswordConfirm
		) {
			errorMessages.push(
				MessageManager(
					Messages.MSG_000,
					'新しいパスワードと新しいパスワード（確認用）が一致していません'
				)
			);
		}

		return errorMessages;
	};

	return {
		signUpValidate,
		loginValidate,
		updateUserValidate,
	};
};
