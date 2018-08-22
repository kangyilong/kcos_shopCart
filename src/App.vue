<template>
  <div id="app">
      <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      isRouterAlive: true
    }
  },
  provide(){
    return {
      reload: this.reload
    }
  },
  created(){
    // 浏览器窗口关闭后操作
    // window.onbeforeunload = function(){
    //   localStorage.clear();
    // }
  },
  methods: {
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
        this.scrollToTop();
      })
    },
    scrollToTop(){
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    }
  }
}
</script>

<style>
  html, body{
      height: 100%;
      background-color: #ddd;
  }
  *{
    margin: 0;
    padding: 0;
    font-size: 15px;
  }
  button, input{
    outline: none;
  }
  a{
    text-decoration: none;
  }
  li{
    list-style: none;
  }
  small{
    font-size: 12px;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
  }
  .el-table__header-wrapper th>div, .cell{
    text-align: center !important;
  }
  .el-table td{
    padding: 15px 0;
  }
  .el-dropdown-menu__item:not(.is-disabled):hover{
    background-color: #fff;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
      -webkit-appearance: none;
  }
  input[type="number"]{
      -moz-appearance: textfield;
  }
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #aaa;
    font-size: 13px;
  }
  input:-moz-placeholder, textarea:-moz-placeholder {
      color:#aaa;
      font-size: 13px;
  }
  input::-moz-placeholder, textarea::-moz-placeholder {
      color:#aaa;
      font-size: 13px;
  }
  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
      color:#aaa;
      font-size: 13px;
  }
  .el-table .warning-row {
    background: oldlace;
  }
  .none{
    display: none !important;
  }
</style>