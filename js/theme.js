var $ = jQuery.noConflict();

$(document).ready(function($) {
	"use strict";

	$('[data-toggle="tooltip"]').tooltip();

	
	/*
	| ----------------------------------------------------------------------------------
	| Contact us form validation
	| ----------------------------------------------------------------------------------
	*/
	$('#contact-form').on('submit', function(e) {
		e.preventDefault();
		// we clear error messages
		$(this).find('.error').removeClass('error');
		$(this).find('.err_msg').fadeOut(200);
		
		// validate form
		var validation = validate_contact(e);
		
		for (var i = 0; i < validation.length; i++) 
		{
			$(validation[i]).addClass('error');
		}
		
		if ( validation.length ) 
		{
			$('body, html').animate( { 'scrollTop': $(validation[0]).offset().top - 100 }, 'easeInCube', function() {
				$(this).select();
			});
			return false;
		}
		else
		{
			submit_form(e);
			return true;
		}
	});
	
	function validate_contact(e) {
		var $form = $(e.target);
		var rule, val, bad_fields = new Array();
		$form.find('input, textarea').each(function() {
			rule = $(this).data('validate');
			if ( ! rule ) return;
			
			val = $(this).val();
			if ( ! val.match(rule) )
			{
				bad_fields.push(this);
			}
		});
		return bad_fields;
	}
	
	
	/*
	| ----------------------------------------------------------------------------------
	| Contact us form submit
	| ----------------------------------------------------------------------------------
	*/
	function submit_form(e) {
		var $form = $(e.target),
			$btn = $form.find('button'),
			btn_text = $btn.text();
		$.ajax({
			url: 'inc/phpmailer/contact.php',
			data: $form.serialize(),
			dataType: 'json',
			type: 'POST',
			beforeSend: function() {
				$('#contact_fail .alert-inner').empty();
				$('#contact_fail').hide();
				$btn.attr('disabled', 'disabled').addClass('btn-disabled').css('cursor', 'wait').text('Sending...');
			},
			success: function(result) {
				if ( typeof result.success == 'undefined' )
				{
					// form is not valid, display errors
					for ( var x in result )
					{
						$('#contact_fail .alert-inner').append('<p>' + result[x] + '</p>');
					}
					$('#contact_fail').fadeIn();
				}
				else
				{
					// form sent successfully and without errors
					$('#contact_success').fadeIn(700, function() {
						var $this = $(this);
						setTimeout(function() {
							$this.fadeOut();
						}, 5000);
					});
				}
			},
			complete: function() {
				$btn.removeAttr('disabled', 'disabled').removeClass('btn-disabled').css('cursor', 'pointer').html(btn_text);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				switch (jqXHR.status)
				{
					case 404:
						alert("We're Sorry... The file you are looking for is not found :(");
						break;
					case 500,200:
						$('#contact_fail .alert-inner').append("<p>Oops, something went wrong and we couldn't send your message :(</p>");
						$('#contact_fail').fadeIn();
						break;
					default:
						console.log(jqXHR, textStatus, errorThrown);
				}
			}
		});
	}

	
	/*
	| ----------------------------------------------------------------------------------
	| Add Smoot Scroll to Chrome
	| ----------------------------------------------------------------------------------
	*/
	try {
		$.browserSelector();
		if( $("html").hasClass("chrome") ) {
			$.smoothScroll();
		}
	} catch(err) {
	}

	
	/*
	| ----------------------------------------------------------------------------------
	| Add helper class to bootstrap accordion
	| ----------------------------------------------------------------------------------
	*/
	try {
		$('.panel-group .panel-collapse.in').closest('.panel').addClass('active');
		$('.panel-group').on('shown.bs.collapse', function(e) {
			$(this).find('.panel.active').removeClass('active');
			$(e.target).closest('.panel').addClass('active');
		});
		$('.panel-group').on('hide.bs.collapse', function(e) {
			$(this).find('.panel.active').removeClass('active');
		});
	} catch(err) {
	}

	
	/*
	| ----------------------------------------------------------------------------------
	| Portfolio AJAX
	| ----------------------------------------------------------------------------------
	*/
	var $page = $('#page-wrapper'),
		$ajax = $('#ajax');
		
	$('.portfolio-item .hover > a').on('click', function() {
		var $this = $(this),
			target = $this.attr('href');

		load_prj_content(target, event);
	});
	
	function load_prj_content(target, e)
	{
		var flag;
		target = target.substring(2);
		$.ajax({
			type: 'get',
			url: target,
			beforeSend: function() {
				flag = false;
				$ajax.empty().hide();
				$('body').addClass('portfolio-view');
				$page.hide();
				$('#ajax_loading').addClass('loading');
			},
			success: function(data) {
				$(data).waitForImages({
					finished: function() {
						if ( flag ) return false;
						flag = true;
						$ajax.html(data);
						
						var $target = ( typeof e == 'undefined' ) ? $('.portfolio-item .hover > a[href="' + window.location.hash + '"]') : $(e.target);
						var $next = $target.closest('.portfolio-item').parent().next().find('.hover > a');
						var $prev = $target.closest('.portfolio-item').parent().prev().find('.hover > a');
						var $btn_next = $('#next-project');
						var $btn_prev = $('#prev-project');
						
						if ( $next.length )
						{
							$btn_next.removeClass('disabled').attr('href', $next.attr('href'));
						}
						else
						{
							$btn_next.addClass('disabled').attr('href', 'javascript:void(0);');
						}
						
						if ( $prev.length )
						{
							$btn_prev.removeClass('disabled').attr('href', $prev.attr('href'));
						}
						else
						{
							$btn_prev.addClass('disabled').attr('href', 'javascript:void(0);');
						}
						
						$('#ajax_loading').removeClass('loading');
						$ajax.fadeIn(300, function() {
							$('body').scrollTo( 0, 200, { easing: 'easeInQuad' } );
						});
					}
				});
			},
			statusCode: {
				404: function() {
					// alert('Not found');
				}
			},
			complete: function() {
			},
			error: function(a,b,c) {
			}
		});
	}
	
	$(document).on('click', '#close-project', function() {
		$ajax.fadeOut(500, function() {
			$('body').removeClass('portfolio-view');
			$page.show();
			$('body').scrollTo( $('#s-portfolio'), 500, { offset: header_height(), easing: 'easeInQuad' } );
		});
	});
	
	
	/*
	| ----------------------------------------------------------------------------------
	| Add active class to active section in navigation menu
	| ----------------------------------------------------------------------------------
	*/
	function onResize()
	{
		// Destory All waypoints
		$.waypoints('destroy');
		
		// onHashChange();
		
		$('.waypoint').waypoint({
			handler: function(direction) {
				// add active class to reached waypoint
				var $active_section = $(this);
				if ( direction === 'up' ) $active_section = $active_section.prev();
				$('.main-menu').find('.active').removeClass('active');
				$('.main-menu').find('a[href="#' + $active_section[0].id + '"]').parent().addClass('active');
			},
			offset: '15%'
		});
		
		update_sticky();
		
		if ( $(window).width() > 981 ) 
		{
			$('body').removeClass('mobile');
		}
		else
		{
			$('body').addClass('mobile');
		}
	}
	onResize();
	$(window).on('resize', function() {
		onResize();
	});
	
	
	/*
	| ----------------------------------------------------------------------------------
	| Hashchange & ScrollTo Plugin
	| ----------------------------------------------------------------------------------
	*/
	function onHashChange() {
		$(window).bind('hashchange', function(e) {
			e.preventDefault();
			var target, $target;
			
			try { 
				target = window.location.hash;
				if ( target.indexOf('#!') === -1 )
				{
					target = '#' + window.location.hash.substring(1),
						$target = $(target);
				}
				else
				{
					load_prj_content(target);
					return false;
				}
			} catch(e) {
				// console.debug(e.message);
			}
			if ( $target === undefined || ! target || $target.length == 0 ) return false;
			
			$('body').scrollTo( $target, 500, { offset: header_height(), easing: 'easeInQuad' }, function() { onResize(); } );
			return false;
		});
		$('.main-menu li > a, .scrollto').on('click', function(e) {
			// e.preventDefault();
			if ( $(e.target) === undefined || $(e.target).length == 0 ) return false;
			$('body').scrollTo( $(this).attr('href'), 500, { offset: header_height(), easing: 'easeInQuad' } );
		});
	}
	onHashChange();
	$(window).waitForImages(function() { $(window).trigger('hashchange'); });
	
	function header_height()
	{
		var $site_header = $('.site-header'),
			headerH = $site_header.height();
		
		headerH = -1 * parseInt(headerH);
		return headerH;
	}

	
	/*
	| ----------------------------------------------------------------------------------
	| Portfolio MixitUp Plugin
	| ----------------------------------------------------------------------------------
	*/
	var $portfolio_grid = $('.list-portfolio');
	try {
		$portfolio_grid.mixitup({
			effects: ['fade','blur', 'rotateZ'],
			easing: 'snap',
			onMixEnd: function() { onResize(); }
		});
	} catch(err) {
	}

	
	/*
	| ----------------------------------------------------------------------------------
	| Clients Carousel
	| ----------------------------------------------------------------------------------
	*/
	var $carousel = $('.flexslider.flex-carousel');
	try {
		$carousel.each(function() {
			var $this = $(this),
				items = parseInt($this.data('visible-items')),
				slideshow = ( $this.data('slideshow') == true ) ? true : false,
				direction = ( $this.data('direction') == true ) ? true : false,
				pagination = ( $this.data('pagination') == true ) ? true : false;
			
			if ( isNaN(items) ) items = 4;
			
			var itemW = $this.width() / items;
				
			$this.waitForImages(function() {
				$this.flexslider({
					animation: 'slide',
					prevText: '<i class="si-arrow-left"></i>',
					nextText: '<i class="si-arrow-right"></i>',
					slideshow: slideshow,
					directionNav: direction,
					animationLoop: false,
					itemWidth: itemW,
					pauseOnHover: true,
					controlNav: pagination,
					itemMargin: 0
				});
			});
		});
	} catch(err) {
	}

	
	/*
	| ----------------------------------------------------------------------------------
	| Parallax sections
	| ----------------------------------------------------------------------------------
	*/
	$('body:not(.mobile) .parallax').each(function() {
		var $this = $(this),
			speed = $this.data('speed'),
			xpos = $this.data('xpos');
		
		if ( speed === undefined || speed == 'undefined' ) speed = 0.25;
		if ( xpos === undefined || xpos == 'undefined' ) xpos = '50%';
		
		$this.waitForImages(function() {
			$this.parallax(xpos, speed);
		});
	});

	
	/*
	| ----------------------------------------------------------------------------------
	| Contact Us toggle button
	| ----------------------------------------------------------------------------------
	*/
	$('.toggle-contact').on('click', function() {
		var $this = $(this),
			$container = $('.contact-wrapper');
		if ( $this.find('.fa').hasClass('fa-minus') ) 
		{
			$container.animate({
				'opacity': 0,
				'visibility': 'hidden'
			}, 300);
			$this.appendTo( $this.closest('.relative') );
			$this.find('.fa').attr('class', 'fa fa-plus');
		}
		else
		{
			$this.prependTo($container);
			$container.animate({
				'opacity': 1,
				'visibility': 'visible'
			}, 300);
			$this.find('.fa').attr('class', 'fa fa-minus');
		}
	});

	
	/*
	| ----------------------------------------------------------------------------------
	| Progress bar Animation
	| ----------------------------------------------------------------------------------
	*/
	$('.progress-bar').appear();
	$(document).on('appear', '.progress-bar:not(.animation-done)', function() {
		var $this = $(this).addClass('animation-done');
		$this.animate( { 'width': $this.attr('aria-valuenow') + '%' }, 300, 'easeOutExpo' );
	});	

	
	/*
	| ----------------------------------------------------------------------------------
	| animate elements when they are in viewport
	| ----------------------------------------------------------------------------------
	 */
	$('.noIE .animated').appear();
	$(document).on('appear', '.noIE .animated:not(.animation-done)', function() {
		var $this = $(this),
			animation = $(this).data('animation'),
			delay = parseInt($this.data('delay')),
			speed = parseInt($this.data('speed'));
			
		if ( ! isNaN(speed) )
			$this.css('animation-duration', speed + 'ms');
		
			
		if ( ! isNaN(delay) )
		{
			setTimeout(function() {
				$this.addClass('animation-done').addClass(animation);
			}, delay);
		}
		else
		{
			$this.addClass('animation-done').addClass(animation);
		}
	});
	$(window).trigger('scroll');
});
	
	
/*
| ----------------------------------------------------------------------------------
| Sticky Header
| ----------------------------------------------------------------------------------
*/
function update_sticky()
{
	if ( $('body.sticky-header').length == 0 ) return;

	var $point = $('.homeslider').parent(),
		$pageHeader = $('.site-header'),
		sticky_header_offset;
	
	sticky_header_offset = $point.next('.section');
	if ( sticky_header_offset.length )
	{
		sticky_header_offset = sticky_header_offset.offset().top;
	
		$(window).on('scroll', function() {
			var winH = $(window).scrollTop();
			if ( winH > sticky_header_offset ) {
				$pageHeader.addClass('sticky');
			}
			else
			{
				$pageHeader.removeClass('sticky');
			}
		});
	}
}


jQuery(window).load(function() {

	/*
	| ----------------------------------------------------------------------------------
	| Google Map
	| ----------------------------------------------------------------------------------
	*/
	try {
		$('#gmap').gmap3({
			marker:{
				address: "Envato - 121 King St, Melbourne VIC 3000, Australia"
			},
			map:{
				options:{
					center:[-37.816972,144.955303],
					zoom: 14
				}
			}
		});
	} catch(err) {
	}

});