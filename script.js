const modal = document.querySelector("[data-modal]");
const closeButton = document.querySelector("[data-close-modal]");
const noMovieFoundModal = document.getElementById("movie-details-modal");
// const closeNoMovieDialog = document.querySelector(
//   "[data-close-movie-details-modal]"
// );

async function getMovieByTitle(movieTitle) {
  const movieName = document.getElementById("movie-name");
  const searchResult = document.getElementById("display-search-result");
  //   const moviePoster = document.getElementById("movie-poster");
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?t=${movieTitle}&apikey=4bb00576`,
      {
        method: "POST",
      }
    );

    console.log(response.status);
    const movie = await response.json();
    console.log(movie);
    // console.log(movie.Title);
    modal.showModal();
    // localStorage.setItem("selectedMovie", JSON.stringify(data));
    // location.href = "movie.html";

    const moviePoster = document.getElementById("movie-poster");
    const imgTag = document.querySelector("img");
    imgTag.src = movie.Poster;

    const title = document.getElementById("title");
    title.textContent = `${movie.Title}`;
    const released = document.getElementById("released-text");
    released.textContent = `${movie.Released}`;
    const genre = document.getElementById("genre-text");
    genre.textContent = `${movie.Genre}`;
    const runtime = document.getElementById("runtime-text");
    runtime.textContent = `${movie.Runtime}`;
    const country = document.getElementById("country-text");
    country.textContent = `${movie.Country}`;
    const casts = document.getElementById("casts-text");
    casts.textContent = `${movie.Actors}`;
    const boxOffice = document.getElementById("box-office-text");
    boxOffice.textContent = `${movie.BoxOffice}`;
    const plot = document.getElementById("plot-text");
    plot.textContent = `${movie.Plot}`;
    const type = document.getElementById("type-text");
    type.textContent = `${movie.Type}`;
    const rating = document.getElementById("rating-text");
    rating.textContent = `${movie.imdbRating}`;
  } catch (err) {
    console.error("Error:", err);
  }
}

closeButton.addEventListener("click", () => {
  modal.close();
});

function closeNoMovieDialog() {
  closeNoMovieDialog.close();
}

async function getMoviesList() {
  const movieName = document.getElementById("movie-name");
  const container = document.getElementById("display-search-result");
  const noMoviesFound = document.getElementById("no-movies");
  container.innerHTML = "";
  noMoviesFound.innerHTML = "";
  noMoviesFound.style.backgroundColor = "transparent";
  //   const moviePoster = document.getElementById("movie-poster");
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?s=${movieName.value}&apikey=4bb00576`,
      {
        method: "POST",
      }
    );
    // 4bb00576

    console.log(response.status);
    const data = await response.json();
    const movies = data.Search;
    console.log(data.Response);
    if (data.Response == "True") {
      console.log(movies);
      // if (searchResultLength)
      // console.log(`data length = ${data.Search.length}`);
      let list = document.getElementById("movie-list");
      movies.forEach((movie) => {
        // const title = movie.Title;
        // const year = movie.Year;
        // const imdbID = movie.imdbID;
        // const typeOf = movie.Type;
        // const poster = movie.Poster;

        const movieCard = document.createElement("div");
        movieCard.id = "movie-card";

        const movieImg = document.createElement("div");
        movieImg.id = "movie-img";
        const img = document.createElement("img");
        img.src = movie.Poster;
        movieImg.appendChild(img);

        const movieInfo = document.createElement("div");
        movieInfo.id = "movie-info-card";

        const movieTitle = document.createElement("div");
        movieTitle.id = "movie-title";
        movieTitle.textContent = `Title: ${movie.Title}`;

        const releaseYear = document.createElement("div");
        releaseYear.id = "movie-release-year";
        releaseYear.textContent = `Year: ${movie.Year}`;

        // const IMDbId = document.createElement("div");
        // IMDbId.id = "movie-imdb-id";
        // IMDbId.textContent = `imdb id: ${movie.imdbID}`;

        const type = document.createElement("div");
        type.id = "movie-type";
        type.textContent = `Type: ${movie.Type}`;

        // Append all movie info
        movieInfo.appendChild(movieTitle);
        movieInfo.appendChild(releaseYear);
        // movieInfo.appendChild(IMDbId);
        movieInfo.appendChild(type);
        // Append image and info to movie card
        movieCard.appendChild(movieImg);
        movieCard.appendChild(movieInfo);
        // Append movie card to container
        container.appendChild(movieCard);

        movieCard.addEventListener("click", () => {
          getMovieByTitle(movie.Title);
        });
      });
    } else {
      noMoviesFound.textContent = "No Movies Found";
      noMoviesFound.style.backgroundColor = "red";
    }
    // for (let i in movies) {
    //   const title = movies[i].Title;
    //   let li = document.createElement("li");
    //   li.innerText = title;
    //   list.appendChild(li);
    //   // searchResult.innerHTML += `<p>${title}</p>`;
    //   // console.log(movies[i]);
    // }
  } catch (err) {
    console.error("Error:", err);
  }
}
