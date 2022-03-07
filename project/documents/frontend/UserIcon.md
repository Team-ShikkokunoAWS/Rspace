# UserIcon コンポーネント

![UserIconコンポーネント](/documents/frontend/img/image5.png)
※ ヘッダー情報にあるユーザーアイコンのレイアウト  
※ ゲストユーザーなのでアイコン情報がないため、no_image を表示している

<br>

![UserIconコンポーネント](/documents/frontend/img/image4.png)
※ チャットルーム一覧の相手ユーザーアイコンを表示するレイアウト  
※ 仮で public にある img.jpg を表示させているが、props に引数を渡して表示する例   
※ API から取得したパスを props として渡してあげることで画像表示する実装にしている

<br>

## 引数

|  オプション名   |                          備考                          | デフォルト値 | 選択肢   |
| :-------------: | :----------------------------------------------------: | ------------ | -------- |
|      width      |     ユーザーアイコンコンポーネントの横幅を決定する     | 80px         | 指定なし |
|     height      |     ユーザーアイコンコンポーネントの高さを決定する     | 80px         | 指定なし |
| backgroundImage | ユーザーアイコンコンポーネントに表示する画像を決定する | no_image.jpg | 指定なし |

<br>

※ backgroundImage のデフォルト値に指定している no_image.jpg は、" project > frontend > public "ディレクトリに格納されている

<br>

実装例 1 ヘッダー情報のユーザーアイコン

```javascript
// ユーザー情報, ログアウトボタン
<div class="header-user-info flex" v-if="userInfo.name">
  <div class="name-and-icon flex" @click="onclickUserName">
    <p>{{ userInfo.name }}</p>
    <UserIcon
      width="60px" // 横幅60px
      height="60px" // 高さ60px
      :backgroundImage="userInfo.iconImage" // cookieで保管しているユーザー情報にあるiconIamgeパス
    />
  </div>
  <div>
    <fa-icon
      icon="arrow-right-from-bracket"
      class="header-logout-btn"
      @click="onclickLogout($event)"
    />
  </div>
</div>
```

<br>

実装例 2 チャット一覧ページのユーザーアイコン

```javascript
<MainCard
  width="800px"
  height="120px"
  class="chat-room-card"
  v-for="item in items" // ルーム情報件数分繰り返し表示する
  :key="item.uid"
  @click="onclickChatRoom(item.roomId)"
>
  <div class="chatIndex-user-wrapper">
    <div class="user-icon">
      <UserIcon
        width="80px" // 横幅80px ※ デフォルト値のため未指定でも可能だが、一応指定
        height="80px" // 高さ80px ※ デフォルト値のため未指定でも可能だが、一応指定
        :backgroundImage="item.iconImage" // ルーム情報に格納されているユーザー情報のアイコンパスを渡している
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
