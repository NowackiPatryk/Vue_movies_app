<template>
  <article class="searchPage">
    <section class="searchPage_searchBox">
      <header class="searchBox_header">
        Search movie
      </header>
      <form class="searchBox_form">
        <TextInput
          name="Search"
          v-model="search"
        />

        <button
          class = "form_submitBtn"
          @click.prevent = "redirectToSearch"
        >
          Submit
        </button>
      </form>
      <p class="searchBox_info">
        Type name of the movie in label above and enjoy informations that you're looking for!
      </p>
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
    redirectToSearch() {
      this.$router.push(`/results?term=${this.search}`);
    }
  },
};
</script>
