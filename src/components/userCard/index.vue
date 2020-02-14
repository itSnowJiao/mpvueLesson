<template>
  <div class="user-card" @click="$emit('click')">
    <img :src="icon" alt>
    <span>{{title}}</span>
    <span class="r_icon">
      <span v-if="text" class="detail">{{text}}</span>
      <img src="/static/imgs/icon_r.jpg" alt>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    icon: String,
    title: String,
    text: String
  }
};
</script>
<style>
.user-card {
  padding: 10px 0 10px 16px;
  box-sizing: border-box;
  border-bottom: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  font-size: 15px;
}
.user-card img {
  width: 26px;
  height: 26px;
  margin-right: 16px;
  float: left;
}
.user-card .detail {
  font-size: 12px;
  color: #8fc31f;
  padding: 0 5px;
  background-color: #eee;
  border-radius: 20px;
  margin-right: 10px;
}
.r_icon {
  font-size: 16px;
  color: #aaa;
  float: right;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.r_icon img {
  width: 20px;
  height: 20px;
}
</style>