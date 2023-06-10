<script>

import {defineComponent} from "vue";
import IndexHeader from "@/components/IndexHeader.vue";
import IndexFooter from "@/components/IndexFooter.vue";

export default defineComponent({
  components: {IndexFooter, IndexHeader}
})
</script>
<template>
  <index-header></index-header>
  <div id="main"></div>
  <index-footer></index-footer>
</template>




<style>
* {
  margin: 0;
  padding: 0;
}
#main{
  width: 60%;
  height: 70vh;
  background-color: rgba(201, 140, 50, 0.72);
  margin: auto ;
  padding-top: -200px;
}
</style>
