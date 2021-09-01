<template>
  <div :class="`inputContainer ${isOutlined ? 'inputContainer--outlined' : null}`">
    <label
      :for="name"
      :class="`inputContainer_label ${isOutlined ? 'inputContainer--outlined_label' : null}`"
    >
      {{ name }}
    </label>
    <input
      :class="`inputContainer_input ${isOutlined ? 'inputContainer--outlined_input' : null}`"
      :name="name"
      :type="hidden ? 'password' : 'text'"
      :value="value"
      @focus="isOutlined = true"
      @blur="handleFocusOut"
      @input="handleInput"
    />
  </div>
</template>

<script>
export default {
  props: {
    name: {
      required: true,
      type: String,
    },

    hidden: {
      type: Boolean,
      default: false,
    },

    outlined: {
      type: Boolean,
      default: false,
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

