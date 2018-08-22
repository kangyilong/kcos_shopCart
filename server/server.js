const koa = require('koa');
const route = require('koa-route');
const koaBody = require('koa-body')();

// 获取user中间件
const {
    getAllShopData, // 获取全部商品数据
    addWantData, // 添加数据
    getWantData, // 获取数据
    updatedWantData, // 修改数据
    removeUserData // 删除数据
} = require('./middlewares/userOperation');

const app = new koa();

app.use(koaBody);

app.use(route.post('/', getAllShopData));

app.use(route.post('/getShopData', getWantData));
app.use(route.post('/isCollect', getWantData));

app.use(route.post('/verifyMsg', getWantData));

app.use(route.post('/addShopCart', updatedWantData));
app.use(route.post('/addShopCollect', updatedWantData));
app.use(route.post('/removeShopCollection', removeUserData));

app.use(route.post('/register', addWantData));
app.use(route.post('/login', getWantData));

app.use(route.post('/getCommendShop', getAllShopData));
app.use(route.post('/addSuccessShop', getWantData));

app.use(route.post('/getCartData', getWantData));
app.use(route.post('/removeCartShop', removeUserData));

app.use(route.post('/getUserSite', getWantData));
app.use(route.post('/addWillOrder', addWantData));

// 个人中心
app.use(route.post('/getUserData', getWantData));
app.use(route.post('/getCollectData', getWantData));
app.use(route.post('/removeCollect', removeUserData));
app.use(route.post('/getUserSite', getWantData));
app.use(route.post('/saveSiteData', addWantData));
app.use(route.post('/deleteSite', removeUserData));
app.use(route.post('/exitSiteData', updatedWantData));
app.use(route.post('/selUserSite', addWantData));
app.use(route.post('/selOrderData', getWantData));
app.use(route.post('/removeOrder', removeUserData));
app.use(route.post('/setUserAccount', addWantData));
app.use(route.post('/getUserAccount', getWantData));

app.listen(3000, (err) => {
    if (err) throw err;
    console.log('localhost:3000');
})