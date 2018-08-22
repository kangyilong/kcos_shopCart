<template>
    <div id="dexModelList">
        <div class="container">
            <ul class="model-list">
                <li>
                    <div class="box-img">
                        <img src="/static/images/index/1495693824.png" alt="配件周边">
                    </div>
                    <h5>配件周边</h5>
                    <p><i></i>开售提醒 参与抽奖<i></i></p>
                </li>
                <li>
                    <div class="box-img">
                        <img src="/static/images/index/1495697648.png" alt="热门产品">
                    </div>
                    <h5>热门产品</h5>
                    <p><i></i>周一上午10:00 限时开抢<i></i></p>
                </li>
                <li>
                    <div class="box-img">
                        <img src="/static/images/index/1495693914.png" alt="线下聚会">
                    </div>
                    <h5>线下聚会</h5>
                    <p><i></i>来自五湖四海 志趣相投<i></i></p>
                </li>
                <li>
                    <div class="box-img">
                        <img src="/static/images/index/1495693941.png" alt="旅行活动">
                    </div>
                    <h5>旅行活动</h5>
                    <p><i></i>带上PRO 放下单反<i></i></p>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    .container{
        width: 100%;
        margin: 60px auto;
        background: #fff;
        border-radius: 6px;
        overflow: hidden;
    }
    .model-list{
        width: 100%;
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
    }
    .model-list>li{
        width: 25%;
        text-align: center;
        border: 1px solid #ededed;
        transition: all .3s;
        color: #b2b2b2;
        padding-bottom: 10px;
        cursor: pointer;
    }
    .model-list>li:nth-of-type(2){
        border-left: none;
        border-right: none;
    }
    .model-list>li:nth-of-type(3){
        border-right: none;
    }
    .model-list>li:hover{
        box-shadow: inset 0 0 38px rgba(0,0,0,.1);
    }
    .model-list>li:hover img{
        transform: scale(1.1);
    }
    .box-img{
        width: 80%;
        margin: 20px auto;
    }
    .box-img>img{
        width: 100%;
        transition: all .3s;
    }
    .model-list p{
        font-size: 12px;
    }
    .model-list h5{
        font-weight: 600;
        color: #777;
        margin-bottom: 6px;
    }
</style>