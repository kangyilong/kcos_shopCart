<template>
    <div>
        <footer>
            <div class="footer">
                <div class="foo-list">
                    <ul>
                        <li>关于公司</li>
                        <li>最新活动</li>
                        <li>电子产品</li>
                        <li>新闻中心</li>
                        <li>服务支持</li>
                        <li>联系我们</li>
                    </ul>
                </div>
                <div class="foo-msg">
                    <p>Copyright © 2017, MetInfo Digital Co., Ltd. All Rights Reserved.</p>
                </div>
                <div class="foo-tit">
                    <p>官方在线商城</p>
                </div>
            </div>
        </footer>
    </div>
</template>

<style scoped>
.footer{
    width: 100%;
    margin: 0 auto;
    margin-top: 8px;
    background-color: #fff;
    text-align: center;
    padding: 30px 80px;
    box-sizing: border-box;
}
.foo-list>ul{
    display: flex;
    margin-bottom: 30px;
}
.foo-list>ul>li{
    width: 16.6%;
    color: #444;
    cursor: pointer;
}
.foo-msg, .foo-tit{
    font-size: 12px;
    color: #888;
    margin-top: 10px;
}
</style>

