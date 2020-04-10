<template>
  <div class="hello">
    <h2>Hello Koa</h2>
    <p>{{msg}}</p>
    <router-link to="/">Go to Home</router-link>
  </div>
</template>

<script>

export default {
  name: 'Todolist',
  data () {
    return {
      msg: 'Qin'
    }
  }
}
</script>

<style scoped>
.hello{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 25px;
  flex-direction: column;
  font-weight: bold;
}
h2 {
  font-size: 25px;
}
a {
  text-decoration: underline;
  color: lightcoral;
}
</style>