<template>
    <div>
        <div class="container">
            <div class="order-route">
                <ul class="order-list">
                    <li><router-link to="/personage/order/dzf">待支付</router-link></li>
                    <li><router-link to="/personage/order/dsh">待收货</router-link></li>
                    <li><router-link to="/personage/order/yqx">已取消</router-link></li>
                </ul>
            </div>
            <div class="order-con">
                <keep-alive>
                    <router-view />
                </keep-alive>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container{
    width: 100%;
    margin: 0 auto;
    padding: 30px 15px;
    background-color: #fff;
    box-sizing: border-box;
}
.order-route{
    padding-bottom: 20px;
}
.order-list{
    display: flex;
    text-align: center;
    border-bottom: 1px solid #ddd;
}
.order-list>li{
    width: 16%;
    line-height: 50px;
}
.order-list>li>a{
    display: block;
    border-bottom: 2px solid #fff;
    transition: all .3s;
    color: #76838f;
}
.order-list>li>a:hover{
    color: #62a8ea;
    border-color:#62a8ea;
}
.order-con{
    width: 100%;
}
.order-list>li>.router-link-active{
    color: #62a8ea;
    border-color:#62a8ea;
}
</style>

