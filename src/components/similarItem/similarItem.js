const similarMovieTemplate = document.createElement("template");

similarMovieTemplate.innerHTML = `
<style>
    @import url('./src/components/similarItem/similarItem.css')
</style>
<div class="similar-item">
    <img class="similar-img"></img>
    <span class="similar-title"></span>
</div>
`;

export class SimilarItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(similarMovieTemplate.content.cloneNode(true));

    this.similarItem = this.shadowRoot.querySelector(".similar-item");
    this.similarImg = this.similarItem.querySelector(".similar-img");
    this.similarTitle = this.similarItem.querySelector(".similar-title");
  }

  set movie(movieObj) {
    this.similarImg.src = `https://image.tmdb.org/t/p/w300${movieObj.backdrop_path}`;

    if (this.similarImg.src === `https://image.tmdb.org/t/p/w300null`) {
      this.similarImg.src = `https://static.vecteezy.com/system/resources/thumbnails/004/610/390/small/no-camera-stop-camera-icon-sign-free-vector.jpg`;
    }
    this.similarTitle.textContent = movieObj.title;
  }
}
