const choosePicture = document.getElementById('choose')
const suggestionButton = document.querySelector('.suggestion-button')


const fetchFavorites = (number) => {
  const endPoint = `https://api.themoviedb.org/3/discover/movie?api_key=52d3e97323f3329ba592b46f79041c81&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${number}&primary_release_year=2019&page=1`
  fetch(endPoint)
    .then(data => data.json())
    .then(data => handleMovieData(data))
}

const deleteCurrentList = () => {
  const movieList = document.querySelector('.movie-list')
  movieList.innerHTML = ''
  console.log(movieList)
}
suggestionButton.addEventListener('click', () => {
  
  const ratedMovies = document.querySelectorAll('.rated')
  const data = [...ratedMovies]
  const arrayOfGenres = data.map(element => element.firstChild.nextSibling.nextSibling.innerText.split(','))
  let finalArray = []
  const final = arrayOfGenres.forEach(array => array.forEach((number) => finalArray.push(parseInt(number))))
  
  const finalNoRepeat = [... new Set(finalArray)]
  
  deleteCurrentList()

  finalNoRepeat.forEach(number => fetchFavorites(number))

  
})


const createClickEvent = (event) => {
  const parent = event.target.parentNode

  if (parent.classList.contains('rated')) {
    const ratedEmoji = parent.lastChild
    parent.removeChild(ratedEmoji)
    parent.classList.remove('rated')
  } else {
    parent.classList.add('rated')
    const hangLoose = document.createElement('p')
    hangLoose.innerHTML = '<span><i class="fas fa-thumbs-up"></i></span>'
    parent.appendChild(hangLoose)
  }
}

const createMovieElement = (movie) => {

  const movieList = document.querySelector('.movie-list')
  const movieItem = document.createElement('div')
  movieItem.className = 'movie-item'
  const title = document.createElement('h1')
  title.innerText = movie.original_title
  const genreId = document.createElement('p')
  genreId.className = "genre-id"
  genreId.innerText = movie.genre_ids
  const img = document.createElement('img')
  img.className = 'movie-image'
  img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  img.addEventListener('click', createClickEvent)

  movieItem.appendChild(img)
  movieItem.appendChild(title)
  movieItem.appendChild(genreId)

  movieList.appendChild(movieItem)
}

const handleMovieData = (object) => {
  const data = object.results
  data.forEach(movie => createMovieElement(movie))
}

const fetchDataMovie = (endpoint) => {
  fetch(endpoint)
    .then(data => data.json())
    .then((data) => {
      if(data) {
        handleMovieData(data)
      } else {
        reject(new Error('Invalid Endpoint'))
      }
    })
}



window.onload = function onload() {

  const loadButton = document.querySelector('.load-button')
  loadButton.addEventListener('click', () => {
    deleteCurrentList()
    const endpoint = "https://api.themoviedb.org/3/trending/movie/week?api_key=52d3e97323f3329ba592b46f79041c81"
    fetchDataMovie(endpoint);
  })

}

// trends https://api.themoviedb.org/3/trending/movie/week?api_key=52d3e97323f3329ba592b46f79041c81

// /discover/movie?with_genres=14&sort_by=vote_average.desc&vote_count.gte=10

// movie details com id https://api.themoviedb.org/3/movie/343611?api_key={api_key}

//  collection by id https://api.themoviedb.org/3/collection/{collection_id}?api_key=<<api_key>>&language=en-US

// discovery "https://api.themoviedb.org/3/discover/movie?api_key=52d3e97323f3329ba592b46f79041c81&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=36&primary_release_year=2019&page=1"