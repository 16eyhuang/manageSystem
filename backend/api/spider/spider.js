const mysqlJs = require('../../common/mysql.js');
const tool = require('../../common/tool.js');


class spider {
    async hitokoto(ctx) {
        let res = await tool.awaitRequest('https://v1.hitokoto.cn/?encode=json');
        res = JSON.parse(res);
        console.log(res)
        let is_exists = await mysqlJs.queryFromMysql(`SELECT * FROM hitokoto WHERE id = ${res.id}`);
        let now = new Date().getTime();
        if (is_exists.length < 1) {
            await mysqlJs.queryFromMysql(`INSERT INTO hitokoto (id, hitokoto, source, insert_time) VALUES ("${res.id}", "${res.hitokoto}", "${res.from}", "${now}")`)
        }
        return ctx.body = res;
    }
}
module.exports = new spider();
