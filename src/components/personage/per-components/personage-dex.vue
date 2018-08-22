<template>
    <div>
        <div class="container">
            <div class="con-header">
                <span class="img-sp">
                    <img src="/static/images/index/user.jpg" alt="">
                </span>
                <p class="per-name">{{userData.userName}}</p>
                <p class="grade">普通VIP5</p>
            </div>
            <div class="con-det">
                <div class="per-msg">
                    <div class="per-shop" @click="$router.push('/personage/order/dzf')">
                        <p class="shop-num num">{{shopnum}}</p>
                        <p class="shop-tit tit">待支付</p>
                    </div>
                    <div class="per-order" @click="$router.push('/personage/order/dsh')">
                        <p class="order-num num">{{ordernum}}</p>
                        <p class="order-tit tit">待收货</p>
                    </div>
                    <div class="per-balance">
                        <p class="balance-num num" @click="$router.push('/personage/consume')">{{zhBalance}}.00元</p>
                        <p class="balance-tit tit">账户余额</p>
                    </div>
                </div>
                <div class="per-box">
                    <ul class="per-list">
                        <li 
                            v-for="(perItem, index) in perList" 
                            :key="index"
                            @click="toShopModel(perItem.path)"
                        >
                            <p><i :class="perItem.icon"></i></p>
                            <p>{{perItem.msg}}</p>
                            <p><i class="el-icon-arrow-right"></i></p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import fetch from '../../../assets/api/fetch.js'
export default {
    data(){
        return {
            perList: [
                {
                    icon: 'iconfont icon-dingdan',
                    path: '/personage/order',
                    msg: '查看所有订单'
                },{
                    icon: 'iconfont icon-shoucang',
                    path: '/personage/collect',
                    msg: '我的收藏'
                },{
                    icon: 'iconfont icon-icon104',
                    path: '/personage/site',
                    msg: '收货地址'
                },{
                    icon: 'iconfont icon-xiaofei',
                    path: '/personage/consume',
                    msg: '消费明细'
                },{
                    icon: 'el-icon-edit-outline',
                    path: '/personage/seting',
                    msg: '修改个人信息'
                }
            ],
            userData: {},
            requestNum: 0,
            shopnum: 0,
            ordernum: 0,
            zhBalance: 0
        }
    },
    beforeMount(){
        let userMsg = JSON.parse(localStorage.getItem('userMsg'));
        this.getUserMessage(userMsg);
    },
    methods: {
        getUserMessage(userMsg){
            this.requestNum ++;
            fetch('/shop/getUserData', 'post', {
                type: 'user',
                ...userMsg
            }).then((data) => {
                if(data.msg === '获取数据异常'){
                    if(this.requestNum < 5){
                        this.getUserMessage();
                    }
                }else{
                    this.requestNum = 0;
                    this.userData = Object.values(data)[0];
                    this.shopnum = this.userData.userWillDoneOrder.length;
                    this.ordernum = this.userData.userDoneOrder.length;
                    this.userData.userAccount.forEach(element => {
                        this.zhBalance += parseInt(element.czMoney);
                    });
                }
            })
        },
        toShopModel(path){
            this.$router.push(path);
        }
    }
}
</script>


<style scoped>
.container{
    width: 100%;
    margin: 0 auto;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}
.con-header{
    padding: 30px 0;
    background-color: #62a8ea;
    text-align: center;
    color: #eee;
    user-select: none;
}
.img-sp{
    display: inline-block;
    border-radius: 200%;
    overflow: hidden;
    font-size: 0;
}
.per-name{
    margin: 10px 0;
    font-size: 25px;
    letter-spacing: 1px;
}
.grade{
    margin-bottom: 10px;
    font-size: 16px;
    letter-spacing: 1px;
}
.con-det{
    padding: 20px 10px;
    background-color: #fff;
}
.per-msg{
    display: flex;
    text-align: center;
}
.per-msg>div{
    width: 33%;
    cursor: pointer;
}
.num{
    color: #62a8ea;
    font-size: 22px;
    margin-bottom: 2px;
}
.tit{
    font-size: 16px;
}
.per-box{
    margin-top: 20px;
}
.per-list>li{
    display: flex;
    padding: 14px;
    border-top: 1px solid #e4eaec;
    cursor: pointer;
}
.per-list>li:hover{
    background-color: #f1f1f1;
}
.per-list>li i{
    font-size: 19px;
    color: #555;
}
.per-list>li>p{
    font-size: 14px;
}
.per-list>li>p:nth-of-type(2){
    width: 95%;
    margin-left: 10px;
}
</style>
