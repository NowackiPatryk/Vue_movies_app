<template>
  <div class="ratingInput">
    <img
      v-for="(star, index) in preparedStars"
      @mouseover="handleMouseOver(index)"
      :key="index"
      :src="require(`~/assets/icons/star_${star ? 'checked' : 'normal'}.png`)"
      alt="rating star"
      class="ratingInput_star">
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
    },

    max: {
      type: Number,
      default: 5,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      current: null,
    };
  },

  computed: {
    preparedStars() {
      const stars = [];

      for (let i = 1 ; i <= this.max ; i ++) {
        if (i <= this.current) {
          stars.push(true);
        } else {
          stars.push(false);
        }
      }

      return stars;
    },
  },

  methods: {
    handleMouseOver(index) {
      if (this.disabled) {
        return;
      }

      this.current = index + 1;
      this.$emit('input', this.current);
    },
  },

  beforeMount() {
    this.current = this.value;
  }
}
</script>
