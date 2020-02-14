<template>
  <div class="lesson">
    <swiper
      indicator-dots="true"
      indicator-color="rgba(0,0,0,.3)"
      indicator-active-color="#17abe3"
      autoplay="true"
      interval="5000"
      circular="true"
    >
      <block v-for="(item,index) in imgUrls" :key="index">
        <swiper-item class="swiper-item">
          <img :src="item" alt />
        </swiper-item>
      </block>
    </swiper>
    <div class="lesson-content">
      <!-- 导航 -->
      <scroll-view class="btn-wrap" scroll-x :scroll-into-view="toChildView" scroll-with-animation>
        <span
          v-for="(item,index) in lessons"
          :key="index"
          :class="{active: currentIndex == index}"
          class="btn-span"
          @click="switchItem(index)"
          :id="item.id"
        >{{item.name}}</span>
      </scroll-view>
      <!-- 内容 -->
      <swiper :style="{height: swiperHeight + 'rpx'}" :current="currentIndex" @change="swiperChange">
        <block v-for="(obj,i) in lessons" :key="i">
          <swiper-item>
            <div v-for="(item,index) in obj.lessons" :key="index">
              <lesson-card
                :title="item.title"
                :img="item.img"
                :count="item.count"
                :level="item.level"
                :url="item.url"
              ></lesson-card>
            </div>
          </swiper-item>
        </block>
      </swiper>
    </div>
  </div>
</template>

<script>
import lessonCard from "../../components/hotLessonCard/index";
export default {
  data() {
    return {
      lessons: [],
      imgUrls: [],
      currentIndex: 0,
      toChildView: "",
      swiperHeight: 240 // 设置默认的一个lessoncard的高度
    };
  },
  components: {
    lessonCard
  },
  onLoad() {
    this.getData();
  },
  methods: {
    getData() {
      this.$https
        .request({
          url: this.$interfaces.getLessons,
          method: "get"
        })
        .then(res => {
          console.log(res);
          this.imgUrls = res.imgUrls;
          this.lessons = res.allLessons;
        //   调用this.updateView
        this.updateView();
        });
    },
    // 点击时给当前项增加active样式
    switchItem(index) {
      this.currentIndex = index;
      // 点击元素，让当前元素在最前面位置
      this.updateView();
    },
    updateView() {
      this.toChildView = this.lessons[this.currentIndex].id;
      //   获取当前项的课程数量
      let length = this.lessons[this.currentIndex].lessons.length;
      // 更改swiperHeight高度
      this.swiperHeight = length * 240;
    },
    // 滑动时改变item项
    swiperChange(e) {
        // console.log(e);
        this.currentIndex = e.mp.detail.current;
        this.updateView();
    }
  }
};
</script>
<style scoped>
.lesson {
  width: 100%;
  height: 100%;
}
.swiper-item {
  width: 100%;
  height: 400rpx;
}
.swiper-item img {
  width: 100%;
  height: 100%;
}
.btn-wrap {
  background-color: #fff;
  white-space: nowrap;
  border-bottom: 1px solid #ebeef5;
}
.btn-wrap .btn-span {
  display: inline-block;
  padding: 0 16px;
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  box-sizing: border-box;
}
.active {
  color: #009eef;
}
</style>