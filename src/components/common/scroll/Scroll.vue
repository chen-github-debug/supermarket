<template>
<!--  ref/children -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
<!--      插槽-->
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props: {
      //用于位置监听
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      // 1 创建BScroll对象
      // this.$refs.wrapper获取div的ref
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click:true,
        //新版本缺少这个属性无法完成滚动操作
        observeDOM:true,
        mouseWheel:true,
        pullUpLoad: this.pullUpLoad
      });

    //  2 监听滚动的位置
      this.scroll.on('scroll',(position) => {
        // console.log(position);
        // 将参数传出
        this.$emit('scroll', position);
      });

    //  监听上拉事件
      this.scroll.on('pullingUp', () => {
        // console.log('上拉加载');
        this.$emit('pullingUp');
      });

    },
    methods: {
      // tmie=500是es6的默认值语法
      scrollTo(x,y,time=500) {
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      }
    }
  }
</script>

<style scoped>

</style>