<template>
    <div id="shopCart">
        <Header />
        <div class="container">
            <div class="cartShopList">
                <cart-shop-list />
            </div>
            <h4>购买了该商品的用户还购买了</h4>
            <recommend-shop />
        </div>
        <Footer />
    </div>
</template>

<script>
import Header from './comComponents/header';
import Footer from './comComponents/footer';
import recommendShop from './successShop/recommendShop';
import cartShopList from './cartShopList/cartShopList';
    export default {
        name: 'shopCart',
        components: {
            Header,
            Footer,
            recommendShop,
            cartShopList
        }
    }
</script>

<style scoped>
.container{
    width: 83%;
    margin: 60px auto;
}
.cartShopList{
    margin-bottom: 30px;
}
.container>h4{
    text-align: center;
    font-size: 24px;
    font-weight: 400;
    text-shadow: 5px 5px 6px #888;
}
</style>
