<template>
  <div class="container row" style="float: none; margin: 100 auto">
    <div class="card text-center col-md-3" style="float: none; margin: 0 auto; width: 20rem">
      <h1>Enjoy Trip</h1>
      <div class="card-body">
        <h5 class="card-title">비밀번호 찾기</h5>
        <div class="input-group input-group-sm mb-3">
          <input
            type="email"
            class="form-control"
            placeholder="가입시 입력한 이메일을 입력하세요."
            v-model="email"
            :class="{ 'is-valid': isEmailFocusAndValid, 'is-invalid': isEmailFocusAndInValid }"
            @input="validateEmail"
            @focus="isEmailFocus = true"
          />
          <div class="invalid-feedback">올바른 이메일을 입력해주세요.</div>
        </div>
        <div class="input-group input-group-sm mb-3">
          <input
            type="name"
            class="form-control"
            placeholder="가입시 입력한 이름을 입력하세요."
            v-model="name"
            :class="{ 'is-valid': isNameFocusAndValid, 'is-invalid': isNameFocusAndInvalid }"
            @input="validateName"
            @focus="isNameFocus = true"
          />
          <div class="invalid-feedback">이름을 입력해주세요.</div>
        </div>
        <div class="d-grid gap-2 d-md-block">
          <button class="btn btn-primary mx-2" type="button" @click="findPassword">
            이메일 전송
          </button>
          <button class="btn btn-outline-secondary mx-2" type="button">
            <router-link to="/login" replace class="nav-link">로그인</router-link>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import axios from 'axios'

const router = useRouter()
const name = ref('')
const email = ref('')

// focus
const isNameFocus = ref(false)
const isEmailFocus = ref(false)

// validation
const isNameValid = ref(false)
const isEmailValid = ref(false)

const isNameFocusAndValid = computed(() => isNameFocus.value && isNameValid.value)
const isNameFocusAndInvalid = computed(() => isNameFocus.value && !isNameValid.value)
const isEmailFocusAndValid = computed(() => isEmailFocus.value && isEmailValid.value)
const isEmailFocusAndInValid = computed(() => isEmailFocus.value && !isEmailValid.value)

const validateName = () => {
  isNameValid.value = name.value.length > 0 ? true : false
  console.log(isNameValid.value)
}

const validateEmail = async () => {
  // ^ 시작일치, $ 끝 일치
  // {2, 3} 2개 ~ 3개
  // * 0회 이상, + 1회 이상
  // [-_.] - 또는 _ 또는 .
  // ? 없거나 1회
  let regexp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
  isEmailValid.value = regexp.test(email.value) ? true : false
}

const findPassword = async () => {
  if (!isEmailValid.value || !isNameValid.value) {
    return
  }

  let findPasswordObj = {
    email: email.value,
    name: name.value
  }

  try {
    let { data } = await axios.get('http://localhost:8080/check/' + email.value) // 이미 javascript 객체
    // result == fail => 존재하지 않는 이메일. 즉 계정이 존재하지 않는다.
    if (data.result == 'success') {
      alert('등록된 이메일이 아닙니다.')
    } else {
      // result == success => 존재하는 계정이다. 해당 계정의 이메일로 임시 비밀번호를 발급한다.
      
      try {
        let { data } = await axios.post('http://localhost:8080/check/findPassword', findPasswordObj) // 이미 javascript 객체
        if (data.result == 'success') {
          try {
            let { data } = await axios.post(
              'http://localhost:8080/check/sendEmail',
              findPasswordObj
            )
            if (data.result == 'success') {
              alert('해당 이메일로 임시 비밀번호를 발급했습니다.')
              router.replace('/login')
            }
          } catch (error) {
            console.error(error)
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
  } catch (error) {
    console.error(error)
  }
}
</script>
