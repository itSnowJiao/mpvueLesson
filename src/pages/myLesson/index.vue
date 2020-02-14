<template>
  <div class="myLesson">
    <div class="lesson-wrap" v-for="(item,index) in myLessons" :key="index" @click="switchLookLesson(item)">
      <div class="lesson-img">
        <img :src="item.img" alt />
      </div>
      <div class="lesson-text">
        <h5>{{item.title}}</h5>
        <!-- 小程序中的进度条 -->
        <progress :percent="item.progress" border-radius="8" stroke-width="10"></progress>
        <div class="lesson-detail">
          <span v-if="item.lock">完成上个课程自动开启</span>
          <span v-else>已完成 {{item.progress}} %</span>
          <img v-if="item.lock" src="/static/imgs/lock.jpg" alt />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    myLessons() {
      return this.$store.getters.myLesson.mylessons;
    }
  },
  methods: {
      switchLookLesson(item){
          if(item.lock) {
              wx.showToast({
                  title: '已打开视频还未观看',
                  icon: 'none',
                  duration: 2000
              })
              return;
          } else {
              wx.navigateTo({
                  url: '../lookLesson/main'
              })
          }
      }
  }
};
</script>
<style scoped>
.myLesson {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.lesson-wrap {
  display: flex;
  flex-direction: row;
  /* width: 100%; */
  padding: 30rpx;
  background-color: #fff;
  margin-bottom: 30rpx;
}
.lesson-img {
  width: 400rpx;
  height: 200rpx;
}
.lesson-img img {
  width: 100%;
  height: 100%;
  border-radius: 10rpx;
}
.lesson-text {
  margin-left: 30rpx;
  padding: 20rpx;
  width: 70%;
}
.lesson-text h5 {
  margin-bottom: 30rpx;
  font-size: 34rpx;
}
.lesson-detail {
  display: flex;
  flex-direction: row;
  font-size: 24rpx;
  align-items: center;
  color: #ccc;
  margin-top: 10rpx;
}
.lesson-detail span {
  width: 90%;
}
.lesson-detail img {
  width: 10%;
  width: 40rpx;
  height: 40rpx;
  float: right;
}
</style>