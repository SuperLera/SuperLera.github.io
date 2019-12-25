//hamburger-menu
const hamburgerButton = document.querySelector(".hamburger-menu-link");
const navigation = document.querySelector(".hamburger-nav");
const closeCross = document.querySelector(".close");

hamburgerButton.addEventListener('click', function(e) {
  e.preventDefault();
  navigation.classList.add("hamburger-nav--active");
  document.body.classList.add("overflow");
});
closeCross.addEventListener('click', function(e) {
  e.preventDefault();
  navigation.classList.remove("hamburger-nav--active");
  document.body.classList.remove("overflow");
});

//team
const teamMembers = document.querySelectorAll(".team__item");
// const teamMemberActive = document.querySelector(".team__item--active");

// teamMemberActive.addEventListener('click', function(e) {
//   e.preventDefault();
//   teamMemberActive.classList.remove("team__item--active");
// });

teamMembers.forEach(el =>
  el.addEventListener('click', function(e) {
    e.preventDefault();
    teamMembers.forEach(el => el.classList.remove("team__item--active"));
    el.classList.add("team__item--active");
  })
);

//menu

const menuPages = document.querySelectorAll(".menu-accordeon__item");

menuPages.forEach(el =>
  el.addEventListener('click', function(e) {
    e.preventDefault();
    menuPages.forEach(el => el.classList.remove("menu-accordeon__item--active"));
    el.classList.add("menu-accordeon__item--active");
  })
);
// carousel
$(document).ready(function(){
  const owl = $(".owl-carousel").owlCarousel({
    center: true,
    items: 1,
    loop: true
  });
  $(".burgers__button--left").click(function(e) {
    e.preventDefault();
    owl.trigger("prev.owl.carousel");
  });

  $(".burgers__button--right").click(function(e) {
    e.preventDefault();
    owl.trigger("next.owl.carousel");
  });
});

// form
const myForm = document.querySelector('#order__form');
const popup = document.querySelector('.order__popup');
const popupCloseButton = document.querySelector('.btn__close');

popupCloseButton.addEventListener('click', () => {
  popup.classList.remove('order__popup--active');
  document.body.classList.remove("overflow");
});

myForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(myForm);
  formData.append('to', "valeriia.koroleva@gmail.com");
  const request = new XMLHttpRequest();
  request.open('POST', 'https://webdev-api.loftschool.com/sendmail');
  request.send(formData);
  request.addEventListener('load', function() {
    const response = JSON.parse(request.response);
    const {status} = response;
    if (status) {
      popup.classList.add('order__popup--active')
      document.body.classList.add("overflow");
    } else {
      alert('Произошла ошибка');
    }
  })
});
// map
    ymaps.ready(init);
    function init(){
        // Создание карты.
        const myMap = new ymaps.Map("map", {
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [59.939095, 30.315868],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 12
        });
        myMap.behaviors.disable('scrollZoom');
        {
          myPlaceMark1 = new ymaps.Placemark(
            [59.903059, 30.319154],
            {
              hintContent: 'Mr Burger',
              ballonContent: 'Московский просп., 86А'
            },
            {
              iconLayout: "default#image",
              iconImageHref:"./img/icons/map-marker.svg",
              iconImageSize: [45, 75]
              
            }
          );
          myPlaceMark2 = new ymaps.Placemark(
            [59.931518, 30.436302],
            {
              hintContent: 'Mr Burger',
              ballonContent: 'просп. Энергетиков, 3Б'
            },
            {
              iconLayout: "default#image",
              iconImageHref:"./img/icons/map-marker.svg",
              iconImageSize: [45, 75]
              
            }
          );
          myPlaceMark3 = new ymaps.Placemark(
            [59.952861, 30.390480],
            {
              hintContent: 'Mr Burger',
              ballonContent: 'Орловская ул., 1'
            },
            {
              iconLayout: "default#image",
              iconImageHref:"./img/icons/map-marker.svg",
              iconImageSize: [45, 75]
              
            }
          );
          myPlaceMark4 = new ymaps.Placemark(
            [59.972981, 30.303361],
            {
              hintContent: 'Mr Burger',
              ballonContent: 'Каменноостровский просп., 62'
            },
            {
              iconLayout: "default#image",
              iconImageHref:"./img/icons/map-marker.svg",
              iconImageSize: [45, 75]
              
            }
          );
        }
        myMap.geoObjects.add(myPlaceMark1).add(myPlaceMark2).add(myPlaceMark3).add(myPlaceMark4);
    }
    //player
    let player;
    function onYouTubeIframeAPIReady() {
      player = new YT.Player('yt-player', {
        height: "405",
        width: "660",
        videoId: "T_dHSP9s1BY",
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange
        },
        playerVars: {
          controls: 0,
          disablekb: 0,
          showinfo: 0,
          rel:0,
          autoplay: 0,
          modestbranding: 0
        }
      });
    }

    $('.player__start').on("click", e =>{
      const btn = $(e.currentTarget);
      
      if (btn.hasClass("paused")){
        player.pauseVideo();
      } else {
      player.playVideo();
    }
    }); // запуск и пауза видео со сменой соответствующей кнопки

    const formatTime = timeSec => {
      const roundTime = Math.round(timeSec);
    
      const minutes = Math.floor(roundTime / 60);
      const seconds = roundTime - minutes * 60;
    
      const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    
      return `${minutes}:${formattedSeconds}`;
    };    

    function onPlayerReady() {
      let interval;
      let durationSec = player.getDuration(); // получаем длительность видео в сек

      if (typeof interval !== "undefined") {
        clearInterval(interval);
      }

      interval = setInterval(() => {
        const completedSec = player.getCurrentTime();
        const completedPercent = (completedSec / durationSec) *100;

        $(".player__playback-button").css ({
          left: `${completedPercent}%`
        });
        $(".player__duration-completed").text(formatTime(completedSec));
      }, 1000);

      $(".player__duration-estimate").text(formatTime(durationSec)); // по функции передаем длительность видео во второй таймлайн
    }

    $(".player__splash").on("click", e => {
      player.playVideo();
    });

    $(".player__playback").on('click', e => {
      const bar = $(e.currentTarget);
      const newButtonPosition = e.pageX - bar.offset().left;
      const buttonPosPercent = (newButtonPosition / bar.width()) * 100;
      const newPlayerTimeSec = (player.getDuration() / 100) * buttonPosPercent;

      player.seekTo(newPlayerTimeSec);
      $(".player__playback-button").css({
        left: `${buttonPosPercent}%`
      });
    });

    function onPlayerStateChange (event) {
      const playerButton = $('.player__start');
      /*
      -1 (воспроизведение видео не начато)
      0 (воспроизведение видео завершено)
      1 (воспроизведение)
      2 (пауза)
      3 (буферизация)
      5 (видео подают реплики).
       */
      switch(event.data){
        case 1:
          $('.player__wrapper').addClass('player__wrapper--active');
          playerButton.addClass("paused");
          break;
        case 2:
          playerButton.removeClass("paused");
          break;
      }
    }

