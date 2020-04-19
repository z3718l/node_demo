var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var request = require('request')

var indexCol = require('./controller/index')


// 添加容错机制
// app.use(bodyParser.json())
// app.use(express.bodyParser())
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerqwer',
    database: 'test'
})
connection.connect(function(err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('数据库连接成功')
})

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8")
    next()
})

indexCol.init(app)

app.get('/', (req, res, next) => {
    connection.query(`SELECT * FROM test.t_sudent`, function(error, results, fields) {
        if (error) {
            console.log('错误：', error)
            throw new Error('BROKEN')
        }
        // console.log(results, '===results') // 获取sql查询结果
        // console.log(fields, '===fields')
        res.send({
            msg: '获取sql成功',
            data: results
        })
    })
})

// 查询数据
app.get('/getData', (req, res, next) => {
    connection.query(`SELECT * FROM test.t_sudent`, function(error, results, fields) {
        if (error) {
            console.log('错误：', error)
            throw new Error('获取数据错误！')
        }
        // console.log(results, '===results') // 获取sql查询结果
        // console.log(fields, '===fields')
        res.send({
            msg: '获取sql成功',
            data: results
        })
    })
})
// 插入数据
app.post('/insterData',urlencodedParser, (req, res, next) => {
    let jsons = JSON.stringify(req.body)
    let josn = JSON.parse(jsons)
    // console.log(josn, '===json')
    // let post = josn
    // let sql = "INSERT INTO test.t_sudent VALUES (6, 'lisi', '1992-12-13', '男')"
    // 写sql，插入数据
    // connection.query("INSERT INTO t_sudent VALUES (19, 'lisi', '1992-12-13', '男')" , function(error, results, ) {
    //     if (error) {
    //         console.log('错误：', error)
    //         return
    //     }
    //     res.send({
    //         msg: '插入数据库成功',
    //         data: results
    //     })
    // })
    let ids = 26
    var post  = {
        id: ++ids, 
        name: josn.name,
        birthday: josn.birthday,
        gender: josn.gender
    }
    var query = connection.query('INSERT INTO t_sudent SET ?', post, function (error, results, fields) {
        if (error) throw new Error('插入数据错误');
        return res.json({
            msg: '插入成功'
        })
    });
    // var response = {
    //     'msg': '成功'
    // }
    // res.end(JSON.stringify(response))
})
// 更新
app.put('/updateData', urlencodedParser, (req, res, next) => {
    let jsons = JSON.stringify(req.body)
    let josn = JSON.parse(jsons)
    console.log(josn, '==json')
    var updateQuery = connection.query(`UPDATE t_sudent SET name = '${josn.name}', birthday='${josn.birthday}', gender='${josn.gender}' WHERE id = ${josn.id}`,function(error) {
        if (error) throw new Error('更新数据错误');
        return res.json({
            msg: '更新成功'
        })
    })
})
// 删除
app.post('/delete', urlencodedParser, (req, res, next) => {
    let jsons = JSON.stringify(req.body)
    let josn = JSON.parse(jsons)
    console.log(josn, '==json')
    var deleteQuery = connection.query(`DELETE FROM t_sudent WHERE id = ${josn.id}`, function(error) {
        if (error) throw new Error('删除数据错误');
        return res.json({
            msg: '删除成功'
        })
    })
})


// node实现简单的爬虫
// request('https://www.huipiaoxian.com/', function (error, response, body) {
//   console.error('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });

app.listen(3001, () => {
    console.log('node is ok')
})
