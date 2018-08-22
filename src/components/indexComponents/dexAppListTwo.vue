<template>
    <div>
        <div class="container">
            <div 
                class="shop-head"
            >
                <div class="head-left">
                    <h5>科学动态</h5>
                    <p>Science</p>
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
                            <p class="hide-btn">阅读更多<span>></span></p>
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
                        appImg: '/static/images/index/thumb.jpg',
                        appTxt: '1MORE“大师对话·中国声”主题发布会',
                        appDel: '价格更低：网站建设公司自行开发系统，一般的开发成本都会在千元以上，就算网站建设公.....'
                    },{
                        appImg: '/static/images/index/thumb1.jpg',
                        appTxt: '无人机的下一个时代 将由“群”定义',
                        appDel: '当你想到无人机的时候你会觉得它是什么样子的?一个单独的遥控玩具，有螺旋桨，还是一.....'
                    },{
                        appImg: '/static/images/index/thumb2.jpg',
                        appTxt: '官方最新MX59-365头戴式耳机发布',
                        appDel: '5月26日消息，今天，传闻已久的华为荣耀9现身工信部，关于荣耀9什么时候发布以及.....'
                    },{
                        appImg: '/static/images/index/thumb3.jpg',
                        appTxt: '如何让你心爱的耳机焕发青春',
                        appDel: '越来越多的人选择耳机来作为音响发烧的一个手段和娱乐项目。而且这东西用途很广，可以.....'
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
        padding: 10px 30px 0;
        box-sizing: border-box;
        cursor: pointer;
        transition: all .3s;
        padding-bottom: 8px;
    }
    .box-img{
        overflow: hidden;
        font-size: 0;
        margin-bottom: 15px;
        transition: all .5s;
    }
    .box-img>img{
        width: 100%;
        transition: all .4s;
    }
    .shopCon-list>li:hover .box-img{
        box-shadow: 0 5px 30px 2px rgba(0,0,0,.3); 
    }
    .sp-list>.sel-sp{
        border: 2px solid #b2b2b2;
    }
    .shop-detail>h5{
        font-weight: 300;
        color: #424242;
        font-size: 16px;
        letter-spacing: 1.5px;
    }
    .shop-detail>.shop-del{
        font-size: 12px;
        color: #b2b2b2;
        margin: 8px 0;
    }
    .hide-btn{
        color: #646464;
        font-size: 12px;
        margin-bottom: 10px;
        transition: all .4s;
    }
    .hide-btn>span{
        transition: all .4s;
        color: #646464;
    }
    .shopCon-list>li:hover .hide-btn{
        color: #89bceb;
    }
    .shopCon-list>li:hover .hide-btn>span{
        margin-left: 5px;
        color: #89bceb;
    }
</style>