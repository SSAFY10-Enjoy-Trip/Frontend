<template>
  <!-- <top-banner></top-banner> -->
  <div
    style="
      background-image: url('https://i.pinimg.com/originals/13/44/cd/1344cdb8afc60644ab100307da6c3487.gif');
      background-position: bottom;
      background-size: cover;
      height: 100vh;
    "
  >
    <div class="d-flex justify-content-center">
      <img src="../assets/logo.png" alt="" />
    </div>
    <div class="text-center">
      <span class="p-2 hash-tag suite-bold ps-3 pe-3 me-2"> #일상공유</span
      ><span class="p-2 hash-tag suite-bold ps-3 pe-3 me-2"> #코스여행</span
      ><span class="p-2 hash-tag suite-bold ps-3 pe-3 me-2"> #알찬여행</span>
    </div>

    <div class="row mt-3">
      <div class="col-12 col-md-3 col-lg-4 col-xl-4"></div>
      <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 info-form mt-4 ps-2 pe-2">
        <div>
          <h3 class="suite-bold mt-4 text-center">로그인 후 모험을 떠나세요!</h3>
        </div>
        <div class="mt-4">
          <input
            type="text"
            placeholder="이메일"
            class="form-control email-input suite-regular text-center"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            name="email"
            v-model="authStore.email"
          />
        </div>
        <div class="mt-2">
          <input
            type="password"
            placeholder="비밀번호"
            class="form-control password-input suite-regular text-center"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            name="password"
            v-model="authStore.password"
          />
        </div>
        <div>
          <button class="login-btn p-2 h5 suite-bold mt-5" type="button" @click="login">
            로그인
          </button>
        </div>
        <div class="mb-4">
          <button class="register-btn suite-regular text-center ps-3 pe-3" type="button">
            <router-link to="/register" replace class="nav-link"
              >아직 회원이 아니신가요?</router-link
            >
          </button>
          /
          <button class="find-password-btn suite-regular text-center ps-3 pe-3" type="button">
            <router-link to="/findPassword" replace class="nav-link">비밀번호 찾기</router-link>
          </button>
        </div>
      </div>
      <div class="col-12 col-md-3 col-lg-4 col-xl-4"></div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import http from '@/common/axios.js'
import { useAuthStore } from '@/store/authStore.js'
import TopBanner from './TopBanner.vue'

const { authStore, setLogin } = useAuthStore()
const router = useRouter()

// props로 isLogin 정보 받아서 login/logout 처리 후 isLogin을 true/false 처리 해야한다.
const login = async () => {
  let loginObj = {
    email: authStore.email,
    password: authStore.password
  }

  try {
    let { data } = await http.post('http://localhost:8080/login', loginObj) // 이미 javascript 객체
    if (data.result == 'success') {
      setLogin({
        isLogin: true,
        memberId: data.memberId,
        name: data.name,
        profileImageUrl: data.profileImageUrl,
        role: data.role
      })
      router.push('/')
    } else if (data.result == 'fail') {
      alert('이메일 또는 비밀번호를 확인하세요.')
    }
  } catch (error) {
    console.error(error)
    alert('로그인 과정에서 오류가 발생했습니다.')
  }
}
</script>

<style>
.hash-tag {
  background-color: #ccf9ff;
  border-radius: 20px;
  border: 4px solid #0b7280;
}
.login-btn {
  width: 100%;
  background-color: #0b7280;
  color: #fff;
  border-radius: 10px;
}
.register-btn {
  border-radius: 20px;
  background-color: #ffffff00;
  color: #0c95d4;
  border: none;
}
.register-btn:hover {
  background-color: #997e07ad;
  color: #ffffff;
  border: none;
}
.find-password-btn {
  border-radius: 20px;
  background-color: #ffffff00;
  color: #0c95d4;
  border: none;
}
.find-password-btn:hover {
  background-color: #997e07ad;
  color: #ffffff;
  border: none;
}
.info-form {
  border-radius: 10px;
  border: 3px solid #037260;
  background-color: #ffffffb2;
}
.email-input {
  color: #037260;
  font-size: 20px;
}
.password-input {
  color: #037260;
  font-size: 20px;
}
</style>
