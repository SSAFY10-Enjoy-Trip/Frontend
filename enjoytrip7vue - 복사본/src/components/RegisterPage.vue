<template>
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
          <h3 class="suite-bold mt-4 text-center">여정을 떠나볼까요?</h3>
        </div>
        <div class="mt-4">
          <input
            type="email"
            placeholder="이메일"
            class="form-control suite-regular"
            :class="{ 'is-valid': isEmailFocusAndValid, 'is-invalid': isEmailFocusAndInValid }"
            v-model="email"
            @input="validateEmail"
            @focus="isEmailFocus = true"
          />
          <div class="valid-feedback suite-regular">사용 가능한 이메일입니다.</div>
          <div class="invalid-feedback suite-regular">올바른 이메일을 입력해주세요.</div>
        </div>
        <div class="mt-2">
          <input
            type="name"
            placeholder="이름"
            class="form-control suite-regular"
            :class="{ 'is-valid': isNameFocusAndValid, 'is-invalid': isNameFocusAndInvalid }"
            v-model="name"
            @input="validateName"
            @focus="isNameFocus = true"
          />
          <div class="valid-feedback suite-regular">사용 가능한 이름입니다.</div>
          <div class="invalid-feedback suite-regular">이름을 입력해주세요.</div>
        </div>
        <div class="mt-2">
          <input
            type="password"
            placeholder="비밀번호를 입력하세요."
            class="form-control suite-regular"
            :class="{
              'is-valid': isPasswordFocusAndValid,
              'is-invalid': isPasswordFocusAndInvalid
            }"
            v-model="password"
            @input="validatePassword"
            @focus="isPasswordFocus = true"
          />
          <div class="valid-feedback suite-regular">사용 가능한 비밀번호입니다.</div>
          <div class="invalid-feedback suite-regular">
            1개 이상의 특수문자, 대소문자 및 숫자를 포함하고 8자리 이상이여야 합니다.
          </div>
        </div>
        <div class="mt-2">
          <input
            type="password"
            placeholder="비밀번호를 확인하세요."
            class="form-control suite-regular"
            :class="{
              'is-valid': isPassword2FocusAndValid,
              'is-invalid': isPassword2FocusAndInvalid
            }"
            v-model="password2"
            @input="validatePassword2"
            @focus="isPassword2Focus = true"
          />
          <div class="valid-feedback suite-regular">비밀번호가 일치합니다.</div>
          <div class="invalid-feedback suite-regular">비밀번호가 일치하지 않습니다.</div>
        </div>
        <div>
          <button class="login-btn p-2 h5 suite-bold mt-5" type="button" @click="register">
            회원가입
          </button>
        </div>
        <div class="mb-4">
          <button class="register-btn suite-regular text-center ps-3 pe-3" type="button">
            <router-link to="/login" replace class="nav-link">로그인으로 돌아가기</router-link>
          </button>
        </div>
      </div>
      <div class="col-12 col-md-3 col-lg-4 col-xl-4"></div>
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
      let { data } = await axios.get('http://localhost:8080/check/' + email.value) // 이미 javascript 객체
      if (data.result == 'success') {
        isEmailValid.value = true
      } else {
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
