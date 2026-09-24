const noBTn = document.getElementById('no');
const welcomePage = document.querySelector('.page-welcome');
const errorPage = document.querySelector('.page-error');
const yesBtn = document.getElementById('yes');
const backONE = document.getElementById('back1');
const birthdayPage = document.getElementById('page-birthday');
const birthdayMusic = document.getElementById('birthdayMusic');
const goodGirlOverlay = document.getElementById('goodGirlOverlay');
const hubPage = document.getElementById('hubPage');


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
    document.body.style.backgroundImage = 'url(resources/images/file_0000000095ac8210b693baaae5a91d46.png)'
    goodGirlOverlay.classList.remove('hide-div');

    setTimeout(() => {
        goodGirlOverlay.classList.add('hide');
    }, 3000)

    birthdayMusic.play()
    hubPage.style.display = 'flex'
    hubPage.classList.add('active')
})