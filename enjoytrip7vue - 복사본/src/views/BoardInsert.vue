<script setup>
import MapSelect from '@/components/MapSelect.vue'
</script>

<template>
  <div id="boardDetailContent" class="mt-2 p-3">
    <h3 class="suite-bold">코스 선정</h3>
    <div class="suite-regular">핀을 움직이고, 장소추가를 통해 코스에 등록하세요!</div>

    <map-select></map-select>

    <hr />

    <h3 class="suite-bold">코스 이름</h3>
    <input class="board-content mt-2 mb-4 p-2" placeholder="개성있는 코스 이름을 지어주세요!" />

    <h3 class="suite-bold">매력 포인트</h3>
    <textarea class="board-content mt-2 mb-4 p-2" placeholder="코스에 대해 설명해주세요" />

    <hr />

    <button @click="" v-show="true" class="btn btn-success m-1">작성완료</button>
  </div>
</template>

<style scoped>
#boardDetailContent {
  border: 1px solid #888;
}

.board-content {
  border: #888 1px solid;
  border-radius: 4px;
  width: 100%;
}
textarea {
  height: 300px;
}
</style>
