<script setup>
  import BoardPage from '@/components/BoardPage.vue'
</script>

<template>
  <div class="mt-2" @click="">
    <div class="board-content">
    <h3 class="jalnan-gothic" style="display: inline;">🔥주간 인기글</h3>
    </div>
    <hr>
    <board-page></board-page>
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


</style>
