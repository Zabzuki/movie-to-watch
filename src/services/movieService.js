export class MovieService {
  async getNewestMovies(pageNumber) {
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
  }
}
