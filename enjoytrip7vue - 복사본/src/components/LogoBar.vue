<template>
  <nav class="navbar navbar-expand-lg bg-light mb-3">
    <div class="container-fluid">
      <router-link to="/" class="nav-link">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxtomcAhqHu3X2B8Haxa3bK3mXFYqhMtDYJg&usqp=CAU"
          alt=""
          style="height: 24px"
        />
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
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
        <ul class="navbar-nav ms-5 mb-2 mb-lg-0">
          <!-- 이미지 noProfile.png, userProfileImageUrl -->
          <!-- 로그아웃, 로그인 중 한개가 베타적으로 보이도록 -->
          <li class="nav-item" v-show="isLogin">
            <a class="nav-link" @click="logout"> 로그아웃 </a>
          </li>
          <li class="nav-item" v-show="!isLogin">
            <router-link to="/login" class="nav-link">로그인</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();


defineProps(['isLogin'])
const emit = defineEmits([
  'call-is-login'
])

const logout = async () => {
  try {
    await axios.get('http://localhost:8080/axios/logout') // 이미 javascript 객체
    sessionStorage.setItem('login', 'fail');
    emit('call-is-login', false);
    router.push('/login');
  } catch (error) {
    console.error(error)
  }
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
</style>
