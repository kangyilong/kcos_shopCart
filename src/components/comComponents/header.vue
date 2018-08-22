<template>
    <div id="der">
        <header>
            <div class="header">
                <el-row>
                    <el-col :span="4" :offset="2">
                      <router-link to="/">
                        <img src="/static/images/all/logo.png" alt="">
                      </router-link>
                    </el-col>
                    <el-col :span="12" :offset="2">
                        <ul class="head-list">
                            <li><router-link to="/">首页</router-link></li>
                            <li><router-link to="/">关于公司</router-link></li>
                            <li><router-link to="/">电子产品</router-link></li>
                            <li><router-link to="/">新闻中心</router-link></li>
                            <li><router-link to="/">加入我们</router-link></li>
                            <li><router-link to="/">联系我们</router-link></li>
                        </ul>
                    </el-col>
                    <el-col :span="2">
                        <div class="head-left">
                            <p class="head-p">
                                <a href="">
                                    <i class="iconfont icon-geren" @click="toPersonage"></i>
                                </a>
                            </p>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </header>
    </div>
</template>

<script>
export default {
  name: "der",
  methods: {
    toPersonage() {
        event.stopPropagation();
        event.preventDefault();
      if (this.$store.state.userState.userStatus) {
        this.$router.push("/personage");
      } else {
        this.$alert("还未登录，请登录", "温馨提示", {
          confirmButtonText: "确定"
        }).then(() => {
          setTimeout(() => {
            this.$router.push('/login');
          }, 100);
        });
      }
    }
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
  height: 97%;
  box-sizing: border-box;
}
.head-list > li > a:hover {
  transition: all 0.5s;
  font-size: 16px;
  border-bottom: 3px solid #fff;
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
.head-p > a {
  margin-left: 50px;
  font-size: 18px;
  color: #ccc;
}
.head-p > a:hover i {
  font-size: 17px;
}
</style>