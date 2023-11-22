<template>
  <div
    v-for="(item, index) in boardId"
    :key="index"
    @click="showBoardDetail(boardId[index])"
    class="m-2 suite-regular board-content p-3"
  >
    <div class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <h4 class="suite-bold">{{ title[index] }}</h4>
      </div>
      <div
        class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
        style="display: flex; align-items: flex-end; justify-content: flex-end"
      >
        {{ memberName[index] }} | {{ regDt[index] }} | 조회 {{ readCount[index] }} | 담기
        {{ likeCount[index] }}
      </div>
    </div>

    <hr />
    <div class="row">
      <div><span class="suite-bold">🚩 출발 : </span> {{ location[index].rowNameValue[1][0] }}</div>
      <div>
        <span class="suite-bold">🏁 도착 : </span>
        {{
          location[index].rowNameValue[location[index].rowCount][
            location[index].rowNameValue[location[index].rowCount].length - 1
          ]
        }}
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
        🕑 여행일 : {{ location[index].rowCount }} 일
      </div>
      <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
        👜 경유지 : {{ allLocation[index] }} 개
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import http from '@/common/axios.js'

let boardId = reactive([])
let title = reactive([])
let content = reactive([])
let location = reactive([])
let allLocation = reactive([])
let regDt = reactive([])
let readCount = reactive([])
let likeCount = reactive([])
let memberName = reactive([])
let memberId = reactive([])
let memberProfileImageUrl = reactive([])
const router = useRouter()
const insertTripBoard = async () => {
  try {
    let { data } = await http.get('/tripBoard')
    console.log('얘래')
    console.log(data)
    let cnt = 0
    data.forEach((row) => {
      boardId.push(row.boardId)
      title.push(row.title)
      content.push(row.content)
      location.push(JSON.parse(row.location))
      let sum = 0
      console.log(location[cnt].rowCount)
      for (let i = 1; i < location[cnt].rowCount; i++) {
        sum += location[cnt].rowNameValue[i].length
      }
      allLocation.push(sum)
      regDt.push(timeForToday(row.regDt))
      readCount.push(row.readCount)
      likeCount.push(row.likeCount)
      memberName.push(row.member.name)
      memberId.push(row.memberId)
      memberProfileImageUrl.push(row.memberProfileImageUrl)
      cnt++
    })
    console.log(location)
  } catch (error) {
    console.log(error)
  }
}

function timeForToday(value) {
  const today = new Date()
  const timeValue = new Date(value)

  const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60)
  if (betweenTime < 1) return '방금 전'
  if (betweenTime < 60) {
    return `${betweenTime}분 전`
  }

  const betweenTimeHour = Math.floor(betweenTime / 60)
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간 전`
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24)
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일 전`
  }

  return `${Math.floor(betweenTimeDay / 365)}년 전`
}

export default {
  setup() {
    insertTripBoard()
    boardId.length = 0
    title.length = 0
    content.length = 0
    location.length = 0
    likeCount.length = 0
    allLocation.length = 0
    regDt.length = 0
    readCount.length = 0
    memberName.length = 0
    memberId.length = 0
    memberProfileImageUrl.length = 0
  },
  data() {
    return {
      boardId,
      title,
      content,
      location,
      allLocation,
      memberName,
      memberId,
      memberProfileImageUrl,
      regDt,
      readCount,
      likeCount
    }
  },
  methods: {
    showBoardDetail(boardNum) {
      this.$router.push({ path: `/bordDetail/${boardNum}` })
    }
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
