<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

const address1 = ref([])
const address2 = ref([])

onMounted(() => {
  axios.get('http://localhost:8080/starAirlines/depart').then((response) => {
    let len=response.data.data.length
    console.log(len)
    let a=[];
    let b=[];
    for (let i=0;i<len;i++){
      if (i%2==0){
        a.push(response.data.data[i])
      }
      else {
        b.push(response.data.data[i])
      }
    }
    address1.value=a;
    address2.value=b;
  });
  console.log(`the Flight is now mounted.`)


})

console.log(address1)
console.log(address2)
</script>

<template>
  <div id="bgFlight">
  </div>
  <div id="flight">
    <span id="titleFlight">Supported Cities</span>
    <span id="sloganFlight">Our airline is committed to providing high-quality aviation services to our customers, constantly opening up new routes to meet their travel needs.</span>
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
</template>

<style scoped>

#bgFlight {
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
  height: 85vh;
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

#flight #titleFlight {
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

#sloganFlight {
  width: 90%;
  font-family: Georgia, serif;
  font-size: 2.5vh;
  position: absolute;
  left: 5%;
  bottom: 5%;
  text-indent: 2em;
  font-weight: bold;
  z-index: 3;
  color: antiquewhite;
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
