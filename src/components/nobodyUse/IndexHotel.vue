<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

let hotelList = ref([])
const addressList = ref([])
const status=ref(1)
let address = [];
let hotels = [];

const update=(id)=>{
  status.value=address.indexOf(id)
}

onMounted(() => {

  axios.get('http://localhost:8080/starAirlines/hotels').then((response) => {
    let len = response.data.data.length
    for (let i = 0; i < len; i++) {
      let index = address.indexOf(response.data.data[i].address)
      if (index != -1) {
        hotels[index].push(response.data.data[i].name)
      } else {
        address.push(response.data.data[i].address)
        hotels.push([response.data.data[i].name])
      }
    }
    hotelList.value = hotels
    addressList.value = address
  });
  console.log(`the Hotel is now mounted.`)
  console.log(hotelList)
})

</script>

<template>
  <div id="bgHotel">
  </div>
  <div id="hotel">
    <el-container id="hotelDisplay">
      <el-aside id="aside">
        <span>Partner City</span>
        <el-button v-for="i in addressList" :key="i.id" class="address" @click="update(i)">{{ i }}</el-button>
      </el-aside>
      <el-container id="right">
        <el-header id="hotelTitle">Partner Hotel/Resort -- {{addressList[status]}}</el-header>
        <el-container>
          <el-main id="mainContainer">
            <li v-for="i in hotelList[status]" :key="i.id">{{i}}</li>
          </el-main>
          <el-button plain id="book_hotel">
            Book Now →
          </el-button>
        </el-container>
      </el-container>
    </el-container>
    <div>
    </div>
  </div>
</template>

<style scoped>

#bgHotel {
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 10vh 0;
  background-image: url('../../../public/resort.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 0;
  filter: blur(3px);
  opacity: 0.7;
}

#hotel {
  position: relative;
  width: 70%;
  height: 85vh;
  border-radius: .2vw;
  overflow: hidden;
  margin: -105vh auto 5vh;
  background-color: rgba(0, 0, 0, 0.37);
//color: #171414; box-shadow: rgba(0, 0, 0, 0.29) 10px 10px 5px; z-index: 2;
}

#hotel div {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url("../../../public/resort.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;
  opacity: 0.5;
}

#book_hotel {
  position: absolute;
  background-color: unset;
  z-index: 3;
  color: antiquewhite;
  font-size: 2vh;
  right: 1vw;
  bottom: 1vw;
}

#hotelDisplay {
  position: relative;
  z-index: 10;
  height: 100%;
  color: black;
}

.address:hover {
  background-color: #fff;
}

#aside {
  font-family: Georgia, serif;
  color: antiquewhite;
  font-weight: bold;
  font-size: 1.5vw;
  width: 20%;
  border-right: 1px dashed gray;
}

#aside .address {
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: unset;
  height: 6.7%;
  border-left: unset;
  border-right: unset;
  border-radius: 0;
  font-size: 2vh;
  --el-button-text-color: antiquewhite;
  font-weight: bold;
  font-family: Georgia, serif;

}



#aside .address:last-child {
  border-bottom: unset;

}

#aside span {
  width: 100%;
  display: flex;
  height: 12.9%;
  align-items: center;
  justify-content: center;
}

#hotelTitle{
  display: flex;
  width: 100%;
  color: antiquewhite;
  text-align: center;
  font-weight: bold;
  font-size: 1.5vw;
  line-height: 100%;
  height: 12.9%;
  align-items: center;
  justify-content: center;
}

#mainContainer {
  padding: 0;
  margin: 0;
  width: 100%;
  overflow: hidden;
  color: antiquewhite;
  list-style: none;
}
#mainContainer li{
  font-size: 1.2vw;
  margin-top: 1.1vh;
  font-family: Georgia, serif;
}


</style>
