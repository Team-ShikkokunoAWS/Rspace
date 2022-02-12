<template>
  <div class="page-container">
    <div class="login-title">
      <h2>Login</h2>
    </div>
    <div class="login-card">
      <div class="login-form">
        <div class="form-label">
          <label>ユーザー名</label>
        </div>
        <div class="input-form">
          <input type="text"/>
        </div>
        <div class="form-label">
          <label>パスワード</label>
        </div>
        <div class="input-form">
          <input type="password" />
        </div>
        <div class="login-btn">
          <button>ログイン</button>
        </div>
        <div class="login-btn">
          <button>ゲストログイン</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { 
  defineComponent,
} from 'vue';
import { useStore } from '../store';

export default defineComponent ({
  name: 'LoginPage',
  components: {

  },
  setup() {
    // storeを取得する
    const store = useStore();
    console.log(store.state.user)
    return {

    }
  }
}) // export default defineComponent
</script>

<style scoped>
  .page-container {
    text-align: center;
  }

  .login-title {
    margin-top: 20px;
  }

  /* カード */
  .login-card {
    width: 80%;
    height: 60vh;
    border: 1px solid #333;
    margin: 30px auto;
    box-shadow: 4px 4px gray;
  }

  /* フォーム関連 */
  .login-form {
    margin-top: 40px;
  }
  .form-label {
    margin-bottom: 10px;
  }
  .input-form input{
    margin-bottom: 10px;
    width: 40%;
    padding: 8px;
  }

  /* ボタン関連 */
  .login-btn {
    margin-top: 5px;
  }
  .login-btn button {
    padding: 8px;
    background-color: rgb(91, 155, 155);
    color: #eee;
    font-weight: bold;
    border-radius: 8px;
    width: 40%;
  }
  .login-btn button:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  .login-btn button:active {
    width: 39%;
  }
</style>
