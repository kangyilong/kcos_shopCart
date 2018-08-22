<template>
    <div>
        <div class="container">
            <none-collect v-show="isshow.is" :tit="tit"/>
            <ul class="col-list" v-show="!isshow.is">
                <li v-for="(collectItem, index) in collectList" :key="index">
                    <div class="img-box">
                        <img :src="shopGenre[index]" alt="" />
                    </div>
                    <div class="col-det">
                        <p class="tit">{{collectItem.shopName}}</p>
                        <p class="pri">{{collectItem.shopPri | colFilter}}</p>
                    </div>
                    <div class="col-cz">
                        <div class="btn-box">
                            <el-button type="success" circle 
                                @click="toShopDet(collectItem.shopId)"
                            >
                                <i class="iconfont icon-gouwuche2"></i>
                            </el-button>
                            <el-button type="danger" icon="el-icon-delete" circle 
                                @click="clearShopCollect(collectItem.shopId, index)"
                            >
                            </el-button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import fetch from "../../../../assets/api/fetch.js";
import noneCollect from "../perorder-com/perorderAll-list/noneorder";
export default {
  data() {
    return {
      tit: "暂无商品收藏",
      isshow: {
        is: false
      },
      collectList: [],
      shopGenre: [],
      requestNum: 0,
      userMsg: {}
    };
  },
  beforeMount() {
    this.userMsg = JSON.parse(localStorage.getItem("userMsg"));
    this.getUserCollectData(this.userMsg);
  },
  methods: {
    getUserCollectData(userMsg) {
      this.requestNum++;
      fetch("/shop/getCollectData", "post", {
        type: "user",
        ...userMsg
      }).then(data => {
        if (data.msg === "获取数据异常") {
          if (this.requestNum < 5) {
            this.getUserCollectData(userMsg);
          }
        } else {
          this.requestNum = 0;
          this.collectList = Object.values(data)[0].userCollect;
          this.collectList.forEach(item => {
            this.shopGenre.push(item.shopGenre[0].img);
          });
          if (this.collectList.length > 0) {
            this.$set(this.isshow, "is", false);
          } else {
            this.$set(this.isshow, "is", true);
          }
        }
      });
    },
    toShopDet(shopId) {
      this.$store.commit("changeShopState", shopId);
      this.$router.push("/detshop");
    },
    clearShopCollect(shopId, index) {
      let userMsg = this.userMsg;
      userMsg.type = "user";
      userMsg.mod = "remove";
      this.requestNum++;
      fetch("/shop/removeCollect", "post", {
        userMsg,
        condition: {
          userCollect: {
            shopId
          }
        }
      }).then(data => {
        if (data.msg === "删除异常") {
          if (this.requestNum < 3) {
            this.clearShopCollect(shopId, index);
          }
        } else {
          this.requestNum = 0;
          this.shopGenre.splice(index, 1);
          this.collectList.splice(index, 1);
          if(this.collectList.length == 0){
              this.$set(this.isshow, 'is', false);
          }
        this.$message({
            message: "取消收藏成功",
            type: "success"
          });
        }
      });
    }
  },
  components: {
    noneCollect
  },
  filters: {
    colFilter(data) {
      return data + ".00元";
    }
  }
};
</script>


<style scoped>
.container {
  width: 100%;
}
.col-list {
  display: flex;
  flex-wrap: wrap;
}
.col-list > li {
  position: relative;
  width: 23%;
  margin: 1%;
  text-align: center;
  box-sizing: border-box;
  padding: 30px;
}
.col-list > li:hover img{
    transform: scale(1.2);
}
.col-list > li:hover .col-cz {
  opacity: 1;
}
.col-list > li:hover .btn-box {
  opacity: 1;
}
.col-cz {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
  transition: all 0.5s;
}
.btn-box {
  position: relative;
  left: 0%;
  top: 60%;
  opacity: 0;
  transition: all 1.5s;
  transform: translateY(-50%);
}
.btn-box > button {
  margin-right: 5px;
}
.img-box {
  width: 100%;
  margin-bottom: 5px;
}
.img-box > img {
  width: 100%;
  transition: all .5s;
}
.pri {
  font-size: 17px;
  color: #f96868;
}
</style>

