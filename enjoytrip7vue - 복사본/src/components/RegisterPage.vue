<template>
  <div class="container row" style="float: none; margin: 100 auto">
    <div class="card text-center col-md-3" style="float: none; margin: 0 auto; width: 18rem">
      <h1>Enjoy Trip</h1>
      <div class="card-body">
        <h5 class="card-title">회원가입</h5>
        <div class="input-group input-group-sm mb-3">
          <input
            type="text"
            placeholder="이메일"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            v-model="user.email"
          />
        </div>
        <div class="input-group input-group-sm mb-3">
          <input
            type="text"
            placeholder="이름"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            v-model="user.name"
          />
        </div>
        <div class="input-group input-group-sm mb-3">
          <input
            type="text"
            placeholder="비밀번호"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            v-model="user.password"
          />
        </div>
        <div class="d-grid gap-2 d-md-block">
          <button class="btn btn-primary mx-2" type="button" @click="register">회원가입</button>
          <button class="btn btn-outline-secondary mx-2" type="button">
            <router-link to="/login" replace class="nav-link">로그인</router-link>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import {ref} from 'vue';
import axios from 'axios'

const router = useRouter();
const user = ref({});

const clear = () => {
  user.value = {
    email: '',
    name: '',
    password: ''
  }
}

const register = async () => {
  try {
    console.log(user.value);
    let {data} = await axios.post('http://localhost:8080/member', user.value) // 이미 javascript 객체
    if(data.register == 'success'){
      router.replace('/login')
    }
  } catch (error) {
    console.error(error)
  }
  clear();
}

</script>
