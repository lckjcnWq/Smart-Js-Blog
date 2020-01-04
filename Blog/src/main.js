import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import {post} from "./http/http";
import store from './vuex/store'
import 'element-ui/lib/theme-chalk/index.css'
import ElSearchTablePagination from 'el-search-table-pagination'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor);
Vue.use(ElSearchTablePagination, {
  axios
})
//定义全局变量
Vue.prototype.$post = post;
// Vue.prototype.$get = get;
Vue.prototype.axio = axios;
Vue.use(ElementUI);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
