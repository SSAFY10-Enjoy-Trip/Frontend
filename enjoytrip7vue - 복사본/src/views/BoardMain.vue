<script setup>
  import BoardValue from '@/components/BoardValue.vue'
</script>
<script>

export default {
  methods: {
    navigateToBoardAll() {
      this.$router.push({ path: '/bordAll' });
    },
    navigateToBoardFollow() {
      this.$router.push({ path: '/bordFollow' });
    },
    navigateToBoardHot() {
      this.$router.push({ path: '/bordHot' });
    }
  }
}
</script>

<template>
  <div class="mt-2" @click="navigateToBoardAll">
    <div class="board-content">
    <h3 class="jalnan-gothic" style="display: inline;">🛫전체글</h3>
    <span class="suite-regular"> 보러가기</span>
    </div>
    <hr>
    <board-value></board-value>
  </div>
  <div class="mt-5" @click="navigateToBoardFollow">
    <div class="board-content">
      <h3 class="jalnan-gothic" style="display: inline;">🌟팔로우글</h3>
      <span class="suite-regular"> 보러가기</span>
    </div>
    <hr>
    <board-value></board-value>
  </div>

  <div class="mt-5" @click="navigateToBoardHot">
    <div class="board-content">
      <h3 class="jalnan-gothic" style="display: inline;">🔥주간 인기글</h3>
      <span class="suite-regular"> 보러가기</span>
    </div>
    <hr>
    <board-value></board-value>
  </div>
</template>

<style scoped>
table {
  border: 1px solid #e3e3e3;
  text-align: center;
}
.user-profile {
  border-radius: 100%;
  width: 55px;
  height: 55px;
  object-fit: cover;
  border: #eee solid 1px;
}
.list-backgrond{
  background-color: #f3f3f3;
}

.board-content {
  padding: 2px;
  margin: 2px;
}

.board-content:hover {
  cursor: pointer;
  background-color: #fff3b8;
}

</style>
