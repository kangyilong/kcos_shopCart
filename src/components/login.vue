<template>
    <div id="userLogin">
        <div class="container">
          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="賬號" prop="userName">
              <el-input type="text" v-model="ruleForm2.userName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button :plain="true" type="primary" @click="submitForm('ruleForm2')">提交</el-button>
              <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
          </el-form>
          <p class="title">還未註冊？ -> <a @click="toRegister">去註冊</a></p>
        </div>
    </div>
</template>

<script>
import fetch from "../assets/api/fetch.js";
export default {
  data() {
    let validateTxt = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入賬號"));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        userName: "",
        password: ""
      },
      rules2: {
        userName: [{ validator: validateTxt, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      },
      fromPath: "",
      requestNum: 0
    };
  },
  beforeRouteEnter(to, from, next) {
    let path = from.path;
    if(path === '/register' || path === '/'){
      path = '/personage';
    }
    localStorage.setItem("toPath", path);
    next();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let formData = this.ruleForm2;
          formData = {
            type: "user",
            ...formData
          };
          this.yzlogin(formData);
        } else {
          return false;
        }
      });
    },
    yzlogin(formData) {
      if(!localStorage.getItem('userMsg')){
        this.requestNum ++;
        fetch("/shop/login", "post", formData).then(data => {
          if (data.msg !== "获取数据异常") {
            if (data.tit !== "查无此人") {
              let userData = Object.values(data)[0];
              let userMsg = JSON.stringify({
                userName: userData.userName,
                userId: userData.userId
              });
              this.$store.commit("changeUserState", true);
              localStorage.setItem("userStatus", true);
              localStorage.setItem("userMsg", userMsg);
              localStorage.setItem('loginkey', new Date().getTime());
              this.$router.push(localStorage.getItem("toPath"));
            } else {
              alert("该账号还未注册！");
            }
          } else {
            if (this.requestNum < 3) {
              this.yzlogin(formData);
            }
          }
        });
      }else{
        this.$message({
          message: '请先退出后登录！',
          type: 'warning'
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toRegister() {
      event.preventDefault();
      this.$router.push("/register");
    }
  }
};
</script>

<style scoped>
.container {
  width: 88%;
  margin: 0 auto;
}
.demo-ruleForm {
  width: 50%;
  margin: 80px auto;
  margin-bottom: 0px;
}
.el-form-item {
  margin-bottom: 22px;
}
.title {
  font-size: 17px;
  color: #333;
  width: 50%;
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

