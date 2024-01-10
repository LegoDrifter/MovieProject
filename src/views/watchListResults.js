import View from "./View.js";

class WatchListResults extends View {
  _parentElement = document.querySelector(".search-results");
  _clickElement = document.querySelector(".navbar");

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join("");
  }

  viewHandlerWatchlist(handler) {
    this._clickElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".nav__btn--add-watchlist");

      if (!btn) return;
      handler();
    });
  }

  _generateMarkupPreview(watchlist) {
    return `
    <div
    class="pl-4 bg-gray-500 movie-item w-100 h-100 flex items-center border-b border-white border-2">
    <div>
      <img
        src="${watchlist.image}"
        alt="Movie Image"
        class="object-contain w-full h-20 rounded-full p-3"
      />
    </div>
    <div class="pl-3 text-white">
      <h4><a href="#${watchlist.id}">${watchlist.title}</a></h4>
    </div>
  </div>
  `;
  }
}

export default new WatchListResults();
