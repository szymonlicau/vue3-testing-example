import { beforeEach, describe, expect, it, vi } from 'vitest';
import { flushPromises, shallowMount } from '@vue/test-utils';

import ApiTester from '@/components/ApiTester.vue';
import { loadMovie } from '@/services/api/movies';

vi.mock('@/services/api/movies', () => ({
  loadMovie: vi.fn()
}));

const createComponent = () => shallowMount(ApiTester);
const findHeader = (wrapper) => wrapper.find('[data-spec="header"]');
const findGetMovieButton = (wrapper) => wrapper.find('[data-spec="button"]');
const findMovieTitle = (wrapper) => wrapper.find('[data-spec="movie-title"]');
const findMovieDescription = (wrapper) => wrapper.find('[data-spec="movie-description"]');
const findMoviePoster = (wrapper) => wrapper.find('[data-spec="movie-image"]');
const findErrorMessage = (wrapper) => wrapper.find('[data-spec="error"]');

describe('ApiTester.vue', () => {
  it('displays header', () => {
    const wrapper = createComponent();
    const header = findHeader(wrapper);

    expect(header).toBeDefined();
  });

  it('displays button', () => {
    const wrapper = createComponent();
    const button = findGetMovieButton(wrapper);

    expect(button).toBeDefined();
  });

  describe('when clicked and movie found', () => {
    beforeEach(() => {
      loadMovie.mockImplementationOnce(() => Promise.resolve({
        data: {
          title: 'Harry Potter',
          description: 'Fajny film',
          poster_url: 'https://harry.potter/poster.png'
        }
      }));
    });

    it('displays movie information', async () => {
      const wrapper = createComponent();
      const button = findGetMovieButton(wrapper);

      await button.trigger('click');
      await flushPromises();

      const movieTitle = findMovieTitle(wrapper);
      const movieDescription = findMovieDescription(wrapper);
      const moviePoster = findMoviePoster(wrapper);

      expect(movieTitle.text()).toMatch('Harry Potter');
      expect(movieDescription.text()).toMatch('Fajny film');
      expect(moviePoster.attributes('src')).toMatch('https://harry.potter/poster.png');
    });
  });

  describe('when clicked and movie not found', () => {
    beforeEach(() => {
      loadMovie.mockImplementationOnce(() => Promise.reject('Error message'));
    });

    it('displays error message', async () => {
      const wrapper = createComponent();
      const button = findGetMovieButton(wrapper);

      await button.trigger('click');
      await flushPromises();

      const error = findErrorMessage(wrapper);
      expect(error.text()).toMatch('Error message');
    });
  });
});
