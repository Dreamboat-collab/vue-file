<script setup>
// example components
import DefaultInfoCard from "../examples/cards/infoCards/DefaultInfoCard.vue";
import CenteredBlogCard from "../examples/cards/blogCards/CenteredBlogCard.vue";
</script>
<template>
  <section class="py-7">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <div class="row justify-content-start">
            <DefaultInfoCard
              color="info"
              icon="Efficient"
              title=""
              description="It can satisfy attractions recommendation, air ticket booking and hotel booking at the same time"
            />
            <DefaultInfoCard
              color="info"
              icon="Safe"
              title=""
              description="Every operation will be encrypted transmission, nobody know who you are."
            />
          </div>
          <div class="row justify-content-start mt-4">
            <DefaultInfoCard
              color="info"
              icon="Observant"
              title=""
              description="From the moment you enter the airport, we will take care of you in every possible way."
            />
            <DefaultInfoCard
              color="info"
              icon="Professional"
              title=""
              description="Every order transaction will be carefully saved."
            />
          </div>
        </div>
        <div class="col-lg-4 ms-auto mt-lg-0 mt-6">
          <CenteredBlogCard
            image="https://images.unsplash.com/photo-1544717302-de2939b7ef71?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            title="Book anytime, anywhere"
            description="We are applicable to any device, provide better scenic spot recommendations, and when you have an idea of travel, you can book a ticket and start immediately."
          />
        </div>
      </div>
    </div>
  </section>
</template>
