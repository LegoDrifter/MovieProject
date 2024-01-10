export const state = {
  movie: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: 10,
  },
  favoritelist: [],
  watchlist: [],
};

// export const loadMovieDetails = async function(id) {
//     try{
//         const [movieResponse, actorsResponse, ratingsResponse, crewResponse]
//     }
// }

export const loadMovie = async function (id) {
  try {
    const url = `https://moviesdatabase.p.rapidapi.com/titles/${id}?info=custom_info`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "acc9e45244msh870851aae183348p153226jsned16ae73f124",
        "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${data.status})`);

    // console.log(data);

    const defaultImageUrl = "/src/images/notrailer.png";
    const defaultPosterUrl = "/src/images/poster.jpg";
    const defaultActorUrl = "/src/images/actor_no_photo.jpg";

    const principalCast = data.results?.principalCast;
    const credits =
      principalCast && Array.isArray(principalCast)
        ? principalCast[0]?.credits
        : [];

    const actors = credits
      ? credits.map((actor) => ({
          name: actor.name?.nameText,
          img: actor.name?.primaryImage || defaultActorUrl,
          character: actor.characters?.[0]?.name || "N/A",
        }))
      : [];

    const movie = data.results;
    state.movie = {
      id: movie.id,
      title: movie.titleText.text,
      image: movie.primaryImage?.url || defaultPosterUrl,
      releaseYear: movie.releaseYear?.year || "N/A",
      genre: movie.genres?.genres[0]?.text || "N/A",
      rating: movie.ratingsSummary?.aggregateRating || "?",
      votes: movie.ratingsSummary?.voteCount || "N/A",
      runtime: movie.runtime?.seconds ? movie.runtime.seconds / 60 : "N/A",
      plot: movie.plot?.plotText?.plainText || "N/A",
      director: movie.directors?.[0]?.credits[0]?.name?.nameText?.text || "N/A",
      trailer: movie?.trailer || defaultImageUrl,
      actors: actors,
      yourRating: null,
      rated: false,
      yourReview: null,
      reviewed: false,
    };

    if (state.favoritelist.some((f) => f.id === id))
      state.movie.favoritelisted = true;
    else state.movie.favoritelisted = false;

    if (state.watchlist.some((f) => f.id === id))
      state.movie.watchlisted = true;
    else state.movie.watchlisted = false;

    const storedRating = getStoredRating(id);
    if (storedRating !== null) {
      state.movie.yourRating = parseInt(storedRating);
      state.movie.rated = true;
    }

    const storedReview = getStoredReview(id);
    if (storedReview !== null) {
      state.movie.yourReview = storedReview;
      state.movie.reviewed = true;
    }

    console.log(state.movie);
  } catch (err) {
    console.error(`${err} 💥💥💥`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    console.log(query);
    const url = `https://moviesdatabase.p.rapidapi.com/titles/search/title/${query}?exact=false&info=mini_info&limit=50&titleType=movie`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "acc9e45244msh870851aae183348p153226jsned16ae73f124",
        "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);

    const defaultPosterUrl = "/src/images/poster.jpg";

    state.search.results = data.results.map((movie) => {
      return {
        id: movie.id,
        title: movie.titleText.text,
        image: movie.primaryImage?.url || defaultPosterUrl,
      };
    });
    state.search.page = 1;

    if (!response.ok) throw new Error(`${data.message} (${data.status})`);
  } catch (err) {
    console.error(`${err} 💥💥💥`);
    throw err;
  }
};

export const loadTop10 = async function () {
  try {
    const url =
      "https://moviesdatabase.p.rapidapi.com/titles?list=top_boxoffice_last_weekend_10";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "acc9e45244msh870851aae183348p153226jsned16ae73f124",
        "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    // console.log(data);

    const defaultPosterUrl = "/src/images/poster.jpg";

    state.search.results = data.results.map((movie) => {
      return {
        id: movie.id,
        title: movie.titleText.text,
        image: movie.primaryImage?.url || defaultPosterUrl,
      };
    });

    state.search.page = 1;
    return state.search.results;
  } catch (error) {
    console.error(error);
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; // 0;
  const end = page * state.search.resultsPerPage; // 9;

  return state.search.results.slice(start, end);
};

const persistFavorites = function () {
  localStorage.setItem("favoritelist", JSON.stringify(state.favoritelist));
};

const persistWatchList = function () {
  localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
};

const setStoredReview = function (movieID, reviewString) {
  localStorage.setItem(`review_${movieID}`, reviewString);
};

const setStoredRating = function (movieID, ratingValue) {
  localStorage.setItem(`rating_${movieID}`, ratingValue.toString());
};

const getStoredRating = function (movieID) {
  return localStorage.getItem(`rating_${movieID}`);
};

const getStoredReview = function (movieID) {
  return localStorage.getItem(`review_${movieID}`);
};

export const addFavorite = function (movie) {
  // Add favorite
  state.favoritelist.push(movie);

  // Mark current recipe as bookmark
  if (movie.id === state.movie.id) state.movie.favoritelisted = true;

  persistFavorites();
};

export const deleteFavorite = function (id) {
  // Delete favorite
  const index = state.favoritelist.findIndex((el) => el.id === id);
  state.favoritelist.splice(index, 1);

  if (id === state.movie.id) state.movie.favoritelisted = false;

  persistFavorites();
};

export const addWatchList = function (movie) {
  state.watchlist.push(movie);

  if (movie.id === state.movie.id) state.movie.watchlisted = true;

  persistWatchList();
};

export const deleteWatchList = function (id) {
  const index = state.watchlist.findIndex((el) => el.id === id);
  state.watchlist.splice(index, 1);

  if (id === state.movie.id) state.movie.watchlisted = false;

  persistWatchList();
};

export const loadFavoriteResults = function () {
  return state.favoritelist;
};

export const loadWatchListResults = function () {
  console.log(state.watchlist);
  return state.watchlist;
};

export const ratingSubmission = function (userRating) {
  const currentMovie = state.movie;

  console.log(userRating);

  currentMovie.yourRating = userRating;

  currentMovie.rated = true;

  setStoredRating(currentMovie.id, userRating);
};

export const reviewSubmission = function (userReview) {
  const currentMovie = state.movie;
  // console.log(userReview);

  currentMovie.yourReview = userReview;

  currentMovie.reviewed = true;

  setStoredReview(currentMovie.id, userReview);
};

export const getFavoritesLength = () => state.favoritelist.length;
export const getWatchListLength = () => state.watchlist.length;

const init = function () {
  const storage = localStorage.getItem("favoritelist");
  if (storage) state.favoritelist = JSON.parse(storage);
  const storage2 = localStorage.getItem("watchlist");
  if (storage2) state.watchlist = JSON.parse(storage2);
};
init();
