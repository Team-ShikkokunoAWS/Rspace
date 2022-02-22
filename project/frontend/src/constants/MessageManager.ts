export namespace Messages {
	export const MSG_000 = '{0}';
	export const MSG_001 = '{0}の入力は必須です';
	export const MSG_002 = '{0}の入力は半角英数字記号のみです';
	export const MSG_003 = '{0}の入力は{1}文字以内です';
	export const MSG_004 = '{0}しました';
	export const MSG_005 = '{0}を確認してください';
	export const MSG_006 = '{0}は{1}できません';
	export const MSG_007 = '{0}は{1}文字以上で入力してください';
}

export const MessageManager = (
	message: string,
	param: string | Array<string>
): string => {
	let result = '';
	const loopIndex: number = Array.isArray(param) ? param.length : 1;
	for (let i = 0; i < loopIndex; i++) {
		const index = '{' + i + '}';
		const changeString = Array.isArray(param) ? param[i] : param;
		result = message.replace(index, changeString);
		message = result;
	}
	return result;
};
