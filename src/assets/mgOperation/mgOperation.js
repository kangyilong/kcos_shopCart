// userModel数据库操作句柄
const userModel = require('../../../server/mongod/kylong').userModel;
const shopModel = require('../../../server/mongod/kylong').shopModel;

const findData = async(type, condition = {}) => { // 获取数据
    let data = null;
    if (type === 'user') {
        if (condition.mod) {
            switch (condition.mod) {
                case 'getCollect':
                    let collShopId = condition.shopId;
                    let collUserMSg = condition.inquire.userMsg;
                    delete condition.mod;
                    delete condition.shopId;
                    delete condition.inquire.userMsg;
                    let collInquire = condition.inquire;
                    //db.test.find({"userInfo.userTag":"teach","tag":"test"},{"userInfo":{$elemMatch{"userTag":"teach"}}})
                    await userModel.find({
                        ...collInquire,
                        ...collUserMSg
                    }, {
                        'userCollect': {
                            $elemMatch: {
                                'shopId': collShopId
                            }
                        }
                    }, (err, result) => {
                        if (err) { throw err; }
                        result = result.length === 0 ? {
                            tit: '未收藏'
                        } : result;
                        data = {
                            msg: '用户信息',
                            ...result
                        };
                    })
                    break;
                case 'getOrder':
                    let userMsg = condition.userMsg;
                    let orderType = condition.orderType;
                    let orderCode = condition.orderCode;
                    await userModel.find({
                        userMsg
                    }, {
                        [orderType]: {
                            $elemMatch: {
                                orderCode
                            }
                        }
                    }, (err, result) => {
                        if (err) { throw err; }
                        data = {
                            msg: '用户信息',
                            ...result
                        };
                    });
                    break;
            }
        } else {
            await userModel.find(condition, (err, result) => {
                if (err) throw err;
                if (result) {
                    result = result.length === 0 ? {
                        tit: '查无此人'
                    } : result;
                    data = {
                        msg: '用户信息',
                        ...result
                    };
                }
            });
        }
    }
    if (type === 'shop') {
        if (condition.mod === 'successShop') {
            delete condition.mod;
            let selShopId = condition.selShopId;
            delete condition.selShopId;
            await shopModel.find(condition, {
                'shopGenre': {
                    $elemMatch: {
                        'id': selShopId
                    }
                }
            }, (err, result) => {
                if (err) throw err;
                data = {
                    msg: '商品信息',
                    ...result
                };
            })
        } else {
            await shopModel.find(condition, (err, result) => {
                if (err) throw err;
                data = {
                    msg: '商品信息',
                    ...result
                };
            });
        }
    }
    return data;
}


const addData = async(type, userMessage = {}) => { // 添加数据
    let msg = null;
    if (type === 'user') {
        if (userMessage.mod) {
            switch (userMessage.mod) {
                case 'site':
                    await userModel.update(userMessage.userMsg, {
                        $addToSet: {
                            'userSite': {
                                $each: [userMessage.ruleForm]
                            }
                        }
                    })
                    break;
                case 'selSite':
                    await userModel.update(userMessage.userMsg, {
                        $pop: {
                            'userSetSite': -1
                        }
                    });
                    await userModel.update(userMessage.userMsg, {
                        $addToSet: {
                            'userSetSite': {
                                $each: [userMessage.ruleForm]
                            }
                        }
                    })
                    break;
                case 'addOrder':
                    let orderType = userMessage.orderType;
                    await userModel.update(userMessage.userMsg, {
                        $addToSet: {
                            [orderType]: {
                                $each: [userMessage.ruleForm]
                            }
                        }
                    });
                    break;
                case 'setAccount':
                    await userModel.update(userMessage.userMsg, {
                        $addToSet: {
                            'userAccount': {
                                $each: [userMessage.ruleForm]
                            }
                        }
                    });
                    break;
            }
        } else {
            await userModel.insertMany(userMessage, (err) => {
                if (err) throw err;
                msg = {
                    msg: '添加用户成功'
                };
            });
        }
    }
    return msg;
}


const removeData = async(type, condition = {}) => { // 删除数据
    let msg = null;
    let mod = condition.userMsg.mod;
    delete condition.userMsg.mod;
    let userMsg = condition.userMsg;
    let inquire = condition.condition;
    if (type === 'user') {
        switch (mod) {
            case 'remove':
                await userModel.update(userMsg, {
                    $pull: inquire
                }, (err) => {
                    if (err) throw err;
                    msg = {
                        msg: '删除成功'
                    };
                });
                break;
        }

    }
    return msg;
}


const amendData = async(type, condition = {}) => { // 修改数据
    let msg = null;
    let mod = condition.userMsg.mod;
    delete condition.userMsg.mod;
    let userMsg = condition.userMsg;
    let shopData = condition.shopData;
    if (type === 'user') {
        switch (mod) { // 添加到购物车
            case 'addCart':
                await userModel.update(userMsg, { // 删除选中记录
                    $pull: {
                        'shopCart': {
                            'shopId': shopData.shopId
                        }
                    }
                }, (err) => {
                    if (err) { throw err }
                });
                await userModel.update(userMsg, { // 新增商品记录
                    $addToSet: {
                        'shopCart': {
                            $each: [shopData]
                        }
                    }
                }, (err) => {
                    if (err) throw err;
                    msg = {
                        msg: '加入购物车成功'
                    }
                });
                break;
            case 'addCollect':
                await userModel.update(userMsg, {
                    $addToSet: {
                        'userCollect': {
                            $each: [shopData]
                        }
                    }
                }, (err) => {
                    if (err) throw err;
                    msg = {
                        msg: '加入收藏成功'
                    }
                });
                break;
            case 'exitSite':
                let ruleForm = condition.ruleForm;
                await userModel.update(userMsg, { // 删除选中记录
                    $pull: {
                        'userSite': {
                            'id': ruleForm.id
                        }
                    }
                }, (err) => {
                    if (err) { throw err }
                });
                await userModel.update(userMsg, {
                    $addToSet: {
                        'userSite': {
                            $each: [ruleForm]
                        }
                    }
                }, (err) => {
                    if (err) throw err;
                    msg = {
                        msg: '修改成功'
                    }
                });
        }
    }
    return msg;
}


module.exports.findData = findData;
module.exports.addData = addData;
module.exports.removeData = removeData;
module.exports.amendData = amendData;