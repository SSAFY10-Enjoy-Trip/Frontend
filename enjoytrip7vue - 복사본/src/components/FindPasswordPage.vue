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
          <h3 class="suite-bold mt-4 text-center">잊고있던 나를 찾아드릴게요!</h3>
        </div>
        <div class="mt-4">
          <input
            type="email"
            class="form-control"
            placeholder="가입시 입력한 이메일을 입력하세요."
            v-model="email"
            :class="{ 'is-valid': isEmailFocusAndValid, 'is-invalid': isEmailFocusAndInValid }"
            @input="validateEmail"
            @focus="isEmailFocus = true"
          />
        </div>
        <div class="mt-2">
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
        <div>
          <button class="login-btn p-2 h5 suite-bold mt-5" type="button" @click="findPassword">
            이메일 전송
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
