<template>
    <div>
        <div class="container">
            <div class="col-head">
                <span>已收藏</span>
            </div>
            <div class="col-con">
                <collect-list />
            </div>
        </div>
    </div>
</template>

<script>
import collectList from './percollect-com/collect-list';
    export default {
        data(){
            return {
            }
        },
        components: {
            collectList
        }
    }
</script>

<style scoped>
.container{
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 50px 25px;
    background-color: #fff;
}
.col-head{
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #ddd;
}
.col-head>span{
    display:inline-block;
    width: 15%;
    height: 98%;
    border-bottom: 2px solid #62a8ea;
    text-align: center;
    color: #62a8ea;
    font-size: 16px;
}
</style>

