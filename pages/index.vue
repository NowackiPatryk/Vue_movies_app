<template>
  <article class="searchPage">
    <section class="searchPage_searchBox">
      <TextInput name="Search" @input="logValue"/>
    </section>
  </article>
</template>

<script>
import TextInput from '~/components/TextInput.vue';

export default {
  components: {
    TextInput,
  },

  data() {
    return {
      search: '',
    }
  },

  methods: {
    logValue(value) {
      console.log(value);
    },
  },
};
</script>
