const modal = document.getElementById('add-modal');
const backDrop = document.getElementById('backdrop');
const deleteMovieModal = document.getElementById('delete-modal');

const toogleModal = (event) => {
  event === 'ADD'
    ? modal.classList.add('visible')
    : event === 'CLOSE'
    ? modal.classList.remove('visible')
    : '';
};

const toogleBackDrop = (event) => {
  event === 'ADD'
    ? backDrop.classList.add('visible')
    : event === 'CLOSE'
    ? backDrop.classList.remove('visible')
    : '';
};

const toogleCancelModal = (event) => {
  event === 'ADD'
    ? deleteMovieModal.classList.add('visible')
    : event === 'CLOSE'
    ? deleteMovieModal.classList.remove('visible')
    : '';
};

//------inputs in modal--------//

const titleInput = document.getElementById('title');
const imageInput = document.getElementById('image-url');
const ratingInput = document.getElementById('rating');

const clearInputs = () => {
  titleInput.value = '';
  imageInput.value = '';
  ratingInput.value = '';
};

//------closing on click--------//

const closeAll = () => {
  toogleModal('CLOSE');
  toogleBackDrop('CLOSE');
  toogleCancelModal('CLOSE');
  clearInputs();
};

backDrop.addEventListener('click', () => closeAll());

//------button add movie--------//

const startAddMovieBtn = document.querySelector('header button');

startAddMovieBtn.addEventListener('click', () => {
  toogleModal('ADD');
  toogleBackDrop('ADD');
});

//------confirm and cancel--------//

const cancelBtn = modal.querySelector('.btn--passive');

cancelBtn.addEventListener('click', () => {
  closeAll();
});

const confirmBtn = cancelBtn.nextElementSibling;

const movies = [];

const entryText = document.getElementById('entry-text');

const updateUi = () => {
  movies.length !== 0
    ? (entryText.style.display = 'none')
    : (entryText.style.display = 'block');
};

const movieList = document.getElementById('movie-list');

const deleteMovie = (id) => {
  let ind = 0;
  for (const movie of movies) {
    if (movie.id === id) {
      break;
    }
    ind++;
  }
  movies.splice(ind, 1);
  movieList.children[ind].remove();
  closeAll();
  updateUi();
};

const deleteMovieHandler = (id) => {
  toogleCancelModal('ADD');
  toogleBackDrop('ADD');

  const cancelDelBtn = deleteMovieModal.querySelector('.btn--passive');
  let confDelBtn = deleteMovieModal.querySelector('.btn--danger');

  confDelBtn.replaceWith(confDelBtn.cloneNode(true));
  confDelBtn = deleteMovieModal.querySelector('.btn--danger');

  cancelDelBtn.removeEventListener('click', closeAll);
  confDelBtn.addEventListener('click', deleteMovie.bind(null, id));
  cancelDelBtn.addEventListener('click', closeAll);
};

const showMovieList = ({ id, title, url, rating }) => {
  const li = document.createElement('li');
  li.className = 'movie-element';
  li.innerHTML = `
  <div class="movie-element__image">
    <image src='${url}' alt='${title}'>
  </div>
  <div class='movie-element__info'>
    <h2>${title}</h2>
    <p>${rating}/5 starts</p>
  </div>
  `;
  li.addEventListener('click', deleteMovieHandler.bind(null, id));
  movieList.appendChild(li);
};

confirmBtn.addEventListener('click', () => {
  let titleValue = titleInput.value;
  let imageValue = imageInput.value;
  let ratingValue = ratingInput.value;
  if (
    titleValue === '' ||
    imageValue === '' ||
    ratingValue === '' ||
    +ratingValue < 1
  ) {
    alert('Please write smth valid');
  } else {
    let movieObj = {
      id: Math.random().toString(),
      title: titleValue,
      url: imageValue,
      rating: ratingValue,
    };
    movies.push(movieObj);
    closeAll();
    updateUi();
    showMovieList(movieObj);
  }
});
