<template>
  <nav class="navbar navbar-expand-lg mb-3 navbar-custom">
    <div class="container-fluid">
      <router-link to="/" class="nav-link">
        <img src="../assets/logo.png" alt="" style="height: 60px" />
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
        <ul class="navbar-nav ms-5 mb-2 mb-lg-0">
          <!-- 이미지 noProfile.png, userProfileImageUrl -->
          <!-- 로그아웃, 로그인 중 한개가 베타적으로 보이도록 -->
          <li class="nav-item" v-show="authStore.isLogin">
            <a class="nav-link suite-extrabold" @click="hereLogout"
              >{{ authStore.name }} 로그아웃
            </a>
          </li>
          <li class="nav-item" v-show="!authStore.isLogin">
            <router-link to="/login" class="nav-link suite-extrabold">로그인</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/store/authStore.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const { authStore, logout } = useAuthStore()

const hereLogout = () => {
  logout()
  router.replace('/')
}
</script>

<style scoped>
table {
  border: 1px solid #000;
  border-radius: 6px;
  font-family: 'SUITE-Regular';
}

@font-face {
  font-family: 'JalnanGothic';
  src: url('@/assets/fonts/JalnanGothicTTF.ttf');
}
@font-face {
  font-family: 'SUITE-Regular';
  src: url('@/assets/fonts/SUITE-Regular.ttf');
}
h1 {
  font-family: 'JalnanGothic';
}
.navbar-custom {
  background: linear-gradient(to top left, #f5f8f7, #ffffff);
}
</style>
