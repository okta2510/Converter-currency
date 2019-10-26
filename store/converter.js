export const state = () => ({
  title: 'App Exercise',
  test: 'hallo'
})

export const getters= {
  getData (state) {
    return state.test
  },
  getTitle (state) {
    return state.title
  }
}

export const mutations = {
}