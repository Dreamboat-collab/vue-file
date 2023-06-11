<template>
  <header>
    <div style="width:50%;height: 100%;display: flex;margin:auto;position: relative">
      <a href="" class="nav" style="float: left;width: 10%;">
        <div>
          <img src="logo-removebg-preview.png" style="height: 100%;z-index: 1">
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
      <a href="" class="nav" style="float: right;width: 6%;position: absolute;right: 0">
        <div>
          <img src="account.png" style="height: 60%;">
        </div>
      </a>
    </div>
  </header>

</template>

<style scoped>

* {
  padding: 0;
  margin: 0;
  font-family: HelveticaNeue-Light, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;
  box-sizing: border-box;
}

header {
  position: fixed;
  width: 100%;
  height: 6vh;
  background-color: rgba(33, 33, 33, 0.84);
  z-index: 100;
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
  background: rgba(148, 126, 126, 0.21);
}

.nav_list a {
  display: block;
  color: #b5b5b5;
  text-decoration: none;
  font-weight: bold;
  height: 100%;
  line-height: 6vh;
  font-size: .5vw;
  margin: 0 20px;
}


</style>
<script setup>
</script>
