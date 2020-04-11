<template>
  <div>
    <div class="page-top">
      <h2>任务计划列表</h2>
    </div>
<div class="main">
    <div class="item">
      <h3 class="big-title">添加任务：</h3>
      <input
        placeholder="例如：吃饭睡觉打豆豆； 提示：+回车即可添加任务"
        class="task-input"
        type="text"
        v-on:keyup.enter="enterFn"
        v-model="todo"
      />
      <ul class="task-tab">
        <li class="action">
          <a :class="{active:visibility!=='unCompleted'&&visibility!=='completed'}" href="#all">全部</a>
          <a :class="{active:visibility==='unCompleted'}" href="#unCompleted">未完成</a>
          <a :class="{active:visibility==='completed'}" href="#completed">已完成</a>
        </li>
      </ul>
    </div>
    <div class="til">
      <h3 class="big-title">任务列表：</h3>
      <router-link to="/hello">测试History</router-link>
    </div>
    <div class="task-til">
      <p style="font-size:12px;">提示: 双击内容可以编辑</p>
      <span>{{unComplete}} 个任务未完成</span>
    </div>
    
    <div class="tasks">
 
        <span class="no-task-tip" v-show="!list.length">还没有添加任何任务</span>
        <ul class="todo-list" v-show="list.length">
            <li class="todo"
                v-for="item in filterData"
                v-bind:class="{completed:!!item.isComplete,editing:item===edtorTodos}"
                :key="item.id"
            >
                <div class="view">
                    <input
                      class="toggle"
                      type="checkbox"
                      v-model="item.isComplete"
                      @change="handlerChecke(item)"
                    />
                    <label @dblclick="edtorTodo(item)">{{item.title}}</label>
                    <button
                            class="destroy"
                            @click="delFn(item)"
                    ></button>
                </div>
                <input
                        class="edit"
                        type="text"
                        v-focus="edtorTodos===item"
                        v-model="item.title"
                        @blur="edtoEnd(item)"
                        @keyup.enter="edtoEnd(item)"
                        @keyup.esc="cancelEdit(item)"
                />
            </li>
        </ul>

      <div class="page" v-if="(visibility === 'all' || !visibility) && totalPage > 1">
        <a
          v-for="num in totalPage"
          :key="num"
          :class="{current: page === num}"
          href="javascript:;"
          @click="page = num"
        >{{num}}</a>
      </div>
    </div>
</div>
  </div>
</template>

<script>
import api from '@/api'
// var store = {
//     save(key,value){
//         window.localStorage.setItem(key,JSON.stringify(value));
//     },
//     fetch(key){
//      return JSON.parse(window.localStorage.getItem(key))||[];
//     }
// }
//list取出所有的值
// var list = store.fetch("storeData");

export default {
  name: 'Todolist',
  data () {
    return {
      list: [],
      page: 1,
      totalPage: 0,
      isUpdate: false,
      todo:'',
      edtorTodos:'',//记录正在编辑的数据,
      beforeTitle:"",//记录正在编辑的数据的title
      visibility:"all"//通过这个属性值的变化对数据进行筛选
    }
  },
  created () {
    this.getList()
  },
  mounted () {
    this.hashFn();
    window.addEventListener('hashchange',this.hashFn);
    // 动态跨域请求
    api.getAll('http://m.yuedu.163.com/rank/original/list/data.json?gender=male&sortType=day&type=sell')
      .then(res => {
        console.log(res)
      })
  },
  filters: {
    checked (val) {
      return val ? true : false
    }
  },
  watch:{
    page (val) {
      this.getList(val)
    } 
        //下面的这种方法是浅监控
      /*list:function(){//监控list这个属性，当这个属性对应的值发生变化就会执行函数
          store.save("storeData",this.list);
      }*/
      //下面的是深度监控
        // list:{
        //     handler:function(){
        //         store.save("storeData",this.list);
        //     },
        //     deep:true
        // }
 
    },
    methods:{
      getList () {
        api.getList({
          page: this.page,
          pageSize: 6
        }).then(res => {
          this.totalPage = res.totalPage
          this.list = res.data
        })
      },
      enterFn() {//添加任务
          //向list中添加一项任务
          //事件处理函数中的this指向的是当前这个根实例
          if(this.todo==""){return;}
          api.addTodo({title: this.todo}).then(res => {
            console.log(res)
            if (res.status === 200) {
              // this.getList()
              this.list.unshift({
                title: this.todo,
                isComplete: 0
              });
              this.todo = "";
              this.page = 1
              this.getList()
            }
          })
      },
      delFn(item){//删除任务
        if(window.confirm('确定要删除吗？')) {
          api.delTodo(item.id).then(res => {
            if (res.status === 200) {
              var index = this.list.indexOf(item);
              this.list.splice(index,1)
            }
          })
        }
      },
      edtorTodo(item){//编辑任务
          //编辑任务的时候记录编辑之前的值
          this.beforeTitle = item.title;
          this.edtorTodos = item;
      },
      edtoEnd(item){//编辑完成
        if (this.beforeTitle === item.title || this.isUpdate) {
          this.edtorTodos = ''
          return
        }
        this.isUpdate = true
        api.updateTodo({
          title: item.title,
          isComplete: item.isComplete,
          id: item.id
        }).then(res => {
          if (res.status === 200) {
            this.edtorTodos = '';
          }
          // 防止回车与blur事件同时触发
          this.timer = setTimeout(()=>{
            this.isUpdate = false
            clearTimeout(this.timer)
          },800)
        })
          // this.edtorTodos="";
          // this.cancelEdit = this.edtorTodos;
      },
      cancelEdit(item){//取消编辑
          item.title = this.beforeTitle;
          this.beforeTitle = '';
          this.edtorTodos='';
      },
      handlerChecke (item) {
        api.updateTodo({
          title: item.title,
          isComplete: item.isComplete,
          id: item.id
        }).then(res => {
          if (res.status === 200) {
            // this.edtorTodos="";
          }
        })
      },
      hashFn(){
          var hash = window.location.hash.slice(1);
          this.visibility = hash;
      }
    },
    directives:{
        "focus":{
            update(el,binding){
                if(binding.value){
                    el.focus();
                }
            }
        }
    },
    computed:{
        unComplete(){
        return  this.list.filter(item=>{
                return !item.isComplete
            }).length
        },
        filterData(){
            //过滤的时候有三种情况 all completed unCompleted
            var filter = {
                all:function(list){
                    return list;
                },
                completed:function(list){
                    return list.filter(item=>{
                        return item.isComplete;
                    })
                },
                unCompleted:function(list){
                    return list.filter(item=>{
                        return !item.isComplete;
                    })
                }
            }
            //如果找到了过滤函数，就返回过滤后的数据，如果没有找到就返回所有的数据
            return filter[this.visibility]?filter[this.visibility](this.list):this.list;
        }
 
    }
}
</script>

<style scoped>

@media screen and (max-width: 768px){
  .main {
    width: 90%;
  }
}
.big-title {
  color: #dee2e6;
}
.task-input {
  height: 35px;
  line-height: 35px;
  border-radius: 3px;
}
.page-top {
  background-color: lightcoral
}
.page-top h2{
  text-align: center;
  font-size: 18px;
  line-height: 40px;
  color: #dee2e6;
}
.task-tab {
  margin: 20px 0 0 0;
}
.action a {
  margin: 0 4px;
  color: #dee2e6;
  background: rgba(255,255,255,0.1);
}
.action a.active {
  background-color: lightcoral;
  border: none;
}
.task-til {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: lightcoral;
}
.task-count li {
  padding-left: 0;
}
.task-count li:first-child {
  width: 150px;
  flex: none;
}
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
.til {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.til a {
  color: lightcoral;
  text-decoration: underline;
}
.todo-list li.editing .edit {
  margin-left: 43px;
  width: 80%;
  box-sizing: border-box;
}
.item {
  padding: 16px;
  background: rgba(255,255,255,0.1);
  border-radius: 4px;
  color: #dee2e6;
  margin-top: 20px;
}
</style>