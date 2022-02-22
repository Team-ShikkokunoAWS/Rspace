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
		// 必須チェック
		if (!username) {
			errorMessages.push(MessageManager(Messages.MSG_001, 'ユーザー名'));
		}
		// パスワードの必須チェック
		if (!password) {
			errorMessages.push(MessageManager(Messages.MSG_001, 'パスワード'));
		}
		// 確認用パスワードの必須チェック
		if (!passwordConfirm) {
			errorMessages.push(MessageManager(Messages.MSG_001, '確認用パスワード'));
		}
		// パスワード文字数チェック
		if (password && password.length < 8) {
			errorMessages.push(MessageManager(Messages.MSG_007, ['パスワード', '8']));
		}
		// 確認用パスワード文字数チェック
		if (passwordConfirm && passwordConfirm.length < 8) {
			errorMessages.push(
				MessageManager(Messages.MSG_007, ['確認用パスワード', '8'])
			);
		}
		// 半角英数字記号の正規表現
		const reg = new RegExp(/^[a-zA-Z0-9!-/:-@¥[-`{-~]+$/);
		// ユーザー名に半角英数字記号以外の入力がある場合
		if (username && !reg.test(username)) {
			errorMessages.push(MessageManager(Messages.MSG_002, 'ユーザー名'));
		}
		// パスワードに半角英数字記号以外の入力がある場合
		if (password && !reg.test(password)) {
			errorMessages.push(MessageManager(Messages.MSG_002, 'パスワード'));
		}
		// 確認用パスワードに半角英数字記号以外の入力がある場合
		if (passwordConfirm && !reg.test(passwordConfirm)) {
			errorMessages.push(MessageManager(Messages.MSG_002, '確認用パスワード'));
		}
		// パスワード＆確認パスワードの一致確認
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
		// 必須チェック
		if (!username) {
			errorMessages.push(MessageManager(Messages.MSG_001, 'ユーザー名'));
		}
		// パスワードの必須チェック
		if (!password) {
			errorMessages.push(MessageManager(Messages.MSG_001, 'パスワード'));
		}
		// パスワード文字数チェック
		if (password && password.length < 8) {
			errorMessages.push(MessageManager(Messages.MSG_007, ['パスワード', '8']));
		}
		// 半角英数字記号の正規表現
		const reg = new RegExp(/^[a-zA-Z0-9!-/:-@¥[-`{-~]+$/);
		// ユーザー名に半角英数字記号以外の入力がある場合
		if (username && !reg.test(username)) {
			errorMessages.push(MessageManager(Messages.MSG_002, 'ユーザー名'));
		}
		// パスワードに半角英数字記号以外の入力がある場合
		if (password && !reg.test(password)) {
			errorMessages.push(MessageManager(Messages.MSG_002, 'パスワード'));
		}
		return errorMessages;
	};

	return {
		signUpValidate,
		loginValidate,
	};
};
