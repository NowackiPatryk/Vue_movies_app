<template>
  <article class="searchPage">
    <section class="searchPage_searchBox">
      <TextInput
        name="Search"
        v-model="search"
      />
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
  },
};
</script>
