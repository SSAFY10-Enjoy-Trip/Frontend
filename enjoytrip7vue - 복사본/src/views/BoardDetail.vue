<script setup>
import MapStopover from '@/components/MapStopover.vue'
import SidePage from './SidPage.vue'
import { useAuthStore } from '@/store/authStore'
const { authStore } = useAuthStore()
console.log('어쓰쓰토아', authStore.isLogin)
isLogin.value = authStore.isLogin
</script>

<script>
import { ref, reactive } from 'vue'
let boardNum = ref(0)
import http from '@/common/axios.js'

let isLogin = ref(true)

let boardId = ref(0)
let title = ref('')
let content = ref('')
let location = reactive([])
let allLocation = ref(0)
let regDt = ref('')
let readCount = ref('')
let memberName = ref('')
let memberId = ref(0)
let memberProfileImageUrl = ref('')

let locationX = []
let locationY = []
const insertTripBoard = async () => {
  try {
    let { data } = await http.get('/tripBoard/' + boardNum.value)
    title.value = data.title
    content.value = data.content
    location = data.location
    allLocation.value = data.allLocation
    regDt.value = data.regDt.replace('T', ' ')
    readCount.value = data.readCount
    memberName.value = data.member.name
    memberId.value = data.memberId
    memberProfileImageUrl.value = data.memberProfileImageUrl

    locationX = JSON.parse(location)
    locationY = JSON.parse(location).rowPositionYValue
    // console.log(data)
    // console.log(data.location)
  } catch (error) {
    console.log(error)
  }
}
export default {
  setup() {},
  components: {
    MapStopover
  },
  data() {
    return {
      locationX,
      locationY,

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

      likeImage: false
    }
  },
  created() {
    // 동적 세그먼트의 값인 boardNum을 읽어옴
    boardNum.value = this.$route.params.boardNum
    // 서버에게 boardNum을 전달
    this.fetchDataFromServer(boardNum.value)
    console.log('게시글 ID:', boardNum.value)
    this.heartCheck()

    // boardId = 0
    // title = ''
    // content = ''
    // location.length = 0
    // allLocation = 0
    // regDt = ''
    // readCount = 0
    // memberName = ''
    // memberId = 0
    // memberProfileImageUrl = ''
    insertTripBoard()
  },
  methods: {
    fetchDataFromServer(boardNum) {
      // 서버에게 boardNum을 전달하고 데이터를 가져오는 비동기 작업 수행
      // axios 코드 작성 위치
    },
    clickLike() {
      // 좋아요 했으면
      if (this.likeImage == false) {
        // 로그인 했으면
        console.log("여기다요")
        console.log(isLogin.value)
        if (isLogin.value == true) {
          this.likeImage = !this.likeImage
          this.heartUpdate()
        }
        // 로그인 안 했으면
        else {
          alert('로그인이 필요한 서비스 입니다.')
        }
      }
      // 좋아요 해제 했으면
      else {
        this.likeImage = !this.likeImage
        this.heartUpdate()
      }
    },
    async heartUpdate() {
            let boardObj = {
              boardId: boardNum.value
            }
            try {
              let { data } = await http.post('/like', boardObj)
              console.log(data)

              if (data.result == 'success') {
              } else if (data.board == 'fail') {
                alert('업데이트 오류가 발생했습니다.')
              }
            } catch (error) {
              console.log(error)
            }
          },
    async heartCheck() {
            let boardObj = {
              boardId: boardNum.value
            }
            try {
              let { data } = await http.post('/like/check', boardObj)
              console.log("Q. 나는 좋아요를 했다? => ", data)

              this.likeImage = data
            } catch (error) {
              console.log(error)
            }
          }
  }
}
</script>

<template>
  <div class="row">
    <div class="col-xl-1"></div>
    <div class="col-12 col-sm-12 col-md-3 col col-lg-3 col-xl-2">
      <side-page></side-page>
    </div>
    <div class="col-12 col-sm-12 col-md-9 col col-lg-9 col-xl-8">
      <div id="boardDetailContent" class="mt-2 p-3">
        <h1>{{ title }}</h1>
        <h5>
          작성자 : {{ memberName }} | 작성일 : {{ regDt }} | 조회수 : {{ readCount }} | 담기 : 23
        </h5>
        <hr />

        <map-stopover :locationX="locationX" :locationY="locationY"></map-stopover>

        <h3 class="suite-bold">매력 포인트</h3>
        <div class="board-content mt-2 p-2">{{ content }}</div>

        <div class="mt-5">
          <img
            class="userProfile p-1"
            src="https://samg.net/2020/wp-content/uploads/2020/08/chachaping_011.png"
          />
          <span class="comment-user">차차핑</span>
          <span>님의 글 더보기</span> <br />
          <div class="vertical-centering mt-2">
            <button class="likeBtnBack" @click="clickLike">
              <img
                v-if="likeImage"
                class="likeBtn shine"
                src="../assets/like_fill.png"
                alt="Image 1"
              />
              <img v-else class="likeBtn" src="../assets/like_blank.png" alt="Image 2" />
            </button>

            <span class="suite-regular left-space-3">좋아요</span>
            <span class="suite-bold left-space-3"> 28</span>
            <span class="suite-regular left-space-6"></span>
            <img class="likeBtn" src="../assets/comment.png" />
            <span class="suite-regular left-space-3">댓글</span>
            <span class="suite-bold left-space-3"> 2</span>
          </div>
        </div>

        <hr />

        <button @click="" v-show="true" class="btn btn-success m-1">글작성</button>
        <button @click="" class="btn btn-light m-1">공유</button>
        <button @click="" v-show="true" class="btn btn-light m-1">수정</button>
        <button @click="" v-show="true" class="btn btn-light m-1">삭제</button>
        <hr />
        <h5>댓글 작성</h5>
        <div class="row mb-3" style="height: 3.4em">
          <div class="col-xs-12 col-sm-12 col-md-10 col-lg-11">
            <input type="textarea" style="width: 100%; height: 100%" />
          </div>
          <div class="col-xs-12 col-sm-12 col-md-2 col-lg-1">
            <button class="comment-btn" style="width: 100%; height: 100%">작성</button>
          </div>
        </div>

        <div class="row">
          <div
            class="col-1 col-sm-2 col-md-1 col-lg-1"
            style="display: flex; justify-content: center"
          >
            <img
              class="userProfile p-1"
              src="https://samg.net/2020/wp-content/uploads/2020/08/chachaping_011.png"
            /><br />
          </div>
          <div class="col-11 col-sm-10 col-md-11 col-lg-11">
            <div class="comment-user">차차핑</div>
            <div class="comment-body">와아아아ㅏㅇ</div>
            <div class="comment-day">2023.11.03 17:53</div>
          </div>
          <hr class="mt-2" />
        </div>

        <div class="row">
          <div
            class="col-1 col-sm-2 col-md-1 col-lg-1"
            style="display: flex; justify-content: center"
          >
            <img
              class="userProfile p-1"
              src="https://blog.kakaocdn.net/dn/AYQEW/btrSsn2U4ID/pAYYIby9vYdKXjMhJxCWmK/img.png"
            /><br />
          </div>
          <div class="col-11 col-sm-10 col-md-11 col-lg-11">
            <div class="comment-user">소원핑</div>
            <div class="comment-body">으와아아와아아아ㅏㅇ</div>
            <div class="comment-day">2023.11.03 17:53</div>
          </div>
          <hr class="mt-2" />
        </div>

        <hr />
        <div>
          <h4 @click="">이전글 | 게시글 제목</h4>
          <h4 @click="">다음글 | 게시글 제목</h4>
        </div>
      </div>
    </div>
    <div class="col-xl-1"></div>
  </div>
</template>

<style scoped>
table {
  border: 1px solid #000;
  border-radius: 6px;
  font-family: 'SUITE-Regular';
}

h1 {
  font-family: 'JalnanGothic';
}
h4 {
  font-family: 'SUITE-Regular';
  font-size: 1.15em;
}
h5 {
  font-family: 'SUITE-Light';
  font-size: 1em;
}

.suite-regular {
  font-family: 'SUITE-Regular';
}
.suite-light {
  font-family: 'SUITE-Light';
}
.suite-bold {
  font-family: 'SUITE-Bold';
}
.left-space-3 {
  margin-left: 3px;
}
.left-space-6 {
  margin-left: 6px;
}

#boardDetailContent {
  border: 1px solid #bbb;
  border-radius: 10px;
}
.comment-btn {
  border: none;
  border-radius: 4px;
}
.comment-btn:hover {
  border: none;
  background-color: #aaa;
}
.comment-user {
  font-family: 'SUITE-Bold';
  font-size: 16px;
}
.comment-body {
  font-size: 16px;
}
.comment-day {
  font-size: 14px;
  color: #aaa;
}
.userProfile {
  border-radius: 100%;
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.vertical-centering {
  display: flex;
  align-items: center;
  height: 22px;
}

.board-content {
  border: #888 1px solid;
  border-radius: 4px;
}

.likeBtn {
  height: 22px;
  background: none;
  border: none;
  cursor: pointer;
}

.likeBtnBack {
  background-color: #00000000;
  border: 0px solid #fff;
  padding: 0;
  margin: 0;
}

/* 무빙해라 좋아요 */
.shine {
  animation: shine 0.8s ease alternate;
}
@keyframes shine {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  80% {
    opacity: 0.6;
    transform: scale(3);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
