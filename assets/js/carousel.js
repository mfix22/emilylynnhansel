$(function() {
  var start = 90;
  var images = $('.carousel').children();
  var topImage = images.first();
  var slice = 360/(images.length);
  $('.caption').html(topImage.data('caption'));
  images.each(function(i, value) {
    $(value).data('deg', start);
    setView($(this), start);
    start += slice;
  });
  // $(document).on('mousewheel', function(event) {
  //   event.preventDefault();
  //   var width = $('.carousel').width();
  //   images.each(function(i, value) {
  //     var child = $(value);
  //     var pos = child.data('deg') + 5 * event.deltaY
  //     child.data('deg', pos);
  //     setView(child, pos);
  //   });
  // });

  $(document).keydown(function(e) {
    switch(e.which) {
      case 37: // left
        images.each(function(i, value) {
          var child = $(value);
          var deg = child.data('deg');
          child.data('deg', child.data('deg') - slice);
          debounce(slideView(child, child.data('deg')), 500);
        });
        topImage = topImage.prev();
        if (topImage.length == 0) topImage = images.last();
        $('.caption').html(topImage.data('caption'));
        e.preventDefault();
      break;

      case 39: // right
        images.each(function(i, value) {
          var child = $(value);
          var deg = child.data('deg');
          child.data('deg', child.data('deg') + slice);
          debounce(slideView(child, child.data('deg')), 500) ;
        });
        topImage = topImage.next();
        if (topImage.length == 0) topImage = images.first();
        $('.caption').html(topImage.data('caption'));
        e.preventDefault();
      break;
    } // prevent the default action (scroll / move caret)
  });

  function setView(elem, deg) {
    var newPos = (50 - 25 * Math.cos(2* Math.PI * (deg/360))) + '%'
    var scale = Math.sin(2* Math.PI * (deg/360)) + 1.1;
    scale = Math.min(scale, 1.5);
    var z = Math.floor(999 * Math.sin(2* Math.PI * (deg/360)));
    // console.log(z);
    elem.css({
      display : 'block',
      left: newPos,
      transform: 'translate3d(-50%, -50%, 0px) scale(' + scale + ')',
      'z-index' : z
    });
    // if (parseInt(elem.css('z-index')) > parseInt(topImage.css('z-index'))) {
    //   topImage = elem;
    //   $('.caption').html(topImage.data('caption'));
    // }
  }

  function slideView(elem, deg) {
    var newPos = (50 - 25 * Math.cos(2* Math.PI * (deg/360))) + '%'
    var scale = Math.sin(2* Math.PI * (deg/360)) + 1.1;
    scale = Math.min(scale, 1.5);
    var z = Math.floor(999 * Math.sin(2* Math.PI * (deg/360)));
    // console.log(z);
    elem.css({
      display : 'block',
      transform: 'translate3d(-50%, -50%, 0px) scale(' + scale + ')',
      'z-index' : z
    }).animate({
      left: newPos
    }, 300);
  }
});


function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
