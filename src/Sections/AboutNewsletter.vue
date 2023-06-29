<script setup>
import {onMounted} from "vue";
//Vue Material Kit 2 components
import MaterialInput from "../components/Materia/MaterialInput.vue";
import MaterialButton from "../components/Materia/MaterialButton.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
import {ElMessageBox} from "element-plus";

onMounted(() => {
  setMaterialInput();
});
const alertNum=()=> {
  ElMessageBox.alert('11451419198@van.com', 'Email', {
    confirmButtonText: 'Confirm',
    showCloseBtn:false,
    showClose:false,
    // type: 'info'//success，error，info和warning
    // callback: action => {
    //   window.location.href = "/login"
    // }
  })
}
</script>
<template>
  <section class="my-5 pt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-6 m-auto">
          <h3>Design & Development</h3>
          <p class="mb-4" style="text-align: left;text-indent: 2em">
            Star Airlines is an emerging airline established in 2023 by a group of young people with aviation dreams.
            Their goal is to build a customer-centric, innovation-driven, low-cost based airline to provide high-quality
            aviation services to China and the world.</p>
          <p class="mb-4" style="text-align: left;text-indent: 2em">
            The founding team of E-surfing Aviation is composed of professionals from different fields, including former
            Singapore Airlines pilot, former Emirates Marketing Director, former Mercedes-Benz aerodynamics expert and
            former Stanford University physics professor, etc. They used their professional knowledge and experience to
            formulate a complete set of development strategies and operating models for Star Airlines.
          </p>
          <div class="row" style="justify-items: center;justify-content: center">
            <div class="col-4 ps-0">
              <MaterialButton
                  variant="gradient"
                  color="success"
                  class="mb-0 h-100 position-relative z-index-2"
                  @click="alertNum"
              >Join Us
              </MaterialButton
              >
            </div>
          </div>
        </div>
        <div class="col-md-5 ms-auto mt-6 md-mt-0">
          <div class="position-relative">
            <img
                class="max-width-50 w-100 position-relative z-index-2"
                src="@/assets/img/end.jpg"
                alt="image"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
