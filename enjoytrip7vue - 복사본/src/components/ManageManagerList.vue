<template>
  <div
    v-for="(user, index) in userStore.list.result"
    :key="index"
    @click=""
    class="m-2 suite-regular board-content p-3"
  >
    <div class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <h4 class="suite-bold">{{ user.email }}</h4>
        <h4 class="suite-bold">{{ user.name }}</h4>
        <h4 class="suite-bold">{{ user.profileImageUrl }}</h4>
        <h4 class="suite-bold">{{ user.role }}</h4>
      </div>
      <div
        class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
        style="display: flex; align-items: flex-end; justify-content: flex-end"
      >
        1 | 2 | 조회 3
      </div>
    </div>

    <hr />
    <div class="row">
      <div><span class="suite-bold">🚩 출발 : </span> 1</div>
      <div><span class="suite-bold">🏁 도착 : </span> 2</div>
    </div>
    <div class="row">
      <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">🕑 여행일 : 3 일</div>
      <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
        👜 경유지 : 4 개
      </div>
    </div>
  </div>
</template>

<script setup>
import http from '@/common/axios.js'
import { useUserStore } from '@/store/userStore.js'
import { useAuthStore } from '@/store/authStore.js'
const { userStore, setUserDetail } = useUserStore()
const { logout } = useAuthStore()

//  const props = defineProps(['detailModal'])
// const emit = defineEmits(['call-parent-show-detail'])
const userDetail = async (userEmail) => {
  try {
    let { data } = await http.get("/member/" + userEmail);

    if (data.result == 'login') {
        logout()
    } else {
      let { dto } = data
      setUserDetail(dto)

      // props.detailModal.show();
    //   emit('call-parent-show-detail')
    }
  } catch (error) {
    console.log('ManageManagerListVue: error : ')
    console.log(error)
  }
}
</script>

<style scoped>
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
