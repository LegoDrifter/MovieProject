import View from "./View.js";

class MovieView extends View {
  _parentElement = document.querySelector(".mov_container");
  _errorMessage = "We could not find that movie, Please try another one!";
  _data;

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
    <img src="/src/images/spinner.svg" alt="Spinner" class="spinner" />
  
    `;
    this._clear;
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  addHandlerFavorite(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".favorite--button");
      if (!btn) return;
      handler();
    });
  }

  addHandlerWatchList(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".watchlist--button");
      if (!btn) return;
      handler();
    });
  }

  addHandlerRating(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".submitRating");
      const rating = document.querySelector(".yourRating");
      if (!btn) return;
      handler(rating.value);
    });
  }

  addHandlerReview(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".submitReview");
      const review = document.querySelector(".yourReview");
      if (!btn) return;
      handler(review.value);
    });
  }

  renderError(message = this._errorMessage) {
    const markup = `
        <div class="text-center">
        <img src="./images/error.png"/>
        <h1 class="font-bold">${message}</h1>
        </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _generateMarkup() {
    return `
    <div
    style="max-width: auto; border-radius: 15px"
    class="bg-gray-200 mr-10 p-4 border rounded-lg shadow-lg mb-4 h-72 overflow-hidden"
    >

    <!-- Movie Image and Trailer Container -->
    <div class="flex space-x-4">
        <!-- Movie Image -->
        <div>
        <img
            src="${this._data.image}"
            alt="Movie Image"
            class="object-contain rounded-lg"
            style="max-width: 250px;"
        />
    </div>
        <!-- Movie Trailer -->
    <div class>
        <iframe
            width="500"
            height="375"
            src="${this._data.trailer}"
            title="YouTube video player"
            frameborder="0"
            allowfullscreen
        ></iframe>
        </div>
    </div>


    <div class="movie-text text-center">
      <div class="flex space-x-4"><!-- Movie Title -->
      <div><h2 class="text-xl font-bold mt-4">${this._data.title}</h2></div>
      <div><button ><img src="${
        this._data.watchlisted
          ? "/src/images/test-gold.png"
          : "/src/images/test.png"
      }" class="max-h-12 watchlist--button" /></button></div>
      <div><button><img src="${
        this._data.favoritelisted
          ? "/src/images/favorite.png"
          : "/src/images/favorite-unchecked.png"
      }" class="max-h-12 favorite--button" /></button></div>
      </div>

      <div class="flex space-x-4">

      <div ><h2 class="font-bold">Director: </h2><p class="text-gray-600">${
        this._data.director
      }</p></div>
      
      <div ><!-- Release Year -->
      <h2 class="font-bold">Release Year: </h2><p class="text-gray-600">${
        this._data.releaseYear
      }</p></div>

      <div ><!-- Genre -->
      <h2 class="font-bold">Genre: </h2><p class="text-gray-600">${
        this._data.genre
      }</p></div>

      <div ><!-- Genre -->
      <h2 class="font-bold">Runtime: </h2><p class="text-gray-600">${
        this._data.runtime
      }min</p></div>

      <div ><!-- Imdb Score -->
      <h2 class="font-bold">Rating: </h2><p class="text-gray-600">${
        this._data.rating
      }/10</p></div>

      <div ><h2 class="font-bold">Total Votes: </h2><p class="text-gray-600">${
        this._data.votes
      }</p></div>
      </div>

      <div>
      <div ><h2 class="font-bold">Plot: </h2><p class="text-gray-600">${
        this._data.plot
      }</p>
      </div>

      <div>
      <label for="yourRating">Your Rating:</label>
      <span class="ratinG font-bold">${this._data?.yourRating}</span>
      <div class ="divRating" style="inline-block">
      <input type="number" class="yourRating" min="1" max="10"/>
      <button class="submitRating">Submit</button>
      </div>
      </div>

      <div><label for="yourReview">Your Review:</label></div>
      <div><span class="reviewG font-bold">${
        this._data?.yourReview
      }</span></div>
      <div class="divReview" style="inline-block">
      <textarea class="yourReview" rows="4" cols="50" placeholder="Write your review here"></textarea>
      <button class="submitReview">Submit Review</button>
      </div>
      
      </div>

      <div>
        <h3 class="font-bold ">Actors:</h3>
        <div class ="flex space-x-4 flex-direction-row">
        ${this._data.actors
          .map(
            (actor) => `
            <div class="mr-4 mb-4">
        <img src="${
          actor?.img?.url || "/src/images/actor_no_photo.jpg"
        }" style="width: 100px; height: 100px;" class="rounded-full">
        <p class="mt-2">${actor?.name.text}</p>
        <p class="text-gray-600">as ${actor?.character}</p>
        </div>
            `
          )
          .join("")}
        </div>

      </div>
      </div>
    </div>
  </div>
    `;
  }
}

export default new MovieView();
