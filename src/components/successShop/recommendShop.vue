<template>
    <div>
        <div class="container">
            <img src="/static/images/shopCartImg/0103055996ab7ca801215603fe0956.gif" alt="" v-show="isLoad">
            <ul class="recommend-list" v-show="!isLoad">
                <li 
                    v-for="(commendShop, index) in recommendData" 
                    :key="index"
                    @click="toShopDet(commendShop.shopId)"
                >
                    <div class="img-box">
                        <img 
                            :src="commendShop.shopGenre[0].img" 
                            :alt="commendShop.shopName"
                            :title="commendShop.shopName"
                        />
                    </div>
                    <div class="shop-det">
                        <p class="shop-tit">
                            <a href="">{{commendShop.shopName}}</a>
                        </p>
                        <p class="shop-spr">{{commendShop.shopPri | shopPri}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import fetch from '../../assets/api/fetch.js'
    export default{
        data(){
            return {
                recommendData: [],
                requestNum: '',
                isLoad: true
            }
        },
        beforeMount(){
            this.getCommendShop();
        },
        methods: {
            getCommendShop(){
                this.requestNum ++;
                fetch('/shop/getCommendShop', 'post', {type: 'shop'})
                    .then((data) => {
                        if(data.msg === '获取数据异常'){
                            if(this.requestNum < 5){
                                this.getCommendShop();
                            }
                        }else{
                            this.isLoad = false;
                            this.requestNum = 0;
                            this.recommendData = Object.values(data);
                            this.recommendData.length = 8;
                        }
                })
            },
            toShopDet(shopId){
                this.$store.commit('changeShopState', shopId);
                this.$router.push('/detShop');
            }
        },
        filters: {
            shopPri(data){
                return data + '.00元'
            }
        }
    }
</script>

<style scoped>
.container{
    margin-top: 30px;
    text-align: center;
}
.container>img{
    margin-top: 50px;
    width: 200px;
}
.recommend-list{
    display: flex;
    flex-wrap: wrap;
}
.recommend-list>li{
    text-align: center;
    padding: 20px;
    box-sizing: border-box;
    width: 23%;
    margin: 1%;
    background: #fff;
    margin-top: 2%;
    cursor: pointer;
}
.img-box{
    width: 100%;
    padding-bottom: 10px;
}
.img-box>img{
    width: 100%;
}
.shop-tit{
    margin: 5px 0;
}
.shop-tit>a{
    color: #62a8ea;
    font-size: 17px;
}
.shop-spr{
    color: #f96868;
    margin-bottom: 6px;
}
</style>

