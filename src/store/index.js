import Vue from 'vue'
import Vuex from 'vuex'
import applications from './applications'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    applications
  }
})