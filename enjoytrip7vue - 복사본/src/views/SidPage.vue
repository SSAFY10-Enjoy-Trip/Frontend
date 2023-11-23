<script>
export default {
  methods: {
    navigateToBoardAll() {
      this.$router.push({ path: '/bordAll' });
    },
    navigateToBoardFollow() {
      this.$router.push({ path: '/bordFollow' });
    },
    navigateToBoardHot() {
      this.$router.push({ path: '/bordHot' });
    },
    navigateToBoardInsert() {
      this.$router.push({ path: '/bordInsert' });
    }
  }
}
</script>

<script setup>
import { useAuthStore } from '@/store/authStore.js'

const { authStore } = useAuthStore();
</script>

<template>
  <div class="m-2">
    <table class="table mb-3 suite-regular">
      <thead>
        <tr>
          <td class="list-backgrond">
            <img class="user-profile hover-pointer" @click="" src="https://samg.net/2020/wp-content/uploads/2020/08/chachaping_011.png" alt="">
            <div><span class="suite-bold hover-pointer" @click="">홍길동</span>님 반갑습니다!</div>
            
          </td>
        </tr>
        <tr style="border-top: 3px solid #888;">
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
          <button @click="navigateToBoardInsert" class="hover-pointer btn write-board">글작성</button>
        </tr>
        <tr>
          <button v-if="authStore.isManager || authStore.isSupervisor" class="hover-pointer btn write-board">
            <router-link to="/managerPage" replace class="nav-link">관리자 페이지</router-link>
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
.list-backgrond{
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
