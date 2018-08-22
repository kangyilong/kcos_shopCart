<template>
    <div>
        <none-order v-show="isshow.is" :tit="tit"/>
        <div class="all-con" v-show="!isshow.is" v-for="(order, orderIndex) in orderList" :key="orderIndex">
            <div class="all-head">
                <div class="head-left">
                    <h5>{{orderTxt}}订单</h5>
                    <p class="order-p">
                        <span>订单号 : {{order.orderCode}}</span>
                        <span>{{order.orderTime | timeFilter}}</span>
                        <span>{{order.zfType == 0 ? '在线支付' : '货到付款'}}</span>
                    </p>
                    <p>订单金额：<span class="orderManey">{{allTotal[orderIndex] | orderFilter}}</span></p>
                </div>
                <div class="head-right" :class="{'none': orderTxt != '待支付'}">
                    <div class="order-btn">
                        <el-button type="danger" @click="toOrderShop(order.orderCode)">立即付款</el-button>
                    </div>
                </div>
            </div>
            <ul class="all-list">
                <li v-for="(orderItem, index) in order.multipleSelection" :key="index">
                    <div class="order-left">
                        <div class="left-img" @click="toShopDet(orderItem.shopId)">
                            <img :src="orderItem.shopGenre[0].img" alt="">
                        </div>
                        <div class="left-det">
                            <p>{{orderItem.shopName}}</p>
                            <p>
                                <span class="det-sp">{{orderItem.shopPri | orderFilter}}</span>
                                X
                                <span class="det-num">{{orderItem.selShopNum}}</span>
                            </p>
                        </div>
                    </div>
                    <div class="order-det">
                        <el-button @click="toShopDet(orderItem.shopId)">商品详情</el-button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import fetch from "../../../../../assets/api/fetch.js";
import noneOrder from "./noneorder";
import { resolve } from "url";
export default {
  props: {
    orderType: String
  },
  data() {
    return {
      userMsg: "",
      requestNum: 0,
      orderList: [],
      shopGenre: [],
      allTotal: [],
      total: 0,
      isshow: {
        is: false
      },
      orderTxt: '',
      tit: "没有符合条件的订单"
    };
  },
  beforeMount() {
    this.userMsg = JSON.parse(localStorage.getItem("userMsg"));
  },
  mounted() {
    this.getOrderData(this.userMsg);
  },
  methods: {
    getOrderData(userMsg) {
      this.requestNum++;
      fetch("/shop/getUserData", "post", {
        type: "user",
        ...userMsg
      }).then(data => {
        if (data.msg === "获取数据异常") {
          if (this.requestNum < 5) {
            this.getOrderData(userMsg);
          }
        } else {
          this.requestNum = 0;
          switch (this.orderType) {
            case "dshOrder":
              this.orderList = Object.values(data)[0].userDoneOrder;
              this.orderTxt = '待收货';
              break;
            case "dzfOrder":
              this.orderList = Object.values(data)[0].userWillDoneOrder;
              this.orderTxt = '待支付';
              break;
            case "yqxOrder":
              this.orderList = Object.values(data)[0].userOffOrder;
              this.orderTxt = '已取消';
              break;
          }
          this.orderList.forEach(itemOrder => {
              this.total = 0;
              itemOrder.multipleSelection.forEach(item => {
                  this.total += item.selShopNum * item.shopPri;
              });
              this.allTotal.push(this.total);
          })
        }
      });
    },
    toShopDet(shopId) {
      this.$store.commit("changeShopState", shopId);
      this.$router.push("/detshop");
    },
    toOrderShop(orderCode){
      this.$router.push({
        name: 'shopOrder',
        params: {
          orderCode
        }
      });
    }
  },
  filters: {
    orderFilter(data) {
      return data + ".00元";
    },
    timeFilter(data){
        return new Date(data).toLocaleString();
    }
  },
  components: {
    noneOrder
  }
};
</script>

<style scoped>
.all-con {
  width: 100%;
  margin: 20px auto;
  padding: 12px;
  padding-bottom: 2px;
  border: 1px solid #f96868;
  box-sizing: border-box;
}
.order-msg {
  padding: 20px;
  text-align: center;
}
.order-msg > p {
  font-size: 18px;
  color: #444;
  letter-spacing: 1px;
}
.all-head {
  width: 100%;
  display: flex;
  padding-bottom: 10px;
  border-bottom: 1px solid #f96868;
}
.head-left {
  width: 76%;
}
.head-left > h5 {
  font-size: 20px;
  font-weight: 400;
  color: #f96868;
  margin-bottom: 6px;
}
.head-left > .order-p {
  margin: 5px 0;
}
.head-left > p > span,
.head-right > p {
  font-size: 12px;
  color: #444;
}
.head-left > p > span {
  margin-right: 15px;
}
.head-right {
  padding-top: 10px;
}
.head-left > p > .orderManey {
  font-size: 20px;
  color: #f96868;
}
.all-list > li {
  display: flex;
  padding: 15px 40px 15px 0px;
  border-bottom: 1px solid #f96868;
}
.all-list > li:last-of-type {
  border-bottom: none;
}
.order-left {
  width: 80%;
  display: flex;
}
.left-img {
  cursor: pointer;
}
.left-img > img {
  width: 60px;
}
.order-det,
.order-btn {
  width: 20%;
}
.order-btn {
  text-align: right;
}
.left-det > p:nth-of-type(1) {
  margin-bottom: 5px;
}
.det-sp {
  font-size: 13px;
}
.det-num {
  color: #f96868;
  font-size: 17px;
}
</style>

