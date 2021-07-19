import {debounce} from "./utils";
import BackTop from "../components/content/backTop/BackTop";
export const itemListenerMixin = {
  data(){
    return {
      itemImgListener: null
    }
  },
  mounted() {
    let refresh = debounce(this.$refs.scroll.refresh,100);
    this.itemImgListener = () => {
      refresh();
    };
    this.$bus.$on('itemImgLoad',this.itemImgListener);
  }
};

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      // scrollTo(0,0,500) 前面两个参数是坐标，第三个参数是毫秒
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
  }
};