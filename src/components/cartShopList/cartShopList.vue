<template>
    <div>
        <div class="cartList" :class="{'iscart': !isLoad}">
            <img src="/static/images/shopCartImg/timg2.gif" alt="" v-show="!isLoad">
            <el-table
                ref="multipleTable"
                :data="shopList"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                v-show="isLoad"
            >
                <el-table-column
                    type="selection"
                    width="55"
                />
                <el-table-column
                    label="商品">
                    <template slot-scope="scope">
                        <div class="img-box">
                            <div class="box-left">
                                <img :src="scope.row.shopGenre[0].img" alt="">
                            </div>
                            <div class="box-right">
                                <p>{{scope.row.shopName}}</p>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="单价"
                    width="150"
                >
                    <template slot-scope="scope">
                        <p class="shop-pri">{{scope.row.shopPri}}.00元</p>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="selShopNum"
                    label="数量"
                    width="150"
                >
                </el-table-column>
                <el-table-column
                    label="小计"
                    show-overflow-tooltip 
                >
                    <template slot-scope="scope">
                        <p class="subtotal">{{scope.row.shopPri * scope.row.selShopNum}}.00元</p>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row, shopList)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="affirm-box">
                <div class="affirm-left">
                    <el-button @click="toggleSelection()">取消选择</el-button>
                </div>
                <div class="affirm-right">
                    <p>
                        共
                        <span>{{totalNum}}</span>
                        件商品，合计：
                        <span>{{total}}.00元</span>
                    </p>
                    <div class="affirm-btn">
                        <el-button :plain="true" type="danger" @click="toDownOrder">去结算</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import fetch from "../../assets/api/fetch.js";
export default {
  data() {
    return {
      shopList: [],
      userMsg: {},
      requestNum: 0,
      multipleSelection: [],
      total: 0,
      totalNum: 0,
      isLoad: false
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
            this.isLoad = true;
          this.requestNum = 0;
          this.shopList = Object.values(data)[0].shopCart;
        }
      });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.allShopTotal(this.multipleSelection);
    },
    handleDelete(index, row, rows) {
      this.multipleSelection.splice(index, 1);
      rows.splice(index, 1);
      this.allShopTotal(this.multipleSelection);
      this.removeCartShop(this.userMsg, {
          'shopCart': {
              'shopId': row.shopId
          }
      });
    },
    allShopTotal(multipleSelection) {
      this.total = 0;
      this.totalNum = multipleSelection.length;
      multipleSelection.forEach((item, index) => {
        this.total += parseInt(item.selShopNum) * item.shopPri;
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
    toDownOrder(){
        if(this.totalNum === 0){
            this.$message({
                message: '抱歉，您还未选择商品',
                type: 'warning'
            });
        }else{
            let orderCode = 'KY_' + new Date().getTime() + Math.floor(Math.random() * 10000);
            localStorage.setItem('orderCode', orderCode);
            localStorage.setItem('multipleSelection', JSON.stringify(this.multipleSelection));
            this.$router.push('/orderShop');
            localStorage.setItem('istosite', 0);
        }
    }
  }
};
/* 
    {
        userCollect: {
            shopId: this.shopData.shopId
    }

    <template slot-scope="scope">
        <div class="p-number">
            <label class="num-minus" @click="numMinus">-</label>
            <p class="sup-box">
                <input type="text" v-model="scope.row.selShopNum"/>
            </p>
            <label class="num-add" @click="numAdd">+</label>
        </div>
    </template>
 */
</script>

<style scoped>
.iscart{
    width: 100%;
    text-align: center;
    background-color: #fff;
}
.cartList>img{
    width: 200px;
}
.affirm-box {
  margin-top: 40px;
  padding: 20px 20px;
  background: #fff;
}
.el-table__row img {
  width: 80px;
  margin-right: 10px;
}
.img-box {
  display: flex;
}
.box-right {
  padding-top: 20px;
}
.shop-pri {
  color: #999;
}
.subtotal {
  color: #f96868;
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
.sup-box > input {
  box-sizing: border-box;
  width: 50px;
  height: 36px;
  float: left;
  text-align: center;
  font-size: 16px;
  color: #888;
  border: 1px solid #ccc;
}
.affirm-box {
  display: flex;
}
.affirm-left {
  width: 50%;
}
.affirm-right {
  width: 50%;
  padding: 8px 20px;
  display: flex;
}
.affirm-right span {
  color: #f96868;
  font-size: 24px;
}
.affirm-right>p{
    width: 60%;
}
.affirm-btn {
  width: 30%;
  text-align: right;
}
.affirm-btn span {
  letter-spacing: 4px;
}
</style>


