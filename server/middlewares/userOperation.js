const fs = require('fs');

// userModel数据库操作句柄
const {
    findData,
    addData,
    amendData,
    removeData
} = require('../../src/assets/mgOperation/mgOperation');

// ------------------ctx.query获取get请求参数--------------------------------------
// ------------------ctx.request.body获取post请求参数------------------------------
// let data = fs.readFileSync('./k_Mongo/shopList.json', 'utf-8');  读取文件信息

let getAllShopData = async(ctx) => { // 获取全部数据
    let type = ctx.request.body.type;
    ctx.response.type = 'json';
    let data = await findData(type) || {
        msg: '获取数据异常'
    };
    ctx.body = data;
}

let addWantData = async(ctx) => { // 添加数据
    ctx.response.type = 'json';
    let req = ctx.request.body,
        type = req.type;
    delete req.type;
    await addData(type, req);
    ctx.body = {
        msg: '添加成功'
    };
}

let getWantData = async(ctx) => { // 获取数据
    let req = ctx.request.body,
        type = req.type;
    delete req.type;
    ctx.response.type = 'json';
    let data = await findData(type, req) || {
        msg: '获取数据异常'
    };
    ctx.body = data;
}

let removeUserData = async(ctx) => { // 删除数据
    ctx.response.type = 'json';
    let req = ctx.request.body,
        type = req.userMsg.type;
    delete req.userMsg.type;
    let msg = await removeData(type, req) || {
        msg: '删除异常'
    };
    ctx.body = msg;
}

let updatedWantData = async(ctx) => { // 修改数据
    ctx.response.type = 'json';
    let req = ctx.request.body;
    let type = req.userMsg.type;
    delete req.userMsg.type;
    let msg = await amendData(type, req) || {
        msg: '修改异常'
    };
    ctx.body = msg;
}




module.exports.getAllShopData = getAllShopData;
module.exports.addWantData = addWantData;
module.exports.getWantData = getWantData;
module.exports.updatedWantData = updatedWantData;
module.exports.removeUserData = removeUserData;