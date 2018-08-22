<template>
    <div id="dexSwper">
        <div class="container">
            <div 
                class="box-list" 
                ref="boxList"
                @mouseenter="enterBoxList"
                @mouseleave="leaveBoxList"
            >
                <ul class="list">
                    <li>
                        <img src="/static/images/index/1495532510.jpg" alt="">
                    </li>
                    <li>
                        <img src="/static/images/index/1495598299.jpg" alt="">
                    </li>
                </ul>
                <div class="dirp">
                    <span>
                        <i :class="{'show-i': index === 0}"></i>
                    </span>
                    <span>
                        <i :class="{'show-i': index === 1}"></i>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'dexSwper',
        data(){
            return {
                index: -1
            }
        },
        mounted(){
            this.autoSwper();
        },
        methods: {
            autoSwper(){
                let list_ul = document.querySelector('.list');
                setTimeout(() => {
                    this.index = 0;
                }, 10);
                setInterval(() => {
                    this.index ++;
                    if(this.index > 1){
                        this.index = 0;
                    }
                    list_ul.style.marginLeft = (-100 * this.index) + '%';
                }, 4000);
            },
            enterBoxList(){
                console.log(this.$refs.boxList);
            },
            leaveBoxList(){
                console.log(2)
            }
        }
    }
</script>

<style scoped>
    .container{
        width: 100%;
    }
    .box-list{
        width: 100%;
        margin: 0 auto;
        overflow: hidden;
        border-radius: 10px;
        position: relative;
    }
    .list{
        width: 200%;
        display: flex;
        flex-direction: row;
        transition: all .6s;
    }
    .list>li{
        width: 50%;
    }
    .list>li>img{
        width: 100%;
    }
    .dirp{
        position: absolute;
        left: 50%;
        bottom: 1%;
        transform: translate(-50%, -50%);
    }
    .dirp>span{
        display: inline-block;
        width: 45px;
        height: 3px;
        background: #888;
        margin-left: 10px;
    }
    .dirp>span>i{
        display: block;
        height: 100%;
        background: #fff;
        width: 0%;
    }
    .dirp>span> .show-i{
        transition: all 4.2s;
        width: 100%;
    }
</style>