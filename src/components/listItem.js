const liTemplate = document.createElement("template");
liTemplate.innerHTML = `
  <style>
    @import url('./src/components/listItem.css')
  </style>
  <div class="list-item">
    <img class="li-img">poster_path</img>
    <span class="li-title">Title</span>
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
    //this.movie =
    this.listImg = this.listItem.querySelector(".li-img");
    this.listTitle = this.listItem.querySelector(".li-title");
  }
}
