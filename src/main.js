import Vue from 'vue'
import App from './App'

// 引入store文件
import store from './store/index';
// 引入interfaces
import interfaces  from './utils/interfaces';
// 引入https
import https from './utils/https';

Vue.config.productionTip = false
// 注册store
Vue.prototype.$store = store;
// 注册interfaces
Vue.prototype.$interfaces = interfaces;
// 注册https
Vue.prototype.$https = https;
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
