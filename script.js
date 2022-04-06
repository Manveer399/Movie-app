const URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e24048d102ab2aed790f53a4fe97ba8b&page=1'
const IMGPATH = 'https://image.tmdb.org/t/p/w1280'

const getMovies = async () => {
  const response = await fetch(URL)
  if (response.status !== 200) {
    throw new Error('cannot fetch the data')
  }

  const data = await response.json()
  return data
}

getMovies()
  .then(data => render(data.results))
  .catch(err => console.log(err))

const mainContainer = document.querySelector('.main-container')
const cardTemplate = document.querySelector('#task-template')

function render(data) {
  clearElement(mainContainer)
  data.forEach(element => {
    const cardElement = document.importNode(cardTemplate.content, true)

    const movieImg = cardElement.querySelector('img')
    movieImg.src = `${IMGPATH + element.poster_path}`

    const movieTitle = cardElement.querySelector('.movie-title')
    movieTitle.innerText = element.title

    const movieRating = cardElement.querySelector('.rating')
    movieRating.innerText = element.vote_average

    mainContainer.appendChild(cardElement)
  })
}

/*clear out all elements that already exists*/
function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}
