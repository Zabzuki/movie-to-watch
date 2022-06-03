// import { getTrailer } from "../services/movieService.js";

const liTemplate = document.createElement("template");
liTemplate.innerHTML = `
  <style>
    @import url('./src/components/listItem.css')
  </style>
  <div class="list-item">
    <div class="li-main">
      <img class="li-img"></img>
      <span class="li-title"></span>
    </div>
    <div class="content">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation 
      ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>
  </div>
`;

export class ListItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(liTemplate.content.cloneNode(true));
    this.show = false;

    this.listItem = this.shadowRoot.querySelector(".list-item");
    this.listImg = this.listItem.querySelector(".li-img");
    this.placeholder = this.listTitle =
      this.listItem.querySelector(".li-title");
    this.toggleContent = this.listItem.querySelector(".content");

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

  async toggle(movieId) {
    // const trailer = await getTrailer(movieId);

    this.show = !this.show;
    this.toggleContent.style.display = this.show ? "block" : "none";
    this.dispatchEvent(new CustomEvent("showChange", { detail: this.show }));
  }
}
