
<template>
  <div class="hello">
    <h3>学习Vue:模板语法</h3>
    <p>{{message}}</p>
  </div>no
</template>

<script>
import axios from 'axios'
// 为给定 ID 的 user 创建请求
axios.get('localhost:8080/starAirlines/flight')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

export default {
  name:'HelloWorld',
  data() {
    return {
      message:"jeddy"
    }
  }
}
</script>


