const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/vueShopData');

let db = mongoose.connection;

db.on('open', (err) => {
    if (err) throw err;
    console.log('连接数据库成功');
})

//用户信息表
let userItem = new mongoose.Schema({
    userId: String,
    userName: String,
    password: String,
    checkPass: String,
    email: String,
    userSite: Array,
    userSetSite: Array,
    shopCart: Array,
    userCollect: Array,
    userDoneOrder: Array,
    userWillDoneOrder: Array,
    userOffOrder: Array,
    userAccount: Array
});

//商品信息表
let shopItem = new mongoose.Schema({
    shopId: String,
    shopName: String,
    shopPri: Number,
    shopTxt: String,
    shopDetImg: Array,
    shopGenre: Array
        /*id: String,shopImg: String,allValue: Number*/
});

let userModel = mongoose.model('user', userItem, 'userMessage');

let shopModel = mongoose.model('shop', shopItem, 'shopMessage');

/*
let shopData = [
    {
        shopId: 'ky_6',
        shopName: '入耳式耳机',
        shopTxt: '卓越发音 三按键线控',
        shopPri: 199,
        shopDetImg: [
            {
                detImg: '/static/images/shopCartImg/1495869850666648.jpg'
            }
        ],
        shopGenre: [
            {
                id: 'ky_6.1',
                img: '/static/images/shopCartImg/1494318045.jpg',
                value: 99
            },{
                id: 'ky_6.2',
                img: '/static/images/shopCartImg/1495443293.png',
                value: 99
            }
        ]
    }
]

shopModel.insertMany(shopData, (err) => {
    if(err){
        throw err;
    }
    console.log('ok');
});
*/

module.exports = {
    userModel,
    shopModel
}