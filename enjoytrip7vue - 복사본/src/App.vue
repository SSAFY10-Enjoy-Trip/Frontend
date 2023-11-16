<script setup>
import { RouterView } from 'vue-router'
import LogoBar from './components/LogoBar.vue'
import SidePage from './views/SidPage.vue'
import { ref } from 'vue'

const isLogin = ref(false)

const isLoginChange = (check) => {
  isLogin.value = check
}
</script>

<template>
  <div class="container"></div>

  <div class="row">
    <div class="col-lg-1 col-xl-2"></div>
    <div class="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-8">
      <logo-bar v-bind:isLogin="isLogin" v-on:call-is-login="isLoginChange"></logo-bar>
      <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active" data-bs-interval="10000">
            <img src="./assets/banner1.png" class="d-block w-100" alt="..." />
            <div class="carousel-caption d-none d-md-block">
              <h3 class="suite-bold glow-white">나는 내가 좋아</h3>
              <a class="btn" href="#"
                >Some representative placeholder content for the first slide.</a
              >
            </div>
          </div>
          <div class="carousel-item" data-bs-interval="2000">
            <img src="./assets/banner2.png" class="d-block w-100" alt="..." />
            <div class="carousel-caption d-none d-md-block">
              <h3 class="suite-bold glow-white">나는 내가 좋아</h3>
              <p>Some representative placeholder content for the second slide.</p>
            </div>
          </div>
          <div class="carousel-item">
            <img src="./assets/banner3.png" class="d-block w-100" alt="..." />
            <div class="carousel-caption d-none d-md-block">
              <h3 class="suite-bold glow-white">나는 내가 좋아</h3>
              <p>Some representative placeholder content for the third slide.</p>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    <div class="col-lg-1 col-xl-2"></div>
  </div>

  <div class="row">
    <div class="col-lg-1 col-xl-2"></div>
    <div class="col-12 col-sm-12 col-md-3 col col-lg-3 col-xl-2">
      <side-page></side-page>
    </div>
    <div class="col-12 col-sm-12 col-md-9 col col-lg-7 col-xl-6">
      <!-- <board-main></board-main> -->
      <router-view v-on:call-is-login="isLoginChange" :key="$route.fullPath"></router-view>
      <!-- <RouterView />/ -->
    </div>
    <div class="col-lg-1 col-xl-2"></div>
  </div>
</template>

<style scoped></style>
