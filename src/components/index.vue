<template>
    <div id="index">
        <Header />
        <div class="container">
            <dex-swper />
            <dex-model-list />
            <keep-alive>
                <dex-shop-list 
                    :dexShopListOne="dexShopListOne"
                    :dexShopListData="dexShopListData"
                />
            </keep-alive>
            <keep-alive>
                <dex-shop-list 
                    :dexShopListTwo="dexShopListTwo"
                    :dexShopListData="dexShopListData"
                />
            </keep-alive>
            <dex-app-list />
            <dex-app-list-two />
        </div>
        <Footer />
    </div>
</template>

<script>
import fetch from "../assets/api/fetch";
import Header from "./comComponents/header.vue";
import dexSwper from "./indexComponents/dexSwper.vue";
import dexModelList from "./indexComponents/dexModelList.vue";
import dexShopList from "./indexComponents/dexShopList.vue";
import dexAppList from "./indexComponents/dexAppList.vue";
import dexAppListTwo from "./indexComponents/dexAppListTwo.vue";
import Footer from "./comComponents/footer.vue";
export default {
  name: "index",
  data() {
    return {
      shopData: {},
      dexShopListOne: "one",
      dexShopListTwo: "two",
      dexShopListData: [],
      requestNum: 0
    };
  },
  beforeMount() {
    this.getShopData();
  },
  methods: {
    getShopData() {
      this.requestNum ++;
      fetch("/shop", "post", { type: "shop" }).then(data => {
        if (data.msg !== "获取数据异常") {
          this.dexShopListData = Object.values(data);
          this.dexShopListData.length = 6;
        } else {
          if(this.requestNum < 3){
            this.getShopData();
          }
        }
      });
    }
  },
  components: {
    Header,
    dexSwper,
    dexModelList,
    dexShopList,
    dexAppList,
    dexAppListTwo,
    Footer
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 66px;
  line-height: 66px;
  background: #101010;
}
.header a {
  color: #ccc;
  letter-spacing: 1px;
}
.header img {
  vertical-align: middle;
}
.head-list {
  display: flex;
  flex-direction: row;
  text-align: center;
}
.head-list > li {
  width: 16.6%;
}
.head-list > li > a {
  display: block;
}
.head-left {
  height: 66px;
  line-height: 66px;
  padding-left: 20px;
}
.head-p {
  border-left: 1px solid #ccc;
  display: inline;
}
.head-p > i {
  margin-left: 50px;
  font-size: 18px;
  color: #ccc;
}
.container {
  width: 83%;
  margin: 60px auto;
}
</style>