export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  update(data = null, length = null, fav = null, rating = null, review = null) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    if (length !== null && fav === true) {
      this.updateFavoritesLength(length);
    } else if (length !== null && fav === false) {
      this.updateWatchListLength(length);
    }

    if (rating !== null) {
      this.updateRating(rating);
    }

    if (review !== null) {
      this.updateReview(review);
    }

    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);

    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      if (!newEl.isEqualNode(curEl)) {
        // const curElementButton = curEl.querySelector(".favorite--button");
        // const newElementButton = newEl.querySelector(".favorite--button");
        // const curElementButton2 = curEl.querySelector(".watchlist--button");
        // const newElementButton2 = newEl.querySelector(".watchlist--button");

        // if (curElementButton && newElementButton) {
        //   const img = curEl.querySelector(".favorite--button");
        //   const newE = newEl.querySelector(".favorite--button");
        //   console.log(newE.src);
        //   img.src = newE.src;
        //   console.log(img.src);

        // }

        // if (curElementButton2 && newElementButton2) {
        //   const img = curEl.querySelector(".watchlist--button");
        //   const newE = newEl.querySelector(".watchlist--button");
        //   console.log(newE.src);
        //   img.src = newE.src;
        //   console.log(img.src);

        // }
        console.log(newEl);
        const updateButton = (buttonClassName) => {
          const curElBtn = curEl.querySelector(buttonClassName);
          const newElBtn = newEl.querySelector(buttonClassName);

          if (curElBtn && newElBtn) {
            curElBtn.src = newElBtn.src;
          }
        };

        updateButton(".favorite--button");
        updateButton(".watchlist--button");
      }
    });
  }

  updateFavoritesLength = (length) => {
    const favoritesLengthSpan = document.querySelector(".favorite--length");
    favoritesLengthSpan.textContent = length.toString();
  };

  updateWatchListLength = (length) => {
    const watchListLengthSpan = document.querySelector(".watchlist--length");
    watchListLengthSpan.textContent = length.toString();
  };

  updateRating = (rating) => {
    const userRating = document.querySelector(".ratinG");
    const input = document.querySelector(".yourRating");
    userRating.textContent = rating.toString();
    input.value = "";
  };

  updateReview = (review) => {
    const userReview = document.querySelector(".reviewG");
    const input = document.querySelector(".yourReview");
    userReview.textContent = review;
    input.value = "";
  };

  renderSpinner() {
    const markup = `
    <div class="spinner-container>
    <div class="spinner" ></div>
    </div>
    `;
    this._clear;
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
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
}
