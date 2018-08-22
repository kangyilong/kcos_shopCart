<template>
    <div>
        <div class="order-msg">
            <p>{{tit}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            tit: String
        },
        data(){
            return {
                isshow: false
            }
        }
    }
</script>

<style scoped>
.order-msg{
    text-align: center;
    overflow: hidden;
    padding: 50px;
    margin-top: 20px;
    margin-bottom: 30px;
    border: 1px solid #f96868;
}
.order-msg>p{
    color: #76838f;
    font-size: 18px;
}
</style>

