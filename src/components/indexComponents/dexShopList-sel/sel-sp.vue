<template>
    
</template>

<script>
    export default {
        name: 'selSp',
        props: {
            imgList: Array
        },
        data(){
            return {
               seldex: 0 
            }
        },
        methods: {
            selShopImg(spandex){
                this.seldex = spandex;
                this.$store.commit('selShopImg', spandex);
            }
        }
    }
</script>

<style scoped>
    
</style>