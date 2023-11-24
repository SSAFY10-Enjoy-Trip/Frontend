<script setup>
import { RouterView } from 'vue-router'
import LogoBar from './components/LogoBar.vue'
import MyPage from './views/MyPage.vue'
import { useAuthStore } from '@/store/authStore.js'
import { useRoute } from 'vue-router'
import { watch } from 'vue'
import http from '@/common/axios.js'

const route = useRoute()
const { authStore, setLogin, logout} = useAuthStore()

const check = async () => {
  try {
    let { data } = await http.get('/checkSession')
    console.log(data.result)
    if (data.result == 'success') {
      setLogin({
        isLogin: true,
        memberId: data.memberId,
        email: data.email,
        name: data.name,
        profileImageUrl: data.profileImageUrl,
        role: data.role
      })
    } else {
      logout()
    }
  } catch (error) {
    console.error(error)
  }
}

watch(route, () => {
  check()
})

const loginStatus = sessionStorage.getItem('isLogin')

if (loginStatus) {
  authStore.isLogin = sessionStorage.getItem('isLogin')
  authStore.name = sessionStorage.getItem('name')
  authStore.profileImageUrl = sessionStorage.getItem('profileImageUrl')

  // 관리자일 경우 권한 설정을 위해
  if (sessionStorage.getItem('role') == 'ROLE_SUPERVISOR') {
    authStore.isSupervisor = true
  } else if (sessionStorage.getItem('role') == 'ROLE_MANAGER') {
    authStore.isManager = true
  }
} else {
  logout()
}
</script>

<template>
  <div class="container"></div>

  <logo-bar></logo-bar>

  <!-- <my-page></my-page> -->

  <router-view :key="$route.fullPath"></router-view>
</template>

<style scoped></style>
