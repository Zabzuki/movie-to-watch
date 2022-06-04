export const getNewestMovies = async (pageNumber) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=bc50218d91157b1ba4f142ef7baaa6a0&page=${pageNumber}`;
    let response = await fetch(url, {
      method: "GET",
    });
    response = await response.json();
    return { results: response["results"], page: response["page"] };
  } catch (error) {
    console.error(error);
  }
};

export const getMovie = async (movieId) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=bc50218d91157b1ba4f142ef7baaa6a0`;
    let response = await fetch(url, {
      method: "GET",
    });
    response = await response.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getTrailer = async (movieId) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=bc50218d91157b1ba4f142ef7baaa6a0`;
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
    const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=bc50218d91157b1ba4f142ef7baaa6a0`;
    let response = await fetch(url, {
      method: "GET",
    });
    response = await response.json();
    return { results: response["results"], id: movieId };
  } catch (error) {
    console.error(error);
  }
};

export const getSimilarMovies = async (movieId) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=bc50218d91157b1ba4f142ef7baaa6a0`;
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
    const url = `https://api.themoviedb.org/3/search/movie?api_key=bc50218d91157b1ba4f142ef7baaa6a0&query=${movie}`;
    let response = await fetch(url, {
      method: "GET",
    });
    response = await response.json();
    return { results: response["results"], page: pageNumber };
  } catch (error) {
    console.error(error);
  }
};
