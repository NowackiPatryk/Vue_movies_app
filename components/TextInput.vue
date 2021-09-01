<template>
  <div :class="`inputContainer ${outlined ? 'inputContainer--outlined' : null}`">
    <label
      :for="name"
      :class="`inputContainer_label ${outlined ? 'inputContainer--outlined_label' : null}`"
    >
      {{ name }}
    </label>
    <input
      :class="`inputContainer_input ${outlined ? 'inputContainer--outlined_input' : null}`"
      :name="name"
      :type="hidden ? 'password' : 'text'"
      @focus="outlined = true"
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
  },

  data() {
    return {
      outlined: false,
    };
  },

  methods: {
    handleInput(event) {
      this.$emit('input', event.target.value);
    },

    handleFocusOut(event) {
      this.outlined = event.target.value.length;
    }
  }
};
</script>

