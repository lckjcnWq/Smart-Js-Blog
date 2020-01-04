import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//状态
const state = {
  userinfo: localStorage.getItem('userInfo')
}
const mutations = {
  SAVE_USERINFO(state, userinfo) {
    console.log(userinfo);
    console.log(state);
    localStorage.setItem("userInfo", userinfo)
    return (state.userinfo = userinfo);
    // console.log('state.userinfo:' + state.userinfo)
  }
}

//创建一个state仓库
export default new Vuex.Store({
  state,
  mutations
})


