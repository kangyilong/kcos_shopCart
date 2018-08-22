<template>
    <div class="per-left">
        <div class="container">
            <h4>订单中心</h4>
            <ul class="per-list">
                <li><router-link to="/personage/dex">个人中心</router-link></li>
                <li><router-link to="/personage/order">我的订单</router-link></li>
                <li><router-link to="/personage/collect">我的收藏</router-link></li>
                <li><router-link to="/personage/site">收货地址</router-link></li>
                <li><router-link to="/personage/consume">消费明细</router-link></li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.per-left{
    width: 100%;
    padding: 30px 0px 60px 50px;
    background-color: #fff;
}
.container{
    width: 100%;
    margin: 0 auto;
}
.container>h4{
    font-size: 18px;
    font-weight: 500;
    color: #333;
}
.per-list>li{
    margin-top: 20px;
}
.per-list>li>a{
    color: #666;
    padding-right: 20px;
}
.per-list>li>.router-link-active{
    color: #62a8ea;
    border-color:#62a8ea;
}
</style>

