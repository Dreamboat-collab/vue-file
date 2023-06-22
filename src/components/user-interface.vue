<script setup>
import IndexHeader from "@/components/IndexHeader.vue";
import IndexHeader1 from "@/components/indexHeader1.vue";
import IndexFooter from "@/components/IndexFooter.vue";
// 图标
import "@/assets/CSS/font-awesome-5.15.2.all.css";
import "@/assets/CSS/tiktok.css";
import "@/assets/CSS/style.css";
import "@/assets/CSS/style1.css";
import "@/assets/CSS/style2.css";
import "@/assets/CSS/style3.css";
import "@/assets/CSS/style4.css";
import "@/assets/CSS/style5.css";
import "@/assets/CSS/style6.css";
import "@/assets/CSS/style7.css";

import { ref } from 'vue'
import IndexFooter1 from "@/components/indexFooter1.vue";
// 用户信息
const activeIndex = ref('1')
// const activeIndex2 = ref('1')
// const handleSelect = (string, string[]) => {
//   console.log(key, keyPath)}

</script>

<template>
  <index-header1></index-header1>
  <div class="card" style="margin-bottom: 0px">
    <div class="section">
      <div class="pic">
        <img src="@/assets/images/Jeddy.jpg" alt="图片加载错误！">
      </div>
      <div class="name">Jeddy</div>
      <div class="tag">1556782359@qq.com</div>
    </div>

    <div class="bottom-section">
      <div class="social-media">
        <a href="#"><i class="fab fa-facebook"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
        <a href="#"><i class="fab fa-instagram"></i></a>
      </div>
<!--      <div class="videos">190<span>视频</span></div>-->
<!--      <div class="border"></div>-->
<!--      <div class="subscribers">240k<span>订阅</span></div>-->
<!--      <div class="border"></div>-->
<!--      <div class="videws">7.3M<span>图片</span></div>-->
    </div>
  </div>

<!--用户信息-->
  <div style="margin-bottom: 50px">
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
    >
      <el-menu-item index="1">Account Information</el-menu-item>
      <el-menu-item index="2">Order Information</el-menu-item>
      <el-menu-item index="3">Alter Password</el-menu-item>
    </el-menu>
  </div>

<!--  <div class="dashboard-list">-->
<!--    <h3>Profile Details</h3>-->
<!--    <div class="dashboard-message contact-2 bdr clearfix">-->
<!--      <div class="row">-->
<!--        <div class="col-lg-3 col-md-3">-->
<!--          &lt;!&ndash; Edit profile photo &ndash;&gt;-->
<!--          <div class="edit-profile-photo">-->
<!--            <img src="img/avatar/avatar-6.jpg" alt="profile-photo" class="img-fluid">-->
<!--            <div class="change-photo-btn">-->
<!--              <div class="photoUpload">-->
<!--                <span><i class="fa fa-upload"></i></span>-->
<!--                <input type="file" class="upload">-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="col-lg-9 col-md-9">-->
<!--          <form action="#" method="GET" enctype="multipart/form-data">-->
<!--            <div class="row">-->
<!--              <div class="col-lg-6 col-md-6">-->
<!--                <div class="form-group name">-->
<!--                  <label>Your Name</label>-->
<!--                  <input type="text" name="name" class="form-control" placeholder="John Deo">-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="col-lg-6 col-md-6">-->
<!--                <div class="form-group email">-->
<!--                  <label>Your Title</label>-->
<!--                  <input type="text" name="title" class="form-control" placeholder="Your Title">-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="col-lg-6 col-md-6">-->
<!--                <div class="form-group subject">-->
<!--                  <label>Phone</label>-->
<!--                  <input type="text" name="phone" class="form-control" placeholder="Phone">-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="col-lg-6 col-md-6">-->
<!--                <div class="form-group number">-->
<!--                  <label>Email</label>-->
<!--                  <input type="email" name="email" class="form-control" placeholder="Email">-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="col-lg-12 col-md-12 col-sm-12">-->
<!--                <div class="form-group message">-->
<!--                  <label>Personal info</label>-->
<!--                  <textarea class="form-control" name="message" placeholder="Personal info"></textarea>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </form>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->


<!--反转卡片!!-->
  <div class="wrapper">
    <div class="cols">
      <div class="col" ontouchstart="this.classList.toggle('hover');">
        <div class="container">
          <div class="front">
            <div class="inner">
              <p>Diligord</p>
              <span>Lorem ipsum</span>
            </div>
          </div>
          <div class="back">
            <div class="inner">
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias cum repellat velit quae suscipit c.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col" ontouchstart="this.classList.toggle('hover');">
        <div class="container">
          <div class="front1">
            <div class="inner">
              <p>Rocogged</p>
              <span>Lorem ipsum</span>
            </div>
          </div>
          <div class="back">
            <div class="inner">
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias cum repellat velit quae suscipit c.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col" ontouchstart="this.classList.toggle('hover');">
        <div class="container">
          <div class="front2">
            <div class="inner">
              <p>Strizzes</p>
              <span>Lorem ipsum</span>
            </div>
          </div>
          <div class="back">
            <div class="inner">
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias cum repellat velit quae suscipit c.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col" ontouchstart="this.classList.toggle('hover');">
        <div class="container">
          <div class="front3">
            <div class="inner">
              <p>Clossyo</p>
              <span>Lorem ipsum</span>
            </div>
          </div>
          <div class="back">
            <div class="inner">
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias cum repellat velit quae suscipit c.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col" ontouchstart="this.classList.toggle('hover');">
        <div class="container">
          <div class="front4">
            <div class="inner">
              <p>Rendann</p>
              <span>Lorem ipsum</span>
            </div>
          </div>
          <div class="back">
            <div class="inner">
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias cum repellat velit quae suscipit c.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col" ontouchstart="this.classList.toggle('hover');">
        <div class="container">
          <div class="front5">
            <div class="inner">
              <p>Reflupper</p>
              <span>Lorem ipsum</span>
            </div>
          </div>
          <div class="back">
            <div class="inner">
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias cum repellat velit quae suscipit c.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col" ontouchstart="this.classList.toggle('hover');">
        <div class="container">
          <div class="front6">
            <div class="inner">
              <p>Acirassi</p>
              <span>Lorem ipsum</span>
            </div>
          </div>
          <div class="back">
            <div class="inner">
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias cum repellat velit quae suscipit c.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col" ontouchstart="this.classList.toggle('hover');">
        <div class="container">
          <div class="front7" >
            <div class="inner">
              <p>Sohanidd</p>
              <span>Lorem ipsum</span>
            </div>
          </div>
          <div class="back">
            <div class="inner">
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias cum repellat velit quae suscipit c.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <index-footer1></index-footer1>
  <router-view ></router-view>
</template>

<style>
  .el-menu-demo .el-menu-item{
    padding-left: 40px !important;
    padding-right: 40px !important;/* 设置菜单项的右边距 */
  }
  .el-menu-demo{
    justify-content: center; /* 在水平方向上居中 */
    align-items: center; /* 在垂直方向上居中 */
    //display:flexible;
  }
</style>
