<script setup>
// eslint-disable-next-line no-undef
defineProps({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  action: {
    type: Object,
    color: String,
    route: String,
    label: String,
    default: () => ({
      color: "bg-gradient-success",
      label: "Find Out More",
    }),
  },
});
</script>
<template>
  <div class="card" style="  border: 1px solid;
  border-image: linear-gradient(#ffffff,#dcdcdc ,#b2b2b2) 10;">
    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2" style="margin-top: 1vh;border-radius:1vh;overflow: hidden">
      <a :href="action.route" class="d-block blur-shadow-image">
        <img :src="image" :alt="title" class="img-fluid border-radius-lg" />
      </a>
    </div>
    <div class="card-body text-center">
      <h5 class="font-weight-normal">
        <a href="javascript:;">{{ title }}</a>
      </h5>
      <p class="mb-0" style="text-align: left;text-indent: 1em">
        {{ description }}
      </p>
    </div>
  </div>
</template>
