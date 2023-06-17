<script setup>

// import IndexHeader from "@/components/IndexHeader.vue";
import IndexFooter from "@/components/IndexFooter.vue";
import IndexFlight from "@/components/IndexFlight.vue";
import IndexHotel from "@/components/IndexHotel.vue";
import indexHeader1 from "@/components/indexHeader1.vue";
import router from '@/router';
// import { ref, onBeforeRouteEnter } from 'vue';
// import axios from 'axios';
//
// const isHeaderVisible = ref(false); // 响应式数据用于控制 header 样式的显示
//
// onBeforeRouteEnter(async () => {
//   try {
//     await fetchData(); // 异步加载数据
//     isHeaderVisible.value = true; // 设置数据加载完成后显示完整的 header 样式
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     // 处理加载失败的情况，例如跳转到错误页面
//     router.push('/error');
//   }
// });


</script>
<template>
  <div id="body">
<!--    <index-header></index-header>-->
    <router-view></router-view>
    <index-header1></index-header1>
    <div style="height:auto;background-color:#000000;position: relative;">
      <img src="../../public/formal_bg.jpg" id="bg_img">
      <div id="slogan">START YOUR JOURNEY<br><br>WITH US</div>
    </div>
    <index-flight>
    </index-flight>
    <index-hotel></index-hotel>
    <index-footer></index-footer>
  </div>

</template>


<style>
* {
  margin: 0;
  padding: 0;
}

#body {
  background-color: black;
}

#bg_img {
  width: 100%;
  z-index: -1;
  opacity: .6;
  height: 100vh;

}

#slogan {
  color: #dadada;
  font-size: 6vh;
  position: absolute;
  z-index: 1;
  font-family: Georgia, serif;
  top: 40vh;
  left: 35vw;
}

</style>
