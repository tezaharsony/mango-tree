import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000'
})

const actions = {
  start ({ commit }, user) {
    http.get('/start', {
    })
    .then((result) => {
      commit('setGrowth', result)
    })
    .catch(err => console.error(err))
  }
}

export default actions
