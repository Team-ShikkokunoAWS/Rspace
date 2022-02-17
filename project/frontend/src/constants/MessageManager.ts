export namespace MessageManager {
	export const MSG_001 = '{0}の入力は必須です';
	export const MSG_002 = '{0}の入力は半角英数字、記号のみです';
	export const MSG_003 = '{0}の入力は{1}文字以内です';
	export const MSG_004 = '{0}しました';
}

export const getMessage = (message: string, param: Array<string>): string => {
	let result = '';
	for (let i = 0; i < param.length; i++) {
		const index = '{' + i + '}';
		result = message.replace(index, param[i]);
		message = result;
	}
	return result;
};
