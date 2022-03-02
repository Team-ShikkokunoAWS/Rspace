# CButton コンポーネント

![CButtonコンポーネント](/documents/frontend/img/image1.png)

<br>

## 引数

| オプション名 |                備考                | デフォルト値     | 選択肢            |
| :----------: | :--------------------------------: | ---------------- | ----------------- |
|     name     |   ボタン部品のテキストを設定する   | なし（必須項目） | 指定なし          |
|  colorType   |      ボタン部品の色を設定する      | "teal"           | "teal", "primary" |
|    width     |     ボタン部品の横幅を設定する     | 300px            | 指定なし          |
|   disabled   | ボタン部品の活性・非活性を制御する | false            | ”true”, "false"   |

<br>

## 実装例

```javascript

  // ログインボタン
  <CButton
    style="margin-bottom: 5px"
    name="ログイン" // ボタン名称
    width="400px" // ボタン横幅
    colorType="teal" // ボタンの色(teal)
    :disabled="!state.username || !state.password" // disabledにする設定(ユーザー名、パスワードのどちらかが見入力の場合、disabled="true"となる)
    @click="onclickLogin($event)"
  />
  // ゲストログインボタン
  <CButton
    style="margin-bottom: 5px"
    name="ゲストログイン"
    width="400px"
    colorType="teal"
    @click="onclickGuestLogin($event)"
  />
  // 新規登録画面ボタン
  <CButton
    name="新規登録画面"
    width="400px"
    colorType="primary" // ボタンの色(primary)
    @click="onclickSignUpLink($event)"
  />
```