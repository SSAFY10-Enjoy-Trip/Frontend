<script setup></script>

<template>
  <nav class="navbar navbar-expand-lg bg-light mb-3">
    <div class="container-fluid">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxtomcAhqHu3X2B8Haxa3bK3mXFYqhMtDYJg&usqp=CAU"
        alt=""
        style="height: 24px"
      />
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<style scoped>
table {
  border: 1px solid #000;
  border-radius: 6px;
  font-family: 'SUITE-Regular';
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
