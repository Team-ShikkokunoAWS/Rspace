export type Dialog = {
	title: string;
	message: string;
	// 必要に応じてダイアログタイプをリテラルで型付け
	dialogType: 'logout' | '';
	isShow: boolean;
};
