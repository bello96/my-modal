import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 1
  },
  mutations: {
    increment(state, payload) {
      state.count += payload.amount
    }
  }
})
