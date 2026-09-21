const noBTn = document.getElementById('no');
const welcomePage = document.querySelector('.page-welcome');
const errorPage = document.querySelector('.page-error');
const yesBtn = document.getElementById('yes');
const backONE = document.getElementById('back1');
const birthdayPage = document.getElementById('page-birthday');
const goodGirlOverlay = document.getElementById('goodGirlOverlay')

let spotifyPlayer;

window.onSpotifyIframeApiReady = (IFrameAPI) => {
  const container = document.getElementById('spotify-player');

  IFrameAPI.createController(
    container,
    {
      uri: 'spotify:track:7Ae3TUjIzn3gIHPMpZKhot?si=0e4649ddc2d54e53',
      width: 1,
      height: 1,
    },
    (controller) => {
      spotifyPlayer = controller;
    }
  );
};

noBTn.addEventListener('click', () => {
    welcomePage.classList.add('hide-div');
    errorPage.classList.remove('hide-div');
});
backONE.addEventListener('click', () => {
    errorPage.classList.add('hide-div');
    welcomePage.classList.remove('hide-div');
})
yesBtn.addEventListener('click', ()  => {
    welcomePage.classList.add('hide-div');
    birthdayPage.classList.remove('hide-div');
    goodGirlOverlay.classList.remove('hide-div');

    setTimeout(() => {
        goodGirlOverlay.classList.add('hide');
    }, 3000)
})