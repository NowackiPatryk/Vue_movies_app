const requiredHeaders = {
  'x-rapidapi-host': process.env.rapidHost,
  'x-rapidapi-key': process.env.rapidApiKey,
};

export const state = () => ({})

export const mutations = {}

export const actions = {
  async getResultsBySearchTerm({}, term) {
    const config = {
      params: {
        q: term,
      },
      headers: {
        ...requiredHeaders,
      }
    };

    return this.$axios.$get('https://imdb8.p.rapidapi.com/title/find', config);
  }
}
