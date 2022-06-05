import {
  getTrailer,
  getReviews,
  getSimilarMovies,
} from "../../services/movieService.js";
import { setUpScrollListeners } from "../../utils.js";

const liTemplate = document.createElement("template");
liTemplate.innerHTML = `
  <style>
    @import url('./src/components/listItem/listItem.css')
  </style>
  <div class="list-item">
    <div class="li-main">
      <img class="li-img"></img>
      <span class="li-title"></span>
    </div>
    <div class="content">
      <div class="row">
        <div class="review-items"></div>  
        <iframe class="trailer"></iframe>
      </div>
      <span class="similar-title">Similar Movies</span>
      <div class="scroller">
        <div class="similar-items"></div>
        <div class="sentinel"></div>
      </div>
    </div>
  </div>
`;

export class ListItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(liTemplate.content.cloneNode(true));
    this.state = {
      show: false,
      hasRendered: false,
      similarMoviesCounter: 1,
      scrollListenerObserver: null,
    };

    this.listItem = this.shadowRoot.querySelector(".list-item");
    this.reviewItems = this.listItem.querySelector(".review-items");
    this.similarItems = this.listItem.querySelector(".similar-items");

    this.listImg = this.listItem.querySelector(".li-img");
    this.listTitle = this.listItem.querySelector(".li-title");
    this.mainContent = this.listItem.querySelector(".li-main");
    this.toggleContent = this.listItem.querySelector(".content");

    this.trailer = this.listItem.querySelector(".trailer");

    this.similarTitle = this.listItem.querySelector(".similar-title");

    this.scroller = this.listItem.querySelector(".scroller");
    this.sentinel = this.listItem.querySelector(".sentinel");

    this.mainContent.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.toggle(this.id);
    });
  }

  set movie(movieObj) {
    this.listImg.src = `https://image.tmdb.org/t/p/w300${movieObj.backdrop_path}`;

    if (this.listImg.src === `https://image.tmdb.org/t/p/w300null`) {
      this.listImg.src = `https://static.vecteezy.com/system/resources/thumbnails/004/610/390/small/no-camera-stop-camera-icon-sign-free-vector.jpg`;
    }

    this.listTitle.textContent = movieObj.title;
    this.setAttribute("id", movieObj.id);
  }

  toggle(movieId) {
    this.state.show = !this.state.show;
    this.dispatchEvent(
      new CustomEvent("showChange", { detail: this.state.show })
    );
    this.toggleContent.style.display = this.state.show ? "block" : "none";

    if (this.state.hasRendered) return;
    this.state.hasRendered = true;

    this.renderTrailer(movieId);
    this.addReviewItem(movieId);

    this.state.scrollListenerObserver = setUpScrollListeners(
      this,
      this.sentinel,
      this.renderSimilarMovie,
      movieId
    );
  }

  async renderTrailer(movieId) {
    const trailerObj = await getTrailer(movieId);
    const trailers = trailerObj.results;

    trailers.map((trailer) => {
      if (trailer["name"] === "Official Trailer") {
        this.trailer.src = `https://www.youtube.com/embed/${trailer["key"]}`;
      }
    });
  }

  async addReviewItem(movieId) {
    const reviewsObj = await getReviews(movieId);
    const reviews = reviewsObj.results;
    const trimmedReviews = reviews.slice(0, 2);

    trimmedReviews.map((review) => {
      let reviewItem = document.createElement("review-item");
      reviewItem.review = review;
      this.reviewItems.appendChild(reviewItem);
    });

    if (!trimmedReviews.length) {
      let reviewItem = document.createElement("review-item");
      reviewItem.review = {};
      this.reviewItems.appendChild(reviewItem);
    }
  }

  async renderSimilarMovie(movieId) {
    const similarMoviesObj = await getSimilarMovies(
      movieId,
      this.state.similarMoviesCounter
    );
    const similarMovies = similarMoviesObj.results;
    this.state.similarMoviesCounter++;

    similarMovies.map((movie) => {
      let similarItem = document.createElement("similar-item");
      similarItem.movie = movie;
      this.similarItems.appendChild(similarItem);
    });
    this.similarItems.appendChild(this.sentinel);
  }
}
