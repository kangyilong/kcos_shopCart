<template>
    <div>
        <div class="container">
            <div class="shop-head" v-show="dexShopListOne === 'one'">
                <div class="head-left">
                    <h5>熱門商品</h5>
                    <p>Hot</p>
                </div>
                <div class="head-right">
                    <p class="btn-list">
                        <span 
                            class="btn01" 
                            @click="toMoveLeft"
                        >&lt;</span>
                        <span 
                            class="btn02" 
                            @click="toMoveRight"
                        >&gt;</span>
                    </p>
                </div>
            </div>
            <div 
                class="shop-head" 
                v-show="dexShopListTwo === 'two'"
            >
                <div class="head-left" v-show="dexShopListTwo === 'two'">
                    <h5>官方精选</h5>
                    <p>Offical</p>
                </div>
                <div class="head-right">
                    <p class="btn-list">
                        <span class="btn03">查看更多 ></span>
                    </p>
                </div>
            </div>
            <div class="shop-con">
                <ul 
                    class="shopCon-list" 
                    :class="{
                        'shopCon01-list': dexShopListOne === 'one',
                        'shopCon02-list': dexShopListTwo === 'two'
                    }"
                    ref="shopUl"
                >
                    <li v-show="dexShopListTwo === 'two'" class="showLi-tow">
                        <img src="/static/images/index/1495857931.png" alt=""/>
                    </li>
                    <li 
                        v-for="(item, index) in dexShopListData"
                        @click="toShopDet(item.shopId)"
                        :key="index"
                    >
                        <sel-img 
                            :imgList="item.shopGenre"
                            :name="item.shopName"
                        />
                        <div class="shop-detail">
                            <h5>{{item.shopName}}</h5>
                            <p class="shop-del">{{item.shopTxt}}</p>
                            <p class="shop-price">{{item.shopPri}}.00元</p>
                            <p class="hide-btn"><span>查看详情</span></p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import fetch from '../../assets/api/fetch';
    import {mapState} from 'vuex';
    import selImg from './dexShopList-sel/sel-img';
    export default {
        name: 'dexShopList',
        data(){
            return {
            }
        },
        props: {
            dexShopListOne: String,
            dexShopListTwo: String,
            dexShopListData: {
                type: Array,
                required: true
            }
        },
        created(){
            
        },
        mounted(){
            
        },
        methods: {
            toMoveLeft(){
                this.$refs.shopUl.style.marginLeft = '0%';
            },
            toMoveRight(){
                this.$refs.shopUl.style.marginLeft = '-50%';
            },
            selShopImg(spandex, index){
                this.shopIdx = spandex;
                this.selLi = index;
            },
            toShopDet(shopId){
                this.$store.commit('changeShopState', shopId);
                this.$router.push('/detshop');
                // console.log(this.$store.state.shopState.shopId);
            }
        },
        computed: {
            /*...mapState([
                    'shopState'
                ])*/
        },
        components: {
            selImg
        }
    }
</script>

<style scoped>
    .container{
        width: 100%;
        margin: 60px auto;
        border-radius: 6px;
        background: #fff;
        overflow: hidden;
    }
    .shop-head{
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
    }
    .head-left{
        width: 88%;
        padding: 10px 20px;
    }
    .head-left>h5{
        font-size: 18px;
        font-weight: 500;
        color: #555;
        margin-bottom: 5px;
    }
    .head-left>p{
        font-size: 12px;
        color: #d2d2d2;
    }
    .head-right{
        width: 12%;
        padding: 10px 20px;
        line-height: 40px;
    }
    .btn01{
        margin-right: 15px;
    }
    .btn01, .btn02, .btn03{
        border-radius: 5px;
        padding: 8px 15px;
        font-size: 18px;
        border: 1px solid #e1e1e1;
        border-radius: 5px;
        color: #888;
        cursor: pointer;
        transition: all .3s;
        user-select: none;
    }
    .btn03{
        font-size: 15px;
    }
    .btn01:hover, .btn02:hover, .btn03:hover{
        background-color: #f1f1f1;
        color: #555;
    }
    .shop-con{
        width: 100%;
        overflow: hidden;
    }
    .shopCon-list{
        display: flex;
        flex-direction: row;
        transition: all .5s;
    }
    .shopCon01-list{
        width: 150%;
    }
    .shopCon02-list{
        width: 100%;
        flex-wrap: wrap;
    }
    .showLi-tow>img{
        width: 100%;
        max-height: 312px;
    }
    .shopCon-list>li{
        width: 25%;
        box-sizing: border-box;
        border: 1px solid #fff;
        border-top-color: #ddd;
        border-right-color: #ddd;
        border-bottom-color: #ddd;
        text-align: center;
        cursor: pointer;
        transition: all .3s;
        padding-bottom: 18px;
        overflow: hidden;
    }
    .shopCon-list>li:nth-of-type(1){
        border-left-color: #ddd;
    }
    .shopCon-list>li:hover{
        box-shadow: inset 0 0 38px rgba(0,0,0,.15);
    }
    .shopCon-list>li:hover .hide-btn{
        display: block;
        opacity: 1;
    }
    .shopCon-list>li:hover .shop-price{
        display: none;
    }
    .shopCon-list>li:hover .box-img>img{
        transform: scale(1.05);
    }
    .shop-detail>h5{
        font-weight: 400;
        color: #595959;
        font-size: 15px;
    }
    .shop-detail>.shop-del{
        width: 100%; 
        font-size: 12px;
        color: #b2b2b2;
        margin: 3px 0 5px;
        height: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .shop-price{
        display: block;
        color: #c30a18;
        font-size: 16px;
    }
    .hide-btn{
        display: none;
        opacity: 0;
        color: #646464;
        font-size: 13px;
        transition: all .3s;
    }
    .hide-btn>span{
        padding: 3px 10px;
        border-radius: 4px;
        border: 1px solid #e1e1e1;
    }
    .shopCon02-list .showLi-tow{
        font-size: 0;
        width: 50%;
        padding-bottom: 0;
        cursor: default;
    }
</style>