$(document).ready(function() {

  $('#tweet-text').on('input', function() {
    length = this.value.length;

    if(length > 140) {
      $(this).siblings('div').children('.counter').addClass('font-red');
    } else {
      $(this).siblings('div').children('.counter').removeClass('font-red');
    }

    $(this).siblings('div').children('.counter').text(showValue = 140 - length);
  });
});