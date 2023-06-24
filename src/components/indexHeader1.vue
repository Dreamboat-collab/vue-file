<script setup>
import {onMounted} from 'vue';
import axios from "axios";
import router from '@/router';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'wowjs/css/libs/animate.css'
import '@/assets/CSS/fontawesome-all.min.css';
import '@/assets/CSS/flaticon.css';
import '@/assets/CSS/jquery-ui.css';
import '@/assets/CSS/default.css';
import '@/assets/CSS/styleFlight.css';
import '@/assets/CSS/responsive.css';
import "@/assets/js/jquery-ui.min.js";

onMounted(() => {

// 这里是原来的 JavaScript 代码 main1.js
  (function ($) {
    "use strict";

    /*=============================================
              =    		Mobile Menu			      =
          =============================================*/
//SubMenu Dropdown Toggle
    if ($('.menu-area li.menu-item-has-children ul').length) {
      $('.menu-area .navigation li.menu-item-has-children').append('<div class="dropdown-btn"><span class="fas fa-angle-down"></span></div>');

    }

//Mobile Nav Hide Show
    if ($('.mobile-menu').length) {

      var mobileMenuContent = $('.menu-area .main-menu').html();
      $('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);

      //Dropdown Button
      $('.mobile-menu li.menu-item-has-children .dropdown-btn').on('click', function () {
        $(this).toggleClass('open');
        $(this).prev('ul').slideToggle(500);
      });
      //Menu Toggle Btn
      $('.mobile-nav-toggler').on('click', function () {
        $('body').addClass('mobile-menu-visible');
      });

      //Menu Toggle Btn
      $('.menu-backdrop, .mobile-menu .close-btn').on('click', function () {
        $('body').removeClass('mobile-menu-visible');
      });
    }

    /*=============================================
              =     Menu sticky & Scroll to top      =
          =============================================*/
    $(window).on('scroll', function () {
      var scroll = $(window).scrollTop();
      if (scroll < 245) {
        $("#sticky-header").removeClass("sticky-menu");
        $('.scroll-to-target').removeClass('open');

      } else {
        $("#sticky-header").addClass("sticky-menu");
        $('.scroll-to-target').addClass('open');
      }
    });

    /*=============================================
              =    		 Scroll Up  	         =
          =============================================*/
    if ($('.scroll-to-target').length) {
      $(".scroll-to-target").on('click', function () {
        var target = $(this).attr('data-target');
        // animate
        $('html, body').animate({
          scrollTop: $(target).offset().top
        }, 1000);

      });
    }

    /*=============================================
              =    	   Toggle Active  	         =
          =============================================*/
    $('.flight-detail-wrap').slideUp();
    $('.detail').on('click', function () {
      $(this).toggleClass('show');
      $(this).parent().parent().parent().parent().find('.flight-detail-wrap').slideToggle();
    });


    /*=============================================
              =    	 Slider Range Active  	         =
          =============================================*/
    $("#slider-range").slider({
      range: true,
      min: 300,
      max: 5500,
      values: [1000, 4500],
      slide: function (event, ui) {
        $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
      }
    });
    $("#amount").val("$" + $("#slider-range").slider("values", 0) + " - $" + $("#slider-range").slider("values", 1));

//for menu active class
    $('.fly-next-nav button, .content-top li, .gender-select ul li').on('click', function (event) {
      $(this).siblings('.active').removeClass('active');
      $(this).addClass('active');
      event.preventDefault();
    });

  })($);
});

// 实现页面跳转
const navigateToAnotherPage1 = () => {
  router.push('/userinfo'); // 替换 '/another-page' 为你想要跳转的实际路由路径
  console.log('true')
};
const navigateToAnotherPage2 = () => {
  router.push('/login'); // 替换 '/another-page' 为你想要跳转的实际路由路径
  console.log('true')
};
const methods = {
  navigateToAnotherPage1,
};

const setJump = () => {
  localStorage.setItem('jump', 1)
}
</script>

<template>
  <html class="no-js" lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>

  <!-- header-area -->
  <header>
    <div id="sticky-header" class="menu-area transparent-header">
      <div class="container custom-container">
        <div class="row">
          <div class="col-12">
            <div class="mobile-nav-toggler"><i class="fas fa-bars"></i></div>
            <div class="menu-wrap">
              <nav class="menu-nav">
                <div class="logo" style="top: 0px !important;">
                  <router-link to="/flight" style="top: 0px" @click="setJump"><img
                      style="top: 0px !important;margin-top: 0px;height: 10vh" src="../assets/logo4.png" alt="">
                  </router-link>
                </div>
                <div class="navbar-wrap main-menu d-none d-lg-flex"
                     style="justify-content: center;justify-items: center"> <!--字体大小 navbar-wrap -->
                  <ul class="navigation">
                    <li class="active">
                      <router-link to="/flight">Home</router-link>
                    </li>
                    <li class="menu-item-has-children"><router-link to="/bklist">Book</router-link>
                      <ul class="submenu">
                        <li><router-link to="/bklist">Booking List</router-link></li>
                        <li><router-link to="/bkdtls">Booking Details</router-link></li>
                      </ul>
                    </li>
                    <li class="menu-item-has-children"><a href="#">Attractions</a>
                    </li>
                    <li>
                      <router-link to="/about">About Us</router-link>
<!--                      <a href="">About Us</a>-->
                    </li>
                    <li id="logo1">
                      <div class="logo1" @click="navigateToAnotherPage1"><img src="../../public/account.png"
                                                                              @click="navigateToAnotherPage1"
                                                                              style="max-width: 35%;"></div>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
            <!-- Mobile Menu  -->
            <div class="mobile-menu">
              <nav class="menu-box">
                <div class="close-btn"><i class="fa-solid fa-xmark"></i></div>
                <div class="nav-logo"><router-link to="/flight"><img src="../assets/logo3.png" alt="" title=""></router-link></div>
                <div class="menu-outer">
                  <!--Here Menu Will Come Automatically Via Javascript / Same Menu as in Header-->
                </div>
              </nav>
            </div>
            <div class="menu-backdrop"></div>
            <!-- End Mobile Menu -->
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- header-area-end -->

  </html>
</template>


<style scoped>

</style>
