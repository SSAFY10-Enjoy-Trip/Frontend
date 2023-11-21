<template>
  <div class="container row" style="float: none; margin: 100 auto">
    <div class="card text-center col-md-3" style="float: none; margin: 0 auto; width: 18rem">
      <h1>Enjoy Trip</h1>
      <div class="card-body">
        <h5 class="card-title">회원가입</h5>
        <div class="input-group input-group-sm mb-3">
          <input
            type="email"
            placeholder="이메일"
            :class="{ 'is-valid': isEmailFocusAndValid, 'is-invalid': isEmailFocusAndInValid }"
            v-model="email"
            @input="validateEmail"
            @focus="isEmailFocus = true"
          />
          <div class="valid-feedback">사용 가능한 이메일입니다.</div>
          <div class="invalid-feedback">올바른 이메일을 입력해주세요.</div>
        </div>
        <div class="input-group input-group-sm mb-3">
          <input
            type="name"
            placeholder="이름"
            :class="{ 'is-valid': isNameFocusAndValid, 'is-invalid': isNameFocusAndInvalid }"
            v-model="name"
            @input="validateName"
            @focus="isNameFocus = true"
          />
          <div class="valid-feedback"></div>
          <div class="invalid-feedback">이름을 입력해주세요.</div>
        </div>
        <div class="input-group input-group-sm mb-3">
          <input
            type="password"
            placeholder="비밀번호를 입력하세요."
            :class="{
              'is-valid': isPasswordFocusAndValid,
              'is-invalid': isPasswordFocusAndInvalid
            }"
            v-model="password"
            @input="validatePassword"
            @focus="isPasswordFocus = true"
          />
          <div class="valid-feedback">사용 가능한 비밀번호입니다.</div>
          <div class="invalid-feedback">
            1개 이상의 특수문자, 대소문자 및 숫자를 포함하고 8자리 이상이여야 합니다.
          </div>
        </div>
        <div class="input-group input-group-sm mb-3">
          <input
            type="password"
            placeholder="비밀번호를 확인하세요."
            :class="{
              'is-valid': isPassword2FocusAndValid,
              'is-invalid': isPassword2FocusAndInvalid
            }"
            v-model="password2"
            @input="validatePassword2"
            @focus="isPassword2Focus = true"
          />
          <div class="valid-feedback">비밀번호가 일치합니다.</div>
          <div class="invalid-feedback">비밀번호가 일치하지 않습니다.</div>
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
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import axios from 'axios'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const password2 = ref('')

// focus
const isNameFocus = ref(false)
const isEmailFocus = ref(false)
const isPasswordFocus = ref(false)
const isPassword2Focus = ref(false)

// validation
const isNameValid = ref(false)
const isEmailValid = ref(false)
const isPasswordValid = ref(false)
const isPassword2Valid = ref(false)

const isNameFocusAndValid = computed(() => isNameFocus.value && isNameValid.value)
const isNameFocusAndInvalid = computed(() => isNameFocus.value && !isNameValid.value)
const isEmailFocusAndValid = computed(() => isEmailFocus.value && isEmailValid.value)
const isEmailFocusAndInValid = computed(() => isEmailFocus.value && !isEmailValid.value)
const isPasswordFocusAndValid = computed(() => isPasswordFocus.value && isPasswordValid.value)
const isPasswordFocusAndInvalid = computed(() => isPasswordFocus.value && !isPasswordValid.value)
const isPassword2FocusAndValid = computed(() => isPassword2Focus.value && isPassword2Valid.value)
const isPassword2FocusAndInvalid = computed(() => isPassword2Focus.value && !isPassword2Valid.value)

const register = async () => {
  if (
    !isEmailValid.value ||
    !isNameValid.value ||
    !isPasswordValid.value ||
    !isPassword2Valid.value
  )
    return

  let registerObj = {
    name: name.value,
    email: email.value,
    password: password.value
  }

  try {
    let { data } = await axios.post('http://localhost:8080/member', registerObj) // 이미 javascript 객체
    if (data.result == 'success') {
      router.replace('/login')
    }
  } catch (error) {
    console.error(error)
  }
}

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

  // 이메일 양식을 확인한 후,
  // BackEnd과 연동하여 등록된 이메일이면 isEmailValid.value 를 false 처리한다.
  if (regexp.test(email.value) ? true : false) {

    try {
      let { data } = await axios.get('http://localhost:8080/check/'+email.value) // 이미 javascript 객체
      if (data.result == 'success') {
        isEmailValid.value = true
      }else{
        isEmailValid.value = false
      }
    } catch (error) {
      console.error(error)
    }
  } else {
    isEmailValid.value = false
  }
}

const validatePassword = () => {
  let patternEngAtListOne = new RegExp(/[a-zA-Z]+/) // + for at least one
  let patternSpeAtListOne = new RegExp(/[~!@#$%^&*()_+|<>?:{}]+/) // + for at least one
  let patternNumAtListOne = new RegExp(/[0-9]+/) // + for at least one

  isPasswordValid.value =
    patternEngAtListOne.test(password.value) &&
    patternSpeAtListOne.test(password.value) &&
    patternNumAtListOne.test(password.value) &&
    password.value.length >= 8
      ? true
      : false
}
const validatePassword2 = () => {
  isPassword2Valid.value = password.value == password2.value ? true : false
}
</script>
