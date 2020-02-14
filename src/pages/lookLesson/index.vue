<template>
  <div class="myLesson">
    <div class="lesson-head">
      <video
        :src="videoUrl"
        autoplay="false"
        :poster="lessonDetail.img"
        controls
        @ended="playEnd"
        @timeupdate="timeUpdate"
      ></video>
    </div>
    <div class="lesson-content">
      <div
        class="lesson_wrap"
        v-for="(item,index) in lessonDetail.catalogue"
        :key="index"
        @click="handleLesson(item,index)"
      >
        <span v-if="currentIndex == index" class="active"></span>
        <h5>{{item.name}}</h5>
        <img v-if="item.lock" src="/static/imgs/lock.jpg" alt />
        <img v-else src="/static/imgs/icon_r.jpg" alt />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lessonDetail: {},
      videoUrl: "", // 视频播放地址
      currentIndex: 0, // 当前播放项的索引
      duration: 0 // 观看视频的时间
    };
  },
  onLoad() {
    this.getData();
  },
  methods: {
    getData() {
      this.currentIndex = 0;
      this.$https
        .request({
          url: this.$interfaces.getCataLogue,
          method: "get"
        })
        .then(res => {
          console.log(res);
          this.lessonDetail = res;
          this.videoUrl = this.lessonDetail.catalogue[0].url;
          // 设置标题
          wx.setNavigationBarTitle({
            title: res.title
          });
        });
    },
    playEnd() {
      let catalogue = this.lessonDetail.catalogue;
      // 判断是否是最后一个目录视频，如果不是，在上一个视频播放完成后自动跳到下一个视频播放，修改对应的lock和url
      if (this.currentIndex < catalogue.length - 1) {
        this.currentIndex++;
        catalogue[this.currentIndex].lock = false;
        this.videoUrl = catalogue[this.currentIndex].url;
      }
      //   视频播放结束后更新数据
      this.setLearnTime();
    },
    // 在有几个播放后，点击其中一个已经播放的能继续播放。需处理currentIndex和URL
    handleLesson(item, index) {
      if (!item.lock) {
        this.currentIndex = index;
        this.videoUrl = item.url;
      }
    },
    timeUpdate(e) {
      // 获取学习时长，分钟的形式
      this.duration = Math.floor(e.mp.detail.duration / 60);
    },
    // 视频播放后更新时长
    setLearnTime() {
      // 计算今天学习的总时长 = 当前视频时长 + 之前学习时长
      const time =
        this.duration + Number(wx.getStorageSync("learnInfo").minutes);
      wx.setStorage({
        key: "learnInfo",
        data: {
          minutes: time,
          percentage: Math.floor(time / 60 * 100) + "%"
        }
      });
    }
  }
};
</script>
<style scoped>
.myLesson,
.lesson-head {
  width: 100%;
}
.lesson-head video {
  width: 100%;
}
.lesson-content {
  display: flex;
  flex-direction: column;
  padding: 0 40rpx;
}
.lesson_wrap {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 200rpx;
  margin: 40rpx 0;
  background-color: #fff;
  margin: 40rpx 0;
  border-radius: 10rpx;
  box-shadow: 4rpx 4rpx 20rpx #ccc;
}
.lesson_wrap h5 {
  width: 95%;
  color: #666;
  margin-left: 20rpx;
  font-size: 34rpx;
}
.lesson_wrap img {
  width: 50rpx;
  height: 50rpx;
  margin-right: 20rpx;
}
.active {
  position: absolute;
  width: 3rpx;
  height: 180rpx;
  background-color: aqua;
}
</style>