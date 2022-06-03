import { getNewestMovies } from "./services/movieService.js";

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
    this.pageCounter = 1;
    this.listContainer = this.shadowRoot.querySelector(".list-container");
    this.listItems = this.listContainer.querySelector(".list-items");

    this.scroller = this.listContainer.querySelector(".scroller");
    this.sentinel = this.listContainer.querySelector(".sentinel");

    this.fetchMovies(1);
    this.setUpScrollListeners();

    // this.searchBar = this.listContainer.querySelector(".search-input");

    //this.searchResults();
  }

  async fetchMovies(pageNumber) {
    const movies = await getNewestMovies(pageNumber);
    for (let i = 0; i < pageNumber; i++) {
      let newPage = document.createElement("div");
      newPage.classList.add("list-item");
    }
    movies.results.map((movie) => {
      let listItem = document.createElement("list-item");
      listItem.id = movie.id;
      listItem.movie = movie;
      this.scroller.appendChild(listItem);
    });
  }

  setUpScrollListeners() {
    let intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.intersectionRatio > 0)) {
        this.pageCounter++;
        this.fetchMovies(this.pageCounter);
        this.scroller.appendChild(this.sentinel);
      }
    });
    intersectionObserver.observe(this.sentinel);
  }

  //   searchResults = () => {
  //     console.log(this.titleArr);
  //     window.addEventListener("load", function (event) {
  //       console.log(this.searchBar);
  //     });
  //     //console.log(search.length);
  //     this.searchBar.addEventListener("keyup", (e) => {
  //       console.log(e.target.value);
  //     });
  //   };
}
