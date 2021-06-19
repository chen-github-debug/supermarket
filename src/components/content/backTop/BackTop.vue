<!--  返回顶部的图标-->

<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "BackTop",
  }
</script>

<style scoped>
  .back-top {
    /*定位布局*/
    position: fixed;
    right: 10px;
    bottom: 60px;
  }
  .back-top img {
    width: 48px;
    height: 48px;
  }
</style>