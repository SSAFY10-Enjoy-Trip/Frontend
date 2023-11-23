import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia'

import http from "@/common/axios.js";

// 여기 만들면 안된다.
// const router = useRouter()

export const useUserStore = defineStore('userStore', () => {
  const router = useRouter()
  const userStore = reactive({
    // list
    list: [],
    limit: 10,
    offset: 0,
    searchWord: "",

    // pagination
    listRowCount: 10,
    pageLinkCount: 10,
    currentPageIndex: 1,
    totalListItemCount: 0,

    // detail, update, delete
    email: "",
    name: "",
    profileImageUrl: "",
    role: ""
 })

  const setUserList = (list) => userStore.list = list
  const setTotalListItemCount = (count) => userStore.totalListItemCount = count
  const setUserMovePage = (pageIndex) => {
    userStore.offset = (pageIndex - 1) * userStore.listRowCount
    userStore.currentPageIndex = pageIndex
  }
  
  const setUserDetail = (payload) => {
    userStore.email = payload.email;
    userStore.name = payload.name;
    userStore.profileImageUrl = payload.profileImageUrl;
    userStore.role = payload.role
  }

  // list
  const userList = async () => {
    let params = {
       limit: userStore.limit,
       offset: userStore.offset,
       searchWord: userStore.searchWord,
    };

    try {
       let { data } = await http.get("/role/userList", { params }); // params: params shorthand property, let response 도 제거
       if (data.result == "login") {
          router.replace("/login");
       } else {
        setUserList(data);
        // setTotalListItemCount(data.count);
       }
    } catch (error) {
       console.error(error);
    }
  }
  // pagination
  const pageCount = computed(() => Math.ceil(userStore.totalListItemCount / userStore.listRowCount))
  const startPageIndex = computed(() => {
    if (userStore.currentPageIndex % userStore.pageLinkCount == 0) {
      //10, 20...맨마지막
      return (userStore.currentPageIndex / userStore.pageLinkCount - 1) * userStore.pageLinkCount + 1;
    } else {
      return Math.floor(userStore.currentPageIndex / userStore.pageLinkCount) * userStore.pageLinkCount + 1;
    }
  })

  const endPageIndex = computed(() => {
    if (userStore.currentPageIndex % userStore.pageLinkCount == 0) {
      //10, 20...맨마지막
      return (userStore.currentPageIndex / userStore.pageLinkCount - 1) * userStore.pageLinkCount + userStore.pageLinkCount;
    } else {
      return Math.floor(userStore.currentPageIndex / userStore.pageLinkCount) * userStore.pageLinkCount + userStore.pageLinkCount;
    }
  })

  const prev = computed(() => userStore.currentPageIndex <= userStore.pageLinkCount ? false : true)
  const next = computed(() => endPageIndex.value == pageCount.value ? false : true)

  return { 
    userStore, 
    setUserList, setUserMovePage, setTotalListItemCount, setUserDetail, userList,
    pageCount, startPageIndex, endPageIndex, prev, next 
  }
})