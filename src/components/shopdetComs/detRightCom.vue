<template>
    <div id="detRight">
        <div class="container">
            <div class="con-head">
                <h4>其他商品</h4>
            </div>
            <div class="shop-list">
                <ul class="list-ul">
                    <li v-for="(itemShop, index) in shopListData" :key="index" @click="goDetShop(itemShop.shopId)">
                        <div class="img-box">
                            <img :src="itemShop.shopGenre[0].img" alt="">
                        </div>
                        <h5 class="tit">{{itemShop.shopName}}</h5>
                        <p class="sprice"><span>{{itemShop.shopPri}}</span>.00元</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import fetch from "../../assets/api/fetch.js";
export default {
  name: "detRight",
  data() {
    return {
      shopListData: []
    };
  },
  beforeMount() {
    this.getShopList();
  },
  inject: ["reload"],
  methods: {
    getShopList() {
      fetch("/shop/getShopData", "post", { type: "shop" }).then(data => {
        if (data.msg !== "获取数据异常") {
          this.shopListData = Object.values(data);
          this.shopListData.reverse();
          this.shopListData.splice(0, 1);
          this.shopListData.length = 6;
        } else {
          this.getShopList();
        }
      });
    },
    goDetShop(shopId) {
      this.$store.commit("changeShopState", shopId);
      this.reload();
    }
  }
};
</script>


<style scoped>
#detRight {
  width: 22%;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.container {
  background: #fff;
}
.con-head {
  width: 100%;
  position: relative;
  z-index: 10;
  height: 60px;
  padding: 0 10px 0 24px;
  border-radius: 8px 8px 0 0;
  -webkit-box-shadow: rgba(0, 0, 0, 0.06) 0 1px 7px;
  box-shadow: rgba(0, 0, 0, 0.06) 0 1px 7px;
  background: #f3f3f3;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#fbfbfb),
    to(#ececec)
  );
  background: linear-gradient(#fbfbfb, #ececec);
  line-height: 60px;
  box-sizing: border-box;
}
.con-head > h4 {
  color: #444;
  font-weight: 500;
  font-size: 18px;
}
.shop-list {
  width: 100%;
}
.list-ul {
  text-align: center;
}
.list-ul > li {
  display: block;
  overflow: hidden;
  cursor: pointer;
  border-bottom: 1px solid #e6e6e6;
}
.img-box {
  padding: 30px 30px 15px 30px;
}
.img-box > img {
  width: 100%;
}
.tit {
  color: #23527c;
  letter-spacing: 2px;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 500;
}
.sprice {
  color: #f96868;
  margin-bottom: 12px;
}
</style>

