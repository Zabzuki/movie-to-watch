import { MovieService } from "./services/movieService.js";

const appTemplate = document.createElement("template");
appTemplate.innerHTML = `
    <style>
        @import url('./src/appComponent.css')
    </style>
    <div class="list-container">
        <span class="title" >Latest Movies</span>
        <div class="search-container">
            <input class="search-input" placeholder="Search">
            </input>
            <button class="search-btn">
                <span class="search-btn-span">Search</span>
            </button>
        </div>
        <div class="list-items">
        </div>
    </div>
`;

export class AppComponent extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(appTemplate.content.cloneNode(true));
    this.movieService = new MovieService();

    this.fetchMovies(1);

    this.listContainer = this.shadowRoot.querySelector(".list-container");
    this.listItems = this.listContainer.querySelector(".list-items");
  }
  async fetchMovies(pageNumber) {
    const movies = await this.movieService.getNewestMovies(pageNumber);

    console.log(movies);
    movies.results.map((movie) => {
      let listItem = document.createElement("list-item");
      listItem.id = movie.id;
      listItem.movie = movie;
      this.listItems.appendChild(listItem);
    });
  }
}
