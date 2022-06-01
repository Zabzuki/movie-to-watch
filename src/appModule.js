import { AppComponent } from "./appComponent.js";
import { ListItem } from "./components/listItem.js";

export class AppModule {
  static defineElements() {
    window.customElements.define("app-root", AppComponent);
    window.customElements.define("list-item", ListItem);
  }
}
