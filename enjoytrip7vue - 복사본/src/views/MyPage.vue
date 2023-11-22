<template>
    <div>
        <div class="row">
            <div class="col-md-1 col-lg-2 col-xl-2"></div>
                <div class="col-12 col-sm-12 col-md-10 col-lg-8 col-xl-8">
                    <div class="p-4" style=" background-color: #fafafa; border-radius: 20px; border: 2px solid #eee;">

                        <div  class="d-flex justify-content-center">
                        <img style="width: 100px; border-radius: 30px;  border:2px solid #eee " :src="profilePicture" alt="프로필 사진" @click="handleProfilePictureClick">
                        
                        </div>
                        <div class="text-center"> {{ nickname }}</div>
                        <div class="suite-bold d-flex justify-content-center">
                            <button v-show="true" style="background-color: #aafaaa;" >팔로우</button>
                            <button v-show="true" style="background-color: #faaaaa;" >언팔로우</button>
                        </div>
                        <hr>
                        

                        <div class="row mt-3">
                            <div class="col-12 col-sm-4 col-md-4 col-lg-3" style="background-color:blueviolet;  background-image: url('/src/assets/state2.gif'); background-size: center center;">
                                
                            </div>
                            
                            <div class="col-12 col-sm-8 col-md-8 col-lg-9 suite-regular ps-4" style="">
                                <p>닉네임: <span v-if="!isEditingNickname">{{ nickname }}</span>
                                    <input v-if="isEditingNickname" v-model="editedNickname" />
                                    <button v-if="isEditingNickname" @click="saveNickname">변경</button>
                                    <button v-if="!isEditingNickname" @click="editNickname">수정</button>
                                </p>
                                <p>직책: {{ position }} </p>
                                <p>Email: {{ email }}</p>
                                <p>PW:  
                                    <button @click="editPassword">변경</button>
                                </p>
                                <p>👥 팔로우 수: {{ followingCount }}  👤 팔로워 수: {{ followersCount }}</p>
                            </div>
                        </div>
                    </div>
                        
                    <h3 class="suite-bold">📝 작성한 글</h3>
                    <hr>
                    <table>
                        <tr>
                            <td></td>
                        </tr>
                    </table>
                    <h3 class="suite-bold">💗 좋아요한 글</h3>
                    <hr>
                    <table>
                        <tr>
                            <td></td>
                        </tr>
                    </table>
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
        editedNickname: '',
      };
    },
    methods: {
      handleProfilePictureClick() {
        // 프로필 사진 변경 로직 추가
      },
      editNickname() {
        this.isEditingNickname = true;
        this.editedNickname = this.nickname;
      },
      saveNickname() {
        // 닉네임 저장 로직 추가
        this.isEditingNickname = false;
        this.nickname = this.editedNickname;
      },
      editPassword() {
        // 비밀번호 수정 로직 추가
      },
    },
  };
  </script>
  
  <style scoped>
  /* 스타일 추가 */
  </style>
  