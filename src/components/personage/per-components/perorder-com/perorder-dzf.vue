<template>
    <div>
        <div class="container">
            <search-order />
            <div>
                <order-list :orderType="'dzfOrder'"/>
            </div>
        </div>
    </div>
</template>

<script>
import orderList from './perorderAll-list/orderAll-list';
import searchOrder from './perorderAll-list/searchorder';
export default {
    data(){
        return {}
    },
    created(){
        localStorage.setItem('orderType', 'dzfOrder');
    },
    components: {
        orderList,
        searchOrder
    }
}
</script>

<style scoped>
@import url('./perorder-sty.css');     
</style>



