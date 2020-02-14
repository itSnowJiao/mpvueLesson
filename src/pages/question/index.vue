<template>
  <div class="question">
    <img class="qs_bg" src="/static/imgs/test.jpg" alt />
    <div class="qs_content" v-if="questions.length > 0">
      <div v-if="!startQs">
        <p class="title">温馨提示：</p>
        <div class="warn_text">为了您能更好地学习，请首先回答以下问题，以便为您量身定制相关课程.</div>
      </div>
      <div v-else>
        <p class="select_title">{{questions[currentIndex].title}}</p>
        <div
          class="select"
          v-for="(item,index) in questions[currentIndex].option"
          v-bind:key="index"
          v-on:click="selectArr(index)"
        >
          <img v-if="item.select" src="/static/imgs/selected.jpg" alt />
          <img v-else src="/static/imgs/unselect.jpg" alt />
          <span>{{item.label}}</span>
        </div>
      </div>
    </div>
    <button :disabled="disabled" @click="btn_click" class="qs_btn">{{btn_title}}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [],
      startQs: false, // 是否开始答题
      currentIndex: 0, // 记录当前回答到第几题
      btn_title: "开始答题", // 按钮的title
      lesson: "" // 记录提交的问题
    };
  },
  computed: {
    disabled() {
      if (!this.startQs) return false;
      else {
        const option = this.questions[this.currentIndex].option;
        let select = false;

        option.forEach(item => {
          if (item.select) select = true;
        });

        return !select;
      }
    }
  },
  onLoad() {
    this.getData();
  },
  methods: {
    getData() {
      this.$https
        .request({
          url: this.$interfaces.getQuestions,
          method: "get"
        })
        .then(res => {
          console.log(res.questions);
          this.questions = res.questions;
        });
    },
    btn_click() {
      if (!this.startQs) {
        this.startQs = true;
        this.btn_title = "下一题";
      } else {
        // 拼接选择的项
        this.lesson += this.getSelectOption();
        if (this.currentIndex < this.questions.length - 1) {
          this.btn_title = "下一题";
          this.currentIndex++;
          //   拼接逗号
          this.lesson += ",";
          if (this.currentIndex == this.questions.length - 1) {
            this.btn_title = "完成";
          }
        } else {
          // 输出选择的项
          // console.log(this.lesson);
          // 将选择的内容发送到后端接口，获取相关数据
          this.sendSelectOptions();
        }
      }
    },
    selectArr(index) {
      const option = this.questions[this.currentIndex].option;
      // 先将列表中每个选项置为false
      option.forEach(item => {
        item.select = false;
      });
      // 让当前点击的那一个为true
      option[index].select = !option[index].select;
    },
    // 获得选择的项
    getSelectOption() {
      const option = this.questions[this.currentIndex].option;
      let label = "";
      option.forEach(item => {
        if (item.select) label = item.label;
      });
      return label;
    },
    // 向后端发送数据
    sendSelectOptions() {
      this.$https
        .request({
          url: this.$interfaces.myLesson,
          method: "post",
          data: {
            lesson: this.lesson,
            userId: this.$store.getters.openid
          }
        })
        .then(res => {
          console.log(res);
          // 存储课程信息到vuex中
          this.$store.dispatch("setMyLesson", res);
          // 跳转到学习页面
          wx.switchTab({
            url: "../learn/main"
          });
        });
    }
  }
};
</script>

<style scoped>
.question {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.qs_bg {
  width: 100%;
  height: 100%;
}
.qs_content {
  position: absolute;
  width: 80%;
  left: 10%;
  background-color: #fff;
  bottom: 30%;
  border-radius: 10rpx;
}
.title {
  font-size: 36rpx;
  color: #999;
  font-weight: 500;
  padding: 40rpx 40rpx 0 40rpx;
}
.select_title {
  font-size: 36rpx;
  font-weight: 500;
  padding: 40rpx 40rpx 0 40rpx;
}
.warn_text {
  font-size: 32rpx;
  line-height: 50rpx;
  padding: 60rpx;
}
.select img {
  width: 40rpx;
  height: 40rpx;
  margin-right: 16rpx;
}
.select {
  padding: 40rpx 0 40rpx 40rpx;
}
.qs_btn {
  position: absolute;
  width: 80%;
  left: 10%;
  top: 85%;
  background-color: aqua;
  color: #fff;
}
</style>