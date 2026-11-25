  var ww = $(window).width();  //가로 해상도 감지
    var swiper_change = undefined;  //스와이퍼 객체가 생성되지 않았다

    function initSwiper() {

      if (ww <= 640 && swiper_change == undefined) {  //소형테블릿 이하의 해상도면..
        swiper_change = new Swiper(".swiper_change", {  //스와이퍼 객체 생성
          slidesPerView: 1.2,
          spaceBetween: 10,
          //simulateTouch: true,
          // loop: true,
          // autoplay: {
          //   delay: 500,
          //   disableOnInteraction: false,
          // },
        //   pagination: {   //페이지 네이션
        //     el: '.swiper-pagination',
        //     dynamicBullets: true,
        //     clickable: true,
        //     //type: 'fraction'   //  현재/총개수 (페이지네이션블릿은 사라진다)
        //   },
        //   breakpoints:{
        //     641 : {   //브라우저가 641이상 (min-width) - 소형태블릿
        //       slidesPerView: 2,
        //       spaceBetween: 8
        //     },
        //     769 : {   //브라우저가 769이상 - 일반 태블릿
        //       slidesPerView: 3,
        //       spaceBetween: 10
        //     }
        //   }
        });
      } else if (ww > 640 && swiper_change != undefined) {  //일반 pc이상의 해상도에서는..
        swiper_change.destroy();  //스와이퍼 해제
        swiper_change = undefined;
      }
    }

    initSwiper();   //최초 페이지 로딩 시 호출

    $(window).on('resize', function () {  //해상도가 변경될때 마다..
      ww = $(window).width();
      initSwiper();
    });