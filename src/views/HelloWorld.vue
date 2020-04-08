<template>
  <div>Hello World~~ --- {{msg}}</div>
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
.page {
  text-align: center;
  padding: 20px 0;
}
.page a {
  display: inline-block;
  padding: 2px 10px;
  border: 1px solid #ddd;
  margin-right: 10px;
  -webkit-user-select: none;
}
.page a:last-child {
  margin-right: 0;
}
.page a.current {
  background: #eee;
  color: #999;
  border-color: #eee;
  cursor: default;
  pointer-events: none;
}
</style>