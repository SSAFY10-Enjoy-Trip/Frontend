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
            name="email" v-model="user.email"
          />
        </div>
        <div class="input-group input-group-sm mb-3">
          <input
            type="text"
            placeholder="비밀번호"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            name="password" v-model="user.password"
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
import { useRouter } from 'vue-router';
import axios from 'axios'
import {ref} from 'vue'

const router = useRouter();

const user = ref({});
const clear = () => {
  user.value = {
    email: '',
    password: ''
  }
}

// props로 isLogin 정보 받아서 login/logout 처리 후 isLogin을 true/false 처리 해야한다.
const login = async () => {
  try {
    let {data} = await axios.post('http://localhost:8080/axios/login', user.value) // 이미 javascript 객체
    console.log(data)
    clear();
    if(data.login === 'success'){
      sessionStorage.setItem('login', 'success');
      emit('call-is-login', true);
      router.push('/')
    }else{
      emit('call-is-login', false);
    }
  } catch (error) {
    console.error(error)
  }
}

const emit = defineEmits([
  'call-is-login'
])

</script>