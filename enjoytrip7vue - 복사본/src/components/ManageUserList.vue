<template>
  <div
    v-for="(user, index) in userStore.list.result"
    :key="index"
    class="m-2 suite-regular board-content p-3"
  >
    <div class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <h4 class="suite-bold">{{ user.name }}</h4>
      </div>
      <hr />
      <div
        class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
        style="display: inline-flex; align-items: flex-start; justify-content: flex-end"
      >
        <h5 class="suite-bold">{{ user.email }}</h5>
      </div>
      <div
        class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
        style="display: flex; align-items: flex-end; justify-content: flex-end"
      >
        <h5 class="suite-bold">🥉{{ user.role }}</h5>
      </div>
    </div>
    <button @click="checkAndAssignment(user.email)" class="hover-pointer btn write-board">
      매니저 임명
    </button>
  </div>
</template>

<script setup>

import http from '@/common/axios.js'
import { useRouter } from 'vue-router'
import { useManagerStore } from '@/store/managerStore.js'
import { useUserStore } from '@/store/userStore.js'
import { useAuthStore } from '../store/authStore';
const { userStore, userList } = useUserStore()
const { managerList } = useManagerStore()
const { logout } = useAuthStore()
const router  = useRouter()

const checkAndAssignment = async (userEmail) => {
  try {
    let { data } = await http.get('/checkSession')
    console.log("checkAndAssignment: "+data.result)
    if (data.result == 'success') {
      managerAssignment(userEmail);
    } else {
      logout()
      router.replace("/login")
    }
  } catch (error) {
    console.error(error)
  }
}

const managerAssignment = async (userEmail) => {
  let assignmentObj = {
    email: userEmail
  }

  try {
    let { data } = await http.put('http://localhost:8080/role/assignment', assignmentObj)

    if (data.result == 'success') {
      console.log(data)
      managerList()
      userList()
    }
  } catch (error) {
    console.log('ManageUserListVue: error : ')
    console.log(error)
  }
}
</script>

<style scoped>
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

table {
  border: 1px solid #eee;
  border-radius: 6px;
  font-family: 'SUITE-Regular';
}
th {
  background-color: #efefef;
}
.board-content {
  border-radius: 6px;
  border: 1px solid #ccc;
}

.board-content:hover {
  cursor: pointer;
  background-color: #f3f3f3;
}
</style>
