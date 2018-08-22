<template>
    <div id="detLeft">
        <div class="container">
            <div class="con-head">
                <h4>产品信息</h4>
            </div>
            <div class="con-det">
                <img :src="itemImg.detImg" alt="" v-for="(itemImg, index) in shopDetData" :key="index">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'detLeft',
    props: {
        shopDetData: Array
    },
    mounted(){
        
    }
}
</script>


<style scoped>
#detLeft{
    width: 72%;
    margin-right: 6%;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
}
.container{
    background: #fff;
}
.con-head{
    width: 100%;
    position: relative;
    z-index: 10;
    height: 60px;
    padding: 0 10px 0 24px;
    border-radius: 8px 8px 0 0;
    -webkit-box-shadow: rgba(0,0,0,.06) 0 1px 7px;
    box-shadow: rgba(0,0,0,.06) 0 1px 7px;
    background: #f3f3f3;
    background: -webkit-gradient(linear,left top,left bottom,from(#fbfbfb),to(#ececec));
    background: linear-gradient(#fbfbfb,#ececec);
    line-height: 60px;
    box-sizing: border-box;
}
.con-head>h4{
    display: inline-block;
    padding: 0 20px;
    font-size: 18px;
    font-weight: 400;
    color: #444;
    border-bottom: 2px solid #444;
}
.con-det{
    padding: 30px 80px 0 30px;
    box-sizing: border-box;
}
.con-det, .con-det>img{
    width: 100%;
}
</style>

