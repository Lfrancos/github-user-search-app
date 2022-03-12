// // select items that you need

const schemeButtons = document.querySelectorAll('.header__scheme__button');
const searchBar = document.querySelector('.search-bar');
const searchBarInput = document.querySelector('.search-bar__input');
// const profileImg = document.querySelector('.card__profile-info__img');
const cardContainer = document.querySelector('.card-container');


async function getData() {
    const url = 'https://api.github.com/users/'
    const username = searchBarInput.value;
    const urlToFetch = `${url}${username}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            // console.log(jsonResponse);
            return jsonResponse;
        }
    } catch (error) {

        // console.log(error);
    }
}


searchBar.addEventListener('submit', e => {

    if (searchBarInput.value.length <= 0) {
        e.preventDefault();

    } else {
        e.preventDefault();
        // clearInfo();
        // render info
        getData().then( data => {
          const errorMessage = document.querySelector('.search-bar__content.two h3')
          errorMessage.classList.remove('active');
            renderData(data);
        }).catch(error => {
          // removeData();
          const errorMessage = document.querySelector('.search-bar__content.two h3')
          errorMessage.classList.add('active');
          // console.log(errorMessage);
        });
    }

});

function renderData(data) {

    const {avatar_url, name, login, bio, public_repos, followers, following, location, blog, twitter_username, company, html_url} = data;

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
            <p class="card__profile-info__date">Joined</p>
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
// function clearInfo() {
//     const profileImg = document.querySelector('.card__profile-info__img');
//     if (profileImg) {
//         const profileImage = profileImg.firstChild;
//         profileImage.remove();
//         const about = document.querySelector('.card__about p');
//         about.remove();
//     }
// }


schemeButtons.forEach(button => {
    button.addEventListener('click', e => {
      const body = document.querySelector('body');
      body.classList.toggle('lightMode');
      const container = e.currentTarget.closest('.header');
      container.classList.toggle('header--active');
      // console.log(container);
      // header--active
      // console.log(body);
        e.stopPropagation();

        // console.log(e.currentTarget);
        // console.log('clicked');
    })
})






    // render the profile info {

        // console.log(name, bio, followers, following );
        // const img = document.createElement('img');
        // const profileImage = avatar_url;
        // const profileInfoName = document.querySelector('.card__profile-info__name .name');
        // const profileInfoAt = document.querySelector('.card__profile-info__name .at')
        // profileInfoName.innerText = name;
        // profileInfoAt.innerText = `@${data.login.toLowerCase()}`;
        // img.src = profileImage;
        // profileImg.appendChild(img);

        // // render the about
        // const about = document.querySelector('.card__about');
        // const p = document.createElement('p');
        // p.innerText = bio;
        // about.appendChild(p);

        // // render the stats
        // const reposStats = document.querySelector('.card__stats__repos h2');
        // reposStats.innerText = public_repos;
        // const followersStats = document.querySelector('.card__stats__followers h2');
        // followersStats.innerText = followers;
        // const followingStats = document.querySelector('.card__stats__following h2');
        // followingStats.innerText = following;


        // render the social media
    // }
