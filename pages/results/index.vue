<template>
  <article v-if="!isLoading" class="resultsPage">
    <div
      v-for="result in results"
      :key="result.id"
      class="resultsPage_result"
    >
      <div class="result_imgContainer">
        <img v-if="result.image" :src="result.image.url" alt="movie image" class="imgContainer_img">
      </div>
      <p class="result_title">{{ result.title }}</p>
      <div class="result_details">
        <p class="details_year">{{ result.year }}</p>
        <p class="details_type">{{ result.titleType }}</p>
        <p class="details_episodes">Episodes: {{ result.numberOfEpisodes }}</p>
      </div>
      <div class="result_principals">
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
  </article>
</template>

<script>
export default {

  data() {
    return {
      isLoading: true,
      results: null,
    }
  },


  async fetch() {
    const response = await this.$store.dispatch('movies/getResultsBySearchTerm', this.$route.query.term);
    this.results = response.results;
    this.isLoading = false;
  }
}
</script>