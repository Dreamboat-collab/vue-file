<template>
<!--  <vue-main></vue-main>-->
<!--  <user></user>-->
<!--  <loginuser></loginuser>-->
<!--  <userinterface></userinterface>-->
  <router-view ></router-view>
<!--  <flight-page></flight-page>-->
</template>

<script setup>

// import loginuser from "@/components/login-user.vue";
// import user from "@/components/user-interface.vue";
// import userinterface from "@/components/user-interface.vue";
import FlightPage from "@/components/flightPage.vue";
</script>

<style>
#app {
  font-family: HelveticaNeue-Light, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*{
  padding: 0;
  margin: 0;
}
</style>
