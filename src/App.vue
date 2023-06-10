<template>
<!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
<!--  <index-footer></index-footer>-->
  <loginuser></loginuser>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import IndexFooter from "@/components/IndexFooter";
import loginuser from "@/components/login-user";
export default {
  name: 'App',
  components: {
    // IndexFooter,
    // HelloWorld,
    loginuser,
  }
}
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
