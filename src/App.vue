<template>
  <vue-main></vue-main>
</template>

<script>
import VueMain from "@/components/VueMain.vue";

export default {
  name: 'App',
  components: {
    VueMain
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
