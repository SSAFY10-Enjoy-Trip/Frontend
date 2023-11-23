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
            <button v-show="true" class="btn-follow text-center ps-3 pe-3">팔로우</button>
            <button v-show="true" class="btn-unfollow text-center ps-3 pe-3">언팔로우</button>
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
            <span class="h5 text-center"><strong> 직책: </strong> {{ position }}</span>
            <span class="h5 text-center"><strong> Email: </strong> {{ email }}</span>
            <span class="h5 text-center">
              <strong> PW: </strong>
              <input type="password" class="input-area text-center" />
              <button @click="editPassword" class="change-btn left-space-6">변경</button>
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
          <div class="info-section gray-line p-3 mb-1">
            <h5 class="suite-bold">반짝반짝 빛 따라 걸어요</h5>
            <div class="suite-regular">🚩 출발 : 부산 사하구 다대로 548</div>
            <div class="suite-regular">🏁 도착 : 부산 사하구 장림시장9길 54</div>
          </div>
          <div class="info-section gray-line p-3 mb-1">
            <h5 class="suite-bold">반짝반짝 빛 따라 걸어요</h5>
            <div class="suite-regular">🚩 출발 : 부산 사하구 다대로 548</div>
            <div class="suite-regular">🏁 도착 : 부산 사하구 장림시장9길 54</div>
          </div>
        </div>
        <div class="info-section mt-3 m-4 mb-4 p-4">
          <h3 class="suite-bold">💗 좋아요한 글</h3>
          <hr />
          <div class="info-section gray-line p-3 mb-1">
            <h5 class="suite-bold">반짝반짝 빛 따라 걸어요</h5>
            <div class="suite-regular">🚩 출발 : 부산 사하구 다대로 548</div>
            <div class="suite-regular">🏁 도착 : 부산 사하구 장림시장9길 54</div>
          </div>
        </div>
      </div>
      <div class="col-md-1 col-lg-2 col-xl-2"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profilePicture: 'src/assets/noProfile.png',
      nickname: '사용자 닉네임',
      email: 'user@example.com',
      position: '사용자 직책',
      followersCount: 100, // 예시 값
      followingCount: 50, // 예시 값
      isEditingNickname: false,
      editedNickname: ''
    }
  },
  methods: {
    handleProfilePictureClick() {
      // 프로필 사진 변경 로직 추가
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
    editPassword() {
      // 비밀번호 수정 로직 추가
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
