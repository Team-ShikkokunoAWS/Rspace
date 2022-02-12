<template>
  <div class="header-container">
    <h1 class="header-title">RSpace</h1>
  </div>
</template>

<script lang="ts">
import { 
  defineComponent,
} from 'vue';

export default defineComponent ({
  name: 'Header',
  components: {

  },
  setup() {

    return {

    }
  }
}) // export default defineComponent
</script>

<style scoped>
.header-container {
  width: 100%;
  height: 80px;
  border-bottom: 1.5px solid #333;
}

.header-title {
  margin-left: 20px;
}

</style>
