# InputForm コンポーネント

![InputFormコンポーネント](/documents/frontend/img/image2.png)

<br>

## 引数

| オプション名 |                               備考                               | デフォルト値     | 選択肢                       |
| :----------: | :--------------------------------------------------------------: | ---------------- | ---------------------------- |
|   ctlName    |      フォーム部品の ID を設定。１画面に一意になるように設定      | なし（必須項目） | 指定なし                     |
|  labelName   |               フォーム部品のラベル名を設定する項目               | なし（必須項目） | 指定なし                     |
|   required   |        フォーム部品の必須アスタリスクを付与するための項目        | false            | "true", "false""             |
|     type     |                   フォームの種別を設定する項目                   | なし（必須項目） | "text", "password", "search" |
|  maxlength   |         フォーム部品に入力できる最大文字数を設定する項目         | なし             | なし                         |
|    focus     | 画面初期表示時に該当フォームにフォーカスを当てることができる項目 | false            | "true", "false"              |
|    width     |                  このフォームの横幅を決める項目                  | 300px            | 指定なし                     |

<br>

## 実装例

```javascript
<div>
  <InputForm
    v-model="state.username"
    ctlName="username" // フォームのID
    labelName="userName" // フォームのラベル名
    required="true" // 必須項目
    type="text" // inputタグのtype設定
    maxlength="20" // 最大文字数20文字
    focus="true" // 画面初期表示時にフォーカスを付与する
    width="400px" // フォームの横幅
  />
</div>
<div>
  <InputForm
    v-model="state.password"
    ctlName="password"
    labelName="password"
    required="true"
    type="password" // inputタグのtype設定
    maxlength="20"
    width="400px"
  />
</div>
```
