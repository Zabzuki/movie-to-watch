# Movie to watch

## How to install and run

1. Download the example [or clone the repo](https://github.com/Zabzuki/movie-to-watch)
2. Open `index.html` document and **Go Live** ([Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension on VSCode).
3. Ready to use!

## Description

`movie-to-watch` display movies playing in the theaters, that are fetched from [themoviedb.org API](https://developers.themoviedb.org/3) in a friendly way. Users are able to browse through the latest movies using **inifinite scrolling** without waiting any new HTTP GET request, to render content.
Every movie is clickable where the `<div>` content extends in an performant way, where details like **trailer, reviews, similar movies** are presented (if they exist).
There is also added an `<input>` field where user can search for specific movies.

- In the below GIF can see the infinity scroll functionality and the expand option with the relevant results of each movie.
  ![](gifs/infinityScroll.gif)

- In the below GIF you can also see the search option of a movie and the infinity scroll / expand option of the results.
  ![](gifs/searchScroll.gif)

## Technologies

1. Vanilla JavaScript (Web Components)
2. HTML5
3. CSS

## Architecture

The app follows the component based architecture and consists of five main parts.

1. `appModule` is the main file which contains the definition of the base component (`<app-root>`) and the rest of the components that are used (`listItem, reviewItem, similarItem`).
2. `appComponent` is the file where the container of the web application is first created. The most important parts that are applied are the search `<input>` and the reusable `listItem` component which is wrapped with the "infinity scrolling" functinality.
3. `reviewItem, similarItem` components that works the same like `listItem`, which means that are all reusable.
4. `movieService` where the communication with the API and all the HTTP GET requests of the application are applied.
5. `utils` which is a generic file where scrolling process gets observed / unobserved in different files of the application.

## Definition of rendered Elements

The `appModule` contains the definition of the `defineElements()` method where all the components present in the application are defined there.

```JavaScript
export class AppModule {
  static defineElements() {
    window.customElements.define("app-root", AppComponent);
    window.customElements.define("list-item", ListItem);
    window.customElements.define("review-item", ReviewItem);
    window.customElements.define("similar-item", SimilarItem);
  }
}
```

## Web Components Structure

The `appComponent` forms the main body of the application, which contains the basic code which is required. Furthermore `appComponent` is the only component exposed in the `index.html` as `<app-root>`.
In the below example template element is created and then in the HTML `list-items` are rendered as a `<div>` tag which is rendered as an external reusable component.

```JavaScript
const appTemplate = document.createElement("template");
appTemplate.innerHTML = `
    <style>
        @import url('./src/appComponent.css')
    </style>
    <div class="list-container">
        <span class="title" >Latest Movies</span>
        <form class="search-container">
            <input type="text" class="search-input" name="movieName" placeholder="Search">
            </input>
            <input type="submit" value="Search" class="search-btn"></input>
        </form>
        <div class="scroller">
            <div class="list-items"></div>
            <div class="sentinel"></div>
        </div>
    </div>
`;
```

After the creation of HTML, `getNewestMovies()` (HTTP GET) call returns the newest movies which are mapped and a `list-item` created with the `createElement("list-item)`.

```JavaScript
renderMovies(movies) {
    .
    .
    .
    movies.map((movie) => {
      let listItem = document.createElement("list-item");
      listItem.id = movie.id;
      listItem.movie = movie;
      this.listItems.appendChild(listItem);
    });
    this.listItems.appendChild(this.sentinel);
  }
```

## Infinity Scrolling

For the infinity scrolling process a `<div>` named `sentinel` added exactly after the `listItem, reviewItem, similarItem`. Then the `IntersectionObserver` observe when the `sentinel` gets rendered and then a new HTTP GET request applied.
The observe / unobserve happens in the same way in three different places so a generic file with the name `utils` hosting functions for both cases.

In the `setUpScrollListeners` gets passed arguments like `self` just to inform function where should look up for "this". `sentinel` that when gets rendered `entry.interesctionRatio` becomes 1 so the corresponding callback applied based on the process and params where the search value used for scrolling cases like a movie search.

```JavaScript
export const setUpScrollListeners = (self, sentinel, callback, params) => {
  let intersectionObserver = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.intersectionRatio > 0)) {
      callback.call(self, params);
    }
  });
  intersectionObserver.observe(sentinel);
  return intersectionObserver;
};
```

`tearDownScrollListeners` similarly gets `intersectionObserver` from `setUpScrollListeners` and `sentinel`, too. Then sentinel just gets unobserved just to be able `setUpScrollListeners` applied again in different usage after the already rendered results gets cleared.

```JavaScript
export const tearDownScrollListeners = (intersectionObserver, sentinel) => {
  intersectionObserver.unobserve(sentinel);
};
```

`tearDownScrollListeners` is called in cases like when tear down and return zero results.

## Todos

1. Unit tests
2. Mobile friendly
3. Error handling
4. Empty state
5. Memory cache

## Useful Links

- [To-Do List Application (Web Components)](https://github.com/savinuvijay/todo-list)
- [MDN Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [webcomponents.org](https://www.webcomponents.org/)
- [webcomponent.dev](https://webcomponent.dev/)
- [Using Fetch method](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [MDN Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/unobserve)
- [Component-based Architecture for Dynamic HTML Websites](https://javascript.plainenglish.io/component-based-architecture-for-dynamic-html-websites-857c21f0c95a)
- [Adding State to Custom HTML Elements](https://itnext.io/adding-state-to-custom-html-elements-639961c7c529)
- [web-components-examples](https://github.com/mdn/web-components-examples)
- [How To Do Infinite Scrolling the Right Way](https://betterprogramming.pub/how-to-do-infinite-scrolling-the-right-way-a64e3463b0e3)
- [IntersectionObserver Sample](https://googlechrome.github.io/samples/intersectionobserver/)
- [w3schools How TO - Collapse](https://www.w3schools.com/howto/howto_js_collapsible.asp)
