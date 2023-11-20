<script setup>
import BoardValue from '@/components/BoardValue.vue'
import SidePage from './SidPage.vue'
</script>
<script>
export default {
  methods: {
    navigateToBoardAll() {
      this.$router.push({ path: '/bordAll' })
    },
    navigateToBoardFollow() {
      this.$router.push({ path: '/bordFollow' })
    },
    navigateToBoardHot() {
      this.$router.push({ path: '/bordHot' })
    }
  }
}
</script>

<template>
  <div class="mb-3">
    <div
      class="p-5"
      style="
        background: url('/src/assets/travel_main_bar2.gif') no-repeat;
        width: 100%;
        background-size: cover;
      "
    >
      <section class="">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="block text-center">
                <span class="text-white">Our services</span>
                <h1
                  class="text-capitalize mb-4 text-lg"
                  style="text-shadow: 1px 7px 20px rgba(255, 255, 255, 0.9)"
                >
                  Share your journey
                </h1>
                <ul class="list-inline">
                  <li class="list-inline-item"><a href="#" class="text-white">Home</a></li>
                  <li class="list-inline-item"><span class="text-white">/</span></li>
                  <li class="list-inline-item">
                    <a href="#" class="text-white-50">Our services</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- <img class="mb-4" src="../assets/travel_main_bar.gif" alt="" style="width: 100%" /> -->
    </div>
  </div>
  <div class="row">
    <div class="col-xl-1"></div>
    <div class="col-12 col-sm-12 col-md-3 col col-lg-3 col-xl-3">
      <side-page></side-page>
    </div>
    <div class="col-12 col-sm-12 col-md-9 col col-lg-9 col-xl-7">
      <div class="mt-2" @click="navigateToBoardAll">
        <div class="board-content">
          <h3 class="jalnan-gothic" style="display: inline">🛫전체글</h3>
          <span class="suite-regular"> 보러가기</span>
        </div>
        <hr />
        <board-value></board-value>
      </div>
      <div class="mt-5" @click="navigateToBoardFollow">
        <div class="board-content">
          <h3 class="jalnan-gothic" style="display: inline">🌟팔로우글</h3>
          <span class="suite-regular"> 보러가기</span>
        </div>
        <hr />
        <board-value></board-value>
      </div>

      <div class="mt-5" @click="navigateToBoardHot">
        <div class="board-content">
          <h3 class="jalnan-gothic" style="display: inline">🔥주간 인기글</h3>
          <span class="suite-regular"> 보러가기</span>
        </div>
        <hr />
        <board-value></board-value>
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

.board-content:hover {
  cursor: pointer;
  background-color: #fff3b8;
}
</style>
