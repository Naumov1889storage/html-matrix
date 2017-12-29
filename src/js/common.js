$( document ).ready(function() {
	$(".accordion_content").slideUp()
	$(".accordion_title").click(function () {
		var accordionContent = $(this).parent().find(".accordion_content");
		$(this).toggleClass("active");
		$(accordionContent).slideToggle()
	});

	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			$('.header-second').addClass('header-second_fixed');
		}
		else {
			$('.header-second').removeClass('header-second_fixed')
		}
	});

	$(window).scroll(function () {
		if ($(this).scrollTop() > 750) {
			$('.bottom-to-top').addClass('bottom-to-top_fixed');
		}
		else {
			$('.bottom-to-top').removeClass('bottom-to-top_fixed')
		}
	});

	function slowScroll (id) {
		var offset = 0;
		$('html, body').animate ({
			scrollTop: $(id).offset ().top - offset
		}, 500);
		return false;
	}

	$('.top-to-bottom').click(function (e) {
		e.preventDefault();
		slowScroll('#features')
	});
	$('.bottom-to-top').click(function (e) {
		e.preventDefault();
		slowScroll('#header-first')
	});

	$('.autumn.leaf')
		.transition('slide down')
	;

	$('.ui.dropdown')
		.dropdown()
	;

	var headerMobNav = $('.header-mob_nav');
	var popupOverlay = $('.popup_overlay');
	var hamburger = $('.cmn-toggle-switch.cmn-toggle-switch__htx');
	popupOverlay.click(function () {
		headerMobNav.removeClass('header-mob_nav__show');
		popupOverlay.removeClass('popup_overlay__show');
		hamburger.removeClass('active')
	});
	$(hamburger).click(function () {
		headerMobNav.toggleClass('header-mob_nav__show');
		popupOverlay.toggleClass('popup_overlay__show')
	})

});
