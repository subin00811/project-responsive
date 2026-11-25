$(window).on('scroll',function(){ //스크롤 값의 변화가 생기면

    var scroll = $(window).scrollTop(); //스크롤의 거리
    var win_height =$(window).height();
    var header_height =$('header').height();

   
    if(scroll>win_height){ //300이상의 거리가 발생되면
        $('.top_move').fadeIn('slow');  //top보여라~~~~
    }else{
        $('.top_move').fadeOut('fast');//top안보여라~~~~
    }


    if(scroll>win_height-header_height){ //300이상의 거리가 발생되면
        $('header').css('background','#000');  //top보여라~~~~
        $('header').css('border-bottom','2px solid #333');  
    }else{
        $('header').css('background','transparent');//top안보여라~~~~
        $('header').css('border-bottom','2px solid transparent');  
    }
});


$('.top_move').click(function(e){
    e.preventDefault();
     //상단으로 스르륵 이동합니다.
    $("html,body").stop().animate({"scrollTop":0},1000); 
 });


//  반응형 네비게이션 처리
var onoff = false; //false(메뉴닫힘) true(메뉴열림)
$(".menuOpen").click(function(e){
   e.preventDefault();
   if(onoff == false){
     $("#gnb").slideDown('slow');
     $('#headerArea').addClass('mn_open');//메뉴모양변경
     onoff = true;
   }else{
     $("#gnb").slideUp('fast');
     $('#headerArea').removeClass('mn_open');
     onoff = false;
   }
});

//  네비높이 맞추기(페이지 로딩시 1회)
var screenSize = $(window).width();
var winh =  $(document).height();

if( screenSize > 768){
 $("#gnb").height('auto');
}else{
 $("#gnb").height(winh);
}

var current=0; // 0(해상도가 모바일), 1(소형테블릿이상)

$(window).resize(function(){ 
   var screenSize = $(window).width();  //가로 해상도
   if( screenSize > 768){  //소형테블릿 이상이면
     $("#gnb").show();
     $("#gnb").height('auto');
         current=1; //소형테블릿이상
   }
   if(current==1 && screenSize <= 768){
     $("#gnb").hide();
     $("#gnb").height(winh);
     $('#headerArea').removeClass('mn_open');
      current=0; //모바일
   }
 }); 



 //  MODELS 탭 
$('.model_list li').not('.all_models').find('a').click(function(e){
    e.preventDefault();

    var $li = $(this).parent();
    var idx = $li.index();  //몇 번째 박스인지 (0, 1, 2)

    $('.model_list li').removeClass('on');
    $li.addClass('on');

    $('.model_view > li').removeClass('on');
    $('.model_view > li').eq(idx).addClass('on');
});


//  CLASSIC ICONS 연도 스와이퍼 
if($('.year_slide').length){
	var yearSwiper = new Swiper('.year_slide', {
		direction: 'vertical',
		slidesPerView: 5,
		centeredSlides: true,
		loop: true,
		initialSlide: 0,
		mousewheel: true,
		freeMode: true,
		freeModeSticky: true,
		speed: 400,
		slideToClickedSlide: true,
		watchSlidesVisibility: true,
		on: {
			slideChange: function(){
				var idx = this.realIndex;
				$('.classic_view > li').removeClass('on');
				$('.classic_view > li').eq(idx).addClass('on');
			}
		}
	});

	function setYearDir(){
		var idx = yearSwiper.realIndex;
		if($(window).width() <= 1024){
			yearSwiper.changeDirection('horizontal');
		}else{
			yearSwiper.changeDirection('vertical');
		}
		yearSwiper.update();
		yearSwiper.slideToLoop(idx, 0);
	}

	setYearDir();
	$(window).resize(setYearDir);
}

//  MEDIA 플레이리스트
$('.playlist li a').click(function(e){
    e.preventDefault();

    var idx = $(this).parent().index();  //몇 번째 영상인지 (0~3)

    $('.playlist li').removeClass('on');
    $(this).parent().addClass('on');

    $('.film_view > li').removeClass('on');
    $('.film_view > li').eq(idx).addClass('on');
});

//  MEDIA 엔진 사운드 
var $wave = $('.sound_wave');

//막대 40개 만들기
for (var i = 0; i < 40; i++) {
    var dur = (Math.random() * 0.6 + 0.4).toFixed(2);
    var delay = (Math.random() * 0.5).toFixed(2);
    $wave.append('<li style="animation-duration:' + dur + 's; animation-delay:-' + delay + 's;"></li>');
}

$('.sound_list .btn_play').click(function(e){
    e.preventDefault();

    var $li = $(this).parent();
    var audio = $li.find('audio')[0];

    if ($li.hasClass('on')) {
        audio.pause();
        audio.currentTime = 0;
        soundOff($li);
    } else {
        $('.sound_list li.on').each(function(){
            var other = $(this).find('audio')[0];
            other.pause();
            other.currentTime = 0;
            soundOff($(this));
        });

        audio.play();
        $li.addClass('on');
        $(this).find('span').text('stop');
        $wave.addClass('playing');
    }
});

$('.sound_list audio').on('ended', function(){
    soundOff($(this).parent());
});

function soundOff($li){
    $li.removeClass('on');
    $li.find('.btn_play span').text('play_arrow');
    $wave.removeClass('playing');
}

// // ===== MEDIA 파형 이퀄라이저 =====
// var can = document.getElementById('cs');
// var ctx = can.getContext('2d');
// var waves = [];
// var playing = false;  //소리 재생 중인지
// var amp = 3;          //지금 물결 높이

// //최소~최대 사이 랜덤 숫자
// function randFrom(min, max){
//     return Math.random() * (max - min) + min;
// }

// //캔버스 크기를 CSS 크기에 맞추기
// function resizeCanvas(){
//     can.width = can.offsetWidth;
//     can.height = can.offsetHeight;
// }
// resizeCanvas();
// $(window).resize(resizeCanvas);

// //물결 하나 (속도, 물결 길이, 방향)
// function Wave(period, waveL, dir){
//     this.period = period;
//     this.waveL = waveL;
//     this.dir = dir;
//     this.phase = 0;
// }

// //물결 4개 겹치기
// for (var w = 0; w < 4; w++) {
//     waves.push(new Wave(randFrom(60, 140), randFrom(200, 900), Math.random() < 0.5 ? 1 : -1));
// }

// //계속 그리기
// function drawWave(){
//     requestAnimationFrame(drawWave);
//     ctx.clearRect(0, 0, can.width, can.height);

//     //재생 중이면 크게, 멈추면 잔잔하게 (부드럽게 변함)
//     var target = playing ? can.height / 2 / waves.length * 0.9 : 3;
//     amp += (target - amp) * 0.05;

//     ctx.beginPath();
//     for (var x = 0; x <= can.width; x += 4) {
//         var y = 0;
//         for (var i = 0; i < waves.length; i++) {
//             y += amp * Math.sin(waves[i].phase + 2 * Math.PI * x / waves[i].waveL * waves[i].dir);
//         }
//         if (x == 0) {
//             ctx.moveTo(x, can.height / 2 + y);
//         } else {
//             ctx.lineTo(x, can.height / 2 + y);
//         }
//     }
//     ctx.strokeStyle = playing ? '#1B4DA0' : '#2E2E30';  //재생 중 파랑, 멈춤 회색
//     ctx.lineWidth = 1.5;
//     ctx.stroke();

//     //물결 움직이기 (멈춰 있을 땐 천천히)
//     for (var k = 0; k < waves.length; k++) {
//         waves[k].phase += 2 * Math.PI / waves[k].period * (playing ? 1 : 0.3);
//     }
// }
// drawWave();


// // ===== MEDIA 엔진 사운드 =====
// $('.sound_list .btn_play').click(function(e){
//     e.preventDefault();

//     var $li = $(this).parent();
//     var audio = $li.find('audio')[0];

//     if ($li.hasClass('on')) {
//         audio.pause();
//         audio.currentTime = 0;
//         soundOff($li);
//     } else {
//         $('.sound_list li.on').each(function(){
//             var other = $(this).find('audio')[0];
//             other.pause();
//             other.currentTime = 0;
//             soundOff($(this));
//         });

//         audio.play();
//         $li.addClass('on');
//         $(this).find('span').text('pause');
//         playing = true;   //물결 크게
//     }
// });

// $('.sound_list audio').on('ended', function(){
//     soundOff($(this).parent());
// });

// function soundOff($li){
//     $li.removeClass('on');
//     $li.find('.btn_play span').text('play_arrow');
//     playing = false;     //물결 잔잔하게
// }