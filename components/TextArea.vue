<template>
    <textarea
      :class="`textArea ${isOutlined ? 'textArea--outlined' : null}`"
      :placeholder="placeholder"
      :value="value"
      :rows="rows"
      :cols="cols"
      @focus="isOutlined = true"
      @blur="handleFocusOut"
      @input="handleInput"
      resize="none"
    >
    </textarea>
</template>

<script>
export default {
  props: {
    placeholder: {
      required: true,
      type: String,
    },

    outlined: {
      type: Boolean,
      default: false,
    },

    rows: {
      type: String,
      default: 20,
    },

    cols: {
      type: String,
      default: 30,
    },

    value: String,
  },

  data() {
    return {
      isOutlined: null,
    };
  },

  methods: {
    handleInput(event) {
      this.$emit('input', event.target.value);
    },

    handleFocusOut(event) {
      if (!this.outlined) {
        this.isOutlined = event.target.value.length;
      }
    },
  },

  fetch() {
    this.isOutlined = this.outlined;
  }
};
</script>

