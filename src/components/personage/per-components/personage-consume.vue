<template>
    <div>
        <div class="container">
            <div class="con-head">
                <el-button type="primary" @click="showCz">账户充值</el-button>
            </div>
            <div class="con-table">
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    :row-class-name="tableRowClassName"
                >
                    <el-table-column
                        prop="czTime"
                        label="时间"
                        width="180"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="aeraData"
                        label="订单备注"
                        width="400"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="czMoney"
                        label="金额"
                    >
                    </el-table-column>
                </el-table>
                <div class="zh-balance">
                    <p>账户余额：<span>{{balanceTotal | totalFilter}}</span></p>
                </div>
            </div>
            <div class="zh-czhi" :class="{'none': isCz}" @click="czOperation">
                <div class="cz-box">
                    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="充值金额" prop="czMoney">
                            <el-input type="text" v-model="ruleForm2.czMoney" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="账户密码" prop="pass">
                            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                        </el-form-item>
                        <div class="cz-bz">
                            <textarea placeholder="充值备注" v-model="aeraData"></textarea>
                        </div>
                        <el-form-item style="text-align: right;">
                            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                            <el-button @click="resetForm('ruleForm2')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import fetch from "../../../assets/api/fetch.js";
export default {
  data() {
    var checkMoney = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("金额不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(parseInt(value))) {
          callback(new Error("请输入数字值"));
        }
        callback();
      }, 500);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        this.getUserPass(value, callback);
      }
    };
    return {
      ruleForm2: {
        czMoney: "",
        pass: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        czMoney: [{ validator: checkMoney, trigger: "blur" }]
      },
      tableData: [
        {
          czTime: "",
          aeraData: "",
          czMoney: ""
        }
      ],
      aeraData: "",
      isCz: true,
      userMsg: {},
      requestNum: 0,
      balanceTotal: 0
    };
  },
  beforeMount() {
    this.userMsg = JSON.parse(localStorage.getItem("userMsg"));
    // this.userMsg.type = 'user';
    // this.userMsg.mod = 'remove';
    // fetch('/shop/removeOrder', 'post', {
    //     userMsg: this.userMsg,
    //     condition: {
    //         'userAccount': {
    //             czMoney: 149
    //         }
    //     }
    // }).then(data =>{
    //     console.log(data);
    // })
    this.getAccountData();
  },
  methods: {
    getAccountData() {
      this.requestNum++;
      fetch("/shop/getUserAccount", "post", {
        type: "user",
        ...this.userMsg
      }).then(data => {
        if (data.msg === "获取数据异常") {
          if (this.requestNum < 5) {
            this.getAccountData();
          }
        } else {
          this.requestNum = 0, this.balanceTotal = 0;
          this.tableData = Object.values(data)[0].userAccount;
          this.tableData.forEach(item => {
            item.czTime = new Date(item.czTime).toLocaleString();
            item.czMoney = item.czMoney + ".00元";
            this.balanceTotal += parseInt(item.czMoney);
          });
          this.tableData = this.tableData.reverse();
        }
      });
    },
    getUserPass(value, callback) {
      this.requestNum++;
      fetch("/shop/getUserAccount", "post", {
        type: "user",
        ...this.userMsg
      }).then(data => {
        if (data.msg === "获取数据异常") {
          if (this.requestNum < 5) {
            this.getUserPass(value, callback);
          }
        } else {
          this.requestNum = 0;
          if (value == Object.values(data)[0].password) {
            callback();
          } else {
            callback(new Error("密码错误"));
          }
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            this.ruleForm2.czMoney = '+' + this.ruleForm2.czMoney;
          this.ruleForm2.aeraData = this.aeraData ? this.aeraData : '-';
          this.ruleForm2.czCode =
            "KY_1314" + Math.floor(Math.random() * 1000000);
          this.ruleForm2.czTime = new Date().getTime();
          fetch("/shop/setUserAccount", "post", {
            type: "user",
            mod: "setAccount",
            userMsg: this.userMsg,
            ruleForm: this.ruleForm2
          }).then(data => {
            this.getAccountData();
            setTimeout(() => {
              this.isCz = true;
            }, 500);
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.aeraData = "";
      this.$refs[formName].resetFields();
    },
    tableRowClassName({ row, rowIndex }) {
        if(row.czTime){
            if(Date.parse(new Date()) - new Date().getTime(row.czTime) < 0){
                return "warning-row";
            }
        }
      return "";
    },
    showCz() {
      this.resetForm("ruleForm2");
      this.isCz = false;
    },
    czOperation() {
      let target = event.target;
      if (target.getAttribute("class") == "zh-czhi") {
        this.isCz = true;
      }
    }
  },
  filters: {
      totalFilter(data){
          return data + '.00元';
      }
  }
};
</script>

<style scoped>
.container {
  background-color: #fff;
  padding: 20px 25px;
}
.con-head {
  padding: 10px 25px;
}
.el-table th {
  font-weight: 500;
  color: red !important;
}
.zh-czhi {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}
.cz-box {
  position: absolute;
  width: 40%;
  height: 46%;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  overflow: hidden;
  padding: 40px 50px 0px 0px;
  border-radius: 4px;
}
.cz-bz {
  padding-left: 40px;
  margin-bottom: 20px;
}
.cz-bz > textarea {
  width: 100%;
  height: 80px;
  padding: 8px 16px;
  box-sizing: border-box;
  outline: none;
  border: 1px solid #c0c4cc;
  border-radius: 4px;
  resize: none;
  color: #444;
}
.zh-balance{
    padding: 15px 20px 0px 0px;
    text-align: right;
}
.zh-balance p{
    font-size: 16px;
    color: #f96868;
}
.zh-balance span{
    font-size: 22px;
}
</style>