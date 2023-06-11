<script setup>

import {ref} from "vue";
import IndexHeader from "@/components/IndexHeader.vue";
import IndexFooter from "@/components/IndexFooter.vue";
import axios from "axios";

const address1 = ref([])
const address2 = ref([])
axios.get('http://localhost:8080/starAirlines/address').then((response) => {
  address1.value = response.data.data[0]
  address2.value = response.data.data[1]
});
console.log(address1)
console.log(address2)

</script>
<template>
  <div id="body">
    <index-header></index-header>
    <div style="height:auto;background-color:#000000;position: relative;">
      <img src="../../public/formal_bg.jpg" id="bg_img">
      <div id="slogan">START YOUR JOURNEY<br><br>WITH US</div>
    </div>
    <div id="bg2">
    </div>
    <div id="flight">
      <span id="title1">Supported Cities</span>
      <span id="slogan1">Our airline is committed to providing high-quality aviation services to our customers, constantly opening up new routes to meet their travel needs.</span>
      <ul>
        <li v-for="i in address1" :key="i.id">{{ i }}</li>
      </ul>
      <ul>
        <li v-for="i in address2" :key="i.id">{{ i }}</li>
      </ul>
      <el-button plain id="book_flight">
        Book Now →
      </el-button>
      <div>
      </div>
    </div>

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

#bg2 {
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 10vh 0;
  background-image: url('../../public/bg2.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 0;
  filter: blur(3px);
  opacity: 0.7;
}

#flight {
  position: relative;
  width: 70%;
  height: 90vh;
  border-radius: .2vw;
  overflow: hidden;
  margin: -105vh auto 5vh;
  background-color: rgba(0, 0, 0, 0.37);
//color: #171414; box-shadow: rgba(0, 0, 0, 0.29) 10px 10px 5px;
  z-index: 2;
}

#flight div {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("../../public/bg2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;
}

#flight #title1 {
  position: absolute;
  color: white;
  margin-left: 3vw;
  z-index: 3;
  display: block;
  font-size: 2vw;
  font-weight: bold;
  font-family: Georgia, serif;
  padding-top: 1em;
}

#flight li {
  color: antiquewhite;
  font-family: Georgia, serif;
  list-style: none;
  margin: 3.5vh 0;
  font-size: 2vh;
  font-weight: bold;
}

#slogan1 {
  width: 90%;
  font-family: Georgia, serif;
  font-size: 2.5vh;
  position: absolute;
  left: 5%;
  bottom: 7%;
  text-indent: 2em;
  font-weight: bold;
  z-index: 3;
  color: rgba(250, 235, 215, 0.56);
  line-height: 5vh;
  text-align: left;
}

#flight ul {
  position: relative;
  margin-top: 10vh;
  float: left;
  width: 15%;
  z-index: 2;
}
#book_flight{
  position: absolute;
  background-color: unset;
  z-index: 3;
  color: antiquewhite;
  font-size: 2vh;
  right: 1vw;
  bottom: 1vw;
}
</style>
