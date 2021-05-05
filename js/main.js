ANIMATION_SPEED = 400;

$.easing.def = "easeInOutCubic";

$(function(){

  /*if(!Modernizr.touch) {
    var skrl = skrollr.init({
      easing: 'sqrt'
    });
  }*/

  $('a[href^="#"]', '#navigation').on('click',function (e) {
    e.preventDefault();
    var target = this.hash,
	$target = $(target);
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top
    }, 1000, function () {
      window.location.hash = target;
    });
  });

  $("#navigation li").on('activate', function() {
    bgLazyLoad('#' + $($(this).find('a').attr('href')).next().next().attr('id'));
    bgLazyLoad('#' + $($(this).find('a').attr('href')).next().attr('id'));
    bgLazyLoad($(this).find('a').attr('href'));
  });

  $('#gallery-sec, #maps-carousel').carousel({
    interval: false
  });

  $('#gallery-sec')
    .on('click', function(){
      lazyLoad('#gallery-sec');
    });
  $('#maps')
    .on('click', function(){
      lazyLoad('#maps');
    });

  $('#gallery-sec')
    .on('click', function(){
      lazyLoad('#gallery-sec');
    })
    .on('click', '.icn-history-more', function(e){
      e.preventDefault();
      $(e.target).next().animate({top: '0px'}, ANIMATION_SPEED);
    })
    .on('click', '.icn-history-close', function(e){
      e.preventDefault();
      $(e.target).parent().animate({top: '770px'}, ANIMATION_SPEED);
    });

  $("img[data-original]").lazyload();
});

function lazyLoad(parent) {
  $('[data-original]', $(parent)).each(function(){
    var $img = $(this);
    $img.attr('src', $img.attr('data-original'));
    $img.removeAttr('data-original');
  });
}

function bgLazyLoad(el){
  var $div = $(el).filter('[data-bg]');
  if($div.length) {
    $div.css('background', 'url(' + $div.attr('data-bg') + ') no-repeat left top');
    var $temp = $('<img>');
    $temp
      .css({
	position: 'absolute',
	left: '-9999px',
	top: 0
      })
      .attr('src', $div.attr('data-bg'))
      .load(function(){
	$div.removeAttr('data-bg');
      });
  }
}
