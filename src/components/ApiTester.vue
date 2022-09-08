<script>
import { defineComponent } from 'vue';

import { loadMovie } from '@/services/api/movies';

export default defineComponent({
  data () {
    return {
      movie: null,
      error: '',
      loading: false
    }
  },

  methods: {
    async loadMovie (movieId) {
      if (this.loading) {
        return;
      }

      this.movie = null;
      this.error = '';
      this.loading = true;

      try {
        const { data } = await loadMovie(movieId);

        this.movie = data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },

    loadRandomMovie () {
      const randomID = 1 + Math.floor(Math.random() * 9);

      this.loadMovie(randomID);
    }
  }
});
</script>

<template>
  <div
    @submit.prevent="onSubmit"
    class="tester"
  >
    <h1 class="tester__header">
      Movie API tester
    </h1>

    <button
      class="tester__button"
      @click="loadRandomMovie"
    >
      Get movie data~!
    </button>

    <transition
      name="fade"
    >
      <p
        v-if="error"
        class="tester__error"
      >
        {{ error }}
      </p>
    </transition>
  </div>

  <transition
    name="fade"
  >
    <article
      v-if="movie"
      class="movie"
    >
      <h2 class="movie__title">
        {{ movie.title }}
      </h2>

      <p class="movie__description">
        {{ movie.description }}
      </p>

      <img
        :src="movie.poster_url"
        :alt="`${movie.title} poster`"
        class="movie__poster"
      />
    </article>
  </transition>
</template>

<style lang="scss" scoped>
.tester,
.movie {
  padding: 1.6rem;
  margin: 0.8rem;
  border: 0.1rem solid gray;
  border-radius: 0.4rem;
}

.tester {
  display: flex;
  flex-flow: column;

  &__button {
    max-width: 25rem;
    margin-top: 0.8rem;
    color: white;
    background-color: skyblue;
    border: none;
    border-radius: 0.4rem;
    padding: 0.8rem 1.6rem;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.1s linear;

    &:hover {
      background-color: steelblue;
    }
  }

  &__error {
    color: crimson;
    font-weight: bold;
  }
}

.fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.3s ease-in-out;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}

.movie {
  display: grid;
  grid-template-areas:
    "title poster"
    "description poster";
  grid-template-columns: 1fr 25%;
  grid-template-rows: min-content 1fr;
  grid-column-gap: 1.6rem;

  &__title {
    grid-area: title;
  }

  &__description {
    grid-area: description;
    max-width: 75ch;
  }

  &__poster {
    grid-area: poster;
    display: block;
    width: 100%;
  }
}
</style>
