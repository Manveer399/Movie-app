const URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e24048d102ab2aed790f53a4fe97ba8b&page=1'
const IMGPATH = 'https://image.tmdb.org/t/p/w1280'

const SEARCHURL =
  'https://api.themoviedb.org/3/search/movie?&api_key=e24048d102ab2aed790f53a4fe97ba8b&page=1&query='

const getMovies = async URL => {
  const response = await fetch(URL)
  if (response.status !== 200) {
    throw new Error('cannot fetch the data')
  }

  const data = await response.json()
  return data
}

getMovies(URL)
  .then(data => render(data.results))
  .catch(err => console.log(err))

const mainContainer = document.querySelector('.main-container')
const cardTemplate = document.querySelector('#task-template')
const searchForm = document.querySelector('form')
const searchInput = document.getElementById('search')

function render(data) {
  clearElement(mainContainer)

  data.forEach(movie => {
    const cardElement = document.importNode(cardTemplate.content, true)
    const { poster_path, title, vote_average, overview } = movie
    const movieImg = cardElement.querySelector('img')
    movieImg.src = `${IMGPATH + poster_path}`

    const movieTitle = cardElement.querySelector('.movie-title')
    movieTitle.innerText = title

    const movieRating = cardElement.querySelector('.rating')
    movieRating.classList.add(setRatingColor(vote_average))
    movieRating.innerText = vote_average
    const movieOverview = cardElement.querySelector('.overview-details')
    movieOverview.innerText = overview
    mainContainer.appendChild(cardElement)
  })
}

const setRatingColor = vote => {
  return vote >= 8 ? 'green' : vote >= 5 ? 'orange' : 'red '
}
/*clear out all elements that already exists*/
function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

searchForm.addEventListener('submit', e => {
  e.preventDefault()

  const searchTerm = searchInput.value

  searchTerm === ''
    ? alert('Invalid input')
    : getMovies(SEARCHURL + searchTerm).then(data => render(data.results))

  searchInput.value = ''
})
