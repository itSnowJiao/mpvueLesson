<template>
  <div class="mine">
    <div class="user_info">
      <!-- 用户信息 -->
      <img :src="user.avatarUrl" alt>
      <div class="user_detail">
        <h4>{{user.nickName}}</h4>
        <span>{{user.gender == 1 ? '男' : "女"}}</span>
      </div>
    </div>
    <div class="learn_info">
      <!-- 课程信息 -->
      <div class="learn_detail">
        <h4>课程</h4>
        <span>{{myLesson.totalCount}}</span>
      </div>
      <div class="learn_detail">
        <h4>已完成</h4>
        <span>{{myLesson.finishCount}}</span>
      </div>
      <div class="learn_detail">
        <h4>直播订阅</h4>
        <span>{{myLesson.liveCount}}</span>
      </div>
    </div>
    <div class="order_info">
      <userCard icon="/static/imgs/lev.jpg" title="当前学习等级" :text="grade"></userCard>
      <userCard icon="/static/imgs/task.jpg" title="今日学习任务" :text="finish"></userCard>
    </div>
    <div class="order_info">
      <userCard icon="/static/imgs/us.jpg" title="关于我们" @click="handleCell"></userCard>
    </div>
  </div>
</template>
<script>
import userCard from "../../components/userCard/index";
export default {
  data() {
    return {
      grade: "",
      finish: ""
    };
  },
  methods: {
    handleCell() {
      wx.navigateTo({
        url: "../aboutUs/main"
      });
    }
  },
  computed: {
    user() {
      // console.log(this.$store.getters.user);
      return this.$store.getters.user;
    },
    myLesson() {
      // console.log(this.$store.getters.myLesson);
      return this.$store.getters.myLesson;
    }
  },
  components: {
    userCard
  },
  onShow() {
    const learnInfo = wx.getStorageSync("learnInfo");
    this.finish = learnInfo.minutes >= 3 ? "完成" : "未完成";
    this.grade = wx.getStorageSync("grade");
    // console.log(this.grade);
  }
};
</script>
<style>
.user_info {
  background-color: #fff;
  padding: 8px 16px;
  box-sizing: border-box;
  border-bottom: 1px solid #ebeef5;
  border-top: 1px solid #ebeef5;
  display: flex;
  flex-direction: row;
}
.user_info img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
}
.user_detail h4 {
  margin: 10px 0;
  font-weight: bold;
}
.user_detail span {
  color: #aaa;
  font-size: 14px;
}
.learn_info {
  padding: 10px 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-bottom: 1px solid #ebeef5;
}
.learn_info .learn_detail {
  text-align: center;
  flex: 1;
}
.learn_detail span {
  color: #aaa;
  font-size: 14px;
}

.order_info {
  margin-top: 16px;
}
</style>