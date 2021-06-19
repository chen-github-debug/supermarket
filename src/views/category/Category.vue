<template>
  <div class="wrapper" ref="aaaa">
<!--    1 无论是否设置click:false，button都可以点击-->
<!--    <button @click="btnClick">按钮</button>-->

<!--    2 必须设置click:true，div才能监听点击-->
<!--    <div @click="divClick">点击</div>-->
    <ul class="content">
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
    </ul>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Category",
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(document.querySelector('.wrapper'),{
        probeType: 3,
        pullUpLoad: true,
      });

      this.scroll.on('scroll',(position) => {
        //实时侦测
        console.log(position);
      });

      this.scroll.on('pullingUp', () => {
        console.log('上拉加载更多');
      })
    }
  }
</script>

<style scoped>
  .wrapper {
    height: 150px;
    background-color: aqua;
    overflow: hidden;
  }
</style>