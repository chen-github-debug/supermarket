<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
<!--    <toast :message="message" :show="show"/>-->
  </div>
</template>

<script>
   import DetailNavBar from "./chlidComps/DetailNavBar";
   import DetailSwiper from "./chlidComps/DetailSwiper";
   import DetailBaseInfo from "./chlidComps/DetailBaseInfo";
   import DetailShopInfo from "./chlidComps/DetailShopInfo";
   import DetailGoodsInfo from "./chlidComps/DetailGoodsInfo";
   import DetailParamInfo from "./chlidComps/DetailParamInfo";
   import DetailCommentInfo from "./chlidComps/DetailCommentInfo";
   import DetailBottomBar from "./chlidComps/DetailBottomBar";

   import Scroll from "../../components/common/scroll/Scroll";
   import GoodsList from "../../components/content/goods/GoodsList";
   // import Toast from "../../components/common/toast/Toast";

   import {getDetail, Goods, Shop,GoodsParam,getRecommend} from "../../network/detail";
   import {debounce} from "../../common/utils";
   import {itemListenerMixin,backTopMixin} from "../../common/mixin";
   import {BACKTOP_DISTANCE} from "../../common/const";
   import {mapActions} from 'vuex'
   export default {
    name: "Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      // Toast,
    },
    mixins: [itemListenerMixin,backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
        // message: '',
        // show: false
      }
    },
    created() {
      // 1 保存传入的iid
      this.iid = this.$route.params.iid;

    //  2 根据iid请求详情数据
      getDetail(this.iid).then(res=> {
        // console.log(res);
        //1 获取数据
        const data = res.result;
        //2 获取轮播图信息
        this.topImages = data.itemInfo.topImages

        // 3 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //4 保存店铺信息
        this.shop = new Shop(data.shopInfo);

        // 5 获取商品的详细信息
        this.detailInfo = data.detailInfo;

        //6 获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

        //7 保存评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }
        /*
        //1 第一次获取，值不对
        //2 原因：this.$refs.params.$el压根没有渲染
        this.themeTopYs=[];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themeTopYs);

        //3 第二次获取，值不对
        //4 原因：图片没有计算在内
        this.$nextTick(()=>{
          this.themeTopYs=[];
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          console.log(this.themeTopYs);
        })*/
      });
    //  3 请求推荐数据
      getRecommend().then(res=>{
        this.recommends = res.data.list
      });

      // 给getThemeTopY赋值（debounce操作进行防抖）
      this.getThemeTopY = debounce(()=>{
        this.themeTopYs=[];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
        console.log(this.themeTopYs);
      },200)
    },
     mounted() {

     },
     updated() {

     },
     destroyed() {
       this.$bus.$off('itemImgLoad', this.itemImgListenner)
     },
     methods: {
      ...mapActions(['addCart']),
       imageLoad() {
         this.$refs.scroll.refresh();
         this.getThemeTopY();
       },
       titleClick(index){
         console.log(index);
         this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200);
       },
       contentScroll(position){
         //1 获取Y值
         const positionY = -position.y;
         //2 positionY和主题中值进行对比
         let length = this.themeTopYs.length;
         for(let i=0;i<length-1;i++){
           if(this.currentIndex !== i && (positionY>=this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
             this.currentIndex=i;
             this.$refs.nav.currentIndex = this.currentIndex
           }
         }

         // for(let i=0;i<length;i++){
         //   if(this.currentIndex !==i &&((i<length-1 && positionY >= this.themeTopYs[i] && positionY <
         //     this.themeTopYs[i+1]) || (i===length-1 && positionY >= this.themeTopYs[i]))){
         //     this.currentIndex=i;
         //     this.$refs.nav.currentIndex = this.currentIndex
         //   }
         // }

         //3 是否显示回到顶部
         this.isShowBackTop = -position.y > BACKTOP_DISTANCE
       },
       addToCart(){
         //1 获取购物车需要展示的信息
         const product={};
         product.image = this.topImages[0];
         product.title = this.goods.title;
         product.desc = this.goods.desc;
         product.price = this.goods.realPrice;
         product.iid = this.iid;

         //2 讲商品添加到购物车
         // this.$store.commit('addCart', product);
         this.addCart(product).then(res=>{
           // console.log(res);
           // this.show = true;
           // this.message = res;
           // setTimeout(()=>{
           //   this.show = false;
           //   this.message = ''
           // },1500)

           this.$toast.show(res, 1500);
         });

         // this.$store.dispatch('addCart', product).then(res => {
         //   console.log(res);
         // });
       }
     }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }
</style>