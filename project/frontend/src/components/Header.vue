<template>
  <div class="header-container">
    <div class="header-title">
      <h1 class="header-title">RSpace</h1>
    </div>
    <div class="header-user-name">
      <h4>{{ username }}</h4>
    </div>
  </div>
</template>

<script lang="ts">
import { 
  computed,
  defineComponent,
} from 'vue';
import { useStore } from '../store';

export default defineComponent ({
  name: 'Header',
  components: {

  },
  setup() {
    // storeを取得する
    const store = useStore();
    const username = computed(() => store.state.user.name);
    return {
      username
    }
  }
}) // export default defineComponent
</script>

<style scoped>
.header-container {
  width: 100%;
  height: 80px;
  border-bottom: 1.5px solid #333;
  display: flex;
}

.header-title {
  margin-left: 20px;
}

.header-user-name {
  margin-left: auto;
  margin-right: 50px;
  margin-top: 20px;
}

</style>
