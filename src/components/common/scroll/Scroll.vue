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
        pullUpLoad: this.pullUpLoad,
        keepAlive:true,
      });

    //  2 监听滚动的位置
      if(this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll',(position) => {
          // 将参数传出
          this.$emit('scroll', position);
        });
      }

    //  3 监听上拉事件
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          // console.log('监听滚动到底部');
          this.$emit('pullingUp');
        });
      }
    },
    methods: {
      // tmie=500是es6的默认值语法
      scrollTo(x,y,time=500) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll && this.scroll.refresh();
      },
      getScrollY(){
        return this.scroll ? this.scroll.y : 0;
      }
    }
  }
</script>

<style scoped>

</style>