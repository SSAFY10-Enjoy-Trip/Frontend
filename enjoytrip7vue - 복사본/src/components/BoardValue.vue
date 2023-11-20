<template>
  <div
    v-for="(item, index) in items"
    :key="index"
    @click="showBoardDetail(item.num)"
    class="m-2 suite-regular board-content p-3"
  >
    <div class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <h4 class="suite-bold">{{ item.title }}</h4>
      </div>
      <div
        class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
        style="display: flex; align-items: flex-end; justify-content: flex-end"
      >
        {{ item.author }} | {{ item.time }} | 조회 {{ item.views }}
      </div>
    </div>

    <hr />
    <div class="row">
      <div><span class="suite-bold">🚩 출발 : </span> {{ item.departure }}</div>
      <div><span class="suite-bold">🏁 도착 : </span> {{ item.destination }}</div>
    </div>
    <div class="row">
      <div class="row">
        <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">🕑 여행일 : {{ item.day }} 일</div>
        <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
          👜 경유지 : {{ item.waypoints }} 개
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: '반짝반짝 빛 따라 걸어요!',
          num: 1,
          author: '김철수',
          time: '5분 전',
          views: 52,
          departure: '부산 사하구 다대로 548',
          destination: '부산 사하구 장림시장9길 54',
          waypoints: '5',
          duration: '3시간',
          cost: '1800',
          day: 3
        }
      ]
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
