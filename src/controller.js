import * as model from "./model.js";
import View from "./views/View.js";
import movieView from "./views/movieView.js";
import resultsView from "./views/resultsView.js";
import searchView from "./views/searchView.js";
import paginationView from "./views/paginationView.js";
import favoriteResults from "./views/favoriteResults.js";
import watchListResults from "./views/watchListResults.js";

const movieContainer = document.querySelector(".mov_container");

const controlMovies = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;

    // 1) Loading movie
    movieView.renderSpinner();
    await model.loadMovie(id);
    const movie = model.state.movie;
    // console.log(movie);
    // 2) Rendering movie
    movieView.render(model.state.movie);
  } catch (error) {
    movieView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);
    resultsView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlAddFavorite = function () {
  if (!model.state.movie.favoritelisted) {
    model.addFavorite(model.state.movie);
  } else model.deleteFavorite(model.state.movie.id);

  console.log(model.state.movie);
  movieView.update(model.state.movie, model.getFavoritesLength(), true);
};

const controlAddWatchlist = function () {
  if (!model.state.movie.watchlisted) {
    model.addWatchList(model.state.movie);
  } else model.deleteWatchList(model.state.movie.id);

  movieView.update(model.state.movie, model.getWatchListLength(), false);

  console.log(model.state.movie);
};

const controlFavoriteResults = function () {
  console.log(model.state.favoritelist);
  favoriteResults.render(model.state.favoritelist);
  const object = {
    query: "",
    results: model.state.favoritelist,
    page: 1,
    resultsPerPage: 50,
  };
  movieView.render(model.state.favoritelist[0]);
  paginationView.render(object);
};

const controlWatchListResults = function () {
  console.log(model.state.watchlist);
  watchListResults.render(model.state.watchlist);
  const object = {
    query: "",
    results: model.state.watchlist,
    page: 1,
    resultsPerPage: 50,
  };
  movieView.render(model.state.watchlist[0]);
  paginationView.render(object);
};

const controlRating = function (rateValue) {
  model.ratingSubmission(rateValue);
  movieView.update(model.state.movie, null, null, rateValue);
};

const controlReview = function (reviewString) {
  model.reviewSubmission(reviewString);
  movieView.update(model.state.movie, null, null, null, reviewString);
  console.log(model.state.movie);
};

const controlFavLength = function () {
  favoriteResults.updateFavoritesLength(model.getFavoritesLength());
};
const controlWatchLength = function () {
  watchListResults.updateWatchListLength(model.getWatchListLength());
};

const controlTop10 = async function () {
  const object = {
    query: "",
    results: await model.loadTop10(),
    page: 1,
    resultsPerPage: 50,
  };
  resultsView.render(object.results);
  paginationView.render(object);
};

const init = function () {
  movieView.addHandlerRender(controlMovies);
  movieView.addHandlerRating(controlRating);
  movieView.addHandlerReview(controlReview);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  movieView.addHandlerFavorite(controlAddFavorite);
  movieView.addHandlerWatchList(controlAddWatchlist);
  favoriteResults.viewHandlerFavorite(controlFavoriteResults);
  watchListResults.viewHandlerWatchlist(controlWatchListResults);
  controlTop10();
  controlFavLength();
  controlWatchLength();
};
init();
