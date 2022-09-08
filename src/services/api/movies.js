import client from '@/services/api/client';

export const loadMovie = (movieId) => {
  return client.get(`/movies/${movieId}`);
};
