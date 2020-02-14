<template>
  <div class="lesson-card" @click="switchWebview">
    <div class="img">
      <img :src="img" alt />
    </div>
    <div class="card-text">
      <h5>{{title}}</h5>
      <p>
        <span class="level">{{level}}</span>
        <span class="count">{{count}}人学习</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    img: String,
    title: String,
    level: String,
    count: String,
    url: String
  },
  methods: {
    switchWebview() {
      wx.navigateTo({
        url: `../webview/main?url=${this.url}` // 跳转的路径需要拼接url地址
      });
    }
  }
};
</script>
<style scoped>
.lesson-card {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20rpx 0;
}
.lesson-card .img {
  width: 30%;
  height: 200rpx;
}
.lesson-card .img img {
  width: 100%;
  height: 100%;
  border-radius: 10rpx;
}
.card-text {
  margin-left: 30rpx;
  padding: 20rpx;
  width: 70%;
  border-bottom: 1rpx solid #ccc;
}
.card-text h5 {
  margin-bottom: 30rpx;
}
.level {
  font-size: 30rpx;
  color: orange;
}
.count {
  font-size: 24rpx;
  color: #ccc;
  margin-left: 40rpx;
}
</style>