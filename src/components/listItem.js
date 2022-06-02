const liTemplate = document.createElement("template");
liTemplate.innerHTML = `
  <style>
    @import url('./src/components/listItem.css')
  </style>
  <div class="list-item">
    <div class="li-main">
      <img class="li-img"></img>
      <span class="li-title"></span>
      <button class="li-btn">
        <span class="btn-text">...</span>
      </button>
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
    this.listTitle = this.listItem.querySelector(".li-title");
    this.listBtn = this.listItem.querySelector(".li-btn");
    this.toggleContent = this.listItem.querySelector(".content");

    this.listBtn.addEventListener("click", () => this.toggle());
  }

  set movie(movieObj) {
    this.listImg.src = `https://image.tmdb.org/t/p/w300/${movieObj.backdrop_path}`;

    this.listTitle.textContent = movieObj.title;

    this.setAttribute("id", movieObj.id);
  }

  toggle = () => {
    this.show = !this.show;
    console.log(this.show);
    this.toggleContent.style.display = this.show ? "block" : "none";
    this.dispatchEvent(new CustomEvent("showChange", { detail: this.show }));
  };
}
