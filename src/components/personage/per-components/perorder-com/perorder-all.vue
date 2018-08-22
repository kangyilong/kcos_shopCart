<template>
    <div>
        <div class="container">
            <search-order />
            <div class="all-con">
                <order-list :orderType="'allOrder'"/>
            </div>
        </div>
    </div>
</template>

<script>
import noneOrder from './perorderAll-list/noneorder';
import orderList from './perorderAll-list/orderAll-list';
import searchOrder from './perorderAll-list/searchorder';
export default {
    data(){
        return {}
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


