const liTemplate = document.createElement("template");
liTemplate.innerHTML = `
  <style>
    @import url('./src/components/listItem.css')
  </style>
  <div class="list-item">
      <img class="li-img"></img>
      <span class="li-title"></span>
    <button class="li-btn">
      <span class="btn-text">...</span>
    </button>
  </div>
`;

export class ListItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(liTemplate.content.cloneNode(true));

    this.listItem = this.shadowRoot.querySelector(".list-item");
    this.listImg = this.listItem.querySelector(".li-img");
    this.listTitle = this.listItem.querySelector(".li-title");
  }

  set movie(movieObj) {
    this.listImg.src = `https://image.tmdb.org/t/p/w300/${movieObj.backdrop_path}`;

    this.listTitle.textContent = movieObj.title;

    this.setAttribute("id", movieObj.id);
  }
}
