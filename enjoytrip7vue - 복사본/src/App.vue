<script setup>
import { RouterView } from 'vue-router'
import LogoBar from './components/LogoBar.vue'
import SidePage from './views/SidPage.vue'
import MyPage from './views/MyPage.vue'
import { ref } from 'vue'

const isLogin = ref(false)

const isLoginChange = (check) => {
  isLogin.value = check
}
</script>

<template>
  <div class="container"></div>

  <logo-bar v-bind:isLogin="isLogin" v-on:call-is-login="isLoginChange"></logo-bar>

  <my-page></my-page>

  <router-view v-on:call-is-login="isLoginChange" :key="$route.fullPath"></router-view>
  <!-- <div class="row">
    <div class="col-lg-1 col-xl-2"></div>
    <div class="col-12 col-sm-12 col-md-3 col col-lg-3 col-xl-2">
      <side-page></side-page>
    </div>
    <div class="col-12 col-sm-12 col-md-9 col col-lg-7 col-xl-6"></div>
    <div class="col-lg-1 col-xl-2"></div>
  </div> -->
</template>

<style scoped></style>
