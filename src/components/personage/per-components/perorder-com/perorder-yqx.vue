<template>
    <div>
        <div class="container">
            <search-order />
            <div class="all-con">
                <order-list :orderType="'yqxOrder'"/>
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
        localStorage.setItem('orderType', 'yqxOrder');
    },
    components: {
        orderList,
        searchOrder
    }
}
</script>




