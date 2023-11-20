import { reactive } from 'vue'
import { defineStore } from 'pinia'

import http from "@/common/axios.js";
import notLoginUserProfileImageUrl from '@/assets/noProfile.png'

export const useAuthStore = defineStore('authStore', () => {
  console.log(notLoginUserProfileImageUrl)
  const authStore = reactive({
    // NavBar
    isLogin: false,

    name: '',
    profileImageUrl: notLoginUserProfileImageUrl,

    // Login
    email: "test",
    password: "test",
  })

  // getter 는 생략 직접 사용하는 걸로
  const setLogin = (payload) => {
    sessionStorage.setItem("isLogin", "true");
    sessionStorage.setItem("name", payload.name);
    sessionStorage.setItem("profileImageUrl", payload.profileImageUrl);

    authStore.isLogin = payload.isLogin;
    authStore.name = payload.name;
    authStore.profileImageUrl = payload.profileImageUrl;
    // console.log(authStore)
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
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("profileImageUrl");

    authStore.isLogin = false;
    authStore.name = '';
    authStore.profileImageUrl = notLoginUserProfileImageUrl;
  }

  return { authStore, setLogin, setLogout, logout }
})

