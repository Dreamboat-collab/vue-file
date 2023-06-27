<script setup>
import {onMounted, onUnmounted} from "vue";

//image
import bg0 from "@/assets/img/bg.jpg";

//dep
import Typed from "typed.js";

//sections
import Information from "../Sections/AboutInformation.vue";
import AboutTeam from "../Sections/AboutTeam.vue";
import Newsletter from "../Sections/AboutNewsletter.vue";
import IndexHeader1 from "@/components/indexHeader1.vue";
import IndexFooter1 from "@/components/indexFooter1.vue";
import router from "@/router";
import {ElMessageBox} from "element-plus";

const body = document.getElementsByTagName("body")[0];
//hooks
onMounted(() => {
  body.classList.add("about-us");
  body.classList.add("bg-gray-200");

  if (document.getElementById("typed")) {
    // eslint-disable-next-line no-unused-vars
    var typed = new Typed("#typed", {
      stringsElement: "#typed-strings",
      typeSpeed: 90,
      backSpeed: 90,
      backDelay: 200,
      startDelay: 500,
      loop: true,
    });
  }
});

onUnmounted(() => {
  body.classList.remove("about-us");
  body.classList.remove("bg-gray-200");
});
const toLogin=()=>{
  router.push({path: '/login'})
}
const alertNum=()=>{
  ElMessageBox.alert('+86 114 5141 9198', 'Our common WeChat account is:', {
    confirmButtonText: 'Confirm',
    type: 'success'
  })
  setTimeout(() => {
    ElMessageBox.close();
  }, 5000);
}



</script>
<template>
  <index-header1/>
  <header class="bg-gradient-dark">
    <div class="page-header" :style="{ backgroundImage: `url(${bg0})` }" style="height: 75vh;width: 100%;background-repeat: no-repeat;background-size: cover">
      <span style="height: 75vh;width: 100vw"></span>
      <div class="container1" style="height: 30vh;padding-top: 20vh;">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center mx-auto my-auto">
            <h1 class="text-white">
              About <span class="text-white" id="typed"></span>
            </h1>
            <div id="typed-strings">
              <h1>team</h1>
              <h1>design</h1>
              <h1>target</h1>
            </div>
            <p class="lead mb-4 text-white opacity-8">

              We are committed to giving you better aviation services.
            </p>
            <button type="submit" class="btn bg-white text-dark" @click="toLogin">
              Create Account
            </button>
            <h4 class="text-white mb-2 mt-5">Find us on</h4>
            <div class="d-flex justify-content-center">
              <a href="javascript:;" @click="alertNum()"
                ><i class="fab fa-weixin text-lg text-white me-4"></i
              ></a>
              <a href="#end"
                ><i class="fab fa-qq text-lg text-white me-4"></i
              ></a>
              <a href="#team"
                ><i class="fab fa-github text-lg text-white me-4"></i
              ></a>
              <a href="javascript:;"
                ><i class="fab fa-google text-lg text-white"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6"  style="margin-top: -10vh">
    <Information />
    <AboutTeam id="team"/>
    <Newsletter />
  </div>
  <index-footer1 id="end"/>
</template>
