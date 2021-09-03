<template>
  <article class="resultsPage" v-if="!isLoading">
    <nuxt-link
      v-for="result in results"
      :to="`results/${extractMovieId(result.id)}`"
      :key="result.id"
      class="resultsPage_result"
    >
      <div class="result_imgContainer">
        <img
          v-if="result.image"
          :src="result.image.url"
          alt="movie image"
          class="imgContainer_img"
        >
      </div>
      <div class="result_content">
        <p class="content_title">{{ result.title }}</p>
        <div class="content_details">
          <p class="details_year">{{ result.year }}</p>
          <p class="details_type">
            {{ result.titleType ? capitalize(result.titleType) : null }}
          </p>
          <p class="details_episodes">
            Episodes: {{ result.numberOfEpisodes || 1 }}
          </p>
        </div>
        <div class="content_principals" v-if="result.principals">
          <header class="principals_title">Actors</header>
          <p
            v-for="principal in result.principals"
            :key="principal.name"
            class="principals_principal"
          >
            {{ principal.name }}
          </p>
      </div>
      </div>
    </nuxt-link>
  </article>
  <Loading v-else />
</template>

<script>
import Loading from '../../components/Loading';

export default {
  components: {
    Loading,
  },

  data() {
    return {
      isLoading: true,
      results: null,
    }
  },

  methods: {
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    extractMovieId(fullId) {
      const regex = new RegExp('/title/', 'g');
      return fullId.replace(regex, '');
    },
  },

  async fetch() {
    const response = await this.$store.dispatch('movies/getResultsBySearchTerm', this.$route.query.term);
    this.results = response.results;
    this.isLoading = false;
  }
}
</script>