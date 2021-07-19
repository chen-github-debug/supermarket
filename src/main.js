import Vue from 'vue';
import App from './App.vue';
import router from "./router";
import store from "./store";
import toast from 'components/common/toast';

import FastClick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';

Vue.config.productionTip = false;

//添加事件总线对象
Vue.prototype.$bus = new Vue();
//安装toast插件
Vue.use(toast);
//解决移动端300ms延迟
FastClick.attach(document.body);

// 使用图片懒加载插件
Vue.use(VueLazyLoad,{
  //占位符图片
  loading: require('./assets/img/Chen_AC/Chen_AC.png')
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
