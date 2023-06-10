<template>
  <footer>
    <div class="foot">
      <ul>
        <li>About us
          <ul>
            <li>Company Introduction</li>
            <li>Develop Team</li>
            <li>Project Description</li>
          </ul>
        </li>
        <li>Contact us
          <ul>
            <li>1209233513@qq.com</li>
            <li>1556782359@qq.com</li>
            <li>291923642@qq.com</li>
            <li>1055818575@qq.com</li>
          </ul>
        </li>
        <li>HELP
          <ul>
            <li>Supported locations</li>
            <li>Supported hotels</li>
            <li>Supported cars</li>
            <li>Supported Services</li>
          </ul>
        </li>


      </ul>
      <ul style="padding-bottom: 20px;" id="contact">
        <li style="width: 100%">Feedback
          <ul>
            If you have any problems in use, welcome to visit our feedback interface to make suggestions for our
            project.
            <a href="https://github.com/hikeerer/vue-file/issues">
              <li style="padding-top: 10px;font-weight: bold;"><img src="code.png"
                                                                    style="width: 40px;vertical-align: middle;padding-right: 10px">Front-end
                project : https://github.com/hikeerer/vue-file/issues<br></li>
            </a> <a href="https://github.com/Artemis-Zeus/star_airlines/issues">
            <li style="padding-top: 10px;font-weight: bold;"><img src="code.png"
                                                                  style="width: 40px;vertical-align: middle;padding-right: 10px">Back-end
              project : https://github.com/Artemis-Zeus/star_airlines/issues<br></li>
          </a></ul>
        </li>
      </ul>
      <ul style="width: 50%;margin: auto;height: 280px;padding: 0px">
        <br>
        <li style="font-size: 20px;font-weight: bold;width: 100%">
          Learn more about our developers
          <ul id="developer">
            <li><a href="https://github.com/Artemis-Zeus">
              <div class="box"><img src="Artemis.jpg"></div>
              <br>Artemis<br>20202031058</a></li>
            <li><a href="https://github.com/hikeerer">
              <div class="box" id="yellow"><img src="Jeddy.jpg"></div>
              <br>Jeddy<br>20202031008</a>
            </li>
            <li><a href="https://github.com/hideonshit202">
              <div class="box" id="red"><img src="hideonshit.jpg"></div>
              <br>Ezio<br>20202031069</a>
            </li>
            <li><a href="https://github.com/Franklif1">
              <div class="box" id="pink"><img src="Franklif.jpg"></div>
              <br>Franklif<br>20202031041</a>
            </li>
          </ul>
        </li>
      </ul>

      <ul style="text-align: center;height: auto;color: #979797;border-bottom: none;font-weight: normal;padding: 10px 0;font-size: 15px">
        Developed by the Star Airlines project team
      </ul>
    </div>

  </footer>

</template>

<style scoped>

footer {
  width: 100%;
  height: 750px;
  background-color: #333333;
}

.foot > ul {
  list-style: none;
  height: 170px;
  width: 50%;
  margin: auto;
  padding: 20px 0;
  color: white;
  font-size: 17px;
  font-weight: bold;
  border-bottom: 1px solid #545454;
}

.foot > ul > li {
  float: left;
  width: 33%;
  padding: 10px 0;

}

.foot > ul > li > ul {
  padding-top: 10px;
  color: #a9a9a9;
  font-weight: normal;
  font-size: 14px;
}

.foot > ul > li > ul li {
  padding-top: 8px;
  list-style: none;
}

.foot a {
  text-decoration: none;
  color: #a9a9a9;
}

#developer {
  width: 100%;
}

#developer > li {
  width: 25%;
  float: left;
  overflow: hidden;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  line-height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}


#developer div {
  position: relative;
  background: rgba(0, 0, 0, 0.75);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

#developer img {
  width: 94%;
  border-radius: 50%;
  z-index: 2;
}


.box::before {
  width: 150px;
  height: 150px;
  content: '';
  position: absolute;
  background-image: conic-gradient(transparent, transparent, transparent, #1f67ff);
  animation: animate 4s linear infinite;
}

.box::after {
  width: 150px;
  height: 150px;
  content: '';
  position: absolute;
  background-image: conic-gradient(transparent, transparent, transparent, #1f67ff);
  animation: animate 4s linear infinite;
  animation-delay: -2s;
}

#yellow::before {
  background-image: conic-gradient(transparent, transparent, transparent, #ffcb1f);
}

#yellow::after {
  background-image: conic-gradient(transparent, transparent, transparent, #ffcb1f);
}

#red::before {
  background-image: conic-gradient(transparent, transparent, transparent, #ff1f1f);
}

#red::after {
  background-image: conic-gradient(transparent, transparent, transparent, #ff1f1f);
}

#pink::before {
  background-image: conic-gradient(transparent, transparent, transparent, #ff749e);
}

#pink::after {
  background-image: conic-gradient(transparent, transparent, transparent, #ff749e);
}

@keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(300deg);
  }
  60% {
    transform: rotate(320deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
<script setup>
</script>
