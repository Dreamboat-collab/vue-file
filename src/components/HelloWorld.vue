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
  <div class="hello">
    <h3>学习Vue:模板语法</h3>
    <p>{{ message }}</p>
  </div>
  no
  <index-footer></index-footer>
</template>




<style>
* {
  margin: 0;
  padding: 0;
}
</style>
