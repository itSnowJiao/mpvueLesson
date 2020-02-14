<template>
  <scroll-view class="learn" scroll-y>
    <div class="learn-info">
      <img src="/static/imgs/plan.jpg" alt />
      <div class="info-text">
        <h4 class="time">
          已学习
          <span>{{minutes}}</span>分钟
        </h4>
        <p class="progress">
          今日目标已完成
          <span>{{percentage}}</span>
        </p>
      </div>
    </div>
    <div class="my-lesson" v-if="myLessons.length > 0">
      <lesson-header title="我的课程" :lessonCount="lessonCount" @click="switchMyLesson"></lesson-header>
      <div class="lesson-wrap">
        <div class="lesson-scroll">
          <div class="lesson-card" v-for="(lesson,index) in myLessons" :key="index">
            <img :src="lesson.img" alt />
            <span>{{lesson.title}}</span>
          </div>
          <div class="lesson-card" @click="switchMyLesson">
            <img src="/static/imgs/lookall.jpg" alt />
          </div>
        </div>
      </div>
      <div class="start-btn">
        <button @click="lookLesson">进入课程</button>
      </div>
    </div>
    <div class="hot-lesson">
      <lesson-header title="今日最热课程" @click="switchHotLesson"></lesson-header>
      <div v-for="(item,index) in hotLessons" :key="index">
        <lesson-card :title="item.title" :img="item.img" :level="item.level" :count="item.count" :url="item.url"></lesson-card>
      </div>
    </div>
  </scroll-view>
</template>

<script>
import lessonHeader from "../../components/lessonHeader/index";
import lessonCard from "../../components/hotLessonCard/index";
import { formatTime } from "../../utils"; // 解构赋值
export default {
  data() {
    return {
      minutes: 0,
      percentage: "0%",
      lessonCount: 0,
      hotLessons: []
    };
  },
  onLoad() {
    this.getData();
  },
    onShow() {
    this.setLearnInfo();
  },
  computed: {
    myLessons() {
      // 定义一个新的数组用于接收判断数量后的课程
      let lessonsArr = [];
      // 从vuex中获得课程
      const myLessons = this.$store.getters.myLesson.mylessons;
      // 得到课程数量
      this.lessonCount = myLessons.length;
      // 判断课程数量是否大于5，大于5只显示5个，否则全部显示
      const count = myLessons.length > 5 ? 5 : myLessons.length;
      // 遍历数组，将新的数组存储到lessonsArr中
      for (let i = 0; i < count; i++) {
        lessonsArr.push(myLessons[i]);
      }
      // 返回新的数组
      return lessonsArr;
    }
  },
  components: {
    lessonHeader,
    lessonCard
  },
  methods: {
    switchMyLesson() {
      wx.navigateTo({
        url: "../myLesson/main"
      });
    },
    switchHotLesson() {
      wx.switchTab({
        url: "../lesson/main"
      });
    },
    lookLesson() {
      wx.navigateTo({
        url: "../lookLesson/main"
      });
    },
    getData() {
      this.$https
        .request({
          url: this.$interfaces.getHotLessons,
          method: "get"
        })
        .then(res => {
          console.log(res);
          this.hotLessons = res;
        });
    },
        setLearnInfo() {
      let self = this;
      // 获取当前日期 2020-1-10 12:00:00 new Date()
      let date = formatTime(new Date()).split(" ")[0];
      // console.log(date);
      wx.getStorage({
        key: "date",
        success(res) {
          // console.log(res);
          if (res.data != date) self.storageDate(date);
          else {
            // 显示当前数据
            const learnInfo = wx.getStorageSync("learnInfo");
            self.minutes = learnInfo.minutes;
            self.percentage = learnInfo.percentage;
          }
        },
        fail() {
          // 如果没有时间date 存储
          self.storageDate(date);
        }
      });
    },
    storageDate(date) {
      // 存储当前日期,并将数据初始化
      wx.setStorage({
        key: "date",
        data: date
      });

      wx.setStorage({
        key: "learnInfo",
        data: {
          minutes: 0,
          percentage: "0%"
        }
      });
      this.minutes = 0;
      this.percentage = "0%";
    }
  }
};
</script>
<style scoped>
.learn {
  width: 100%;
  height: 100%;
  background-color: #efefef;
}
.learn-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  box-shadow: 6rpx 6rpx 20rpx #ccc;
  padding: 20rpx;
  border-top: 1rpx solid #efefef;
}
.learn-info img {
  width: 200rpx;
  height: 200rpx;
  margin-right: 20rpx;
}
.info-text .time span {
  color: aqua;
  margin: 0 10rpx;
}
.info-text .progress {
  font-size: 24rpx;
  margin-top: 10rpx;
  color: #999;
}
.info-text .progress span {
  color: aquamarine;
  margin: 0 10rpx;
}
.my-lesson,
.hot-lesson {
  margin-top: 40rpx;
  background-color: #fff;
  padding: 30rpx;
}
.lesson-wrap {
  width: 100%;
  overflow-x: auto;
}
.lesson-scroll {
  max-width: 200%;
  min-width: 100%;
  display: flex;
  flex-direction: row;
}
.lesson-card {
  display: flex;
  flex-direction: column;
  min-width: 120px;
  padding: 10rpx 5rpx;
}
.lesson-card img {
  width: 100%;
  height: 100px;
  border-radius: 5rpx;
}
.lesson-card span {
  font-size: 26rpx;
  color: #333;
}
::-webkit-scrollbar {
  display: none;
}
.start-btn {
  width: 140px;
  height: 40px;
  margin: 20px auto;
}
.start-btn button {
  width: 100%;
  height: 100%;
  color: aqua;
  background-color: #fff;
  box-shadow: 4rpx 4rpx 20rpx #ccc;
  line-height: 40px;
  font-size: 36rpx;
  border-radius: 50rpx;
}
</style>