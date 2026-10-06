// Get your own key at https://www.themoviedb.org/settings/api and set it here.
const API_KEY = "bc50218d91157b1ba4f142ef7baaa6a0";
const BASE_URL = "https://api.themoviedb.org/3";

export const getNewestMovies = async (pageNumber) => {
  try {
    const url = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${pageNumber}`;
    let response = await fetch(url, {
      method: "GET",
    });
    response = await response.json();
    return { results: response["results"], page: response["page"] };
  } catch (error) {
    console.error(error);
  }
};

export const getTrailer = async (movieId) => {
  try {
    const url = `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`;
    let response = await fetch(url, {
      method: "GET",
    });
    response = await response.json();
    return { results: response["results"], id: movieId };
  } catch (error) {
    console.error(error);
  }
};

export const getReviews = async (movieId) => {
  try {
    const url = `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`;
    let response = await fetch(url, {
      method: "GET",
    });
    response = await response.json();
    return { results: response["results"], id: movieId };
  } catch (error) {
    console.error(error);
  }
};

export const getSimilarMovies = async (movieId, pageNumber) => {
  try {
    const url = `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&page=${pageNumber}`;
    let response = await fetch(url, {
      method: "GET",
    });
    response = await response.json();
    return { results: response["results"], id: movieId };
  } catch (error) {
    console.error(error);
  }
};

export const getSearchResults = async (movie, pageNumber) => {
  try {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${movie}&page=${pageNumber}`;
    let response = await fetch(url, {
      method: "GET",
    });
    response = await response.json();
    return { results: response["results"], page: pageNumber };
  } catch (error) {
    console.error(error);
  }
};
