(function ($) {
  'use strict';

  /*
  |--------------------------------------------------------------------------
  | Template Name: Renft
  | Author: ThemeDox
  | Version: 1.0.0
  |--------------------------------------------------------------------------
  |--------------------------------------------------------------------------
  | TABLE OF CONTENTS:
  |--------------------------------------------------------------------------
  |
  | 1. Preloader
  | 2. Mobile Menu
  | 3. Sticky Header
  | 4. Dynamic Background
  | 5. Slick Slider
  | 6. Counter Animation
  | 7. Accordian
  | 8. Cursor Animation
  |
  */

  /*--------------------------------------------------------------
    Scripts initialization
  --------------------------------------------------------------*/
  $.exists = function (selector) {
    return $(selector).length > 0;
  };

  $(window).on('load', function () {
    preloader();
  });

  $(function () {
    mainNav();
    stickyHeader();
    dynamicBackground();
    counterInit();
    slickInit();
    accordian();
    if ($.exists('.wow')) {
      new WOW().init();
    }
  });

  $(window).on('scroll', function () {
    stickyHeader();
  });

  /*--------------------------------------------------------------
    1. Preloader
  --------------------------------------------------------------*/
  function preloader() {
    $('.cs_preloader').fadeOut();
    $('cs_preloader_in').delay(150).fadeOut('slow');
  }

  /*--------------------------------------------------------------
    2. Mobile Menu
  --------------------------------------------------------------*/
  function mainNav() {
    $('.cs_nav').append('<span class="cs_menu_toggle"><span></span></span>');
    $('.menu-item-has-children').append(
      '<span class="cs_munu_dropdown_toggle"><span></span></span>',
    );
    $('.cs_menu_toggle').on('click', function () {
      $(this)
        .toggleClass('cs_toggle_active')
        .siblings('.cs_nav_list')
        .toggleClass('cs_active');
    });
    $('.cs_menu_toggle')
      .parents('body')
      .find('.cs_side_header')
      .addClass('cs_has_main_nav');
    $('.cs_menu_toggle')
      .parents('body')
      .find('.cs_toolbox')
      .addClass('cs_has_main_nav');
    $('.cs_munu_dropdown_toggle').on('click', function () {
      $(this).toggleClass('active').siblings('ul').slideToggle();
      $(this).parent().toggleClass('active');
    });
  }

  /*--------------------------------------------------------------
    3. Sticky Header
  --------------------------------------------------------------*/
  function stickyHeader() {
    var scroll = $(window).scrollTop();
    if (scroll >= 10) {
      $('.cs_site_header').addClass('cs_sticky_active');
    } else {
      $('.cs_site_header').removeClass('cs_sticky_active');
    }
  }

  /*--------------------------------------------------------------
    4. Dynamic Background
  --------------------------------------------------------------*/
  function dynamicBackground() {
    $('[data-src]').each(function () {
      var src = $(this).attr('data-src');
      $(this).css({
        'background-image': 'url(' + src + ')',
      });
    });
  }

  /*--------------------------------------------------------------
    5. Slick Slider
  --------------------------------------------------------------*/
  function slickInit() {
    if ($.exists('.cs_slider')) {
      $('.cs_slider').each(function () {
        // Slick Variable
        var $ts = $(this).find('.cs_slider_container');
        var $slickActive = $(this).find('.cs_slider_wrapper');
        // Auto Play
        var autoPlayVar = parseInt($ts.attr('data-autoplay'), 10);
        // Auto Play Time Out
        var autoplaySpdVar = 3000;
        if (autoPlayVar > 1) {
          autoplaySpdVar = autoPlayVar;
          autoPlayVar = 1;
        }
        // Slide Change Speed
        var speedVar = parseInt($ts.attr('data-speed'), 10);
        // Slider Loop
        var loopVar = Boolean(parseInt($ts.attr('data-loop'), 10));
        // Slider Center
        var centerVar = Boolean(parseInt($ts.attr('data-center'), 10));
        // Variable Width
        var variableWidthVar = Boolean(
          parseInt($ts.attr('data-variable-width'), 10),
        );
        // Pagination
        var paginaiton = $(this)
          .find('.cs_pagination')
          .hasClass('cs_pagination');
        // Slide Per View
        var slidesPerView = $ts.attr('data-slides-per-view');
        if (slidesPerView == 1) {
          slidesPerView = 1;
        }
        if (slidesPerView == 'responsive') {
          var slidesPerView = parseInt($ts.attr('data-add-slides'), 10);
          var lgPoint = parseInt($ts.attr('data-lg-slides'), 10);
          var mdPoint = parseInt($ts.attr('data-md-slides'), 10);
          var smPoint = parseInt($ts.attr('data-sm-slides'), 10);
          var xsPoing = parseInt($ts.attr('data-xs-slides'), 10);
          var xxsPoing = parseInt($ts.attr('data-xxs-slides'), 10);
        }
        // Fade Slider
        var fadeVar = parseInt($($ts).attr('data-fade-slide'));
        fadeVar === 1 ? (fadeVar = true) : (fadeVar = false);

        // Slick Active Code
        $slickActive.slick({
          autoplay: autoPlayVar,
          dots: paginaiton,
          centerPadding: '28%',
          speed: speedVar,
          infinite: loopVar,
          autoplaySpeed: autoplaySpdVar,
          centerMode: centerVar,
          fade: fadeVar,
          prevArrow: $(this).find('.cs_left_arrow'),
          nextArrow: $(this).find('.cs_right_arrow'),
          appendDots: $(this).find('.cs_pagination'),
          slidesToShow: slidesPerView,
          variableWidth: variableWidthVar,
          swipeToSlide: true,
          responsive: [
            {
              breakpoint: 1600,
              settings: {
                slidesToShow: lgPoint,
              },
            },
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: mdPoint,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: smPoint,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: xsPoing,
              },
            },
            {
              breakpoint: 575,
              settings: {
                slidesToShow: xxsPoing,
              },
            },
          ],
        });
      });
    }
  }

  /*--------------------------------------------------------------
    6. Counter Animation
  --------------------------------------------------------------*/
  function counterInit() {
    if ($.exists('.odometer')) {
      $(window).on('scroll', function () {
        function winScrollPosition() {
          var scrollPos = $(window).scrollTop(),
            winHeight = $(window).height();
          var scrollPosition = Math.round(scrollPos + winHeight / 1.2);
          return scrollPosition;
        }

        $('.odometer').each(function () {
          var elemOffset = $(this).offset().top;
          if (elemOffset < winScrollPosition()) {
            $(this).html($(this).data('count-to'));
          }
        });
      });
    }
  }

  /*--------------------------------------------------------------
    7. Accordian
  --------------------------------------------------------------*/
  function accordian() {
    $('.cs_accordian').children('.cs_accordian_body').hide();
    $('.cs_accordian.active').children('.cs_accordian_body').show();
    $('.cs_accordian_head').on('click', function () {
      $(this)
        .parent('.cs_accordian')
        .siblings()
        .children('.cs_accordian_body')
        .slideUp(250);
      $(this).siblings().slideDown(400);
      $(this)
        .parent()
        .parent()
        .siblings()
        .find('.cs_accordian_body')
        .slideUp(250);
      /* Accordian Active Class */
      $(this).parents('.cs_accordian').addClass('active');
      $(this).parent('.cs_accordian').siblings().removeClass('active');
      $(this)
        .parents('.col-lg-6')
        .siblings()
        .find('.cs_accordian')
        .removeClass('active');
    });
  }

  /*--------------------------------------------------------------
    8. Cursor Animation
  --------------------------------------------------------------*/
  $(function () {
    $('body').append('<span class="cs_cursor_lg d"></span>');
    $('body').append('<span class="cs_cursor_sm"></span>');

    $('.cs_view_mouse').on('mouseenter', function () {
      $('.cs_cursor_lg').addClass('opacity-0');
      $('.cs_cursor_sm').addClass('opacity-0');
    });
    $('.cs_view_mouse').on('mouseleave', function () {
      $('.cs_cursor_lg').removeClass('opacity-0');
      $('.cs_cursor_sm').removeClass('opacity-0');
    });
  });

  function cursorMovingAnimation(event) {
    try {
      const timing = gsap.timeline({
        defaults: {
          x: event.clientX,
          y: event.clientY,
        },
      });

      timing
        .to('.cs_cursor_lg', {
          ease: 'power2.out',
        })
        .to(
          '.cs_cursor_sm',
          {
            ease: 'power2.out',
          },
          '-=0.4',
        );
    } catch (err) {
      console.log(err);
    }
  }
  document.addEventListener('mousemove', cursorMovingAnimation);
})(jQuery); // End of use strict

//////// incio de las animaaaaaaaaaaaaaaaaaaciones 

document.addEventListener('DOMContentLoaded', function() {
  const section = document.querySelector('.isa-section');
  const card = document.querySelector('.isa-card');
  const rainItems = document.querySelectorAll('.rain-item');
  const messageLines = document.querySelectorAll('.message-line');
  const nameFinal = document.querySelector('.name-final');
  
  // Función para verificar si un elemento está en el viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75
    );
  }
  
  // Función para manejar las animaciones al hacer scroll
  document.addEventListener("DOMContentLoaded", function () {
  const elements = [
    ...document.querySelectorAll('.rain-item'),
    ...document.querySelectorAll('.isa-mensaje-central'),
    ...document.querySelectorAll('.isa-nombre-final')
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;

      if (entry.isIntersecting) {
        const index = elements.indexOf(el);
        el.style.animationDelay = `${index * 0.3}s`;
        el.classList.add('fade-slide-up');
      }
    });
  }, {
    threshold: 0.2,
  });

  elements.forEach(el => observer.observe(el));
});

  
  // Verificar al cargar la página
  handleScrollAnimations();
  
  // Verificar al hacer scroll
  window.addEventListener('scroll', handleScrollAnimations);
});
   document.addEventListener("DOMContentLoaded", function () {
    const elements = [
      ...document.querySelectorAll('.rain-item'),
      ...document.querySelectorAll('.isa-mensaje-central'),
      ...document.querySelectorAll('.name-final')
    ];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target;

        if (entry.isIntersecting) {
          const index = elements.indexOf(el);
          el.style.animationDelay = `${index * 0.3}s`;
          el.classList.add('fade-slide-up');
        } else {
          el.classList.remove('fade-slide-up');
          el.style.animationDelay = '0s';
        }
      });
    }, {
      threshold: 0.2,
    });

    elements.forEach(el => observer.observe(el));
  });

  // funcion para la animacion de los precios
document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('togglePrice');
    const prices = document.querySelectorAll('.cs_price_amount');

    const preciosMensuales = [
        { monto: 950, etiqueta: '/mes' },
        { monto: 1700, etiqueta: '/mes' },
        { monto: 2000, etiqueta: '/mes' }
    ];

    const preciosAnuales = [
        { precioAnterior: 0, monto: 11400.00, etiqueta: '/año' },
        { precioAnterior: 20400, monto: 18500.00, etiqueta: '/año' },
        { precioAnterior: 0, monto: 24000.00, etiqueta: '/año', extra: 'Incluye + 120 pacientes anuales' }
    ];

    function actualizarPrecios(esAnual) {
    if (esAnual) {
      preciosAnuales.forEach((plan, index) => {
        if (prices[index]) {
          let precioAnteriorHTML = plan.precioAnterior > 0 
            ? `<span style="text-decoration: line-through; color: #bbb;">
                 $${plan.precioAnterior.toLocaleString('es-MX',{ minimumFractionDigits: 2 })} MXN
               </span>` 
            : '';
          let extraHTML = plan.extra ? `<div style="font-size: 1.1rem; color: #1abc9c; margin-top: 0.5rem;">${plan.extra}</div>` : '';
          prices[index].innerHTML = `
            <div style="color: #555;">Desde: ${precioAnteriorHTML}</div>
            <div style="font-weight: bold; line-height: 1.2;">
              $${plan.monto.toLocaleString('es-MX',{minimumFractionDigits: 2})} MXN
            </div>
            <div style="font-size: 1.5rem; color: #555;">
              ${plan.etiqueta}
            </div>
            ${extraHTML}
          `;
        }
      });
    } else {
            preciosMensuales.forEach((plan, index) => {
                if (prices[index]) {
                    prices[index].innerHTML = `
                        <div style="color: #555;">Desde:</div>
                        <div style="font-weight: bold; line-height: 1.2;">
                            $${plan.monto.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                        </div>
                        <div style="font-size: 1.2rem; color: #555;">
                            ${plan.etiqueta}
                        </div>
                    `;
                }
            });
        }
    }

    toggle.addEventListener('change', function () {
        actualizarPrecios(this.checked);
    });

    actualizarPrecios(false);
});
  // codigo para isa-dic botones
 // Abrir modal
// Abrir modal Agenda
$(".btnAbrirAgend").on("click", function () {
  $("#modal-agend").show();
});

// Abrir modal Dic
$(".btnAbrirDic").on("click", function () {
  $("#modal-dic").show();
});

// Cerrar cualquier modal
$(".close").on("click", function () {
  $(this).closest(".modal").hide();
});

// Formulario Agenda
$("#form-agend").on("submit", function (e) {
  e.preventDefault();

  var settings = {
    url: "http://127.0.0.1:8000/panel/api/prospect_register/",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: {
      first_name: $("#first_name_agend").val(),
      last_name: $("#last_name_agend").val(),
      phone_number: $("#phone_number_agend").val(),
      email: $("#email_agend").val(),
      identifier: $("#identifier_agend").val()
    }
  };

  $.ajax(settings).done(function (response) {
    console.log("Respuesta Agenda:", response);
    if (response.admin_phone_number) {
      window.open("https://wa.me/" + response.admin_phone_number, "_blank");
    } else {
      alert("No se recibió un número de asesor.");
    }
    $("#modal-agend").hide();
  }).fail(function () {
    alert("Error al registrar Agenda");
  });
});

// Formulario Dic
$("#form-dic").on("submit", function (e) {
  e.preventDefault();

  var settings = {
    url: "http://127.0.0.1:8000/panel/api/prospect_register/",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: {
      first_name: $("#first_name_dic").val(),
      last_name: $("#last_name_dic").val(),
      phone_number: $("#phone_number_dic").val(),
      email: $("#email_dic").val(),
      identifier: $("#identifier_dic").val()
    }
  };

  $.ajax(settings).done(function (response) {
    console.log("Respuesta Dic:", response);
    if (response.admin_phone_number) {
      window.open("https://wa.me/" + response.admin_phone_number, "_blank");
    } else {
      alert("No se recibió un número de asesor.");
    }
    $("#modal-dic").hide();
  }).fail(function () {
    alert("Error al registrar Dic");
  });
});


