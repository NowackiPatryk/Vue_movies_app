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
      },
    };

    return this.$axios.$get('https://imdb8.p.rapidapi.com/title/find', config);
  },

  async getOneById({}, id) {
    const config = {
      params: {
        tconst: id,
      },
      headers: {
        ...requiredHeaders,
      },
    };

    const credits = await this.$axios.$get('https://imdb8.p.rapidapi.com/title/get-full-credits', config);
    const images = await this.$axios.$get('https://imdb8.p.rapidapi.com/title/get-images', {
      ...config,
      params: {
        tconst: id,
        limit: 10,
      }
    });
    const plotInfo = await this.$axios.$get('https://imdb8.p.rapidapi.com/title/get-plots', config);

    const filteredImages = images.images.filter(image => image.width > image.height);

    return {
      ...credits,
      plot: plotInfo.plots[0],
      images: filteredImages,
      comments: [
        {
          author: 'John',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec viverra neque. Suspendisse tempus turpis ac congue vulputate.',
          rating: 3,
        },
      ],
    };
  },
}
