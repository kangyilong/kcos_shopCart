<template>
    <div class="header">
        <el-row>
            <el-col :span="5">
                <div class="head-logo" @click="$router.push('/')">
                    <img src="/static/images/index/logo.png" alt="">
                </div>
            </el-col>
            <el-col :span="13">
                <div class="head-con">
                    <ul class="con-list">
                        <li @click="$router.push('/')">
                            <p>首页 <i></i></p>
                        </li>
                        <li>
                            <p>加入我们 <i></i></p>
                        </li>
                        <li>
                            <p>联系我们 <i></i></p>
                        </li>
                        <li>
                            <p>关于公司 <i></i></p>
                        </li>
                        <li>
                            <p>电子产品 <i></i></p>
                        </li>
                        <li>
                            <p>新闻中心 <i></i></p>
                        </li>
                    </ul>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="head-right">
                    <div class="my-msg">
                        <el-dropdown trigger="click">
                            <div class="el-dropdown-link">
                                <span><i class="iconfont icon-people"></i></span>
                                <span>{{userMsg.userName}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    <p class="icon-p" @click="$router.push('/personage')">
                                        <i class="iconfont icon-geren"></i>
                                        个人中心
                                    </p>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <p class="icon-p" @click="$router.push('/personage/order')">
                                        <i class="iconfont icon-dingdan"></i>
                                        我的订单
                                    </p>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <p class="icon-p" @click="$router.push('/personage/collect')">
                                        <i class="iconfont icon-shoucang"></i>
                                        我的收藏
                                    </p>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <p class="icon-p" @click="$router.push('/personage/site')">
                                        <i class="iconfont icon-youhuiquan"></i>
                                        我的地址
                                    </p>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <p class="icon-p" @click="$router.push('/personage/consume')">
                                        <i class="iconfont icon-youhuiquan"></i>
                                        我的优惠券
                                    </p>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <p class="icon-p" @click="$router.push('/personage/seting')">
                                        <i class="iconfont icon-shezhi"></i>
                                        账户信息
                                    </p>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <p class="icon-p" @click="exit">
                                        <i class="iconfont icon-tuichu"></i>
                                        退出
                                    </p>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <div class="my-cart">
                        <el-dropdown trigger="click">
                            <div class="el-dropdown-link">
                                <span><i class="iconfont icon-gouwuche2"></i></span>
                                <span>购物车<b></b></span>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <div class="menu-head">
                                    <p class="menu-tit">购物车</p>
                                    <p class="shop-num">共 <span>{{allShopNum}}</span> 件商品</p>
                                </div>
                                <el-dropdown-item 
                                    v-for="(item, index) in shopCartList" 
                                    :key="index" 
                                >
                                    <div class="con-shop" @click="selShop">
                                        <div class="conshop-left" :title="item.shopName" @click="toShopdet(item.shopId)">
                                            <img :src="item.shopGenre[0].img" alt="">
                                            <p class="left-tit">{{item.shopName}}</p>
                                        </div>
                                        <div class="conshop-det">
                                            <span>{{item.shopPri}}.00元</span>&nbsp; 
                                            <small>X</small> &nbsp;
                                            <i>{{item.selShopNum}}</i>
                                        </div>
                                        <div class="conshop-right">
                                            <i class="iconfont icon-shanchu1" @click="removeShop(index, item.shopId)"></i>
                                        </div>
                                    </div>
                                </el-dropdown-item>
                                <div class="menu-foo" v-show="shopCartList.length > 0">
                                    <p class="shop-total">共 {{allShopTotal}}.00元</p>
                                    <p class="shop-btn">
                                        <el-button type="danger" @click="toShopCart">去购物车结算</el-button>
                                    </p>
                                </div>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import fetch from "../../assets/api/fetch.js";
export default {
  data() {
    return {
      shopCartList: [],
      userMsg: {
          userName: ''
      },
      requestNum: 0,
      allShopNum: 0,
      allShopTotal: 0
    };
  },
  beforeMount() {
    this.userMsg = JSON.parse(localStorage.getItem("userMsg"));
    this.getCartData(this.userMsg);
  },
  methods: {
    getCartData(userMsg) {
      this.requestNum++;
      fetch("/shop/getCartData", "post", {
        type: "user",
        ...userMsg
      }).then(data => {
        if (data.msg === "获取数据异常") {
          if (this.requestNum < 5) {
            this.getCartData(userMsg);
          }
        } else {
          this.requestNum = 0;
          this.shopCartList = Object.values(data)[0].shopCart;
          this.allShopNum = this.shopCartList.length;
          this.shopCartList.forEach(item => {
            this.allShopTotal += parseInt(item.selShopNum) * parseInt(item.shopPri);
          });
        }
      });
    },
    removeCartShop(userMsg, condition){
        this.requestNum ++;
        userMsg.type = 'user';
        userMsg.mod = 'remove';
        fetch('/shop/removeCartShop', 'post', {
            userMsg,
            condition
        }).then((data) => {
            if(data.msg === '删除异常'){
                if(this.requestNum < 5){
                    this.removeCartShop(userMsg, condition);
                }
            }else{
                this.requestNum = 0;
            }
        });
    },
    selShop() {
      event.stopPropagation();
    },
    toShopCart(){
        this.$router.push('/cartShop');
    },
    toShopdet(shopId){
        this.$store.commit('changeShopState', shopId);
        this.$router.push('/detshop');
    },
    removeShop(index, shopId){
        this.allShopTotal = 0;
        this.shopCartList.splice(index, 1);
        this.allShopNum = this.shopCartList.length;
        this.shopCartList.forEach(item => {
            this.allShopTotal += parseInt(item.selShopNum) * parseInt(item.shopPri);
        });
        this.removeCartShop(this.userMsg, {
          'shopCart': {
              shopId
          }
      });
    },
    exit(){
        localStorage.clear();
        this.$router.push('/login');
    }
  }
};
</script>


<style scoped>
.header {
  padding: 10px 3%;
  background-color: #fff;
  padding-bottom: 0;
}
.head-logo{
    overflow: hidden;
    box-sizing: border-box;
}
.con-list{
    display: flex;
    text-align: center;
}
.con-list>li{
    display: block;
    cursor: pointer;
    width: 13.5%;
}
.con-list>li>p{
    font-size: 13px;
}
.head-right {
  display: flex;
  padding-left: 16%;
}
.el-dropdown-link {
  cursor: pointer;
  background-color: #fafafa;
  padding: 6px 15px;
}
.el-dropdown-link > span {
  vertical-align: middle;
  font-size: 14px;
}
.icon-people,
.icon-gouwuche2 {
  color: #aaa;
  font-size: 23px;
  vertical-align: middle;
  margin-right: 8px;
}
.head-logo,
.head-con {
  line-height: 38px;
}
.icon-p {
  padding-right: 30px;
}
.icon-p > i {
  margin-right: 5px;
}
.my-cart {
  border-radius: 4px;
  background: #fff;
}
.menu-head {
  display: flex;
  min-width: 180px;
  border-bottom: 1px solid #e5e5e5;
  padding: 0 10px;
}
.menu-head > p {
  width: 50%;
  line-height: 40px;
  margin-top: -10px;
}
.shop-num {
  text-align: right;
}
.shop-num>span{
    font-size: 18px;
    color: #f96868;
}
.con-shop {
  border-bottom: 1px solid #e5e5e5;
}
.con-shop,
.con-shop > div {
  display: flex;
  line-height: 50px;
}
.con-shop img {
  height: 40px;
  margin-top: 5px;
  margin-left: -20px;
}
.conshop-left,
.conshop-det {
  margin-right: 25px;
}
.conshop-det {
  color: #999;
}
.icon-shanchu1 {
  margin-right: -10px;
  color: #f96868;
  font-size: 17px;
}
.menu-foo {
  display: flex;
  padding-top: 10px;
}
.menu-foo > p {
  width: 50%;
}
.shop-total {
  font-size: 18px;
  color: #f96868;
  padding-top: 6px;
  padding-left: 10px;
}
.shop-btn {
  padding-right: 10px;
  text-align: right;
  font-size: 13px;
}
.shop-btn > button {
  padding: 6px 12px;
}
.left-tit {
  width: 90px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>

