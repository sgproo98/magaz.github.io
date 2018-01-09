$(document).ready(function() {
    
	$('.slider-comments').slick({
	  arrows: true,
	  dots: true,
	  infinite: true,
	  speed: 300,
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  adaptiveHeight: true,
	  responsive: [
			{
			  breakpoint: 767,
			  settings: {
			    arrows: false
			  }
			}
		]
	});

	$('.slider-programms').slick({
	  arrows: false,
	  dots: true,
	  infinite: true,
	  speed: 300,
	  slidesToShow: 3,
	  slidesToScroll: 1,
	  adaptiveHeight: true,
	  responsive: [
			{
			  breakpoint: 1109,
			  settings: {
			    slidesToShow: 2
			  }
			},
			{
			  breakpoint: 767,
			  settings: {
			    slidesToShow: 1
			  }
			}
		]
	});


	$('#section-programms .margin_set11 .item-product a.btn_style').click(function(){
		$('#section-programms .margin_set11 .item-product a.btn_style.active').not(this).removeClass('active').text('Р’С‹Р±СЂР°С‚СЊ');
		if($(this).hasClass('active')){
			$(this).removeClass('active').text('Р’С‹Р±СЂР°С‚СЊ');
			$('#field-service').val('');
		}else{
			$(this).text('Р’С‹Р±СЂР°РЅРѕ').addClass('active');
			var service = $(this).attr('rel');
			$('#field-service').val(service);
		}
		return false;	
	});

	$('form.ajaxForm').submit(function(){
		var form = $(this);
		var error = false;
		var items = $(this).find('input.required');
		for(var i=0;i<items.length;i++){
			if($(items[i]).val().length<1){
				var error = true;
				$(items[i]).parent().addClass('field_error');
			}else{
				$(items[i]).parent().removeClass('field_error');
			}
		}

		if(error==false){
			var formdata = $(form).serialize();
			jQuery.ajax({
					type: 'POST',
					url: 'forms.php',
					data: formdata,
					success: function (html){ 
						processResponse(html);
						var winid = $(form).attr('rel');
						$("#"+winid).parent(".box_window").fadeIn('normal', function(){ $('body').addClass('onModal'); }).addClass("windactiv");
						$(".mask").fadeIn();
						$("body").css("overflow", "hidden");
						$(".windactiv").css("overflow-y", "scroll");
						$(".to_blur").addClass("blur");	
						$(form).find('input[type="text"], input[type="email"], textarea').val('');
					}
			});
		}
		return false;	
	});


	function processResponse(json){
		var jsonObj = jQuery.parseJSON(json);
		jQuery.each(jsonObj, function(k, v) {
		  if(k=='script'){ eval(v); }
		  if(k=='script2'){ eval(v); }
		  if(k=='addHtml'){ jQuery.each(v, function(key, val) { jQuery(key).append(val); }); }
		  if(k=='replaceHtml'){ jQuery.each(v, function(key, val) { jQuery(key).replaceWith(val); }); }
		  if(k=='changeHtml'){ jQuery.each(v, function(key, val) { jQuery(key).html(val); }); }
		});
	}

	$("body").prepend("<div class='mask'></div>");
    (function($) {
      $(function() {
          var popwindow = $('.popwindow');
          var popbutton = $('.popbutton');
         
          function preparewindow(windowobject) {
            var winwidth = windowobject.data("width"); 
            var winheight = windowobject.data("height");
            var winmargin = winwidth / 2;
            var wintitle = windowobject.data("title");

            windowobject.wrap("<div class='box_window'></div>");
            windowobject.addClass("box_window_in");
            windowobject.parent(".box_window");

            windowobject.parent(".box_window").prepend("<div class='box_title'>"+wintitle+"</div>");
            windowobject.parent(".box_window").css({'width':winwidth,'margin-left':'-'+winmargin})
            windowobject.css({'height':winheight})
          }  
          if (popwindow.length) {
            preparewindow(popwindow);
            popbutton.click(function(){
                var idwind = $(this).data("window");
                //Р—Р°РєСЂС‹С‚РёРµ РјРѕРґР°Р»РѕРє РїСЂРё РѕС‚РєСЂС‹РІР°РЅРёРё РЅРѕРІРѕР№
                $('.box_window').fadeOut('normal', function(){ $('body').removeClass('onModal'); }).removeClass("windactiv");
                //
                $("#" + idwind).parent(".box_window").fadeIn('normal', function(){ $('body').addClass('onModal'); }).addClass("windactiv");
                $(".mask").fadeIn();
                $("body").css("overflow", "hidden");
                $(".windactiv").css("overflow-y", "scroll");
                $(".to_blur").addClass("blur");
            });
          };
          $(document).mouseup(function(e) {
              if($('body').hasClass("onModal")){
                if($(e.target).is('.popup-style *')){
                    return false;
                }
                $(".windactiv").fadeOut('normal', function(){ $('body').removeClass('onModal'); });
                $(".windactiv").removeClass("windactiv");
                $(".mask").fadeOut();
                $(".popup-lvl2").fadeOut();
                $("body").css("overflow", "visible");
                $(".to_blur").removeClass("blur");
              }
          });


          $(".bw_close, .closeform").click(function(){
            $(".windactiv").fadeOut('normal', function(){ $('body').removeClass('onModal'); });
            $(".windactiv").removeClass("windactiv");
            $(".mask").fadeOut();
            $(".popup-lvl2").fadeOut();
            $("body").css("overflow", "visible");
            $(".to_blur").removeClass("blur");
          });
      });
    })(jQuery)

	$('.photo-popup').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom',
		image: {
			verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 300
		}
	});

	$('.phone-mask').mask("+7 (999) 999-99-99");

	if ($(window).width() <= 767) {
        $('.btn-mob-nav').click(function () {
			$(".menu").removeClass("slideOutRight animated");
	        $(".menu").addClass("opened slideInRight animated");
	        $('body').toggleClass( "hidden" );
	        return false;
	    });
	    $('.menu a').click(function () {
	        $(".menu").removeClass("slideInRight animated");
		    $(".menu").addClass("slideOutRight animated");
	        $('body').removeClass("hidden");
	    });
    }

    $(function(){
	   $('a[href^="#"]').click(function(){
	        var target = $(this).attr('href');
	        $('html, body').animate({scrollTop: $(target).offset().top - 0}, 600);
	        return false;
	   }); 
	}); 



});