// controller层处理路由
var indexMod = require('../module/index')

var indexCol = {
    init: function(app) {
        app.get('/test', (req, res, next) => {
            res.send('Hello Word')
        })
        app.get('/hu', (req, res, next) => {
            indexMod.getData(function(val) {
                res.send(val)
            })
        })
    }
}
module.exports = indexCol