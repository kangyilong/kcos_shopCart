<template>
    <div id="userRegister">
        <header>
            <div class="header">
                <div class="head-box">
                    <a href="/">
                        <img src="/static/images/index/logo.png" alt="">
                    </a>
                    <span></span>
                    <p>会员注册</p>
                </div>
            </div>
        </header>
        <div class="container">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户姓名" prop="userName">
                <el-input type="text" v-model="ruleForm2.userName" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="用户密码" prop="password">
                <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱地址" prop="email">
                <el-input type="email" v-model="ruleForm2.email" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">注 册</el-button>
                <el-button @click="resetForm('ruleForm2')">重 置</el-button>
              </el-form-item>
            </el-form>
            <p class="title">已有賬號？ -> <a @click="toLogin">去登錄</a></p>
        </div>
        <footer></footer>
    </div>
</template>

<script>
import fetch from "../assets/api/fetch";
export default {
  name: "userRegister",
  data() {
    var validateTxt = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        //验证用户名
        this.getUserMsg(value, callback);
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        userName: "",
        password: "",
        checkPass: "",
        email: "",
        requestNum: 0
      },
      rules2: {
        userName: [{ validator: validateTxt, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }]
      }
    };
  },
  methods: {
    getUserMsg(value, callback){
      this.requestNum ++;
      fetch("/shop/verifyMsg", "post", {
        type: "user",
        userName: value
      }).then(req => {
        if(req.msg === '获取数据异常'){
          if(this.requestNum < 5){
            this.getUserMsg(value, callback);
          }
        }else{
          this.requestNum = 0;
          if (req.tit === "查无此人") {
            callback();
          } else {
            callback(new Error("用户名已被使用"));
          }
        }
      });
    },
    submitForm(formName) {
      let random =  Math.floor(Math.random() * 100000);
      this.$refs[formName].validate(valid => {
        if (valid) {
          let formData = this.ruleForm2;
          formData = {
            type: "user",
            userId: "KY_" + new Date().getTime() + random,
            userSite: [],
            userSetSite: [],
            shopCart: [],
            userCollect: [],
            userDoneOrder: [],
            userWillDoneOrder: [],
            userOffOrder: [],
            ...formData
          };
          // 发送注册请求
          fetch("/shop/register", "post", formData).then(req => {
            if(req.msg === '添加成功'){
              this.$router.push('/login');
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toLogin(){
      event.preventDefault();
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
#userLogin {
  background: #f5f5f5;
  height: 100%;
}
.header {
  width: 100%;
  height: 60px;
  line-height: 60px;
  padding: 0 10%;
  background: #fff;
  box-sizing: border-box;
}
.head-box {
  display: flex;
  flex-direction: row;
}
.head-box img {
  margin-top: 6px;
}
.head-box > span {
  margin: 0 15px;
  display: block;
  width: 5px;
  height: 30px;
  margin-top: 12px;
  background: #ddd;
}
.head-box > p {
  font-size: 18px;
  color: #333;
}
.container {
  width: 40%;
  margin: 100px auto;
}
.title {
  font-size: 17px;
  color: #333;
  text-align: right;
  margin: 0 auto;
  padding-right: 1%;
}
.title>a{
  color: #337ab7;
  font-size: 18px;
  cursor: pointer;
}
</style>