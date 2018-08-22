<template>
    <div id="addSuccessShop">
        <Header />
        <div class="container">
            <div class="successShop-box">
                <success-shop />
            </div>
            <h4>购买了该商品的用户还购买了</h4>
            <div class="recommend-box">
                <recommend-shop />
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import Header from './comComponents/header';
import Footer from './comComponents/footer';
import successShop from './successShop/successShop';
import recommendShop from './successShop/recommendShop';
    export default {
        name: 'addSuccessShop',
        data(){
            return {}
        },
        components: {
            Header,
            Footer,
            successShop,
            recommendShop
        }
    }
</script>

<style scoped>
.container{
    width: 83%;
    margin: 60px auto;
}
.successShop-box{
    width: 100%;
    background: #fff;
}
.container>h4{
    text-align: center;
    font-size: 24px;
    font-weight: 400;
    text-shadow: 5px 5px 6px #888;
}
</style>

