<script setup>
import MapStopover from '@/components/MapStopover.vue'
</script>

<script>
export default {
  created() {
    // 동적 세그먼트의 값인 boardNum을 읽어옴
    const boardNum = this.$route.params.boardNum;
    // 서버에게 boardNum을 전달
    this.fetchDataFromServer(boardNum);
  },
  methods: {
    fetchDataFromServer(boardNum) {
      // 서버에게 boardNum을 전달하고 데이터를 가져오는 비동기 작업 수행
      // axios 코드 작성 위치


    }
  }
};
</script>

<template>
  <div id="boardDetailContent" class="mt-2 p-3">
    <h1>글제목</h1>
    <h5>작성자 : 김철수 | 작성일 : 2023.12.10 | 조회수 : 53 | 담기 : 23</h5>
    <hr />

    <map-stopover></map-stopover>

    <h3 class="suite-bold">매력 포인트</h3>
    <div class="board-content mt-2 p-2">여기에 여행지 코멘트 나와야 합니다.</div>

    <div class="mt-5">
      <img
        class="userProfile p-1"
        src="https://samg.net/2020/wp-content/uploads/2020/08/chachaping_011.png"
      />
      <span class="comment-user">차차핑</span>
      <span>님의 글 더보기</span> <br />
      <div class="vertical-centering mt-2">
        <img id="likeBtn" src="../assets/like_fill.png" />
        <span class="suite-regular left-space-3">좋아요</span>
        <span class="suite-bold left-space-3"> 28</span>
        <span class="suite-regular left-space-6"></span>
        <img id="likeBtn" src="../assets/comment.png" />
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
      <div class="col-1 col-sm-2 col-md-1 col-lg-1" style="display: flex; justify-content: center">
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
      <div class="col-1 col-sm-2 col-md-1 col-lg-1" style="display: flex; justify-content: center">
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
  border: 1px solid #888;
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

#likeBtn {
  height: 22px;
}
</style>
