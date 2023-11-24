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
                <div class="text-black suite-bold h5">함께 나눠 더 즐거운</div>
                <h1
                  class="text-capitalize suite-extrabold mb-4 text-lg glow-text p-2"
                  id="glowText"
                >
                  *✧반짝이는 하루들✧*
                </h1>
                <ul class="list-inline">
                  <li class="list-inline-item"><a href="#" class="text-white"></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    glowEffect(element, duration) {
      const textArray = element.textContent.split('')
      const newText = textArray
        .map((char, index) => {
          return `<span style="animation: glow ${duration}s ease ${
            index * 0.1
          }s infinite">${char}</span>`
        })
        .join('')
      element.innerHTML = newText
    }
  },
  mounted() {
    const glowText = this.$el.querySelector('#glowText')
    this.glowEffect(glowText, 2) // 2초 동안 효과 적용
  }
}
</script>

<style>
.glow-text {
  font-size: 36px;
  font-weight: bold;
  color: #333;
  display: inline-block;
  overflow: hidden;
  outline: 3px solid #ffffff;
  background-color: #ffffff26;
}

@keyframes glow {
  0% {
    color: #3589ff;
    text-shadow: 0 0 5px #ffffff4d;
    transform: scale(1);
  }
  50% {
    color: #2e0072ed;
    text-shadow: 0 0 20px #ffffff;
    transform: scale(3);
  }
  100% {
    color: #333;
    text-shadow: 0 0 5px #ffffff31;
    transform: scale(1);
  }
}
</style>
