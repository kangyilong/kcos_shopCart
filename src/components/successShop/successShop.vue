<template>
    <div>
        <div class="container">
            <div class="con-left">
                <div class="img-box" @click="toShopDet(shopId)">
                    <img src="/static/images/shopCartImg/default.png" alt="" v-show="isImage" class="is-img">
                    <img :src="successData.img" alt="" v-show="!isImage">
                </div>
                <div class="shop-det">
                    <div class="tit">
                        <a href="" @click="toShopDet(shopId)">{{shopData.shopName}}</a>
                        <span>数量：<b>{{shopNum}}</b> 件</span>
                    </div>
                    <div class="success-txt">
                        <p>已成功加入购物车</p>
                    </div>
                </div>
            </div>
            <div class="con-right">
                <div class="btn-box">
                    <el-button type="info" plain>继续购物</el-button>
                    <el-button type="danger" @click="toShopCart">去购物车结算</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import fetch from '../../assets/api/fetch.js';
export default {
    data(){
        return {
            shopId: '',
            selShopId: '',
            shopNum: '',
            shopData: {},
            successData: {
                img: ''
            },
            requestNum: '',
            isImage: true
        }
    },
    beforeMount(){
        this.shopId = window.localStorage.getItem('shopId');
        this.shopNum = window.localStorage.getItem('shopNum');
        this.selShopId = window.localStorage.getItem('selShopId');
        this.getSuccessShop(this.shopId, this.selShopId);
    },
    methods: {
        getSuccessShop(shopId, selShopId){
            this.requestNum ++;
            fetch('/shop/addSuccessShop', 'post', {
                type: 'shop',
                mod: 'successShop',
                shopId,
                selShopId

            }).then((data) => {
                    if(data.msg === '获取数据异常'){
                        if(this.requestNum < 5){
                            this.getSuccessShop(shopId, selShopId);
                        }
                    }else{
                        this.requestNum = 0;
                        this.shopData = Object.values(data)[0];console.log(this.shopData);
                        this.successData = Object.values(data)[0].shopGenre;
                        this.$set(this.successData, 'img', this.successData[0].img);
                        if(this.successData){
                            this.isImage = false;
                        }
                    }
                })
        },
        toShopCart(){
            this.$router.push('/cartShop');
        },
        toShopDet(shopId){
            event.preventDefault();
            this.$store.commit('changeShopState', shopId);
            this.$router.push('/detshop');
        }
    }
}
</script>


<style scoped>
.container{
    padding: 30px;
    margin-bottom: 30px;
    display: flex;
    overflow: hidden;
}
.con-left{
    width: 70%;
    display: flex;
}
.img-box{
    cursor: pointer;
    height: 100%;
}
.img-box>img{
    width: 100px;
}
.is-img{
    margin-right: 20px;
}
.tit{
    margin-bottom: 8px;
    margin-top: 15px;
}
.tit>a{
    font-size: 19px;
    color: #111;
    margin-right: 8px;
}
.tit>span{
    font-size: 17px;
    color: #111;
}
.success-txt>p{
    font-size: 18px;
    color: #67C23A;
}
.con-right{
    width: 30%;
    margin-top: 50px;
}
</style>

