<script setup>
// example component
import HorizontalTeamCard from "@/examples/cards/teamCards/HorizontalTeamCard.vue";

// images
import artemis from "@/assets/img/developers/Artemis.jpg";
import jeddy from "@/assets/img/developers/Jeddy.jpg";
import ivana from "@/assets/img/developers/Franklif.jpg";
import marquez from "@/assets/img/developers/hideonshit.jpg";

const urls=["https://github.com/Artemis-Zeus","https://github.com/hikeerer","https://github.com/Franklif1","https://github.com/hideonshit202"]
const ToDevs=(id)=>{
  window.open(urls[id])
}
</script>

<template>
  <section class="pb-5 position-relative bg-gradient-dark mx-n3">
    <div class="container">
      <div class="row">
        <div class="col-md-8 text-start mb-5 mt-5">
          <h3 class="text-white z-index-1 position-relative">
            The Executive Team
          </h3>
          <p class="text-white opacity-8 mb-0">
            There’s nothing I really wanted to do in life that I wasn’t able to
            get good at. That’s my skill.
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-4"
            :image="artemis"
            :profile="{ name: 'Hamilton', link: 'javascript:;' }"
            :position="{ label: '20202031058', color: 'success' }"
            description="Artist is a term applied to a person who engages in an
                    activity deemed to be an art."
            @click="ToDevs(0)"
          />
        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-lg-4 mt-5"
            :image="jeddy"
            :profile="{ name: 'Jeddy', link: 'javascript:;' }"
            :position="{ label: '20202031008', color: 'success' }"
            description="Artist is a term applied to a person who engages in an
                    activity deemed to be an art."
            @click="ToDevs(1)"
          />
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-4 z-index-2"
            :image="ivana"
            :profile="{ name: 'Franklif', link: 'javascript:;' }"
            :position="{ label: '20202031041', color: 'success' }"
            description="Gamer, Britpop fan. Responsible for page Home, Booking List and Booking Details."
            @click="ToDevs(2)"
          />
        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-lg-4 mt-5 z-index-2"
            :image="marquez"
            :profile="{ name: 'Ezio', link: 'javascript:;' }"
            :position="{ label: '20202031069', color: 'success' }"
            description="Artist is a term applied to a person who engages in an
                    activity deemed to be an art."
            @click="ToDevs(3)"
          />
        </div>
      </div>
    </div>
  </section>
</template>
