import { AppComponent } from "./appComponent.js";
import { ListItem } from "./components/listItem/listItem.js";
import { ReviewItem } from "./components/reviewItem/reviewItem.js";
export class AppModule {
  static defineElements() {
    window.customElements.define("app-root", AppComponent);
    window.customElements.define("list-item", ListItem);
    window.customElements.define("review-item", ReviewItem);
  }
}
