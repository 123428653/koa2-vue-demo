const model = require('../lib/sql')

// 获取数据列表
exports.getList = async ctx => {
  let param = ctx.query || ctx.params
  let page = parseInt(param.page || 1)  // 当前页数
  let end = parseInt(param.pageSize || 2) // 每页显示的条数
  let start = (page - 1) * end
  var  totalPage = 0
  await model.getAllListSql().then(res => {
    totalPage = Math.ceil(res.length / end)
  })
  await model.getListSql([start, end]).then(result => {
    ctx.body = {
      status: 200,
      message: 'success',
      tip: '这个请求是跨域请求',
      totalPage,
      data: result
    }
  })
}

// 添加单条数据
exports.addSql = async ctx => {
  // console.log(ctx)
  let {title, isComplete} = ctx.request.body
  await model.insertItemSql([title, (isComplete | 0)]).then( () => {
    // console.log(res, '777');
    ctx.body = {
      status: 200,
      message: 'success'
    }
  })
}

// 删除单条数据
exports.delSql = async ctx => {
  // console.log(ctx.request.body)
  let id = ctx.request.body.id
  await model.delItemSql(id).then(() => {
    // console.log(res, '777');
    ctx.body = {
      status: 200,
      message: 'success'
    }
  })
}

// 更改单条数据
exports.updateSql = async ctx => {
  // console.log(ctx.request.body)
  let {title, isComplete, id} = ctx.request.body
  await model.updateItemSql([title, (isComplete | 0), id]).then(() => {
    // console.log(res, '777');
    ctx.body = {
      status: 200,
      message: 'success'
    }
  })
}