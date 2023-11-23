import { reactive } from 'vue'
import { defineStore } from 'pinia'

import http from "@/common/axios.js";
import notLoginUserProfileImageUrl from '@/assets/noProfile.png'

export const useAuthStore = defineStore('authStore', () => {
  console.log(notLoginUserProfileImageUrl)
  const authStore = reactive({
    // NavBar
    isLogin: false,

    // 멤버 권한 설정
    isSupervisor: false,
    isManager: false,

    name: '',
    profileImageUrl: notLoginUserProfileImageUrl,

    // Login
    email: '',
    password: '',
  })

  // getter 는 생략 직접 사용하는 걸로
  const setLogin = (payload) => {
    sessionStorage.setItem("isLogin", true);
    sessionStorage.setItem("memberId", payload.memberId)
    sessionStorage.setItem("name", payload.name);
    sessionStorage.setItem("profileImageUrl", payload.profileImageUrl);
    sessionStorage.setItem("role", payload.role);

    authStore.isLogin = payload.isLogin;
    authStore.name = payload.name;
    authStore.profileImageUrl = payload.profileImageUrl;

    // 관리자일 경우 권한 설정을 위해
    if(payload.role == "ROLE_SUPERVISOR"){
      authStore.isSupervisor = true;
    }else if(payload.role == "ROLE_MANAGER"){
      authStore.isManager = true;
    }

    // 로그인 후 로그인 화면에 비밀번호 남아있는 것 지우기
    authStore.password = '';
  }

  const logout = async () => {
    try {
       let { data } = await http.get("/logout");

       if (data.result == "success") {
        setLogout()
       }
    } catch (error) {
       console.error(error);
    }
  }

  const setLogout = () => {
    sessionStorage.removeItem("isLogin");
    sessionStorage.removeItem("memberId");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("profileImageUrl");
    sessionStorage.removeItem("role");

    authStore.isLogin = false;
    authStore.name = '';
    authStore.profileImageUrl = notLoginUserProfileImageUrl;

    // 관리자 권한 설정 해제
    authStore.isSupervisor = false;
    authStore.isManager = false;
  }

  return { authStore, setLogin, setLogout, logout }
})

