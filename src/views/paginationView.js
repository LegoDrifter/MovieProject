import View from "./View.js";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      console.log(btn);

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages

    if (curPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
          <span class="font-bold">Page ${curPage + 1}</span>
        </button>
      `;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
        <button  data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
          <span class="font-bold">Page ${curPage - 1}</span>
        </button>
      `;
    }

    // Other page
    if (curPage < numPages) {
      return `
        <button  data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
        <span class="font-bold">Page ${curPage - 1}</span>
      </button>
        <button  data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
          <span class="font-bold">Page ${curPage + 1}</span>
        </button>
      `;
    }

    // Page 1 and there are no other pages
    return "";
  }
}

export default new PaginationView();
