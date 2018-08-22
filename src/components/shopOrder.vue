<template>
    <div>
        <Header />
        <div id="shopOrder">
            <div class="container">
                <div class="order-tit">
                    <span class="tit">订单号：</span>
                    <span class="order">{{orderCode}}</span>
                </div>
                <div class="order-shop">
                    <h5>商品信息</h5>
                    <ul class="shop-list">
                        <li v-for="(shopItem, index) in multipleSelection" :key="index">
                            <div class="shop-box">
                                <div class="det-box" @click="toShopDet(shopItem.shopId)">
                                    <div class="img-box">
                                        <img :src="shopItem.shopGenre[0].img" alt="" />
                                    </div>
                                    <p>{{shopItem.shopName}}</p>
                                </div>
                                <div class="shop-det">
                                    <span class="single">{{shopItem.shopPri | shopPri}}</span>
                                    &nbsp;X&nbsp;
                                    <i class="num">{{shopItem.selShopNum}}</i>
                                </div>
                                <div class="shop-total">
                                    <span>{{shopItem.shopPri * shopItem.selShopNum | shopPri}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="zf-box">
                    <h5>支付方式</h5>
                    <div class="zf-way">
                        <el-button 
                            plain 
                            :class="{'sel-btn': zfIndex === index}" 
                            v-for="(zfItem, index) in zfData"
                            :key="index"
                            @click='selZf(index)'
                        >{{zfItem}}
                        </el-button>
                    </div>
                </div>
                <div class="ps-box">
                    <h5>配送方式</h5>
                    <div class="zf-way">
                        <el-button 
                            plain 
                            :class="{'sel-btn': psIndex === index}" 
                            v-for="(psItem, index) in psData"
                            :key="index"
                            @click='selPs(index)'
                        >{{psItem}}
                        </el-button>
                    </div>
                </div>
                <div class="site-box">
                    <div class="site-head">
                        <h5>收货地址</h5>
                        <div class="add-site">
                            <el-button type="primary" plain @click="toChangeSite()">
                                {{siteTxt ? siteTxt : '添加地址'}}
                            </el-button>
                        </div>
                    </div>
                    <ul class="site-con" :class="{'none': siteData.length == 0}">
                        <li v-for="(siteItem, index) in siteData" :key="index">
                            <p class="name">{{siteItem.name}}</p>
                            <p class="phone">{{siteItem.phoneNum}}</p>
                            <p class="site-det">{{siteItem.site}} {{siteItem.siteDet}}</p>
                        </li>
                    </ul>
                </div>
                <div class="textarea">
                    <textarea placeholder="给商家留言" v-model="aeraData"></textarea>
                </div>
                <div class="order-foo">
                    <div class="foo-left">
                        <p>共<span> {{shopNum}} </span>件商品，合计：<span> {{shopTotal | shopPri}} </span></p>
                    </div>
                    <div class="foo-right">
                        <el-button type="info" plain @click="cancelOrder">再想想，取消订单</el-button>
                        <el-button type="danger" @click="affirmOrder">确认订单</el-button>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import fetch from "../assets/api/fetch.js";
import Header from "./comComponents/header";
import Footer from "./comComponents/footer";
export default {
  data() {
    return {
      userMsg: "",
      siteTxt: "",
      zfData: ["在线支付", "货到付款"],
      psData: ["快递配送(免运费)", "EMS加急"],
      orderMsg: ["恭喜你，下单成功", "取消订单成功", "已转为待支付订单"],
      zfIndex: 0,
      psIndex: 0,
      shopNum: 0,
      shopTotal: 0,
      orderCode: "",
      aeraData: "",
      multipleSelection: [],
      siteData: [
        {
          name: "",
          phoneNum: "",
          site: "",
          siteDet: ""
        }
      ],
      requestNum: 0,
      zcQuit: true,
      userBalance: 0,
      czMoney: 0
    };
  },
  beforeMount() {
    this.userMsg = JSON.parse(localStorage.getItem("userMsg"));
    if (this.$route.params.orderCode) {
      this.zcQuit = false;
      this.orderCode = this.$route.params.orderCode;
      this.getSelOrderData(this.orderCode, this.userMsg);
    } else {
      this.orderCode = localStorage.getItem("orderCode");
      this.multipleSelection = JSON.parse(
        localStorage.getItem("multipleSelection")
      );
      this.totalNum();
    }
    this.getUserSiteData(this.userMsg);
  },
  methods: {
    getUserSiteData(userMsg) {
      this.requestNum++;
      fetch("/shop/getUserSite", "post", {
        type: "user",
        ...userMsg
      }).then(data => {
        if (data.msg === "获取数据异常") {
          if (this.requestNum < 5) {
            this.getUserSiteData(userMsg);
          }
        } else {
          this.requestNum = 0;
          Object.values(data)[0].userAccount.forEach(item => {
            this.userBalance += parseInt(item.czMoney);
          });
          this.siteData = Object.values(data)[0].userSetSite;
          this.siteTxt =
            this.siteData.length > 0 ? "修改收货地址" : "添加收货地址";
        }
      });
    },
    getSelOrderData(orderCode, userMsg) {
      this.requestNum++;
      fetch("/shop/selOrderData", "post", {
        type: "user",
        mod: "getOrder",
        orderCode,
        orderType: "userWillDoneOrder",
        ...userMsg
      }).then(data => {
        if (data.msg === "获取数据异常") {
          if (this.requestNum < 5) {
            this.getSelOrderData(orderCode, userMsg);
          }
        } else {
          this.requestNum = 0;
          this.multipleSelection = Object.values(
            data
          )[0].userWillDoneOrder[0].multipleSelection;
          this.totalNum();
        }
      });
    },
    totalNum() {
      this.shopNum = this.multipleSelection.length;
      this.multipleSelection.forEach(item => {
        this.shopTotal += parseInt(item.selShopNum) * parseInt(item.shopPri);
      });
    },
    selZf(index) {
      this.zfIndex = index;
    },
    selPs(index) {
      this.psIndex = index;
    },
    toShopDet(shopId) {
      this.$store.commit("changeShopState", shopId);
      this.$router.push("/detshop");
    },
    orderMessage(index, orderType, next) {
      fetch("/shop/addWillOrder", "post", {
        type: "user",
        mod: "addOrder",
        orderType,
        userMsg: this.userMsg,
        ruleForm: {
          orderTime: new Date().getTime(),
          orderCode: this.orderCode,
          aeraData: this.aeraData,
          zfType: this.zfIndex,
          psType: this.psIndex,
          multipleSelection: this.multipleSelection,
          siteData: this.siteData
        }
      }).then(data => {
        localStorage.setItem("istosite", 0);
        if (index == 2) {
          next();
        } else {
          this.$message({
            message: this.orderMsg[index],
            type: "success"
          });
          this.zcQuit = true;
          this.removeOrder();
          setTimeout(() => {
            this.$router.push("/");
          }, 3000);
        }
      });
    },
    cancelOrder() {
      this.zcQuit = false;
      this.orderMessage(1, "userOffOrder");
    },
    affirmOrder() {
      this.zcQuit = false;
      this.orderRecord();
    },
    removeOrder() {
      this.requestNum++;
      this.userMsg = {
        type: "user",
        mod: "remove",
        ...this.userMsg
      };
      fetch("/shop/removeOrder", "post", {
        userMsg: this.userMsg,
        condition: {
          userWillDoneOrder: {
            orderCode: this.orderCode
          }
        }
      }).then(data => {
        if (data.msg == "删除异常") {
          if (this.requestNum < 3) {
            this.removeOrder();
          }
        } else {
          this.requestNum = 0;
        }
      });
    },
    orderRecord() {
      let shopRecord = [];
      let orderObj = {
        shopRecord,
        czMoney: 0,
        czCode: "KY_1314" + Math.floor(Math.random() * 100000),
        aeraData: this.aeraData,
        czTime: new Date().getTime()
      };
      this.multipleSelection.forEach(item => {
        shopRecord.push(item.shopId);
        this.czMoney += parseInt(item.selShopNum) * parseInt(item.shopPri);
      });
      orderObj.czMoney = "-" + this.czMoney;
      if (this.czMoney > this.userBalance) {
        this.$message({
          message: "账户余额不足，请充值",
          type: "warning"
        });
        let istosite = parseInt(localStorage.getItem("istosite"));
        if ((Boolean(istosite))) {
          this.zcQuit = false;
        } else {
          this.zcQuit = true;
        }
        return;
      }
      this.setRecordData(orderObj);
    },
    setRecordData(orderObj) {
      fetch("/shop/setUserAccount", "post", {
        type: "user",
        mod: "setAccount",
        userMsg: this.userMsg,
        ruleForm: orderObj
      }).then(data => {
        this.orderMessage(0, "userDoneOrder");
      });
    },
    toChangeSite() {
      localStorage.setItem("istosite", 1);
      this.$router.push("/personage/site");
    }
  },
  components: {
    Header,
    Footer
  },
  filters: {
    shopPri(data) {
      return data + ".00元";
    }
  },
  beforeRouteLeave(to, from, next) {
    let istosite = parseInt(localStorage.getItem("istosite"));
    if ((Boolean(istosite), istosite)) {
      this.zcQuit = false;
    } else {
      this.zcQuit = true;
    }
    if (this.zcQuit) {
      this.orderMessage(2, "userWillDoneOrder", next);
    } else {
      next();
    }
  }
};
</script>

<style scoped>
.container {
  width: 83%;
  margin: 60px auto;
  background: #fff;
  padding: 40px;
  padding-bottom: 0;
}
.container > div {
  padding: 30px 0;
  border-bottom: 1px solid #eee;
}
.container h5 {
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin-right: 40px;
}
.order-tit,
.shop-list,
.zf-box,
.ps-box,
.site-head,
.site-con,
.shop-box,
.det-box,
.order-foo {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.container > .order-tit {
  padding-top: 0;
}
.tit {
  font-size: 20px;
  color: #333;
}
.order {
  color: #f96868;
  margin-left: 3px;
  padding-top: 5px;
}
.shop-list {
  margin-top: 30px;
}
.shop-list > li {
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
  background-color: #f5f5f5;
}
.shop-box,
.det-box,
.site-head,
.ps-box,
.zf-box {
  align-items: center;
}
.det-box {
  width: 50%;
  cursor: pointer;
}
.det-box > p {
  color: #4e97d9;
}
.img-box > img {
  width: 80px;
}
.shop-det {
  font-size: 13px;
}
.shop-det > span {
  font-size: 18px;
}
.num {
  font-size: 18px;
  color: #f96868;
}
.shop-total {
  margin-left: 18%;
}
.shop-total > span {
  color: #f96868;
  font-size: 18px;
}
.sel-btn {
  background: #fff;
  border-color: #409eff;
  color: #409eff;
}
.site-con {
  padding-left: 20px;
  padding-top: 20px;
}
.site-con > li {
  padding: 20px;
  border: 1px solid #ddd;
  transition: all 0.2s;
}
.site-con > li:hover {
  box-shadow: 1px 0.5px 16px 10px #eee;
}
.name {
  font-size: 18px;
  margin-bottom: 6px;
}
.phone {
  margin-bottom: 2px;
}
.phone,
.site-det {
  font-size: 14px;
  color: #666;
}
.textarea > textarea {
  width: 100%;
  height: 80px;
  padding: 8px 16px;
  box-sizing: border-box;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  color: #444;
}
.container .order-foo {
  background-color: #fff;
  border-bottom: none;
}
.foo-left,
.foo-right {
  width: 50%;
  box-sizing: border-box;
}
.foo-left {
  padding-left: 50px;
}
.foo-left span {
  font-size: 20px;
  color: #f96868;
}
.foo-right {
  padding-right: 60px;
  text-align: right;
}
.foo-right > button {
  margin-left: 20px;
}
</style>

