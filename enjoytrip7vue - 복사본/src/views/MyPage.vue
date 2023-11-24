<template>
  <div>
    <div class="row" style="background-image: url('/src/assets/green.jpg')">
      <div class="col-md-1 col-lg-2 col-xl-2"></div>
      <div class="col-12 col-sm-12 col-md-10 col-lg-8 col-xl-8">
        <div class="p-4 info-section mt-5 m-4">
          <div class="d-flex justify-content-center">
            <img
              class="profile-img"
              :src="profilePicture"
              alt="프로필 사진"
              @click="handleProfilePictureClick"
            />
          </div>
          <div class="text-center suite-bold">
            <h4>{{ nickname }}</h4>
          </div>
          <div class="suite-bold d-flex justify-content-center">
            <button v-show="!isMyProfile && !isFollow" class="btn-follow text-center ps-3 pe-3">
              팔로우
            </button>
            <button v-show="!isMyProfile && isFollow" class="btn-unfollow text-center ps-3 pe-3">
              언팔로우
            </button>
          </div>
          <hr />

          <div class="row mt-3 suite-regular">
            <span class="h5 text-center">
              <strong> 닉네임:</strong> <span v-if="!isEditingNickname">{{ nickname }}</span>
              <input
                class="input-area text-center"
                v-if="isEditingNickname"
                v-model="editedNickname"
              />
              <button
                v-if="isEditingNickname"
                @click="saveNickname"
                class="change-btn left-space-6"
              >
                변경
              </button>
              <button
                v-if="!isEditingNickname"
                @click="editNickname"
                class="change-btn left-space-6"
              >
                수정
              </button>
            </span>
            <span class="h5 text-center"><strong> Email: </strong> {{ email }}</span>
            <span class="h5 text-center">
              <strong> PW: </strong>
              <input type="password" class="input-area text-center" v-model="password"/>
              <button @click="checkAndChangePassword" class="change-btn left-space-6">변경</button>
            </span>
            <span class="h5 text-center">
              <strong>👥 팔로우 수:</strong> {{ followingCount }} <strong>👤 팔로워 수:</strong>
              {{ followersCount }}
            </span>
          </div>
        </div>

        <div class="info-section mt-3 m-4 mb-2 p-4">
          <h3 class="suite-bold">📝 작성한 글</h3>
          <hr />
          <div
            class="info-section gray-line p-3 mb-1"
            v-for="(item, index) in writeBoardList.boardId"
            :key="index"
          >
            <h6>
              <span>💗 {{ writeBoardList.likeCount[index] }} </span>
              <span class="left-space-6">👀 {{ writeBoardList.viewCount[index] }}</span>
              <span class="left-space-10">📆 {{ writeBoardList.writeTime[index] }}</span>
            </h6>
            <h5 class="suite-bold">{{ writeBoardList.title[index] }}</h5>
            <div class="suite-regular">🚩 출발 : {{ writeBoardList.locationStart[index] }}</div>
            <div class="suite-regular">🏁 도착 : {{ writeBoardList.locationEnd[index] }}</div>
          </div>
        </div>

        <div class="info-section mt-3 m-4 mb-2 p-4">
          <h3 class="suite-bold">💗 좋아요한 글</h3>
          <hr />
          <div
            class="info-section gray-line p-3 mb-1"
            v-for="(item, index) in likeBoardList.boardId"
            :key="index"
          >
            <h6>
              <span>💗 {{ likeBoardList.likeCount[index] }} </span>
              <span class="left-space-6">👀 {{ likeBoardList.viewCount[index] }}</span>
              <span class="left-space-10">📆 {{ likeBoardList.writeTime[index] }}</span>
            </h6>
            <h5 class="suite-bold">{{ likeBoardList.title[index] }}</h5>
            <div class="suite-regular">🚩 출발 : {{ likeBoardList.locationStart[index] }}</div>
            <div class="suite-regular">🏁 도착 : {{ likeBoardList.locationEnd[index] }}</div>
          </div>
        </div>
      </div>
      <div class="col-md-1 col-lg-2 col-xl-2"></div>
    </div>
  </div>
</template>

<script>
import http from '@/common/axios.js'
import { useAuthStore } from '@/store/authStore'

export default {
  data() {
    return {
      profilePicture: 'src/assets/noProfile.png',
      nickname: '사용자 닉네임',
      email: 'user@example.com',
      password: '',
      position: '사용자 직책',
      isEditingNickname: false,
      editedNickname: '',
      memgerId: 0,
      // 조회한 게 내 프로필인가?
      isMyProfile: false,
      // 좋아요 게시글 목록
      likeBoardList: {
        boardId: [],
        likeCount: [],
        viewCount: [],
        writeTime: [],
        title: [],
        locationStart: [],
        locationEnd: []
      },
      // 좋아요 게시글 목록
      writeBoardList: {
        boardId: [],
        likeCount: [],
        viewCount: [],
        writeTime: [],
        title: [],
        locationStart: [],
        locationEnd: []
      },
      // 팔로워, 팔로잉 수
      followersCount: 100, // 예시 값
      followingCount: 50, // 예시 값
      // 팔로우 여부
      isFollow: false
    }
  },
  created() {
    // 동적 세그먼트의 값인 boardNum을 읽어옴
    this.email = this.$route.params.memberEmail
    this.getUserProfile()
      .then(() => this.getUserFollower())
      .then(() => this.getUserFollowing())
      .then(() => this.checkSameUser())
      .then(() => this.getWriteBoard())
      .then(() => this.getLikeBoard())
      .then(() => this.checkFollow())
      .catch((error) => console.error(error))
  },
  methods: {
    handleProfilePictureClick() {
      // 프로필 사진 변경 로직 추가
    },
    async getUserProfile() {
      let memberObj = {
        params: {
          email: this.email
        }
      }
      try {
        let { data } = await http.get('/member', memberObj)
        this.nickname = data.result.name
        this.profilePicture = data.result.profileImageUrl
        this.memgerId = data.result.memberId
      } catch (error) {
        console.log(error)
      }
    },
    async getUserFollower() {
      let memberObj = {
        params: {
          userEmailFrom: this.email
        }
      }
      try {
        let { data } = await http.get('/follow/followers', memberObj)
        this.followersCount = data.result
      } catch (error) {
        console.log(error)
      }
    },
    async getUserFollowing() {
      let memberObj = {
        params: {
          userEmailFrom: this.email
        }
      }
      try {
        let { data } = await http.get('/follow/followings', memberObj)
        this.followingCount = data.result
      } catch (error) {
        console.log(error)
      }
    },
    async getLikeBoard() {
      let memberObj = {
        member_id: this.memgerId
      }
      try {
        let { data } = await http.post('/tripBoard/like', memberObj)
        let cnt = 0
        JSON.parse(data.board).forEach((element) => {
          if (cnt == 3) {
            return
          }
          this.likeBoardList.boardId.push(element.boardId)
          this.likeBoardList.likeCount.push(element.likeCount)
          this.likeBoardList.viewCount.push(element.readCount)
          this.likeBoardList.writeTime.push(element.regDt.slice(0, 10).replaceAll('-', '.'))
          this.likeBoardList.title.push(element.title)
          let locationTemp = JSON.parse(element.location)
          this.likeBoardList.locationStart.push(locationTemp.rowNameValue[1][0])
          this.likeBoardList.locationEnd.push(
            locationTemp.rowNameValue[locationTemp.rowCount][
              locationTemp.rowNameValue[locationTemp.rowCount].length - 1
            ]
          )
          cnt++
        })
      } catch (error) {
        console.log(error)
      }
    },
    async getWriteBoard() {
      let memberObj = {
        member_id: this.memgerId
      }
      try {
        let { data } = await http.post('/tripBoard/member', memberObj)

        let cnt = 0
        JSON.parse(data.board).forEach((element) => {
          if (cnt == 3) {
            return
          }
          this.writeBoardList.boardId.push(element.boardId)
          this.writeBoardList.likeCount.push(element.likeCount)
          this.writeBoardList.viewCount.push(element.readCount)
          this.writeBoardList.writeTime.push(element.regDt.slice(0, 10).replaceAll('-', '.'))
          this.writeBoardList.title.push(element.title)
          let locationTemp = JSON.parse(element.location)
          this.writeBoardList.locationStart.push(locationTemp.rowNameValue[1][0])
          this.writeBoardList.locationEnd.push(
            locationTemp.rowNameValue[locationTemp.rowCount][
              locationTemp.rowNameValue[locationTemp.rowCount].length - 1
            ]
          )
          cnt++
        })
      } catch (error) {
        console.log(error)
      }
    },
    checkSameUser() {
      const { authStore } = useAuthStore()
      let myEmail = authStore.email
      if (this.email == myEmail) {
        this.isMyProfile = true
      }
    },
    async checkFollow() {
      // isFollow
      const { authStore } = useAuthStore()
      let myEmail = authStore.email

      let memberObj = {
        params: {
          userEmailFrom: myEmail,
          userEmailTo: this.email
        }
      }
      try {
        let { data } = await http.get('/follow/following', memberObj)
        if (data.result == 'success') {
          this.isFollow = true
        } else {
          this.isFollow = false
        }

        console.log('팔로우 했니? : ', this.isFollow)
      } catch (error) {
        console.log(error)
      }
    },
    editNickname() {
      this.isEditingNickname = true
      this.editedNickname = this.nickname
    },
    saveNickname() {
      // 닉네임 저장 로직 추가
      this.isEditingNickname = false
      this.nickname = this.editedNickname
    },
    async checkAndChangePassword() {
      const { authStore } = useAuthStore()

      try {
        let { data } = await http.get('/checkSession')
        if (data.result == 'success') {
          this.changePassword()
          this.password = '';
        }
      } catch (error) {
        authStore.logout()
      }
    },
    async changePassword() {
      const { authStore } = useAuthStore()

      let changePasswordObj = {
        email: this.email,
        password: this.password
      }

      try {
        let { data } = await http.put('http://localhost:8080/member', changePasswordObj)
        if (data.result == 'success') {
          alert('비밀번호가 변경되었습니다!')
          authStore.logout()
          this.password = '';
        }else{
          alert("비밀번호 변경 과정에 문제가 발생했습니다. 다시 시도하세요.")
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
.btn-follow {
  color: #fff;
  background-color: #07705e;
  border-radius: 20px;
  border: #03434e 3px solid;
}
.btn-unfollow {
  color: #fff;
  background-color: #b60000;
  border-radius: 20px;
  border: #851e1e 3px solid;
}

.profile-img {
  width: 100px;
  border-radius: 30px;
  border: 4px solid #054719;
  margin-bottom: 8px;
}

.info-section {
  background-color: #fafafabd;
  border-radius: 20px;
  border: 2px solid #eee;
}

.gray-line {
  border: 1px solid #aaa;
}

.input-area {
  border-radius: 20px;
  color: #077027;
  border: solid 1px #054719;
  background-color: #ffffffd7;
}
.input-area:focus {
  outline: none;
  border: solid 3px #0c6e2a;
  box-shadow: 0px 0px 5px 5px #e0ffe87c;
}

.change-btn {
  border: none;
  background-color: #077027;
  color: #fff;
  border-radius: 4px;
}
.change-btn:hover {
  background-color: #024717;
}
</style>
