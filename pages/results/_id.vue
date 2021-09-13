<template>
  <article class="resultPage" v-if="!isLoading">
    <div class="resultPage_main">
      <div class="main_imgContainer" v-if="movie.base.image">
      <ImageSlider
        :images="filteredImages.map(img => img.url)"
      >
        <header class="imgContainer_header">{{ movie.base.title }}</header>
        <p class="imgContainer_plot">{{ movie.plot.text }}</p>
      </ImageSlider>
      </div>
      <section class="main_cast">
        <span
          role="button"
          @click="toggleCastVisibility"
          class="cast_toggleVisibilityButton"
        >
          {{ castVisible ? 'Hide Cast' : 'Show Cast' }}
        </span>
        <div
          v-for="actor in cast"
          :key="actor.id"
          class="cast_eachActor"
        >
          <div class="eachActor_imageContainer">
            <img :src="actor.image ? actor.image.url : null" alt="Actor photo" class="imageContainer_image">
          </div>
          <div class="eachActor_name">{{ actor.name }}</div>
        </div>
      </section>
    </div>
    <section class="resultPage_commentsContainer">
      <form class="commentsContainer_addForm">
        <div class="addForm_row">
          <TextInput
            v-model="form.nick"
            name="Nick"
          />
          <RatingInput
            v-model="form.rating"
          />
        </div>
        <div class="addForm_row">
          <TextArea
            placeholder="Type comment here..."
            v-model="form.content"
          />
        </div>
        <buton class="addForm_submit" @click.prevent="handleSubmit">Leave a comment</buton>
      </form>
      <div class="commentsContainer_comments">
        <div
          v-for="(comment, index) in comments"
          :key="index"
          class="comments_comment"
        >
          <div class="comment_info">
            <div class="info_nick">{{ comment.nick }}</div>
            <RatingInput :value="comment.rating" disabled/>
          </div>
          <div class="comment_content">
            {{ comment.content }}
          </div>
        </div>
      </div>
    </section>
  </article>
  <Loading v-else/>
</template>

<script>
import Loading from '../../components/Loading';
import ImageSlider from '../../components/ImageSlider';
import TextInput from '../../components/TextInput';
import TextArea from '../../components/TextArea';
import RatingInput from '../../components/RatingInput';

export default {
  components: {
    Loading,
    ImageSlider,
    TextInput,
    TextArea,
    RatingInput,
  },

  data() {
    return {
      movie: null,
      castVisible: true,
      comments: [],
      isLoading: true,

      form: {
        nick: '',
        content: '',
        rating: 3,
      },
    };
  },

  computed: {
    filteredImages() {
      return this.movie.images.filter(img => img.width > img.height);
    },

    cast() {
      return this.castVisible ? this.movie.cast : [];
    },
  },

  methods: {
    handleSubmit() {
      if (!this.checkIfFormIsValid()) {
        alert('Please fill all fields in form!');
        return;
      }

      this.comments.push(this.form);
      this.resetForm();
    },

    checkIfFormIsValid() {
      return this.form.content != '' && this.form.nick != ''
    },

    resetForm() {
      this.form = {
        nick: '',
        content: '',
        rating: 4,
      };
    },

    toggleCastVisibility() {
      this.castVisible = !this.castVisible;
    },
  },

  beforeMount() {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) {
        this.castVisible = true;
      }
    })
  },

  async fetch() {
    this.movie = await this.$store.dispatch('movies/getOneById', this.$route.params.id);
    this.isLoading = false;
  }
}
</script>