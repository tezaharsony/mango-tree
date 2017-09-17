<template>
  <div class="hello">
    <h1>Mango tree simulator</h1>
    <h3>Click start and watch tree status every 4 seconds until the tree has met its end</h3>
    <button class="btn" @click="startMango">Start me now Dear</button>
    <h2>{{status}}</h2>
    <h3>{{deadMsg}}</h3>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'hello',
  data () {
    return {
      status: '',
      deadMsg: ''
    }
  },
  methods: {
    ...mapActions([
      'start'
    ]),
    getStatus () {
      this.$db.on('value', (mango) => {
        this.status = mango.val().status
        this.deadMsg = mango.val().deadMessage
      })
    },
    startMango () {
      this.$db.set({ status: '', deadMsg: '' })
      this.start()
    }
  },
  mounted () {
    this.getStatus()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2, h3 {
  font-weight: normal;
}

.btn {
  margin: 10px 0px 10px 0px;
}
</style>
