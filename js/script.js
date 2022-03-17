// // select items that you need

const schemeButtons = document.querySelectorAll('.header__scheme__button');
const searchBar = document.querySelector('.search-bar');
const searchBarInput = document.querySelector('.search-bar__input');
const cardContainer = document.querySelector('.card-container');
const body = document.querySelector('body');

// make sure to add the right color scheme depending on the preferences the user has setup in their computer.
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.classList.add('lightMode')
  } else {
    body.classList.remove('lightMode')
  }


// get the data from the api of github;
async function getData() {
  const url = 'https://api.github.com/users/';
  let urlToFetch = `${url}lfrancos`;
  const username = searchBarInput.value;

  if (cardContainer.firstElementChild) {
    urlToFetch = `${url}${username}`;
  }

  try {
      const response = await fetch(urlToFetch);
      if (response.ok) {
          const jsonResponse = await response.json();
          return jsonResponse;
      }
  } catch (error) {
      console.log(error);
  }
}

getData().then(data => {
  renderData(data);
})


// functionality for the search bar
searchBar.addEventListener('submit', e => {

    if (searchBarInput.value.length <= 0) {
        e.preventDefault();

    } else {
        e.preventDefault();
        getData().then( data => {
          const errorMessage = document.querySelector('.search-bar__content.two h3')
          errorMessage.classList.remove('active');
            renderData(data);
        }).catch(error => {
          const errorMessage = document.querySelector('.search-bar__content.two h3')
          errorMessage.classList.add('active');
        });
    }

});

// this adds the data to the page
function renderData(data) {

    const {avatar_url, created_at, name, login, bio, public_repos, followers, following, location, blog, twitter_username, company, html_url} = data;

    const fullDate = new Date(created_at);
    const stringDate = fullDate.toString().split(' ');
    const date = `${stringDate[2]} ${stringDate[1]} ${stringDate[3]}`


    // /////////////////////////////
    cardContainer.innerHTML =
                    `
                    <div class="card">
                      <div class="card__profile-info">
          <div class="card__profile-info__img">
              <img src="${avatar_url}" alt="">
          </div>
          <div class="card__profile-info__container">
            <div class="card__profile-info__name">
              <h2 class="name">${name}</h2>
              <a href="${html_url}" target="_blank"><h3 class="at">@${login}</h3></a>
            </div>
            <p class="card__profile-info__date">Joined ${date}</p>
          </div>
        </div>
        <div class="card__info">
          <div class="card__about">${bio}</div>

          <div class="card__stats ">
            <div class="card__stats__item">
              <P>Repos</P>
              <h2>${public_repos}</h2>
            </div>
            <div class="card__stats__item">
              <p>Followers</p>
              <h2>${followers}</h2>
            </div>
            <div class="card__stats__item">
              <p>following</p>
              <h2>${following}</h2>
            </div>
          </div>
          <div class="card__social-media">
            <div>
              <div class="card__social-media__item location">
                <img src="./assets/icon-location.svg" alt="">
                <p>${location}</p>
              </div>
              <div class="card__social-media__item web">
                <img src="./assets/icon-website.svg" alt="">
                <a href="${blog}" target="_blank"><p>${blog}</p></a>
              </div>
            </div>
            <div>
              <div class="card__social-media__item twitter">
                <img src="./assets/icon-twitter.svg" alt="">
                <p>${twitter_username}</p>
              </div>
              <div class="card__social-media__item company">
                <img src="./assets/icon-company.svg" alt="">
                <p>${company}</p>
              </div>
            </div>
          </div>
        </div>
      </div>`


}

function removeData() {
  cardContainer.innerHTML = '';
}

// this is the event listener for the color scheme
schemeButtons.forEach(button => {
    button.addEventListener('click', e => {

      body.classList.toggle('lightMode');
      const container = e.currentTarget.closest('.header');
      container.classList.toggle('header--active');
        e.stopPropagation();

    })
})
