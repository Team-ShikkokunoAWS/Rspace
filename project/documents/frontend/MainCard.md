# MainCard コンポーネント

![MainCardコンポーネント](/documents/frontend/img/image3.png)
※ ログインフォームを覆っている部品

<br>

![MainCardコンポーネント](/documents/frontend/img/image4.png)
※ チャットルームリンクを一つ一つ覆っている部品

<br>

## 引数

| オプション名 |                    備考                    | デフォルト値      | 選択肢   |
| :----------: | :----------------------------------------: | ----------------- | -------- |
|    width     |    カードコンポーネントの横幅を決定する    | 80%               | 指定なし |
|    height    |    カードコンポーネントの高さを決定する    | 60vh              | 指定なし |
|    color     | カードコンポーネント内部の背景色を決定する | #eee (薄いグレー) | 指定なし |

<br>
※ 「vh」とは、「viewport height」という意味合いの単位です。 デバイスの表示領域（viewport）の高さに対しての割合を設定することができ、1vh = viewportの1/100で計算されています。

<br>

実装例 1

```javascript
// ログイン画面の実装例
// 背景色を白に設定、高さは400px, 横幅は600pxに指定
<MainCard color="#fff" height="400px" width="600px">
	<div class="username-form">
		<InputForm
			v-model="state.username"
			ctlName="username"
			labelName="userName"
			required="true"
			type="text"
			maxlength="20"
			focus="true"
			width="400px"
		/>
	</div>
	// 以下の内容は省略
</MainCard>
```

実装例 2

```javascript
// チャットルーム一覧の実装例
<MainCard
  width="800px" // 横幅800px
  height="120px" // 高さ120px
  class="chat-room-card"
  v-for="item in items" // ルーム情報の取得件数分繰り返し表示する
  :key="item.uid" // v-forの必要キー。（ないとエラー), uidをキーとする
>
  <div class="chatIndex-user-wrapper">
    <div class="user-icon">
      <UserIcon
        width="80px"
        height="80px"
        :backgroundImage="item.iconImage"
      />
      <div class="user-name">
        {{ item.username }}
      </div>
    </div>
  </div>
  <div class="message-wrapper">
    <div class="message-bar">
      {{ item.message }}
    </div>
    <div class="message-time">{{ item.timestamp }}</div>
  </div>
</MainCard>

```
