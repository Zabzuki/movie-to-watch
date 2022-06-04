import { getNewestMovies, getSearchResults } from "./services/movieService.js";
import { setUpScrollListeners, tearDownScrollListeners } from "./utils.js";

const appTemplate = document.createElement("template");
appTemplate.innerHTML = `
    <style>
        @import url('./src/appComponent.css')
    </style>
    <div class="list-container">
        <span class="title" >Latest Movies</span>
        <form class="search-container">
            <input type="text" class="search-input" name="movieName" placeholder="Search">
            </input>
            <input type="submit" value="Search" class="search-btn"></input>
        </form>
        <div class="scroller">
            <div class="list-items"></div>
            <div class="sentinel"></div>
        </div>
    </div>
`;

export class AppComponent extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(appTemplate.content.cloneNode(true));
    this.state = {
      newestPageCounter: 1,
      searchPageCounter: 1,
      scrollListenerObserver: null,
    };

    this.listContainer = this.shadowRoot.querySelector(".list-container");
    this.listItems = this.listContainer.querySelector(".list-items");

    this.scroller = this.listContainer.querySelector(".scroller");
    this.sentinel = this.listContainer.querySelector(".sentinel");

    this.fetchMovies(this.state.newestPageCounter);
    this.state.scrollListenerObserver = setUpScrollListeners(
      this,
      this.sentinel,
      this.fetchMovies
    );

    this.form = this.listContainer.querySelector(".search-container");
    this.form.addEventListener("submit", this.handleSearch.bind(this));
  }

  async fetchMovies() {
    const movies = await getNewestMovies(this.state.newestPageCounter);
    this.state.newestPageCounter++;

    movies.results.map((movie) => {
      let listItem = document.createElement("list-item");
      listItem.id = movie.id;
      listItem.movie = movie;
      this.listItems.appendChild(listItem);
    });
    this.listItems.appendChild(this.sentinel);
  }

  async handleSearch(event) {
    event.preventDefault();
    tearDownScrollListeners(this.state.scrollListenerObserver, this.sentinel);

    this.listItems.innerHTML = "";
    this.scroller.style.visibility = "hidden";

    const data = new FormData(event.target);
    const formJSON = Object.fromEntries(data.entries());
    const { movieName } = formJSON;
    await this.fetchSearchMovies(movieName);

    this.state.scrollListenerObserver = setUpScrollListeners(
      this,
      this.sentinel,
      this.fetchSearchMovies,
      movieName
    );
  }

  async fetchSearchMovies(movieName) {
    const movies = await getSearchResults(
      movieName,
      this.state.searchPageCounter
    );
    this.state.searchPageCounter++;
    this.scroller.style.visibility = "visible";
    movies.results.map((movie) => {
      let listItem = document.createElement("list-item");
      listItem.id = movie.id;
      listItem.movie = movie;
      this.listItems.appendChild(listItem);
    });
    this.listItems.appendChild(this.sentinel);
  }
}
