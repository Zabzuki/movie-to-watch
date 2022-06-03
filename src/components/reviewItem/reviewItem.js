const reviewTemplate = document.createElement("template");

reviewTemplate.innerHTML = `
  <style>
    @import url('./src/components/reviewItem/reviewItem.css')
  </style>
  <div class="review-item">
        <span class="review-author"></span>
        <span class="review-content"></span>
  </div>
`;

export class ReviewItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(reviewTemplate.content.cloneNode(true));

    this.reviewItem = this.shadowRoot.querySelector(".review-item");
    this.author = this.reviewItem.querySelector(".review-author");
    this.content = this.reviewItem.querySelector(".review-content");
  }

  set review(reviewObj) {
    this.content.textContent = reviewObj.content
      ? reviewObj.content
      : "Currently there isn't any available comment. Please check again later!";
    this.author.textContent = reviewObj.author ? `${reviewObj.author}:` : "";
  }
}
