<script setup>
import BoardAllPage from '../components/BoardAllPage.vue'
import SidePage from './SidPage.vue'
</script>

<template>
  <div class="row">
    <div class="col-xl-1"></div>
    <div class="col-12 col-sm-12 col-md-3 col col-lg-3 col-xl-3">
      <side-page></side-page>
    </div>
    <div class="col-12 col-sm-12 col-md-9 col col-lg-9 col-xl-7">
      <div class="mt-2" @click="">
        <div class="board-content">
          <h3 class="jalnan-gothic" style="display: inline">🛫전체글</h3>
        </div>
        <hr />
        <board-all-page></board-all-page>
      </div>
    </div>
    <div class="col-xl-1"></div>
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
.list-backgrond {
  background-color: #f3f3f3;
}

.board-content {
  padding: 2px;
  margin: 2px;
}
</style>
