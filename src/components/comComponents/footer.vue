<template>
    <div id="footer">
        <footer>
            <div class="foo">
                <div class="container">
                    <div class="foo-con">
                        <div class="con-left">
                            <ul class="all-list">
                                <li class="foo-sign">
                                    <h5>关于公司</h5>
                                    <ul class="sign-list">
                                        <li><a href="">公司简介</a></li>
                                        <li><a href="">线上反馈</a></li>
                                        <li><a href="">加入我们</a></li>
                                        <li><a href="">联系我们</a></li>
                                    </ul>
                                </li>
                                <li class="foo-sign">
                                    <h5>最新活动</h5>
                                    <ul class="sign-list">
                                        <li><a href="">配件周边</a></li>
                                        <li><a href="">热门产品</a></li>
                                        <li><a href="">现下聚会</a></li>
                                        <li><a href="">旅行活动</a></li>
                                    </ul>
                                </li>
                                <li class="foo-sign">
                                    <h5>电子产品</h5>
                                    <ul class="sign-list">
                                        <li><a href="">热门手机</a></li>
                                        <li><a href="">耳机音响</a></li>
                                        <li><a href="">手机配件</a></li>
                                        <li><a href="">周边产品</a></li>
                                    </ul>
                                </li>
                                <li class="foo-sign">
                                    <h5>新闻中心</h5>
                                    <ul class="sign-list">
                                        <li><a href="">新闻动态</a></li>
                                        <li><a href="">官网新闻</a></li>
                                        <li><a href="">最新资讯</a></li>
                                        <li><a href="">图片展示</a></li>
                                    </ul>
                                </li>
                                <li class="foo-sign">
                                    <h5>关注我们</h5>
                                    <ul class="sign-list">
                                        <li><a href=""><i></i>客服 QQ</a></li>
                                        <li><a href=""><i></i>新浪微博</a></li>
                                        <li><a href=""><i></i>官方微信</a></li>
                                        <li><a href=""><i></i>官方邮件</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div class="con-right">
                            <h4>400-000-0000</h4>
                            <p>周一至周日 9:00-18:00（仅收市话费)</p>
                            <div><span><i></i>在线留言</span></div>
                        </div>
                    </div>
                    <div class="foo-btm">
                        <p>Copyright © 2017, MetInfo Digital Co., Ltd. All Rights Reserved.</p>
                        <p>官方在线商城</p>
                        <p>Powered by <a href="">MetInfo</a> 5.3.19</p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<style scoped>
    .foo{
        width: 100%;
        background: #f5f5f5;
        margin-top: 60px;
        overflow: hidden;
    }
    .container{
        width: 83%;
        margin: 30px auto 0;
    }
    .foo-con{
        display: flex;
        flex-direction: row;
        padding: 20px 0px 40px;
        border-bottom: 1px solid #e6e6e6;
    }
    .con-left{
        width: 70%;
    }
    .con-right{
        width: 30%;
        text-align: right;
    }
    .all-list{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        text-align: center;
    }
    .foo-sign>h5{
        color: #646464;
        font-size: 15px;
        margin-bottom: 10px;
    }
    .sign-list>li{
        margin: 5px 0;
    }
    .sign-list a{
        color: #969696;
        font-size: 12px;
    }
    .con-right>h4{
        font-size: 30px;
        color: #646464;
    }
    .con-right>p{
        color: #c3c3c3;
        font-size: 13px;
        margin: 0px 0 12px;
    }
    .con-right span{
        display: inline-block;
        width: 102px;
        height: 32px;
        line-height: 32px;
        background: linear-gradient(#fcfcfc,#f5f5f5);
        font-size: 14px;
        padding: 0 0 0 22px;
        color: #5079d9;
        border: 1px solid #dcdcdc;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
    }
    .foo-btm{
        display: flex;
        flex-direction: row;
        color: #757575;
        padding: 30px 20px;
    }
    .foo-btm a{
        color: #999;
        font-size: 12px;
    }
    .foo-btm a:hover{
        color: #337ab7;
    }
    .foo-btm>p{
        font-size: 12px;
        margin-right: 35px;
    }
</style>