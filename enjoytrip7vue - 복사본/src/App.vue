<script setup>
import { RouterView } from 'vue-router'
import LogoBar from './components/LogoBar.vue'
import MyPage from './views/MyPage.vue'
import { useAuthStore } from '@/store/authStore.js'

const { authStore, logout } = useAuthStore()

const loginStatus = sessionStorage.getItem("isLogin");

sessionStorage.setItem("isLogin", true);

if(loginStatus){
  authStore.isLogin = sessionStorage.getItem("isLogin");
  authStore.name = sessionStorage.getItem("name");
  authStore.profileImageUrl = sessionStorage.getItem("profileImageUrl");

    // 관리자일 경우 권한 설정을 위해
    if(sessionStorage.getItem("role") == "ROLE_SUPERVISOR"){
      authStore.isSupervisor = true;
    }else if(sessionStorage.getItem("role") == "ROLE_MANAGER"){
      authStore.isManager = true;
    }
}else{
  logout()
}
</script>

<template>
  <div class="container"></div>

  <logo-bar></logo-bar>

  <my-page></my-page>

  <router-view :key="$route.fullPath"></router-view>
</template>

<style scoped>
</style>
