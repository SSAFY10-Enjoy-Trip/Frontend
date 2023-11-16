<script setup>

</script>

<template>
  <div class="m-2">
    <table class="table mb-3">
      <thead>
        <tr>
          <th scope="col">카테고리</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>전체글</td>
        </tr>
        <tr>
          <td><router-link to="/boardList" class="nav-link">팔로우글</router-link></td>
        </tr>
        <tr>
          <td>주간인기글</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  border: 1px solid #000;
  border-radius: 6px;
  font-family: 'SUITE-Regular';
  text-align: center;
}

@font-face {
  font-family: 'JalnanGothic';
  src: url('@/assets/fonts/JalnanGothicTTF.ttf');
}
@font-face {
  font-family: 'SUITE-Regular';
  src: url('@/assets/fonts/SUITE-Regular.ttf');
}
h1 {
  font-family: 'JalnanGothic';
}
</style>
