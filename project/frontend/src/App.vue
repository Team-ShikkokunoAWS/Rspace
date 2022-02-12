<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Header from './components/Header.vue';

@Options({
  components: {
    Header
  },
})
export default class App extends Vue {}
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    height: 100vh;
  }
</style>
