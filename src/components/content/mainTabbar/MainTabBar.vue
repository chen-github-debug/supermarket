<template>

  <tab-bar>
    <tab-bar-item path="/home" activeColor="cornflowerblue">
      <img slot="item-icon" src="~assets/img/tabbar/shouye1.png" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/shouye2.png" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="cornflowerblue">
      <img slot="item-icon" src="~assets/img/tabbar/fenlei1.png" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/fenlei2.png" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="cornflowerblue">
      <img slot="item-icon" src="~assets/img/tabbar/gouwuche1.png" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/gouwuche2.png" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="cornflowerblue">
      <img slot="item-icon" src="~assets/img/tabbar/me1.png" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/me2.png" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from "components/common/tabbar/TabBar";
  import TabBarItem from "components/common/tabbar/TabBarItem";
  export default {
    name: "MainTabBar",
    components:{
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
