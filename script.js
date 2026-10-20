const noBTn = document.getElementById('no');
const welcomePage = document.querySelector('.page-welcome');
const errorPage = document.querySelector('.page-error');
const yesBtn = document.getElementById('yes');
const back1 = document.getElementById('back1');
const birthdayPage = document.getElementById('page-birthday');
const birthdayMusic = document.getElementById('birthdayMusic');
const goodGirlOverlay = document.getElementById('goodGirlOverlay');
const hubPage = document.getElementById('hubPage');
const hubCards = document.querySelectorAll(".hub-card");
const cardWish = document.getElementById('card-wish');
const cardPics = document.getElementById('card-pics');
const cardSong = document.getElementById('card-song');
const cardKam = document.getElementById('card-kam');
const cardLetter = document.getElementById('card-letter');
const wishPage = document.querySelector('.page-wish');
const wishCon = document.querySelector('.wish-container');
const wishInput = document.getElementById("wish-input");
const sendWishBtn = document.getElementById("send-btn");
const wishStatus = document.getElementById("wishStatus");
const viewPage = document.querySelector('.page-view');
const faveBtn = document.getElementById('fave');
const wallpaperBtn = document.getElementById('wallpaper');
const nailBtn = document.getElementById('nail');
const randomBtn = document.getElementById('random');
const bwBtn = document.getElementById('bw');
const mirrorBtn = document.getElementById('mirror');
const back2 = document.querySelectorAll('.back2');
const viewBack = document.getElementById('view-back');
const songBack = document.getElementById('song-back');
const kamBack = document.getElementById('kam-back');
const back3 = document.getElementById('back3');
const back4 = document.getElementById('back4');
const back5 = document.getElementById('back5');
const back6 = document.getElementById('back6');
const back7 = document.getElementById('back7');
const back8 = document.getElementById('back8');
const viewCon = document.querySelector('.view-container');
const faveCon = document.getElementById('fave-container');
const wallpaperCon = document.getElementById('wallpaper-container');
const nailCon = document.getElementById('nail-container');
const randomCon = document.getElementById('random-container');
const bwCon = document.getElementById('bw-container');
const mirrorCon = document.getElementById('mirror-container');
const videoItem = document.querySelector(".video-item");
const videoCaption = document.getElementById("videoCaption");
const modal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const closeVideo = document.querySelector(".close-video");
const songPage = document.querySelector('.page-song');
const songCon = document.querySelector('.song-container');
const kamPage = document.querySelector('.page-kam');
const kamCon = document.querySelector('.kam-container');
const lynxCard = document.getElementById('lynx');
const bearCard = document.getElementById('bear');
const kamLynx = document.querySelector('.kam-lynx');
const kamBear = document.querySelector('.kam-bear');
const lynxBack = document.getElementById('lynx-back');  
const bearBack = document.getElementById('bear-back');  
const letterPage = document.querySelector('.page-letter');
const letterCon = document.querySelector('.letter-container');
const letterDownload = document.getElementById('letter-download');
const rate = document.getElementById('rate');
const ratingForm = document.getElementById('ratingForm');
const ratingStatus = document.getElementById('ratingStatus');
const rateOverlay = document.getElementById('rateOverlay');
const closeRating = document.querySelector('.close-rating');


noBTn.addEventListener('click', () => {
    welcomePage.classList.add('hide-div');
    errorPage.classList.remove('hide-div');
});
back1.addEventListener('click', () => {
    errorPage.classList.add('hide-div');
    welcomePage.classList.remove('hide-div');
});
yesBtn.addEventListener('click', ()  => {
    welcomePage.classList.add('hide-div');
    birthdayPage.classList.remove('hide-div');
    document.body.style.backgroundImage = 'url(resources/images/file_0000000095ac8210b693baaae5a91d46.png)';
    goodGirlOverlay.classList.remove('hide-div');
    setTimeout(() => {
        goodGirlOverlay.classList.add('hide');
    }, 3000);

    birthdayMusic.play();
    hubPage.style.display = 'flex';
    hubPage.classList.add('active');
});
back2.forEach((button) => {
    button.addEventListener("click", () => {
    button.parentElement.classList.add("hide-div");
    birthdayPage.classList.remove("hide-div");
    hubPage.classList.remove("active"); 
    hubPage.classList.add("returned");  
    hubPage.style.display = "flex";
    hubCards.forEach((hubCard) => {
        hubCard.style.opacity = "1";
        hubCard.style.transform = "none";
        hubCard.classList.add("ready");
      });
    });
});
hubCards.forEach((card) => {
    card.classList.remove("ready");
});
hubCards.forEach((card) => {
    card.addEventListener("animationend", (event) => {
      if (event.target === card) {
        card.classList.add("ready");
      }
    });
});  
cardWish.addEventListener('click', () => {
    birthdayPage.classList.add('hide-div');
    wishPage.classList.remove('hide-div');
    wishCon.classList.add('active');
});
cardPics.addEventListener('click', () => {
    birthdayPage.classList.add('hide-div');
    viewPage.classList.remove('hide-div');
    viewCon.classList.add('active');
});
cardSong.addEventListener('click', () => {
    birthdayPage.classList.add('hide-div');
    songPage.classList.remove('hide-div');
    songCon.classList.add('active');
});
cardKam.addEventListener('click', () => {
    birthdayPage.classList.add('hide-div');
    kamPage.classList.remove('hide-div');
    kamCon.classList.add('active');
});
cardLetter.addEventListener('click', () => {
  birthdayPage.classList.add('hide-div');
  letterPage.classList.remove('hide-div');
  letterCon.classList.add('active');
});
emailjs.init({
    publicKey: "JjNoDkv7e9cj5SfGv"
});



sendWishBtn.addEventListener("click", async () => {
    const wish = wishInput.value.trim();
  
    if (!wish) {
      wishStatus.textContent = "Write your wish first! 🌿";
      return;
    }
  
    sendWishBtn.disabled = true;
    wishStatus.textContent = "Sending your wish...";
  
    try {
      
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4"
            });

            const pageWidth = 210;
            const pageHeight = 297;

            // Colours
            const cream = [255, 249, 236];
            const green = [31, 67, 40];
            const sage = [120, 155, 131];
            const ink = [38, 53, 45];

            // 1. Full cream background
            pdf.setFillColor(...cream);
            pdf.rect(0, 0, pageWidth, pageHeight, "F");

            // 2. Outer sketchbook border
            pdf.setDrawColor(...green);
            pdf.setLineWidth(1.2);
            pdf.roundedRect(8, 8, 194, 281, 4, 4, "S");

            // 3. Heading
            pdf.setTextColor(...green);
            pdf.setFont("times", "bold");
            pdf.setFontSize(24);

            pdf.text("A Birthday Wish", 105,  30, {
                align: "center"
            });

            // 4. Decorative lines and heart
            
            /* Pumpkin decoration */
            pdf.setDrawColor(31, 67, 40);
            pdf.setFillColor(120, 155, 131);
            pdf.setLineWidth(0.6);

            // Pumpkin body — three overlapping ellipses
            pdf.ellipse(101, 39, 3.5, 4.5, "FD");
            pdf.ellipse(105, 39, 3.5, 5, "FD");
            pdf.ellipse(109, 39, 3.5, 4.5, "FD");

            // Small stem
            pdf.setFillColor(31, 67, 40);
            pdf.roundedRect(104, 32.5, 2, 3, 0.5, 0.5, "F");

            // Tiny leaf
            pdf.setFillColor(120, 155, 131);
            pdf.ellipse(108, 33.5, 2, 1, "FD");


            // 5. Inset wish panel
            const panelX = 23;
            const panelY = 58;
            const panelWidth = 164;
            const panelHeight = 190;

            pdf.setDrawColor(...sage);
            pdf.setLineWidth(0.8);
            pdf.roundedRect(
                panelX,
                panelY,
                panelWidth,
                panelHeight,
                3,
                3,
                "S"
            );

            // 6. Wish text with generous internal margins
            pdf.setTextColor(...ink);
            pdf.setFont("times", "normal");
            pdf.setFontSize(13);

            const wishLines = pdf.splitTextToSize(wish, 132);

            pdf.text(wishLines, 39, 77, {
                lineHeightFactor: 1.7
            });

            // 7. Footer
            pdf.setTextColor(...green);
            pdf.setFont("times", "italic");
            pdf.setFontSize(10);

            pdf.text(
                "A wish from Kamie",
                105,
                265,
                { align: "center" }
            );

            pdf.save("Kamies-Birthday-Wish.pdf");

  
      const sentAt = new Date().toLocaleString("en-NG", {
        dateStyle: "full",
        timeStyle: "short"
      });

      await emailjs.send(
        "service_6d54x0a",
        "template_bg5f9bl",
        { 
            name: 'Kamie',
            message: wish,
            time: sentAt 
        }
      );
  
      wishStatus.textContent = "Your wish has been sent. May it come true! 💚";
      wishInput.value = "";
    } catch (error) {
      console.error("Wish sending failed:", error);
      wishStatus.textContent = "The wish could not be sent. Please try again.";
    } finally {
      sendWishBtn.disabled = false;
    }
  });
faveBtn.addEventListener('click', () => {
    viewCon.classList.add('hide-div');
    viewBack.style.display = 'none';
    window.scrollTo({top: 0, behavior: 'smooth'});
    faveCon.classList.remove('hide-div');
    faveCon.classList.add('show');
});
wallpaperBtn.addEventListener('click', () => {
    viewCon.classList.add('hide-div');
    viewBack.style.display = 'none';
    window.scrollTo({top: 0, behavior: 'smooth'});
    wallpaperCon.classList.remove('hide-div');
    wallpaperCon.classList.add('show');
});
nailBtn.addEventListener('click', () => {
    viewCon.classList.add('hide-div');
    viewBack.style.display = 'none';
    window.scrollTo({top: 0, behavior: 'smooth'});
    nailCon.classList.remove('hide-div');
    nailCon.classList.add('show');
});
randomBtn.addEventListener('click', () => {
    viewCon.classList.add('hide-div');
    viewBack.style.display = 'none';
    window.scrollTo({top: 0, behavior: 'smooth'});
    randomCon.classList.remove('hide-div');
    randomCon.classList.add('show');
});
bwBtn.addEventListener('click', () => {
    viewCon.classList.add('hide-div');
    viewBack.style.display = 'none';
    window.scrollTo({top: 0, behavior: 'smooth'});
    bwCon.classList.remove('hide-div');
    bwCon.classList.add('show');
});
mirrorBtn.addEventListener('click', () => {
    viewCon.classList.add('hide-div');
    viewBack.style.display = 'none';
    window.scrollTo({top: 0, behavior: 'smooth'});
    mirrorCon.classList.remove('hide-div');
    mirrorCon.classList.add('show');
});
document.querySelectorAll(".gallery-container").forEach((gallery) => {
    gallery.querySelectorAll(".video-item").forEach((videoItem) => {
      videoItem.addEventListener("click", () => {
        modalVideo.src = videoItem.querySelector("source").src;
        modalVideo.muted = false;
        videoCaption.textContent = videoItem.dataset.caption;
        modal.classList.add("active");
        birthdayMusic.pause();
        modalVideo.play();
      });
    });
  
    closeVideo.addEventListener("click", () => {
      modal.classList.remove("active");
      modalVideo.pause();
      modalVideo.src = "";
      birthdayMusic.play();
    });
  });
document.querySelectorAll(".video-item video").forEach((video) => {
    video.muted = true;
    video.parentElement.addEventListener("mouseenter", () => {
        video.play();
    });
    video.parentElement.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
    });
});
back3.addEventListener('click', () => {
    faveCon.classList.add('hide-div');
    viewCon.classList.remove('hide-div');
    viewBack.style.display = 'block';
});
back4.addEventListener('click', () => {
    wallpaperCon.classList.add('hide-div');
    viewCon.classList.remove('hide-div');
    viewBack.style.display = 'block';
});
back5.addEventListener('click', () => {
    nailCon.classList.add('hide-div');
    viewCon.classList.remove('hide-div');
    viewBack.style.display = 'block';
});
back6.addEventListener('click', () => {
    randomCon.classList.add('hide-div');
    viewCon.classList.remove('hide-div');
    viewBack.style.display = 'block';
});
back7.addEventListener('click', () => {
    bwCon.classList.add('hide-div');
    viewCon.classList.remove('hide-div');
    viewBack.style.display = 'block';
});
back8.addEventListener('click', () => {
    mirrorCon.classList.add('hide-div');
    viewCon.classList.remove('hide-div');
    viewBack.style.display = 'block';
});

let spotifyController;
window.onSpotifyIframeApiReady = (IFrameAPI) => {
  const options = {
    width: "100%",
    height: "352",
    url: "https://open.spotify.com/playlist/5nQxQd7XiolgGS1tapIMPX"
  };
  IFrameAPI.createController(
    document.getElementById("spotifyEmbed"),
    options,
    (controller) => {
      spotifyController = controller;

      controller.addListener("playback_update", (event) => {
        if (event.data.isPaused) {
          birthdayMusic.play();
        } else {
          birthdayMusic.pause();
        }
      });
    }
  );
};
songBack.addEventListener('click', () => {
    spotifyController?.pause();
    birthdayMusic.play();
});
lynxCard.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
    kamCon.classList.add('hide-div');
    kamBack.style.display = 'none';
    kamLynx.classList.remove('hide-div');
    kamLynx.classList.add('show');
});
lynxBack.addEventListener('click', () => {
    kamLynx.classList.remove('show');
    kamLynx.classList.add('hide-div');
    kamCon.classList.remove('hide-div');
    kamBack.style.display = 'block';
});
bearCard.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
    kamCon.classList.add('hide-div');
    kamBack.style.display = 'none';
    kamBear.classList.remove('hide-div');
    kamBear.classList.add('show');
});
bearBack.addEventListener('click', () => {
    kamBear.classList.remove('show');
    kamBear.classList.add('hide-div');
    kamCon.classList.remove('hide-div');
    kamBack.style.display = 'block';
});
letterDownload.addEventListener('click', () => {
  const fileUrl = 'resources/Kamies-Birthday-letter.pdf'; 
    
  // 2. Create a temporary anchor element
  const link = document.createElement('a');
  link.href = fileUrl;
  
  // 3. Define the filename the user will see upon download
  link.download = 'Kamies Birthday Letter.pdf'; 
  
  // 4. Append to DOM, trigger click, and clean up
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

});
closeRating.addEventListener('click', () => {
  rateOverlay.classList.add('hide-div')
});
rate.addEventListener('click', () => {
  rateOverlay.classList.remove('hide-div')
})
ratingForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const selectedRating = document.querySelector(
    'input[name="rating"]:checked'
  );

  if (!selectedRating) {
    ratingStatus.textContent = "Choose a star rating first. 🌿";
    return;
  }

  const submitButton = ratingForm.querySelector(".submit-rating");
  const sentAt = new Date().toLocaleString("en-NG", {
    dateStyle: "full",
    timeStyle: "short"
  });

  submitButton.disabled = true;
  ratingStatus.textContent = "Sending rating...";

  try {
    await emailjs.send(
      "service_6d54x0a",
      "template_daa485a",
      {
        rating: `Kamie rated her experience, ${selectedRating.value} / 5 stars`,
        time: sentAt
      }
    );

    ratingStatus.textContent = "Thank you for rating your experience! 💚";
    ratingForm.reset();

    setTimeout(() => {
      rateOverlay.classList.remove("active");
    }, 1800);
  } catch (error) {
    console.error("Rating email failed:", error.status, error.text);
    ratingStatus.textContent = "Your rating could not be sent. Try again.";
  } finally {
    submitButton.disabled = false;
  }
});