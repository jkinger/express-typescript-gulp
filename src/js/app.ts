import * as $ from 'jquery';
import * as WOW from 'wowjs';

$('body').scrollspy({
  target: '.fixed-top',
  offset: 60
});

new WOW().init();

$('a.page-scroll').bind('click', (event) => {
  const $ele = $(this);
  $('html, body').stop().animate(
    {
      scrollTop: ($($ele.attr('href')).offset().top - 60)
    },
    1450, 'easeInOutExpo');
  event.preventDefault();
});

$('#collapsingNavbar li a').click(() => {
  /* always close responsive nav after click */
  $('.navbar-toggler:visible').click();
});

$('#galleryModal').on('show.bs.modal', (e) => {
  $('#galleryImage').attr('src', $(e.relatedTarget).data('src'));
});
