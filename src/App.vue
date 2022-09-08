<script>
import { defineComponent } from 'vue';

import ApiTester from '@/components/ApiTester.vue';

export default defineComponent({
  components: {
    ApiTester
  }
});
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
  </header>

  <main>
    <ApiTester />
  </main>
</template>

<style lang="scss">
#app {
  margin: 0 auto;
  max-width: 102.8rem;
}

header {
  text-align: center;
}
</style>
