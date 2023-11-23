import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia'

import http from "@/common/axios.js";

// 여기 만들면 안된다.
// const router = useRouter()

export const useManagerStore = defineStore('managerStore', () => {
  const router = useRouter()
  const managerStore = reactive({
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

  const setManagerList = (list) => managerStore.list = list
  const setTotalListItemCount = (count) => managerStore.totalListItemCount = count
  const setManagerMovePage = (pageIndex) => {
    managerStore.offset = (pageIndex - 1) * managerStore.listRowCount
    managerStore.currentPageIndex = pageIndex
  }
  
  const setManagerDetail = (payload) => {
    managerStore.email = payload.email;
    managerStore.name = payload.name;
    managerStore.profileImageUrl = payload.profileImageUrl;
    managerStore.role = payload.role
  }

  // list
  const managerList = async () => {
    let params = {
       limit: managerStore.limit,
       offset: managerStore.offset,
       searchWord: managerStore.searchWord,
    };

    try {
       let { data } = await http.get("/role/managerList", { params }); // params: params shorthand property, let response 도 제거
       if (data.result == "login") {
          router.replace("/login");
       } else {
        setManagerList(data);
        // setTotalListItemCount(data.count);
       }
    } catch (error) {
       console.error(error);
    }
  }
  // pagination
  const pageCount = computed(() => Math.ceil(managerStore.totalListItemCount / managerStore.listRowCount))
  const startPageIndex = computed(() => {
    if (managerStore.currentPageIndex % managerStore.pageLinkCount == 0) {
      //10, 20...맨마지막
      return (managerStore.currentPageIndex / managerStore.pageLinkCount - 1) * managerStore.pageLinkCount + 1;
    } else {
      return Math.floor(managerStore.currentPageIndex / managerStore.pageLinkCount) * managerStore.pageLinkCount + 1;
    }
  })

  const endPageIndex = computed(() => {
    if (managerStore.currentPageIndex % managerStore.pageLinkCount == 0) {
      //10, 20...맨마지막
      return (managerStore.currentPageIndex / managerStore.pageLinkCount - 1) * managerStore.pageLinkCount + managerStore.pageLinkCount;
    } else {
      return Math.floor(managerStore.currentPageIndex / managerStore.pageLinkCount) * managerStore.pageLinkCount + managerStore.pageLinkCount;
    }
  })

  const prev = computed(() => managerStore.currentPageIndex <= managerStore.pageLinkCount ? false : true)
  const next = computed(() => endPageIndex.value == pageCount.value ? false : true)

  return { 
    managerStore, 
    setManagerList, setManagerMovePage, setTotalListItemCount, setManagerDetail, managerList,
    pageCount, startPageIndex, endPageIndex, prev, next 
  }
})