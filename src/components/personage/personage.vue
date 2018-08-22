<template>
    <div id="personageIndex">
        <my-header />
        <div class="conatiner">
            <div class="con-left">
                <personage-left />
            </div>
            <div class="con-right">
                <keep-alive>
                    <router-view />
                </keep-alive>
            </div>
        </div>
        <my-footer />
    </div>
</template>

<script>
import myHeader from '../comComponents/my-header';
import myFooter from '../comComponents/my-footer';
import personageLeft from './per-components/personage-left';
    export default {
        data(){
            return {}
        },
        components: {
            myHeader,
            myFooter,
            personageLeft
        }
    }
</script>

<style scoped>
.conatiner{
    width: 85%;
    margin: 40px auto;
    display: flex;
}
.conatiner>.con-left{
    width: 15%;
    margin-right: 10%;
}
.conatiner>.con-right{
    width: 75%;
    border-radius: 6px;
    overflow: hidden;
}
</style>

