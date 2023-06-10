<template>
  <header>
    <div style="width:50%;height: 100%;display: flex;margin:auto">
      <a href="" class="nav" style="float: left;width: 10%;">
        <div>
          <img src="logo.png" style="height: 100%;">
        </div>
      </a>
      <div style="height: 100%;float: left;margin-left: 5%;">
        <ul class="nav_list">
          <li>
            <a href="#">
              FLIGHT
            </a>
          </li>
          <li>
            <a href="#">
              HOTEL
            </a>
          </li>
          <li>
            <a href="#">
              CAR
            </a>
          </li>
          <li>
            <a href="#">
              RECOMMENDATION
            </a>
          </li>
          <li>
            <a href="#">
              ABOUT US
            </a>
          </li>
        </ul>
      </div>
      <a href="" class="nav" style="float: right;width: 6%;margin-left: 10%">
        <div>
          <img src="account.png" style="height: 60%;">
        </div>
      </a>
    </div>
  </header>
  <div style="height:auto;background-color:#000000;">
    <img src="background1.jpg" style="width: 100%;z-index: -1;opacity:0.7;">
  </div>
</template>

<style scoped>

* {
  padding: 0;
  margin: 0;
  font-family: HelveticaNeue-Light, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;
  box-sizing: border-box;
}

header {
  width: 100%;
  height: 60px;
  background-color: #212121;
}

.nav {
  height: 100%;
}

.nav > div {
  height: 100%;
  width: auto;
  justify-content: center;
  align-items: center;
  display: flex;
}

.nav_list {
  height: 100%;
  font-size: .5vw;
}

.nav_list li {
  height: 100%;
  float: left;
  list-style: none;
}

.nav_list li:hover {
  background: #282828;
}

.nav_list a {
  display: block;
  color: #b5b5b5;
  text-decoration: none;
  font-weight: bold;
  height: 100%;
  line-height: 60px;
  font-size: .5vw;
  margin: 0 20px;
}


</style>
<script setup>
</script>
