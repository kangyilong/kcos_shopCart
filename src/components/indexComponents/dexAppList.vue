<template>
    <div>
        <div class="container">
            <div 
                class="shop-head"
            >
                <div class="head-left">
                    <h5>应用</h5>
                    <p>Apps</p>
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
                >
                    <li v-for="(item, index) in dexAppListData" :key="index">
                        <div class="box-img">
                            <img 
                                :src="item.appImg"
                            />
                        </div>
                        <div class="shop-detail">
                            <h5>{{item.appTxt}}</h5>
                            <p class="shop-del">{{item.appDel}}</p>
                            <p class="hide-btn">进一步了解<span>></span></p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'dexAppList',
        data(){
            return {
                dexAppListData: [
                    {
                        appImg: '/static/images/index/1495609372.jpg',
                        appTxt: 'One',
                        appDel: '一个就够了'
                    },
                    {
                        appImg: '/static/images/index/1495794368.png',
                        appTxt: 'LIVE',
                        appDel: '看你最喜爱的'
                    },
                    {
                        appImg: '/static/images/index/1495609812.jpg',
                        appTxt: 'Ideas',
                        appDel: '人脑每天产生6000个念头，如何储存？'
                    },
                    {
                        appImg: '/static/images/index/1495701022.png',
                        appTxt: 'OS',
                        appDel: '更新到最安全'
                    }
                ]
            }
        },
        mounted(){

        },
        methods: {
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
    .shopCon-list>li{
        width: 25%;
        box-sizing: border-box;
        text-align: center;
        cursor: pointer;
        transition: all .3s;
        padding-bottom: 8px;
    }
    .shopCon-list>li:hover .shop-del,
    .shopCon-list>li:hover .shop-detail>h5{
        display: none;
    }
    .box-img{
        width: 100%;
        overflow: hidden;
        font-size: 0;
        margin-bottom: 5px;
    }
    .box-img>img{
        width: 100%;
        transition: all .5s;
    }
    .shopCon-list>li:hover img{
        transform: scale(1.05);
    }
    .sp-list>.sel-sp{
        border: 2px solid #b2b2b2;
    }
    .shop-detail>h5{
        font-weight: 400;
        color: #595959;
        font-size: 15px;
    }
    .shop-detail>.shop-del{
        font-size: 12px;
        color: #b2b2b2;
        height: 14px;
    }
    .hide-btn{
        display: none;
        opacity: 0;
        color: #646464;
        font-size: 15px;
        margin-top: 14px;
    }
    .shopCon-list>li:hover .hide-btn{
        transition: all .3s;
        display: block;
        opacity: 1;
    }
    .shopCon-list>li:hover .hide-btn{
        color: #23527c;
    }
    .shopCon-list>li:hover .hide-btn>span{
        margin-left: 6px;
    }
</style>