import View from "./View.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".search-results");

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join("");
  }

  _generateMarkupPreview(result) {
    return `
    <div
    class="pl-4 bg-gray-500 movie-item w-100 h-100 flex items-center border-b border-white border-2">
    <div>
      <img
        src="${result.image}"
        alt="Movie Image"
        class="object-contain w-full h-20 rounded-full p-3"
      />
    </div>
    <div class="pl-3 text-white">
      <h4><a href="#${result.id}">${result.title}</a></h4>
    </div>
  </div>
  `;
  }
}

export default new ResultsView();
