<template>
  <top-banner></top-banner>
  <div class="row">
    <div class="col-lg-1 col-xl-2"></div>
    <div class="col-12 col-sm-12 col-md-3 col col-lg-3 col-xl-2">
      <side-page></side-page>
    </div>
    <div class="col-12 col-sm-12 col-md-9 col col-lg-7 col-xl-6">
      <div class="row">
        <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" v-if="authStore.isSupervisor">
          <div class="mt-2">
            <div class="board-content">
              <h3 class="jalnan-gothic" style="display: inline">🔥매니저 관리</h3>
            </div>
            <hr />
            <manage-manager-list></manage-manager-list>
          </div>
        </div>
        <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <div class="mt-2">
            <div class="board-content">
              <h3 class="jalnan-gothic" style="display: inline">💕유저 관리</h3>
            </div>
            <hr />
            <manage-user-list></manage-user-list>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-1 col-xl-2"></div>
  </div>
</template>

<script setup>
import SidePage from './SidPage.vue'
import TopBanner from '../components/TopBanner.vue'
import ManageManagerList from '../components/ManageManagerList.vue'
import ManageUserList from '../components/ManageUserList.vue'
import { useAuthStore } from '@/store/authStore.js'
import { useManagerStore } from '@/store/managerStore.js'
import { useUserStore } from '@/store/userStore.js'

const { managerList } = useManagerStore();
const { userList } = useUserStore();
const { authStore } = useAuthStore()

managerList();
userList();
// // basic
// import { ref, onMounted } from 'vue'
// // common
// import http from '@/common/axios.js'

// // 3rd party
// import { Modal } from 'bootstrap'

// // router
// import { useRouter } from 'vue-router'

// // store
// import { useBoardStore } from '@/stores/boardStore'
// const router = useRouter()

// const { boardStore, boardList, setBoardMovePage, setBoardDetail } = useBoardStore()


// // data
// let insertModal = null
// let detailModal = ref(null)
// let updateModal = null

// // lifecycle
// onMounted(() => {
//   insertModal = new Modal(document.getElementById('insertModal'))
//   detailModal = new Modal(document.getElementById('detailModal'))
//   updateModal = new Modal(document.getElementById('updateModal'))
// })

// // 초기 작업
// boardList()

// // pagination
// const movePage = (pageIndex) => {
//   console.log('BoardMainVue : movePage : pageIndex : ' + pageIndex)
//   setBoardMovePage(pageIndex)
//   boardList()
// }

// // insert
// const showInsertModal = () => insertModal.show()
// const closeAfterInsert = () => {
//   insertModal.hide()
//   boardList()
// }

// // detail
// // BoardList Component 를 사용할 경우 comment 하고 showDetailModal() 추가

// // const boardDetail = async (boardId) => {
// //    try {
// //       let { data } = await http.get("/boards/" + boardId);
// //       console.log(data);

// //       if (data.result == "login") {
// //          doLogout();
// //       } else {
// //          let { dto } = data;
// //          setBoardDetail(dto);
// //          detailModal.show();
// //       }
// //    } catch (error) {
// //       console.log("BoardMainVue: error : ");
// //       console.log(error);
// //    }

// // }

// const showDetailModal = () => {
//   detailModal.show()
// }

// const changeToUpdate = () => {
//   detailModal.hide()
//   updateModal.show()
// }

// const closeAfterUpdate = () => {
//   updateModal.hide()
//   boardList()
// }

// // delete
// // $emit board 사용 X
// // changeToDelete(board){
// const changeToDelete = () => {
//   detailModal.hide()

//   if (confirm('이 글을 삭제하시겠습니까?')) {
//     boardDelete()
//   }
// }

// const boardDelete = async () => {
//   try {
//     let { data } = await http.delete('/boards/' + boardStore.boardId)
//     console.log(data)

//     if (data.result == 'login') {
//       doLogout()
//     } else {
//       alert('글이 삭제되었습니다.')
//       boardList()
//     }
//   } catch (error) {
//     console.log('BoardMainVue: error : ')
//     console.log(error)
//   }
// }
// // logout 처리 별도 method
// const doLogout = () => {
//   authStore.setLogout({ isLogin: false, userName: '', userProfileImageUrl: '' })
//   router.push('/login')
// }
</script>
