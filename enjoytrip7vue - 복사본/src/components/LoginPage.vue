<template>
  <div class="container row" style="float: none; margin: 100 auto">
    <div class="card text-center col-md-3" style="float: none; margin: 0 auto; width: 18rem">
      <h1>Enjoy Trip</h1>
      <div class="card-body">
        <h5 class="card-title">로그인</h5>
        <div class="input-group input-group-sm mb-3">
          <input
            type="text"
            placeholder="이메일"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            name="email"
            v-model="authStore.email"
          />
        </div>
        <div class="input-group input-group-sm mb-3">
          <input
            type="text"
            placeholder="비밀번호"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            name="password"
            v-model="authStore.password"
          />
        </div>
        <div class="d-grid gap-2 d-md-block">
          <button class="btn btn-primary mx-2" type="button" @click="login">로그인</button>
          <button class="btn btn-outline-secondary mx-2" type="button">
            <router-link to="/register" replace class="nav-link">회원가입</router-link>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import http from '@/common/axios.js'
import { useAuthStore } from '@/store/authStore.js'

const { authStore, setLogin } = useAuthStore()
const router = useRouter()

let loginObj = {
  email: authStore.email,
  password: authStore.password
}

// props로 isLogin 정보 받아서 login/logout 처리 후 isLogin을 true/false 처리 해야한다.
const login = async () => {
  try {
    let { data } = await http.post('http://localhost:8080/login', loginObj) // 이미 javascript 객체
    if (data.result == 'success') {
      setLogin({ isLogin: true, name: data.name, profileImageUrl: data.profileImageUrl });
      router.push('/')
    } else if( data.result == "fail" ){
      alert('이메일 또는 비밀번호를 확인하세요.');
    }
  } catch (error) {
    console.error(error)
    alert('로그인 과정에서 오류가 발생했습니다.');
  }
}

</script>
