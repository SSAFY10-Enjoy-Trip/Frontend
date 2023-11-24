<script>
import { useAuthStore } from '@/store/authStore.js'
export default {
  data() {
    return {
      userName: ref('로그인 후 이용하세요'),
      userEmail: ref(''),
      userProfile: ref('/src/assets/noProfile.png'),
      userLogin: ref(false)
    }
  },
  created() {
    const { authStore } = useAuthStore()
    this.userLogin = authStore.isLogin
    if (this.userLogin) {
      this.userEmail = authStore.email
      this.userName = authStore.name + '님 안녕하세요?'
      this.userProfile = authStore.profileImageUrl
    }
  },
  updated() {
    if (!this.userLogin) {
      this.userEmail = ''
      this.userName = '로그인 후 이용하세요'
      this.userProfile = '/src/assets/noProfile.png'
    }
  },
  methods: {
    navigateToBoardAll() {
      this.$router.push({ path: '/bordAll' })
    },
    navigateToBoardFollow() {
      this.$router.push({ path: '/bordFollow' })
    },
    navigateToBoardHot() {
      this.$router.push({ path: '/bordHot' })
    },
    navigateToBoardInsert() {
      if (this.userLogin) {
        this.$router.push({ path: '/bordInsert' })
      } else {
        alert('로그인 후 이용해주세요')
      }
    },
    navigateToMyPage() {
      if (this.userLogin) {
        this.$router.push(`/myPage/${this.userEmail}`)
      } else {
        alert('로그인 후 이용해주세요')
      }
    }
  }
}
</script>

<script setup>
import { ref } from 'vue'

const { authStore } = useAuthStore()
</script>

<template>
  <div class="m-2">
    <table class="table mb-3 suite-regular">
      <thead>
        <tr>
          <td class="list-backgrond">
            <img
              class="user-profile hover-pointer"
              :src="userProfile"
              alt=""
              v-on:click="navigateToMyPage"
            />
            <div>
              <span class="suite-bold hover-pointer" v-on:click="navigateToMyPage">{{
                userName
              }}</span>
            </div>
          </td>
        </tr>
        <tr style="border-top: 3px solid #888">
          <th scope="col">카테고리</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td @click="navigateToBoardAll" class="hover-pointer bar-content">전체글</td>
        </tr>
        <tr>
          <td @click="navigateToBoardFollow" class="hover-pointer bar-content">팔로우글</td>
        </tr>
        <tr>
          <td @click="navigateToBoardHot" class="hover-pointer bar-content">주간인기글</td>
        </tr>
        <tr>
          <button @click="navigateToBoardInsert" class="hover-pointer btn write-board">
            글작성
          </button>
        </tr>
        <tr>
          <button
            v-if="authStore.isManager || authStore.isSupervisor"
            class="hover-pointer btn write-board"
          >
            <router-link to="/managePage" replace class="nav-link">관리자 페이지</router-link>
          </button>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  border: 1px solid #e3e3e3;
  text-align: center;
}
.user-profile {
  border-radius: 100%;
  width: 55px;
  height: 55px;
  object-fit: cover;
  border: #eee solid 1px;
}
.list-backgrond {
  background-color: #f3f3f3;
}

.bar-content:hover {
  background-color: #e6f8ff;
}
.write-board {
  background-color: #0f7c51;
  color: #fff;
  width: 100%;
}
.write-board:hover {
  background-color: #065938;
}
</style>
