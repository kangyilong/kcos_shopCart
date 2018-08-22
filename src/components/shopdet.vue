<template>
    <div id="shopDetail">
        <Header />
            <div class="container">
                <div class="con-head">
                    <div class="left-box">
                      <div class="image-box">
                        <div class="show-img">
                            <img src="/static/images/shopCartImg/timg.gif" alt="" v-show="succeedLoad" />
                            <img :src="shopImageList[selImageDex].img" alt="" v-show="!succeedLoad" />
                        </div>
                        <div class="list-box" v-show="!succeedLoad">
                          <ul class="image-list">
                              <li 
                                :class="{'sel-img': selImageDex === index}" 
                                v-for="(itemImage, index) in shopImageList" 
                                :key="index"
                                @click="selShopImage(index, itemImage.id)"
                              >
                                <img :src="itemImage.img" alt="">
                              </li>
                          </ul>
                        </div>
                    </div>
                </div>
                <div class="right-box">
                    <div class="image-del">
                        <h4>{{shopData.shopName}}</h4>
                        <p class="p-del">{{shopData.shopTxt}}</p>
                        <hr />
                        <div class="del-box">
                            <p class="shop-sprice">
                              <span v-show="!succeedLoad">{{shopData.shopPri | shopPri}}</span>
                            </p>
                            <div class="shop-number">
                                <span>数量</span>
                                <div class="p-number">
                                    <label class="num-minus" @click="numMinus">-</label>
                                    <p class="sup-box">
                                      <input type="text" v-model="shopNum" />
                                    </p>
                                    <label class="num-add" @click="numAdd">+</label>
                                </div>
                            </div>
                            <p class="sp-all">库存{{allShopNum}}件</p>
                        </div>
                        <div class="bt-box">
                            <el-button 
                              type="primary" 
                              @click="addShopCart(shopData.shopId)"
                            >
                              加入购物车
                            </el-button>
                            <el-button 
                              type="warning" 
                              :plain="true"
                              v-show="!succeedLoad"
                              @click="addShopCollect(shopData.shopId)"
                            >
                              {{collectTxt}}
                            </el-button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="det-list">
              <det-left-com :shopDetData="shopDetData"/>
              <det-right-com />
            </div>
        <Footer />
    </div>
</template>

<script>
import fetch from "../assets/api/fetch";
import Header from "./comComponents/header.vue";
import Footer from "./comComponents/footer.vue";
import DetLeftCom from "./shopdetComs/detLeftCom";
import DetRightCom from "./shopdetComs/detRightCom";
import { setTimeout } from "timers";
export default {
  name: "shopdet",
  data() {
    return {
      shopId: "",
      shopImageList: [{ img: "" }],
      shopData: {},
      shopDetData: [],
      selImageDex: 0,
      shopNum: 1,
      allShopNum: 0,
      succeedLoad: true,
      requestNum: 0,
      selImageId: "",
      userMsg: {},
      collectTxt: "加入收藏"
    };
  },
  beforeMount() {
    this.userMsg = JSON.parse(localStorage.getItem("userMsg"));
    this.shopId = this.$store.state.shopState.shopId;
    if (this.shopId) {
      // 记录用户选中的商品id
      localStorage.setItem("shopId", this.shopId);
    }
    this.shopId = localStorage.getItem("shopId");
    this.getImageData(this.userMsg);
  },
  methods: {
    getImageData(userMsg) {
      fetch("/shop/getShopData", "post", {
        // 获取商品信息
        type: "shop",
        shopId: this.shopId
      }).then(data => {
        this.requestNum++;
        if (data.msg !== "获取数据异常") {
          this.succeedLoad = false;
          this.shopDetData = Object.values(data)[0].shopDetImg;
          this.shopImageList = Object.values(data)[0].shopGenre;
          this.selImageId = this.shopImageList[0].id;
          this.shopData = Object.values(data)[0];
          this.shopImageList.forEach(item => {
            this.allShopNum += item.value;
          });
          this.requestNum = 0;
          if (userMsg) {
            let inquire = {
              "userCollect.shopId": this.shopData.shopId,
              userMsg
            };
            this.getUserCollData(inquire);
          }
        } else {
          if (this.requestNum < 5) {
            this.getImageData(userMsg);
          }
        }
      });
    },
    getUserCollData(inquire) {
      this.requestNum++;
      fetch("/shop/isCollect", "post", {
        type: "user",
        mod: "getCollect",
        shopId: this.shopData.shopId,
        inquire
      }).then(data => {
        if (data.msg === "获取数据异常") {
          if (this.requestNum < 5) {
            this.getUserCollData(inquire);
          }
        } else {
          this.requestNum = 0;
          if (data.tit === "未收藏") {
            this.collectTxt = "加入收藏";
          } else {
            this.collectTxt = "取消收藏";
          }
        }
      });
    },
    selShopImage(index, id) {
      this.selImageDex = index;
      this.selImageId = id;
    },
    numMinus() {
      if (this.shopNum <= 1) {
        this.shopNum = 1;
      } else {
        this.shopNum--;
      }
    },
    numAdd() {
      this.shopNum++;
    },
    addShopCart(shopId) {
      // 加入购物车
      if (!this.$store.state.userState.userStatus) {
        this.isLogin();
      } else {
        let selShopData = [],
          shopData = [];
        this.userMsg.type = "user";
        this.userMsg.mod = "addCart";
        selShopData = this.shopImageList.map(item => {
          // 返回选中的商品
          if (item.id === this.selImageId) {
            return item;
          }
        });
        selShopData = selShopData.filter(item => {
          return item !== undefined;
        });
        window.localStorage.setItem('selShopId', selShopData[0].id);
        shopData = this.shopData;
        shopData.shopGenre = selShopData;
        shopData.selShopNum = this.shopNum;
        this.isSuccessAddCart(this.userMsg, shopData);
      }
    },
    addShopCollect(shopId) {
      // 加入收藏 取消收藏
      if (!this.$store.state.userState.userStatus) {
        this.isLogin();
      } else {
        this.userMsg.type = "user";
        if (this.collectTxt === "加入收藏") {
          this.userMsg.mod = "addCollect";
          this.isSuccessAddCollect(this.userMsg, this.shopData);
        } else {
          this.userMsg.mod = "remove";
          this.isSuccessRemoveCollect(this.userMsg, {
            userCollect: {
              shopId: this.shopData.shopId
            }
          });
        }
      }
    },
    isLogin(){
      const h = this.$createElement;
        this.$msgbox({
          message: h("p", null, [
            h("span", null, "还请登录后操作 ")
          ]),
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          beforeClose: (action, instance, done) => {
            if (action === "confirm") {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = "执行中...";
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 100);
              }, 1000);
            } else {
              done();
            }
          }
        }).then(action => {
          this.$router.push("/login");
        });
    },
    isSuccessAddCart(userMsg, shopData) {
      // 加入购物车操作
      this.requestNum++;
      fetch("/shop/addShopCart", "post", {
        userMsg,
        shopData
      }).then(data => {
        if (data.msg === "修改异常") {
          if (this.requestNum < 3) {
            this.isSuccessAddCart(userMsg, shopData);
          }
        } else {
          this.requestNum = 0; // 加入购物车成功操作
          window.localStorage.setItem('shopNum', this.shopNum);
          this.$router.push('/addShop');
        }
      });
    },
    isSuccessAddCollect(userMsg, shopData) {
      // 加入收藏操作
      this.requestNum++;
      fetch("/shop/addShopCollect", "post", {
        userMsg,
        shopData
      }).then(data => {
        if (data.msg === "修改异常") {
          if (this.requestNum < 3) {
            this.isSuccessAddCollect(userMsg, shopData);
          }
        } else {
          this.requestNum = 0;
          this.$message({
            message: "加入收藏成功",
            type: "success"
          });
          this.collectTxt = "取消收藏";
        }
      });
    },
    isSuccessRemoveCollect(userMsg, condition) {
      // 取消收藏操作
      this.requestNum++;
      fetch("/shop/removeShopCollection", "post", {
        userMsg,
        condition
      }).then(data => {
        if (data.msg === "删除异常") {
          if (this.requestNum < 3) {
            this.isSuccessRemoveCollect(userMsg, condition);
          }
        } else {
          this.requestNum = 0;
          this.$message({
            message: "取消收藏成功",
            type: "success"
          });
          this.collectTxt = "加入收藏";
        }
      });
    }
  },
  components: {
    Header,
    Footer,
    DetLeftCom,
    DetRightCom
  },
  filters: {
    shopPri(value) {
      return value + ".00元";
    }
  }
};
</script>

<style scoped>
.container {
  width: 83%;
  margin: 60px auto;
  background: #fff;
}
.con-head {
  width: 100%;
  margin: 0 auto;
  padding: 40px 40px;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
}
.left-box {
  width: 60%;
  user-select: none;
}
.image-box {
  margin: 0 50px 30px;
  width: 80%;
  overflow: hidden;
}
.show-img {
  width: 200%;
  display: flex;
  flex-direction: row;
}
.show-img > img {
  height: 100%;
}
.list-box {
  width: 100%;
  overflow: hidden;
}
.image-list {
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  transition: all 0.3s;
  box-sizing: border-box;
}
.image-list > li {
  width: 23%;
  border: 1px solid #ddd;
  padding: 5px;
  box-sizing: border-box;
  margin-right: 10px;
  cursor: pointer;
  overflow: hidden;
  opacity: 0.8;
  transition: all 0.3s;
}
.image-list > li:hover {
  opacity: 1;
}
.image-list > li:hover img {
  transform: scale(1.08);
}
.image-list > .sel-img {
  border-color: #abcdef;
  opacity: 1;
}
.image-list img {
  width: 100%;
  max-height: 92px;
  transition: all 0.3s;
}
.right-box {
  width: 40%;
  padding-top: 80px;
}
.image-del {
  width: 100%;
  margin: 0 auto;
}
.image-del > h4 {
  font-size: 24px;
  line-height: 1.25;
  color: #000;
  margin-bottom: 13px;
  font-weight: 400;
}
.p-del {
  margin-bottom: 15px;
  font-size: 14px;
  line-height: 1.5;
  color: #bdbdbd;
  font-weight: 400;
}
hr {
  background: #ebebeb;
  border: none;
  height: 1px;
}
.shop-sprice {
  margin: 5px 0;
  font-size: 24px;
  color: #de4037;
  font-weight: 700;
}
.shop-sprice > span {
  font-size: 24px;
}
.del-box > p {
  padding: 15px 0;
}
.shop-number {
  user-select: none;
  display: flex;
  flex-direction: row;
  height: 36px;
  line-height: 36px;
  box-sizing: border-box;
}
.shop-number > span {
  width: 30px;
  color: #8d8d8d;
  font-size: 14px;
  margin-right: 20px;
}
.p-number {
  display: flex;
}
.p-number > label {
  box-sizing: border-box;
  font-size: 26px;
  font-weight: 200;
  width: 39px;
  line-height: 34px;
  text-align: center;
  color: #aaa;
  border: 1px solid #ccc;
  cursor: pointer;
  vertical-align: middle;
}
.sup-box > input {
  box-sizing: border-box;
  width: 50px;
  height: 36px;
  float: left;
  text-align: center;
  font-size: 16px;
  color: #666;
  border: 1px solid #ccc;
}
.p-number > label:nth-of-type(1) {
  border-right: none;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}
.p-number > label:nth-of-type(2) {
  border-left: none;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}
.p-number > label:hover {
  background: #dfdfdf;
  color: #aaa;
}
.sp-all {
  margin-bottom: 0;
  color: #8d8d8d;
  font-size: 14px;
  border-bottom: 1px solid #ebebeb;
  padding-bottom: 15px;
}
.bt-box {
  margin-top: 40px;
}
.bt-box > button {
  font-size: 20px;
  margin-right: 30px;
}
.det-list {
  width: 83%;
  display: flex;
  flex-direction: row;
  margin: 50px auto;
}
</style>