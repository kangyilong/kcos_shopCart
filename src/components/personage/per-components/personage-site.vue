<template>
    <div>
        <div class="container">
            <div class="site-head">
                <el-button type="success" @click="saveSiteClick">添加收货地址</el-button>
            </div>
            <div class="site-con">
                <none-site v-show="isshow.is" :tit='tit'/>
                <ul class="site-list" v-show="!isshow.is">
                    <li 
                      :class="{'set-li': isSelLi && selIndex === index}"
                      v-for="(siteItem, index) in userSiteList" 
                      :key="index" 
                      @click="sliClick(index)"
                    >
                        <div class="site-det">
                            <h5>{{siteItem.name}}</h5>
                            <p class="site-num">{{siteItem.phoneNum}}</p>
                            <p class="site-str">
                                {{siteItem.site}}-{{siteItem.siteDet}}
                            </p>
                        </div>
                        <p class="site-cz">
                            <i class="el-icon-edit" @click="exitSite(siteItem, index)"></i>
                            <i class="el-icon-delete" @click="deleteSite(siteItem, index)"></i>
                        </p>
                    </li>
                </ul>
            </div>
            <div class="add-site" :class="{none: isSaveSite}" @click="addSiteBox">
                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="收货人姓名" prop="name">
                        <el-input type="text" v-model="ruleForm2.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="收货人电话" prop="phoneNum">
                        <el-input type="Number" v-model="ruleForm2.phoneNum" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="所在地区" prop="site">
                        <el-select 
                          v-model="site" 
                          placeholder="请选择" 
                          @click.native="getSelectData"
                          @dblclick.native="changeSelectData" 
                          @change="selSite" 
                          ref="select"
                        >
                          <el-option-group
                            v-for="group in options3"
                            :key="group.label"
                            :label="group.label"
                          >
                            <el-option
                              v-for="item in group.options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-option-group>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="siteDet">
                        <el-input v-model="ruleForm2.siteDet"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                        <el-button @click="resetForm('ruleForm2')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import fetch from "../../../assets/api/fetch.js";
import cityData from '../../../assets/script/city.js';
import noneSite from "./perorder-com/perorderAll-list/noneorder";
export default {
  data() {
      var checkName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入收货人姓名'));
        } else {
          callback();
        }
      };
      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入收货人电话'));
        } else {
          callback();
        }
      };
      var validateSiteDet = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入详细地址'));
        } else {
          callback();
        }
      };
    return {
      isshow: {
        is: false
      },
      tit: "暂无收货地址信息",
      userMsg: {},
      requestNum: 0,
      userSiteList: [],
      ruleForm2: {
        name: '',
        phoneNum: '',
        siteDet: ''
      },
      rules2: {
        name: [
          { validator: checkName, trigger: 'blur' }
        ],
        phoneNum: [
          { validator: validatePhone, trigger: 'blur' }
        ],
        siteDet: [
          { validator: validateSiteDet, trigger: 'blur' }
        ]
      },
      options3: [{
        label: '城市名',
        options: []
      }],
      site: '',
      siteModel: '',
      siteData: '',
      selIndex: 0,
      isSaveSite: true,
      isSelLi: true,
      isExitSite: false,
      selectChild: ''
    };
  },
  beforeMount() {
    this.autoGetSite();
    this.selIndex = parseInt(localStorage.getItem('selIndex'));
    this.userMsg = JSON.parse(localStorage.getItem("userMsg"));
    this.getSiteData(this.userMsg);
  },
  methods: {
    autoGetSite(){
      Object.values(cityData).forEach((item, index) => {
        this.options3[0].options.push({value: item.name, label: item.name});
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid){
          this.ruleForm2.site = this.site;
          this.isSaveSite = true;
          if(this.isExitSite){
            this.exitSiteData(this.userMsg, this.ruleForm2);
          }else{
            this.saveSiteData(this.userMsg, this.ruleForm2);
          }
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getSiteData(userMsg) {
      this.requestNum++;
      fetch("/shop/getUserSite", "post", {
        type: "user",
        ...userMsg
      }).then(data => {
        if (data.msg === "获取数据异常") {
          if (this.requestNum < 5) {
            this.getSiteData(userMsg);
          }
        } else {
          this.requestNum = 0;
          this.userSiteList = Object.values(data)[0].userSite;
          if (this.userSiteList.length > 0) {
            this.isshow.is = false;
          } else {
            this.isshow.is = true;
          }
          this.selUserSite();
        }
      });
    },
    saveSiteData(userMsg, ruleForm) {
      ruleForm.id = new Date().getTime() + Math.floor(Math.random() * 100000);
      fetch('/shop/saveSiteData', 'post', {
        type: 'user',
        mod: 'site',
        userMsg,
        ruleForm
      }).then(data => {
          this.getSiteData(this.userMsg);
      });
    },
    exitSiteData(userMsg, ruleForm){
      this.requestNum ++;
      userMsg.type = 'user';
      userMsg.mod = 'exitSite';
      fetch('/shop/exitSiteData', 'post', {
        userMsg,
        ruleForm
      }).then(data => {
        if(data.msg === '修改异常'){
          if(this.requestNum < 5){
            this.exitSiteData(userMsg, ruleForm);
          }
        }else{
          this.requestNum = 0;
        }
      })
    },
    selSite(){
      let site = this.site;
      this.siteModel = this.site;
      this.site = this.setData + '-' + site;
      if(!this.setData){
        this.site = this.site.substr(1);
      }
    },
    changeSelectData(){
      this.site = '';
      this.siteModel = '';
    },
    getSelectData(){
      this.selectChild = this.$refs.select.$el.firstElementChild.firstElementChild;
      this.setData = this.selectChild.value;
      if(this.setData){
        this.options3[0].options = [];
        this.getWantSite(Object.values(cityData), this.siteModel);
      }else{
        this.options3[0].options = [];
        this.autoGetSite();
      }
    },
    getWantSite(arr, siteData){
      for(let i = 0, len = arr.length; i < len; i ++){
        if(arr[i].name == siteData){
          arr[i].sub.forEach((subItem, index) => {
            this.options3[0].options.push({value: subItem.name, label: subItem.name});
          });
          return;
        }
        if(arr[i].sub == undefined){
          return;
        }
        if(arr[i].name != siteData && arr[i].sub){
          this.getWantSite(arr[i].sub, siteData);
        }
      }
    },
    saveSiteClick(){
      this.site = '';
      this.resetForm('ruleForm2');
      this.isSaveSite = false;
    },
    deleteSite(siteData, index){
      this.requestNum ++;
      let userMsg = this.userMsg;
      let condition = siteData;
      userMsg.type = 'user';
      userMsg.mod = 'remove';
      fetch('/shop/deleteSite', 'post', {
        userMsg,
        condition: {
          'userSite': condition
        }
      }).then(data => {
        if(data.msg === '删除异常'){
          if(this.requestNum < 5){
            this.deleteSite(siteData, index);
          }
        }else{
          this.requestNum = 0;
          this.userSiteList.splice(index, 1);
          this.selIndex = 0;
          this.selUserSite();
        }
      })
    },
    sliClick(index){
      this.selIndex = index;
      localStorage.setItem('selIndex', index);
      this.selUserSite();
    },
    selUserSite(){
      fetch('/shop/selUserSite', 'post', {
        type: 'user',
        mod: 'selSite',
        userMsg: this.userMsg,
        ruleForm: this.userSiteList[this.selIndex]
      }).then( data => {
        
      })
    },
    exitSite(siteData, index){
      this.isSaveSite = false;
      this.isExitSite = true;
      this.site = siteData.site;
      this.ruleForm2 = siteData;
    },
    addSiteBox(){
      let target = event.target;
      if(target.getAttribute('class') === 'add-site'){
        this.isSaveSite = true;
      };
    }
  },
  components: {
    noneSite
  }
}
</script>

<style scoped>
.container {
  background-color: #fff;
  padding: 30px 15px;
}
.site-list {
  margin: 5px auto;
  padding: 15px;
  display: flex;
  flex-wrap: wrap;
}
.site-list > li {
  position: relative;
  width: 23%;
  margin: 1%;
  padding: 20px 6px;
  padding-left: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  transition: all 0.2s;
  cursor: pointer;
}
.site-list > li:hover {
  box-shadow: 1px 10px 10px #eee;
}
.site-list > .set-li{
  border-color: #f56c6c;
}
.site-det > h5 {
  font-weight: 500;
  font-size: 17px;
  margin-bottom: 8px;
}
.site-det > p {
  color: #555;
  font-size: 12px;
  margin-top: 3px;
}
.site-det > .site-num{
  color: #333;
  font-size: 13px;
}
.site-list > li:hover .site-cz {
  opacity: 1;
}
.site-cz {
  position: absolute;
  right: 4%;
  top: 7%;
  opacity: 0;
  transition: all 0.4s;
}
.site-cz > i {
  margin-left: 2px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
}
.add-site{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.6);
}
.el-form{
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    width: 40%;
    height: 56%;
    background-color: #fff;
    padding: 30px 40px 20px 20px;
    box-sizing: border-box;
    overflow: hidden;
    border-radius: 4px;
}
.el-form .el-form-item{
    margin-top: 5px;
    text-align: right;
}
.el-select{
  display: block;
}
.none{
    display: none;
}
</style>

