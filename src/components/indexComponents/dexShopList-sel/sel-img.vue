<template>
    <div>
        <div class="box-img">
            <img
                :class="{'sel-img': imgdex === seldex}"
                :src="itemImg.img" 
                :alt="name" 
                :title="name" 
                v-for="(itemImg, imgdex) in imgList"
            />
        </div>
        <p class="sp-list">
            <span
                :class="{'sel-sp': spandex === seldex}"
                v-for="(itemImg, spandex) in imgList" 
                @click="selShopImg(spandex)"
            />
        </p>
    </div>
</template>

<script>
    export default {
        name: 'selImg',
        props: {
            name: String,
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
            }
        }
    }
</script>

<style scoped>
    .box-img{
        width: 77%;
        margin: 30px auto 10px;
        overflow: hidden;
        display: flex;
        flex-direction: row;
    }
    .box-img img{
        display: none;
        opacity: 0;
        width: 100%;
        height: 100%;
    }
    .box-img .sel-img{
        transition: all .3s;
        display: block;
        opacity: 1;
    }
    .sp-list{
        margin-bottom: 8px;
    }
    .sp-list>span{
        display: inline-block;
        margin: 3px;
        width: 12px;
        height: 12px;
        border-radius: 100%;
        border: 1px solid #ccc;
        box-sizing: border-box;
    }
    .sp-list>.sel-sp{
        border: 2px solid #b2b2b2;
    }
</style>