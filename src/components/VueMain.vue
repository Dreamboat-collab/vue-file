<script setup>

import IndexHeader from "@/components/IndexHeader.vue";
import IndexFooter from "@/components/IndexFooter.vue";
import IndexFlight from "@/components/IndexFlight.vue";
import IndexHotel from "@/components/IndexHotel.vue";



</script>
<template>
  <div id="body">
    <index-header></index-header>
    <div style="height:auto;background-color:#000000;position: relative;">
      <img src="../../public/formal_bg.jpg" id="bg_img">
      <div id="slogan">START YOUR JOURNEY<br><br>WITH US</div>
    </div>
    <index-flight>
    </index-flight>
    <index-hotel></index-hotel>
    <index-footer></index-footer>
    <router-view></router-view>
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
