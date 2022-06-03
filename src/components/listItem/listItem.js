import {
  getTrailer,
  getReviews,
  // getSimilarMovies,
} from "../../services/movieService.js";

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
    </div>
  </div>
`;

export class ListItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(liTemplate.content.cloneNode(true));
    this.show = false;
    this.hasRendered = false;

    this.listItem = this.shadowRoot.querySelector(".list-item");
    this.reviewItems = this.listItem.querySelector(".review-items");

    this.listImg = this.listItem.querySelector(".li-img");
    this.placeholder = this.listTitle =
      this.listItem.querySelector(".li-title");
    this.toggleContent = this.listItem.querySelector(".content");

    this.trailer = this.listItem.querySelector(".trailer");

    this.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.toggle(event.target.id);
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
    this.show = !this.show;
    this.dispatchEvent(new CustomEvent("showChange", { detail: this.show }));
    this.toggleContent.style.display = this.show ? "block" : "none";

    if (this.hasRendered) return;
    this.hasRendered = true;

    this.renderTrailer(movieId);
    this.addReviewItem(movieId);
    this.renderSimilar(movieId, 1);
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

  // async renderSimilar(movieId, pageNumber) {
  //   const videos = await getSimilarMovies(movieId, pageNumber);
  //   // console.log(videos);
  // }

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
}
