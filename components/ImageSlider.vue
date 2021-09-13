<template>
  <div class="imgSlider">
    <div class="imgSlider_overlay">
      <slot></slot>
    </div>
    <button class="imgSlider_navigation imgSlider_navigation--next" @click="changeCurrentImage(-1)"></button>
    <button class="imgSlider_navigation imgSlider_navigation--prev" @click="changeCurrentImage(1)"></button>
    <div class="imgSlider_slidesContainer" :style="`transform: translateX(${calculateOffset()}%)`">
    <img
      v-for="img in images"
      :key="img"
      :src="img"
      alt="Movie image"
      class="slidesContainer_slide"
    >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      required: true,
      type: Array,
    },
  },

  data() {
    return {
      currentImageIndex: 0,
    };
  },

  methods: {
    calculateOffset() {
      return this.currentImageIndex * 100;
    },

    changeCurrentImage(offset) {
      if ((this.currentImageIndex + offset) < -(this.images.length - 1) || (this.currentImageIndex + offset) > 0) {
        this.currentImageIndex = 0;
      } else {
        this.currentImageIndex += offset;
      }
    },
  },

  mounted() {
    setInterval(() => {
      this.changeCurrentImage(-1);
    }, 3000);
  }
}
</script>

