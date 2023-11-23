<template>
  <div
    v-for="(manager, index) in managerStore.list.result"
    :key="index"
    class="m-2 suite-regular board-content p-3"
  >
    <div class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <h4 class="suite-bold">{{ manager.name }}</h4>
      </div>
      <hr />
      <div
        class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
        style="display: inline-flex; align-items: flex-start; justify-content: flex-end"
      >
        <h5 class="suite-bold">{{ manager.email }}</h5>
      </div>
      <div
        class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
        style="display: flex; align-items: flex-end; justify-content: flex-end"
      >
        <h5 class="suite-bold">🥈{{ manager.role }}</h5>
      </div>
    </div>
    <button @click="checkAndDisassignment(manager.email)" class="hover-pointer btn write-board">
      매니저 해제
    </button>
  </div>
</template>

<script setup>
import http from '@/common/axios.js'
import { useRouter } from 'vue-router'
import { useManagerStore } from '@/store/managerStore.js'
import { useUserStore } from '@/store/userStore.js'
import { useAuthStore } from '../store/authStore';

const { managerStore, managerList} = useManagerStore()
const { logout } = useAuthStore()
const { userList } = useUserStore()
const router  = useRouter()

const checkAndDisassignment = async (managerEmail) => {
  try {
    let { data } = await http.get('/checkSession')
    console.log("checkAndDisassignment: "+data.result)
    if (data.result == 'success') {
      managerDisAssignment(managerEmail);
    } else {
      logout()
      router.replace("/login")
    }
  } catch (error) {
    console.error(error)
  }
}

const managerDisAssignment = async (managerEmail) => {
  console.log(managerEmail)
  let assignmentObj = {
    email: managerEmail
  }

  try {
    let { data } = await http.put('http://localhost:8080/role/disAssignment', assignmentObj)
    if (data.result == 'success') {
      console.log(data)
      managerList()
      userList()
    } 
  } catch (error) {
    console.log('ManageManagerListVue: error : ')
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
