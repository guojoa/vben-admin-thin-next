<template>
  <div class="welcome">
    user page
    <a-button @click="getuser">sss</a-button>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { userStore } from '/@/store/modules/user';
  export default defineComponent({
    name: 'user',
    setup() {
      async function getuser() {
        console.log('aaaa');
        const userinfo = await userStore.getUserInfo();
        console.log('userinfo', userinfo);
      }
      return {
        getuser,
      };
    },
  });
</script>
<style lang="less" scoped>
  .welcome {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
</style>
