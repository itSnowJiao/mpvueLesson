<template>
  <div class="container">
    <img class="img" src="/static/imgs/guide_bg.jpg" alt="背景图片" />
    <button class="btn" open-type="getUserInfo" @getuserinfo="getUserInfo">开始学习</button>
  </div>
</template>

<script>
export default {
  methods: {
    getUserInfo(e) {
      // 判断授权是否成功
      if (e.mp.detail.userInfo) {
        // 获取用户信息
        console.log(e.mp.detail.userInfo);
        // 将用户信息存储到vuex中
        this.$store.dispatch("setIsAuthenticated", true);
        this.$store.dispatch("setUser", e.mp.detail.userInfo);
        // 执行getCode()
        this.getCode();
      }
    },
    // 获取code
    getCode() {
      wx.login({
        success: res => {
          console.log(res);
          this.getOpenid(res.code);
        }
      });
    },
    // 获取openid
    getOpenid(code) {
      // 三个参数 appid secret code
      const appid = "wx4d9aea6116302c64";
      const secret = "618a9573a36b10d0873012974a7a4afd";
      // 加载动画
      wx.showLoading({
        title: "加载中..."
      });
      // 获取数据
      this.$https
        .request({
          url: this.$interfaces.getOpenid + appid + "/" + secret + "/" + code,
          method: "get"
        })
        .then(res => {
          console.log(res);
          // 将openid存储到vuex中
          this.$store.dispatch('setOpenid',res.openid);
          // 请求课程数据
          this.isLearned(res.openid);
        })
        .catch(err => {
          console.log(err);
        });
    },
    isLearned(openid) {
      this.$https.request({
        url: this.$interfaces.getMyLessons + openid,
        method: 'get'
      }).then(res => {
        // console.log('已经测试过了')
        // 存储课程信息
          this.$store.dispatch("setMyLesson", res);
          console.log(res);
        // 有课程，跳转到课程页面
        wx.switchTab({
          url: '../learn/main'
        })
      }).catch(err => {
        // console.log("还没测试")
        // 没有课程，跳转到问题测试页面
        wx.redirectTo({
          url: '../question/main'
        })
      })
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.img {
  width: 100%;
  height: 100%;
}
.btn {
  position: absolute;
  width: 80%;
  left: 10%;
  top: 85%;
  background-color: aqua;
  color: #fff;
}
</style>
