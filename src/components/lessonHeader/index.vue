<template>
  <div class="lesson_all">
    <p class="title">
      {{title}}
      <span v-if="lessonCount > 0">({{lessonCount}})</span>
    </p>
    <p class="look_all" @click="$emit('click')">查看全部></p>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    lessonCount: {
      type: Number,
      default: 0
    }
  }
};
</script>
<style scoped>
.lesson_all {
  background-color: #fff;
  display: flex;
  flex-direction: row;
  padding: 20rpx;
  align-items: center;
}
.title {
    width: 50%;
    color: #666;
    font-size: 36rpx;
}
.look_all {
    width: 50%;
    text-align: right;
    color: #ccc;
    font-size: 24rpx;
}
</style>